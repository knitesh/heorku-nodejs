/**
 * @description: HW for moduel2 using ExpressJS, handle-bars, underscores and body-parser
 * @author: Kumar Nitesh
 */

const express = require("express");
const hbs = require("express-handlebars");
const employee = require("./employeeModule");
const bodyParser = require("body-parser");

const app = express();

// express static will server everything
// with in public as static resource
app.use(express.static("public"));
//Server css file from CSS folder
app.use("/css", express.static(__dirname + "/css"));

// body pareser makes it possible to post JSON to the server
// we can access data we post on as req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//view engine setup
app.set("view engine", "hbs");
// Setting up the app view engine
//using hbs as extension name instead of handlebars
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
  })
);

/**
 * @description Displays Main page
 */
app.get("/", (req, res) => {
  res.render("home");
});

/**
 * @description Handles Get and Post method call for addEmployee rout
 */
app
  .get("/addEmployee", (req, res) => {
    res.render("newEmployee");
  })
  .post("/addEmployee", (req, res) => {
    employee.addEmployee(req.body.firstName, req.body.lastName);
    res.redirect("/lastName/" + req.body.lastName);
    //res.render("404", { error: req.body.firstName + ":" + req.body.lastName });
  });
/**
 * @description Handles Routing to 404 page
 */
app.get("/404", (req, res) => {
  res.render("404");
});
/**
 * @description Hanles route navigation for /search page, A custom page to serah by Id and search By last name
 */
app.get("/search", (req, res) => {
  if (req.query.id) {
    res.redirect("/id/" + req.query.id);
  } else {
    if (req.query.lastName) {
      res.redirect("/lastName/" + req.query.lastName);
    } else {
      res.render("search");
    }
  }
});
/**
 * @description Get Request for /id/:id
 */
app.get("/id/:id", (req, res) => {
  //need to convert params Id to int
  let data = employee.lookupById(+req.params.id);

  if (data && data.id == req.params.id) {
    res.format({
      "text/html": function() {
        res.render("home", {
          displayEmployeeDetail: true,
          employeeData: data
        });
      },
      "application/xml": function() {
        let employeeXml =
          '<?xml version=1.0?>\n<employee id="' +
          data.id +
          '">' +
          data.lastName +
          "," +
          data.firstName +
          "</employee>";

        res.type("application/xml");
        res.send(employeeXml);
      },
      "application/json": function() {
        res.json(data);
      },
      default: function() {
        res.render("404", {
          error: "MIME type not acceptable"
        });
      }
    });
  } else {
    res.format({
      "application/xml": function() {
        let errorXML =
          "<?xml version=1.0?>\n<error>No employee found for given Id</error>" +
          res.type("application/xml");
        res.send(errorXML);
      },

      "text/html": function() {
        res.render("404", {
          error: "No employee found for given Id: " + req.params.id
        });
      },

      "application/json": function() {
        res.send({ message: "Error: No employee found for given Id" });
      },

      default: function() {
        // log the request and respond with 406
        res.render("404", {
          error: "MIME type not acceptable"
        });
      }
    });
  }
});
/**
 * @description GET Request for /lastName/:name
 */
app.get("/lastName/:name", (req, res) => {
  //need to convert params Id to int
  let searchTerm = req.params.name;
  let employeeList = employee.lookupByLastName(req.params.name);

  if (employeeList && employeeList.length > 0) {
    res.format({
      "text/html": function() {
        res.render("home", {
          displayListEmployeeDetail: true,
          searchTerm: searchTerm,
          employeeData: employeeList
        });
      },
      "application/xml": function() {
        let employeeXml =
          "<?xml version=1.0?>\n<employees>" +
          employeeList
            .map(
              employee =>
                '<employee id="' +
                employee.id +
                '">' +
                employee.lastName +
                "," +
                employee.firstName +
                "</employee>"
            )
            .join() +
          "</employees>";

        res.type("application/xml");
        res.send(employeeXml);
      },
      "application/json": function() {
        res.json(employeeList);
      },
      default: function() {
        res.render("404", {
          error: "MIME type not acceptable"
        });
      }
    });
  } else {
    res.format({
      "application/xml": function() {
        let errorXML =
          "<?xml version=1.0?>\n<error>No employee found for given lastName</error>" +
          res.type("application/xml");
        res.send(errorXML);
      },
      "text/html": function() {
        res.render("404", {
          error: "No employee found for given lastName: " + req.params.name
        });
      },

      "application/json": function() {
        res.send({ message: "Error: No employee found for given lastName" });
      },

      default: function() {
        // log the request and respond with 406
        res.render("404", {
          error: "MIME type not acceptable"
        });
      }
    });
  }
});
//
/**
 * @description Start HTTP server and listen for connectsion on 3000 port
 */
app.listen(3000, () => {
  console.log("Server started on 3000 port");
});

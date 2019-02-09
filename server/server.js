const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const colors = require("colors");

//
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const employeeRoutes = require("./routes");

const PORT = process.env.PORT || 3000;

// express static will server everything
// with in public as static resource
app.use(express.static(__dirname + "/public"));
//Server css file from CSS folder
app.use("/css", express.static(__dirname + "/public/css"));

// body pareser makes it possible to post JSON to the server
// we can access data we post on as req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set morgan to log api request
app.use(morgan("dev"));
//view engine setup
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
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

app.use(cookieParser());
app.use(
  expressSession({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: {},
    isInErrorState: false,
    errorMsg: ""
  })
);
/**
 * @description Displays Main page
 */
app.use("/employee", employeeRoutes);

app.get("/", (req, res) => {
  res.render("home");
});

app.use((req, res) => {
  res.render("404", { error: "Page Not Found" });
});
const connection = require("../db/dbConnection");
/**
 * @description Start the Express Server
 */
connection.on("error", console.error.bind(console, "connection error:"));

connection.on("open", () => {
  console.log("...connected to mongo db".blue);
  app.listen(PORT, () => {
    console.log(`..Server started listening at ${PORT}`.blue);
  });
});

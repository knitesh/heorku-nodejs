const Employee = require("../db/models/employee");

const displayEmployee = (req, res) => {
  Employee.find()
    .exec()
    .then(docs => {
      res.status(200).render("employee", { employees: docs });
    })
    .catch(err =>
      res.status(500).json({
        message: "Error finding employee",
        error: err
      })
    );
};

const findEmployee = (req, res) => {
  Employee.findById(req.params.id)
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err =>
      res.status(500).json({
        message: "Error finding employee",
        error: err
      })
    );
};

const updateEmployeeForm = (req, res) => {
  Employee.findById(req.params.id)
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).render("editEmployee", { employee: docs });
    })
    .catch(err =>
      res.status(500).json({
        message: "Error finding employee",
        error: err
      })
    );
  //res.render("editEmployee");
};
const updateEmployee = (req, res) => {
  var conditions = { _id: req.params.id };
  var model = new Employee(req.body);

  Employee.findById(req.params.id)
    .exec()
    .then(doc => {
      doc.firstName = model.firstName;
      doc.lastName = model.lastName;
      doc.save().then(() => {
        res.status(200).redirect("/employee");
      });
    })
    .catch(err =>
      res.status(500).json({
        message: "Error finding employee",
        error: err
      })
    );
  //res.render("editEmployee");
};
const deleteEmployee = (req, res) => {
  Employee.deleteOne({ _id: req.params.id })
    .exec()
    .then(docs => {
      res.status(200).redirect("/employee");
    })
    .catch(err =>
      res.status(500).render("deleteEmployee", {
        success: false,
        message: "Error finding employee",
        err: err
      })
    );
};
const deleteEmployeeJson = (req, res) => {
  Employee.deleteOne({ _id: req.params.id })
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        message: "Error finding employee",
        error: err
      })
    );
};
const addEmployee = (req, res) => {
  let employee = new Employee(req.body);
  employee.save((err, employee) => {
    if (!err) {
      res.status(200).redirect("/employee");
    } else {
      console.log(err.message.split(":"));
      req.session.isInErrorState = true;
      req.session.errorMsg = err.message;
      res.status(400).redirect("/employee/addEmployee");
    }
  });
};
const addEmployeeForm = (req, res) => {
  if (req.session && req.session.isInErrorState) {
    res.render("addEmployee", {
      message: req.session.errorMsg
    });
    req.session.isInErrorState = false;
  } else {
    res.render("addEmployee");
  }
};

module.exports = router => {
  router.get("/", displayEmployee);
  router.get("/edit/:id", updateEmployeeForm);
  router.post("/edit/:id", updateEmployee);
  router.get("/delete/:id", deleteEmployee);
  router.delete("/delete/:id", deleteEmployeeJson);
  router.get("/addEmployee", addEmployeeForm);
  router.post("/addEmployee", addEmployee);
  // router.put("/employee", updateEmployee);
  // router.delete("/employee", deleteEmployee);
};

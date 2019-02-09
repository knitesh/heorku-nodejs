// const mongoose = require("mongoose");
// const credentials = require("./db/credentials.js");
const connection = require("./db/dbConnection");
const Employee = require("./db/models/employee");

// const dbUrl =
//   "mongodb://" +
//   credentials.username +
//   ":" +
//   credentials.password +
//   "@" +
//   credentials.host +
//   ":" +
//   credentials.port +
//   "/" +
//   credentials.database;

// mongoose.connect(dbUrl, { useNewUrlParser: true });

// const connection = mongoose.connection;

/*
{ id: 1, firstName: "John", lastName: "Smith" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
  { id: 3, firstName: "John", lastName: "Doe" }
  */
connection.on("open", () => {
  // create and save document objects
  let employee;

  employee = new Employee({
    firstName: "John",
    lastName: "Smith"
  });

  employee.save(err => {
    connection.close();
    if (err) throw err;
    console.log("Success!");
  });
  employee = new Employee({
    firstName: "Jane",
    lastName: "Smith"
  });

  employee.save(err => {
    connection.close();
    if (err) throw err;
    console.log("Success!");
  });
  employee = new Employee({
    firstName: "John",
    lastName: "Doe"
  });

  employee.save(err => {
    connection.close();
    if (err) throw err;
    console.log("Success!");
  });
});

connection.on("error", console.error.bind(console, "connection error:"));

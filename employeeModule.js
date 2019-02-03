/* Description: Employee Module - Part 2 -using Underscore (findWhere, where, pluck, and max)
 * author: Kumar Nitesh
 * filename: employeeModule.js
 */
// Import underscore module
const _ = require("underscore");

// defining module exports at start so that user can see it above the fold in editor,
// and without scrolling enough can see what are the items exported from this module
// hiding the implementation details
module.exports = {
  lookupById: lookupById,
  lookupByLastName: lookupByLastName,
  addEmployee: addEmployee
};
/**********************************************************************************/
/***    Employee module code  with underscore                                                ***/
/**********************************************************************************/
// Initial employee data array
var data = [
  { id: 1, firstName: "John", lastName: "Smith" },
  { id: 2, firstName: "Jane", lastName: "Smith" },
  { id: 3, firstName: "John", lastName: "Doe" }
];

// Function to return JS object from the data whose id matches the specified argument
function lookupById(id) {
  if (id) {
    return _.findWhere(data, { id: id });
  } else {
    return "Id is not found";
  }
}
//return the array of JavaScript objects from the data whose lastName
// matches the specified argument
function lookupByLastName(lastName) {
  if (lastName) {
    return _.where(data, { lastName: lastName });
  } else {
    throw "Last name parameter is reuired";
  }
}
/*
  The function addEmployee only takes two arguments, the firstName
  and lastName of the employee being added. The id value should be calculated
  as one more than the current maximum id
  */
function addEmployee(firstName, lastName) {
  if (firstName && lastName) {
    //get the employee object having max id and pluck the Id value
    let [maxId] = _.pluck([_.max(data, employee => employee.id)], "id");

    data.push({ id: maxId + 1, firstName: firstName, lastName: lastName });
  } else {
    throw "Firstname or Lastname is missing";
  }
}

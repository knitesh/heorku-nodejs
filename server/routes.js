const express = require("express");
const router = express.Router();

require("./employeeModule")(router);

module.exports = router;

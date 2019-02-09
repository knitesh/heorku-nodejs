const mongoose = require("mongoose");
const credentials = require("./credentials.js");

const dbUrl =
  "mongodb://" +
  credentials.username +
  ":" +
  credentials.password +
  "@" +
  credentials.host +
  ":" +
  credentials.port +
  "/" +
  credentials.database;

mongoose.connect(dbUrl, { useNewUrlParser: true });

const connection = mongoose.connection;

module.exports = connection;

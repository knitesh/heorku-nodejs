var express = require("express");

var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send("Hello from Server");
});
app.listen(port, () => {
  console.log("Server started on 8080");
});

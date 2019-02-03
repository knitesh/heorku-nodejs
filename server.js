var express = require("express");

var app = express();

app.get("/", (req, res) => {
  res.send("Hello from Server");
});
app.listen(80, () => {
  console.log("Server started on 8080");
});

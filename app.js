var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 8000;

app.use(bodyParser.json());

app.all("/", function(_req, res) {
  res.send("Called ANYTHING");
});

app.get("/car", function(req, res) {
  res.send(req.query);
});

app.post("/car/:car_brand/:car_model", function(req, res) {
  res.send(req.params)
});

app.listen(port, function() {
  console.log("Example app listening on port", port);
});


// http://localhost:9000/car/honda/city
// http://localhost:9000/car/maruti/swift

var express = require("express");
var app = express();
var request = require("request");
var axios = require("axios");
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
  res.send(req.params);
});

app.get("/callback", async function(req, res) {
  try {
    resp1 = axios.get("https://jsonplaceholder.typicode.comkbsdj/todos");
    resp2 = axios.get("https://jsonplaceholder.typicode.com/users");
    res.send("COMPLETD EXECUTION");
  } catch (e) {
    console.log(e.Error);
    res.send("Failed here");
  }
});

app.listen(port, function() {
  console.log("Example app listening on port", port);
});

// 1. Callback system task, functiomn(error, response)
// 2. Promise
// 3. async/await

// THIS IS NOT A GOOD WAY
// request("https://jsonplaceholder.typicode.com/todos/1", function(error,success,body) {
//     request("https://jsonplaceholder.typicode.com/todos/1/body", function(error,_success,body) {
//       request("https://jsonplaceholder.typicode.com/todos/1/body", function(error,_success,body) {
//         if (error) res.send(error);
//         res.send(body);
//       });
//     });
//   });
//'https://jsonplaceholder.typicode.com/todos/1'

// This is a good way
// promise1 = axios.get("https://jsonplaceholder.typicode.com/todos");
// promise2 = axios.get("https://jsonplaceholder.typicode.com/posts");
// Promise.all([promise1, promise2])
//   .then(function(values) {
//     respPromise1 = values[0].data;
//     respPromise2 = values[1].data;
//     a = {
//       resp1: respPromise1,
//       resp2: respPromise2
//     };
//     res.send(a);
//   })
//   .catch(function(er) {
//     res.send(er);
//   });

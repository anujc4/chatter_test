var username = "anuj";
var password = "password";

// ------ CLIENT SIDE ------------
// Authorization: Basic <username:password>
function encode(username, password) {
  var encodedToken = Buffer.from(username + ":" + password).toString("base64");
  return {
    Authorization: "Basic " + encodedToken
  };
}

a = encode(username, password);
console.log(a);

// ------ SERVER SIDE ------------
function decode(token) {
  var encodedData = token.replace("Basic ", "");
  var decoded = new Buffer(encodedData, "base64").toString().split(":");
  return {
    username: decoded.shift(),
    password: decoded.shift()
  };
}

var decoded = decode("Basic YW51ajpwYXNzd29yZA==");
decoded;
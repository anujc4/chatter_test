var jwt = require("jsonwebtoken");

var signingKey = "somerandomvalue";
var expiry = "1 minute";

var payload = {
  username: "anuj",
  id: "4567ygcvhbffg3irfwe="
};

// At the time of login, server has to send this data to the client
signedToken = jwt.sign(payload, signingKey, {
  expiresIn: expiry
});

// verificationResp = jwt.verify(signedToken, signingKey);

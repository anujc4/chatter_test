var jwt = require("jsonwebtoken");

var signingKey = "somerandomvalue";
var expiry = "1 minute";

var payload = {
  username: "anuj",
  id: "4567ygcvhbffg3irfwe="
};

// At the time of login, server has to send this data to the client
signedToken = jwt.sign(payload, signingKey);

tokenVerification = jwt.verify(signedToken, signingKey);
// verificationResp = jwt.verify(signedToken, signingKey);

// Authentication: Basic <Username:Password>

// Username :: Password -> Token(Valid for a certain time)

// <HEADER>.<PAYLOAD>.<SIGNATURE>

// Header -> Type of Encryption, Specifies type (JWT)
// Payload -> UserID
// Signature -> How to validate the token

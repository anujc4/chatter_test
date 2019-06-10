var crypto = require("crypto");
var password = "someSuperSecurePassword";

// CRYPTO -
/*
  createHash(encryption_method) -> Hash object
  update(str) ->String
  digest(encoding_algo) -> Buffer / String
*/

var hashObject = crypto.createHash("sha256");
hashObject;
var _hashObject = a.update(password);
_hashObject;
var encryptedString = a.digest("base64");
encryptedString;

// var encryptedPassword = crypto.createHash("sha256").update(password).digest('base64');
// encryptedPassword

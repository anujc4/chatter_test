var C = require("../constant/constant");

var getOffset = function(req) {
  offset = Number(req.query.offset);
  if (offset && !isNaN(offset)) {
    return offset;
  } else {
    return C.DEFAULT_OFFSET;
  }
};

var getLimit = function(req) {
  // limit = parseInt(req.query.limit);
  limit = Number(req.query.limit);
  if (limit && !isNaN(limit)) {
    if (limit > C.DEFAULT_LIMIT) return C.DEFAULT_LIMIT;
    else return limit;
  } else {
    return C.DEFAULT_LIMIT;
  }
};

var genericGet = function(req, Model){
  resp = Model.find()
    .limit(getLimit(req))
    .skip(getOffset(req));
  return resp;
};

exports.getOffset = getOffset;
exports.getLimit = getLimit;
exports.genericGet = genericGet;
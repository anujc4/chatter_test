var DB_HOST = function() {
  if (process.env.NODE_ENV === "test") {
    return "mongodb://localhost/chatter_test";
  } else return process.env.DB_HOST;
}();

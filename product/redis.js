var redis = require("redis");
var client = redis.createClient();

client.on("error", function(err) {
  console.log("Error " + err);
});

client.on("connect", function(err) {
  console.log("Connected to redis server");
});


var bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = { client };

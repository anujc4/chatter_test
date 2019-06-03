/*
************* ASSIGNMENT*************
1. Create GET API to get all chats. Write this as Promise based
  Putting a where clause.
  {
    fromUser: req.params.fromUser
    toUser: req.params.toUser
  }
2. Create a POST API to create a new chat

3. Create PUT AND DELETE
*/

var router = require("express").Router();
var ChatHistory = require("../db/models/chat_history").ChatHistory;
var RequestUtils = require("../utils/requestUtils");

router.get("/from/:fromUserId/to/:toUserId", (req, resp) => {
  ChatHistory.find({})
    // .limit(RequestUtils.getLimit(req))
    // .skip(RequestUtils.getOffset(req))
    .then(x => {
      resp.send(x);
    });
});

// router.post("/", async (req, resp) => {
//   chat = new ChatHistory();
//   chat.fromUser = req.body.fromUser;
//   chat.toUser = req.body.toUser;
//   chat.message = req.body.message;
//   savedChat = await chat.save();
//   resp.send(savedChat);
// });

router.post("/", (req, resp) => {
  chat = new ChatHistory();
  chat.fromUser = req.body.fromUser;
  chat.toUser = req.body.toUser;
  chat.message = req.body.message;
  chat.save().then(x => {
    resp.send(x);
  });
});

module.exports = router;

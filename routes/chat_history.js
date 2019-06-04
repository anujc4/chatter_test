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

router.get("/", async (_req, resp) => {
  try {
    chats = await ChatHistory.find().sort("-createdAt");
    resp.send(chats);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.get("/from/:fromUserId/to/:toUserId", (req, resp) => {
  ChatHistory.find({
    fromUser: req.params.fromUserId,
    toUser: req.params.toUserId
  })
    .sort({ createdAt: -1 })
    .limit(RequestUtils.getLimit(req))
    .skip(RequestUtils.getOffset(req))
    .then(x => {
      resp.send(x);
    });
});

router.put("/:id", async (req, resp) => {
  try {
    let updateObj = {};
    if (req.body.message) updateObj.message = req.body.message;
    updateResp = await ChatHistory.updateOne({ _id: req.params.id }, updateObj);
    console.log("Updated chat response", updateResp);
    updatedChat = await ChatHistory.findOne({ _id: req.params.id });
    resp.send(updatedChat);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.post("/", (req, resp) => {
  chat = new ChatHistory();
  chat.fromUser = req.body.fromUser;
  chat.toUser = req.body.toUser;
  chat.message = req.body.message;
  chat.save().then(x => {
    resp.send(x);
  });
});

router.delete("/:id", async (req, resp) => {
  try {
    deleteResp = await ChatHistory.deleteOne({ _id: req.params.id });
    resp.send(deleteResp);
  } catch (e) {
    resp.status(500).send(e);
  }
});

router.delete("/from/:fromUserId/to/:toUserId", async (req, resp) => {
  let deleteOpts = {
    fromUser: req.params.fromUserId,
    toUser: req.params.toUserId
  };
  deleteResp = await ChatHistory.deleteMany(deleteOpts);
  resp.send(deleteResp);
});

module.exports = router;

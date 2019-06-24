var chai = require("chai");
var chaiHttp = require("chai-http");
var mongoose = require("mongoose");
var assert = require("chai").assert;
var expect = require("chai").expect;
var app = require("../../app");
var User = require("../../db/models/user").User;
var jwt = require("../../utils/auth_helper");
var jwtAuthHandler = require("../../middleware/auth").jwtHandler;
var sinon = require("sinon");

chai.use(chaiHttp);

describe("JWT Authentication", () => {
  nextSpy = sinon.spy();
  req = {};
  resp = {};

  before(() => {
    sinon.stub(jwt, "verify").callsFake(function() {
      return {
        user: "anuj",
        fakedBySinon: true
      };
    });
  });

  it("given an authenticated api when jwt is stubbed then req should have an auth attribute", () => {
    req.headers = { "x-web-logintoken": "someinvalidjwttoken" };
    jwtAuthHandler(req, resp, nextSpy);
    assert(nextSpy.calledOnce);
    expect(req.auth)
      .to.have.property("user")
      .to.equal("anuj");
    expect(req.auth)
      .to.have.property("fakedBySinon")
      .to.equal(true);
  });

  after(() => {
    jwt.verify.restore();
  });
});

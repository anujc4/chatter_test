var chai = require("chai");
var chaiHttp = require("chai-http");
var mongoose = require("mongoose");
var expect = require("chai").expect;
var app = require("../../app");
var User = require("../../db/models/user").User;

chai.use(chaiHttp);

describe("User", () => {
  var user;
  var userId;
  before(done => {
    user = new User({
      username: "testuser1",
      email: "test1@user.com",
      firstName: "test1",
      lastName: "user"
    });
    User.deleteMany().then(() => {
      User.create(user).then(resp => {
        userId = resp._id;
        done();
      });
    });
  });

  after(() => {});

  it("GET /api/user", done => {
    chai
      .request(app)
      .get("/api/user")
      .send()
      .then(resp => {
        expect(resp.body).not.equal(undefined);
        expect(resp.body).to.be.a("array");
        user = resp.body.shift();
        expect(user).to.not.be.undefined;
        expect(user)
          .to.have.property("username")
          .to.equal("testuser1");
        expect(user)
          .to.have.property("email")
          .to.equal("test1@user.com");
        expect(user)
          .to.have.property("firstName")
          .to.equal("test1");
        expect(user)
          .to.have.property("lastName")
          .to.equal("user");
        expect(user).to.have.property("id");
        expect(user).to.have.property("createdAt");
        expect(user).to.have.property("updatedAt");
        done();
      })
      .catch(err => done(err));
  });

  it("GET /api/user/:userId", done => {
    url = "/api/user/" + userId;
    chai
      .request(app)
      .get(url)
      .send()
      .then(resp => {
        expect(resp.body).not.equal(undefined);
        expect(resp.body).to.be.a("object");
        user = resp.body;
        expect(user).to.have.property("username");
        expect(user).to.have.property("email");
        expect(user).to.have.property("firstName");
        expect(user).to.have.property("lastName");
        expect(user).to.have.property("id");
        expect(user).to.have.property("createdAt");
        expect(user).to.have.property("updatedAt");
        done();
      })
      .catch(err => done(err));
  });

  it("GET /api/user/:userId when userId is invalid", done => {
    url = "/api/user/" + "abc";
    chai
      .request(app)
      .get(url)
      .send()
      .then(resp => {
        expect(resp).to.have.status(400);
        expect(resp.body).to.not.equal(undefined);
        expect(resp.body).to.be.an("object");
        expect(resp.body)
          .to.have.property("error")
          .to.equal(true);
        expect(resp.body)
          .to.have.property("userMessage")
          .to.equal("abc is an invalid input");
        expect(resp.body)
          .to.have.property("errorMessage")
          .to.equal("Bad request");
        done();
      })
      .catch(err => done(err));
  });

  /*
  status: 404
  {
    error: true,
    userMessage: "${userId} does not exist"
    errorMessage: "Not found"
  }
  */
  it("GET /api/user/:userId when userId does not exist", done => {
    chai
      .request(app)
      .get("/api/user/5cdeedc546226fbaaa591ab3")
      .send()
      .then(resp => {
        expect(resp).to.have.status(404);
        expect(resp.body).to.be.an("object");
        expect(resp.body)
          .to.have.property("error")
          .to.equal(true);
        expect(resp.body)
          .to.have.property("userMessage")
          .to.equal("5cdeedc546226fbaaa591ab3 does not exist");
        expect(resp.body)
          .to.have.property("errorMessage")
          .to.equal("Not found");
        done();
      })
      .catch(err => done(err));
  });
});
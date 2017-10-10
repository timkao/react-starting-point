var supertest = require('supertest');
var app = require('../server.js');
var agent = supertest.agent(app);
const expect = require('chai').expect;
const seed = require('../db/seed')
const db = require('../db')

describe('User requests', function () {

  // beforeEach(function(done){
  //   return db.sync()
  //   .then(seed)
  //   .then(function(){
  //     done()
  //   })
  // })

  describe('GET /users/', function () {
    it('responds with 200', function(done){
      agent
      .get('/api/users')
      .expect(200, done)
    });
  });

  describe('PUT /users/', function () {
    it('updates the user to be admin', function(done){
      agent
      .put('/api/users/8')
      .then(response => {
        expect(response.body.userType).to.equal('admin')
        done()
      })
    });
  });


});

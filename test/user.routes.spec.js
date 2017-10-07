var supertest = require('supertest');
var app = require('../server.js');
var agent = supertest.agent(app);
const db = require('../db');
const expect = require('chai').expect;


describe('http requests', function () {

 
  describe('GET /users/', function () {
    it('responds with 200', function(done){
      agent
      .get('/api/users')
      .expect(200, done)
      console.log('COME ON')
    });
  });

  describe('PUT /users/', function () {
    it('responds with 200', function(done){
      agent
      .put('/api/users/10')
      .then(response => { console.log(response) })
      
    });
  });


}); 
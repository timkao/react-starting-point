var supertest = require('supertest');
var app = require('../server.js');
var agent = supertest.agent(app);
const expect = require('chai').expect;
const seed = require('../db/seed')
const db = require('../db')

describe('Category requests', function () {

  // beforeEach(function(done){
  //   return db.sync()
  //   .then(seed)
  //   .then(function(){
  //     done()
  //   })
  // })

  describe('GET /categories/', function () {
    it('responds with 200', function(done){
      agent
      .get('/api/categories')
      .expect(200, done)
    });

    it('GET responds with a person after a task has been added', function() {
      category.add('zeke', { name: 'new category' });
      return supertest
        .get('/categories')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(res) {
          expect(res.body).to.eql(['new category']);
        });
    });
  });




});

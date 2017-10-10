var supertest = require('supertest');
var app = require('../server.js');
var agent = supertest.agent(app);
const expect = require('chai').expect;
const seed = require('../db/seed')
const { LineItem, Order } = require('../db').models

describe('lineitem requests', function () {

  // beforeEach(function(){
  //   return LineItem.sync({force: true})
  //   .then(()=> {
  //     return LineItem.create({quantity: 1})
  //   })
  // })

  // afterEach(function(){
  //   return LineItem.truncate()
  // })

  describe('PUT /lineitems/', function () {
    it('updates lineitem volume', function(done){
      agent
      .put('/api/lineitems/1')
      .send({quantity: 10})
      .then(response => {
        expect(response.body.quantity).to.equal(10)
        done()
      })
    });
  });


});

var supertest = require('supertest');
var app = require('../testApp.js');
var agent = supertest.agent(app);
const expect = require('chai').expect;
const seed = require('../db/seed')
const { LineItem } = require('../db').models
const db = require('../db')


describe('lineitem requests', function () {

  beforeEach(function(){
    return db.sync()
    .then(() => seed());
  })

  describe('DELETE /lineitems/', function () {
    const testId = 2
    it('delete lineitem from DB', function(done){
      agent
      .delete(`/api/lineitems/${testId}`)
      .expect(204)
      .then( () => {
        LineItem.findById(testId)
        .then(result => {
          expect(result).to.be.null
          done()
        })
      })
    });
  });

  describe('PUT /lineitems/', function () {
    it('updates lineitem volume', function(done){
      agent
      .put('/api/lineitems/2')
      .send({quantity: 100})
      .then(response => {
        expect(response.body.quantity).to.equal(100)
        done()
      })
    });
  });

  describe('Add /lineitems/', function () {

    const testOrder = 10
    const testProduct = 1

    it('add lineitem to an order', function(done){
      agent
      .post(`/api/lineitems/${testOrder}/${testProduct}`)
      .send({quantity: 50})
      .then(response => {
        expect(response.body.quantity).to.equal(50)
        expect(response.body.orderId).to.equal(testOrder)
        expect(response.body.productId).to.equal(testProduct)
        done()
      })
    });
  });


});

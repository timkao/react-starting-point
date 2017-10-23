const router = require('express').Router();
const {Order, Product, LineItem, User, Category, Review} = require('../db').models;


router.get('/:productId', (req, res, next) => {
    Review.findAll({
        where: { productId : req.params.productId*1 },
        include: [{model:User}]
    })
    .then(reviews => res.send(reviews))
    .catch(next)
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    // req.body[userId]= req.session.userId
    Review.create(req.body)
    .then(review => res.send(review))
    .catch(next)
})

router.put('/:productId', (req, res, next) => {
    Product.findById(req.params.productId*1)
    .then(product => {
        product.update(req.body)
    })
    .catch(next)
})

router.delete('/:productId', (req, res, next) => {
    Product.findById(req.params.productId*1)
    .then(product => {
        product.destroy()
        res.sendStatus(204)
    })
    .catch(next)
})

module.exports = router;

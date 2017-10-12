const router = require('express').Router();
const {Order, Product, LineItem, User, Category} = require('../db').models;

router.get('/', (req, res, next) => {
    Product.findAll({
        include: [Category]
    })
    .then(products => {
        res.send(products)
    })
    .catch(next)
})

router.get('/:productId', (req, res, next) => {
    Product.findById(req.params.productId*1, {
        include: [Category]
    })
    .then(product => res.send(product))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Product.create(req.body)
    .then(product => res.send(product))
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

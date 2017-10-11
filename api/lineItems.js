const router = require('express').Router();
const {Order, Product, LineItem, User} = require('../db').models;

//update lineItem quantity in cart view
router.put('/:lineItemId', (req, res, next) => {
	LineItem.findById(req.params.lineItemId * 1)
		.then(lineItem => {
			lineItem.quantity = req.body.quantity
			return lineItem.save()
		})
		.then(lineItem => {
			res.send(lineItem)
		})
		.catch(next)
});

//delete line item
router.delete('/:lineItemId', (req, res, next) => {
	LineItem.findById(req.params.lineItemId * 1)
		.then(lineItem => {
			return lineItem.destroy()
		})
		.then(()=>{res.sendStatus(204)})
		.catch(next)
});

//adding product to a cart.
router.post('/:orderId/:productId', (req, res, next) => {
	let currentItem
	LineItem.create(req.body)
	.then(lineItem => {
		currentItem = lineItem
		return Product.findById(req.params.productId * 1)
	})
	.then(product => {
		return currentItem.setProduct(product)
	})
	.then(lineItem => {
		currentItem = lineItem
		return Order.findById(req.params.orderId * 1)
	})
	.then(order => {
		return currentItem.setOrder(order)
	})
	.then(lineItem => {
		res.send(lineItem)
	})
	.catch(next)
});

module.exports = router;

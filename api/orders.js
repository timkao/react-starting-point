const router = require('express').Router();
const {Order, Product, LineItem, User} = require('../db').models;

router.get('/:orderId', (req, res, next)=>{
	Order.findById(req.params.orderId*1, {
		include: { 
			model: LineItem,
			include: Product
		 }
	})
		.then(order => {
			console.log(order.lineitems)
			res.send(order)
		})
		.catch(next)
});

router.get('/', (req, res, next)=>{
	Order.findAll(
		{include: User}
	// {
		// include:{
		// 	model: LineItem,
		// 	include: Product
		// }
	// }
	)
		.then(orders => {
			res.send(orders)
		})
});


module.exports = router;
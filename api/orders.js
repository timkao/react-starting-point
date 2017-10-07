const router = require('express').Router();
const {Order, Product, LineItem, User} = require('../db').models;

router.get('/all/:orderId', (req, res, next)=>{
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

//get all orders by user id
router.get('/user/:userId', (req, res, next) => {
	Order.findAll({
		where: {userId: req.params.userId*1}
	})
		.then(orders => {
			res.send(orders)
		})
		.catch(next)
});


//when we have extra time...

//find all orders with common product

//move line item's product and add to savedlist

//move product from savedlist to order's lineitem



module.exports = router;









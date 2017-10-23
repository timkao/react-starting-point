const router = require('express').Router();
const {Order, Product, LineItem, User} = require('../db').models;


// /api/users

router.get('/all/:orderId', (req, res, next)=> {
	// need to verify user first

	// how to sort in "include"?
	Order.findById(req.params.orderId, {
		include: {
			model: LineItem,
			include: Product
		 }
	})
		.then(order => {
			res.send(order)
		})
		.catch(next)
});

// get all the orders
router.get('/', (req, res, next)=>{
	Order.findAll(
		{
			include: [{
				model: LineItem,
				include: [Product]
			}, {
				model: User
			}]
		}
	)
		.then(orders => {
			res.send(orders)
		})
});

//get all orders by user id
router.get('/user/:userId', (req, res, next) => {
	Order.findAll({
		where: {userId: req.params.userId}
	})
		.then(orders => {
			res.send(orders)
		})
		.catch(next)
});

router.put('/:id', (req, res, next) => {
	Order.update(req.body, {
		where : { id : req.params.id }
	})
	.then((order) => {res.send(order)})
	.catch(next)
});

router.post('/', (req, res, next) => {
	Order.create(req.body)
	.then((order)=>{
		console.log('reqbody' + JSON.stringify(req.body.lineitems[0].id))
		const lineitems = req.body.lineitems
		lineitems.map(lineitem=>{
			console.log(lineitem.id)
			// need to create lineitem and then attach to order lineitem.setOrder(order)
		})
	})
	.then(()=> res.sendStatus(204))
  .catch(next);
});


//when we have extra time...

//find all orders with common product

//move line item's product and add to savedlist

//move product from savedlist to order's lineitem



module.exports = router;



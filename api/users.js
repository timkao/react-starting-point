const router = require('express').Router();
const { User, Order, LineItem, Product } = require('../db').models;

// /api/users

// get all orders of the user
router.get('/', (req, res, next) => {
	User.findAll({
		include: [Order]
	})
		.then(users => {
			res.send(users)
		})
		.catch(next)
});

router.get('/currentOrder', (req, res, next) => {
	if (req.session.userId) {
		Order.findOne({
			where: { userId: req.session.userId, status: "Open" },
			include: {
				model: LineItem,
				include: Product
			}
		})
			.then(order => {
				res.send(order);
			})
			.catch(next)
	}
	else {
		res.send('not member');
	}
})

// add a product to savedList
router.put('/savelist', (req, res, next) => {
	if (req.session.userId) {
		// const id = 3 // from req.session.userId
		User.findById(req.session.userId)
			.then(user => {
				// user.saveList.push(req.body) does not work...
				user.savedList = user.savedList.concat([req.body])
				return user.save()
			})
			.then(user => {
				res.send(user.savedList)
			})
			.catch(next)
	}
})

// get all products from savedList
router.get('/savelist', (req, res, next) => {
	if (req.session.userId) {
		// const id = 3  // from req.sesson.userId
		User.findById(req.session.userId)
			.then(user => {
				res.send(user.savedList)
			})
			.catch(next)
	}
})

// remove a products from savedList
router.put('/savelist/:productId', (req, res, next) => {
	if (req.session.userId) {
		// const id = 3 // from req.session.userId
		User.findById(req.session.userId)
			.then(user => {
				user.savedList = user.savedList.filter(product => product.id !== req.params.productId * 1)
				return user.save()
			})
			.then(user => {
				res.send(user.savedList)
			})
			.catch(next)
	}
})

// get all orders of the user
router.get('/history', (req, res, next) => {
	if (req.session.userId) {
		// const id = 3 // from req.session.userId
		User.findById(req.session.userId, {
			include: {
				model: Order,
				include: [{
					model: LineItem,
					include: [Product]
				}]
			}
		})
			.then(user => {
				res.send(user.orders)
			})
			.catch(next)
	}
})


// someone might not have any order....
router.put('/:userId', (req, res, next) => {
	User.findById(req.params.userId, {
		include: [Order]
	})
		.then(user => {
			user.userType = 'admin'
			return user.save()
		})
		.then(user => {
			res.send(user)
		})
		.catch(next)
});

module.exports = router;

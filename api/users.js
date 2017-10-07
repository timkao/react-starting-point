const router = require('express').Router();
const {User, Order} = require('../db').models;


router.get('/', (req, res, next)=>{
	User.findAll({
		include:[Order]
	})
		.then(users => {
			res.send(users)
		})
		.catch(next)
});


// someone might not have any order....
router.put('/:userId', (req, res, next)=>{
	User.findById(req.params.userId*1, {
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

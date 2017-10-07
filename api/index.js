const router = require('express').Router();


// router.use('/products', require('./products'));
// router.use('/categories', require('./categories'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/lineItems', require('./lineItems'));
// router.use('/admin', require('./admin'));


router.use((req, res, next)=>{
	res.status(404).send('route not found')
})


module.exports = router;

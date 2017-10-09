const router = require('express').Router();
const {Product, Category} = require('../db').models;

// GET all categories includes products
router.get('/', (req, res, next) => {
	Category.findAll({
		include: [Product] 
	})
	.then(categories => {
		res.send(categories)
	})
	.catch(next)
})

// GET single category (by category ID) includes products
router.get('/:id', (req, res, next) => {
	Category.findById(req.params.id*1, {
		include: [Product]
	})
	.then(category => {
		res.send(category)
	})
	.catch(next)
})

// POST a new category
router.post('/', (req, res, next) => {
	Category.create(req.body)
	.then(category => {
		res.status(201)
		res.send(category)
	})
	.catch(next)
})

// PUT update a category (by category ID)
router.put('/:id', (req, res, next) => {
	Category.findById(req.params.id*1)
	.then(category => {
		category.name = req.body.name
		category.description = req.body.description
		if(req.body.active){
			category.active = req.body.active
		}
		if(req.body.featured){
			category.featured = req.body.featured
		}
		return category.save()
	})
	.then(category => {
		res.send(category)
	})
	.catch(next)
})

// DELETE a single category (by category ID)
router.delete('/:id', (req, res, next) => {
	Category.findById(req.params.id*1)
	.then(category => {
		category.destroy()
		res.sendStatus(204)
	})
	.catch(next)
})

module.exports = router;
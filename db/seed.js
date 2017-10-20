const conn = require('./conn');
const { Product, Category, User, LineItem, Order } = require('./index').models;
const faker = require('faker')

const numberOfFakeProduct = 20
const numberOfFakeUser = 10
const numberOfFakeOrder = 40
const numberOfFakeLineItem = 50

const seed = () => {
	const products = []
	const users = []
	const orders = []
	const lineItems = []
	let categories, allProducts, allUsers, allOrders, allLineItems

	for (var i = 0; i < numberOfFakeProduct; i++) {
		products.push(Product.create({
			name: faker.random.word(),
			price: faker.commerce.price(),
			pictureUrl: faker.image.imageUrl(),
			inventory: [{"red": {"8": 20}}],
		}))
	}

	for (var j = 0; j < numberOfFakeUser; j++) {
		users.push(User.create({
			name: faker.name.firstName(),
			email: faker.internet.email(),
			phoneNumber: faker.phone.phoneNumber(),
			password: faker.internet.password(),
			address1: faker.address.streetAddress(),
			city: faker.address.city(),
			state: faker.address.state(),
			zip: faker.address.zipCode()
		}))
	}

	for (var k = 0; k < numberOfFakeOrder; k++) {
		orders.push(Order.create({
			phoneNumber: faker.phone.phoneNumber(),
			shippingAddress1: faker.address.streetAddress(),
			shippingCity: faker.address.city(),
			shippingState: faker.address.state(),
			shippingZip: faker.address.zipCode(),
			billingAddress1: faker.address.streetAddress(),
			billingCity: faker.address.city(),
			billingState: faker.address.state(),
			billingZip: faker.address.zipCode(),
			status: 'Placed'
		}))
	}

	for (var m = 0; m < numberOfFakeLineItem; m++) {
		const volume = parseInt((Math.random() * 10), 10)
		lineItems.push(LineItem.create({
			quantity: volume > 0 ? volume : 1,
			color: faker.commerce.color(),
			size: "9"
		}))
	}

	return Promise.all([
		Category.create({ name: 'Men', description: faker.lorem.sentences() }),
		Category.create({ name: 'Women', description: faker.lorem.sentences() }),
		Category.create({ name: 'Kids', description: faker.lorem.sentence() }),
		Category.create({ name: 'Socks', description: faker.lorem.sentences() }),
		Category.create({ name: 'Accessories', description: faker.lorem.sentences() })
	])
		.then(categoriesArr => {
			categories = categoriesArr
			return Promise.all(products)
		})
		.then(productsArr => {
			allProducts = productsArr
			let count = 0
			const relationships = productsArr.map(product => {
				count++
				if (count > 4) { count = 0 }
				return product.setCategory(categories[count])
			})
			return Promise.all(relationships)
		})
		.then(() => {
			return Promise.all(users)
		})
		.then(usersArr => {
			allUsers = usersArr
			return Promise.all(orders)
		})
		.then(ordersArr => {
			allOrders = ordersArr
			let count = 0
			const ordersUsers = ordersArr.map(order => {
				count++
				if (count > numberOfFakeUser - 1) { count = 0 }
				return order.setUser(allUsers[count])
			})
			return Promise.all(ordersUsers)
		})
		.then(() => {
			return Promise.all(lineItems)
		})
		.then(lineItemsArr => {
			allLineItems = lineItemsArr
			let count = 0
			const lineProducts = lineItemsArr.map(item => {
				count++
				if (count > numberOfFakeProduct - 1) { count = 0 }
				return item.setProduct(allProducts[count])
			})
			return Promise.all(lineProducts)
		})
		.then(lineAndProducts => {
			const preventDuplicate = []
			let count = 0
			let changeIndex = true
			const lineOrders = lineAndProducts.map(item => {
					for (var n = 0; n < preventDuplicate.length; n++) {
						if (preventDuplicate[n][0] == count && preventDuplicate[n][1] == item.productId) {
							count++
							if (count > numberOfFakeOrder - 1) { count = 0 }
						}
				}
				preventDuplicate.push([count, item.productId])
				return item.setOrder(allOrders[count])
			})
			return Promise.all(lineOrders)
		})

}

module.exports = seed;

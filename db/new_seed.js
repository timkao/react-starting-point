const conn = require('./conn');
const { Product, Category, User, LineItem, Order, Review } = require('./index').models;
const faker = require('faker');
const rn = require('random-number');

const numberOfBeginProduct = 9
const numberOfFakeOrder = 15
const numberOfFakeLineItem = 50

const seed = () => {
  const products = []
  const productImagesF = [
    '/public/product_images/21595-107_F.jpg',
    '/public/product_images/K100226-008_F.jpg',
    '/public/product_images/K100260-002_F.jpg',
    '/public/product_images/K100267-002_F.jpg',
    '/public/product_images/K200524-002_F.jpg',
    '/public/product_images/K400218-003_F.jpg',
    '/public/product_images/K800150-001_F.jpg',
    '/public/product_images/K900121-001_F.jpg',
    '/public/product_images/K900131-002_F.jpg'
  ];
  const productImagesT = [
    '/public/product_images/21595-107_T.jpg',
    '/public/product_images/K100226-008_T.jpg',
    '/public/product_images/K100260-002_T.jpg',
    '/public/product_images/K100267-002_T.jpg',
    '/public/product_images/K200524-002_T.jpg',
    '/public/product_images/K400218-003_T.jpg',
    '/public/product_images/K800150-001_T.jpg',
    '/public/product_images/K900121-001_T.jpg',
    '/public/product_images/K900131-002_T.jpg'
  ];
	const users = []
	const orders = []
	const lineItems = []
	let menC, womenC, kidsC, sockC, accessoriesC, allProducts, allUsers, allOrders, allLineItems, tim, tom, david;

	for (var i = 0; i < numberOfBeginProduct; i++) {
		products.push(Product.create({
			name: faker.random.word(),
			price: faker.commerce.price(),
      pictureUrl: productImagesF[i],
      pictureUrl2: productImagesT[i],
      inventory: [
        {"red": {"8": 20, "9": 10, "7": 4, "10": 10, "6": 10}},
        {"blue": {"8": 20, "9": 10, "7": 4, "10": 10, "6": 10}},
        {"white": {"8": 20, "9": 10, "7": 4, "10": 10, "6": 10}},
        {"green": {"8": 20, "9": 10, "7": 4, "10": 10, "6": 10}}
      ]
		}))
	}


		users.push(User.create({
			name: "Tim",
			email: "tim.kao@ise.net",
			phoneNumber: "347-212-1234",
			password: "123",
			address1: faker.address.streetAddress(),
			city: faker.address.city(),
			state: faker.address.state(),
      zip: faker.address.zipCode(),
      UserType: "admin"
		}))

    users.push(User.create({
			name: "Tom",
			email: "tom.huange@ise.net",
			phoneNumber: "112-212-1234",
			password: "123",
			address1: faker.address.streetAddress(),
			city: faker.address.city(),
			state: faker.address.state(),
      zip: faker.address.zipCode()
    }))

    users.push(User.create({
			name: "David",
			email: "david.ho@ise.net",
			phoneNumber: "112-222-1234",
			password: "123",
			address1: faker.address.streetAddress(),
			city: faker.address.city(),
			state: faker.address.state(),
      zip: faker.address.zipCode()
		}))

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
			size: ["6", "7", "8", "9", "10"][rn({min: 0, max: 4, integer: true})]
		}))
	}

	return Promise.all([
		Category.create({ name: 'Men', description: faker.lorem.sentences() }),
		Category.create({ name: 'Women', description: faker.lorem.sentences() }),
		Category.create({ name: 'Kids', description: faker.lorem.sentence() }),
		Category.create({ name: 'Socks', description: faker.lorem.sentences() }),
		Category.create({ name: 'Accessories', description: faker.lorem.sentences() })
	])
		.then(([men, women, kids, socks, accessories ]) => {
      menC = men;
      womenC = women;
      kidsC = kids;
      sockC = socks;
      accessoriesC = accessories;
			return Promise.all(products)
		})
		.then(productsArr => {
			allProducts = productsArr
			const relationships = [
        productsArr[0].setCategory(womenC),
        productsArr[1].setCategory(menC),
        productsArr[2].setCategory(menC),
        productsArr[3].setCategory(menC),
        productsArr[4].setCategory(womenC),
        productsArr[5].setCategory(womenC),
        productsArr[6].setCategory(kidsC),
        productsArr[7].setCategory(kidsC),
        productsArr[8].setCategory(kidsC)
      ]
			return Promise.all(relationships)
		})
		.then(() => {
			return Promise.all(users)
		})
		.then(usersArr => {
      tim = usersArr[0];
      tom = usersArr[1];
      david = usersArr[2];
			allUsers = usersArr
			return Promise.all(orders)
		})
		.then(ordersArr => {
			allOrders = ordersArr
			let count = 0
			const ordersUsers = ordersArr.map(order => {
				count++
				if (count > 2) { count = 0 }
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
				if (count > numberOfBeginProduct - 1) { count = 0 }
				return item.setProduct(allProducts[count])
			})
			return Promise.all(lineProducts)
		})
		.then(lineAndProducts => {
			const preventDuplicate = []
			let count = 0
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
    .then(() => {
      return Promise.all([
        Order.create({}),
        Order.create({}),
        Order.create({})
      ])
    })
    .then( ([order1, order2, order3]) => {
      return Promise.all([
        order1.setUser(tim),
        order2.setUser(tom),
        order3.setUser(david)
      ])
    })


}

module.exports = seed;

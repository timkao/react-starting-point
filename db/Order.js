const Sequelize = require('sequelize');
const conn = require('./conn');

const Order = conn.define('order', {
	shippingAddress1: {
		type: Sequelize.STRING
	},
	shippingAddress2: {
		type: Sequelize.STRING
	},
	shippingCity: {
		type: Sequelize.STRING
	},
	shippingState: {
		type: Sequelize.STRING
	},
	shippingZip: {
		type: Sequelize.STRING
	},
	billingAddress1: {
		type: Sequelize.STRING
	},
	billingAddress2: {
		type: Sequelize.STRING
	},
	billingCity: {
		type: Sequelize.STRING
	},
	billingState: {
		type: Sequelize.STRING
	},
	billingZip: {
		type: Sequelize.STRING
	},
	shippingMethod: {
		type: Sequelize.STRING
	},
	paymentMethod: {
		type: Sequelize.STRING
	},
	debitCreditCard: {
		//need to encrypt
		type: Sequelize.STRING
	},
	payPalData: {
		//need to encrypt
		type: Sequelize.STRING
	},
	phoneNumber: {
		type: Sequelize.STRING
	},
	status: {
		type: Sequelize.STRING,
		defaultValue: 'Open'
	},

});

Order.findCartId = function(id){
	Order.findById(id,{
		include: [{ model: LineItem, include: [ Product ] }]
	})
}

Order.prototype.changeCartToOrder = function(id){
	Order.findCartId(id)
	.then(cart => {
		Object.assign(this,
			{ status: 'Placed' }
		)
		return this.save();
	})
}


module.exports = Order;

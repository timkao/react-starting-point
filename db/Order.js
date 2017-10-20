const Sequelize = require('sequelize');
const conn = require('./conn');

const Order = conn.define('order', {
	name: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
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

module.exports = Order;

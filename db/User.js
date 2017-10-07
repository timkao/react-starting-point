const Sequelize = require('sequelize');
const conn = require('./conn');

const User = conn.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	address1: {
		type: Sequelize.STRING
	},
	address2: {
		type: Sequelize.STRING
	},
	city: {
		type: Sequelize.STRING
	},
	state: {
		type: Sequelize.STRING
	},
	zip: {
		type: Sequelize.STRING
	},
	googleId: {
		type: Sequelize.STRING
	},
	userType: {
		type: Sequelize.STRING
	},
	phoneNumber: {
		type: Sequelize.STRING
	},
	active: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	}
});

module.exports = User;

const Sequelize = require('sequelize');
const conn = require('./conn');

const Category = conn.define('category', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT
	},
	active: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	featured: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});

module.exports = Category;

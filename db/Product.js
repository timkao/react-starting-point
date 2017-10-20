const Sequelize = require('sequelize');
const conn = require('./conn');

const Product = conn.define('product', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT
	},
	price: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	pictureUrl: {
		type: Sequelize.STRING
	},
	pictureUrl2: {
		type: Sequelize.STRING
	},
	onPromotion: {
		type: Sequelize.BOOLEAN
	},
	colors: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	},
	sizes: {
		type: Sequelize.ARRAY(Sequelize.STRING)
	},
	inventory: {
		type: Sequelize.ARRAY(Sequelize.JSON)  // {"red": {"size8": 10}}
	}
});

module.exports = Product;

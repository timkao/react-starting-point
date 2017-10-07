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
	onPromotion: {
		type: Sequelize.BOOLEAN
	},
	inventory: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	color: {
		type: Sequelize.STRING
	},
	size: {
		type: Sequelize.STRING
	}
});

module.exports = Product;

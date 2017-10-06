const Sequelize = require('sequelize');
const conn = require('./conn');

const LineItem = conn.define('lineItem', {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	}
});

module.exports = LineItem;
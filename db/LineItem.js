const Sequelize = require('sequelize');
const conn = require('./conn');

const LineItem = conn.define('lineitem', {
	quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
		validate: {
			min: 1
		}
	},
	color: {
		type: Sequelize.STRING
	},
	size: {
		type: Sequelize.STRING
	}
});

module.exports = LineItem;

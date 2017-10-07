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
<<<<<<< HEAD
		type: Sequelize.BOOLEAN,
=======
		Sequelize.BOOLEAN,
>>>>>>> 30e971ab3d585b983e1e6a4567692c0768c05c6a
		defaultValue: true
	},
	featured: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});

module.exports = Category;

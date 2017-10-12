const Sequelize = require('sequelize');
const conn = require('./conn');
const crypto = require('crypto')

const User = conn.define('user', {
	name: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.TEXT,
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
	},
	salt: {
		type: Sequelize.STRING
	}
});

module.exports = User;

// i think both instance method or class method works...
User.produceSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

User.securePassword = function(userInput, salt) {
	return crypto.createHash('RSA-SHA256')
	.update(userInput)
	.update(salt)
	.digest('hex');
};

User.prototype.verifyPassword = function(passwordInput) {
	return User.securePassword(passwordInput, this.salt) === this.password;
}

function setSaltAndPassword(user) {
	if (user.changed('password')) {
		user.salt = User.produceSalt();
		user.password = User.securePassword(user.password, user.salt);
	}
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

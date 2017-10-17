const Sequelize = require('sequelize');
const conn = require('./conn');

const Review = conn.define('review', {
	content: {
		type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      inRange(value) {
        if (value > 5 || value < 1) {
          throw new Error('should be 1 to 5')
        }
      }
    }
  }
});

module.exports = Review;

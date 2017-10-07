const conn = require('./conn');
const Product = require('./Product');
const Category = require('./Category');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Review = require('./Review');


Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Category.hasMany(Product);
Product.belongsTo(Category);
User.hasMany(Order);
Order.belongsTo(User);
Product.hasMany(Review);
Review.belongsTo(Product);
User.hasMany(Review);
Review.belongsTo(User);
//added for savedlist
// User.hasMany(Product);
// Product.hasMany(User);

const sync = ()=>{
	return conn.sync({ force: true})
}

module.exports = {
  sync,
  models: {
    Product,
    Category,
    User,
    Order,
    LineItem
  }
}

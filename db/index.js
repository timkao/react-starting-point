const conn = require('./conn');
const Product = require('./Product');
const Category = require('./Category');
const User = require('./User');
const Order = require('./Order');
const LineItem = require('./LineItem');
<<<<<<< HEAD
const Review = require('./Review');

=======
>>>>>>> 30e971ab3d585b983e1e6a4567692c0768c05c6a

Order.hasMany(LineItem);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Category.hasMany(Product);
Product.belongsTo(Category);
User.hasMany(Order);
Order.belongsTo(User);
<<<<<<< HEAD
Product.hasMany(Review);
Review.belongsTo(Product);
User.hasMany(Review);
Review.belongsTo(User);
//added for savedlist
// User.hasMany(Product);
// Product.hasMany(User);
=======
>>>>>>> 30e971ab3d585b983e1e6a4567692c0768c05c6a

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
<<<<<<< HEAD
}
=======
}
>>>>>>> 30e971ab3d585b983e1e6a4567692c0768c05c6a

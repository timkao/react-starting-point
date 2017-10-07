const Sequelize = require('sequelize');
<<<<<<< HEAD
const dataBaseUrl = process.env.DATABASE_URL || 'postgres://localhost/graceshopper'
const conn = new Sequelize(dataBaseUrl, { logging: false });


module.exports = conn;
=======
const conn = new Sequelize(process.env.DATABASE_URL, { logging: false });

module.exports = conn;
>>>>>>> 30e971ab3d585b983e1e6a4567692c0768c05c6a

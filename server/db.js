const Sequelize = require('sequelize');

const Debit = require('./model/Debit');
const Category = require('./model/Category');
const User = require('./model/user');
const Credit = require('./model/Credit');


const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

Debit.init(connection)
Category.init(connection)
User.init(connection)
Credit.init(connection)

Debit.associate(connection.models)
Category.associate(connection.models)

module.exports = connection;
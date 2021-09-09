const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        dialect: process.env.DIALECT,
        host: process.env.HOST
    }
)

const post = require('./models/post')(sequelize)
module.exports = {
    sequelize: sequelize,
    post: post
}

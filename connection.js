const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        dialect: process.env.DIALECT,
        host: process.env.HOST
    }
)
const comment = require('./models/comment')(sequelize)
module.exports = {
    sequelize: sequelize,
    comment: comment
}
const post = require('./models/post')(sequelize)
module.exports = {
    sequelize: sequelize,
    post: post
}
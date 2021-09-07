const Sequelize = require('sequelize')

module.exports = function (sequelize){
    return sequelize.define('post', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        author: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        attachments: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        timestamps: false
    })
}
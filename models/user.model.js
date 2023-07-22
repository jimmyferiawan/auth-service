const { DataTypes } = require('sequelize');
let sequelize = require('../configs/mysql.config')

const User = sequelize.define('User', 
    {
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        designation: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        account_type: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        inserted_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_on: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: 'tbluser',
        timestamps: false
    }
)

module.exports = User
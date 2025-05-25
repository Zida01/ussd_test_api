const { Sequelize, DataTypes }= require("sequelize")
const sequelize = require('../config/database')

const User = sequelize.define("User",{

    firstName:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    }

},{timestamps:true})


module.exports= User
const { Sequelize, DataTypes }= require("sequelize")
const sequelize = require('../config/database')

const Post = sequelize.define("Post",{

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


module.exports= Post

const {Sequelize} = require('sequelize')

// const sequelize= new Sequelize({
//     database:'api',
//     username:'postgres',
//     password:'olabisi',
//     host:'localhost',
//     dialect:'postgres'
// });

const sequelize= new Sequelize(dev)

sequelize.authenticate().then(()=>{
    console.log("database is connected")
}).catch( err=>{
    console.log(err)
});

module.exports= sequelize;

const {Sequelize} = require('sequelize')

// const sequelize= new Sequelize({
//     database:'api',
//     username:'postgres',
//     password:'olabisi',
//     host:'localhost',
//     dialect:'postgres'
// });
const dev = 'postgresql://neondb_owner:npg_upKNzV7Rktw3@ep-wandering-bread-a5ype6z0-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&pooling=true'
const sequelize= new Sequelize(dev)

sequelize.authenticate().then(()=>{
    console.log("database is connected")
}).catch( err=>{
    console.log(err)
});

module.exports= sequelize;
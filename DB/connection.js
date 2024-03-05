// import mongoose
const mongoose = require('mongoose')

//get the connection string
const connectionString = process.env.DATABASE
// console.log(connectionString);


// connect node.js/server with mongodb
mongoose.connect(connectionString).then(()=>{
    console.log('Mongodb Connect Succesfulliy');
}).catch((err)=>{
    console.log(`Mongodb Connection Failed ${err}`);
})
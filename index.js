//1) import dotenv
//Loads .env file contents into process.env by default.
require('dotenv').config()

//2) import express
const express = require('express')

//3) import cors
const cors = require('cors')
const router = require('./Routing/router')

//import connection.js
require('./DB/connection')

//4) create server
//Creates an Express application. The express() function is a top-level function exported by the express module.
const pfServer = express()

//5) use of cors by server
pfServer.use(cors())

//6) parsing json
//Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option
pfServer.use(express.json())

//server using the router
pfServer.use(router)

//pfServer use upload folder
//first arg - how other application use folder
//second arg - to export that perticular folder - express.static
pfServer.use('/uploads',express.static('./uploads'))

//7) customize port - bydefult - server runs at 3000
const PORT = 4000 || process.env

//8) run server
pfServer.listen(PORT,()=>{
    console.log(`Server Running Successfully In Port Number : ${PORT}`);
})

//get request
pfServer.get('/',(req,res)=>{
    res.send(`<h2 style="color:green">project fair server running successfully and ready to accept client request</h2>`)
})

//post request
pfServer.post('/',(req,res)=>{
    res.send('post reqest')
})
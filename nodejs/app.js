const  express  = require('express')
const mongoose =  require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const port = 3000

const app = express()

app.get('/' , (req , res )=>{
    res.send( "Tudo Ok")
})
app.listen(port, ()=>{
    console.log(`Servidor em http://localhost:${port}`)
})
/*
app.js
  dotenv mdbUSER="uuu", mdbPASS="ppp"
  req express, app = express(), morgan, db
  req mRouteName = require /routes/mRouteName
  db.connect
  use morgan, bodyparser?,
  use ((req, res, next) => {CORS})
  use Routes
  use ((e,req,res,next)=>{ })
  export app

server.js
  express(app)
  express.listen(port)

mmodelname.js in /models
  require mongoose
  schemaname = mongoose.Schema({})
  export schemaname
mroutename.js in /routes
  require express, route, mongoose, SchemaName
  define router.get/post etc
    SchemaName
      .find()
      .exec()
      .then(d => {})
      .catch(e => {})
*/
require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

const dbuser = process.env.mdbUSER
const dbpass = process.env.mdbPASS

mongoose.connect(`mongodb://${dbuser}:${dbpass}@jessop-ace-api-shard-00-00-pzgew.mongodb.net:27017,jessop-ace-api-shard-00-01-pzgew.mongodb.net:27017,jessop-ace-api-shard-00-02-pzgew.mongodb.net:27017/test?ssl=true&replicaSet=jessop-ace-api-shard-0&authSource=admin&retryWrites=false`)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  console.log('origin check')
  res.header('Access-Control-Allow-Headers', '*')
  console.log('headers check')
  if (req.method === 'OPTIONS') {
    console.log('method = options')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

// Routes
app.use('/products', productRoutes)
console.log('products route')
app.use('/orders', orderRoutes)
console.log('orders route')
// default 404
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
// error
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app

const express = require('express')
const app = express()
const api = require('./api/index')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use('/api', api)

module.exports = app
require('express-async-errors')

const postwebhook = require('../routes/postwebhook')
const prewebhook = require('../routes/prewebhook')
const incidents = require('../routes/incidents')
const home = require('../routes/home')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')

const error = require('../middleware/error')
const winston = require('winston')

const json = require('morgan-json')
const format = json(':method :url :status', { stringify: true })

module.exports = function (app) {
  app.use(express.json())
  app.use(express.static(__dirname + '/views'))
  // app.use(express.urlencoded({ extended: true }));
  app.use(
    morgan(format, {
      stream: {
        write: function (obj) {
          winston.info(obj)
        },
      },
    }),
  )
  app.use(helmet())
  app.use(morgan('tiny'))
  //Routes Middleware
  app.use('/api/incidents', incidents)
  app.use('/api/prewebhook', prewebhook)
  app.use('/api/postwebhook', postwebhook)
  app.use('/', home)
  app.use(error)
}

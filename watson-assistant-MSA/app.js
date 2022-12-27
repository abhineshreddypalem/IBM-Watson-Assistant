const config = require('config')
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const winston = require('winston')
const app = express()

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()

app.set('view engine', 'ejs')
app.set('views', './views')

//express middleware

//middleware
if (process.env.NODE_ENV === 'development') {
}

const port = process.env.PORT

/* console.log(__dirname)

const sslserver = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app,
)

sslserver.listen(port, () => {
  console.log(`listening on port ${port}`)
})
 */
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
 

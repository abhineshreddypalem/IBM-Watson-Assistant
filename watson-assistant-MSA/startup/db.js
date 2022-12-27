const config = require('config')
const mongoose = require('mongoose')
// const logger = require("../startup/logging");

module.exports = function () {
  const URI = config.get('db.mongoURL')

  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to MongoDB...'))
}

// mongodb+srv://:<password>@cluster0.8rfkr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

/* const mongodb = require('mongodb')
const URI = config.get('db.mongoURL')
const client = new mongodb.MongoClient(URI)

module.exports = function () {
  client.connect((err) => {
    if (!err) {
      console.log('connection created')
    }
    const newDB = client.db('hello')
  }) 
}*/

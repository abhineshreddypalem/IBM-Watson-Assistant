const config = require('config')
const mongoose = require('mongoose')

const incidentSchema = new mongoose.Schema({
  incident: String,
  description: String,
})

const Incident = mongoose.model('Incident', incidentSchema)

module.exports.Incident = Incident

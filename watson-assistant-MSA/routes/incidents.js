const express = require('express')
const router = express.Router()
const axios = require('axios')

const { Incident } = require('../models/incident')

// Incidents route
router.post('/', async (req, res) => {
  console.log('incident request body', req.body)
  if (req.body.application_name === 'jabber') {
    console.log('coming to jabber')
    const incident = await axios.post(
      'https://msamlindev.service-now.com/api/now/table/incident',
      {
        short_description: 'Unable to login into jabber',
        description: req.body.conversation,
        category: 'Software',
        subcategory: req.body.application_name,
        caller_id: 'Chandra Jethwani',
        impact: '2',
        urgency: '2',
      },
      {
        auth: {
          username: 'ChatBot_IBM',
          password: 'Password@123',
        },
      },
    )
    let result_1 = { ...incident }
    console.log('raised incident', result_1)
    console.log('Incident response body is')

    res.json({ result: result_1.data.result.number })
    let db_ticket_details = new Incident({
      incident: result_1.data.result.number,
      description: result_1.data.result.description,
    })
    const rew = await db_ticket_details.save()
  } else if (req.body.application_name === 'citrix') {
    console.log('coming to software')
    var incident = await axios.post(
      'https://msamlindev.service-now.com/api/now/table/incident',
      {
        short_description: 'I am unable to launch my Citrix desktop',
        description: req.body.conversation,
        category: 'Access',
        subcategory: req.body.application_name,
        caller_id: 'Chandra Jethwani',
        impact: '2',
        urgency: '2',
      },
      {
        auth: {
          username: 'ChatBot_IBM',
          password: 'Password@123',
        },
      },
    )
    let result_1 = { ...incident }
    console.log('raised incident', result_1)
    res.json({ result: result_1.data.result.number })
    let db_ticket_details = new Incident({
      incident: result_1.data.result.number,
      description: result_1.data.result.description,
    })
    const rew = await db_ticket_details.save()
  }
})

module.exports = router

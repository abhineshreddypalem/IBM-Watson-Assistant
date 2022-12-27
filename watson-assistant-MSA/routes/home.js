const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.render('index', {
      title: 'My express app',
      message: 'Welcome to Watson Assistant',
    })
  } catch (error) {
    console.log('error in rendering html page', error.message)
  }
})

module.exports = router

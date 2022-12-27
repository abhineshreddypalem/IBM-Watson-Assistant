const express = require('express')
const router = express.Router()
const axios = require('axios')
const Crypt = require('../utility/crypto')

router.post('/', async (req, res) => {
  console.log('postwebhook request body', req.body)
  if (req.body.payload.output['generic'][0].text) {
    console.log(
      'masking in post webhook',
      req.body.payload.context.skills['main skill'].user_defined,
    )
    let hasValue = isNaN(
      req.body.payload.context.skills['main skill'].user_defined[
        'conversation'
      ],
    )
    if (hasValue) {
      var generic_text = ''
      for (let i = 0; i <= req.body.payload.output['generic'].length - 1; i++) {
        console.log(req.body.payload.output['generic'][i].text)
        generic_text =
          generic_text +
          'Bot : ' +
          req.body.payload.output['generic'][i].text +
          ', '
      }
      var conversation_bot =
        req.body.payload.context.skills['main skill'].user_defined[
          'conversation'
        ] +
        ' ' +
        generic_text

      console.log('conversation_bot in else in else :', conversation_bot)

      req.body.payload.context.skills['main skill'].user_defined[
        'conversation'
      ] = conversation_bot
      console.log('postwebhook response body is', req.body)
      res.json(req.body)
    } else {
      console.log(
        'length of generic array :',
        req.body.payload.output['generic'].length,
      )
      var conversation_bot =
        'Bot : ' + req.body.payload.output['generic'][0].text + ' , '
      console.log('conversation_bot :', conversation_bot)

      req.body.payload.context.skills['main skill'].user_defined[
        'conversation'
      ] = conversation_bot
      console.log('postwebhook response body is', req.body)
      res.json(req.body)
    }

    /* if (
      req.body.payload.context.skills['main skill'].user_defined['masking'] ===
      'true'
    ) {
      console.log(
        'masking masking !!',
        req.body.payload.context.skills['main skill'].user_defined,
      )
      var d_p_n =
        req.body.payload.context.skills['main skill'].user_defined['phone']
      var decrypt_number = Crypt.decryptText(d_p_n)
      console.log('decrypted number :', decrypt_number)
    } */
  }
})

module.exports = router

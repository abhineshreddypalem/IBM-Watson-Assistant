const express = require('express')
const router = express.Router()
const axios = require('axios')
const Crypt = require('../utility/crypto')
const Mask = require('../utility/maskData')

router.post('/', (req, res) => {
  console.log('prewebhook request body', req.body)
  if (req.body.payload.input.text != '') {
    var conversation_1 =
      req.body.payload.context.skills['main skill'].user_defined[
        'conversation'
      ] +
      ' User : ' +
      req.body.payload.input.text +
      ', '

    req.body.payload.context.skills['main skill'].user_defined[
      'conversation'
    ] = conversation_1

    // Masking the PII data Logic

    if (
      req.body.payload.context.skills['main skill'].user_defined['masking'] ===
      'true'
    ) {
      var input_text = req.body.payload.input.text
      var regex = /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/
      var phone_number = input_text.match(regex)
      if (phone_number) {
        console.log('entered phone number is :', phone_number[0])
        var p_n = phone_number[0]
        var masked_phone_number = Mask.maskPhoneNumber(p_n)
        var input_text_after_masking = input_text.replace(
          p_n,
          masked_phone_number,
        )
        console.log('masked phone number is ', input_text_after_masking)
        req.body.payload.input.text = input_text_after_masking
        /* var encrypted_number = Crypt.encryptText(p_n)
        console.log('encrypted number :', encrypted_number)*/
        req.body.payload.context.skills['main skill'].user_defined[
          'phone'
        ] = p_n
      }
    }
    console.log('prewebhook response body', req.body)
    res.json(req.body)
  }
})

module.exports = router

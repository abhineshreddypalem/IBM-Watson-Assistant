const Maskdata = require('maskdata')

class Mask {
  maskPhoneOptions = {
    // Character to mask the data
    // default value is '*'
    maskWith: '*',

    //Should be positive Integer
    // If the starting 'n' digits needs to be unmasked
    // Default value is 4
    unmaskedStartDigits: 2,

    // Should be positive Integer
    //If the ending 'n' digits needs to be unmasked
    // Default value is 1
    unmaskedEndDigits: 0,
  }

  maskPhoneNumber(phone_number) {
    const maskedPhoneNumber = Maskdata.maskPhone(
      phone_number,
      this.maskPhoneOptions,
    )
    console.log('Masked phone no is :', maskedPhoneNumber)
    return maskedPhoneNumber
  }
  maskPwd() {
    let password = 'Password1$'
    const maskedPassword = Maskdata.maskPassword(password)
    console.log('Masked password is :', maskedPassword)
  }
  maskEmail() {
    let email = 'my.test.email@testEmail.com'
    const maskedEmail = Maskdata.maskEmail2(email)
    console.log('Masked Email is:', maskedEmail)
  }
  maskJSONfields() {
    const maskJSONOptions = {
      maskWith: '*',
      fields: ['password', 'email', 'phoneno'],
    }

    const obj = {
      password: 'IKnowNothing',
      email: 'test@gmail.com',
      phoneno: '+911234567890',
    }
    const maskedObj = Maskdata.maskJSONFields(obj, maskJSONOptions)
    console.log('Masked JSON object :', maskedObj)
  }

  maskCardNumber() {
    const maskCardOptions = {
      maskWith: 'X',
      unmaskedStartDigits: 4,
      unmaskedEndDigits: 1,
    }
    const cardNumber = '1234-5678-1234-5678'
    const cardAfterMasking = Maskdata.maskCard(cardNumber, maskCardOptions)
    console.log('Masked Card Number :', cardAfterMasking)
  }

  maskString() {
    const str = 'This is a test String'
    const maskStringOptions = {
      maskWith: '*',
      values: [],
      maskAll: true,
      maskSpace: true, // Mask spaces also
    }
    const strAfterMasking = Maskdata.maskString(str, maskStringOptions)

    console.log('Masked String :', strAfterMasking)

    return strAfterMasking
  }
}

module.exports = new Mask()

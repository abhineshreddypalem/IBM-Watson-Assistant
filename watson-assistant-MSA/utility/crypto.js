const CryptoJs = require('crypto-js')
const secretKey = 'secret Key 123'

class Crypt {
  encryptText(message) {
    const EncryptText = CryptoJs.AES.encrypt(message, secretKey).toString()
    return EncryptText
  }

  decryptText(encText) {
    const DecryptText = CryptoJs.AES.decrypt(encText, secretKey)
    const originalText = DecryptText.toString(CryptoJs.enc.Utf8)
    console.log(originalText)
    return originalText
  }
}

const crypt = new Crypt()

module.exports = new Crypt()

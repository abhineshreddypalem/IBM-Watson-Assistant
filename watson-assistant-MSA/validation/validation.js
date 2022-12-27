const Joi = require('joi')

class Validation {
  validateUser(user) {
    const schema = {
      incident: Joi.string(),
      description: Joi.string(),
    }
    return Joi.validate(user, schema)
  }
}

module.exports = new Validation()

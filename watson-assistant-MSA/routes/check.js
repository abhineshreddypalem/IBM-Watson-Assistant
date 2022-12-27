let rp = require('request-promise')

function main(params) {
  if (params.payload.input.text !== '') {
    // Send a request to the Watson Language Translator service to check the language of the input text.
    const options = {
      method: 'POST',
      url:
        'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/572b37be-09f4-4704-b693-3bc63869nnnn/v3/identify?version=2018-05-01',
      auth: {
        username: 'apikey',
        password: 'nnn',
      },
      headers: {
        'Content-Type': 'text/plain',
      },
      body: [params.payload.input.text],
      json: true,
    }
    return rp(options).then((res) => {
      params.payload.context.skills['main skill'].user_defined['language'] =
        res.languages[0].language
      //Append "in" plus "the language code" to the input text, surrounded by parentheses.
      const response = {
        body: {
          payload: {
            input: {
              text:
                params.payload.input.text +
                ' ' +
                '(in ' +
                res.languages[0].language +
                ')',
            },
          },
        },
      }
      return response
    })
  }
  return {
    body: params,
  }
}

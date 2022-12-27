require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({
      filename: 'logfile.log',
      dirname: 'C:/Users/srred/Desktop/MSAmlim/watson-assistant-MSA/logs',
    }),
  )

  //only works with synchronous code
  /* process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });
 */
  process.on('unhandledRejection', (ex) => {
    throw ex
  })

  process.on('warning', (warning) => {
    winston.warn(warning.message, warning.name)
  })

  winston.add(winston.transports.File, {
    filename: 'logfile.log',
    dirname: 'C:/Users/srred/Desktop/MSAmlim/watson-assistant-MSA/logs',
    maxsize: 100000,
    maxFiles: 10,
    timestamp: true,
    level: 'info',
  })
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/LOGS_DB',
    level: 'info',
  })
}

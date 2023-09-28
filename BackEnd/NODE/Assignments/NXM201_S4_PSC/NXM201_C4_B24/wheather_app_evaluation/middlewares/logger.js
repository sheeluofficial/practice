const winston = require("winston");
const { format, createLogger, transports } = winston;
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "winston custom format";
const { MongoDB } = require('winston-mongodb');


//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [
    new MongoDB({
      db: process.env.MONGO_URL,
      collection: 'logs',
      options: { useUnifiedTopology: true },
    }),
    new transports.Console()
  ]
});



// const  logger = (level,message)=>{

  

// }

module.exports = { logger };

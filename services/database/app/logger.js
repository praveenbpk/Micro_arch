import { koaLogger } from "../app/services/import.service";
const config = require('./configs')

class koa_Logger {
  constructor() {
    this.logger = null;
    koaLogger.logger.add("logger", {
      transports: [
        //new files will be generated each day, the date patter indicates the frequency of creating a file.
        new koaLogger.transports.DailyRotateFile({
          name: "debug-log",
          filename: `logs/${config.serviceName}-LOGGER-%DATE%.log`,
          prepend: true,
          datePattern: "YYYY-MM-DD",
          format: koaLogger.format.printf(
            (info) => `[${info.level}] | ${info.message}`
          ),
        }),
      ],
    });
    this.logger = koaLogger.logger.get("logger");
  }
  //Write an error log
      error(message) {
         this.logger.error(message);
          return true;
  }

  //Write an info log
  info(message) {
         this.logger.info(message);
         return true;
  }

  //Write a warning log
  warn(message) {
        this.logger.warn(message);
         return true;
  }

  //Function used as an express middleware to capture incoming IP address and request ID
  requestDetails(loggerInstance) {
      return function (req, res, next) {
       req.appLogger = loggerInstance;
        next();
    };
  }
}

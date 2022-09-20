const {dotenv} = require('../services/import.service');


dotenv.config();

const config ={
    env: process.env.NODE_ENV,
    serviceName: process.env.SERVICE_NAME,
    port: process.env.PORT,
    host: process.env.HOST,
    mongoDbUrl: process.env.MONGO_DB_URL,
    mongoDbName: process.env.MONGO_DB_NAME,             
};


module.exports = config;
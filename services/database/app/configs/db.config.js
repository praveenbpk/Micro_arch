const { mongoose } = require('../services/import.service');
const config = require('../configs');

mongoose.connect(`${config.mongoDbUrl}/${config.mongoDbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => {
  console.log('Database connection error', err);
});

db.once('open', function () {
  console.log('Database connected successfully');
});
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./app/config');
const router = require('./app/router');

const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({
    extended: true
  }))
  
app.use(bodyParser.json())

app.use(express.static('./app/images'));

app.set('port', config.port);
app.listen(app.get('port'), err => {
  if(err) console.error(err);
  console.log(`Server listening on port ${app.get('port')}...`);
  const db = mongoose.connect(config.db, {
      useNewUrlParser: true,
    useUnifiedTopology: true
});
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${config.db}`);
  });
});

router(app);
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const debug = require('debug')('startup:index');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const testRouter = require('./routes/test');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use('/api/testing', testRouter);
app.set('view engine', 'pug');
app.set('views', './views');

if (app.get('env') === 'development') {
  debug('development');
  app.use(morgan('tiny'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  debug(`Listening on port ${port}`);
});

app.get('/hello', (req, res) => {
  res.render('hello');
});

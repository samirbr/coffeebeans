import express from 'express';
import routes from 'express-list-routes'; // eslint-disable-line
import {default as sesson} from 'express-session';
import path from 'path';
import favicon from 'serve-favicon'; // eslint-disable-line no-unused-vars
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {chain} from 'core/helpers';
import settings from 'core/settings';
import dbconnect from 'core/dbconnect';

var application = express();

chain([
  settings,
  dbconnect
]).then(function() {
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  // uncomment after placing your favicon in /public
  app.use(favicon(path.join(__dirname, 'static', 'icon/favicon.ico')));
  app.use(express.static(path.join(__dirname, './static')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    secret: 'sword fight with Chuck Norris',
    resave: false,
    saveUninitialized: false
  }));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found:');
    err.status = 404;

    routes({ prefix: '' }, 'Valid routes', phonebook);

    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  app.use(function(err, req, res, next) {
    console.log(err.stack); // eslint-disable-line no-console

    res.status(err.status || 500)
      .send('error', {
        message: err.message,
        error: {}
      });
  });
});

export default application;

////import express library
const express = require('express');
//invoke express methods
const app = express();
//import morgan library for formated error logs
const morgan = require('morgan');
//import bodyparser library for json docs
const bodyParser = require('body-parser');
//import mongoose library
const mongoose = require('mongoose');
//import movie route from movies.js
const movieRoutes = require('./api/routes/movies');



//connection to the database on heroku mlab using process environment variable
mongoose.connect(process.env.MONGODB_URI);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});



app.use('/movies', movieRoutes );

app.use((req, res, next)=>{
  const error = new Error('not found');
  error.status(404);
  next(error);
});

app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
      error: {
        message: error.message
      }
  });
});



module.exports = app;

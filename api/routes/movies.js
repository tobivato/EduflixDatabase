const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Movie = require('../models/movies')

router.get('/', (req, res, next) => {
Movie.find()
.exec()
  .then(docs => {
    console.log(docs);
    if (docs.length>=0) {
      res.status(200).json(docs);
    }
    else {
      res.json({
        message:"no entries found"
      });
    }

  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
    error: err
      });
    });
});

router.get('/:movieId', (req, res, next) => {
  const id = req.params.movieId;
  Movie.findById(id)
  .exec()
  .then(doc=>{
    console.log(doc);
    if(doc){
      res.status(200).json(doc);
    }
    else {
      res.status(404).json({
        message: 'no valid movie id entered'
      });
    }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});



router.post('/', (req, res, next) => {
    const movie = new Movie({
      _id: new mongoose.Types.ObjectId(),
      imagePath: req.body.imagePath,
      description: req.body.description,
      title: req.body.title,
      url: req.body.url,
      message:{
        timeStart: req.body.message.timeStart ,
        timeEnd: req.body.message.timeEnd,
        text: req.body.message.text    
      }

    });
      movie.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          createdmovies: result
        });
      })
      .catch(err => {


        console.log(err);
        res.status(500).json({
          error: err
        });
      });


});


module.exports = router;

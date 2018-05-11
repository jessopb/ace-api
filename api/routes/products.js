const express = require('express');
const router = express.Router();

/*
get, post '/'
get, patch, delete '/:id'
*/

router.get( '/', (req,res,next)=> {
  res.status(200).json({
    message: 'Handling GET requests to /products'
  });
});

router.post( '/', (req,res,next)=> {
  res.status(200).json({
    message: 'Handling POST requests to /products'
  });
});

router.get( '/:productId', (req,res,next)=> {
  res.status(200).json({
    message: 'GET Product ID'
  });
});

router.patch( '/:productId', (req,res,next)=> {
  res.status(200).json({
    message: 'PATCH Product ID'
  });
});

router.delete( '/:productId', (req,res,next)=> {
  res.status(200).json({
    message: 'DELETE Product ID'
  });
});
module.exports = router;

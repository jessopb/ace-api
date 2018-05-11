const express = require('express');
const router = express.Router();

/*
get, post '/'
get, patch, delete '/:id'
*/

router.get( '/', (req,res,next)=> {
  res.status(200).json({
    message: 'Handling GET requests to / on route /orders'
  });
});

router.post( '/', (req,res,next)=> {
  res.status(200).json({
    message: 'Handling POST requests to / on route /orders'
  });
});

router.get( '/:orderID', (req,res,next)=> {
  res.status(200).json({
    message: 'GET orderId',
    orderId: req.params.orderId
  });
});

router.patch( '/:orderId', (req,res,next)=> {
  res.status(200).json({
    message: 'PATCH orderId'
  });
});

router.delete( '/:orderId', (req,res,next)=> {
  res.status(200).json({
    message: 'DELETE orderId'
  });
});
module.exports = router;

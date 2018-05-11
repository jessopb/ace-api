const express = require('express');
const router = express.Router();
/*
get, post '/'
get, patch, delete '/:id'
*/


router.get( '/', (req,res,next)=> {
  res.status(200).json({
    message: 'Handling GET requests to / on route /template(s)'
  });
});

router.post( '/', (req,res,next)=> {
  res.status(200).json({
    message: 'Handling POST requests to / on route /template(s)'
  });
});

router.get( '/:templateID', (req,res,next)=> {
  res.status(200).json({
    message: 'GET templateID',
    templateId: req.params.templateId
  });
});

router.patch( '/:templateID', (req,res,next)=> {
  res.status(200).json({
    message: 'PATCH templateID'
  });
});

router.delete( '/:templateID', (req,res,next)=> {
  res.status(200).json({
    message: 'DELETE templateID'
  });
});
module.exports = router;

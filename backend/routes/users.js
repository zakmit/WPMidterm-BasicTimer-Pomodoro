var express = require('express');
const communication = require('../mongoose/communication');
var router = express.Router();
var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
var whitelist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

/* GET users listing. */
router.get('/:userId/task/:taskId', function(req, res, next) {
  res.send(req.params);
});
router.options('/:userId/newtask/', cors(corsOptions));
router.post('/:userId/newtask/', cors(corsOptionsDelegate), function(req, res, next) {
  communication.newEntry(req.body, res);
});

router.get('/:userId/listall/', cors(corsOptionsDelegate), function(req, res, next) {
  communication.findByID(req.params.userId, res);
});
module.exports = router;

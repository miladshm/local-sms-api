var express = require('express');
var router = express.Router();
let modem = require('../services/modem.service');

/* GET home page. */
router.post('/send', function(req, res, next) {

  modem.send(req.body.phoneNumber, req.body.text);
  return res.json({ message: 'SMS sent successfully' });
});

module.exports = router;

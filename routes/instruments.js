var express = require('express');
const instrument_controlers= require('../controllers/instrument');
var router = express.Router();

router.get('/', instrument_controlers.instrument_view_all_Page );

module.exports = router;
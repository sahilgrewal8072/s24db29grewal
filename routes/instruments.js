var express = require('express');
const instrument_controlers= require('../controllers/instrument');
var router = express.Router();

// A little function to check if we have an authorized user and continue on or
// redirect to login.
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
}

router.get('/', instrument_controlers.instrument_view_all_Page );

// GET request for one instrument.
router.get('/instruments/:id', instrument_controlers.instrument_detail);

/* GET detail instrument page */
router.get('/detail', instrument_controlers.instrument_view_one_Page);

/* GET create instrument page */
router.get('/create',secured, instrument_controlers.instrument_create_Page);

/* GET create update page */
router.get('/update', secured, instrument_controlers.instrument_update_Page);

/* GET delete instrument page */
router.get('/delete', secured,instrument_controlers.instrument_delete_Page);

module.exports = router;
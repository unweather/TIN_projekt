const express = require('express');
const router = express.Router();

const PagesCotroller = require('../controllers/PagesController');
//const ContactController = require('../controllers/ContactController');

router.get('/', PagesCotroller.home);
router.get('/kontakt', PagesCotroller.contact);
//router.get('/kontakt', ContactController.contact);


module.exports = router;
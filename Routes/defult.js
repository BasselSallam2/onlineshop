const express = require('express') ;
const router = express.Router() ;
const defaultController = require('../Controller/default') ;

router.get('/' , defaultController.Getdefult ) ;



module.exports = router ;
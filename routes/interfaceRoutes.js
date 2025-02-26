const express = require('express')
const router = express.Router()
const interfaceController = require('../controllers/interfaceController')

router.get('/', interfaceController.getIndex)

// router.get('/search', interfaceController.searchItems)

router.get('/search-results', interfaceController.getAllItems)

router.post('/search-results', interfaceController.getAllItems)

module.exports = router

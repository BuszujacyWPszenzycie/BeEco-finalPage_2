const express = require('express')
const router = express.Router()
const interfaceController = require('../controllers/interfaceController')

router.get('/', interfaceController.getIndex)

// router.get('/search', interfaceController.searchItems)

router.get('/search-results', interfaceController.getResults)

module.exports = router

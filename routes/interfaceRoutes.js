const express = require('express')
const router = express.Router()
const interfaceController = require('../controllers/interfaceController')

router.get('/', interfaceController.getIndex)

router.get('/search', interfaceController.searchItems)

router.get('/search-results', interfaceController.getSearchResults)

router.post('/search-results', interfaceController.getSearchResults)

module.exports = router

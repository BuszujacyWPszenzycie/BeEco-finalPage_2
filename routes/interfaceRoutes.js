const express = require('express')

const router = express.Router()

const interfaceController = require('../controllers/interfaceController')

router.get('/', interfaceController.getIndex)

router.get('/search', interfaceController.searchItems)

module.exports = router

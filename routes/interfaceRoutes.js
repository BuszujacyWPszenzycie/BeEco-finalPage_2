const express = require('express')

const router = express.Router()

const interfaceController = require('../controllers/interfaceController')

router.get('/', interfaceController.getIndex)

module.exports = router

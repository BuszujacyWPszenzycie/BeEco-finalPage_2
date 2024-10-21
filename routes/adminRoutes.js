const express = require('express')

const router = express.Router()

const adminController = require('../controllers/adminController')

router.get('/add-item', adminController.addItem)

module.exports = router

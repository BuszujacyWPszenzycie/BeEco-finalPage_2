const mongoose = require('mongoose')

const Schema = mongoose.Schema

const trashSchema = new Schema({
	itemName: {
		type: String,
		required: true,
	},
	itemType: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	localization: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('Item', trashSchema)

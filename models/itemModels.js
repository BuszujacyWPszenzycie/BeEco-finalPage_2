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
	itemDescription: {
		type: String,
		required: true,
	},
	itemLocalization: {
		type: String,
		required: true,
	},
	itemImgUrl: {
		type: String,
		required: true,
	},
	itemTags: {
		type: String,
	},
})

module.exports = mongoose.model('Item', trashSchema)

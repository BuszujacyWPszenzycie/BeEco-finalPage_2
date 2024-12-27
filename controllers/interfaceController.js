const Item = require('../models/itemModels')
const nodemailer = require('nodemailer')

exports.getIndex = (req, res, next) => {
	res.render('index', {
		path: '/',
		pageTitle: 'Strona główna',
	})
}

// SENDING MAILS

exports.sendMail = (req, res, next) => {
	const subject = req.body.subject
	const email = req.body.email
	const message = req.body.message
	console.log(subject)
	console.log(email)
	console.log(message)

	req.body.then(result => {
		res.redirect('/')
	})
}

// SEARCH ITEMS

exports.searchItems = (req, res, next) => {
	const searchQuery = req.query.q // Get the search query from the URL
	const page = parseInt(req.query.page) || 1 // Get the current page from the URL, default to 1
	const limit = 10 // Number of items per page
	const skip = (page - 1) * limit // Calculate the number of items to skip

	// If search query is empty or not provided, return all items
	let searchCondition = {}

	if (searchQuery && searchQuery.trim() !== '') {
		const regex = new RegExp(searchQuery, 'i') // Create a case-insensitive regular expression
		searchCondition = {
			$or: [{ itemName: { $regex: regex } }, { itemType: { $regex: regex } }, { description: { $regex: regex } }],
		}
	}

	// Fetch items with pagination
	Item.find(searchCondition)
		.skip(skip)
		.limit(limit)
		.then(items => {
			// Count total items to calculate the number of pages
			return Item.countDocuments(searchCondition).then(totalItems => {
				const totalPages = Math.ceil(totalItems / limit)

				// Render the view with pagination information
				res.render('search-results', {
					path: '/search',
					pageTitle: 'Search Results',
					items: items, // Pass the found items to the view
					searchQuery: searchQuery || '', // Send back the query to show in the view if needed
					currentPage: page, // Current page number
					totalPages: totalPages, // Total number of pages
				})
			})
		})
		.catch(err => {
			console.error(err)
			res.status(500).send('An error occurred while searching.')
		})
}

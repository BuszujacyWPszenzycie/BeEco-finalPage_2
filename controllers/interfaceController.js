const Item = require('../models/itemModels')

exports.getIndex = (req, res, next) => {
	res.render('index', {
		path: '/',
		pageTitle: 'Strona główna',
	})
}

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

// exports.searchItems = (req, res, next) => {
// 	const searchQuery = req.query.q // Get the search query from the URL

// 	// If search query is empty or not provided, return all items
// 	let searchCondition = {}

// 	if (searchQuery && searchQuery.trim() !== '') {
// 		const regex = new RegExp(searchQuery, 'i') // Create a case-insensitive regular expression
// 		searchCondition = {
// 			$or: [{ itemName: { $regex: regex } }, { itemType: { $regex: regex } }, { description: { $regex: regex } }],
// 		}
// 	}

// 	Item.find(searchCondition)
// 		.then(items => {
// 			res.render('search-results', {
// 				path: '/search',
// 				pageTitle: 'Search Results',
// 				items: items, // Pass the found items to the view
// 				searchQuery: searchQuery || '', // Send back the query to show in the view if needed
// 			})
// 		})
// 		.catch(err => {
// 			console.error(err)
// 			res.status(500).send('An error occurred while searching.')
// 		})
// }

// exports.searchItems = (req, res, next) => {
// 	const searchQuery = req.query.q // Get the search query from the URL

// 	if (!searchQuery) {
// 		return res.render('search-results', {
// 			path: '/search',
// 			pageTitle: 'Search Results',
// 			items: [],
// 			searchQuery: searchQuery,
// 		})
// 	}

// 	// Create a case-insensitive regular expression for matching keywords
// 	const regex = new RegExp(searchQuery, 'i')

// 	// Search in itemName, itemType, or description fields
// 	Item.find({
// 		$or: [{ itemName: { $regex: regex } }, { itemType: { $regex: regex } }, { description: { $regex: regex } }],
// 	})
// 		.then(items => {
// 			res.render('search-results', {
// 				path: '/search',
// 				pageTitle: 'Search Results',
// 				items: items, // Pass the found items to the view
// 				searchQuery: searchQuery, // Send back the query to show in the view if needed
// 			})
// 		})
// 		.catch(err => {
// 			console.error(err)
// 			res.status(500).send('An error occurred while searching.')
// 		})
// }

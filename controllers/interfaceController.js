const Item = require('../models/itemModels')
// const nodemailer = require('nodemailer')

exports.getIndex = (req, res, next) => {
	res.render('index', {
		path: '/',
		pageTitle: 'Strona główna',
	})
}

exports.getAllItems = (req, res) => {
	Item.find()
		.then(foundItems => {
			res.render('search-results', {
				pageTitle: 'Twoje wyszukania',
				foundItems,
			}) // Przekazanie danych do widoku EJS
		})
		.catch(err => {
			console.error('Błąd pobierania danych:', err)
			res.status(500).send('Błąd serwera')
		})
}

exports.getResults = (req, res) => {
	const searchValue = req.query.searchValue?.trim() // Pobranie wartości i usunięcie białych znaków

	const query = searchValue
		? {
				$or: [
					{ itemName: new RegExp(searchValue, 'i') },
					{ itemType: new RegExp(searchValue, 'i') },
					{ itemDescription: new RegExp(searchValue, 'i') },
					{ itemLocalization: new RegExp(searchValue, 'i') },
				],
		  }
		: {} // Jeśli brak searchValue, zwracamy wszystkie elementy

	Item.find(query)
		.then(results => {
			res.render('search-results', { pageTitle: 'Twoje wyszukania', foundItems: results, searchValue })
		})
		.catch(error => {
			console.error('Błąd podczas wyszukiwania:', error)
			res.status(500).json({ message: 'Wystąpił błąd serwera' })
		})
}

// exports.getSearchResults = (req, res, next) => {
// 	res.render('search-results', {
// 		path: '/search-results',
// 		pageTitle: 'Wyniki wyszukiwania',
// 	})
// }

// SEARCH ITEMS

// exports.searchItems = (req, res, next) => {
// 	const searchQuery = req.query.q // Get the search query from the URL
// 	const page = parseInt(req.query.page) || 1 // Get the current page from the URL, default to 1
// 	const limit = 10 // Number of items per page
// 	const skip = (page - 1) * limit // Calculate the number of items to skip

// 	// If search query is empty or not provided, return all items
// 	let searchCondition = {}

// 	if (searchQuery && searchQuery.trim() !== '') {
// 		const regex = new RegExp(searchQuery, 'i') // Create a case-insensitive regular expression
// 		searchCondition = {
// 			$or: [{ itemName: { $regex: regex } }, { itemType: { $regex: regex } }, { description: { $regex: regex } }],
// 		}
// 	}

// 	// Fetch items with pagination
// 	Item.find(searchCondition)
// 		.skip(skip)
// 		.limit(limit)
// 		.then(items => {
// 			// Count total items to calculate the number of pages
// 			return Item.countDocuments(searchCondition).then(totalItems => {
// 				const totalPages = Math.ceil(totalItems / limit)

// 				// Render the view with pagination information
// 				res.render('search-results', {
// 					path: '/search',
// 					pageTitle: 'Search Results',
// 					items: items, // Pass the found items to the view
// 					searchQuery: searchQuery || '', // Send back the query to show in the view if needed
// 					currentPage: page, // Current page number
// 					totalPages: totalPages, // Total number of pages
// 				})
// 			})
// 		})
// 		.catch(err => {
// 			console.error(err)
// 			res.status(500).send('An error occurred while searching.')
// 		})
// }

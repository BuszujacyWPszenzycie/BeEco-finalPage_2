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
	const searchValue = req.query.searchValue?.trim()
	if (!searchValue) {
		return res.render('search-results', {
			pageTitle: 'Twoje wyszukania',
			foundItems: [],
			searchValue: '',
		})
	}

<<<<<<< HEAD
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
=======
	// Lista możliwych pól do przeszukiwania
	const searchableFields = ['itemName', 'itemType', 'itemDescription', 'itemLocalization', 'itemTags']

	// Filtrujemy tylko te, które zostały przesłane jako checkboxy
	const enabledFields = searchableFields.filter(field => req.query[field] !== undefined)

	// Jeśli żaden checkbox nie był zaznaczony — nie szukamy
	if (enabledFields.length === 0) {
		return res.render('search-results', {
			pageTitle: 'Twoje wyszukania',
			foundItems: [],
			searchValue,
		})
	}

	// Budujemy dynamiczne zapytanie z użyciem RegExp dla każdego zaznaczonego pola
	const query = {
		$or: enabledFields.map(field => ({
			[field]: new RegExp(searchValue, 'i'),
		})),
	}
>>>>>>> IVM3

	Item.find(query)
		.then(results => {
			res.render('search-results', {
				pageTitle: 'Twoje wyszukania',
				foundItems: results,
				searchValue,
			})
		})
		.catch(error => {
			console.error('Błąd podczas wyszukiwania:', error)
			res.status(500).json({ message: 'Wystąpił błąd serwera' })
		})
}
exports.getResults = (req, res) => {
	const searchValue = req.query.searchValue?.trim()

	// Lista możliwych pól do przeszukiwania (zgodnie z nazwami checkboxów i polami w bazie)
	const searchableFields = ['itemName', 'itemType', 'itemDescription', 'itemLocalization', 'itemTags']

	// Filtrujemy tylko te checkboxy, które były zaznaczone i przesłane w zapytaniu
	const enabledFields = searchableFields.filter(field => req.query[field] !== undefined)

	let query = {}

	if (searchValue && enabledFields.length > 0) {
		// Główne zapytanie jeśli wpisano coś i są zaznaczone pola
		query = {
			$or: enabledFields.map(field => ({
				[field]: new RegExp(searchValue, 'i'),
			})),
		}
	}

	// Jeśli nie wpisano nic — pobierz wszystkie
	// Jeśli wpisano coś, ale żaden checkbox nie był zaznaczony — zwróć pustą listę
	const queryPromise = !searchValue ? Item.find({}) : enabledFields.length > 0 ? Item.find(query) : Promise.resolve([])

	queryPromise
		.then(results => {
			res.render('search-results', {
				pageTitle: 'Twoje wyszukania',
				foundItems: results,
				searchValue,
			})
		})
		.catch(error => {
			console.error('Błąd podczas wyszukiwania:', error)
			res.status(500).json({ message: 'Wystąpił błąd serwera' })
		})
}

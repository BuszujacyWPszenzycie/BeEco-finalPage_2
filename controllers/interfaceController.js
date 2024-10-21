exports.getIndex = (req, res, next) => {
	res.render('index', {
		path: '/',
		pageTitle: 'Strona główna',
	})
}

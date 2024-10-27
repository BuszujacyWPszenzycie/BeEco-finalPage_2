const Item = require('../models/itemModels')



// Testowy controller żeby sprwdzić czy działa połączenie z bazą

exports.addItem = (req, res, next) => {
	const newItem = new Item({
		itemName: 'Butelka plastikowa',
		itemType: 'Plastik',
		description: 'To jest butelka plastikowa',
		imageUrl:
			'https://images.unsplash.com/photo-1616118133103-baf54a4790c6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	})
	newItem
		.save()
		.then(result => {
			console.log('Item added!')
			res.redirect('/')
		})
		.catch(err => console.error(err))
}

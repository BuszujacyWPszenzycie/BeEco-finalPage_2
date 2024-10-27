const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const MONGODB_URI = 'mongodb+srv://buszujacywpszenzycie:HhoGtbZhdCNrMm@cluster0.hbc0z1i.mongodb.net/beeco'

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/adminRoutes')
const interfaceRoutes = require('./routes/interfaceRoutes')
const authRoutes = require('./routes/authRoutes')

// Do momentu kiedy ten routes jest pusty musi być zakomentowany
app.use('/admin', adminRoutes)
app.use(interfaceRoutes)
app.use(authRoutes)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
// 	console.log(`Server is running on http://localhost:${PORT}`)
// })

// Łączenie się do serwera lokalnego

// mongoose
// 	.connect('mongodb://localhost:27017/BeEco')
// 	.then(() => {
// 		// Start the server once connected to the database
// 		const PORT = process.env.PORT || 3000
// 		app.listen(PORT, () => {
// 			console.log(`Server is running on http://localhost:${PORT}`)
// 		})
// 	})
// 	.catch(err => {
// 		console.error('MongoDB connection error:', err)
// 	})

// Łączenie się do serwera online

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		// Start the server once connected to the database
		const PORT = process.env.PORT || 3000
		app.listen(PORT, () => {
			// console.log(`Server is running on http://localhost:${PORT}`)
		})
	})
	.catch(err => {
		console.error('MongoDB connection error:', err)
	})

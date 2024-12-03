const path = require('path')
const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

const app = express()

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hbc0z1i.mongodb.net/${process.env.MONGO_DATABASE}`

app.set('view engine', 'ejs')
app.set('views', 'views')

const interfaceRoutes = require('./routes/interfaceRoutes')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use((req, res, next) => {
	// Generate a random nonce
	res.locals.nonce = Buffer.from(new Date().toISOString()).toString('base64')
	next()
})

// app.use(helmet(

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'unpkg.com'],
				fontSrc: ["'self'", 'fonts.gstatic.com', 'unpkg.com'],
				scriptSrc: ["'self'", 'unpkg.com', "'unsafe-inline'"],
				connectSrc: ["'self'", 'unpkg.com'],
				imgSrc: ["'self'", 'data:', 'unpkg.com', 'lezebre.lu'],
			},
		},
	})
)
app.use(compression())
app.use(morgan('combined', { stream: accessLogStream }))

// Do momentu kiedy ten routes jest pusty musi być zakomentowany
app.use(interfaceRoutes)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000

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

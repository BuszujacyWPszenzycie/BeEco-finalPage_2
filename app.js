const path = require('path')
const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const favicon = require('serve-favicon')

// MAIL

const app = express()

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hbc0z1i.mongodb.net/${process.env.MONGO_DATABASE}`

app.set('view engine', 'ejs')
app.set('views', 'views')

const interfaceRoutes = require('./routes/interfaceRoutes')
const emailRoutes = require('./routes/emailRoutes')

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: ["'self'", 'https://unpkg.com'], // Allow scripts from unpkg
				imgSrc: ["'self'", 'https://lezebre.lu'],
			},
		},
	})
)

app.use(compression())
app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'images')))

// Do momentu kiedy ten routes jest pusty musi być zakomentowany
app.use(interfaceRoutes)
app.use('/api', emailRoutes)

app.get('/favicon_leaf.ico', (req, res) => {
	res.sendFile(path.join(__dirname, 'images', 'favicon_leaf.ico'))
})

const PORT = process.env.PORT || 3000

// Uruchomoć jak będzie potrzebne połączenie z bazą danych

// mongoose
// 	.connect(MONGODB_URI)
// 	.then(() => {
// 		// Start the server once connected to the database
// 		const PORT = process.env.PORT || 3000
// 		app.listen(PORT, () => {
// 			// console.log(`Server is running on http://localhost:${PORT}`)
// 		})
// 	})
// 	.catch(err => {
// 		console.error('MongoDB connection error:', err)
// 	})

app.listen(PORT, () => {
	// console.log(`Server is running on http://localhost:${PORT}`)
})

// const transporter = nodemailer.createTransport({
// 	service: 'Gmail',
// 	host: process.env.SMTP_HOST,
// 	port: process.env.SMTP_PORT,
// 	secure: true,
// 	auth: {
// 		user: process.env.SMTP_USER,
// 		pass: process.env.SMTP_PASS,
// 	},
// })

// const mailOptions = {
// 	from: 'test@gmail.com',
// 	to: 'contact.beeco@gmail.com',
// 	subject: 'Hello from Nodemailer',
// 	text: 'Is this working?.',
// }

// transporter.sendMail(mailOptions, (error, info) => {
// 	if (error) {
// 		console.error('Error sending email: ', error)
// 	} else {
// 		console.log('Email sent: ', info.response)
// 	}
// })

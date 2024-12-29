const nodemailer = require('nodemailer')
const errorController = require('./errorController')

// const transporter = nodemailer.createTransport({
// 	service: 'gmail',
// 	auth: {
// 		user: process.env.SMTP_USER,
// 		pass: process.env.SMTP_PASS,
// 	},
// })

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: true,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
})

exports.sendEmail = (req, res) => {
	const { message, subject, email } = req.body

	const mailOptions = {
		from: email,
		to: 'contact.beeco@gmail.com',
		subject: subject,
		text: `Wiadomość od: ${email}\n\n${message}`,
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error)
			errorController.get404(req, res, next)
		} else {
			console.log('Email wysłany: ' + info.response)
			res.redirect('/send-email')
		}
	})
}

exports.renderSendEmailPage = (req, res) => {
	res.render('send-email', {
		path: '/send-email',
		pageTitle: 'Dziękuję za kontakt!',
	})
}

// transporter.sendMail(mailOptions, (error, info) => {
// 	if (error) {
// 		console.error('Error sending email: ', error)
// 	} else {
// 		console.log('Email sent: ', info.response)
// 	}
// })

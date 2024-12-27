const nodemailer = require('nodemailer')

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
			res.status(500).send('Wystąpił błąd podczas wysyłania e-maila')
		} else {
			console.log('Email wysłany: ' + info.response)
			res.status(200).send('E-mail został wysłany pomyślnie')
		}
	})
}

// transporter.sendMail(mailOptions, (error, info) => {
// 	if (error) {
// 		console.error('Error sending email: ', error)
// 	} else {
// 		console.log('Email sent: ', info.response)
// 	}
// })

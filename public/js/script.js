const cookieBox = document.querySelector('.cookie__box')
const cookieBtn = document.querySelector('.cookie__btn')

const showCookie = () => {
	const cookieEten = localStorage.getItem('cookie')
	if (cookieEten) {
		cookieBox.classList.add('hide')
	}
}

const handleCookieBox = () => {
	console.log('działa?')
	localStorage.setItem('cookie', 'true')
	cookieBox.classList.add('hide')
}

cookieBtn.addEventListener('click', handleCookieBox)
showCookie()

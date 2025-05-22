const cookiesWrapper = document.querySelector('.cookies__wrapper')
const cookiesBtn = document.querySelector('.cookies__button')

const disableScroll = () => {
	document.documentElement.style.overflow = 'hidden'
	document.body.style.overflow = 'hidden'
}

const enableScroll = () => {
	document.documentElement.style.overflow = ''
	document.body.style.overflow = ''
}

const showCookie = () => {
	const cookiesEaten = localStorage.getItem('cookie')

	if (!cookiesEaten) {
		disableScroll()
	} else {
		cookiesWrapper.classList.add('cookies__hide')
		enableScroll()
	}
}

const handleCookieWrapper = () => {
	localStorage.setItem('cookie', 'true')
	cookiesWrapper.classList.add('cookies__hide')
	enableScroll()
}

cookiesBtn.addEventListener('click', handleCookieWrapper)
showCookie()

// COOKIE BOX

// const cookieBox = document.querySelector('.cookie__box')
// const cookieBtn = document.querySelector('.cookie__btn')

// const showCookie = () => {
// 	const cookieEten = localStorage.getItem('cookie')
// 	if (cookieEten) {
// 		cookieBox.classList.add('hide')
// 	}
// }

// const handleCookieBox = () => {
// 	localStorage.setItem('cookie', 'true')
// 	cookieBox.classList.add('hide')
// }

// cookieBtn.addEventListener('click', handleCookieBox)
// showCookie()

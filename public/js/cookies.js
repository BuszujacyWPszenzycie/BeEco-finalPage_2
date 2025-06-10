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

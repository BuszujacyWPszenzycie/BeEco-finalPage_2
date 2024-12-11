const hamburgerBtn = document.querySelector('.hamburger')
const navMobileIcon = document.querySelector('.header__icon')
const navMobileTitle = document.querySelector('.header__title')
const navMobile = document.querySelector('.nav__mobile')

const showMobileNav = () => {
	hamburgerBtn.classList.toggle('is-active')
	navMobileIcon.classList.toggle('show-nav-header')
	navMobileTitle.classList.toggle('show-nav-header')
	navMobile.classList.toggle('show-mobile-nav')
}

hamburgerBtn.addEventListener('click', showMobileNav)

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

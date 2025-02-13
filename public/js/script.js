const hamburgerBtn = document.querySelector('.hamburger')
const navMobileIcon = document.querySelector('.header__icon')
const navMobileTitle = document.querySelector('.header__title')
const navMobile = document.querySelector('.nav__mobile')
const body = document.querySelector('body')
const header = document.querySelector('.header')
const navDesktopLinks = document.querySelectorAll('.nav__desktop--link')

const scrollThreshold = 0 // Adjust this value as needed

window.addEventListener('scroll', () => {
	if (window.scrollY > scrollThreshold) {
		header.classList.add('header__fixed')
		navMobileTitle.classList.add('header__title--fixed')
		navMobileIcon.classList.add('header__icon--fixed')
		navDesktopLinks.forEach(link => link.classList.add('nav__desktop--link--fixed'))
		// navDesktopLink.classList.add('nav__desktop--link--fixed')
	} else {
		header.classList.remove('header__fixed')
		navMobileTitle.classList.remove('header__title--fixed')
		navMobileIcon.classList.remove('header__icon--fixed')
		navDesktopLinks.forEach(link => link.classList.remove('nav__desktop--link--fixed'))
	}
})

// Normal showing nav
const showMobileNav = () => {
	hamburgerBtn.classList.toggle('is-active')
	navMobileIcon.classList.toggle('show-nav-header')
	navMobileTitle.classList.toggle('show-nav-header')
	navMobile.classList.toggle('show-nav-mobile')
	body.classList.toggle('show-nav-body')
}

// Function for closing the nave once the user click the link --> for the below function
const closeMobileNav = () => {
	hamburgerBtn.classList.remove('is-active')
	navMobileIcon.classList.remove('show-nav-header')
	navMobileTitle.classList.remove('show-nav-header')
	navMobile.classList.remove('show-nav-mobile')
	body.classList.remove('show-nav-body')
}

// Closing nav once the user click any of the links
navMobile.querySelectorAll('a').forEach(link => {
	link.addEventListener('click', closeMobileNav)
})

// Event listener for clicks outside the nav
document.addEventListener('click', event => {
	if (!navMobile.contains(event.target) && !hamburgerBtn.contains(event.target)) {
		closeMobileNav()
	}
})

// Prevent clicks inside the nav from closing it
navMobile.addEventListener('click', event => {
	event.stopPropagation()
})

hamburgerBtn.addEventListener('click', showMobileNav)

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

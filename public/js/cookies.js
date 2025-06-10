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

// ✅ Obsługa ewentualnego hasha – teraz i po zmianie
const handleHash = () => {
	if (window.location.hash && !localStorage.getItem('cookie')) {
		sessionStorage.setItem('scrollToHashAfterCookies', window.location.hash)
		history.replaceState(null, '', window.location.pathname)
	}
}

// ✅ Przescrolluj po akceptacji cookies
const handleCookieWrapper = () => {
	localStorage.setItem('cookie', 'true')
	cookiesWrapper.classList.add('cookies__hide')
	enableScroll()

	const hash = sessionStorage.getItem('scrollToHashAfterCookies')
	if (hash) {
		const target = document.querySelector(hash)
		if (target) {
			// Małe opóźnienie – by mieć pewność, że scroll działa po enableScroll
			setTimeout(() => {
				target.scrollIntoView({ behavior: 'smooth' })
			}, 100)
		}
		sessionStorage.removeItem('scrollToHashAfterCookies')
	}
}

// ✅ Główna funkcja uruchamiana na starcie
const showCookie = () => {
	if (!localStorage.getItem('cookie')) {
		disableScroll()
		handleHash() // obsłuż hash od razu
	} else {
		cookiesWrapper.classList.add('cookies__hide')
		enableScroll()
	}
}

cookiesBtn.addEventListener('click', handleCookieWrapper)
window.addEventListener('hashchange', handleHash) // ← nowy kluczowy fragment

showCookie()

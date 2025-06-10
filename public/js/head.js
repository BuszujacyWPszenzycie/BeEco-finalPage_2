if (window.location.hash) {
	sessionStorage.setItem('scrollToHashAfterCookies', window.location.hash)
	history.replaceState(null, '', window.location.pathname) // usuwa hash z URL
}

window.addEventListener('pageshow', function (event) {
	if (event.persisted) {
		// Strona wczytana z bazy cache (czyli po kliknięciu "wstecz")
		const section = document.querySelector('search__section')
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
		}
	}
})

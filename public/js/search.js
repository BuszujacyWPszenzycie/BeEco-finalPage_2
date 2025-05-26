// Selection of checkboxes

document.querySelector('form').addEventListener('submit', function () {
	const checkboxes = document.querySelectorAll('input[type="checkbox"]')
	const checkedState = {}
	checkboxes.forEach(cb => {
		checkedState[cb.name] = cb.checked
	})
	localStorage.setItem('searchCheckboxes', JSON.stringify(checkedState))
})

window.addEventListener('DOMContentLoaded', () => {
	const savedState = localStorage.getItem('searchCheckboxes')
	if (savedState) {
		const checkboxes = document.querySelectorAll('input[type="checkbox"]')
		const state = JSON.parse(savedState)
		checkboxes.forEach(cb => {
			if (cb.name in state) {
				cb.checked = state[cb.name]
			}
		})
	}
})



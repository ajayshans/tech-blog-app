const login = async (event) => {
	event.preventDefault();

	const username = document.querySelector('#login-username').value.trim();
	const password = document.querySelector('#login-password').value.trim();

	if (username && password) {
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		const data = await response.json();

		if (response.ok) {
			document.location.replace('/dashboard');
			alert(data.message)
		} else {
			alert(`Error ${response.status}: ${data.message}`);
		}
	}
};

document.querySelector('#login-button').addEventListener('click', login);
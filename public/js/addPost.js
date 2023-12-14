const addPost = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#new-post-title').value.trim();
	const content = document.querySelector('#new-post-content').value.trim();

	const response = await fetch('/api/posts', {
		method: 'POST',
		body: JSON.stringify({ title, content }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert('Unable to create post!');
	}
};

document.querySelector('#new-post-button').addEventListener('click', addPost);
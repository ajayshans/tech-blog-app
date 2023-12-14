const updatePost = async (event) => {
	event.preventDefault();

	const postId = event.target.getAttribute('data-post-id');
	const title = document.querySelector('#update-post-title').value.trim();
	const content = document.querySelector('#update-post-content').value.trim();

	const response = await fetch(`/api/posts/${postId}`, {
		method: 'PUT',
		body: JSON.stringify({ title, content }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace(`/post/${postId}`);
	} else {
		alert('Failed to update post!');
	}
};

document
	.querySelector('#update-post-button')
	.addEventListener('click', updatePost);
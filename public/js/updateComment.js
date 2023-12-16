const updateComment = async (event) => {
	event.preventDefault();

	const postId = event.target.getAttribute('data-post-id');
	const commentId = event.target.getAttribute('data-comment-id');
	const comment = document.querySelector('#update-comment').value.trim();

	const response = await fetch(`/api/comments/${commentId}`, {
		method: 'PUT',
		body: JSON.stringify({ comment }),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace(`/`);
	} else {
		alert('Failed to update comment.');
	}
};

document
	.querySelector('#update-comment-button')
	.addEventListener('click', updateComment);
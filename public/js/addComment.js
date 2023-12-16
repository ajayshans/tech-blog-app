const addComment = async (event) => {
	event.preventDefault();

	const post = document.querySelector('.post');
	const post_id = post.getAttribute('data-post-id');
	const comment = document.querySelector('#new-comment').value.trim();

	const response = await fetch('/api/comments', {
		method: 'POST',
		body: JSON.stringify({
			post_id: post_id,
			comment: comment,
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.reload();
        console.log(response.ok);
	} else {
		alert('Failed to add comment.');
	}
};

document.querySelector('#comment-button').addEventListener('click', addComment);
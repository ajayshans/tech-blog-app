const deleteComment = async (event) => {
	const commentId = event.target.getAttribute('data-comment-id');

	const response = await fetch(`/api/comments/${commentId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		document.location.reload();
	} else {
		alert('Failed to delete comment.');
	}
};

document.querySelectorAll('.delete-comment-button').forEach((button) => {
	button.addEventListener('click', deleteComment);
});
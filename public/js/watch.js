const answerSubmitBtn = document.querySelector('.suggestion-btn__answer');
const input = document.getElementById('answer');

answerSubmitBtn.addEventListener('click', async () => {
  const suggestionId = answerSubmitBtn.dataset.id;
  const contents = input.value;
  await fetch(`/suggestion/${suggestionId}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      suggestionId,
      contents,
    }),
  });
  window.location.reload();
});

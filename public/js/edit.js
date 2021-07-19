const answerEditBtn = document.querySelector('.suggestion-btn__edit');
const input = document.getElementById('answer');

answerEditBtn.addEventListener('click', async () => {
  const { answer: answerId, suggestion: suggestionId } = answerEditBtn.dataset;
  console.log(answerId, suggestionId);
  const contents = input.value;
  await fetch(`/suggestion/${suggestionId}/answer`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      answerId,
      contents,
    }),
  });
  window.location.href = `/suggestion/${suggestionId}`;
});

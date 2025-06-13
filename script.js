function nextStep(stepId) {
  document.querySelectorAll('.container').forEach(div => div.style.display = 'none');
  document.getElementById(stepId).style.display = 'block';
}

function previousStep(stepId) {
  nextStep(stepId);
}

function checkAnswer(inputId, correctAnswer, successId, failureId) {
  const userAnswer = document.getElementById(inputId).value.trim();
  if (userAnswer === correctAnswer) {
    nextStep(successId);
  } else {
    document.getElementById(failureId).style.display = 'block';
  }
}

function submitResult(stone) {
  const teamName = document.getElementById('team-name').value.trim();
  if (!teamName) return alert('팀 이름을 입력하세요!');

  const results = JSON.parse(localStorage.getItem('results')) || [];
  results.push({ team: teamName, stone, time: new Date().toLocaleString() });
  localStorage.setItem('results', JSON.stringify(results));
  alert('결과가 저장되었습니다!');
  location.href = 'results.html';
}
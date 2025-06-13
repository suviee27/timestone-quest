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

function loadResults() {
  const results = JSON.parse(localStorage.getItem('results')) || [];
  const resultsList = document.getElementById('results-list');

  if (results.length === 0) {
    resultsList.innerHTML = '<li>저장된 결과가 없습니다.</li>';
    return;
  }

  results.forEach(result => {
    const li = document.createElement('li');
    li.textContent = `${result.team} - ${result.stone} (저장 시각: ${result.time})`;
    resultsList.appendChild(li);
  });
}

function clearResults() {
  if (confirm('모든 결과를 삭제하시겠습니까?')) {
    localStorage.removeItem('results');
    alert('결과가 초기화되었습니다.');
    location.reload();
  }
}

function deleteSelectedResults() {
  const password = document.getElementById('admin-password').value;
  if (password !== 'admin123') {
    alert('비밀번호가 틀렸습니다.');
    return;
  }

  alert('선택된 결과가 삭제되었습니다. (기능 구현 필요)');
}

document.addEventListener('DOMContentLoaded', loadResults);
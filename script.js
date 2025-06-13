// 특정 단계로 이동 (퀴즈나 결과 화면 등)
function nextStep(stepId) {
  document.querySelectorAll('.container').forEach(div => (div.style.display = 'none'));
  document.getElementById(stepId).style.display = 'block';
}

// 이전 단계로 이동
function previousStep(stepId) {
  nextStep(stepId);
}

// 퀴즈 정답 확인
function checkAnswer(inputId, correctAnswer, successId, failureId) {
  const userAnswer = document.getElementById(inputId).value.trim();
  if (userAnswer === correctAnswer) {
    nextStep(successId); // 정답일 경우 성공 화면으로 이동
  } else {
    document.getElementById(failureId).style.display = 'block'; // 오답 메시지 표시
  }
}

// 스톤 결과 확인 및 표시
function showResult() {
  const params = new URLSearchParams(window.location.search);
  const resultId = params.get('quiz'); // URL에서 퀴즈 ID 가져오기
  const resultDiv = document.getElementById(`${resultId}-result`);

  if (resultDiv) {
    resultDiv.style.display = 'block'; // 해당 결과 표시
  } else {
    alert('결과를 찾을 수 없습니다.'); // 잘못된 퀴즈 ID 처리
    location.href = 'clue-list.html'; // 목록으로 돌아가기
  }
}

// 이미지 다운로드 기능
function downloadImage(imagePath) {
  const link = document.createElement('a');
  link.href = imagePath;
  link.download = 'stone-image.png'; // 저장될 파일 이름
  link.click(); // 다운로드 실행
}

// 결과 목록 로드
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

// 결과 초기화
function clearResults() {
  if (confirm('모든 결과를 삭제하시겠습니까?')) {
    localStorage.removeItem('results');
    alert('결과가 초기화되었습니다.');
    location.reload();
  }
}

// 결과 제출 및 저장
function submitResult(stone) {
  const teamName = document.getElementById('team-name').value.trim();
  if (!teamName) {
    alert('팀 이름을 입력하세요!');
    return;
  }

  const results = JSON.parse(localStorage.getItem('results')) || [];
  results.push({ team: teamName, stone, time: new Date().toLocaleString() });
  localStorage.setItem('results', JSON.stringify(results));
  alert('결과가 저장되었습니다!');
  location.href = 'results.html'; // 결과 페이지로 이동
}

// 페이지 로드 시 특정 작업 수행
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = document.body.getAttribute('data-page');

  if (currentPage === 'results') {
    loadResults(); // 결과 목록 페이지에서 결과 로드
  } else if (currentPage === 'stone-result') {
    showResult(); // 스톤 결과 페이지에서 결과 표시
  }
});
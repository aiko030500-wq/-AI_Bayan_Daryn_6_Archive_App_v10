// --- PIN login ---
const overlay = document.getElementById('pinOverlay');
const pinInput = document.getElementById('pinInput');
const pinMsg = document.getElementById('pinMsg');
const roleBadge = document.getElementById('roleBadge');
const journal = document.getElementById('teacherJournal');
const starsBadge = document.getElementById('starsBadge');
let role = 'student';
let stars = 0;

document.getElementById('pinEnter').onclick = () => {
  const pin = pinInput.value.trim();
  if (pin === '1402') {
    role = 'student';
    roleBadge.textContent = 'Role: Student';
    overlay.style.display = 'none';
  } else if (pin === '9998') {
    role = 'teacher';
    roleBadge.textContent = 'Role: Teacher';
    overlay.style.display = 'none';
    journal.classList.remove('hidden');
  } else {
    pinMsg.textContent = '❌ Incorrect PIN';
  }
};

// --- Load content ---
function loadContent(path) {
  fetch(path)
    .then(r => r.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
    });
}

function goHome() {
  document.getElementById('content').innerHTML = `
  <div class='home card'>
  <h2>Welcome!</h2>
  <p>Select a section above to begin practice.</p>
  </div>`;
}

// --- Check answers ---
function checkAnswers(section, valuePerCorrect) {
  const inputs = document.querySelectorAll('input[type=radio]:checked');
  let correct = 0;
  inputs.forEach(i => {
    if (i.value === 'correct') correct++;
  });
  const score = correct * valuePerCorrect;
  stars += score;
  starsBadge.textContent = `⭐ ${stars}`;
  alert(`${section}: You got ${correct} correct = ${score} points`);
  if (role === 'teacher') {
    const li = document.createElement('li');
    li.textContent = `${section} — ${score} points`;
    document.getElementById('journalList').appendChild(li);
  }
}

// --- Teacher journal ---
function clearJournal() {
  document.getElementById('journalList').innerHTML = '';
}

// --- Simple AI chat simulation ---
function sendChat() {
  const input = document.getElementById('chatInput');
  const box = document.getElementById('chatBox');
  const msg = input.value.trim();
  if (!msg) return;
  const user = document.createElement('div');
  user.textContent = '🧑: ' + msg;
  box.appendChild(user);
  const reply = document.createElement('div');
  reply.textContent = '🤖 AI Bayan: ' + getAIReply(msg);
  box.appendChild(reply);
  input.value = '';
  box.scrollTop = box.scrollHeight;
}

function getAIReply(q) {
  q = q.toLowerCase();
  if (q.includes('verb')) return 'A verb is an action word. Example: run, play, read.';
  if (q.includes('past')) return 'The past form of “go” is “went”.';
  if (q.includes('article')) return 'We use “a/an” with singular nouns, and “the” for specific ones.';
  if (q.includes('thank')) return 'You are welcome!';
  return "I'm your study assistant. Ask me about grammar, vocabulary, or writing!";
}

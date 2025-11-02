/* === PIN Login === */
const overlay = document.querySelector('.overlay');
const overlayMsg = document.querySelector('.msg');

function checkPin() {
  const input = document.getElementById('pin').value.trim();
  if (input === "1402" || input === "9998") {
    overlay.style.display = "none";  // скрываем экран входа
    document.body.classList.add("unlocked"); // показываем меню
    localStorage.setItem("role", input === "9998" ? "teacher" : "student");
  } else {
    overlayMsg.textContent = "Incorrect PIN. Try again.";
  }
}

/* === Menu Navigation === */
function goSection(id) {
  document.querySelectorAll('main section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function goHome() {
  document.querySelectorAll('main section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById('home').classList.remove('hidden');
}

/* === Stars and Score === */
let score = 0;
function checkAnswer(radio) {
  if (radio.value === "correct") {
    score++;
    alert("⭐ Correct! Your score: " + score);
    saveJournalEntry("Correct answer in " + document.title);
  } else {
    alert("❌ Wrong! Try again.");
  }
}

/* === Teacher Journal === */
function saveJournalEntry(text) {
  let journal = JSON.parse(localStorage.getItem("journal") || "[]");
  journal.push({ text, time: new Date().toLocaleString() });
  localStorage.setItem("journal", JSON.stringify(journal));
  renderJournal();
}
function renderJournal() {
  const ul = document.querySelector('.journal ul');
  if (!ul) return;
  ul.innerHTML = '';
  let journal = JSON.parse(localStorage.getItem("journal") || "[]");
  journal.forEach(e => {
    const li = document.createElement("li");
    li.textContent = e.time + " — " + e.text;
    ul.appendChild(li);
  });
}
renderJournal();

/* === AI Chat Bayan === */
const chatBox = document.querySelector('.chat-box');
const chatInput = document.getElementById('chatInput');
function sendMsg() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addMsg("🧑‍🎓 You: " + msg);
  chatInput.value = '';
  setTimeout(() => {
    const reply = aiBayanReply(msg);
    addMsg("🤖 Bayan: " + reply);
  }, 600);
}
function addMsg(text) {
  const p = document.createElement("p");
  p.textContent = text;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function aiBayanReply(input) {
  input = input.toLowerCase();
  if (input.includes("hello")) return "Hello! How can I help you today?";
  if (input.includes("grammar")) return "Remember: verbs in the past simple end with -ed for regular verbs.";
  if (input.includes("writing")) return "Try to include an introduction, body, and conclusion.";
  if (input.includes("reading")) return "Focus on keywords and read the question carefully.";
  if (input.includes("use of english")) return "Practice with examples and review tenses.";
  return "Good question! Think carefully and I’m sure you’ll find the answer.";
}

/* === Chat Toggle (mobile) === */
const sidebar = document.querySelector('.sidebar');
const toggleChat = document.getElementById('toggleChat');
if (toggleChat) {
  toggleChat.onclick = () => {
    sidebar.classList.toggle('active');
  };
}

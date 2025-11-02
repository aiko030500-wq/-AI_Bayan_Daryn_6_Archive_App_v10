/* === PIN Login === */
function checkPin() {
  const pin = document.getElementById("pin").value.trim();
  if (pin === "1402" || pin === "9998") {
    document.querySelector(".overlay").style.display = "none";
    document.getElementById("home").classList.remove("hidden");
    localStorage.setItem("role", pin === "9998" ? "teacher" : "student");
    document.getElementById("roleBadge").textContent =
      "Role: " + (pin === "9998" ? "Teacher" : "Student");
  } else {
    document.getElementById("pin").value = ""; // очищаем поле
  }
}

/* === Navigation === */
function goSection(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function goHome() {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById("home").classList.remove("hidden");
}

/* === Score System === */
let score = 0;
function checkAnswer(radio) {
  if (radio.value === "correct") {
    score++;
    alert("⭐ Correct! Total score: " + score);
    document.getElementById("starsBadge").textContent = "⭐ " + score;
    saveJournalEntry("Correct answer recorded");
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
  const ul = document.querySelector(".journal ul");
  if (!ul) return;
  ul.innerHTML = "";
  JSON.parse(localStorage.getItem("journal") || "[]").forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.time} — ${entry.text}`;
    ul.appendChild(li);
  });
}
renderJournal();

/* === AI Chat Bayan === */
const chatBox = document.getElementById("chatBox");
const chatInput = document.getElementById("chatInput");

function sendMsg() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addMsg("🧑‍🎓 You: " + msg);
  chatInput.value = "";
  setTimeout(() => addMsg("🤖 Bayan: " + aiBayanReply(msg)), 600);
}

function addMsg(text) {
  const p = document.createElement("p");
  p.textContent = text;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function aiBayanReply(input) {
  const txt = input.toLowerCase();
  if (txt.includes("hello")) return "Hello! How can I help you today?";
  if (txt.includes("grammar")) return "Review tenses and sentence structure.";
  if (txt.includes("writing")) return "Include introduction, main part, and conclusion.";
  if (txt.includes("reading")) return "Focus on key words in the text.";
  if (txt.includes("use")) return "Practice grammar and vocabulary daily.";
  return "Good thinking! Keep practicing and you’ll improve.";
}

/* === Chat Toggle (mobile) === */
const sidebar = document.querySelector(".sidebar");
const toggleChat = document.getElementById("toggleChat");
if (toggleChat) {
  toggleChat.onclick = () => {
    sidebar.classList.toggle("active");
  };
}

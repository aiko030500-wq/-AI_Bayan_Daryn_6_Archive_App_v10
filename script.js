/* === PIN Login === */
function checkPin() {
  const pin = document.getElementById("pin").value.trim();
  if (pin === "1402" || pin === "9998") {
    document.querySelector(".overlay").style.display = "none";
    document.getElementById("home").classList.remove("hidden");
    localStorage.setItem("role", pin === "9998" ? "teacher" : "student");
  } else {
    // просто очищаем поле, без сообщений
    document.getElementById("pin").value = "";
  }
}

/* === Menu Navigation === */
function goSection(id) {
  document.querySelectorAll("main section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function goHome() {
  document.querySelectorAll("main section").forEach(s => s.classList.add("hidden"));
  document.getElementById("home").classList.remove("hidden");
}

/* === Score system === */
let score = 0;
function checkAnswer(radio) {
  if (radio.value === "correct") {
    score++;
    alert("⭐ Correct! Total score: " + score);
    saveJournalEntry("Correct answer");
  } else {
    alert("❌ Wrong! Try again.");
  }
}

/* === Journal === */
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
  JSON.parse(localStorage.getItem("journal") || "[]").forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.time} — ${e.text}`;
    ul.appendChild(li);
  });
}
renderJournal();

/* === Chat Bayan === */
const chatBox = document.querySelector(".chat-box");
const chatInput = document.getElementById("chatInput");
function sendMsg() {
  const msg = chatInput.value.trim();
  if (!msg) return;
  addMsg("🧑‍🎓 You: " + msg);
  chatInput.value = "";
  setTimeout(() => addMsg("🤖 Bayan: " + aiBayanReply(msg)), 500);
}
function addMsg(text) {
  const p = document.createElement("p");
  p.textContent = text;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function aiBayanReply(input) {
  const txt = input.toLowerCase();
  if (txt.includes("grammar")) return "Review tenses and sentence structure.";
  if (txt.includes("writing")) return "Add introduction, main part, and conclusion.";
  if (txt.includes("reading")) return "Find keywords in the text.";
  if (txt.includes("use")) return "Practice grammar and vocabulary.";
  return "Good thinking! Try again carefully.";
}

/* === Chat Toggle === */
const sidebar = document.querySelector(".sidebar");
const toggleChat = document.getElementById("toggleChat");
if (toggleChat) toggleChat.onclick = () => sidebar.classList.toggle("active");

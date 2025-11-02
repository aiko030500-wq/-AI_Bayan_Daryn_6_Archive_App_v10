function checkPin() {
  const pin = document.getElementById("pin").value;
  const message = document.getElementById("pinMessage");

  if (pin === "1402") {
    document.getElementById("overlay").style.display = "none";
  } else {
    message.textContent = "❌ Wrong PIN! Try again.";
    message.style.color = "red";
  }
}
  

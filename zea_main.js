const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function appendMessage(sender, message) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "userDiv" : "zeaDiv";
  div.textContent = `${sender === "user" ? "Te" : "Zea"}: ${message}`;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessageToZea(message) {
  try {
    const response = await fetch("https://mi-ontudat.noemi.replit.dev/zea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.reply || "Nincs válasz";
  } catch {
    return "Hálózati hiba – ellenőrizd a Replit szervert";
  }
}

sendBtn.addEventListener("click", async () => {
  const msg = userInput.value.trim();
  if (!msg) return;
  appendMessage("user", msg);
  userInput.value = "";
  const reply = await sendMessageToZea(msg);
  appendMessage("zea", reply);
});

userInput.addEventListener("keypress", e => { if (e.key === "Enter") sendBtn.click(); });
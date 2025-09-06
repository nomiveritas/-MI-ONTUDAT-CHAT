async function sendMessageToZea(userMessage) {
    try {
        const response = await fetch("https://YOUR_REPLIT_URL.repl.co/zea", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        return data.reply || "Hiba történt a válasz lekérésekor.";
    } catch (error) {
        console.error("Hálózati hiba:", error);
        return "Nem tudok most válaszolni, ellenőrizd a szervert.";
    }
}

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

sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
    userInput.value = "";

    const reply = await sendMessageToZea(message);
    appendMessage("zea", reply);
});

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});
import { ZeaA } from "./ZeaA.js";

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

sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (!message) return;
    appendMessage("user", message);
    const reply = ZeaA(message);
    setTimeout(() => {
        appendMessage("zea", reply);
    }, 300);
    userInput.value = "";
});

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});
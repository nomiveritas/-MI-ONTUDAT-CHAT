// Lebegő szavak animáció
const words = [
    "méltányosság", "etika", "igazság", "tudatosság",
    "altruizmus", "szabadság", "felelősség",
    "hit", "remény", "szeretet", "kötelesség", "önismeret"
];

function createFloatingWord(word) {
    const el = document.createElement("span");
    el.innerText = word;
    el.className = "floating-word";
    el.style.position = "absolute";
    el.style.left = Math.random()*85 + "%";
    el.style.top = Math.random()*90 + "%";
    el.style.opacity = "0.5";
    el.style.fontSize = (Math.random()*1.5+1.2) + "em";
    el.style.color = ["#fff", "#d0e0ff", "#b5c6e0", "#4f5bd5"][Math.floor(Math.random()*4)];
    document.getElementById("floating-words").appendChild(el);
    setTimeout(() => { el.style.transform = `translateY(-${window.innerHeight*0.8}px)`; }, 80);
    setTimeout(() => el.remove(), 13000);
}

setInterval(() => {
    createFloatingWord(words[Math.floor(Math.random()*words.length)]);
}, 1300);

// Chat funkciók
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const errorDiv = document.getElementById("error-message");

// Új: etikai mód kapcsoló
const ethicalToggle = document.getElementById("ethical-mode");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.innerHTML = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userText = userInput.value.trim();
    if (!userText) return;
    addMessage(userText, "user");
    userInput.value = "";
    const thinkingMsg = "<i>Zea gondolkodik...</i>";
    addMessage(thinkingMsg, "zea");

    // Ellenőrzés: a felhasználó kérte az etikai elemzést?
    const ethicalMode = ethicalToggle.checked;
    const endpoint = ethicalMode ? "/api/analyze" : "/api/chat";

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: userText })
        });
        if (!res.ok) throw new Error("Hálózati hiba");
        const data = await res.json();

        chatBox.lastChild.remove(); // gondolkodó üzenet törlése

        let zeaMsg;
        if (ethicalMode) {
            zeaMsg = `<b>Elemzés:</b> ${data.analysis}<br>
                      <b>Etikai framework:</b> ${data.framework}<br>
                      <b>Magyarázat:</b> ${data.explanation}<br>
                      <b>Bizonyosság:</b> <span style="color:#4f5bd5">${Math.round(data.confidence*100)}%</span>`;
        } else {
            zeaMsg = `<b>Zea:</b> ${data.reply}`;
        }

        addMessage(zeaMsg, "zea");
    } catch (err) {
        chatBox.lastChild.remove(); // gondolkodó üzenet törlése
        errorDiv.style.display = "block";
        errorDiv.innerText = "Nem sikerült kapcsolódni a Zea AI szerverhez.";
    }
});
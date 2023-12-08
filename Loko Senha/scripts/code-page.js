// Code imports
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { app } from "./firebase.js";
import { Player } from "./player.js";

// General Variables
const db = getDatabase(app);

// Code page elements
const startBtt = document.getElementById('start-game')
const codeBody = document.body;
const codeText = document.getElementById('code')
const host_name = document.getElementById('host-name')
const customWords = document.getElementById('custom-words')

// Code page functions
let code = ""
for (let i = 0; i < 6; i++) {
    let random = Number.parseInt(Math.random() * 10)
    code += random.toString()
}

codeText.innerText = code;

host_name.addEventListener('input', (e) => {
    validate()
})

customWords.addEventListener('input', (e) => { validate() })

function validate() {
    if (host_name.value.length >= 3 && host_name.value.length <= 10 && ((customWords.value.trim().split("\n")).length >= 5)) {
        startBtt.disabled = false
    } else {
        startBtt.disabled = true
    }
}

startBtt.addEventListener('click', async function () {
    let host = new Player(host_name.value, true)
    await set(ref(db, 'rooms/' + code), {
        players: [host.toObj()],
        words: customWords.value.trim().split("\n"),
        actualPlayerIndex: 0,
        timer: "00:00",
        actualWordIndex: 0
    })

    sessionStorage.setItem("code", code)
    sessionStorage.setItem("host", JSON.stringify(host.toObj()))
    location.href = `host.html` 
})
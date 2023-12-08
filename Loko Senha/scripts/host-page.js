import { getDatabase, ref, onChildAdded, set, onChildChanged, update } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { app } from "./firebase.js";
import { Player } from "./player.js";

const db = getDatabase(app);

const user = document.getElementById("user");
const room = document.getElementById("room");
const showRoom = document.getElementById("show-room");
const copyCode = document.getElementById("copy-code");
const timerView = document.getElementById("timer");
const startBtt = document.getElementById("start");
const actualWord = document.getElementById("actual");
var showCode = false;

const host = JSON.parse(sessionStorage.getItem("host"))
const code = sessionStorage.getItem("code")
var data = {}
var words = []
var players = []
var actualPlayerIndex = 0
var actualWordIndex = 0
var actualPlayer = 0

var pause = true

var seconds = 0
var minutes = 5

var timer = setInterval(() => {

    if (!pause) {
        if (seconds == 0 && minutes > 0) {
            minutes--;
            seconds = 60;
        }

        if (seconds <= 0 && minutes <= 0) {
            timerView.innerHTML = "Tempo esgotado!";
            
            pause = true
            seconds = 0
            minutes = 5

            document.getElementsByClassName("control")[0].style.display = "none"
            document.getElementsByClassName("buttons")[0].style.display = "flex"
        } else {
            seconds--;

            var timerText = `${minutes.toLocaleString("pt-br", {
                minimumIntegerDigits: 2,
                useGrouping: false
            })}:${seconds.toLocaleString("pt-br", {
                minimumIntegerDigits: 2,
                useGrouping: false
            })}`

            timerView.innerText = timerText
            data.timer = timerText
            updateFire()
        }
    }
    console.log("timer paused")
}, 1000)

onChildAdded(ref(db, 'rooms/' + code), (snapshot) => {
    data[snapshot.key] = snapshot.val()
    update_page()
})

onChildChanged(ref(db, 'rooms/' + code), (snapshot) => {
    data[snapshot.key] = snapshot.val()
    update_page()
})

startBtt.addEventListener("click", () => {
    pause = false;
    document.getElementsByClassName("control")[0].style.display = "flex"
    document.getElementsByClassName("buttons")[0].style.display = "none"
    actualWord.innerText = data.words[actualPlayerIndex]
})

function updateFire() {
    update(ref(db, 'rooms/' + code), data)
}

addEventListener('beforeunload', async function (_) {
    await set(ref(db, 'rooms/' + code), null)
    location.href = "index.html"
})

user.innerText = host.name
room.value = code

showRoom.addEventListener("click", () => {
    showCode = !showCode

    if (showCode) {
        room.type = "text"
        showRoom.classList.remove("fa-eye-slash")
        showRoom.classList.add("fa-eye")
    } else {
        room.type = "password"
        showRoom.classList.remove("fa-eye")
        showRoom.classList.add("fa-eye-slash")
    }
})

copyCode.addEventListener("click", () => {
    navigator.clipboard.writeText(code)
})

function update_page() {
    words = data.words
    players = data.players.filter((val) => !val.host)
    actualPlayerIndex = data.actualPlayerIndex
    actualWordIndex = data.actualWordIndex

    if (words) {
        actualWord.innerText = words[actualWordIndex]
        for (let i = actualWordIndex; i < actualWordIndex + 5; i++) {
            if (words[i]) {
                document.getElementById(`n${i + 1}`).innerText = `${i + 1} - ${words[i]}`
            } else {
                document.getElementById(`n${i + 1}`).innerText = `${i + 1} - -`
            }
        }
    }

    if (players) {
        document.getElementById("player").innerHTML = players[actualPlayerIndex].name
    }
}
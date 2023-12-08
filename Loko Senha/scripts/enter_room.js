import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { app } from "./firebase.js";
import { Player } from "./player.js";

const enterBtt = document.getElementById("enter-room");
const codeInput = document.getElementById("code");
const userInput = document.getElementById("username");

const db = getDatabase(app);
const rooms = [];
const refRooms = ref(db, "rooms");

onChildAdded(refRooms, (snapshot) => {
  rooms.push(snapshot.key);
});

codeInput.addEventListener("input", (e) => {
  verifyCredential();
});
userInput.addEventListener("input", (e) => {
  verifyCredential();
});

function verifyCredential() {
  let user = userInput.value;
  let code = codeInput.value;

  user.length >= 3 && code.length == 6
    ? (enterBtt.disabled = false)
    : (enterBtt.disabled = true);
}

enterBtt.addEventListener("click", (e) => {
  let code = codeInput.value;
  if (rooms.includes(code)) {
    enter_room();
  }
});

function enter_room() {
  let user = userInput.value;
  let code = codeInput.value;

  let player = new Player(user, false);
  set(ref(db, "rooms/" + code + "/playes" + player.id), player.toObj());

  sessionStorage.setItem("code", code);
  sessionStorage.setItem("player", JSON.stringify(player.toObj()));

  window.location.href = "game-page.html";
}

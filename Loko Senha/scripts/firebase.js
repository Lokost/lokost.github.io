import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBGU25CNlwBmQa7UQfzay6imxVnMMn4-6U",
    authDomain: "loko-senha.firebaseapp.com",
    databaseURL: "https://loko-senha-default-rtdb.firebaseio.com",
    projectId: "loko-senha",
    storageBucket: "loko-senha.appspot.com",
    messagingSenderId: "306217044426",
    databaseURL: "https://loko-senha-default-rtdb.firebaseio.com",
    appId: "1:306217044426:web:3eae427edcb03b98bce733"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }
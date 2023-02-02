// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGU25CNlwBmQa7UQfzay6imxVnMMn4-6U",
  authDomain: "loko-senha.firebaseapp.com",
  databaseURL: "https://loko-senha-default-rtdb.firebaseio.com",
  projectId: "loko-senha",
  storageBucket: "loko-senha.appspot.com",
  messagingSenderId: "306217044426",
  appId: "1:306217044426:web:3eae427edcb03b98bce733"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const mAuth = getAuth(app);

onAuthStateChanged(mAuth, user => {
  if (user != null) {
    console.log("Há um usuário logado!")
  } else {
    console.log("Não há um usuário logado!")
  }
});

function jogar() {
  alert('ainda em desenvolvimento!')
};
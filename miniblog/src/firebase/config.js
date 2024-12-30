import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDapiTXVGjamKqKV2UtWVXRT4NtxRxyPmI",
  authDomain: "miniblog-5aef0.firebaseapp.com",
  projectId: "miniblog-5aef0",
  storageBucket: "miniblog-5aef0.firebasestorage.app",
  messagingSenderId: "846916056533",
  appId: "1:846916056533:web:0ec9c9aedac2601c94b95c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
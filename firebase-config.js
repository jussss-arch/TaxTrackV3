import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD5xGFuLjA4sxBIWUryZAF_QwV2698hTfY",
    authDomain: "taxtrack-23f79.firebaseapp.com",
    projectId: "taxtrack-23f79",
    storageBucket: "taxtrack-23f79.firebasestorage.app",
    messagingSenderId: "691420383710",
    appId: "1:691420383710:web:a2228de240a77286ff754f",
    measurementId: "G-2XM7Y5YDLC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

getAnalytics(app);
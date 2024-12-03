import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGtCmw3QskPI9jyB-BB5LHN3IkqhwPerk",
    authDomain: "bakery-shop-59e3c.firebaseapp.com",
    projectId: "bakery-shop-59e3c",
    storageBucket: "bakery-shop-59e3c.appspot.com",
    messagingSenderId: "144499188515",
    appId: "1:144499188515:web:53ea8d9b0eb845a45a6296",
    measurementId: "G-KEVGH6JRX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Form and validation
const form = document.getElementById("form");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Clear errors
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validate email
    if (!pattern.test(email)) {
        emailError.textContent = "Invalid email format.";
        emailError.style.color = "red";
        return;
    }

    // Validate password
    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        passwordError.style.color = "red";
        return;
    }

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        console.log("User signed in successfully:", userCredential.user);
        alert("Login successful!");
        localStorage.setItem('userLoggedIn', 'true');
        window.location.href = "../../../index.html"; // Adjust the redirect path
    } catch (error) {
        console.error("Error during login:", error);
        if (error.code === "auth/invalid-email") {
            emailError.textContent = "Invalid email address.";
        } else if (error.code === "auth/user-not-found") {
            emailError.textContent = "Email not found.";
        } else if (error.code === "auth/wrong-password") {
            passwordError.textContent = "Incorrect password.";
        } else {
            emailError.textContent = `Error: ${error.message}`;
        }
        emailError.style.color = "red";
        passwordError.style.color = "red";
    }
});

form.addEventListener("input", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (pattern.test(email)) emailError.textContent = "";
    if (password.length >= 8) passwordError.textContent = "";
});

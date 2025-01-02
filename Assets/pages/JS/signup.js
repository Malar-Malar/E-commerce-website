import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app); // Firestore initialization

const form = document.getElementById("form");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Email pattern for validation
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Clear previous errors
    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    // Username validation
    if (username.length < 3 || username.includes(" ")) {
        usernameError.textContent = "Username must be at least 3 characters.";
        usernameError.style.color = "red";
        isValid = false;
    }

    // Email validation
    if (!emailPattern.test(email) || email.includes("..") || email.includes("@@") || email.length >= 60 || email.includes(" ")||email.includes("gmailgmail")||email.includes(".com.com")||email.includes("comcom")) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.color = "red";
        isValid = false;
    }
    else if(email.length>=255){
        emailError.textContent="email shouldn't greater than 255";
        emailError.style.color = "red";
        isValid = false;
    }

    // Password validation
    if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        passwordError.style.color = "red";
        isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        confirmPasswordError.style.color = "red";
        isValid = false;
    }

    // If all fields are valid, attempt to create the user
    if (isValid) {
        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("User registered:", user);

            // Add user details to Firestore
            await addDoc(collection(db, "users"), {
                uid: user.uid, // Store the user ID
                username: username,
                email: email,
                createdAt: new Date()
            });

            console.log("User details added to Firestore!");

            // Redirect to the desired page after successful registration
            window.location.href = "../../../index.html"; // Change this URL as needed
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                emailError.textContent = "This email is already registered. Please use a different email.";
            } else {
                emailError.textContent = `Error: ${error.message}`;
            }
            emailError.style.color = "red";
            console.error("Error during sign-up:", error);
        }
    }
});

form.addEventListener("input", function () {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (username.length > 3) usernameError.textContent = "";
    if (emailPattern.test(email)) emailError.textContent = "";
    if (password.length >= 8) passwordError.textContent = "";
    if (password === confirmPassword) confirmPasswordError.textContent = "";
});

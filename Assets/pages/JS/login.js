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

        const form = document.getElementById("form");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        form.addEventListener("submit", async function(event) {
            event.preventDefault(); // Prevent default form submission

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Clear previous errors
            emailError.textContent = "";
            passwordError.textContent = "";

            let isValid = true;

            // Email validation
            if (!pattern.test(email)) {
                emailError.textContent = "Please enter a valid email address.";
                emailError.style.color = "red";
                isValid = false;
            }

            // Password validation
            if (password.length < 8) {
                passwordError.textContent = "Password must be at least 8 characters.";
                passwordError.style.color = "red";
                isValid = false;
            }

            // If both fields are valid, attempt to sign in the user
            if (isValid) {
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
            // Successfully logged in
            const user = userCredential.user;
            console.log("User logged in:", user);
            // Redirect to dashboard or home page after successful login
            window.location.href = "../../../index.html";  // Replace with your actual redirect path
        })
                // try {
                //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
                //     console.log("User signed in successfully:", userCredential.user);
                //     alert("Login successful!");
                    // Redirect or perform additional actions here
                . catch((error)=> {
                    console.error("Error during login:", error);
                    // Display a friendly message for common sign-in errors
                    if (error.code === "auth/invalid-credential") {
                        emailError.textContent = "Invalid credentials provided.";
                    } else if (error.code === "auth/user-not-found") {
                        emailError.textContent = "No account found with this email.";
                    } else if (error.code === "auth/wrong-password") {
                        passwordError.textContent = "Incorrect password. Please try again.";
                    } else {
                        emailError.textContent = `Error: ${error.message}`;
                    }
                    emailError.style.color = "red";
                    passwordError.style.color = "red";
                })
            }
        });

        // Input event listener to clear errors on valid input
        form.addEventListener("input", function() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (pattern.test(email)) emailError.textContent = "";
            if (password.length >= 8) passwordError.textContent = "";
        });
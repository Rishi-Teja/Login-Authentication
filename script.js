// Utility functions for interacting with local storage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || {};
}

// Registration logic
function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const users = getFromLocalStorage("users");
    if (users[username]) {
        alert("Username already exists. Please choose a different one.");
        return;
    }

    users[username] = password;
    saveToLocalStorage("users", users);
    alert("You have registered successfully! You can now log in.");
    document.getElementById("register-username").value = "";
    document.getElementById("register-password").value = "";
}

// Login logic
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const users = getFromLocalStorage("users");
    if (users[username] && users[username] === password) {
        alert("Login successful!");
        sessionStorage.setItem("loggedInUser", username);
        showSecuredPage();
    } else {
        alert("Invalid username or password.");
    }
}

// Show secured page if logged in
function showSecuredPage() {
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("secured-page").classList.remove("hidden");
}

// Logout logic
function logout() {
    sessionStorage.removeItem("loggedInUser");
    document.getElementById("auth-section").classList.remove("hidden");
    document.getElementById("secured-page").classList.add("hidden");
}

// Check login status on page load
window.onload = function () {
    if (sessionStorage.getItem("loggedInUser")) {
        showSecuredPage();
    }
};

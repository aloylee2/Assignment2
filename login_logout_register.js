const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const switchForm = document.getElementById("switchForm");
const switchToLogin = document.getElementById("switchToLogin");
const switchToRegister = document.getElementById("switchToRegister");
const userArea = document.getElementById("userArea");
const loggedInUser = document.getElementById("loggedInUser");
const logoutButton = document.getElementById("logoutButton");

let isLogin = false;

switchToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = false;
    formTitle.innerText = "Register";
    authForm.querySelector("button").innerText = "Register";
    switchForm.innerHTML = 'Don\'t have an account? <a href="#"id="switchToLogin">Login here</a>';
    document.getElementById("switchToLogin").addEventListener("click"
        , (e) => {
            e.preventDefault();
            isLogin = true;
            formTitle.innerText = "Login";
            authForm.querySelector("button").innerText = "Login";
            switchForm.innerHTML = 'Already have an account? <a href="#"id="switchToRegister">Register here</a>';
        });
});

switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = true;
    formTitle.innerText = "Login";
    authForm.querySelector("button").innerText = "Login";
    switchForm.innerHTML = 'Don\'t have an account? <a href="#"id="switchToRegister">Register here</a>';
    document.getElementById("switchToRegister").addEventListener("click"
        , (e) => {
            e.preventDefault();
            isLogin = false;
            formTitle.innerText = "Register";
            authForm.querySelector("button").innerText = "Register";
            switchForm.innerHTML = 'Already have an account? <a href="#"id="switchToLogin">Login here</a>';
        });
});
authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (isLogin) {
        // Login logic
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.password === password) {
            alert("Login successful!");
            var uname= document.getElementById("username").value;
            localStorage.setItem("id", uname);

            authForm.reset();
            window.location.assign("welcome_user.html");


        } else {
            alert("Invalid username or password.");
        }
    } else {
        // Register logic
        if (localStorage.getItem(username)) {
            alert("Username already exists.");
        } else {
            localStorage.setItem(username, JSON.stringify({
                username, password
            }));
            alert("Registration successful!");
            authForm.reset();
        }
    }
});
logoutButton.addEventListener("click", () => {
    userArea.classList.add("hidden");
    authForm.classList.remove("hidden");
    alert("Logged out successfully.");
});

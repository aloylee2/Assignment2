//swiper function
function initializeSwiper() {
    return new Swiper(".swiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true
      },
      keyboard: {
        enabled: true
      },
      mousewheel: {
        thresholdDelta: 70
      },
      spaceBetween: 60,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }
  
  // Initialize Swiper
  document.addEventListener('DOMContentLoaded', () => {
    initializeSwiper();
  });

  
//feedback open up email 
function sendFeedback(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const firstName = document.getElementById('firstName').value;
    const feedbackComment = document.getElementById('feedbackComment').value;
    const recipient = 'support@azoomrental.com';

    // Encode the subject and body for the email
    const subject = 'Feedback from ' + firstName;
    const body = `Feedback Comment:\n\n${feedbackComment}`;

    // Create the mailto link
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the mailto link in the user's email client
    window.location.href = mailtoLink;

    // Clear the form fields
    document.getElementById('firstName').value = '';
    document.getElementById('feedbackComment').value = '';
}


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
    document.getElementById("switchToLogin").addEventListener("click"
        , (e) => {
            e.preventDefault();
            isLogin = true;
            formTitle.innerText = "Login";
            authForm.querySelector("button").innerText = "Login";
        });
});

switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = true;
    formTitle.innerText = "Login";
    authForm.querySelector("button").innerText = "Login";
    document.getElementById("switchToRegister").addEventListener("click"
        , (e) => {
            e.preventDefault();
            isLogin = false;
            formTitle.innerText = "Register";
            authForm.querySelector("button").innerText = "Register";
        });
});
authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (isLogin) {
        // Check for admin credentials
        if (username === "admin" && password === "admin123") {
            alert("Admin login successful!");
            window.location.href = 'adminpage.html';
            return;
        }

        // Login logic for regular users
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.password === password) {
            alert("Login successful! Hello, "+username+"!");
            localStorage.setItem("id", username);
            window.location.href = 'carselection.html';
        } else {
            alert("Invalid username or password.");
        }
    } else {
        // Register logic
        if (localStorage.getItem(username) || username === "admin" && password === "admin123") {
            alert("Username already exists.");
            authForm.reset();
        } else {
            localStorage.setItem(username, JSON.stringify({ username, password }));
            alert("Registration successful!");
            authForm.reset();
        }
    }
});
// logoutButton.addEventListener("click", () => {
//     userArea.classList.add("hidden");
//     authForm.classList.remove("hidden");
//     alert("Logged out successfully.");
// });


//sending value

function sendValue(value) {
    // Store the button value in local storage
    localStorage.setItem('buttonValue', value);
    // Redirect to the next page
    window.location.href = 'testformsavetxt.html';
}

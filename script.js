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

document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById("authForm");
    const formTitle = document.getElementById("formTitle");
    const switchToLogin = document.getElementById("switchToLogin");
    const switchToRegister = document.getElementById("switchToRegister");

    let isLogin = false;

    const updateForm = () => {
        formTitle.innerText = isLogin ? "Login" : "Register";
        authForm.querySelector("button").innerText = isLogin ? "Login" : "Register";
    };

    // Switch to Register form
    window.switchToRegisterForm = function (e) {
        e.preventDefault();
        isLogin = false;
        updateForm();
    };

    // Switch to Login form
    window.switchToLoginForm = function (e) {
        e.preventDefault();
        isLogin = true;
        updateForm();
    };

    // Handle form submission
    window.handleFormSubmit = function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (isLogin) {
            loginUser(username, password);
        } else {
            registerUser(username, password);
        }
    };

    const loginUser = (username, password) => {
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.password === password) {
            alert("Login successful! Hello, " + username + "!");
            window.location.href = 'welcome_user.html';
        } else {
            alert("Invalid username or password.");
        }
    };

    const registerUser = (username, password) => {
        if (localStorage.getItem(username)) {
            alert("Username already exists.");
        } else {
            localStorage.setItem(username, JSON.stringify({ username, password }));
            alert("Registration successful!");
            authForm.reset();
        }
    };

    // Initialize the form on page load
    updateForm();
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

// carselection send value over to form
function select(carName, carPrice) {
    localStorage.setItem('selectedCar', carName);
    localStorage.setItem('selectedPrice', carPrice);
    window.location.href = 'reserve_page.html';
  }

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

  //js for page reserve_page.html

  function setMinPickupDate() {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    document.getElementById('reserve_page_pickupDate').setAttribute('min', formattedToday);
}

function updateDropDateLimits() {
    const pickupDate = document.getElementById('reserve_page_pickupDate').value;
    const dropDateInput = document.getElementById('reserve_page_dropDate');

    if (pickupDate) {
        const pickupDateObj = new Date(pickupDate);
        const minDropDate = new Date(pickupDateObj);
        minDropDate.setDate(pickupDateObj.getDate() + 1);
        const maxDropDate = new Date(pickupDateObj);
        maxDropDate.setDate(pickupDateObj.getDate() + 7);

        dropDateInput.setAttribute('min', minDropDate.toISOString().split('T')[0]);
        dropDateInput.setAttribute('max', maxDropDate.toISOString().split('T')[0]);
    }
}

function generateCarPlateNumber() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let plateNumber = '';
    for (let i = 0; i < 7; i++) {
        plateNumber += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return plateNumber;
}

function handleSubmit(event) {
    event.preventDefault();
    const errorMessageElement = document.getElementById('reserve_page_errorMessage');
    errorMessageElement.innerText = ""; // Clear previous error messages

    const pickupDate = document.getElementById('reserve_page_pickupDate').value;
    const dropDate = document.getElementById('reserve_page_dropDate').value;

    if (new Date(dropDate) <= new Date(pickupDate)) {
        errorMessageElement.innerText = "Drop date must be after pickup date.";
        return;
    }

    const creditCardNumber = document.getElementById('reserve_page_creditNumber').value;
    const encryptedCreditCard = CryptoJS.AES.encrypt(creditCardNumber, 'your-secret-key').toString();

    const reservationDetails = {
        fullName: document.getElementById('reserve_page_fullName').value,
        email: document.getElementById('reserve_page_email').value,
        carModel: document.getElementById('reserve_page_carModel').value,
        carPrice: document.getElementById('reserve_page_carPrice').value,
        pickupDate: pickupDate,
        pickupTime: document.getElementById('reserve_page_pickupTime').value,
        dropDate: dropDate,
        dropTime: document.getElementById('reserve_page_dropTime').value,
        creditNumber: encryptedCreditCard,
        drivingLicense: document.getElementById('reserve_page_drivingLicense').value,
        carPlateNumber: generateCarPlateNumber(),
    };

    const lastFourDigits = creditCardNumber.slice(-4);
    const fileContent = `Full Name: ${reservationDetails.fullName}\nEmail: ${reservationDetails.email}\nCar Model: ${reservationDetails.carModel}\nCar Price: ${reservationDetails.carPrice}\nPickup Date: ${reservationDetails.pickupDate}\nPickup Time: ${reservationDetails.pickupTime}\nDrop Date: ${reservationDetails.dropDate}\nDrop Time: ${reservationDetails.dropTime}\nCredit Number: **** **** **** ${lastFourDigits}\nDriving License: ${reservationDetails.drivingLicense}\nCar Plate Number: ${reservationDetails.carPlateNumber}`;

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `car_reservation_${reservationDetails.fullName}.txt`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);

    const queryString = new URLSearchParams(reservationDetails).toString();
    window.location.href = `summary_page.html?${queryString}`;
}

window.onload = () => {
    setMinPickupDate();
    updateDropDateLimits();
};

//summary pagejs
// Function to get query parameters from the URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queryArray = queryString.split("&");
    queryArray.forEach(param => {
        const [key, value] = param.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params;
}

// Function to display reservation details
function displayReservationDetails() {
    const details = getQueryParams();
    if (!details.fullName) {
        document.getElementById('summaryDetails').innerHTML = '<p>Error: Reservation details are missing.</p>';
        return;
    }
    const summaryHTML = `
        <p><strong>Full Name:</strong> ${details.fullName}</p>
        <p><strong>Email:</strong> ${details.email}</p>
        <p><strong>Car Model:</strong> ${details.carModel}</p>
        <p><strong>Car Price:</strong> ${details.carPrice}</p>
        <p><strong>Pickup Date:</strong> ${details.pickupDate}</p>
        <p><strong>Pickup Time:</strong> ${details.pickupTime}</p>
        <p><strong>Drop Date:</strong> ${details.dropDate}</p>
        <p><strong>Drop Time:</strong> ${details.dropTime}</p>
        <p><strong>Car Plate Number:</strong> ${details.carPlateNumber}</p>
    `;
    document.getElementById('summaryDetails').innerHTML = summaryHTML;
}

// Function to handle car pick-up action
function pickUpCar() {
    const details = getQueryParams();
    const params = new URLSearchParams(details).toString();
    window.location.href = `pickup.html?${params}`;
}

// Call displayReservationDetails on window load
window.onload = displayReservationDetails;

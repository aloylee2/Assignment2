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
        try {
            // Check for admin credentials
            if (username === 'admin' && password === 'admin123') {
                alert("Login successful! Hello, Admin!");
                window.location.href = 'welcomeadminpage.html';
                return; // Exit after redirecting
            }
    
            const storedUser = JSON.parse(localStorage.getItem(username));
            
            // Check for regular user credentials
            if (storedUser && storedUser.password === password) {
                alert(`Login successful! Hello, ${username}!`);
                localStorage.setItem("id", username);
                window.location.href = 'welcome_user.html';
            } else {
                alert("Invalid username or password.");
            }
        } catch (error) {
            console.error("Error parsing stored user data:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    const registerUser = (username, password) => {
        if (username === "admin" || password === "admin123") {
            alert("Unable to register an admin account.");
            authForm.reset();
        }
        else if (localStorage.getItem(username)) {
            alert("Username already exists.");
            authForm.reset();
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

//pickup.css
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

// Function to display reservation details on pickup page
function displayPickupDetails() {
    const details = getQueryParams();
    if (!details.fullName || !details.email) {
        document.getElementById('pickupDetails').innerHTML = '<p>Error: Missing reservation details.</p>';
        return;
    }
    
    const pickupHTML = `
        <p><strong>Full Name:</strong> ${details.fullName || 'N/A'}</p>
        <p><strong>Email:</strong> ${details.email || 'N/A'}</p>
        <p><strong>Car Model:</strong> ${details.carModel || 'N/A'}</p>
        <p><strong>Car Price:</strong> ${details.carPrice || 'N/A'}</p>
        <p><strong>Pickup Date:</strong> ${details.pickupDate || 'N/A'}</p>
        <p><strong>Pickup Time:</strong> ${details.pickupTime || 'N/A'}</p>
        <p><strong>Drop Date:</strong> ${details.dropDate || 'N/A'}</p>
        <p><strong>Drop Time:</strong> ${details.dropTime || 'N/A'}</p>
        <p><strong>Car Plate Number:</strong> ${details.carPlateNumber || 'N/A'}</p>
    `;
    document.getElementById('pickupDetails').innerHTML = pickupHTML;
}

// Function to preview uploaded images
function previewImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    preview.innerHTML = ''; // Clear previous images

    const file = input.files[0];
    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPEG, PNG, GIF).');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imgCard = document.createElement('div');
            imgCard.classList.add('image-card');
            imgCard.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
            preview.appendChild(imgCard);
        }
        reader.readAsDataURL(file);
    }
}

// Function to handle the submission of the report
function submitReport() {
const damageReport = document.getElementById('damageReport').value.trim();
if (!damageReport) {
showNotification('Please describe if there is a damages or not before submitting.', 'error');
return;
}

const images = {
front: document.getElementById('frontImage').files[0],
back: document.getElementById('backImage').files[0],
left: document.getElementById('leftImage').files[0],
right: document.getElementById('rightImage').files[0]
};

const details = getQueryParams();
let reportContent = `Pickup Details:\n
Full Name: ${details.fullName || 'N/A'}
Email: ${details.email || 'N/A'}
Car Model: ${details.carModel || 'N/A'}
Car Price: ${details.carPrice || 'N/A'}
Pickup Date: ${details.pickupDate || 'N/A'}
Pickup Time: ${details.pickupTime || 'N/A'}
Drop Date: ${details.dropDate || 'N/A'}
Drop Time: ${details.dropTime || 'N/A'}
Car Plate Number: ${details.carPlateNumber || 'N/A'}

Damage Report:\n
${damageReport}\n

Images:\n
`;

const imageKeys = Object.keys(images);
let imagesProcessed = 0;

imageKeys.forEach((key, index) => {
const file = images[key];
if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        // Add base64 string to the report
        reportContent += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${e.target.result}\n`;
        imagesProcessed++;

        // Check if all images have been processed
        if (imagesProcessed === imageKeys.length) {
            downloadReport(reportContent);
        }
    };
    reader.readAsDataURL(file);
} else {
    reportContent += `${key.charAt(0).toUpperCase() + key.slice(1)}: No image uploaded\n`;
    imagesProcessed++;
}
});

// Download if no images are uploaded
if (imagesProcessed === imageKeys.length) {
downloadReport(reportContent);
}
}


// Function to download the report as a text file
function downloadReport(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pre_pickup_report.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);

    showNotification("Report submitted successfully!", 'success');
    window.location.href = 'welcome_user.html';

}

// Function to display notifications
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


//return car.js
// Function to get query parameters from the URL
function carReturnGetQueryParams() {
    const carReturnParams = {};
    const queryString = window.location.search.substring(1);
    const queryArray = queryString.split("&");
    queryArray.forEach(param => {
        const [key, value] = param.split("=");
        carReturnParams[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return carReturnParams;
}

// Function to display reservation details on pickup page
function carReturnDisplayPickupDetails() {
    const carReturnDetails = carReturnGetQueryParams();
    if (!carReturnDetails.fullName || !carReturnDetails.email) {
        document.getElementById('pickupDetails').innerHTML = '<p>Error: Missing reservation details.</p>';
        return;
    }
    
    const carReturnPickupHTML = `
        <p><strong>Full Name:</strong> ${carReturnDetails.fullName || 'N/A'}</p>
        <p><strong>Email:</strong> ${carReturnDetails.email || 'N/A'}</p>
        <p><strong>Car Model:</strong> ${carReturnDetails.carModel || 'N/A'}</p>
        <p><strong>Car Price:</strong> ${carReturnDetails.carPrice || 'N/A'}</p>
        <p><strong>Pickup Location:</strong> ${carReturnDetails.pickupLocation || 'N/A'}</p>
        <p><strong>Pickup Date:</strong> ${carReturnDetails.pickupDate || 'N/A'}</p>
        <p><strong>Pickup Time:</strong> ${carReturnDetails.pickupTime || 'N/A'}</p>
        <p><strong>Phone Number:</strong> ${carReturnDetails.phone || 'N/A'}</p>
    `;
    document.getElementById('pickupDetails').innerHTML = carReturnPickupHTML;
}

// Function to preview uploaded images
function carReturnPreviewImage(inputId, previewId) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    preview.innerHTML = ''; // Clear previous images

    const file = input.files[0];
    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPEG, PNG, GIF).');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const imgCard = document.createElement('div');
            imgCard.classList.add('car-return-image-card');
            imgCard.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
            preview.appendChild(imgCard);
        }
        reader.readAsDataURL(file);
    }
}

// Function to handle the submission of the report
function carReturnSubmitReport() {
    const carReturnDamageReport = document.getElementById('carReturnDamageReport').value.trim();
    if (!carReturnDamageReport) {
        carReturnShowNotification('Please describe the damages before submitting.', 'error');
        return;
    }

    const carReturnImages = {
        front: document.getElementById('carReturnFrontImage').files[0],
        back: document.getElementById('carReturnBackImage').files[0],
        left: document.getElementById('carReturnLeftImage').files[0],
        right: document.getElementById('carReturnRightImage').files[0]
    };

    const carReturnDetails = carReturnGetQueryParams();
    let carReturnReportContent = `Pickup Details:\n`;
    carReturnReportContent += `

        Damage Report:
        ${carReturnDamageReport}

        Images:
    `;

    const imagePromises = Object.keys(carReturnImages).map(key => {
        return new Promise((resolve) => {
            const file = carReturnImages[key];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    carReturnReportContent += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${e.target.result}\n`;
                    resolve();
                };
                reader.readAsDataURL(file);
            } else {
                carReturnReportContent += `${key.charAt(0).toUpperCase() + key.slice(1)}: No image uploaded\n`;
                resolve();
            }
        });
    });

    Promise.all(imagePromises).then(() => {
        console.log(carReturnReportContent); // Check content
        carReturnDownloadReport(carReturnReportContent);
    });
}

// Function to download the report as a text file
function carReturnDownloadReport(content) {
    const carReturnDetails = carReturnGetQueryParams(); // Ensure this retrieves data
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `car_return_report.txt`; // Fallback filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    carReturnShowNotification("Report submitted successfully!", 'success');

    window.location.href = 'returningcarform.html';
}

// Function to display notifications
function carReturnShowNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

//returncarform.j
function submitUserInfo() {
    const fullName = document.getElementById("fullName").value;
    const carPlate = document.getElementById("carPlate").value;
    const carLocation = document.getElementById("carLocation").value;

    // Get files and check if they are text files
    const pickupCarFile = document.getElementById("pickupCar").files[0];
    const returnCarFile = document.getElementById("returnCar").files[0];

    if (pickupCarFile && pickupCarFile.type !== "text/plain") {
        alert("Please upload a valid text file for Pickup Car.");
        return;
    }
    if (returnCarFile && returnCarFile.type !== "text/plain") {
        alert("Please upload a valid text file for Return Car.");
        return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
        fullName: fullName,
        carPlate: carPlate,
        carLocation: carLocation,
        pickupCar: pickupCarFile ? pickupCarFile.name : null, // Store the file name if selected
        returnCar: returnCarFile ? returnCarFile.name : null, // Store the file name if selected
        date: new Date().toLocaleString()
    };

    existingUsers.push(newUser);

    try {
        localStorage.setItem("users", JSON.stringify(existingUsers));
        document.getElementById("userForm").reset(); // Clear the form
        alert('Car successfully return!'); // Feedback message
        window.location.href = 'welcome_user.html';

    } catch (error) {
        alert('Car unable return!. Please try again.'); // Error handling
    }
}

//comment.js(admin)
const commentForm = document.getElementById("commentForm");
        const additionalComment = document.getElementById("additionalComment");
        const priceInput = document.getElementById("price");
        const imageUpload = document.getElementById("imageUpload");
        const imagePreview = document.getElementById("imagePreview");
        
        const selectedUser = JSON.parse(localStorage.getItem("selectedUser"));

        // Function to initialize event listeners
        function initializeEventListeners() {
            imageUpload.addEventListener("change", handleImageUpload);
            commentForm.addEventListener("submit", handleSubmit);
        }

        // Function to handle image uploads
        function handleImageUpload() {
            imagePreview.innerHTML = ''; // Clear previous previews
            const files = imageUpload.files;

            for (let i = 0; i < files.length; i++) {
                const img = document.createElement("img");
                img.src = URL.createObjectURL(files[i]);
                img.alt = "Image preview";
                imagePreview.appendChild(img);
            }
        }

        // Function to handle form submission
        function handleSubmit(e) {
            e.preventDefault();

            const commentData = gatherCommentData();
            downloadReport(commentData);
            alert(`Charging $${commentData.price.toFixed(2)} to the customer credit card.`);
            
            console.log(commentData);
            resetForm();
            alert("Comment, images, and price submitted! Report downloaded.");
            window.location.href = 'returnedpageadmin.html';
        }

        // Function to gather comment data
        function gatherCommentData() {
            const commentData = {
                username: selectedUser.username,
                originalComment: selectedUser.comment,
                additionalComment: additionalComment.value,
                price: parseFloat(priceInput.value),
                images: []
            };

            const files = imageUpload.files;
            for (let i = 0; i < files.length; i++) {
                commentData.images.push(URL.createObjectURL(files[i]));
            }
            return commentData;
        }

        // Function to download the report
        function downloadReport(commentData) {
            const reportContent = `
                Check for Damages to the Car Report
                ------------------------------------
                Username: ${commentData.username}
                Original Comment: ${commentData.originalComment}
                Additional Comment: ${commentData.additionalComment}
                Price: $${commentData.price.toFixed(2)}
                Images: ${commentData.images.join(', ')}
            `.trim();

            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'check_for_damages_report.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // Clean up
        }

        // Function to reset the form
        function resetForm() {
            commentForm.reset();
            imagePreview.innerHTML = ''; // Clear the image previews
        }

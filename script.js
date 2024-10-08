// Swiper

var swiper = new swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  keyboard: {
    enabled: true,
  },
  mousewheel: {
    thresholdDelta: 70,
  },
  spaceBetween: 60,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

//resigstration form
function registration() {
  var username = document.getElementById("registration-username").value;
  var password = document.getElementById("registration-password").value;

  res = document.getElementById("registration-form");
  res && res.addEventListener("submit", function (event) {
    event.preventDefault();

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    window.location.assign('login.html');
  });
}

function login() {
  login = document.getElementById("login-form");
  login && login.addEventListener("submit", function (event) {
      event.preventDefault();

      var storedUsername = localStorage.getItem("username");
      var storedPassword = localStorage.getItem("password");

      var Username = document.getElementById("login-username").value;
      var Password = document.getElementById("login-password").value;

      if (Username == storedUsername || Password == storedPassword) {
        alert("login successful");
        //change later
        window.location.assign("index.html");
      } else {
        alert("Wrong username or password");
      }
    });
}

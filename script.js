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

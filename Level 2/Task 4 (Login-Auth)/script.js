// Register function
function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  if (username && password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    document.getElementById("message").innerText = "Registration successful!";
  } else {
    document.getElementById("message").innerText = "Please fill all fields.";
  }
}

// Login function
function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const storedUser = localStorage.getItem("username");
  const storedPass = localStorage.getItem("password");

  if (username === storedUser && password === storedPass) {
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "secure.html";
  } else {
    document.getElementById("message").innerText = "Invalid credentials!";
  }
}
/*
 * STARLIGHT CTF
 * Beginner challenge: Client-side authentication bypass
 *
 * INTENTIONALLY VULNERABLE.
 * Never use this authentication design for real accounts.
 */

const loginForm = document.getElementById("loginForm");
const loginCard = document.getElementById("loginCard");
const adminCard = document.getElementById("adminCard");
const errorMessage = document.getElementById("errorMessage");

const challengeSession = {
  authenticated: false,
  role: "guest"
};

// Intentionally insecure client-side access control.
// CTF players can inspect and manipulate this logic.
function authenticate(username, password) {
  if (username === "operator" && password === "starlight123") {
    challengeSession.authenticated = true;
    challengeSession.role = "admin";
    return true;
  }

  return false;
}

function openAdminPanel() {
  // Intended vulnerability: authorization is decided by client JS.
  if (challengeSession.authenticated &&
      challengeSession.role === "admin") {
    loginCard.classList.add("hidden");
    adminCard.classList.remove("hidden");
  }
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  errorMessage.textContent = "";

  if (authenticate(username, password)) {
    openAdminPanel();
  } else {
    errorMessage.textContent =
      "ACCESS DENIED — Invalid operator credentials.";
  }
});

document.getElementById("logoutButton").addEventListener("click", () => {
  challengeSession.authenticated = false;
  challengeSession.role = "guest";

  adminCard.classList.add("hidden");
  loginCard.classList.remove("hidden");
  loginForm.reset();
  errorMessage.textContent = "";
});

document.getElementById("copyFlag").addEventListener("click", async () => {
  const flag = document.getElementById("flag").textContent;
  const button = document.getElementById("copyFlag");

  try {
    await navigator.clipboard.writeText(flag);
    button.textContent = "FLAG COPIED ✓";
  } catch {
    button.textContent = "COPY FAILED — SELECT THE FLAG";
  }
});

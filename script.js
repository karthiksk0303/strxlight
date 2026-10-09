```javascript
/*
 * STARLIGHT CTF
 * Beginner Challenge: Hidden Credentials
 */

"use strict";

// ===============================
// CENTER CLUE
// ===============================
const clue = document.createElement("div");

clue.innerHTML = `
  <p style="font-size:18px;font-weight:bold;">
    ✦ SYSTEM CLUE ✦
  </p>
  <p>Operator ID: <code>operator</code></p>
  <p>Access Key: <code>starlight123</code></p>
  <small>Use these clues to unlock STARLIGHT.</small>
`;

clue.style.cssText = `
  box-sizing: border-box;
  width: 100%;
  max-width: 340px;
  margin: 0 auto 24px;
  padding: 18px;
  text-align: center;
  color: #ff3030;
  background: #0a0a0a;
  border: 1px solid #ff3030;
  border-radius: 10px;
  box-shadow: 0 0 18px rgba(255, 0, 0, 0.2);
  font-family: monospace;
  line-height: 1.6;
`;

const clueCodes = clue.querySelectorAll("code");

clueCodes.forEach((code) => {
  code.style.color = "#ffffff";
  code.style.fontWeight = "bold";
});

// ===============================
// PAGE ELEMENTS
// ===============================
const loginForm = document.getElementById("loginForm");
const loginCard = document.getElementById("loginCard");
const adminCard = document.getElementById("adminCard");
const errorMessage = document.getElementById("errorMessage");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const flagElement = document.getElementById("flag");
const logoutButton = document.getElementById("logoutButton");
const copyFlagButton = document.getElementById("copyFlag");

// Display clue above the login form
if (loginCard) {
  loginCard.prepend(clue);
}

// ===============================
// LOGIN / AUTHENTICATION
// ===============================
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    errorMessage.textContent = "VERIFYING ACCESS...";
    errorMessage.classList.remove("success");

    const authenticateButton = loginForm.querySelector(
      'button[type="submit"]'
    );

    if (authenticateButton) {
      authenticateButton.disabled = true;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        errorMessage.textContent =
          result.error || "ACCESS DENIED — Invalid credentials.";
        return;
      }

      if (typeof result.flag !== "string" || !result.flag) {
        errorMessage.textContent = "SYSTEM ERROR — Flag unavailable.";
        return;
      }

      flagElement.textContent = result.flag;
      errorMessage.textContent = "";

      loginCard.classList.add("hidden");
      adminCard.classList.remove("hidden");
    } catch (error) {
      console.error("STARLIGHT authentication error:", error);
      errorMessage.textContent =
        "CONNECTION ERROR — Please try again.";
    } finally {
      if (authenticateButton) {
        authenticateButton.disabled = false;
      }
    }
  });
}

// ===============================
// LOGOUT
// ===============================
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    adminCard.classList.add("hidden");
    loginCard.classList.remove("hidden");

    loginForm.reset();
    errorMessage.textContent = "";
    flagElement.textContent = "";
    copyFlagButton.textContent = "COPY FLAG ↗";
  });
}

// ===============================
// COPY FLAG
// ===============================
if (copyFlagButton) {
  copyFlagButton.addEventListener("click", async () => {
    const flag = flagElement.textContent;

    if (!flag) return;

    try {
      await navigator.clipboard.writeText(flag);
      copyFlagButton.textContent = "FLAG COPIED ✓";
    } catch (error) {
      console.error("Clipboard error:", error);
      copyFlagButton.textContent =
        "COPY FAILED — SELECT THE FLAG";
    }
  });
}
```

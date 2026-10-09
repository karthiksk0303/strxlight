
/*
 * STARLIGHT CTF
 * Beginner web security challenge
 * Authentication handled by the Vercel API.
 */

"use strict";

const loginForm = document.getElementById("loginForm");
const loginCard = document.getElementById("loginCard");
const adminCard = document.getElementById("adminCard");
const errorMessage = document.getElementById("errorMessage");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const flagElement = document.getElementById("flag");
const logoutButton = document.getElementById("logoutButton");
const copyFlagButton = document.getElementById("copyFlag");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  errorMessage.textContent = "VERIFYING ACCESS...";
  errorMessage.classList.remove("success");

  const authenticateButton = loginForm.querySelector(
    'button[type="submit"]'
  );

  authenticateButton.disabled = true;

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
      errorMessage.textContent =
        "SYSTEM ERROR — Flag unavailable.";
      return;
    }

    // Display the flag returned by the API only after success.
    flagElement.textContent = result.flag;

    errorMessage.textContent = "";
    loginCard.classList.add("hidden");
    adminCard.classList.remove("hidden");
  } catch (error) {
    console.error("STARLIGHT authentication error:", error);

    errorMessage.textContent =
      "CONNECTION ERROR — Please try again.";
  } finally {
    authenticateButton.disabled = false;
  }
});

logoutButton.addEventListener("click", () => {
  adminCard.classList.add("hidden");
  loginCard.classList.remove("hidden");

  loginForm.reset();
  errorMessage.textContent = "";
  flagElement.textContent = "";

  copyFlagButton.textContent = "COPY FLAG ↗";
});

copyFlagButton.addEventListener("click", async () => {
  const flag = flagElement.textContent;

  if (!flag) {
    return;
  }

  try {
    await navigator.clipboard.writeText(flag);
    copyFlagButton.textContent = "FLAG COPIED ✓";
  } catch (error) {
    console.error("Clipboard error:", error);
    copyFlagButton.textContent =
      "COPY FAILED — SELECT THE FLAG";
  }
});

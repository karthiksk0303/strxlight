```javascript
"use strict";

// =====================================
// STARLIGHT CTF — CENTER CLUE
// =====================================
const clue = document.createElement("div");

clue.id = "starlight-clue";

clue.innerHTML = `
  <div style="font-size:18px;font-weight:bold;margin-bottom:12px;">
    ✦ SYSTEM CLUE ✦
  </div>
  <div style="margin:8px 0;">
    Operator ID: <code>operator</code>
  </div>
  <div style="margin:8px 0;">
    Access Key: <code>starlight123</code>
  </div>
  <small>Use these clues to unlock STARLIGHT.</small>
`;

clue.style.cssText = `
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin: 0 auto 24px;
  padding: 18px 12px;
  text-align: center;
  color: #dca0ff;
  background: rgba(20, 12, 35, 0.95);
  border: 1px solid #a56bff;
  border-radius: 10px;
  box-shadow: 0 0 18px rgba(165, 107, 255, 0.18);
  font-family: monospace;
  line-height: 1.7;
`;

clue.querySelectorAll("code").forEach((item) => {
  item.style.color = "#ffffff";
  item.style.fontWeight = "bold";
  item.style.fontSize = "14px";
});

// =====================================
// PAGE ELEMENTS
// =====================================
const loginForm = document.getElementById("loginForm");
const loginCard = document.getElementById("loginCard");
const adminCard = document.getElementById("adminCard");
const errorMessage = document.getElementById("errorMessage");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const flagElement = document.getElementById("flag");
const logoutButton = document.getElementById("logoutButton");
const copyFlagButton = document.getElementById("copyFlag");

// Place clue inside login card, above the form.
if (loginCard) {
  loginCard.prepend(clue);
} else {
  console.error("STARLIGHT: loginCard element not found.");
}

// =====================================
// LOGIN
// =====================================
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const submitButton = loginForm.querySelector(
      'button[type="submit"]'
    );

    errorMessage.textContent = "VERIFYING ACCESS...";
    errorMessage.classList.remove("success");

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
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
      console.error("STARLIGHT login error:", error);
      errorMessage.textContent =
        "CONNECTION ERROR — Please try again.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
} else {
  console.error("STARLIGHT: loginForm element not found.");
}

// =====================================
// LOGOUT
// =====================================
if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    if (adminCard) {
      adminCard.classList.add("hidden");
    }

    if (loginCard) {
      loginCard.classList.remove("hidden");
    }

    if (loginForm) {
      loginForm.reset();
    }

    if (errorMessage) {
      errorMessage.textContent = "";
    }

    if (flagElement) {
      flagElement.textContent = "";
    }

    if (copyFlagButton) {
      copyFlagButton.textContent = "COPY FLAG ↗";
    }
  });
}

// =====================================
// COPY FLAG
// =====================================
if (copyFlagButton) {
  copyFlagButton.addEventListener("click", async () => {
    const flag = flagElement?.textContent;

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
}
```

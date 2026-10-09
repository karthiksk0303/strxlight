```javascript
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const body = req.body || {};
    const username = body.username;
    const password = body.password;

    if (
      username !== process.env.CTF_USERNAME ||
      password !== process.env.CTF_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        error: "ACCESS DENIED — Invalid credentials."
      });
    }

    const flag = process.env.CTF_FLAG;

    if (!flag) {
      return res.status(500).json({
        success: false,
        error: "CTF_FLAG is missing"
      });
    }

    return res.status(200).json({
      success: true,
      flag: flag
    });
  } catch (error) {
    console.error("Login API error:", error);

    return res.status(500).json({
      success: false,
      error: "Authentication service error"
    });
  }
}
```

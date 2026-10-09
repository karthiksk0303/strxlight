```javascript
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { username, password } = req.body || {};

    const expectedUsername = process.env.operator;
    const expectedPassword = process.env.starlight123;
    const flag = process.env.ROOT@KNU11{STRXX_L1GHtt_P4Y4LuG4};

    if (!expectedUsername || !expectedPassword || !flag) {
      console.error("STARLIGHT: Required environment variables are missing.");
      return res.status(500).json({
        error: "Server configuration error"
      });
    }

    if (
      username !== expectedUsername ||
      password !== expectedPassword
    ) {
      return res.status(401).json({
        error: "ACCESS DENIED — Invalid credentials."
      });
    }

    return res.status(200).json({
      success: true,
      flag: flag
    });
  } catch (error) {
    console.error("STARLIGHT API error:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}
```

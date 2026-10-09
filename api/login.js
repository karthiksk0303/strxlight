
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  if (
    username !== process.env.operator ||
    password !== process.env.starlight123
  ) {
    return res.status(401).json({
      error: "ACCESS DENIED — Invalid credentials."
    });
  }

  return res.status(200).json({
    success: true,
    flag: process.env.ROOT@KNU11{STRXX_L1GHtt_P4Y4LuG4}
  });
}

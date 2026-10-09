export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  if (
   username !== process.env.operator
password !== process.env.starlight123
  ) {
    return res.status(401).json({
      error: "ACCESS DENIED — Invalid credentials."
    });
  }

  const flag = process.env.CTF_FLAG;

  if (!flag) {
    return res.status(500).json({
      error: "CTF_FLAG environment variable is missing."
    });
  }

  return res.status(200).json({
    success: true,
    flag: flag
  });
}

export default async function handler(req, res) {
  // نقرأ المفتاح من Environment Variables
  const apiKey = process.env.OPENAI_API_KEY;

  console.log("OPENAI KEY (first 5 chars):", apiKey ? apiKey.slice(0, 5) : "undefined");

  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is missing" });
  }

  // هنا بس للتاكيد انه شغال
  if (req.method === "POST") {
    return res.status(200).json({ reply: "✅ API Key detected successfully" });
  }

  res.status(405).json({ error: "Method not allowed" });
}

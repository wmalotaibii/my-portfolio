export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("❌ API Key missing");
      return res.status(500).json({ error: "API Key not found" });
    }

    // ✅ طلب API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    // ✅ طباعة كاملة للـ Logs في Vercel
    console.log("🔍 Raw OpenAI response:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || "Unknown API error" });
    }

    const aiReply = data?.choices?.[0]?.message?.content?.trim();

    if (!aiReply) {
      return res.status(500).json({ error: "AI reply is empty" });
    }

    res.status(200).json({ reply: aiReply });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: err.message });
  }
}

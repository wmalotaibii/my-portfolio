// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "❌ API Key not found" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // تقدرِ تغيّري الموديل المدعوم من OpenRouter
        messages: [
          { role: "system", content: "You are a helpful AI assistant inside Wejdan's portfolio website." },
          { role: "user", content: message }
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const reply = data.choices?.[0]?.message?.content || "⚠️ No reply from AI";
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("AI API Error:", error);
    return res.status(500).json({ error: "Server error, unable to connect to AI" });
  }
}

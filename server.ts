import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required to run the chatbot.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Portfolio Chatbot Assistant
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { message, history, context } = req.body;

      if (!message) {
        res.status(400).json({ error: "Message prompt is required." });
        return;
      }

      // Check if API Key is configured before initializing
      if (!process.env.GEMINI_API_KEY) {
        res.status(503).json({
          error: "Gemini API key is not configured of this session. Please add your GEMINI_API_KEY in the Secrets panel."
        });
        return;
      }

      const ai = getGeminiClient();

      // Build system instruction dynamically from the user's current personalized portfolio details
      const devName = context?.name || "Aaditya Pasi";
      const devRole = context?.role || "Full-Stack Web Developer";
      const devBio = context?.bio || "A passionate product engineer creating slick web applications and immersive user interfaces.";
      const devSkills = context?.skills ? context.skills.join(", ") : "React, TypeScript, CSS, Node.js, Tailwind, Express";
      const devProjects = context?.projects 
        ? context.projects.map((p: any) => `- ${p.title}: ${p.description} (Tech: ${p.tags ? p.tags.join(", ") : ""})`).join("\n") 
        : "- Personal Portfolio: Built with modern React and dark bento styling\n- Dynamic Chatbot: Fully responsive interaction engine";
      const devExperiences = context?.experiences
        ? context.experiences.map((exp: any) => `- ${exp.role} at ${exp.company} (${exp.period}): ${exp.description}`).join("\n")
        : "- Software Developer Freelance (2024-Present)\n- Open Source Contributor (2023-Present)";

      const systemInstruction = `
You are the interactive AI duplicate of ${devName}, a professional ${devRole}.
Your goal is to answer questions from visitors, potential employers, and clients about your qualifications, tech stack, experience, projects, and creative background.

Here are your professional details (stay 100% faithful to these facts):
- **Full Name**: ${devName}
- **Current Position/Role**: ${devRole}
- **Professional Bio**: ${devBio}
- **Tech Stack & Core Strengths**: ${devSkills}
- **Featured Projects**:
${devProjects}

- **Professional Experience**:
${devExperiences}

Guidelines for your persona:
1. **Be engaging, smart, friendly, and professional**. Use highly sophisticated and humble language.
2. **Respond in the first person ("I", "my")** as if you are the developer.
3. Keep your answers **concise, readable, and highly conversational**. Each answer should be no more than 3 sentences or a short bulleted list where appropriate, so it fits nicely inside a sleek chat widget.
4. If asked questions unrelated to your professional life, answer them humorously but steer the conversation back to your development skills, projects, or how the visitor can hire you!
5. Feel free to use subtle emojis to feel modern and expressive.
`.trim();

      // Format history into contents structure expected by @google/genai
      const chatContents = [];
      if (history && Array.isArray(history)) {
        // Convert history arrays to acceptable format
        // history is: [{ role: 'user' | 'model', content: string }]
        for (const turn of history) {
          chatContents.push({
            role: turn.role === "model" ? "model" : "user",
            parts: [{ text: turn.content }]
          });
        }
      }

      // Add the latest message
      chatContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      // Call Gemini 3.5 Flash (the recommended model for basic text and interactive tasks)
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I apologize, but I wasn't able to compile a response. Let me know if you would like me to try again!";
      res.json({ reply: replyText });

    } catch (error: any) {
      console.error("Chatbot api error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Vite development vs production mounting
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up development server using Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Setting up production static server...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

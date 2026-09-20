import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeLabReport(reportText, language = "English") {
  if (!reportText || !reportText.trim()) {
    throw new Error("No report text was provided.");
  }

  const prompt = `
You are an AI lab report analyzer.

Analyze the following medical laboratory report.

IMPORTANT:
- Do not diagnose diseases.
- Do not replace a doctor.
- Explain results in simple language.
- Identify abnormal values.
- Mention normal values when useful.
- Give general recommendations.
- Tell the user when they should consult a healthcare professional.

Return the answer in ${language}.

Return the result in this structure:

SUMMARY:
Brief summary of the report.

HEALTH SCORE:
Give a general score from 0 to 100 based only on the available laboratory values.
This is NOT a medical diagnosis.

ABNORMAL VALUES:
List abnormal or potentially concerning values.
For each value include:
- Test name
- Result
- Expected/normal range if available
- Simple explanation

NORMAL VALUES:
List important values that appear within the provided reference range.

RECOMMENDATIONS:
Give general health recommendations.

IMPORTANT:
Add a short disclaimer that this is informational and not a medical diagnosis.

LAB REPORT:
${reportText}
`;

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "system",
        content:
          "You are a careful laboratory report explanation assistant. Never claim to diagnose a medical condition.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 3000,
  });

  return completion.choices[0]?.message?.content || "";
}
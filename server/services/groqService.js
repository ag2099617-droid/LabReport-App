import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeLabReport(
  reportText,
  language = "English"
) {
  if (!reportText || !reportText.trim()) {
    throw new Error("No laboratory report text was provided.");
  }

  const prompt = `
You are a professional AI laboratory report analyzer.

Analyze the laboratory report carefully and give a clear, accurate and easy to understand analysis.

Use ONLY the values and information actually present in the laboratory report.

IMPORTANT RULES:

Do not diagnose any disease.
Do not invent laboratory values.
Do not guess unclear or corrupted values.
Do not create a health score.
Do not say the patient definitely has a disease.
Do not use Markdown symbols.
Do not use asterisks.
Do not use stars.
Do not use hashtags.
Do not use bullets.
Do not use hyphens.
Do not use numbered lists.
Do not use tables.
Do not use separator lines.

The headings must be plain text without any symbols.
The application will automatically make the headings bold and highlighted.

Write a proper medical laboratory explanation, not just a list of abnormal values.

For every abnormal result, explain:
Test name
Actual result
Normal range
Whether it is high or low
What the test measures
What the abnormal result may indicate
Why it may need attention

Also explain important normal results.

If a result is unclear because of OCR, say:
Value unclear. Please verify this result on the original laboratory report.

Use exactly these sections:

SUMMARY

Give a short overall analysis of the report.

ABNORMAL VALUES

Explain each clearly abnormal result.

NORMAL VALUES

Mention important results that are within the provided reference range.

WHAT MAY NEED ATTENTION

Explain the main findings that the user should discuss with a healthcare professional.

RECOMMENDATIONS

Give simple general recommendations based only on the available report.

DISCLAIMER

This information is for educational purposes only and is not a medical diagnosis. Consult a qualified healthcare professional for medical advice.

IMPORTANT:
Do not add HEALTH SCORE.
Do not add any extra sections.
Do not repeat the complete laboratory report.
Keep the answer professional and concise.

Answer in ${language}.

LABORATORY REPORT:

${reportText}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content:
            "You are a careful laboratory report analyzer. Give accurate, clear and simple explanations. Never diagnose diseases and never invent laboratory values.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.1,
      max_tokens: 2500,
    });

    let result =
      completion.choices?.[0]?.message?.content?.trim();

    if (!result) {
      throw new Error("Groq returned an empty analysis.");
    }

    // Remove unwanted formatting if the model adds it
    result = result
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/^\s*[•●▪◦]\s*/gm, "")
      .replace(/^\s*\d+[.)]\s*/gm, "")
      .replace(/^\s*[-–—]\s*/gm, "")
      .replace(/^[-_=]{3,}$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return result;
  } catch (error) {
    console.error("Groq analysis error:", error);

    throw new Error(
      error?.message || "Failed to analyze laboratory report."
    );
  }
}
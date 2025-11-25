import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(request: Request) {
  try {
    const { jobDescription, resume } = await request.json()

    const prompt = `You are an expert resume coach. Analyze the following resume against the job description and provide specific, actionable suggestions to make the resume more aligned with the job requirements.

Job Description:
${jobDescription}

Current Resume Summary:
Name: ${resume.personal.fullName}
Email: ${resume.personal.email}
Phone: ${resume.personal.phone}
Location: ${resume.personal.location}

Professional Summary:
${resume.personal.summary}

Experience:
${resume.experience
  .map((exp: any) => `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n  ${exp.description}`)
  .join("\n")}

Skills:
${resume.skills.join(", ")}

Please provide:
1. Top 3 ways to improve the resume for this specific job
2. Skills to emphasize or add
3. Experience bullets that should be rewritten to match the job requirements
4. Any ATS (Applicant Tracking System) improvements needed

Format your response clearly with headers and bullet points.`

    const { text } = await generateText({
      model: google("gemini-1.5-pro"),
      prompt,
    })

    return Response.json({ suggestions: text })
  } catch (error) {
    console.error("AI Coach error:", error)
    return Response.json({ error: "Failed to generate suggestions" }, { status: 500 })
  }
}

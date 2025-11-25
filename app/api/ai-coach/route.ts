import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { jobDescription, resume } = await request.json()

    if (!jobDescription || !resume) {
      return Response.json({ error: "Missing job description or resume" }, { status: 400 })
    }

    const { text } = await generateText({
      model: "google/gemini-2.0-flash",
      prompt: `You are an expert resume coach. Analyze the following resume against the job description and provide specific, actionable suggestions to make the resume more aligned with the job requirements.

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

Format your response clearly with headers and bullet points.`,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return Response.json({ suggestions: text })
  } catch (error) {
    console.error("[v0] AI Coach error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to generate suggestions"
    return Response.json({ error: errorMessage, suggestions: "" }, { status: 500 })
  }
}

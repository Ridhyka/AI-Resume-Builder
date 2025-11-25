import { applyMockSuggestions } from "@/lib/ai-fallback"

export async function POST(request: Request) {
  try {
    const { suggestions, resume, jobDescription } = await request.json()

    if (!suggestions || !resume) {
      return Response.json({ error: "Missing suggestions or resume" }, { status: 400 })
    }

    try {
      const { generateText } = await import("ai")
      const { google } = await import("@ai-sdk/google")

      const prompt = `Based on these AI suggestions for a resume, extract specific improvements and apply them to the resume data.

Suggestions:
${suggestions}

Current Resume:
${JSON.stringify(resume, null, 2)}

Your task:
1. Extract 2-3 most impactful skills that should be added to the skills section
2. Improve the professional summary to highlight relevant keywords from the suggestions
3. Enhance the experience descriptions with more impact-focused language that matches the job requirements

Return ONLY a valid JSON object with this structure (no markdown, no code blocks):
{
  "skillsToAdd": ["skill1", "skill2", "skill3"],
  "updatedSummary": "improved summary text",
  "experienceUpdates": [
    {
      "id": "experience_id",
      "newDescription": "improved description"
    }
  ]
}

Make sure the JSON is valid and parseable.`

      const { text } = await generateText({
        model: google("gemini-1.5-pro"),
        prompt,
        temperature: 0.7,
        maxTokens: 1500,
      })

      // Parse the JSON response
      let updates
      try {
        const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim()
        updates = JSON.parse(cleanedText)
      } catch (parseError) {
        console.error("[v0] Failed to parse AI response:", text)
        throw new Error("Failed to parse AI response")
      }

      // Apply updates to resume
      const updatedResume = { ...resume }

      if (updates.skillsToAdd && Array.isArray(updates.skillsToAdd)) {
        updatedResume.skills = [
          ...new Set([
            ...updatedResume.skills,
            ...updates.skillsToAdd.filter((s: string) => s && !updatedResume.skills.includes(s)),
          ]),
        ]
      }

      if (updates.updatedSummary) {
        updatedResume.personal.summary = updates.updatedSummary
      }

      if (updates.experienceUpdates && Array.isArray(updates.experienceUpdates)) {
        updates.experienceUpdates.forEach((update: any) => {
          const expIndex = updatedResume.experience.findIndex((e: any) => e.id === update.id)
          if (expIndex !== -1 && update.newDescription) {
            updatedResume.experience[expIndex].description = update.newDescription
          }
        })
      }

      return Response.json({ updatedResume })
    } catch (apiError) {
      console.error("[v0] AI apply failed, using fallback:", apiError)
      const updatedResume = applyMockSuggestions(jobDescription, resume)
      return Response.json({ updatedResume })
    }
  } catch (error) {
    console.error("[v0] Apply suggestions error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to apply suggestions"
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}

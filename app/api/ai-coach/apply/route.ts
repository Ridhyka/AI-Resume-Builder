import { applyMockSuggestions } from "@/lib/ai-fallback"

export async function POST(request: Request) {
  try {
    const { suggestions, resume, jobDescription } = await request.json()

    if (!suggestions || !resume) {
      return Response.json({ error: "Missing suggestions or resume" }, { status: 400 })
    }

    const updatedResume = applyMockSuggestions(jobDescription, resume, suggestions)
    return Response.json({ updatedResume })
  } catch (error) {
    console.error("[v0] Apply suggestions error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to apply suggestions"
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}

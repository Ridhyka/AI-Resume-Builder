// This analyzes job descriptions and extracts actionable improvements

export function analyzJobDescriptionMock(jobDescription: string, resume: any) {
  // Extract common skills from job description
  const skillsToExtract = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "AWS",
    "Docker",
    "Kubernetes",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "Firebase",
    "Git",
    "GitHub",
    "GitLab",
    "Agile",
    "Scrum",
    "REST API",
    "GraphQL",
    "HTML",
    "CSS",
    "Tailwind",
    "Vue",
    "Angular",
    "Express",
    "Django",
    "Machine Learning",
    "AI",
    "Data Science",
    "Analytics",
    "DevOps",
    "CI/CD",
    "Testing",
    "Jest",
    "Webpack",
    "Vercel",
    "Netlify",
    "Communication",
    "Leadership",
    "Problem Solving",
    "Team",
    "Collaboration",
  ]

  const foundSkills = skillsToExtract.filter((skill) => jobDescription.toLowerCase().includes(skill.toLowerCase()))

  // Extract job title and company context
  const jobTitleMatch = jobDescription.match(
    /(?:for|as|as a|as an)\s+([^,\n]+(?:Engineer|Developer|Manager|Specialist))/i,
  )
  const jobTitle = jobTitleMatch ? jobTitleMatch[1].trim() : "Software Developer"

  // Generate suggestions
  const suggestions = []

  if (foundSkills.length > 0) {
    suggestions.push(`Skills to highlight: ${foundSkills.slice(0, 5).join(", ")}`)
  }

  suggestions.push(`Position: ${jobTitle}`)
  suggestions.push("Consider emphasizing projects that demonstrate the key skills listed above")
  suggestions.push("Update your professional summary to include relevant keywords from the job description")

  if (jobDescription.toLowerCase().includes("lead") || jobDescription.toLowerCase().includes("senior")) {
    suggestions.push("This appears to be a senior role - emphasize leadership and mentoring experience")
  }

  return {
    suggestions: suggestions.join("\n\n"),
    extractedSkills: foundSkills,
    jobTitle,
  }
}

export function applyMockSuggestions(jobDescription: string, resume: any) {
  const analysis = analyzJobDescriptionMock(jobDescription, resume)
  const updatedResume = { ...resume }

  // Add extracted skills to skills section
  const currentSkills = updatedResume.skills ? updatedResume.skills.split(",").map((s: string) => s.trim()) : []
  const newSkills = [...new Set([...currentSkills, ...analysis.extractedSkills])]
  updatedResume.skills = newSkills.join(", ")

  // Update professional summary with job title context
  if (!updatedResume.summary || updatedResume.summary.length < 50) {
    updatedResume.summary = `Experienced ${analysis.jobTitle} with expertise in ${analysis.extractedSkills.slice(0, 3).join(", ")}. Passionate about building scalable solutions and collaborating with cross-functional teams.`
  }

  return updatedResume
}

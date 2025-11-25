// Role-specific skill databases for realistic suggestions
const ROLE_SKILLS_MAP: Record<string, string[]> = {
  "machine learning engineer": [
    "Python",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "Keras",
    "OpenCV",
    "Jupyter",
    "Data Analysis",
    "Model Training",
    "Deep Learning",
    "Neural Networks",
    "Feature Engineering",
    "Git",
  ],
  "backend developer": [
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "REST API",
    "GraphQL",
    "Express",
    "Django",
    "Spring Boot",
    "Docker",
    "Kubernetes",
    "AWS",
    "Database Design",
    "Microservices",
    "Git",
  ],
  "frontend developer": [
    "React",
    "Vue.js",
    "Angular",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Next.js",
    "Redux",
    "REST API",
    "Testing",
    "Jest",
    "Responsive Design",
    "UI/UX",
    "Git",
  ],
  "full stack developer": [
    "React",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "SQL",
    "MongoDB",
    "Express",
    "Next.js",
    "Docker",
    "REST API",
    "Firebase",
    "AWS",
    "Git",
    "HTML",
    "CSS",
    "Problem Solving",
  ],
  "devops engineer": [
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "GCP",
    "CI/CD",
    "Jenkins",
    "GitLab CI",
    "Terraform",
    "Ansible",
    "Linux",
    "Bash",
    "Python",
    "Monitoring",
    "Log Management",
    "Infrastructure as Code",
  ],
  "data scientist": [
    "Python",
    "R",
    "SQL",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "TensorFlow",
    "Matplotlib",
    "Seaborn",
    "Jupyter",
    "Statistical Analysis",
    "Data Visualization",
    "Machine Learning",
    "Big Data",
    "Tableau",
  ],
  "mobile developer": [
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Java",
    "JavaScript",
    "TypeScript",
    "iOS",
    "Android",
    "Firebase",
    "REST API",
    "Git",
    "Xcode",
    "Android Studio",
    "UI/UX",
  ],
  "qa engineer": [
    "Selenium",
    "Jest",
    "Cypress",
    "Manual Testing",
    "Test Automation",
    "API Testing",
    "Performance Testing",
    "Bug Tracking",
    "Jira",
    "Python",
    "JavaScript",
    "SQL",
    "Postman",
    "Test Planning",
  ],
  "product manager": [
    "Product Strategy",
    "User Research",
    "Analytics",
    "Roadmapping",
    "Stakeholder Management",
    "Agile",
    "Scrum",
    "Data Analysis",
    "SQL",
    "Figma",
    "Wireframing",
    "Communication",
    "Leadership",
    "Market Research",
  ],
  "devreloper advocate": [
    "Technical Writing",
    "Public Speaking",
    "Community Building",
    "Developer Relations",
    "API Design",
    "Documentation",
    "Content Creation",
    "Node.js",
    "Python",
    "JavaScript",
    "Git",
    "Problem Solving",
    "Mentoring",
  ],
}

function detectJobRole(jobDescription: string): string {
  const lowerDesc = jobDescription.toLowerCase()

  for (const role of Object.keys(ROLE_SKILLS_MAP)) {
    if (lowerDesc.includes(role) || lowerDesc.includes(role.replace(" ", ""))) {
      return role
    }
  }

  // Fallback detection based on keywords
  if (lowerDesc.includes("machine learning") || lowerDesc.includes("ml")) return "machine learning engineer"
  if (lowerDesc.includes("backend")) return "backend developer"
  if (lowerDesc.includes("frontend") || lowerDesc.includes("front-end")) return "frontend developer"
  if (lowerDesc.includes("full stack")) return "full stack developer"
  if (lowerDesc.includes("devops")) return "devops engineer"
  if (lowerDesc.includes("data scientist")) return "data scientist"
  if (lowerDesc.includes("mobile")) return "mobile developer"
  if (lowerDesc.includes("qa ") || lowerDesc.includes("test")) return "qa engineer"
  if (lowerDesc.includes("product manager")) return "product manager"
  if (lowerDesc.includes("developer advocate")) return "devreloper advocate"

  return "full stack developer" // Default fallback
}

export function analyzJobDescriptionMock(jobDescription: string, resume: any) {
  const detectedRole = detectJobRole(jobDescription)
  const roleSkills = ROLE_SKILLS_MAP[detectedRole] || ROLE_SKILLS_MAP["full stack developer"]

  // Find which role skills appear in the job description
  const lowerDesc = jobDescription.toLowerCase()
  const matchedSkills = roleSkills.filter((skill) => lowerDesc.includes(skill.toLowerCase()))

  // Also add role-specific skills not mentioned but relevant to the role
  const suggestedSkills = roleSkills.slice(0, 8)

  // Extract job title from description
  const jobTitleMatch = jobDescription.match(
    /(?:for|as|as a|as an)\s+([^,\n]+(?:Engineer|Developer|Manager|Specialist|Advocate))/i,
  )
  const jobTitle = jobTitleMatch ? jobTitleMatch[1].trim() : detectedRole

  // Generate detailed role-specific suggestions
  const suggestions = []
  suggestions.push(`Role Detected: ${detectedRole.charAt(0).toUpperCase() + detectedRole.slice(1)}`)
  suggestions.push(`\nKey Skills to Highlight:\n${suggestedSkills.slice(0, 6).join(", ")}`)

  if (matchedSkills.length > 0) {
    suggestions.push(`\nYou mentioned: ${matchedSkills.join(", ")}`)
  }

  suggestions.push("\nConsider emphasizing projects that demonstrate these technologies")
  suggestions.push("Update your professional summary to showcase expertise in the primary skills for this role")

  if (jobDescription.toLowerCase().includes("lead") || jobDescription.toLowerCase().includes("senior")) {
    suggestions.push("\nSenior Role Detected: Emphasize leadership, mentoring, and architectural decisions")
  }

  return {
    suggestions: suggestions.join("\n"),
    extractedSkills: [...new Set([...matchedSkills, ...suggestedSkills])],
    jobTitle,
    detectedRole,
  }
}

export function applyMockSuggestions(jobDescription: string, resume: any) {
  const analysis = analyzJobDescriptionMock(jobDescription, resume)
  const updatedResume = { ...resume }

  const currentSkills = updatedResume.skills ? updatedResume.skills.split(",").map((s: string) => s.trim()) : []
  const newSkills = [...new Set([...currentSkills, ...analysis.extractedSkills])]
  updatedResume.skills = newSkills.join(", ")

  const roleDescriptions: Record<string, string> = {
    "machine learning engineer": "skilled in developing and deploying machine learning models",
    "backend developer": "experienced in building scalable backend systems and databases",
    "frontend developer": "proficient in creating responsive, interactive user interfaces",
    "full stack developer": "capable of handling both frontend and backend development",
    "devops engineer": "expert in infrastructure automation and deployment pipelines",
    "data scientist": "specialized in data analysis and predictive modeling",
    "mobile developer": "experienced in developing cross-platform mobile applications",
    "qa engineer": "skilled in test automation and quality assurance",
    "product manager": "adept at product strategy and stakeholder management",
    "devreloper advocate": "experienced in technical community building and advocacy",
  }

  const roleDesc = roleDescriptions[analysis.detectedRole] || "skilled software professional"

  if (!updatedResume.summary || updatedResume.summary.length < 50) {
    updatedResume.summary = `${roleDesc} with strong expertise in ${analysis.extractedSkills.slice(0, 3).join(", ")}. Passionate about solving complex problems and delivering high-quality solutions.`
  }

  return updatedResume
}

export type Template = "modern" | "classic" | "creative"

export const templates = {
  modern: {
    id: "modern",
    name: "Modern",
    description: "Clean, contemporary design with a focus on readability",
    preview: "Minimalist layout with cyan accents and modern typography",
    headerColor: "text-cyan-600",
    accentColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
  },
  classic: {
    id: "classic",
    name: "Classic",
    description: "Professional, timeless design that never goes out of style",
    preview: "Traditional layout with blue accents and professional formatting",
    headerColor: "text-blue-700",
    accentColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  creative: {
    id: "creative",
    name: "Creative",
    description: "Bold design with visual hierarchy for creative professionals",
    preview: "Eye-catching layout with purple accents and modern styling",
    headerColor: "text-purple-600",
    accentColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
}

export function getTemplateStyles(template: Template) {
  return templates[template]
}

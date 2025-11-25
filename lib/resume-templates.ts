export type Template = "modern" | "classic" | "creative"

export const templates = {
  modern: {
    id: "modern",
    name: "Modern",
    description: "Clean, contemporary design with sidebar layout",
    preview: "Minimalist 2-column with cyan accents and modern typography",
    headerColor: "text-cyan-600",
    accentColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    layout: "sidebar", // added layout type for different rendering
  },
  classic: {
    id: "classic",
    name: "Classic",
    description: "Traditional ATS-friendly professional design",
    preview: "Single column with serif fonts and formal styling",
    headerColor: "text-slate-900",
    accentColor: "bg-slate-100",
    borderColor: "border-slate-400",
    layout: "traditional", // added layout type for different rendering
  },
  creative: {
    id: "creative",
    name: "Creative",
    description: "Colorful card-based design for creative professionals",
    preview: "Vibrant cards with gradients and bold accents",
    headerColor: "text-purple-600",
    accentColor: "bg-purple-50",
    borderColor: "border-purple-300",
    layout: "card", // added layout type for different rendering
  },
}

export function getTemplateStyles(template: Template) {
  return templates[template]
}

"use client"

import { useState } from "react"
import type { Template } from "@/lib/resume-templates"
import TemplateSelector from "@/components/template-selector"

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("modern")

  return <TemplateSelector onSelectTemplate={setSelectedTemplate} selectedTemplate={selectedTemplate} />
}

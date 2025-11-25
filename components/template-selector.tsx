"use client"

import { type Template, templates } from "@/lib/resume-templates"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void
  selectedTemplate?: Template
}

export default function TemplateSelector({ onSelectTemplate, selectedTemplate }: TemplateSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Choose Your Resume Template</h1>
          <p className="text-xl text-slate-300">Select a template to get started building your professional resume</p>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {Object.values(templates).map((template) => (
            <div
              key={template.id}
              className={`p-8 rounded-xl border-2 transition cursor-pointer ${
                selectedTemplate === template.id
                  ? "border-cyan-400 bg-slate-800"
                  : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
              }`}
              onClick={() => onSelectTemplate(template.id as Template)}
            >
              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{template.name}</h3>
                  <p className="text-slate-300 text-sm">{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="bg-cyan-500 p-2 rounded-full">
                    <Check size={20} className="text-white" />
                  </div>
                )}
              </div>

              {/* Preview Box */}
              <div className={`p-4 rounded-lg ${template.accentColor} border ${template.borderColor} mb-4`}>
                <p className={`text-sm font-semibold ${template.headerColor} mb-2`}>{template.name} Preview</p>
                <div className={`text-slate-600 text-xs leading-relaxed`}>{template.preview}</div>
              </div>

              {/* Template Details */}
              <div className="space-y-2 text-sm text-slate-300">
                <p>✓ Professional & ATS-friendly</p>
                <p>✓ Print-ready format</p>
                <p>✓ Mobile responsive</p>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Link href={`/editor?template=${selectedTemplate || "modern"}`}>
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 py-6 text-lg">
              Continue with {templates[selectedTemplate || "modern"].name} Template
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import ResumeForm from "@/components/resume-form"
import ResumePreview from "@/components/resume-preview"
import AiCoach from "@/components/ai-coach"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, Download, AlertCircle } from "lucide-react"

const defaultResume = {
  personal: {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    summary: "Experienced developer with a passion for building scalable applications.",
  },
  experience: [
    {
      id: "1",
      company: "Tech Corp",
      position: "Senior Developer",
      startDate: "2022",
      endDate: "Present",
      description: "Led development of 5+ projects, managed team of 3 developers.",
    },
  ],
  education: [
    {
      id: "1",
      school: "University Name",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationYear: "2020",
    },
  ],
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  projects: [
    {
      id: "1",
      name: "AI Resume Builder",
      description: "A modern tool for creating professional resumes.",
      link: "https://example.com",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Solutions Architect",
      issuer: "Amazon",
      year: "2023",
    },
  ],
}

export default function EditorPage() {
  const [resume, setResume] = useState(defaultResume)
  const [showAiCoach, setShowAiCoach] = useState(false)
  const [downloadError, setDownloadError] = useState("")

  const handleDownloadPDF = async () => {
    setDownloadError("")
    const element = document.getElementById("resume-preview")
    if (!element) {
      setDownloadError("Resume preview not found")
      return
    }

    try {
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"

      script.onload = () => {
        const html2pdf = (window as any).html2pdf
        if (html2pdf) {
          const opt = {
            margin: 10,
            filename: `resume-${new Date().toISOString().split("T")[0]}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { orientation: "portrait", unit: "mm", format: "a4" },
          }
          html2pdf()
            .set(opt)
            .from(element)
            .save()
            .catch((err: any) => {
              console.error("[v0] PDF generation error:", err)
              setDownloadError("Failed to generate PDF. Please try again.")
            })
        } else {
          setDownloadError("PDF library failed to load")
        }
      }

      script.onerror = () => {
        console.error("[v0] Failed to load html2pdf library")
        setDownloadError("Failed to load PDF library. Please try again.")
      }

      document.head.appendChild(script)
    } catch (error) {
      console.error("[v0] Download error:", error)
      setDownloadError("An error occurred while downloading. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
            <ChevronLeft size={20} />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Resume Editor</h1>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowAiCoach(!showAiCoach)}
              variant="outline"
              className="text-cyan-600 border-cyan-600 hover:bg-cyan-50"
            >
              AI Coach
            </Button>
            <Button onClick={handleDownloadPDF} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Download size={18} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
        {downloadError && (
          <div className="px-4 sm:px-6 lg:px-8 py-2 bg-red-50 border-t border-red-200 flex items-center gap-2 text-sm text-red-700">
            <AlertCircle size={16} />
            {downloadError}
          </div>
        )}
      </header>

      <div className="flex gap-6 p-6 max-w-full overflow-hidden">
        {/* Left: Form */}
        <div className="flex-1 min-w-0 overflow-y-auto max-h-[calc(100vh-120px)]">
          <ResumeForm resume={resume} setResume={setResume} />
        </div>

        {/* Right: Preview + AI Coach */}
        <div className="flex-1 min-w-0 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
          <ResumePreview resume={resume} />
          {showAiCoach && <AiCoach resume={resume} setResume={setResume} />}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Sparkles, Copy, Check, AlertCircle, Wand2 } from "lucide-react"

export default function AiCoach({ resume, setResume }: any) {
  const [jobDescription, setJobDescription] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const [applying, setApplying] = useState(false)

  const handleGetSuggestions = async () => {
    if (!jobDescription.trim()) return

    setLoading(true)
    setError("")
    setSuggestions("")

    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          resume,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.error || "Failed to get suggestions"
        console.error("[v0] AI Coach API error:", errorMsg)
        setError(errorMsg)
        setSuggestions("")
      } else if (data.suggestions) {
        setSuggestions(data.suggestions)
        setError("")
      } else {
        setError("No suggestions received. Please try again.")
        setSuggestions("")
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to get suggestions"
      console.error("[v0] AI Coach error:", errorMsg)
      setError(errorMsg)
      setSuggestions("")
    } finally {
      setLoading(false)
    }
  }

  const handleCopySuggestions = () => {
    navigator.clipboard.writeText(suggestions)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleApplySuggestions = async () => {
    setApplying(true)
    try {
      console.log("[v0] Applying suggestions...")
      const response = await fetch("/api/ai-coach/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          suggestions,
          resume,
          jobDescription,
        }),
      })

      const data = await response.json()

      if (data.error) {
        console.error("[v0] Apply error:", data.error)
        return
      }

      if (data.updatedResume) {
        console.log("[v0] Resume updated with new skills and summary")
        setResume(data.updatedResume)
        setSuggestions("")
        setJobDescription("")
      }
    } catch (error) {
      console.error("[v0] Error applying suggestions:", error)
    } finally {
      setApplying(false)
    }
  }

  return (
    <Card className="bg-white sticky top-32 max-h-[calc(100vh-200px)] overflow-y-auto">
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Sparkles size={20} className="text-cyan-500" />
          AI Coach
        </h3>
      </div>

      <div className="p-4 space-y-4">
        <textarea
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg text-slate-900 text-sm h-32 focus:border-cyan-500 focus:outline-none"
        />

        <Button
          onClick={handleGetSuggestions}
          disabled={loading || !jobDescription.trim()}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={16} className="mr-2" />
              Get Suggestions
            </>
          )}
        </Button>

        {error && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200 flex items-start gap-2">
            <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {suggestions && (
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-slate-900 text-sm">Suggestions:</h4>
              <button
                onClick={handleCopySuggestions}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-cyan-600 hover:bg-cyan-50 rounded"
              >
                {copied ? (
                  <>
                    <Check size={14} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy
                  </>
                )}
              </button>
            </div>
            <div className="text-sm text-slate-700 whitespace-pre-wrap max-h-64 overflow-y-auto">{suggestions}</div>
            <Button
              onClick={handleApplySuggestions}
              disabled={applying}
              className="w-full bg-green-500 hover:bg-green-600 text-white mt-3"
            >
              {applying ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Wand2 size={16} className="mr-2" />
                  Apply to Resume
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

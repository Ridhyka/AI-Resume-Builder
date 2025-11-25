"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Sparkles, Copy, Check } from "lucide-react"

export default function AiCoach({ resume, setResume }: any) {
  const [jobDescription, setJobDescription] = useState("")
  const [suggestions, setSuggestions] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGetSuggestions = async () => {
    if (!jobDescription.trim()) return

    setLoading(true)
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
      setSuggestions(data.suggestions || "")
    } catch (error) {
      console.error("Error getting suggestions:", error)
      setSuggestions("Failed to get suggestions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopySuggestions = () => {
    navigator.clipboard.writeText(suggestions)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          </div>
        )}
      </div>
    </Card>
  )
}

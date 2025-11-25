import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "AI Resume Builder - Create Professional Resumes in Minutes",
  description: "Build a professional, ATS-friendly resume with AI-powered suggestions. No login required.",
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-cyan-400">ResumeAI</div>
          <div className="flex gap-6 text-sm text-slate-300">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
            AI-Powered Resume Building
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-balance leading-tight">
            Build Your Resume with <span className="text-cyan-400">AI Power</span>
          </h1>
          <p className="text-xl text-slate-300 text-balance max-w-2xl mx-auto leading-relaxed">
            Create a professional, ATS-friendly resume in minutes. Get intelligent suggestions to highlight your skills
            and stand out to recruiters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/editor"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition"
            >
              Start Building <ArrowRight size={20} />
            </Link>
            <button className="px-8 py-4 border border-slate-600 hover:border-slate-400 text-white rounded-lg transition font-semibold">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-800/50 py-20 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose ResumeAI?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Coach",
                desc: "Paste a job description and get tailored suggestions for your resume",
              },
              {
                title: "Real-time Preview",
                desc: "See your resume update instantly as you type. Professional and print-ready.",
              },
              {
                title: "ATS Friendly",
                desc: "Our AI ensures your resume passes applicant tracking systems.",
              },
              {
                title: "Multiple Sections",
                desc: "Cover experience, education, projects, certifications, and skills.",
              },
              {
                title: "PDF Download",
                desc: "Download your resume as a beautiful, formatted PDF with one click.",
              },
              {
                title: "No Login Required",
                desc: "Start building immediately. Your work is saved in your browser.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-slate-700/50 border border-slate-600 rounded-xl hover:border-cyan-400 transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">{feature.title}</h3>
                <p className="text-slate-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
          <p>2024 ResumeAI. Built with Next.js, AI SDK & Gemini API.</p>
        </div>
      </footer>
    </main>
  )
}

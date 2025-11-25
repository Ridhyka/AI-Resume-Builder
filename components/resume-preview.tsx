"use client"

import { type Template, getTemplateStyles } from "@/lib/resume-templates"

export default function ResumePreview({ resume, template = "modern" }: any) {
  const templateStyle = getTemplateStyles(template as Template)

  if (template === "sidebar") {
    return <ModernSidebarTemplate resume={resume} templateStyle={templateStyle} />
  } else if (template === "creative") {
    return <CreativeCardTemplate resume={resume} templateStyle={templateStyle} />
  } else {
    return <ClassicTraditionalTemplate resume={resume} templateStyle={templateStyle} />
  }
}

// Modern Sidebar Template - 2 Column Layout
function ModernSidebarTemplate({ resume, templateStyle }: any) {
  return (
    <div
      id="resume-preview"
      className="bg-white rounded-lg border border-slate-200 shadow-lg print:shadow-none grid grid-cols-3 gap-0 min-h-screen"
    >
      {/* Left Sidebar */}
      <div className="bg-cyan-50 p-8 space-y-6 col-span-1 border-r-2 border-cyan-200">
        {/* Contact Info */}
        <div>
          <h2 className="text-cyan-600 text-sm font-bold uppercase tracking-wide mb-3">Contact</h2>
          <div className="space-y-2 text-sm text-slate-700">
            {resume.personal.email && <p className="break-all">{resume.personal.email}</p>}
            {resume.personal.phone && <p>{resume.personal.phone}</p>}
            {resume.personal.location && <p>{resume.personal.location}</p>}
          </div>
        </div>

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div>
            <h2 className="text-cyan-600 text-sm font-bold uppercase tracking-wide mb-3">Skills</h2>
            <div className="space-y-2">
              {resume.skills.map((skill: string, i: number) => (
                <div key={i} className="bg-white px-3 py-2 rounded text-sm text-slate-700 border border-cyan-200">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="col-span-2 p-12 space-y-6">
        {/* Header */}
        <div className="border-b-3 border-cyan-500 pb-4">
          <h1 className="text-4xl font-bold text-slate-900">{resume.personal.fullName}</h1>
          <p className="text-cyan-600 text-sm mt-1">{resume.personal.summary}</p>
        </div>

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-cyan-300 pb-2">
              Experience
            </h2>
            <div className="space-y-4">
              {resume.experience.map(
                (exp: any) =>
                  exp.company && (
                    <div key={exp.id}>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900">{exp.position}</h3>
                          <p className="text-sm text-cyan-600">{exp.company}</p>
                        </div>
                        <span className="text-sm text-slate-600">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      {exp.description && <p className="text-sm text-slate-700 mt-2">{exp.description}</p>}
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-cyan-300 pb-2">
              Education
            </h2>
            <div className="space-y-3">
              {resume.education.map(
                (edu: any) =>
                  edu.school && (
                    <div key={edu.id}>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                          <p className="text-sm text-cyan-600">{edu.school}</p>
                        </div>
                        {edu.graduationYear && <span className="text-sm text-slate-600">{edu.graduationYear}</span>}
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide mb-4 border-b border-cyan-300 pb-2">
              Projects
            </h2>
            <div className="space-y-3">
              {resume.projects.map(
                (proj: any) =>
                  proj.name && (
                    <div key={proj.id}>
                      <h3 className="font-bold text-slate-900">{proj.name}</h3>
                      {proj.description && <p className="text-sm text-slate-700">{proj.description}</p>}
                    </div>
                  ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Classic Traditional Template - Single Column, Serif Font
function ClassicTraditionalTemplate({ resume, templateStyle }: any) {
  return (
    <div
      id="resume-preview"
      className="bg-white rounded-lg border border-slate-300 shadow-lg print:shadow-none p-12 space-y-5 font-serif"
    >
      {/* Header */}
      <div className="text-center border-b-4 border-slate-800 pb-4">
        <h1 className="text-4xl font-bold text-slate-900 font-serif">{resume.personal.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-700 mt-3">
          {resume.personal.email && <span>{resume.personal.email}</span>}
          {resume.personal.phone && <span>|</span>}
          {resume.personal.phone && <span>{resume.personal.phone}</span>}
          {resume.personal.location && <span>|</span>}
          {resume.personal.location && <span>{resume.personal.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.personal.summary && (
        <div>
          <p className="text-sm leading-relaxed text-justify text-slate-800">{resume.personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-4 mt-3">
            {resume.experience.map(
              (exp: any) =>
                exp.company && (
                  <div key={exp.id} className="border-l-4 border-slate-400 pl-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900">{exp.position}</h3>
                        <p className="text-sm text-slate-700 italic">{exp.company}</p>
                      </div>
                      <span className="text-sm text-slate-700">
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-sm text-slate-800 mt-2">{exp.description}</p>}
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-2">
            Education
          </h2>
          <div className="space-y-3 mt-3">
            {resume.education.map(
              (edu: any) =>
                edu.school && (
                  <div key={edu.id} className="border-l-4 border-slate-400 pl-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                        <p className="text-sm text-slate-700">{edu.school}</p>
                      </div>
                      {edu.graduationYear && <span className="text-sm text-slate-700">{edu.graduationYear}</span>}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-2">
            Skills
          </h2>
          <p className="text-sm text-slate-800 mt-3">{resume.skills.join(" • ")}</p>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-800 pb-2">
            Projects
          </h2>
          <div className="space-y-3 mt-3">
            {resume.projects.map(
              (proj: any) =>
                proj.name && (
                  <div key={proj.id} className="border-l-4 border-slate-400 pl-4">
                    <h3 className="font-bold text-slate-900">{proj.name}</h3>
                    {proj.description && <p className="text-sm text-slate-800">{proj.description}</p>}
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Creative Card Template - Colorful Cards with Gradients
function CreativeCardTemplate({ resume, templateStyle }: any) {
  return (
    <div
      id="resume-preview"
      className="rounded-lg shadow-lg print:shadow-none p-8 space-y-6"
      style={{
        background: "linear-gradient(to bottom right, #faf5ff, #ffffff)",
      }}
    >
      {/* Header with Gradient */}
      <div
        className="text-white rounded-lg p-8 shadow-md"
        style={{
          background: "linear-gradient(to right, #9333ea, #c084fc)",
        }}
      >
        <h1 className="text-5xl font-bold mb-2">{resume.personal.fullName}</h1>
        {resume.personal.summary && (
          <p className="text-purple-100 text-lg leading-relaxed">{resume.personal.summary}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-purple-100">
          {resume.personal.email && <span>{resume.personal.email}</span>}
          {resume.personal.phone && <span>•</span>}
          {resume.personal.phone && <span>{resume.personal.phone}</span>}
          {resume.personal.location && <span>•</span>}
          {resume.personal.location && <span>{resume.personal.location}</span>}
        </div>
      </div>

      {/* Skills - Colorful Tags */}
      {resume.skills.length > 0 && (
        <div>
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((skill: string, i: number) => {
              const colors = [
                "bg-purple-200 text-purple-900",
                "bg-pink-200 text-pink-900",
                "bg-indigo-200 text-indigo-900",
                "bg-violet-200 text-violet-900",
              ]
              return (
                <span
                  key={i}
                  className={`${colors[i % colors.length]} px-4 py-2 rounded-full font-semibold text-sm shadow`}
                >
                  {skill}
                </span>
              )
            })}
          </div>
        </div>
      )}

      {/* Experience Cards */}
      {resume.experience.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Experience</h2>
          <div className="space-y-3">
            {resume.experience.map(
              (exp: any) =>
                exp.company && (
                  <div
                    key={exp.id}
                    className="bg-white rounded-lg p-6 border-l-4 border-purple-500 shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-purple-900">{exp.position}</h3>
                        <p className="text-purple-600 font-semibold">{exp.company}</p>
                      </div>
                      <span className="text-sm text-slate-600 whitespace-nowrap bg-purple-100 px-3 py-1 rounded-full">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-slate-700 mt-3 text-sm leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Education Cards */}
      {resume.education.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Education</h2>
          <div className="space-y-3">
            {resume.education.map(
              (edu: any) =>
                edu.school && (
                  <div key={edu.id} className="bg-white rounded-lg p-6 border-l-4 border-indigo-500 shadow-md">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-purple-900">{edu.degree}</h3>
                        <p className="text-indigo-600 font-semibold">{edu.school}</p>
                        {edu.field && <p className="text-slate-700 text-sm">{edu.field}</p>}
                      </div>
                      {edu.graduationYear && (
                        <span className="text-sm bg-indigo-100 px-3 py-1 rounded-full text-indigo-900">
                          {edu.graduationYear}
                        </span>
                      )}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Projects Cards */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Projects</h2>
          <div className="grid grid-cols-1 gap-3">
            {resume.projects.map(
              (proj: any) =>
                proj.name && (
                  <div key={proj.id} className="bg-white rounded-lg p-6 border-l-4 border-pink-500 shadow-md">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-purple-900">{proj.name}</h3>
                        {proj.description && <p className="text-slate-700 mt-2 text-sm">{proj.description}</p>}
                      </div>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 font-semibold text-sm hover:underline whitespace-nowrap"
                        >
                          View
                        </a>
                      )}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Certifications Cards */}
      {resume.certifications.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Certifications</h2>
          <div className="grid grid-cols-1 gap-3">
            {resume.certifications.map(
              (cert: any) =>
                cert.name && (
                  <div key={cert.id} className="bg-white rounded-lg p-6 border-l-4 border-violet-500 shadow-md">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-purple-900">{cert.name}</h3>
                        {cert.issuer && <p className="text-violet-600 text-sm">{cert.issuer}</p>}
                      </div>
                      {cert.year && (
                        <span className="text-sm bg-violet-100 px-3 py-1 rounded-full text-violet-900">
                          {cert.year}
                        </span>
                      )}
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

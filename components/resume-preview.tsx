"use client"

export default function ResumePreview({ resume }: any) {
  return (
    <div
      id="resume-preview"
      className="bg-white rounded-lg border border-slate-200 shadow-lg p-12 space-y-6 print:shadow-none text-slate-900"
    >
      {/* Header */}
      <div className="border-b-2 border-cyan-500 pb-4">
        <h1 className="text-3xl font-bold">{resume.personal.fullName}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600 mt-2">
          {resume.personal.email && <span>{resume.personal.email}</span>}
          {resume.personal.phone && <span>•</span>}
          {resume.personal.phone && <span>{resume.personal.phone}</span>}
          {resume.personal.location && <span>•</span>}
          {resume.personal.location && <span>{resume.personal.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.personal.summary && (
        <div>
          <p className="text-sm leading-relaxed">{resume.personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-2">Experience</h2>
          {resume.experience.map(
            (exp: any) =>
              exp.company && (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-sm text-slate-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-600 whitespace-nowrap">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p className="text-sm mt-2 leading-relaxed">{exp.description}</p>}
                </div>
              ),
          )}
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-2">Education</h2>
          {resume.education.map(
            (edu: any) =>
              edu.school && (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-sm text-slate-600">{edu.school}</p>
                      {edu.field && <p className="text-sm text-slate-600">{edu.field}</p>}
                    </div>
                    {edu.graduationYear && <span className="text-sm text-slate-600">{edu.graduationYear}</span>}
                  </div>
                </div>
              ),
          )}
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-2">Projects</h2>
          {resume.projects.map(
            (proj: any) =>
              proj.name && (
                <div key={proj.id} className="mb-3">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-semibold">{proj.name}</h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 text-sm hover:underline"
                      >
                        Link
                      </a>
                    )}
                  </div>
                  {proj.description && <p className="text-sm text-slate-600 mt-1">{proj.description}</p>}
                </div>
              ),
          )}
        </div>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 border-b border-slate-300 pb-2">
            Certifications
          </h2>
          {resume.certifications.map(
            (cert: any) =>
              cert.name && (
                <div key={cert.id} className="mb-2">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-semibold text-sm">{cert.name}</h3>
                    {cert.year && <span className="text-sm text-slate-600">{cert.year}</span>}
                  </div>
                  {cert.issuer && <p className="text-sm text-slate-600">{cert.issuer}</p>}
                </div>
              ),
          )}
        </div>
      )}
    </div>
  )
}

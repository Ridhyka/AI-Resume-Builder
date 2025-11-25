"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, ChevronDown } from "lucide-react"

export default function ResumeForm({ resume, setResume }: any) {
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    experience: false,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updatePersonal = (field: string, value: string) => {
    setResume((prev: any) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setResume((prev: any) => ({
      ...prev,
      experience: prev.experience.map((exp: any) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const addExperience = () => {
    setResume((prev: any) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }))
  }

  const deleteExperience = (id: string) => {
    setResume((prev: any) => ({
      ...prev,
      experience: prev.experience.filter((exp: any) => exp.id !== id),
    }))
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setResume((prev: any) => ({
      ...prev,
      education: prev.education.map((edu: any) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const addEducation = () => {
    setResume((prev: any) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          school: "",
          degree: "",
          field: "",
          graduationYear: "",
        },
      ],
    }))
  }

  const deleteEducation = (id: string) => {
    setResume((prev: any) => ({
      ...prev,
      education: prev.education.filter((edu: any) => edu.id !== id),
    }))
  }

  const updateProject = (id: string, field: string, value: string) => {
    setResume((prev: any) => ({
      ...prev,
      projects: prev.projects.map((proj: any) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }))
  }

  const addProject = () => {
    setResume((prev: any) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now().toString(),
          name: "",
          description: "",
          link: "",
        },
      ],
    }))
  }

  const deleteProject = (id: string) => {
    setResume((prev: any) => ({
      ...prev,
      projects: prev.projects.filter((proj: any) => proj.id !== id),
    }))
  }

  const updateCertification = (id: string, field: string, value: string) => {
    setResume((prev: any) => ({
      ...prev,
      certifications: prev.certifications.map((cert: any) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    }))
  }

  const addCertification = () => {
    setResume((prev: any) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: Date.now().toString(),
          name: "",
          issuer: "",
          year: "",
        },
      ],
    }))
  }

  const deleteCertification = (id: string) => {
    setResume((prev: any) => ({
      ...prev,
      certifications: prev.certifications.filter((cert: any) => cert.id !== id),
    }))
  }

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Personal Info */}
      <Card className="bg-white">
        <button
          onClick={() => toggleSection("personal")}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 border-b border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
          <ChevronDown size={20} className={`transition ${expandedSections.personal ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.personal && (
          <div className="p-4 space-y-4">
            <Input
              placeholder="Full Name"
              value={resume.personal.fullName}
              onChange={(e) => updatePersonal("fullName", e.target.value)}
              className="border-slate-300"
            />
            <Input
              type="email"
              placeholder="Email"
              value={resume.personal.email}
              onChange={(e) => updatePersonal("email", e.target.value)}
              className="border-slate-300"
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={resume.personal.phone}
              onChange={(e) => updatePersonal("phone", e.target.value)}
              className="border-slate-300"
            />
            <Input
              placeholder="Location"
              value={resume.personal.location}
              onChange={(e) => updatePersonal("location", e.target.value)}
              className="border-slate-300"
            />
            <textarea
              placeholder="Professional Summary"
              value={resume.personal.summary}
              onChange={(e) => updatePersonal("summary", e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md text-slate-900"
              rows={3}
            />
          </div>
        )}
      </Card>

      {/* Experience Section */}
      <Card className="bg-white">
        <button
          onClick={() => toggleSection("experience")}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 border-b border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
          <ChevronDown size={20} className={`transition ${expandedSections.experience ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.experience && (
          <div className="p-4 space-y-4">
            {resume.experience.map((exp: any) => (
              <div key={exp.id} className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  className="border-slate-300"
                />
                <Input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                  className="border-slate-300"
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    className="border-slate-300 flex-1"
                  />
                  <Input
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    className="border-slate-300 flex-1"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md text-slate-900"
                  rows={3}
                />
                <Button onClick={() => deleteExperience(exp.id)} variant="destructive" className="w-full" size="sm">
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            ))}
            <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
              <Plus size={16} className="mr-2" />
              Add Experience
            </Button>
          </div>
        )}
      </Card>

      <Card className="bg-white">
        <button
          onClick={() => toggleSection("education")}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 border-b border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900">Education</h3>
          <ChevronDown size={20} className={`transition ${expandedSections.education ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.education && (
          <div className="p-4 space-y-4">
            {resume.education.map((edu: any) => (
              <div key={edu.id} className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Input
                  placeholder="School/University"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                  className="border-slate-300"
                />
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  className="border-slate-300"
                />
                <Input
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                  className="border-slate-300"
                />
                <Input
                  placeholder="Graduation Year"
                  value={edu.graduationYear}
                  onChange={(e) => updateEducation(edu.id, "graduationYear", e.target.value)}
                  className="border-slate-300"
                />
                <Button onClick={() => deleteEducation(edu.id)} variant="destructive" className="w-full" size="sm">
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            ))}
            <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
              <Plus size={16} className="mr-2" />
              Add Education
            </Button>
          </div>
        )}
      </Card>

      <Card className="bg-white">
        <button
          onClick={() => toggleSection("projects")}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 border-b border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900">Projects</h3>
          <ChevronDown size={20} className={`transition ${expandedSections.projects ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.projects && (
          <div className="p-4 space-y-4">
            {resume.projects.map((proj: any) => (
              <div key={proj.id} className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Input
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                  className="border-slate-300"
                />
                <textarea
                  placeholder="Project Description"
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-md text-slate-900"
                  rows={2}
                />
                <Input
                  placeholder="Project Link (optional)"
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                  className="border-slate-300"
                />
                <Button onClick={() => deleteProject(proj.id)} variant="destructive" className="w-full" size="sm">
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            ))}
            <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
              <Plus size={16} className="mr-2" />
              Add Project
            </Button>
          </div>
        )}
      </Card>

      <Card className="bg-white">
        <button
          onClick={() => toggleSection("certifications")}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 border-b border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900">Certifications</h3>
          <ChevronDown size={20} className={`transition ${expandedSections.certifications ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.certifications && (
          <div className="p-4 space-y-4">
            {resume.certifications.map((cert: any) => (
              <div key={cert.id} className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <Input
                  placeholder="Certification Name"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, "name", e.target.value)}
                  className="border-slate-300"
                />
                <Input
                  placeholder="Issuing Organization"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                  className="border-slate-300"
                />
                <Input
                  placeholder="Year"
                  value={cert.year}
                  onChange={(e) => updateCertification(cert.id, "year", e.target.value)}
                  className="border-slate-300"
                />
                <Button onClick={() => deleteCertification(cert.id)} variant="destructive" className="w-full" size="sm">
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            ))}
            <Button onClick={addCertification} variant="outline" className="w-full bg-transparent">
              <Plus size={16} className="mr-2" />
              Add Certification
            </Button>
          </div>
        )}
      </Card>

      {/* Skills */}
      <Card className="bg-white">
        <button
          onClick={() => toggleSection("skills")}
          className="w-full p-4 flex items-center justify-between hover:bg-slate-50 border-b border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900">Skills</h3>
          <ChevronDown size={20} className={`transition ${expandedSections.skills ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.skills && (
          <div className="p-4 space-y-2">
            <div className="flex flex-wrap gap-2 mb-4">
              {resume.skills.map((skill: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() =>
                      setResume((prev: any) => ({
                        ...prev,
                        skills: prev.skills.filter((_: string, idx: number) => idx !== i),
                      }))
                    }
                    className="text-cyan-600 hover:text-cyan-900"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <Input
              placeholder="Add a skill and press Enter"
              onKeyPress={(e) => {
                if (e.key === "Enter" && e.currentTarget.value.trim()) {
                  setResume((prev: any) => ({
                    ...prev,
                    skills: [...prev.skills, e.currentTarget.value.trim()],
                  }))
                  e.currentTarget.value = ""
                }
              }}
              className="border-slate-300"
            />
          </div>
        )}
      </Card>
    </div>
  )
}

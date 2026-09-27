"use client"

import { useRef, useState } from "react"
import { jsPDF } from "jspdf"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Education from "@/components/ui/Education"
import Experience from "@/components/ui/Experience"
import Languages from "@/components/ui/Languages"
import PersonalDetails from "@/components/ui/PersonalDetails"
import Projects from "@/components/ui/Projects"
import Skills from "@/components/ui/Skills"
import Summary from "@/components/ui/Summary"

const getFormValue = (form, id) => String(form.elements.namedItem(id)?.value || "").trim()

const drawSectionTitle = (pdf, title, x, y, width) => {
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(8)
  pdf.setTextColor(49, 90, 59)
  pdf.text(title.toUpperCase(), x, y)
  pdf.setDrawColor(147, 174, 151)
  pdf.setLineWidth(0.35)
  pdf.line(x, y + 2.5, x + width, y + 2.5)
  return y + 9
}

const drawField = (pdf, label, value, x, y, width, maxLines = 3) => {
  if (!value) return y

  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(7)
  pdf.setTextColor(93, 109, 96)
  pdf.text(label.toUpperCase(), x, y)
  y += 4

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(8.5)
  pdf.setTextColor(41, 54, 45)
  const lines = pdf.splitTextToSize(value, width).slice(0, maxLines)
  pdf.text(lines, x, y)
  return y + lines.length * 4 + 6
}

export default function Profile() {
  const [step, setStep] = useState(1)
  const [hasData, setHasData] = useState(false)
  const [downloadMessage, setDownloadMessage] = useState("")
  const formRef = useRef(null)

  const handleSave = (event) => {
    event.preventDefault()
    const form = formRef.current

    if (!form) return

    const pdf = new jsPDF({ unit: "mm", format: "a4" })
    const data = {
      name: getFormValue(form, "full-name") || "Your Name",
      role: getFormValue(form, "role") || "Professional",
      email: getFormValue(form, "email"),
      location: getFormValue(form, "location"),
      summary: getFormValue(form, "summary"),
      jobTitle: getFormValue(form, "job-title"),
      company: getFormValue(form, "company"),
      experienceDates: [getFormValue(form, "start-date"), getFormValue(form, "end-date")].filter(Boolean).join(" - "),
      experienceDescription: getFormValue(form, "experience-description"),
      degree: getFormValue(form, "degree"),
      institution: getFormValue(form, "institution"),
      educationDates: [getFormValue(form, "education-start"), getFormValue(form, "education-end")].filter(Boolean).join(" - "),
      educationDetails: getFormValue(form, "education-details"),
      language: getFormValue(form, "language"),
      languageLevel: getFormValue(form, "language-level"),
      otherLanguages: getFormValue(form, "other-languages"),
      primarySkill: getFormValue(form, "primary-skill"),
      additionalSkills: getFormValue(form, "additional-skills"),
      tools: getFormValue(form, "tools"),
      projectName: getFormValue(form, "project-name"),
      projectRole: getFormValue(form, "project-role"),
      projectLink: getFormValue(form, "project-link"),
      projectDescription: getFormValue(form, "project-description"),
    }

    pdf.setFillColor(49, 90, 59)
    pdf.rect(0, 0, 210, 48, "F")
    pdf.setFillColor(232, 240, 231)
    pdf.rect(0, 48, 58, 249, "F")

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(24)
    pdf.setTextColor(255, 255, 255)
    pdf.text(data.name, 14, 20)
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(11)
    pdf.text(data.role, 14, 29)
    pdf.setFontSize(8.5)
    const contact = [data.email, data.location].filter(Boolean).join("  |  ")
    if (contact) pdf.text(contact, 14, 38)

    let sidebarY = 62
    sidebarY = drawSectionTitle(pdf, "Contact", 12, sidebarY, 34)
    sidebarY = drawField(pdf, "Email", data.email, 12, sidebarY, 34, 2)
    sidebarY = drawField(pdf, "Location", data.location, 12, sidebarY, 34, 2)
    sidebarY += 2
    sidebarY = drawSectionTitle(pdf, "Skills", 12, sidebarY, 34)
    sidebarY = drawField(pdf, "Core skill", data.primarySkill, 12, sidebarY, 34, 2)
    sidebarY = drawField(pdf, "Additional", data.additionalSkills, 12, sidebarY, 34, 3)
    sidebarY = drawField(pdf, "Tools", data.tools, 12, sidebarY, 34, 3)
    sidebarY += 2
    sidebarY = drawSectionTitle(pdf, "Languages", 12, sidebarY, 34)
    sidebarY = drawField(pdf, data.language || "Language", data.languageLevel ? `${data.language} - ${data.languageLevel}` : data.language, 12, sidebarY, 34, 2)
    drawField(pdf, "Other", data.otherLanguages, 12, sidebarY, 34, 3)

    const contentX = 70
    const contentWidth = 126
    let contentY = 62
    contentY = drawSectionTitle(pdf, "Profile", contentX, contentY, contentWidth)
    contentY = drawField(pdf, "About", data.summary, contentX, contentY, contentWidth, 4)
    contentY += 2
    contentY = drawSectionTitle(pdf, "Experience", contentX, contentY, contentWidth)
    const experienceTitle = [data.jobTitle, data.company].filter(Boolean).join("  |  ")
    contentY = drawField(pdf, experienceTitle || "Role", data.experienceDates, contentX, contentY, contentWidth, 1)
    contentY = drawField(pdf, "Responsibilities", data.experienceDescription, contentX, contentY, contentWidth, 4)
    contentY += 2
    contentY = drawSectionTitle(pdf, "Education", contentX, contentY, contentWidth)
    const educationTitle = [data.degree, data.institution].filter(Boolean).join("  |  ")
    contentY = drawField(pdf, educationTitle || "Education", data.educationDates, contentX, contentY, contentWidth, 1)
    contentY = drawField(pdf, "Details", data.educationDetails, contentX, contentY, contentWidth, 3)
    contentY += 2
    contentY = drawSectionTitle(pdf, "Projects", contentX, contentY, contentWidth)
    const projectTitle = [data.projectName, data.projectRole].filter(Boolean).join("  |  ")
    contentY = drawField(pdf, projectTitle || "Project", data.projectLink, contentX, contentY, contentWidth, 1)
    drawField(pdf, "Description", data.projectDescription, contentX, contentY, contentWidth, 4)

    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(7)
    pdf.setTextColor(116, 129, 120)
    pdf.text("Created with Resume Builder", 70, 290)

    const pdfBlob = pdf.output("blob")
    const downloadUrl = URL.createObjectURL(pdfBlob)
    const downloadLink = document.createElement("a")
    downloadLink.href = downloadUrl
    downloadLink.download = "resume.pdf"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
    setDownloadMessage("Your resume PDF is downloading.")
  }

  return (
    <main className="min-h-screen bg-[#f6f7f4] px-4 py-6 text-[#17211b] sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-end justify-between gap-4 border-b border-[#dce2da] pb-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#748178]">Resume builder</p>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Build your profile</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-[#e5eee5] px-3 py-1.5 text-xs font-medium text-[#41634a] sm:inline-flex">Step {step} of 7</span>
            {hasData && (
              <Button type="button" onClick={handleSave} className="h-10 rounded-xl bg-[#315a3b] px-3.5 font-semibold text-white hover:bg-[#254a2f]">
                <Download className="mr-2 size-4" />
                Download PDF
              </Button>
            )}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-2xl border border-[#dce2da] bg-white p-5 shadow-[0_12px_35px_rgba(31,48,36,0.06)] sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold tracking-[-0.02em]">{step === 1 ? "Personal details" : step === 2 ? "Experience" : step === 3 ? "Education" : step === 4 ? "Languages" : step === 5 ? "Skills" : step === 6 ? "Projects" : "Summary"}</h2>
              <p className="mt-1.5 max-w-lg text-sm leading-6 text-[#748178]">
                {step === 1 ? "Start with the details hiring teams should see first." : step === 2 ? "Add your most recent role and the impact you made there." : step === 3 ? "Share the education that supports your career." : step === 4 ? "Add the languages that help you work with more people." : step === 5 ? "Highlight the skills and tools that make you stand out." : step === 6 ? "Show the work that proves what you can do." : "Bring your experience together in a clear introduction."}
              </p>
            </div>

            <form ref={formRef} className="space-y-6" onInput={() => setHasData(true)} onSubmit={handleSave}>
              <div hidden={step !== 1}><PersonalDetails /></div>
              <div hidden={step !== 2}><Experience /></div>
              <div hidden={step !== 3}><Education /></div>
              <div hidden={step !== 4}><Languages /></div>
              <div hidden={step !== 5}><Skills /></div>
              <div hidden={step !== 6}><Projects /></div>
              <div hidden={step !== 7}><Summary /></div>

              <div className="flex justify-between border-t border-[#edf0ec] pt-6">
                {step > 1 && (
                  <Button type="button" onClick={() => setStep(step - 1)} className="h-auto rounded-xl border border-[#d5ddd5] bg-white px-5 py-2.5 font-semibold text-[#315a3b] hover:bg-[#f6f7f4]">Back</Button>
                )}
                {step < 7 ? (
                  <Button type="button" onClick={() => setStep(step + 1)} className="ml-auto h-auto rounded-xl bg-[#315a3b] px-5 py-2.5 font-semibold text-white hover:bg-[#254a2f] focus-visible:ring-[#315a3b]/30">Next</Button>
                ) : (
                  <Button type="submit" className="ml-auto h-auto rounded-xl bg-[#315a3b] px-5 py-2.5 font-semibold text-white hover:bg-[#254a2f] focus-visible:ring-[#315a3b]/30">Save profile</Button>
                )}
              </div>
              {downloadMessage && <p role="status" className="text-right text-sm font-medium text-[#41634a]">{downloadMessage}</p>}
            </form>
          </section>

          <aside className="h-fit rounded-2xl border border-[#dce2da] bg-[#e8f0e7] p-6">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#315a3b] text-lg font-semibold text-white">0{step}</div>
            <h2 className="text-lg font-semibold">{step === 1 ? "Make a strong first impression" : step === 2 ? "Show your impact" : step === 3 ? "Build your foundation" : step === 4 ? "Connect across teams" : step === 5 ? "Make your strengths visible" : step === 6 ? "Let your work speak" : "Tell your story"}</h2>
            <p className="mt-2 text-sm leading-6 text-[#5d6d60]">{step === 1 ? "A complete profile gives your resume a clear voice and makes the rest of the process faster." : step === 2 ? "Focus on the work you owned and the results that made a difference." : step === 3 ? "Add education details that make your background easier to understand." : step === 4 ? "Languages can show how you communicate and collaborate across cultures." : step === 5 ? "Choose the skills and tools that best match the roles you want." : step === 6 ? "Projects make your practical experience easy for recruiters to understand." : "Use your summary to connect your experience with the opportunity ahead."}</p>
            <div className="mt-7 space-y-3 border-t border-[#ccdccc] pt-5 text-sm text-[#4c614f]">
              <p className="flex items-center gap-2"><span className="text-[#315a3b]">✓</span> Clear, concise language</p>
              <p className="flex items-center gap-2"><span className="text-[#315a3b]">✓</span> Contact details recruiters need</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
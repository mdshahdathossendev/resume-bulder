"use client";

import { Download } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormField, FormTextarea } from "@/components/resume/form-field";
import { useResumeForm } from "@/hooks/use-resume-form";

const sectionClass = "space-y-5 border-t border-[#dce2da] pt-6";
const fieldClass = "grid gap-5 sm:grid-cols-2";

export default function ResumeBuilder() {
  const { form, isGenerating, onSubmit, status } = useResumeForm();

  return (
    <main className="min-h-screen bg-[#f6f7f4] px-4 py-6 text-[#17211b] sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-[#dce2da] pb-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-[#748178]">Resume builder</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">Build your resume</h1>
            <p className="mt-2 text-sm text-[#748178]">Add the details you want to include, then export a PDF.</p>
          </div>
          <Button
            type="submit"
            form="resume-form"
            disabled={isGenerating}
            className="bg-[#315a3b] font-semibold text-white hover:bg-[#254a2f]"
          >
            <Download className="mr-2 size-4" />
            {isGenerating ? "Preparing PDF..." : "Download PDF"}
          </Button>
        </header>

        <FormProvider {...form}>
          <form
            id="resume-form"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 rounded-lg border border-[#dce2da] bg-white p-5 shadow-[0_12px_35px_rgba(31,48,36,0.06)] sm:p-8"
          >
          <section className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold">Personal details</h2>
              <p className="mt-1 text-sm text-[#748178]">Your name, title, and the best way to reach you.</p>
            </div>
            <FieldGroup className={fieldClass}>
              <FormField label="Full name *" name="fullName" placeholder="e.g. Alex Morgan" />
              <FormField label="Professional title *" name="role" placeholder="e.g. Product Designer" />
              <FormField label="Email address *" name="email" type="email" placeholder="alex@example.com" />
              <FormField label="Location" name="location" placeholder="City, Country" />
            </FieldGroup>
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Professional summary</h2>
              <p className="mt-1 text-sm text-[#748178]">A concise introduction to your experience and strengths.</p>
            </div>
            <FormTextarea label="Summary" name="summary" rows={5} placeholder="Summarize your experience, strengths, and career goals..." />
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Experience</h2>
              <p className="mt-1 text-sm text-[#748178]">Your most relevant role and the work you delivered.</p>
            </div>
            <FieldGroup className={fieldClass}>
              <FormField label="Job title" name="jobTitle" placeholder="e.g. Senior Product Designer" />
              <FormField label="Company" name="company" placeholder="e.g. Acme Inc." />
              <FormField label="Start date" name="experienceStart" placeholder="e.g. Jan 2022" />
              <FormField label="End date" name="experienceEnd" placeholder="e.g. Present" />
            </FieldGroup>
            <FormTextarea label="Responsibilities and achievements" name="experienceDescription" rows={4} placeholder="Describe what you owned, improved, or delivered..." />
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Education</h2>
              <p className="mt-1 text-sm text-[#748178]">Education and qualifications relevant to your career.</p>
            </div>
            <FieldGroup className={fieldClass}>
              <FormField label="Degree or qualification" name="degree" placeholder="e.g. BSc in Computer Science" />
              <FormField label="Institution" name="institution" placeholder="e.g. University of London" />
              <FormField label="Start date" name="educationStart" placeholder="e.g. Sep 2018" />
              <FormField label="End date" name="educationEnd" placeholder="e.g. Jun 2022" />
            </FieldGroup>
            <FormTextarea label="Additional details" name="educationDetails" rows={3} placeholder="Relevant coursework, achievements, or activities..." />
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Skills and languages</h2>
              <p className="mt-1 text-sm text-[#748178]">The skills, tools, and languages you use confidently.</p>
            </div>
            <FieldGroup className={fieldClass}>
              <FormField label="Primary skill" name="primarySkill" placeholder="e.g. Product design" />
              <FormField label="Years of experience" name="skillLevel" placeholder="e.g. 5 years" />
              <FormField label="Tools and technologies" name="tools" placeholder="e.g. Figma, Jira, React" />
              <FormField label="Language" name="language" placeholder="e.g. English" />
              <FormField label="Language proficiency" name="languageLevel" placeholder="e.g. Fluent" />
            </FieldGroup>
            <FormTextarea label="Additional skills" name="additionalSkills" rows={3} placeholder="e.g. User research, prototyping, design systems..." />
            <FormTextarea label="Other languages" name="otherLanguages" rows={3} placeholder="e.g. Spanish - conversational, French - basic..." />
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Projects</h2>
              <p className="mt-1 text-sm text-[#748178]">Showcase work that demonstrates what you can do.</p>
            </div>
            <FieldGroup className={fieldClass}>
              <FormField label="Project name" name="projectName" placeholder="e.g. Portfolio redesign" />
              <FormField label="Your role" name="projectRole" placeholder="e.g. Lead developer" />
            </FieldGroup>
            <FormField label="Project link" name="projectLink" type="url" placeholder="https://example.com/project" />
            <FormTextarea label="Project description" name="projectDescription" rows={4} placeholder="Explain the problem, your contribution, and the result..." />
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#dce2da] pt-5">
            <p role="status" className="text-sm text-[#5d6d60]">{status || "Fields marked * are required."}</p>
            <Button type="submit" disabled={isGenerating} className="bg-[#315a3b] font-semibold text-white hover:bg-[#254a2f]">
              <Download className="mr-2 size-4" />
              {isGenerating ? "Preparing PDF..." : "Download PDF"}
            </Button>
          </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
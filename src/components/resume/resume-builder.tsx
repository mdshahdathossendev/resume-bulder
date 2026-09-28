"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormTextarea } from "@/components/resume/form-field";
import {
  resumeDefaults,
  resumeSchema,
  type ResumeFormValues,
} from "@/lib/resume-schema";

const sectionClass = "space-y-5 border-t border-[#dce2da] pt-6";
const fieldClass = "grid gap-5 sm:grid-cols-2";

export default function ResumeBuilder() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resumeDefaults,
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<ResumeFormValues> = async (data) => {
    setIsGenerating(true);
    setStatus("");

    try {
      const [{ pdf }, { createResumeDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/resume/resume-pdf"),
      ]);
      const blob = await pdf(createResumeDocument(data)).toBlob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const filename = data.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      link.href = downloadUrl;
      link.download = `${filename || "resume"}.pdf`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      setStatus("Your resume PDF is ready.");
    } catch {
      setStatus("PDF export failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const fieldError = (name: keyof ResumeFormValues) => errors[name]?.message as string | undefined;

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

        <form
          id="resume-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 rounded-lg border border-[#dce2da] bg-white p-5 shadow-[0_12px_35px_rgba(31,48,36,0.06)] sm:p-8"
        >
          <section className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold">Personal details</h2>
              <p className="mt-1 text-sm text-[#748178]">Your name, title, and the best way to reach you.</p>
            </div>
            <div className={fieldClass}>
              <FormField label="Full name *" name="fullName" placeholder="e.g. Alex Morgan" register={register} error={fieldError("fullName")} />
              <FormField label="Professional title *" name="role" placeholder="e.g. Product Designer" register={register} error={fieldError("role")} />
              <FormField label="Email address *" name="email" type="email" placeholder="alex@example.com" register={register} error={fieldError("email")} />
              <FormField label="Location" name="location" placeholder="City, Country" register={register} error={fieldError("location")} />
            </div>
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Professional summary</h2>
              <p className="mt-1 text-sm text-[#748178]">A concise introduction to your experience and strengths.</p>
            </div>
            <FormTextarea label="Summary" name="summary" rows={5} placeholder="Summarize your experience, strengths, and career goals..." register={register} error={fieldError("summary")} />
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Experience</h2>
              <p className="mt-1 text-sm text-[#748178]">Your most relevant role and the work you delivered.</p>
            </div>
            <div className={fieldClass}>
              <FormField label="Job title" name="jobTitle" placeholder="e.g. Senior Product Designer" register={register} error={fieldError("jobTitle")} />
              <FormField label="Company" name="company" placeholder="e.g. Acme Inc." register={register} error={fieldError("company")} />
              <FormField label="Start date" name="experienceStart" placeholder="e.g. Jan 2022" register={register} error={fieldError("experienceStart")} />
              <FormField label="End date" name="experienceEnd" placeholder="e.g. Present" register={register} error={fieldError("experienceEnd")} />
            </div>
            <FormTextarea label="Responsibilities and achievements" name="experienceDescription" rows={4} placeholder="Describe what you owned, improved, or delivered..." register={register} error={fieldError("experienceDescription")} />
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Education</h2>
              <p className="mt-1 text-sm text-[#748178]">Education and qualifications relevant to your career.</p>
            </div>
            <div className={fieldClass}>
              <FormField label="Degree or qualification" name="degree" placeholder="e.g. BSc in Computer Science" register={register} error={fieldError("degree")} />
              <FormField label="Institution" name="institution" placeholder="e.g. University of London" register={register} error={fieldError("institution")} />
              <FormField label="Start date" name="educationStart" placeholder="e.g. Sep 2018" register={register} error={fieldError("educationStart")} />
              <FormField label="End date" name="educationEnd" placeholder="e.g. Jun 2022" register={register} error={fieldError("educationEnd")} />
            </div>
            <FormTextarea label="Additional details" name="educationDetails" rows={3} placeholder="Relevant coursework, achievements, or activities..." register={register} error={fieldError("educationDetails")} />
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Skills and languages</h2>
              <p className="mt-1 text-sm text-[#748178]">The skills, tools, and languages you use confidently.</p>
            </div>
            <div className={fieldClass}>
              <FormField label="Primary skill" name="primarySkill" placeholder="e.g. Product design" register={register} error={fieldError("primarySkill")} />
              <FormField label="Years of experience" name="skillLevel" placeholder="e.g. 5 years" register={register} error={fieldError("skillLevel")} />
              <FormField label="Tools and technologies" name="tools" placeholder="e.g. Figma, Jira, React" register={register} error={fieldError("tools")} />
              <FormField label="Language" name="language" placeholder="e.g. English" register={register} error={fieldError("language")} />
              <FormField label="Language proficiency" name="languageLevel" placeholder="e.g. Fluent" register={register} error={fieldError("languageLevel")} />
            </div>
            <FormTextarea label="Additional skills" name="additionalSkills" rows={3} placeholder="e.g. User research, prototyping, design systems..." register={register} error={fieldError("additionalSkills")} />
            <FormTextarea label="Other languages" name="otherLanguages" rows={3} placeholder="e.g. Spanish - conversational, French - basic..." register={register} error={fieldError("otherLanguages")} />
          </section>

          <section className={sectionClass}>
            <div>
              <h2 className="text-xl font-semibold">Projects</h2>
              <p className="mt-1 text-sm text-[#748178]">Showcase work that demonstrates what you can do.</p>
            </div>
            <div className={fieldClass}>
              <FormField label="Project name" name="projectName" placeholder="e.g. Portfolio redesign" register={register} error={fieldError("projectName")} />
              <FormField label="Your role" name="projectRole" placeholder="e.g. Lead developer" register={register} error={fieldError("projectRole")} />
            </div>
            <FormField label="Project link" name="projectLink" type="url" placeholder="https://example.com/project" register={register} error={fieldError("projectLink")} />
            <FormTextarea label="Project description" name="projectDescription" rows={4} placeholder="Explain the problem, your contribution, and the result..." register={register} error={fieldError("projectDescription")} />
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#dce2da] pt-5">
            <p role="status" className="text-sm text-[#5d6d60]">{status || "Fields marked * are required."}</p>
            <Button type="submit" disabled={isGenerating} className="bg-[#315a3b] font-semibold text-white hover:bg-[#254a2f]">
              <Download className="mr-2 size-4" />
              {isGenerating ? "Preparing PDF..." : "Download PDF"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
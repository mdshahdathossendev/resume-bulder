"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  useFormContext,
  type FieldPath,
  type SubmitHandler,
} from "react-hook-form";
import {
  resumeDefaults,
  resumeSchema,
  type ResumeFormValues,
} from "@/lib/resume-schema";

export function useResumeForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");
  const form = useForm<ResumeFormValues>({
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

  return { form, isGenerating, onSubmit, status };
}

export function useResumeField(name: FieldPath<ResumeFormValues>) {
  const { register, formState: { errors } } = useFormContext<ResumeFormValues>();
  return {
    error: errors[name]?.message as string | undefined,
    field: register(name),
  };
}
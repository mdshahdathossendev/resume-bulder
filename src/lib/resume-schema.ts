import { z } from "zod";

const optionalText = (maxLength = 1000) =>
  z.string().trim().max(maxLength, `Use ${maxLength} characters or fewer.`);

export const resumeSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100, "Use 100 characters or fewer."),
  role: z.string().trim().min(2, "Enter your professional title.").max(100, "Use 100 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address.").max(254, "Use 254 characters or fewer."),
  location: optionalText(120),
  jobTitle: optionalText(120),
  company: optionalText(120),
  experienceStart: optionalText(50),
  experienceEnd: optionalText(50),
  experienceDescription: optionalText(2000),
  degree: optionalText(150),
  institution: optionalText(150),
  educationStart: optionalText(50),
  educationEnd: optionalText(50),
  educationDetails: optionalText(1500),
  language: optionalText(80),
  languageLevel: optionalText(80),
  otherLanguages: optionalText(500),
  primarySkill: optionalText(120),
  skillLevel: optionalText(80),
  additionalSkills: optionalText(500),
  tools: optionalText(300),
  projectName: optionalText(120),
  projectRole: optionalText(120),
  projectLink: z.string().trim().refine(
    (value) => value === "" || (/^https?:\/\//i.test(value) && URL.canParse(value)),
    "Enter a valid link beginning with http:// or https://.",
  ),
  projectDescription: optionalText(1500),
  summary: optionalText(2000),
});

export type ResumeFormValues = z.infer<typeof resumeSchema>;

export const resumeDefaults: ResumeFormValues = {
  fullName: "",
  role: "",
  email: "",
  location: "",
  jobTitle: "",
  company: "",
  experienceStart: "",
  experienceEnd: "",
  experienceDescription: "",
  degree: "",
  institution: "",
  educationStart: "",
  educationEnd: "",
  educationDetails: "",
  language: "",
  languageLevel: "",
  otherLanguages: "",
  primarySkill: "",
  skillLevel: "",
  additionalSkills: "",
  tools: "",
  projectName: "",
  projectRole: "",
  projectLink: "",
  projectDescription: "",
  summary: "",
};
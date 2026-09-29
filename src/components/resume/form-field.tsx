import type { FieldPath } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useResumeField } from "@/hooks/use-resume-form";
import type { ResumeFormValues } from "@/lib/resume-schema";

type FormFieldProps = {
  error?: string;
  label: string;
  name: FieldPath<ResumeFormValues>;
  placeholder?: string;
  type?: "email" | "text" | "url";
};

export function FormField({
  label,
  name,
  placeholder,
  type = "text",
}: FormFieldProps) {
  const { error, field } = useResumeField(name);
  const errorId = `${name}-error`;

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...field}
      />
      {error && <FieldDescription id={errorId} className="text-destructive">{error}</FieldDescription>}
    </Field>
  );
}

type FormTextareaProps = Omit<FormFieldProps, "type"> & {
  rows?: number;
};

export function FormTextarea({
  label,
  name,
  placeholder,
  rows = 4,
}: FormTextareaProps) {
  const { error, field } = useResumeField(name);
  const errorId = `${name}-error`;

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...field}
      />
      {error && <FieldDescription id={errorId} className="text-destructive">{error}</FieldDescription>}
    </Field>
  );
}
import type { FieldPath, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ResumeFormValues } from "@/lib/resume-schema";

type FormFieldProps = {
  error?: string;
  label: string;
  name: FieldPath<ResumeFormValues>;
  placeholder?: string;
  register: UseFormRegister<ResumeFormValues>;
  type?: "email" | "text" | "url";
};

export function FormField({
  error,
  label,
  name,
  placeholder,
  register,
  type = "text",
}: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...register(name)}
      />
      {error && <p id={errorId} className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

type FormTextareaProps = Omit<FormFieldProps, "type"> & {
  rows?: number;
};

export function FormTextarea({
  error,
  label,
  name,
  placeholder,
  register,
  rows = 4,
}: FormTextareaProps) {
  const errorId = `${name}-error`;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...register(name)}
      />
      {error && <p id={errorId} className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
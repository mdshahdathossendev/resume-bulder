import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const fields = [
  { id: "full-name", label: "Full name", placeholder: "e.g. Alex Morgan", type: "text" },
  { id: "role", label: "Professional title", placeholder: "e.g. Product Designer", type: "text" },
  { id: "email", label: "Email address", placeholder: "alex@example.com", type: "email" },
  { id: "location", label: "Location", placeholder: "City, Country", type: "text" },
]

export default function PersonalDetails() {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-[#29362d]">{field.label}</Label>
            <Input id={field.id} type={field.type} placeholder={field.placeholder} className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
          </div>
        ))}
      </div>
    </>
  )
}
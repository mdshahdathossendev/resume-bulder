import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Education() {
  return (
    <section className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="degree" className="text-[#29362d]">Degree or qualification</Label>
          <Input id="degree" type="text" placeholder="e.g. BSc in Computer Science" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="institution" className="text-[#29362d]">Institution</Label>
          <Input id="institution" type="text" placeholder="e.g. University of London" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="education-start" className="text-[#29362d]">Start date</Label>
          <Input id="education-start" type="text" placeholder="e.g. Sep 2018" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="education-end" className="text-[#29362d]">End date</Label>
          <Input id="education-end" type="text" placeholder="e.g. Jun 2022" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="education-details" className="text-[#29362d]">Additional details</Label>
        <Textarea id="education-details" rows="5" placeholder="Mention relevant coursework, achievements, or activities..." className="rounded-xl border-[#d5ddd5] px-3.5 py-3 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        <span className="block text-xs text-[#8a958b]">Include details that support the kind of role you want.</span>
      </div>
    </section>
  )
}
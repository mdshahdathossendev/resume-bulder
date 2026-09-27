import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Experience() {
  return (
    <section className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="job-title" className="text-[#29362d]">Job title</Label>
          <Input id="job-title" type="text" placeholder="e.g. Senior Product Designer" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-[#29362d]">Company</Label>
          <Input id="company" type="text" placeholder="e.g. Acme Inc." className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="start-date" className="text-[#29362d]">Start date</Label>
          <Input id="start-date" type="text" placeholder="e.g. Jan 2022" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-date" className="text-[#29362d]">End date</Label>
          <Input id="end-date" type="text" placeholder="e.g. Present" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 py-3 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience-description" className="text-[#29362d]">Responsibilities and achievements</Label>
        <Textarea id="experience-description" rows="5" placeholder="Describe what you owned, improved, or delivered..." className="rounded-xl border-[#d5ddd5] px-3.5 py-3 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        <span className="block text-xs text-[#8a958b]">Use clear action verbs and include measurable results where possible.</span>
      </div>
    </section>
  )
}
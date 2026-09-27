import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Skills() {
  return (
    <section className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="primary-skill" className="text-[#29362d]">Primary skill</Label>
          <Input id="primary-skill" type="text" placeholder="e.g. Product design" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skill-level" className="text-[#29362d]">Years of experience</Label>
          <Input id="skill-level" type="text" placeholder="e.g. 5 years" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional-skills" className="text-[#29362d]">Additional skills</Label>
        <Textarea id="additional-skills" rows="4" placeholder="e.g. User research, prototyping, design systems..." className="rounded-xl border-[#d5ddd5] px-3.5 py-3 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        <span className="block text-xs text-[#8a958b]">Separate each skill with a comma.</span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tools" className="text-[#29362d]">Tools and technologies</Label>
        <Input id="tools" type="text" placeholder="e.g. Figma, Jira, React" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
      </div>
    </section>
  )
}
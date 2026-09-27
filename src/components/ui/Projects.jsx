import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Projects() {
  return (
    <section className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="project-name" className="text-[#29362d]">Project name</Label>
          <Input id="project-name" type="text" placeholder="e.g. Portfolio redesign" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project-role" className="text-[#29362d]">Your role</Label>
          <Input id="project-role" type="text" placeholder="e.g. Lead developer" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-link" className="text-[#29362d]">Project link</Label>
        <Input id="project-link" type="url" placeholder="https://example.com/project" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-description" className="text-[#29362d]">Project description</Label>
        <Textarea id="project-description" rows="6" placeholder="Explain the problem, your contribution, and the result..." className="rounded-xl border-[#d5ddd5] px-3.5 py-3 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        <span className="block text-xs text-[#8a958b]">Focus on your contribution and measurable outcomes.</span>
      </div>
    </section>
  )
}
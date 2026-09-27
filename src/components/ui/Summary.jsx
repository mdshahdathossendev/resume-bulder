import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Summary() {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="summary" className="text-[#29362d]">Professional summary</Label>
        <Textarea id="summary" rows="8" placeholder="A short introduction that captures your experience, strengths, and career goals..." className="rounded-xl border-[#d5ddd5] px-3.5 py-3 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        <span className="block text-xs text-[#8a958b]">Keep it clear and focused. You can refine this later.</span>
      </div>
    </section>
  )
}
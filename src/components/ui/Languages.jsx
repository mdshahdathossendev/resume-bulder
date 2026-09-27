import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Languages() {
  return (
    <section className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="language" className="text-[#29362d]">Language</Label>
          <Input id="language" type="text" placeholder="e.g. English" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language-level" className="text-[#29362d]">Proficiency</Label>
          <Input id="language-level" type="text" placeholder="e.g. Fluent" className="h-11 rounded-xl border-[#d5ddd5] px-3.5 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="other-languages" className="text-[#29362d]">Other languages</Label>
        <Textarea id="other-languages" rows="5" placeholder="e.g. Spanish - conversational, French - basic..." className="rounded-xl border-[#d5ddd5] px-3.5 py-3 shadow-none placeholder:text-[#a0aaa1] focus-visible:border-[#5d8265] focus-visible:ring-[#5d8265]/20" />
        <span className="block text-xs text-[#8a958b]">Add any other languages and your level of proficiency.</span>
      </div>
    </section>
  )
}
"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Tone = "professional" | "thoughtful" | "informative"

interface ToneSelectorProps {
  selectedTone: Tone
  onToneChange: (tone: Tone) => void
}

export function ToneSelector({ selectedTone, onToneChange }: ToneSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-[#1c1c1e]">Select Tone</Label>
      <RadioGroup
        value={selectedTone}
        onValueChange={(value) => onToneChange(value as Tone)}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="professional"
            id="professional"
            className="text-[#cc31e0] border-gray-300 focus:ring-[#cc31e0]"
          />
          <Label htmlFor="professional" className="text-[#1c1c1e] cursor-pointer">
            Professional
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="thoughtful"
            id="thoughtful"
            className="text-[#cc31e0] border-gray-300 focus:ring-[#cc31e0]"
          />
          <Label htmlFor="thoughtful" className="text-[#1c1c1e] cursor-pointer">
            Thoughtful
          </Label>
        </div>


        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="informative"
            id="informative"
            className="text-[#cc31e0] border-gray-300 focus:ring-[#cc31e0]"
          />
          <Label htmlFor="informative" className="text-[#1c1c1e] cursor-pointer">
            Informative
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="funny"
            id="funny"
            className="text-[#cc31e0] border-gray-300 focus:ring-[#cc31e0]"
          />
          <Label htmlFor="Funny" className="text-[#1c1c1e] cursor-pointer">
           Funny
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

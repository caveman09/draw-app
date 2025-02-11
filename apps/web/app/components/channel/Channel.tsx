"use client"

import { Hash } from "lucide-react"
import { ToggleGroupItem } from "@/components/ui/toggle-group"

interface ChannelProps {
    id: string
    name: string
    isActive?: boolean
    onClick?: () => void
}

export function Channel({ id, name, isActive, onClick }: ChannelProps) {
    return (
        <ToggleGroupItem
            value={id}
            className="mb-[2px] h-[28px] px-1 mr-1 text-gray-400 hover:bg-[#323238] hover:text-gray-300 rounded-sm data-[state=on]:text-white data-[state=on]:bg-zinc-700 w-full text-left justify-start"
            onClick={onClick}
        >
            <div className="flex items-center gap-1.5 justify-start w-full h-full">
                <Hash className="size-[12px] min-w-[12px]" />
                <text className="font-medium text-[0.800rem] truncate text-left">
                    {name}
                </text>
            </div>
        </ToggleGroupItem>
    )
}
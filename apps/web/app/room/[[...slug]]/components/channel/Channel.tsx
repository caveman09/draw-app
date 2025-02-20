"use client"
import { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hash } from "lucide-react"
import { ToggleGroupItem } from "@/components/ui/toggle-group"
import { useRoomStore } from '../../store/store';

interface ChannelProps {
    id: string
    name: string
}

const Channel = memo(function Channel({ id, name }: ChannelProps) {
    const setCurrentChannel = useRoomStore((state) => state.setCurrentChannel);

    return (
        <ToggleGroupItem
            value={id}
            className="mb-[2px] h-[28px] px-1 mr-1 text-gray-400 hover:bg-[#323238] hover:text-gray-300 rounded-sm data-[state=on]:text-white data-[state=on]:bg-zinc-700 w-full text-left justify-start"
            onClick={() => {
                setCurrentChannel(id);
            }}
        >
            <div className="flex items-center gap-1.5 justify-start w-full h-full">
                <Hash className="size-[12px] min-w-[12px]" />
                <div className="font-medium text-[0.800rem] truncate text-left">
                    {name}
                </div>
            </div>
        </ToggleGroupItem>
    )
});

export default Channel;
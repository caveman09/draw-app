"use client"
import { memo, useRef, useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import RoomSidebar from "./roomSidebar";
import { Tabs } from "@/components/ui/tabs";
import Header from './components/header/Header';

const RoomLayout = memo(function ({ children }: { children: React.ReactNode }) {

    const handleTabChange = (value: string) => {
        // Tab change logic here
    };

    return (
        <div className="text-white flex-grow bg-zinc-800 flex">
            <RoomSidebar />
            <Tabs
                defaultValue="chat"
                className="border-none flex-grow"
                onValueChange={handleTabChange}
            >
                <div className="w-full h-full">
                    <Header
                        onTabChange={handleTabChange}
                    />
                    {children}
                </div>
            </Tabs>
        </div>
    );
});

export default RoomLayout;
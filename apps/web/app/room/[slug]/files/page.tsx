"use client"
import { useParams } from "next/navigation";

export default function FilesPage() {
    const { slug } = useParams();
    
    return (
        <div className="h-full bg-zinc-900 rounded-md p-4">
            <h2>File Browser for {slug}</h2>
            {/* File browser component will go here */}
        </div>
    );
}
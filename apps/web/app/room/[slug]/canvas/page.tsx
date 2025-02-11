"use client"
import { useParams } from "next/navigation";

export default function CanvasPage() {
    const { slug } = useParams();
    
    return (
        <div className="h-full bg-zinc-900 rounded-md p-4">
            <h2>Canvas for {slug}</h2>
            {/* Canvas component will go here */}
        </div>
    );
}
"use client"
import { useParams } from "next/navigation";

export default function HistoryPage() {
    const { slug } = useParams();
    
    return (
        <div className="h-full bg-zinc-900 rounded-md p-4">
            <h2>Version History for {slug}</h2>
            {/* History component will go here */}
        </div>
    );
}
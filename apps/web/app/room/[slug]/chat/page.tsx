"use client"
import { useParams } from "next/navigation";

export default function ChatPage() {
    const { slug } = useParams();
    
    return (
        <div className="h-full bg-zinc-900 rounded-md p-4">
            <h2>Chat Room for {slug}</h2>
            {/* Chat component will go here */}
        </div>
    );
}
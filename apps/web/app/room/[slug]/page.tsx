"use client"
import LeaveButton from "./leaveButton";
import ChatRoom from "./chatroom";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [slug, setSlug] = useState<string | null>(null);

    useEffect(() => {
        const currentSlug = searchParams.get('slug');
        setSlug(currentSlug);
    }, [searchParams]);

    if (!slug) {
        return <div>Loading...</div>; // Ensure the slug is available before rendering content
    }

    return (
        <div className="text-white p-2">
            <ChatRoom slug={slug} />
            <div className="flex justify-center">
                ROOM {`${slug}`}
                <LeaveButton slug={`${slug}`} />
            </div>
        </div >
    );
}
export default Page;
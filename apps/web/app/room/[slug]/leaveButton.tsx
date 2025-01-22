"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { leaveRoom } from "@/websockets/websocketModule";

export default function LeaveButton({ slug }: { slug: string }) {
    const router = useRouter();
    return (
        <Button className="text-black" variant={'outline'} onClick={async (e) => {
            await leaveRoom(slug);
            router.push('/lobby');
        }}>
            Leave Room
        </Button>
    );
}
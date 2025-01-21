"use client"
import { Button } from "@/components/ui/button";
import { leaveRoom } from "@/websockets/websocketModule";
import { useRouter } from "next/navigation";

export default function Page({ slug }: { slug: string }) {
    const router = useRouter();

    return (
        <div className="text-white">
            ROOM {`${slug}`}
            <Button className="text-black" variant={'outline'} onClick={async (e) => {
                await leaveRoom(slug);
                router.push('/lobby');
            }}>
                Leave Room
            </Button>
        </div>
    );
}
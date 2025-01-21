import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { joinRoom } from "@/websockets/websocketModule";

export default function JoinButton({ roomId }: { roomId: number }) {
    const router = useRouter();
    return (
        <Button onClick={async (e) => {
            const response: String | undefined = await joinRoom(roomId);
            if (response) {
                console.log('.... redirecting to /room/', response);
                router.push(`/room/${response}`);
            }
        }} variant={'outline'}>
            Join
        </Button>
    );
}
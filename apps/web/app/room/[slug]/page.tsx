"use client"
import LeaveButton from "./leaveButton";
import ChatRoom from "./chatroom";
import { useParams } from "next/navigation";

const Page = () => {
    const { slug } = useParams();

    return (
        <div className="text-white p-2">
            <ChatRoom slug={typeof slug === 'string' ? slug : ''} />
            <div className="flex justify-center">
                ROOM {`${slug}`}
                <LeaveButton slug={`${slug}`} />
            </div>
        </div >
    );
}
export default Page;
"use client"
import LeaveButton from "./leaveButton";
import ChatRoom from "./chatroom";
import { useParams } from "next/navigation";
import RoomSidebar from "./roomSidebar";

const Page = () => {
    const { slug } = useParams();

    return (
        <div className="text-white p-2 flex-grow bg-zinc-800 flex">
            <RoomSidebar />
            <div className="flex-grow">
                <ChatRoom slug={typeof slug === 'string' ? slug : ''} />
                <div className="flex justify-between pl-20">
                    ROOM {`${slug}`}
                    <LeaveButton slug={`${slug}`} />
                </div>
            </div>
        </div >
    );
}
export default Page;
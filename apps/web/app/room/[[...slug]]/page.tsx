"use client"
import { useParams } from "next/navigation"
import ChatPage from "./components/chat/Chat"
import CanvasPage from "./components/canvas/Canvas"
import FilesPage from "./components/files/Files"
import HistoryPage from "./components/history/History"
import { TabsContent } from "@/components/ui/tabs"
import { memo, useEffect } from "react"
import { useRoomStore } from "./store/store"

const Page = function () {
    const params = useParams();
    const segments = (params?.slug as string[]) || [];
    const roomId = segments[0] || ''; // First segment is room ID
    const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);

    useEffect(() => {
        // Set room ID in Recoil state when component mounts or URL changes
        if (roomId) {
            setCurrentRoom(roomId);
        }
    }, [roomId]);

    return (
        <>
            <TabsContent value="chat" className="m-0 h-[calc(100%-53.5px)]">
                <div className="h-full overflow-hidden">
                    <ChatPage />
                </div>
            </TabsContent>

            <TabsContent value="canvas" className="m-0 h-[calc(100%-53.5px)]">
                <div className="h-full overflow-hidden">
                    <CanvasPage />
                </div>
            </TabsContent>

            <TabsContent value="files" className="m-0 h-[calc(100%-53.5px)]">
                <div className="h-full overflow-hidden">
                    <FilesPage />
                </div>
            </TabsContent>

            <TabsContent value="history" className="m-0 h-[calc(100%-53.5px)]">
                <div className="h-full overflow-hidden">
                    <HistoryPage />
                </div>
            </TabsContent>
        </>
    );
}

export default memo(Page);
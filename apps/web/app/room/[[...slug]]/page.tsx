"use client"
import { useParams } from "next/navigation"
import ChatPage from "./components/chat/Chat"
import CanvasPage from "./components/canvas/Canvas"
import FilesPage from "./components/files/Files"
import HistoryPage from "./components/history/History"
import { TabsContent } from "@/components/ui/tabs"

export default function Page() {
    const params = useParams();
    const segments = params.slug as string[];
    const [roomSlug, channelId, component = 'chat'] = segments || [];

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
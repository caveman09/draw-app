import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import RoomsComponent, { CreateRoomComponent } from "./rooms";

export default async function Page() {
    return (
        <Card className="">
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle className="my-auto">
                        Lobby
                    </CardTitle>
                    <CreateRoomComponent />
                </div>
                <CardDescription>
                    See what your friends are doing and select a room to join!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<div>Loading...</div>}>
                    <RoomsComponent />
                </Suspense>
            </CardContent>
        </Card>
    );
}
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import RoomsComponent from "./rooms";

export default async function Page() {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>
                    Lobby
                </CardTitle>
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
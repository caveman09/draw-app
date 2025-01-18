import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { columns } from './columns';
import { DataTable } from "./data-table";
import { RoomSchema, roomSchema } from "@repo/common/payloadSchemas";
import axios from "axios";
import { Button } from "@/components/ui/button";

async function getRooms(): Promise<RoomSchema[]> {
    const response = await axios.get('http://localhost:3001/rooms');
    return response.data.rooms;
}

export default async function Page() {
    const rooms = await getRooms();
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
                <DataTable columns={columns} data={rooms} />
            </CardContent>
        </Card>
    );
}
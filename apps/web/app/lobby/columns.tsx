"use client"
import { ColumnDef } from "@tanstack/react-table";
import { RoomSchema, roomSchema } from "@repo/common/payloadSchemas";
import { Button } from "@/components/ui/button";
import { joinRoom } from "@/websockets/websocketModule";
import axios from "axios";
import { WS_token_URL } from "@/config";

export const columns: ColumnDef<RoomSchema>[] = [
    {
        accessorKey: 'id',
        header: "Room ID",
    },
    {
        accessorKey: 'slug',
        header: "Name",
    },
    {
        accessorKey: 'adminId',
        header: "Owner",
    },
    {
        accessorKey: 'createdAt',
        header: "Created at",
    },
    {
        id: "join",
        cell: ({ row }) => (
            <Button onClick={(e) => {
                joinRoom(row.original.id);
            }} variant={'outline'}>
                Join
            </Button>
        ),
        enableSorting: false,
        enableHiding: false,
    }
]
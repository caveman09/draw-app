"use client"
import { ColumnDef } from "@tanstack/react-table";
import { RoomSchema, roomSchema } from "@repo/common/payloadSchemas";
import { Button } from "@/components/ui/button";

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
            <Button onClick={(e) => { console.log(row.original); }}>
                Join
            </Button>
        ),
        enableSorting: false,
        enableHiding: false,
    }
]
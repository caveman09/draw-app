"use client"
import { ColumnDef } from "@tanstack/react-table";
import { RoomSchema, roomSchema } from "@repo/common/payloadSchemas";
import JoinButton from "./joinButton";

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
            <JoinButton roomId={row.original.id} />
        ),
        enableSorting: false,
        enableHiding: false,
    }
]
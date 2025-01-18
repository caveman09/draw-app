"use client"
import { ColumnDef } from "@tanstack/react-table";
import { RoomSchema, roomSchema } from "@repo/common/payloadSchemas";

export const columns: ColumnDef<RoomSchema>[] = [
    {
        accessorKey: "roomId",
        header: "Room ID",
    },
    {
        accessorKey: "roomSlug",
        header: "Name",
    },
    {
        accessorKey: "adminId",
        header: "Owner",
    },
    {
        accessorKey: "createdAt",
        header: "Created at",
    }
]
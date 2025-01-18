"use client"
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { DataTable } from "./data-table";
import { RoomSchema, roomSchema } from "@repo/common/payloadSchemas";
import axios from "axios";

export default function RoomsComponent() {
    const [rooms, setRooms] = useState<RoomSchema[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRooms = async function () {
            try {
                const response = await axios.get('http://localhost:3001/rooms');
                setRooms(response.data.rooms);
            } catch (e) {
                console.error('Failed to fetch rooms: ', e);
            } finally {
                setLoading(false);
            }
        };
        getRooms();
    }, []);

    return (<> {loading ? (<div>Loading...</div>) : (<DataTable columns={columns} data={rooms} />)} </>);
}
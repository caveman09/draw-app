"use client"
import { useEffect, useState } from 'react';
import { columns } from './columns';
import { DataTable } from "./data-table";
import { RoomSchema, roomSchema } from "@repo/common/payloadSchemas";
import axios from "axios";
import { BACKEND_URL } from '@/config';

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Input } from '@/components/ui/input';

export default function RoomsComponent() {
    const [rooms, setRooms] = useState<RoomSchema[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRooms = async function () {
            try {
                const response = await axios.get(`${BACKEND_URL}/rooms`);
                setRooms(response.data.rooms);
            } catch (e) {
                console.error('Failed to fetch rooms: ', e);
            } finally {
                setLoading(false);
            }
        };
        getRooms();
    }, []);

    useEffect(() => { console.log(rooms); }, [rooms])

    return (<> {loading ? (<div>Loading...</div>) : (<DataTable columns={columns} data={rooms} />)} </>);
}

export function CreateRoomComponent() {
    return (
        <Collapsible>
            <CollapsibleTrigger className='border-[2px] py-[2px] px-[8px] rounded-md border-gray-800'>Create a room !</CollapsibleTrigger>
            <CollapsibleContent className='flex'>
                <Input placeholder='room-name' />
                <Button onClick={(e) => { }}>
                    Create
                </Button>
            </CollapsibleContent>
        </Collapsible>
    );
}
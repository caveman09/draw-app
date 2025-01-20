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
import { createRoom } from '@/websockets/websocketModule';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateRoomSchema } from '@repo/common/types';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


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
    const form = useForm<z.infer<typeof CreateRoomSchema>>({
        resolver: zodResolver(CreateRoomSchema),
        defaultValues: {
            name: '',
        }
    })

    function onSubmit(values: z.infer<typeof CreateRoomSchema>) {
        createRoom(values.name);
    }

    return (
        <Collapsible>
            <CollapsibleTrigger className='border-[2px] py-[2px] px-[8px] rounded-md border-gray-800'>Create a room !</CollapsibleTrigger>
            <CollapsibleContent className='flex'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='room-name' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>Create</Button>
                    </form>
                </Form>
            </CollapsibleContent>
        </Collapsible >
    );
}
"use client"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { CreateUserSchema } from "@repo/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const form = useForm<z.infer<typeof CreateUserSchema>>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: {
            username: "",
            password: "",
            name: ""
        }
    });

    async function onSubmit(values: z.infer<typeof CreateUserSchema>) {
        const requestBody = {
            username: values.username,
            password: values.password,
            name: values.name
        };
        try {

            const response = await axios.post(`${BACKEND_URL}/signup`, requestBody);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold">
                    signup
                </CardTitle>
                <CardDescription>
                    create a free account.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField control={form.control} name="username" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium">
                                    email
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe@cavemail.com" {...field} type='email' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="font-medium">
                                    password
                                </FormLabel>
                                <FormControl className="">
                                    <Input placeholder="password123" {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem className="">
                                <FormLabel className="font-medium">
                                    display name
                                </FormLabel>
                                <FormControl className="">
                                    <Input placeholder="JohnDoe" {...field} type='text' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type="submit" variant={'outline'}>create account</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>);
}
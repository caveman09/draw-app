"use client"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { SigninSchema } from "@repo/common/types";
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
import { useRouter } from "next/navigation";
import { BACKEND_URL, WS_token_URL } from "@/config";
import { connect } from "@/websockets/websocketModule";

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const form = useForm<z.infer<typeof SigninSchema>>({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    async function onSubmit(values: z.infer<typeof SigninSchema>) {
        // do a fetch request signIn with username and password
        const requestBody = {
            username: values.username,
            password: values.password
        }
        try {

            const response = await axios.post(`${BACKEND_URL}/signin`, requestBody, { withCredentials: true });
            if (response.status === 200) {
                const token = document.cookie.split('; ').find(item => item.startsWith('token='));
                connect(token ? token : '');
                router.push('/lobby');
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
            <Card>
                <CardHeader className="border-2 m-1 rounded-xl border-slate-800 py-2 bg-indigo-100">
                    <CardTitle className="font-semibold">
                        signin
                    </CardTitle>
                    <CardDescription>
                        login to an existing account.
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
                            <Button type="submit" variant={'outline'} className="bg-indigo-200 border-2 border-slate-700">signin</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
    );
}
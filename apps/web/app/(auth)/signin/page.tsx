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

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

            const response = await axios.post('http://localhost:3001/signin', requestBody);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold">
                    Signin
                </CardTitle>
                <CardDescription>
                    Login to an existing account.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField control={form.control} name="username" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium">
                                    Email
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
                                    Password
                                </FormLabel>
                                <FormControl className="">
                                    <Input placeholder="password123" {...field} type='password' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button type="submit">SignIn</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>);
}
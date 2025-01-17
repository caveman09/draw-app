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

export default function Page() {
    const form = useForm<z.infer<typeof SigninSchema>>({
        resolver: zodResolver(SigninSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    function onSubmit(values: z.infer<typeof SigninSchema>) {
        // do something here
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
                                    <Input placeholder="johndoe@cavemail.com" {...field} />
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
                                    <Input placeholder="password123" {...field} />
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
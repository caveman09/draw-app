"use client"
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className='bg-black mt-[30vh] flex justify-center'>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Chat app</CardTitle>
          <CardDescription>TEST</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-2">SignIn to continue</p>
          <div className="flex justify-evenly">
            <Link href={'/signin'}>Already have an account?</Link>
            <Link href={'/signup'}>Create an account</Link>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>);
}

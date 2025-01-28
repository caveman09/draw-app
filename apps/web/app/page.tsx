"use client"
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "./components/ui/button";
import Link from "next/link";
import { Badge } from "./components/ui/badge";

export default function Page() {
  return (
    <div className='bg-black mt-[30vh] flex justify-center'>
      <div className="border-2 p-1 rounded-2xl">
        <Card className="w-[350px] lg:w-[400px]">
          <CardHeader className="border-2 border-gray-800 rounded-xl m-2 bg-pink-100 hover:bg-pink-200">
            <CardTitle className="mx-auto">cave-carvings</CardTitle>
            <CardDescription className="mx-auto">multiuser collaboration app</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <p className="text-center mb-1 font-thin font-serif">please signin to continue.</p>
            <div className="flex justify-between px-2">
              <Link href={'/signin'} className="border-[2px] border-gray-700 rounded-lg bg-indigo-200 hover:bg-indigo-100">
                <Button variant={'link'} className="mx-0 px-2">
                  already have an account?
                </Button>
              </Link>
              <Link href={'/signup'} className="border-[2px] border-gray-700 rounded-lg bg-lime-100 hover:bg-lime-50">
                <Button variant={'link'} className="mx-0 px-2">
                  create an account!
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>);
}

import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Page() {
  return (
    <div className='bg-black mt-[30vh]'>
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Chat app</CardTitle>
          <CardDescription>TEST</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>);
}

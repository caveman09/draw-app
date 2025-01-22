import LeaveButton from "./leaveButton";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheetWindow"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = (await params).slug;
    return (
        <div className="text-white p-2">
            <Sheet defaultOpen={false}>
                <SheetTrigger className="fixed z-50 m-1">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </SheetTrigger>
                <SheetContent side={'topleft'} className="rounded-lg">
                    <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet >
            <div className="flex justify-center">
                ROOM {`${slug}`}
                <LeaveButton slug={`${slug}`} />
            </div>
        </div >
    );
}
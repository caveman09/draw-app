import LeaveButton from "./leaveButton";

export default async function Page({ params }: { params: { slug: string } }) {
    const slug = (await params).slug;
    return (
        <div className="text-white">
            ROOM {`${slug}`}
            <LeaveButton slug={`${slug}`} />
        </div>
    );
}
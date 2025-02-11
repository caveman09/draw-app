"use client"
import { useParams, useRouter, redirect } from "next/navigation";

const Page = () => {
    const { slug } = useParams();
    redirect(`/room/${slug}/chat`);
}

export default Page;
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (<div className="bg-black w-[40%] mx-auto">
        {children}
    </div>);
}
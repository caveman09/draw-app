import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (<div className="bg-black mt-[10%] flex justify-center">
        <div className="w-[400px]">
            {children}
        </div>
    </div>);
}
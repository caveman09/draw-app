import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (<div className="mt-[10%] flex justify-center">
        <div className="w-[400px]">
            <div className="border-2 p-1 rounded-2xl">
                {children}
            </div>
        </div>
    </div>);
}
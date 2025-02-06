import type { Metadata } from "next";
import localFont from "next/font/local";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import "@/globals.css";
import { AppSidebar } from "./components/appSidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const ggsans = localFont({
  src: [
    {
      path: "../public/fonts/ggsans/ggsans-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/ggsans/ggsans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ggsans/ggsans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ggsans/ggsans-Bold.ttf",
      weight: "700",
      style: "normal",
    }
  ],
  variable: "--font-ggsans",
});

export const metadata: Metadata = {
  title: "cave-carvings",
  description: "A Collaboration App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ggsans.className}`}>
        {
          <SidebarProvider style={{
            "--sidebar-width": "4rem"
          }}>
            <AppSidebar />
            <main className="flex-grow">
              {children}
            </main>
          </SidebarProvider>
        }
      </body>
    </html>
  );
}

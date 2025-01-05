import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Netflix Clone",
    description: "Netflix a streaming app",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

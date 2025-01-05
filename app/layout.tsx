import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";

const inter = Inter({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <html lang="en">
                <body className={`${inter.className} antialiased`}>
                    {children}
                </body>
            </html>
        </StoreProvider>
    );
}

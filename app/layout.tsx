import React from "react";
import Header from "@/components/Header";

export default function RootLayout(
    { children }: Readonly<{ children: React.ReactNode; }>
) {
    return (
        <html lang="en">
            <body style={{ backgroundColor: "#ffe4e1", margin: "0", padding: "0" }}>
                <Header />
                <main style={{ padding: '110px' }}>
                    {children}
                </main>
            </body>
        </html>
    );
}

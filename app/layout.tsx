import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AllProviders } from "./providers";

export const metadata: Metadata = {
    title: "Azamra T Platform",
    description: "RWA Tokenisation Platform",
    authors: [{ name: "Azamra T" }],
    openGraph: {
        title: "Azamra T Platform",
        description: "RWA Tokenisation Platform",
        type: "website",
        images: [
            {
                url: "https://lovable.dev/opengraph-image-p98pqg.png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@AzamraT",
        images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body>
                    <AllProviders>
                        <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            {children}
                        </TooltipProvider>
                    </AllProviders>
                </body>
            </html>
        </ClerkProvider>
    );
}

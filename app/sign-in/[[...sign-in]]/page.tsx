"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary">
            <SignIn
                fallbackRedirectUrl="/dashboard"
                signUpFallbackRedirectUrl="/dashboard"
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "shadow-lg",
                    },
                }}
            />
        </div>
    );
}

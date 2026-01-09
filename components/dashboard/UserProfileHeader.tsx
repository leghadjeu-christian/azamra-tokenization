"use client";

import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

export function UserProfileHeader() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="flex items-center gap-3 animate-pulse">
                <div className="h-10 w-10 bg-secondary rounded-full" />
                <div className="flex-1">
                    <div className="h-4 w-32 bg-secondary rounded mb-2" />
                    <div className="h-3 w-24 bg-secondary rounded" />
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-10 h-10",
                            },
                        }}
                    />
                    <div>
                        <p className="font-semibold text-foreground">
                            {user.fullName || user.primaryEmailAddress?.emailAddress}
                        </p>
                        <Badge variant="outline" className="text-xs">
                            Not Verified
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}

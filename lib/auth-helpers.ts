import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Check if the current user has admin role
 */
export async function isAdmin(): Promise<boolean> {
    const user = await currentUser();
    if (!user) return false;
 
    // Check if user has admin role in public metadata
    const publicMetadata = user.publicMetadata as { role?: string };
    if (publicMetadata?.role === "admin") {
        return true;
    }

    // For development, allow any authenticated user to be admin if NEXT_PUBLIC_ALLOW_DEV_ADMIN is true
    if (process.env.NEXT_PUBLIC_ALLOW_DEV_ADMIN === "true") {
        console.log("Development admin access granted.");
        return true;
    }

    return false;
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    return { userId };
}

/**
 * Require admin - throws if not admin
 */
export async function requireAdmin() {
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
        return authResult; // Return unauthorized response
    }

    const admin = await isAdmin();
    if (!admin) {
        return NextResponse.json(
            { error: "Forbidden - Admin access required" },
            { status: 403 }
        );
    }

    return authResult;
}

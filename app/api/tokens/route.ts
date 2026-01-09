import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

// GET /api/tokens - Get all active tokens (public)
export async function GET() {
    try {
        const tokens = await prisma.token.findMany({
            where: {
                status: "active",
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(tokens);
    } catch (error) {
        console.error("Error fetching tokens:", error);
        return NextResponse.json(
            { error: "Failed to fetch tokens" },
            { status: 500 }
        );
    }
}

// POST /api/tokens - Create new token (admin only)
export async function POST(request: Request) {
    const adminCheck = await requireAdmin();
    if (adminCheck instanceof NextResponse) {
        return adminCheck; // Return error response
    }

    try {
        const body = await request.json();

        const token = await prisma.token.create({
            data: {
                name: body.name,
                symbol: body.symbol,
                description: body.description,
                assetClass: body.assetClass,
                price: parseFloat(body.price),
                yield: parseFloat(body.yield),
                totalSupply: parseInt(body.totalSupply),
                availableSupply: parseInt(body.availableSupply),
                minInvestment: parseFloat(body.minInvestment),
                status: body.status || "active",
                heroImage: body.heroImage || null,
                documents: body.documents || null,
            },
        });

        return NextResponse.json(token, { status: 201 });
    } catch (error) {
        console.error("Error creating token:", error);
        return NextResponse.json(
            { error: "Failed to create token" },
            { status: 500 }
        );
    }
}

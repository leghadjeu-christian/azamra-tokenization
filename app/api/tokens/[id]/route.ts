import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-helpers";

// GET /api/tokens/[id] - Get single token (public)
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const token = await prisma.token.findUnique({
            where: { id },
        });

        if (!token) {
            return NextResponse.json(
                { error: "Token not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(token);
    } catch (error) {
        console.error("Error fetching token:", error);
        return NextResponse.json(
            { error: "Failed to fetch token" },
            { status: 500 }
        );
    }
}

// PUT /api/tokens/[id] - Update token (admin only)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const adminCheck = await requireAdmin();
    if (adminCheck instanceof NextResponse) {
        return adminCheck;
    }

    try {
        const { id } = await params;
        const body = await request.json();

        const token = await prisma.token.update({
            where: { id },
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
                status: body.status,
                heroImage: body.heroImage,
                documents: body.documents,
            },
        });

        return NextResponse.json(token);
    } catch (error) {
        console.error("Error updating token:", error);
        return NextResponse.json(
            { error: "Failed to update token" },
            { status: 500 }
        );
    }
}

// DELETE /api/tokens/[id] - Soft delete token (admin only)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const adminCheck = await requireAdmin();
    if (adminCheck instanceof NextResponse) {
        return adminCheck;
    }

    try {
        const { id } = await params;
        // Soft delete by setting status to archived
        const token = await prisma.token.update({
            where: { id },
            data: { status: "archived" },
        });

        return NextResponse.json({ success: true, token });
    } catch (error) {
        console.error("Error deleting token:", error);
        return NextResponse.json(
            { error: "Failed to delete token" },
            { status: 500 }
        );
    }
}

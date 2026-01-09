import { Layout } from "@/components/layout/Layout";
import { TokenForm } from "@/components/admin/TokenForm";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { EditTokenClient } from "./client";

interface EditTokenPageProps {
    params: {
        id: string;
    };
}

export default async function EditTokenPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const token = await prisma.token.findUnique({
        where: { id },
    });

    if (!token) {
        notFound();
    }

    return (
        <Layout>
            <div className="section bg-background min-h-screen">
                <div className="container-lg max-w-3xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Edit Token</h1>
                        <p className="text-muted-foreground">Update token details</p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                        <EditTokenClient token={token} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

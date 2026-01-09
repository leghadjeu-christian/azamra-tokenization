"use client";

import { Layout } from "@/components/layout/Layout";
import { TokenForm } from "@/components/admin/TokenForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function NewTokenPage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch("/api/tokens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to create token");
            }

            toast.success("Token created successfully");
            router.push("/admin");
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <Layout>
            <div className="section bg-background min-h-screen">
                <div className="container-lg max-w-3xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Create New Token</h1>
                        <p className="text-muted-foreground">Add a new asset to the platform</p>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                        <TokenForm onSubmit={handleSubmit} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

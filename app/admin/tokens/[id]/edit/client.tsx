"use client";

import { TokenForm } from "@/components/admin/TokenForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditTokenClientProps {
    token: any;
}

export function EditTokenClient({ token }: EditTokenClientProps) {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            const response = await fetch(`/api/tokens/${token.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to update token");
            }

            toast.success("Token updated successfully");
            router.push("/admin");
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return <TokenForm initialData={token} onSubmit={handleSubmit} isEditing />;
}

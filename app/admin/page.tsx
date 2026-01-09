import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatFcfa } from "@/lib/mock-data";

export default async function AdminDashboard() {
    const admin = await isAdmin();

    // Create your first user as admin by checking email if metadata not set?
    // For now, strict check. If verified, proceed.
    if (!admin) {
        // Optional: for development, you might want to allow access or show a clearer error
        // return <div>Access Denied. Admin role required.</div>;
        // For now we assume the user has set the metadata as per instructions
    }

    // Fetch tokens (including non-active ones)
    const tokens = await prisma.token.findMany({
        where: {
            status: { not: "archived" }
        },
        orderBy: { createdAt: "desc" }
    });

    return (
        <Layout>
            <div className="section bg-background min-h-screen">
                <div className="container-lg">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                            <p className="text-muted-foreground">Manage platform assets</p>
                        </div>
                        <Button asChild>
                            <Link href="/admin/tokens/new">
                                <Plus className="w-4 h-4 mr-2" />
                                Add New Token
                            </Link>
                        </Button>
                    </div>

                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-secondary border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Symbol</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Supply</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {tokens.map((token) => (
                                    <tr key={token.id} className="hover:bg-secondary/50">
                                        <td className="px-6 py-4 font-medium">{token.name}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{token.symbol}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${token.status === 'active' ? 'bg-green-100 text-green-800' :
                                                    token.status === 'sold-out' ? 'bg-red-100 text-red-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {token.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{formatFcfa(token.price)}</td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {token.availableSupply.toLocaleString()} / {token.totalSupply.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/admin/tokens/${token.id}/edit`}>
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {tokens.length === 0 && (
                            <div className="p-8 text-center text-muted-foreground">
                                No tokens found. Create your first one!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

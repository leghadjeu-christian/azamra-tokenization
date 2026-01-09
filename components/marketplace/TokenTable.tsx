"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn utility is from here
import { Button } from "@/components/ui/button"; // Assuming Button component is from here

// We can use the useRouter hook to handle row clicks programmatically if we want the whole row clickable
// But wrapping the row contents in a Link component or having a specific column link is also fine.
// The current implementation has a Link in the name column.
// Let's make sure the row click also works seamlessly or just rely on the Name column link.
// The current code already wraps the name in a Link: <Link href={`/marketplace/${token.id}`} ...>
// but the row has `cursor-pointer`.
// Let's add an onClick handler to the row to navigate.



const handleRowClick = (tokenId: string) => {
    router.push(`/marketplace/${tokenId}`);
};

interface Token {
    id: string;
    name: string;
    symbol: string;
    price: number;
    yield: number;
    status: string;
    assetClass: string;
    totalSupply: number;
    availableSupply: number;
}

interface TokenTableProps {
    tokens: Token[];
}

export function TokenTable({ tokens }: TokenTableProps) {
    const router = useRouter();
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const toggleFavorite = (tokenId: string) => {
        setFavorites((prev) => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(tokenId)) {
                newFavorites.delete(tokenId);
            } else {
                newFavorites.add(tokenId);
            }
            return newFavorites;
        });
    };

    const formatPrice = (price: number) => {
        return `${price.toLocaleString()} FCFA`;
    };

    const getChangeIndicator = (change: number) => {
        if (change > 0) {
            return (
                <span className="flex items-center text-success">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {change.toFixed(2)}%
                </span>
            );
        } else if (change < 0) {
            return (
                <span className="flex items-center text-destructive">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    {Math.abs(change).toFixed(2)}%
                </span>
            );
        }
        return <span className="text-muted-foreground">0.00%</span>;
    };

    return (
        <div className="border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-secondary border-b border-border">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase w-12"></th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Symbol</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Last Price</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Change (24H)</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Yield</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tokens.map((token) => (
                            <tr
                                key={token.id}
                                className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                                onClick={() => router.push(`/marketplace/${token.id}`)}
                            >
                                <td className="px-4 py-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(token.id);
                                        }}
                                    >
                                        <Star
                                            className={cn(
                                                "h-4 w-4",
                                                favorites.has(token.id)
                                                    ? "fill-warning text-warning"
                                                    : "text-muted-foreground"
                                            )}
                                        />
                                    </Button>
                                </td>
                                <td className="px-4 py-4">
                                    <Link
                                        href={`/marketplace/${token.id}`}
                                        className="font-medium text-foreground hover:text-primary transition-colors"
                                    >
                                        {token.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-4 text-muted-foreground">{token.symbol}</td>
                                <td className="px-4 py-4 font-medium text-foreground">
                                    {formatPrice(token.price)}
                                </td>
                                <td className="px-4 py-4">{getChangeIndicator(0)}</td>
                                <td className="px-4 py-4 text-success font-medium">{token.yield.toFixed(2)}%</td>
                                <td className="px-4 py-4 text-muted-foreground">
                                    {token.availableSupply.toLocaleString()} / {token.totalSupply.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {tokens.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No tokens found
                </div>
            )}
        </div>
    );
}

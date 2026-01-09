"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingDown, TrendingUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatFcfa } from "@/lib/mock-data";

interface AssetDetailHeaderProps {
    token: any;
}

export function AssetDetailHeader({ token }: AssetDetailHeaderProps) {
    const [isWatchlisted, setIsWatchlisted] = useState(false);

    // Mock price change for now
    const change = -30.56;
    const isPositive = change >= 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="pl-0 hover:pl-2 transition-all">
                    <Link href="/marketplace">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go back to Asset Catalog
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm p-3 border border-border">
                        <img
                            src="/placeholder.svg"
                            alt={token.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{token.symbol}</h1>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full hover:bg-muted"
                                onClick={() => setIsWatchlisted(!isWatchlisted)}
                            >
                                <Star className={`w-5 h-5 ${isWatchlisted ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                            </Button>
                        </div>
                        <p className="text-muted-foreground font-medium">{token.name}</p>
                    </div>
                </div>

                <div className="flex gap-8 md:gap-12 w-full md:w-auto">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">Last Price</p>
                        <p className="text-2xl font-bold font-mono">{formatFcfa(token.price)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">24h Change</p>
                        <div className={`flex items-center gap-1 text-2xl font-bold font-mono ${isPositive ? "text-green-500" : "text-red-500"}`}>
                            {isPositive ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                            {Math.abs(change)}%
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <Button size="lg" className="flex-1 md:flex-none">
                        Buy
                    </Button>
                    <Button size="lg" variant="outline" className="flex-1 md:flex-none">
                        Sell
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border">
                <div>
                    <p className="text-sm text-muted-foreground">Open</p>
                    <p className="font-mono mt-1">-</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Close</p>
                    <p className="font-mono mt-1">{formatFcfa(36000)}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">High</p>
                    <p className="font-mono mt-1">-</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Low</p>
                    <p className="font-mono mt-1">-</p>
                </div>
            </div>
        </div>
    );
}

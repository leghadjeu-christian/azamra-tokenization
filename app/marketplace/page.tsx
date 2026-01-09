"use client";

import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { MarketSchedule } from "@/components/dashboard/MarketSchedule";
import {
    MarketplaceTabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/marketplace/MarketplaceTabs";
import { TokenTable } from "@/components/marketplace/TokenTable";
import { TableFilters } from "@/components/marketplace/TableFilters";
import { Loader2 } from "lucide-react";

export default function Marketplace() {
    const [tokens, setTokens] = useState<any[]>([]);
    const [filteredTokens, setFilteredTokens] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await fetch("/api/tokens");
                if (response.ok) {
                    const data = await response.json();
                    setTokens(data);
                    setFilteredTokens(data);
                }
            } catch (error) {
                console.error("Failed to fetch tokens:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTokens();
    }, []);

    const handleSearch = (query: string) => {
        if (!query) {
            setFilteredTokens(tokens);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = tokens.filter(
            (token) =>
                token.name.toLowerCase().includes(lowerQuery) ||
                token.symbol.toLowerCase().includes(lowerQuery)
        );
        setFilteredTokens(filtered);
    };

    return (
        <Layout>
            <div className="section bg-background min-h-screen">
                <div className="container-lg">
                    {/* Market Schedule */}
                    <div className="mb-8">
                        <MarketSchedule />
                    </div>

                    <div className="section-header mb-8">
                        <h1 className="section-title">Marketplace</h1>
                        <p className="section-subtitle">
                            Explore and invest in tokenized real-world assets
                        </p>
                    </div>

                    <MarketplaceTabs defaultValue="catalog">
                        <TabsList className="mb-6">
                            <TabsTrigger value="catalog">Asset Catalog</TabsTrigger>
                            <TabsTrigger value="orders">My Orders</TabsTrigger>
                        </TabsList>

                        <TabsContent value="catalog">
                            <TableFilters onSearchChange={handleSearch} />

                            {loading ? (
                                <div className="flex justify-center p-12">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                </div>
                            ) : (
                                <TokenTable tokens={filteredTokens} />
                            )}
                        </TabsContent>

                        <TabsContent value="orders">
                            <div className="text-center py-12 border border-dashed border-border rounded-lg">
                                <p className="text-muted-foreground">
                                    No orders found. Start trading to see your order history.
                                </p>
                            </div>
                        </TabsContent>
                    </MarketplaceTabs>
                </div>
            </div>
        </Layout>
    );
}

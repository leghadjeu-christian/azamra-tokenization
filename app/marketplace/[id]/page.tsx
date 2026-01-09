import { Layout } from "@/components/layout/Layout";
import { AssetDetailHeader } from "@/components/marketplace/asset/AssetDetailHeader";
import { PriceChart } from "@/components/marketplace/asset/PriceChart";
import { OrderBook } from "@/components/marketplace/asset/OrderBook";
import { TradeHistory } from "@/components/marketplace/asset/TradeHistory";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AssetDetailPage({ params }: { params: Promise<{ id: string }> }) {
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
                <div className="container-lg">
                    <AssetDetailHeader token={token} />

                    <div className="mt-8">
                        <Tabs defaultValue="trade" className="w-full">
                            <TabsList className="w-full justify-start h-12 bg-transparent border-b border-border rounded-none p-0">
                                <TabsTrigger
                                    value="trade"
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-6"
                                >
                                    Trade
                                </TabsTrigger>
                                <TabsTrigger
                                    value="orders"
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-6"
                                >
                                    My Orders
                                </TabsTrigger>
                                <TabsTrigger
                                    value="info"
                                    className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-12 px-6"
                                >
                                    Asset Info
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="trade" className="pt-6 space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <PriceChart />
                                        <TradeHistory />
                                    </div>
                                    <div className="space-y-6">
                                        <OrderBook />
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="orders" className="pt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>My Orders</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-center py-12 text-muted-foreground">
                                            No open orders for this asset.
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="info" className="pt-6">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="prose dark:prose-invert max-w-none">
                                            <h3>About {token.name}</h3>
                                            <p>{token.description}</p>

                                            <h4 className="mt-6">Asset Details</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 not-prose">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Asset Class</p>
                                                    <p className="font-medium">{token.assetClass}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Total Supply</p>
                                                    <p className="font-medium">{token.totalSupply.toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Available</p>
                                                    <p className="font-medium">{token.availableSupply.toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Annual Yield</p>
                                                    <p className="font-medium text-green-600">{token.yield}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Min Investment</p>
                                                    <p className="font-medium">{token.minInvestment.toLocaleString()} FCFA</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

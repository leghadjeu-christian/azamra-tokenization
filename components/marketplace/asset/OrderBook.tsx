"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatFcfa } from "@/lib/mock-data";

export function OrderBook() {
    const buyOrders = [
        { price: 27950, quantity: 10, total: 279500 },
        { price: 27900, quantity: 100, total: 2790000 },
        { price: 27850, quantity: 500, total: 13925000 },
        { price: 27500, quantity: 1000, total: 27500000 },
        { price: 27000, quantity: 5000, total: 135000000 },
    ];

    const sellOrders = [
        { price: 28050, quantity: 20, total: 561000 },
        { price: 28100, quantity: 100, total: 2810000 },
        { price: 28250, quantity: 50, total: 1412500 },
        { price: 28500, quantity: 200, total: 5700000 },
        { price: 29000, quantity: 1000, total: 29000000 },
    ];

    return (
        <div className="bg-card rounded-lg border border-border overflow-hidden h-full">
            <div className="p-4 border-b border-border bg-secondary/30">
                <h3 className="font-semibold">Order Book</h3>
            </div>

            <div className="overflow-auto max-h-[600px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Price (FCFA)</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead className="text-right">Value (FCFA)</TableHead>
                            <TableHead className="text-right w-[80px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Buy Orders (Asks) - Top half, ideally sorted high to low */}
                        {buyOrders.map((order, i) => (
                            <TableRow key={`buy-${i}`} className="hover:bg-red-50/50 dark:hover:bg-red-900/10">
                                <TableCell className="font-mono text-red-600 dark:text-red-400 font-medium">
                                    {order.price.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right font-mono text-muted-foreground">
                                    {order.quantity.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right font-mono text-muted-foreground">
                                    {order.total.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" className="h-6 text-xs border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">
                                        Buy
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {/* Spread Indicator */}
                        <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                            <TableCell colSpan={4} className="text-center text-xs font-medium text-muted-foreground py-2 h-auto">
                                Spread: 100 FCFA
                            </TableCell>
                        </TableRow>

                        {/* Sell Orders (Bids) - Bottom half */}
                        {sellOrders.map((order, i) => (
                            <TableRow key={`sell-${i}`} className="hover:bg-green-50/50 dark:hover:bg-green-900/10">
                                <TableCell className="font-mono text-green-600 dark:text-green-400 font-medium">
                                    {order.price.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right font-mono text-muted-foreground">
                                    {order.quantity.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right font-mono text-muted-foreground">
                                    {order.total.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" className="h-6 text-xs border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800">
                                        Sell
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

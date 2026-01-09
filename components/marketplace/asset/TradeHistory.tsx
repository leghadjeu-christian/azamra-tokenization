"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatFcfa } from "@/lib/mock-data";

export function TradeHistory() {
    const trades = [
        { price: 28000, quantity: 64, date: 'Jan 07, 18:56', type: 'buy' },
        { price: 28000, quantity: 36, date: 'Jan 07, 17:04', type: 'buy' },
        { price: 27950, quantity: 10, date: 'Jan 07, 17:04', type: 'sell' },
        { price: 27900, quantity: 10, date: 'Jan 07, 16:13', type: 'sell' },
        { price: 28050, quantity: 10, date: 'Jan 07, 15:03', type: 'buy' },
        { price: 27850, quantity: 78, date: 'Jan 06, 14:00', type: 'sell' },
        { price: 27800, quantity: 67, date: 'Jan 06, 14:00', type: 'sell' },
    ];

    return (
        <div className="bg-card rounded-lg border border-border overflow-hidden h-full">
            <div className="p-4 border-b border-border bg-secondary/30">
                <h3 className="font-semibold">Recent Trades</h3>
            </div>

            <div className="overflow-auto max-h-[400px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Price (FCFA)</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trades.map((trade, i) => (
                            <TableRow key={i}>
                                <TableCell className={`font-mono font-medium ${trade.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                                    {trade.price.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right font-mono text-muted-foreground">
                                    {trade.quantity.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground">
                                    {trade.date}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

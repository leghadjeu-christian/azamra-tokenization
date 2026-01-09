"use client";

import { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Button } from '@/components/ui/button';

const data = [
    { date: 'Jan 01', price: 24000 },
    { date: 'Jan 05', price: 25500 },
    { date: 'Jan 10', price: 23000 },
    { date: 'Jan 15', price: 28000 },
    { date: 'Jan 20', price: 27500 },
    { date: 'Jan 25', price: 32000 },
    { date: 'Jan 30', price: 36000 },
];

export function PriceChart() {
    const [timeframe, setTimeframe] = useState('1Y');

    return (
        <div className="bg-card rounded-lg border border-border p-6 h-[450px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold">Performance</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-bold font-mono">36,000 FCFA</span>
                        <span className="text-green-500 font-medium">+50.00% (1Y)</span>
                    </div>
                </div>
                <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg">
                    {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((tf) => (
                        <Button
                            key={tf}
                            variant={timeframe === tf ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setTimeframe(tf)}
                            className="px-3 h-7 text-xs"
                        >
                            {tf}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#007A5E" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#007A5E" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#64748B' }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#64748B' }}
                            tickFormatter={(value) => `${value / 1000}k`}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '8px',
                                border: '1px solid #E2E8F0',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value: number) => [`${value.toLocaleString()} FCFA`, 'Price']}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#007A5E"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorPrice)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                <div>Year High: <span className="text-foreground font-mono">39,000 FCFA</span></div>
                <div>Year Low: <span className="text-foreground font-mono">3,100 FCFA</span></div>
            </div>
        </div>
    );
}

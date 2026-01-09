"use client";

import { Badge } from "@/components/ui/badge";
import { Info, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

export function MarketSchedule() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeLeft, setTimeLeft] = useState("");
    const [isMarketOpen, setIsMarketOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            // Get current time in WAT (UTC+1)
            const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
            const watTime = new Date(utcTime + (3600000)); // UTC + 1 hour for WAT

            const currentHour = watTime.getHours();
            const currentMinute = watTime.getMinutes();
            const currentSecond = watTime.getSeconds();

            // Market hours: 08:00 to 20:00 WAT
            const isOpen = currentHour >= 8 && currentHour < 20;
            setIsMarketOpen(isOpen);

            if (isOpen) {
                // Calculate time until close (20:00)
                const hoursLeft = 19 - currentHour;
                const minsLeft = 59 - currentMinute;
                const secsLeft = 59 - currentSecond;
                setTimeLeft(`${hoursLeft}h ${minsLeft}m ${secsLeft}s until close`);
            } else {
                // Calculate time until open (08:00)
                // If past 20:00, target is 08:00 next day
                // If before 08:00, target is 08:00 today
                let targetDate = new Date(watTime);
                targetDate.setMinutes(0);
                targetDate.setSeconds(0);

                if (currentHour >= 20) {
                    // Next day 8am
                    targetDate.setDate(targetDate.getDate() + 1);
                    targetDate.setHours(8);
                } else {
                    // Today 8am
                    targetDate.setHours(8);
                }

                const diff = targetDate.getTime() - watTime.getTime();
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setTimeLeft(`Opens in ${hours}h ${minutes}m ${seconds}s`);
            }

            setCurrentTime(now);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const marketHours = "8:00 AM to 8:00 PM (WAT)";

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-secondary rounded-lg border border-border">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded overflow-hidden shadow-sm flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                        <rect width="8" height="24" fill="#007A5E" />
                        <rect x="8" width="8" height="24" fill="#CE1126" />
                        <rect x="16" width="8" height="24" fill="#FCD116" />
                        <polygon points="12,8 13.5,12.5 18,13 14.5,16 15.5,20.5 12,18 8.5,20.5 9.5,16 6,13 10.5,12.5" fill="#FCD116" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                        Market Schedule
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Trading hours: {marketHours}</p>
                                    <p>Current Time: {currentTime.toLocaleTimeString('en-US', { timeZone: 'Africa/Douala' })} (WAT)</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{marketHours}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto p-2 bg-background/50 rounded-md border border-border/50">
                <Badge
                    variant={isMarketOpen ? "default" : "secondary"}
                    className={`${isMarketOpen ? "bg-green-600 hover:bg-green-700" : "bg-slate-600 hover:bg-slate-700"} px-3 py-1 transition-colors`}
                >
                    {isMarketOpen ? "Market Open" : "Market Closed"}
                </Badge>
                <span className="text-sm font-medium font-mono tabular-nums text-foreground/90 leading-none">
                    {timeLeft}
                </span>
            </div>
        </div>
    );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
    defaultValue: string;
    children: React.ReactNode;
    className?: string;
}

interface TabsListProps {
    children: React.ReactNode;
    className?: string;
}

interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

const TabsContext = React.createContext<{
    activeTab: string;
    setActiveTab: (value: string) => void;
}>({ activeTab: "", setActiveTab: () => { } });

export function MarketplaceTabs({ defaultValue, children, className }: TabsProps) {
    const [activeTab, setActiveTab] = React.useState(defaultValue);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({ children, className }: TabsListProps) {
    return (
        <ul className={cn("nav nav-tabs flex border-b border-border", className)} role="tablist">
            {children}
        </ul>
    );
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
    const { activeTab, setActiveTab } = React.useContext(TabsContext);
    const isActive = activeTab === value;

    return (
        <li className="nav-item">
            <button
                className={cn(
                    "px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                    isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                    className
                )}
                onClick={() => setActiveTab(value)}
                role="tab"
                aria-selected={isActive}
            >
                {children}
            </button>
        </li>
    );
}

export function TabsContent({ value, children, className }: TabsContentProps) {
    const { activeTab } = React.useContext(TabsContext);

    if (activeTab !== value) return null;

    return (
        <div className={cn("tab-pane fade show active py-6", className)} role="tabpanel">
            {children}
        </div>
    );
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

interface TableFiltersProps {
    onSearchChange: (value: string) => void;
}

export function TableFilters({ onSearchChange }: TableFiltersProps) {
    const [search, setSearch] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        onSearchChange(e.target.value);
    };

    return (
        <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search assets..."
                    value={search}
                    onChange={handleSearchChange}
                    className="pl-10"
                />
            </div>
            <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
            </Button>
        </div>
    );
}

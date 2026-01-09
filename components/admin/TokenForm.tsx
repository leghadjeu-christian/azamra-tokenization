"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    symbol: z.string().min(2, "Symbol must be at least 2 characters").toUpperCase(),
    description: z.string().min(10, "Description must be at least 10 characters"),
    assetClass: z.string().min(1, "Asset class is required"),
    price: z.coerce.number().positive("Price must be positive"),
    yield: z.coerce.number().min(0, "Yield cannot be negative"),
    totalSupply: z.coerce.number().int().positive("Total supply must be positive"),
    availableSupply: z.coerce.number().int().min(0, "Available supply cannot be negative"),
    minInvestment: z.coerce.number().positive("Minimum investment must be positive"),
    status: z.enum(["active", "pending", "sold-out", "archived"]),
    heroImage: z.string().optional(),
});

type TokenFormValues = z.infer<typeof formSchema>;

interface TokenFormProps {
    initialData?: any; // Token type from Prisma
    onSubmit: (data: TokenFormValues) => Promise<void>;
    isEditing?: boolean;
}

export function TokenForm({ initialData, onSubmit, isEditing = false }: TokenFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<TokenFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            symbol: "",
            description: "",
            assetClass: "Real Estate",
            price: 0,
            yield: 0,
            totalSupply: 0,
            availableSupply: 0,
            minInvestment: 0,
            status: "pending",
            heroImage: "/placeholder.svg",
        },
    });

    const handleSubmit = async (data: TokenFormValues) => {
        try {
            setLoading(true);
            await onSubmit(data);
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Token Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Douala Tower REIT" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="symbol"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Token Symbol</FormLabel>
                                <FormControl>
                                    <Input placeholder="DTREIT" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Detailed description of the asset..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="assetClass"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Asset Class</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select asset class" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Real Estate">Real Estate</SelectItem>
                                        <SelectItem value="Equity">Equity</SelectItem>
                                        <SelectItem value="Debt">Debt</SelectItem>
                                        <SelectItem value="Commodities">Commodities</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="sold-out">Sold Out</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price per Token (FCFA)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="yield"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Annual Yield (%)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="minInvestment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Min. Investment (FCFA)</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="totalSupply"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Supply</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="availableSupply"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Available Supply</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="heroImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="/placeholder.svg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? "Update Token" : "Create Token"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

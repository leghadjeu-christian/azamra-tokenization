"use client";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    mockWallet,
    mockTransactions,
    mockTokens,
    formatFcfa,
} from "@/lib/mock-data";
import {
    Wallet as WalletIcon,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    Minus,
    CreditCard,
    Smartphone,
    Bitcoin,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

export default function Wallet() {
    const tokenBalances = mockWallet.tokenBalances.map((tb) => ({
        ...tb,
        token: mockTokens.find((t) => t.id === tb.tokenId)!,
    }));

    const [amount, setAmount] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("mobile");

    const handleTransaction = (type: "deposit" | "withdraw") => {
        if (!amount || isNaN(Number(amount))) {
            toast.error("Please enter a valid amount");
            return;
        }

        // Mock processing
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Processing transaction...',
                success: `${type === 'deposit' ? 'Deposit' : 'Withdrawal'} of ${formatFcfa(Number(amount))} successful!`,
                error: 'Transaction failed',
            }
        );
        setAmount("");
    };

    return (
        <Layout>
            <div className="section bg-secondary min-h-screen">
                <div className="container-lg">
                    <h1 className="text-3xl font-bold mb-8">Wallet</h1>

                    {/* Balance Card */}
                    <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <WalletIcon className="w-6 h-6 text-primary" />
                            <span className="text-muted-foreground">FCFA Balance</span>
                        </div>
                        <p className="text-4xl font-bold mb-6">
                            {formatFcfa(mockWallet.balanceFcfa)}
                        </p>
                        <div className="flex gap-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="lg" className="w-full sm:w-auto">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Deposit
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Deposit Funds</DialogTitle>
                                        <DialogDescription>
                                            Add funds to your wallet using your preferred payment method.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Tabs defaultValue="mobile" onValueChange={setSelectedMethod} className="w-full mt-4">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
                                            <TabsTrigger value="card">Card</TabsTrigger>
                                            <TabsTrigger value="crypto">Crypto</TabsTrigger>
                                        </TabsList>

                                        <div className="py-4 space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="amount">Amount (FCFA)</Label>
                                                <Input
                                                    id="amount"
                                                    placeholder="50,000"
                                                    value={amount}
                                                    onChange={(e) => setAmount(e.target.value)}
                                                />
                                            </div>

                                            <TabsContent value="mobile" className="mt-0 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
                                                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold">MTN</div>
                                                        <span>MTN MoMo</span>
                                                    </Button>
                                                    <Button variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
                                                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">OM</div>
                                                        <span>Orange Money</span>
                                                    </Button>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="card" className="mt-0">
                                                <Button variant="outline" className="w-full h-16 justify-start px-6 gap-4">
                                                    <CreditCard className="w-6 h-6" />
                                                    <div className="text-left">
                                                        <div className="font-semibold">Visa / Mastercard</div>
                                                        <div className="text-xs text-muted-foreground">Instant deposit</div>
                                                    </div>
                                                </Button>
                                            </TabsContent>

                                            <TabsContent value="crypto" className="mt-0">
                                                <Button variant="outline" className="w-full h-16 justify-start px-6 gap-4">
                                                    <div className="w-6 h-6 text-orange-500">
                                                        {/* Metamask fox icon simulation */}
                                                        <svg viewBox="0 0 32 32" className="w-full h-full fill-current">
                                                            <path d="M26.46 21.03l.36-2.18-1.57-4.48-1-1.38-2.39-1.92-5.78 2.06-5.83-2.07-2.39 1.91-1 1.39-1.55 4.47.36 2.19L1.87 23.5l1.69 2.5 5.86 2.09 9.94-4.82 2.76 1.48-2.28 2-6.57 5.61-3.66-2.5 1.15-4.52-5.46-1.89L2.8 28.3l1.83 2h22.75l1.83-2-2.5-4.85-5.46 1.89 1.15 4.52-3.66 2.5-6.57-5.6-2.28-2 2.76-1.48 9.92 4.8 5.88-2.1 1.68-2.5-3.64-2.45z" />
                                                        </svg>
                                                    </div>
                                                    <div className="text-left">
                                                        <div className="font-semibold">MetaMask</div>
                                                        <div className="text-xs text-muted-foreground">Connect wallet</div>
                                                    </div>
                                                </Button>
                                            </TabsContent>
                                        </div>

                                        <Button className="w-full" onClick={() => handleTransaction('deposit')}>
                                            Proceed to Payment
                                        </Button>
                                    </Tabs>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        <Minus className="w-4 h-4 mr-2" />
                                        Withdraw
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Withdraw Funds</DialogTitle>
                                        <DialogDescription>
                                            Withdraw your balance to your preferred account.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="withdraw-amount">Amount (FCFA)</Label>
                                            <Input
                                                id="withdraw-amount"
                                                placeholder="50,000"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                        <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground">
                                            Available Balance: {formatFcfa(mockWallet.balanceFcfa)}
                                        </div>
                                        <Button className="w-full" onClick={() => handleTransaction('withdraw')}>
                                            Request Withdrawal
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Token Balances */}
                    <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm">
                        <h3 className="font-semibold mb-4 text-xl">Token Balances</h3>
                        <div className="space-y-3">
                            {tokenBalances.map(({ token, quantity }) => (
                                <div
                                    key={token.id}
                                    className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                                >
                                    <div>
                                        <p className="font-medium text-lg">{token.name}</p>
                                        <p className="text-sm text-muted-foreground font-mono">
                                            {token.symbol}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-lg">{quantity.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground font-mono">
                                            ≈ {formatFcfa(quantity * token.priceFcfa)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Transactions */}
                    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                        <h3 className="font-semibold mb-4 text-xl">Recent Transactions</h3>
                        <div className="space-y-0 divide-y divide-border">
                            {mockTransactions.slice(0, 5).map((tx) => (
                                <div
                                    key={tx.id}
                                    className="flex justify-between items-center p-4 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${tx.type === 'deposit' || tx.type === 'sell' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                                            {tx.type === "deposit" || tx.type === "sell" ? (
                                                <ArrowDownRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                                            ) : (
                                                <ArrowUpRight className="w-5 h-5 text-red-600 dark:text-red-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium capitalize">{tx.type === 'buy' ? 'Bought Token' : tx.type === 'sell' ? 'Sold Token' : tx.type}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {tx.tokenName || "Wallet Fund"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={`font-mono font-medium ${tx.type === "deposit" || tx.type === "sell"
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-foreground"
                                                }`}
                                        >
                                            {tx.type === "deposit" || tx.type === "sell" ? "+" : "-"}
                                            {formatFcfa(tx.amount)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

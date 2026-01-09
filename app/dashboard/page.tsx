"use client";

import { Layout } from "@/components/layout/Layout";
import { UserProfileHeader } from "@/components/dashboard/UserProfileHeader";
import { OnboardingCards } from "@/components/dashboard/OnboardingCards";
import { AllocationChart } from "@/components/dashboard/AllocationChart";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import {
    mockPortfolio,
    calculatePortfolioStats,
    getAssetAllocation,
    formatFcfa,
    formatPercent,
} from "@/lib/mock-data";
import { TrendingUp, Wallet, PiggyBank, BarChart3 } from "lucide-react";

export default function Dashboard() {
    const stats = calculatePortfolioStats();
    const allocation = getAssetAllocation();

    return (
        <Layout>
            <div className="section bg-secondary">
                <div className="container-lg">
                    {/* User Profile Header */}
                    <UserProfileHeader />

                    {/* Onboarding Cards */}
                    <div className="mt-6">
                        <OnboardingCards />
                    </div>

                    <h1 className="text-3xl font-bold my-8">Portfolio Dashboard</h1>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="dashboard-card">
                            <div className="flex items-center gap-3 mb-2">
                                <Wallet className="w-5 h-5 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    Total Value
                                </span>
                            </div>
                            <p className="dashboard-metric">{formatFcfa(stats.totalValue)}</p>
                        </div>
                        <div className="dashboard-card">
                            <div className="flex items-center gap-3 mb-2">
                                <PiggyBank className="w-5 h-5 text-primary" />
                                <span className="text-sm text-muted-foreground">Invested</span>
                            </div>
                            <p className="dashboard-metric">
                                {formatFcfa(stats.totalInvested)}
                            </p>
                        </div>
                        <div className="dashboard-card">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="w-5 h-5 text-success" />
                                <span className="text-sm text-muted-foreground">
                                    Total Gain
                                </span>
                            </div>
                            <p className="dashboard-metric text-success">
                                {formatPercent(stats.percentageGain)}
                            </p>
                        </div>
                        <div className="dashboard-card">
                            <div className="flex items-center gap-3 mb-2">
                                <BarChart3 className="w-5 h-5 text-primary" />
                                <span className="text-sm text-muted-foreground">
                                    Est. Yield
                                </span>
                            </div>
                            <p className="dashboard-metric">
                                {stats.estimatedYield.toFixed(1)}%
                            </p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="dashboard-card">
                            <h3 className="font-semibold mb-4">Performance</h3>
                            <PerformanceChart />
                        </div>
                        <div className="dashboard-card">
                            <h3 className="font-semibold mb-4">Asset Allocation</h3>
                            <AllocationChart data={allocation} />
                        </div>
                    </div>

                    {/* Portfolio Table */}
                    <div className="dashboard-card overflow-x-auto">
                        <h3 className="font-semibold mb-4">Holdings</h3>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Token</th>
                                    <th>Quantity</th>
                                    <th>Current Value</th>
                                    <th>Yield</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockPortfolio.map((item) => (
                                    <tr key={item.id}>
                                        <td className="font-medium">{item.token.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{formatFcfa(item.currentValue)}</td>
                                        <td className="text-success">{formatPercent(item.yield)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

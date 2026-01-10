"use client";

import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Building2,
    TrendingUp,
    Shield,
    Zap,
    Globe,
    BarChart3,
} from "lucide-react";
import { platformStats, formatNumber, mockTokens } from "@/lib/mock-data";
import { AssetCard } from "@/components/marketplace/AssetCard";
import heroImage from "@/assets/hero-cityscape.jpg";
import realEstateImg from "@/assets/asset-real-estate.png";
import equityImg from "@/assets/asset-equity.png";
import debtImg from "@/assets/asset-debt.png";
import commoditiesImg from "@/assets/asset-commodities.png";

const assetClasses = [
    {
        title: "Real Estate",
        description:
            "Fractional ownership in premium commercial and residential properties",
        icon: realEstateImg,
        color: "bg-primary/10",
    },
    {
        title: "Equity",
        description: "Tokenized shares in growth companies and venture funds",
        icon: equityImg,
        color: "bg-chart-2/10",
    },
    {
        title: "Debt",
        description: "Government and corporate bonds with stable fixed income",
        icon: debtImg,
        color: "bg-chart-3/10",
    },
    {
        title: "Commodities",
        description: "Gold, agricultural products, and natural resources",
        icon: commoditiesImg,
        color: "bg-chart-4/10",
    },
];

const benefits = [
    {
        title: "Accessible Investing",
        description:
            "Start investing from as low as 25,000 FCFA. No minimum account balance required.",
        icon: Globe,
    },
    {
        title: "24/7 Liquidity",
        description:
            "Trade your tokenized assets anytime. Instant settlement on blockchain.",
        icon: Zap,
    },
    {
        title: "Full Transparency",
        description:
            "All transactions and ownership records are immutably stored on-chain.",
        icon: Shield,
    },
    {
        title: "Professional Grade",
        description:
            "Institutional-quality assets curated by experienced fund managers.",
        icon: BarChart3,
    },
];

export default function Home() {
    const featuredTokens = mockTokens
        .filter((t) => t.status === "active")
        .slice(0, 3);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${heroImage.src})` }}
                />
                {/* Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to bottom, hsl(var(--hero-overlay) / 0.7) 0%, hsl(var(--hero-overlay) / 0.85) 100%)",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 container-lg text-center py-20">
                    <div className="animate-fade-in">
                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                            <div className="text-center">
                                <p className="text-4xl md:text-5xl font-bold text-white">
                                    {formatNumber(platformStats.totalTokenized)} FCFA
                                </p>
                                <p className="text-white/70 text-sm mt-1">Tokenized Assets</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl md:text-5xl font-bold text-white">
                                    {formatNumber(platformStats.totalInvestors)}+
                                </p>
                                <p className="text-white/70 text-sm mt-1">Investor Accounts</p>
                            </div>
                        </div>

                        <h1 className="hero-title mb-6">
                            Tokenize and Invest in
                            <br />
                            Real-World Assets
                        </h1>

                        <p className="hero-subtitle">
                            Access institutional-grade investments in real estate, equities,
                            bonds, and commodities. Start building your wealth with
                            fractional ownership powered by blockchain technology.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="text-base px-8" asChild>
                                <Link href="/sign-up">
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-base px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
                                asChild
                            >
                                <Link href="/sign-in">Sign In</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-white/50 rounded-full" />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section bg-background">
                <div className="container-lg">
                    <div className="section-header">
                        <p className="text-primary font-semibold mb-2">
                            About Our Platform
                        </p>
                        <h2 className="section-title">
                            From Traditional Finance to Digital Assets
                        </h2>
                        <p className="section-subtitle">
                            We bridge the gap between institutional-grade investments and
                            everyday investors, making previously inaccessible assets
                            available to everyone in Central Africa.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                        <div className="stat-card text-center">
                            <p className="stat-value text-primary">
                                {platformStats.totalAssets}+
                            </p>
                            <p className="stat-label">Tokenized Assets</p>
                        </div>
                        <div className="stat-card text-center">
                            <p className="stat-value text-primary">
                                {formatNumber(platformStats.totalInvestors)}
                            </p>
                            <p className="stat-label">Active Investors</p>
                        </div>
                        <div className="stat-card text-center">
                            <p className="stat-value text-primary">
                                {platformStats.avgYield}%
                            </p>
                            <p className="stat-label">Avg. Annual Yield</p>
                        </div>
                        <div className="stat-card text-center">
                            <p className="stat-value text-primary">100%</p>
                            <p className="stat-label">Asset-Backed</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Asset Classes */}
            <section className="section bg-secondary">
                <div className="container-lg">
                    <div className="section-header">
                        <p className="text-primary font-semibold mb-2">
                            Diverse Investment Options
                        </p>
                        <h2 className="section-title">Asset Classes</h2>
                        <p className="section-subtitle">
                            Build a diversified portfolio with access to multiple asset
                            classes, all tokenized for maximum liquidity and transparency.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {assetClasses.map((asset, index) => (
                            <div
                                key={asset.title}
                                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div
                                    className={`w-16 h-16 rounded-xl ${asset.color} flex items-center justify-center mb-4`}
                                >
                                    <img
                                        src={asset.icon.src}
                                        alt={asset.title}
                                        className="w-10 h-10 object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {asset.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {asset.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Benefits */}
            <section className="section bg-secondary">
                <div className="container-lg">
                    <div className="section-header">
                        <p className="text-primary font-semibold mb-2">Why Choose Us</p>
                        <h2 className="section-title">
                            Benefits of Tokenized Investments
                        </h2>
                        <p className="section-subtitle">
                            Experience the future of investing with blockchain-powered
                            security, transparency, and accessibility.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit.title}
                                className="bg-card rounded-xl p-6 border border-border flex gap-4 hover:shadow-md transition-shadow animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <benefit.icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-1">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-primary text-primary-foreground">
                <div className="container-md text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Start Investing?
                    </h2>
                    <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of investors who are building wealth through
                        tokenized real-world assets. Create your account today and start
                        with as little as 25,000 FCFA.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="text-base px-8"
                            asChild
                        >
                            <Link href="/sign-up">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                            asChild
                        >
                            <Link href="/sign-in">Sign In</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

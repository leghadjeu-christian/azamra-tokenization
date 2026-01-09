"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BadgeCheck, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

type CardStatus = "not-completed" | "in-progress" | "completed";

interface OnboardingCard {
    id: string;
    title: string;
    description: string;
    status: CardStatus;
    href: string;
    icon: typeof User;
}

const onboardingSteps: OnboardingCard[] = [
    {
        id: "identity",
        title: "Verify Your Identity",
        description: "Complete KYC verification",
        status: "not-completed",
        href: "/profile/verification",
        icon: User,
    },
    {
        id: "investment-profile",
        title: "Complete Investment Profile",
        description: "Set your investment goals",
        status: "not-completed",
        href: "/profile/investment-profile",
        icon: BadgeCheck,
    },
    {
        id: "qualification",
        title: "Qualification",
        description: "Verify investor status",
        status: "not-completed",
        href: "/profile/qualification",
        icon: Shield,
    },
];

export function OnboardingCards() {
    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Complete your account</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {onboardingSteps.map((step) => (
                    <Link
                        key={step.id}
                        href={step.href}
                        className="group"
                    >
                        <Card className="border-border hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <step.icon className="h-5 w-5 text-muted-foreground" />
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                                <p
                                    className={cn(
                                        "text-sm",
                                        step.status === "completed"
                                            ? "text-success"
                                            : step.status === "in-progress"
                                                ? "text-warning"
                                                : "text-muted-foreground"
                                    )}
                                >
                                    {step.status === "completed"
                                        ? "Completed"
                                        : step.status === "in-progress"
                                            ? "In Progress"
                                            : "Not Completed"}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

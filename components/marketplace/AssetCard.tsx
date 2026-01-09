"use client";

import Link from 'next/link';
import { Token, formatFcfa, formatPercent } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import realEstateImg from '@/assets/asset-real-estate.png';
import equityImg from '@/assets/asset-equity.png';
import debtImg from '@/assets/asset-debt.png';
import commoditiesImg from '@/assets/asset-commodities.png';

interface AssetCardProps {
  token: Token;
}

const assetImages: Record<string, any> = {
  'Real Estate': realEstateImg,
  'Equity': equityImg,
  'Debt': debtImg,
  'Commodities': commoditiesImg,
};

const statusColors: Record<string, string> = {
  active: 'bg-success/10 text-success border-success/20',
  sold_out: 'bg-muted text-muted-foreground border-muted',
  coming_soon: 'bg-warning/10 text-warning border-warning/20',
};

const statusLabels: Record<string, string> = {
  active: 'Available',
  sold_out: 'Sold Out',
  coming_soon: 'Coming Soon',
};

export const AssetCard = ({ token }: AssetCardProps) => {
  const supplyPercentage = ((token.totalSupply - token.availableSupply) / token.totalSupply) * 100;

  return (
    <div className="asset-card group">
      {/* Image */}
      <div className="asset-card-image bg-gradient-to-br from-secondary to-accent">
        <img
          src={(assetImages[token.assetClass] || realEstateImg).src}
          alt={token.name}
          className="w-24 h-24 object-contain opacity-80 group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="asset-card-content">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs font-medium">
            {token.assetClass}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs font-medium ${statusColors[token.status]}`}
          >
            {statusLabels[token.status]}
          </Badge>
        </div>

        <h3 className="asset-card-title">{token.name}</h3>
        <p className="text-xs text-muted-foreground mb-1">{token.symbol}</p>
        <p className="asset-card-description">{token.description}</p>

        {/* Metrics */}
        <div className="asset-card-metrics">
          <div className="asset-metric">
            <p className="asset-metric-value">{formatFcfa(token.priceFcfa)}</p>
            <p className="asset-metric-label">Per Token</p>
          </div>
          <div className="asset-metric">
            <p className="asset-metric-value flex items-center justify-center text-success">
              <TrendingUp className="w-4 h-4 mr-1" />
              {formatPercent(token.yieldPercentage)}
            </p>
            <p className="asset-metric-label">Est. Yield</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Supply Sold</span>
            <span>{supplyPercentage.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${supplyPercentage}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <Button
          className="w-full mt-4"
          variant={token.status === 'active' ? 'default' : 'secondary'}
          disabled={token.status !== 'active'}
          asChild={token.status === 'active'}
        >
          {token.status === 'active' ? (
            <Link href={`/marketplace/${token.id}`}>
              View Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <span>
              {token.status === 'sold_out' ? 'Sold Out' : 'Coming Soon'}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

// Mock Data for RWA Tokenisation Platform
// All values in FCFA (XAF)

export interface Token {
  id: string;
  name: string;
  symbol: string;
  description: string;
  issuer: string;
  assetClass: 'Real Estate' | 'Equity' | 'Debt' | 'Commodities';
  totalSupply: number;
  availableSupply: number;
  priceFcfa: number;
  yieldPercentage: number;
  status: 'active' | 'sold_out' | 'coming_soon';
  imageUrl: string;
  minInvestment: number;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  tokenId: string;
  token: Token;
  quantity: number;
  purchasePrice: number;
  currentValue: number;
  yield: number;
  purchaseDate: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'deposit' | 'withdraw';
  tokenId?: string;
  tokenName?: string;
  quantity?: number;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
}

export interface Wallet {
  balanceFcfa: number;
  tokenBalances: { tokenId: string; quantity: number }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

// Format FCFA currency
export const formatFcfa = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format percentage
export const formatPercent = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

// Format large numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`;
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Mock Tokens
export const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Douala Tower REIT',
    symbol: 'DTREIT',
    description: 'Fractional ownership in the premium Douala Tower commercial complex. Prime location in the business district with high-quality tenants and stable rental income.',
    issuer: 'Cameroon Real Estate Trust',
    assetClass: 'Real Estate',
    totalSupply: 100000,
    availableSupply: 35000,
    priceFcfa: 50000,
    yieldPercentage: 8.5,
    status: 'active',
    imageUrl: '/placeholder.svg',
    minInvestment: 100000,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'CEMAC Treasury Bond',
    symbol: 'CTBOND',
    description: 'Government-backed treasury bonds from CEMAC region countries. Low-risk fixed income with guaranteed returns.',
    issuer: 'CEMAC Central Bank',
    assetClass: 'Debt',
    totalSupply: 500000,
    availableSupply: 200000,
    priceFcfa: 10000,
    yieldPercentage: 5.2,
    status: 'active',
    imageUrl: '/placeholder.svg',
    minInvestment: 50000,
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    name: 'AfriTech Ventures Fund',
    symbol: 'ATVF',
    description: 'Tokenized equity in a diversified portfolio of leading African technology startups. High growth potential with technology sector exposure.',
    issuer: 'AfriTech Capital',
    assetClass: 'Equity',
    totalSupply: 50000,
    availableSupply: 12000,
    priceFcfa: 100000,
    yieldPercentage: 12.8,
    status: 'active',
    imageUrl: '/placeholder.svg',
    minInvestment: 200000,
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Gold Standard Token',
    symbol: 'GSTK',
    description: 'Each token represents 1 gram of investment-grade gold stored in secure vaults in Switzerland. Physical gold backing with full liquidity.',
    issuer: 'African Commodity Exchange',
    assetClass: 'Commodities',
    totalSupply: 200000,
    availableSupply: 85000,
    priceFcfa: 45000,
    yieldPercentage: 3.2,
    status: 'active',
    imageUrl: '/placeholder.svg',
    minInvestment: 45000,
    createdAt: '2024-04-05',
  },
  {
    id: '5',
    name: 'Yaoundé Commercial Hub',
    symbol: 'YCHHUB',
    description: 'Investment in a new mixed-use commercial development in central Yaoundé. Combining retail, office, and residential spaces.',
    issuer: 'Urban Development Partners',
    assetClass: 'Real Estate',
    totalSupply: 75000,
    availableSupply: 0,
    priceFcfa: 75000,
    yieldPercentage: 9.1,
    status: 'sold_out',
    imageUrl: '/placeholder.svg',
    minInvestment: 150000,
    createdAt: '2024-05-20',
  },
  {
    id: '6',
    name: 'AgriCommodities Fund',
    symbol: 'AGCF',
    description: 'Diversified exposure to Central African agricultural commodities including cocoa, coffee, and cotton futures.',
    issuer: 'AgriInvest Africa',
    assetClass: 'Commodities',
    totalSupply: 100000,
    availableSupply: 100000,
    priceFcfa: 25000,
    yieldPercentage: 7.5,
    status: 'coming_soon',
    imageUrl: '/placeholder.svg',
    minInvestment: 75000,
    createdAt: '2025-01-15',
  },
];

// Mock Portfolio
export const mockPortfolio: PortfolioItem[] = [
  {
    id: '1',
    tokenId: '1',
    token: mockTokens[0],
    quantity: 20,
    purchasePrice: 48000,
    currentValue: 50000 * 20,
    yield: 8.5,
    purchaseDate: '2024-06-15',
  },
  {
    id: '2',
    tokenId: '2',
    token: mockTokens[1],
    quantity: 50,
    purchasePrice: 9800,
    currentValue: 10000 * 50,
    yield: 5.2,
    purchaseDate: '2024-07-01',
  },
  {
    id: '3',
    tokenId: '3',
    token: mockTokens[2],
    quantity: 5,
    purchasePrice: 95000,
    currentValue: 100000 * 5,
    yield: 12.8,
    purchaseDate: '2024-08-10',
  },
  {
    id: '4',
    tokenId: '4',
    token: mockTokens[3],
    quantity: 30,
    purchasePrice: 42000,
    currentValue: 45000 * 30,
    yield: 3.2,
    purchaseDate: '2024-09-05',
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 5000000,
    status: 'completed',
    createdAt: '2024-06-01',
  },
  {
    id: '2',
    type: 'buy',
    tokenId: '1',
    tokenName: 'Douala Tower REIT',
    quantity: 20,
    amount: 960000,
    status: 'completed',
    createdAt: '2024-06-15',
  },
  {
    id: '3',
    type: 'buy',
    tokenId: '2',
    tokenName: 'CEMAC Treasury Bond',
    quantity: 50,
    amount: 490000,
    status: 'completed',
    createdAt: '2024-07-01',
  },
  {
    id: '4',
    type: 'buy',
    tokenId: '3',
    tokenName: 'AfriTech Ventures Fund',
    quantity: 5,
    amount: 475000,
    status: 'completed',
    createdAt: '2024-08-10',
  },
  {
    id: '5',
    type: 'deposit',
    amount: 2000000,
    status: 'completed',
    createdAt: '2024-09-01',
  },
  {
    id: '6',
    type: 'buy',
    tokenId: '4',
    tokenName: 'Gold Standard Token',
    quantity: 30,
    amount: 1260000,
    status: 'completed',
    createdAt: '2024-09-05',
  },
];

// Mock Wallet
export const mockWallet: Wallet = {
  balanceFcfa: 3815000,
  tokenBalances: [
    { tokenId: '1', quantity: 20 },
    { tokenId: '2', quantity: 50 },
    { tokenId: '3', quantity: 5 },
    { tokenId: '4', quantity: 30 },
  ],
};

// Calculate portfolio stats
export const calculatePortfolioStats = () => {
  const totalValue = mockPortfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalInvested = mockPortfolio.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0);
  const totalGain = totalValue - totalInvested;
  const percentageGain = (totalGain / totalInvested) * 100;
  
  const weightedYield = mockPortfolio.reduce((sum, item) => {
    const weight = item.currentValue / totalValue;
    return sum + (item.yield * weight);
  }, 0);

  return {
    totalValue,
    totalInvested,
    totalGain,
    percentageGain,
    estimatedYield: weightedYield,
  };
};

// Asset allocation data for charts
export const getAssetAllocation = () => {
  const allocation: Record<string, number> = {};
  
  mockPortfolio.forEach(item => {
    const assetClass = item.token.assetClass;
    allocation[assetClass] = (allocation[assetClass] || 0) + item.currentValue;
  });

  return Object.entries(allocation).map(([name, value]) => ({
    name,
    value,
    percentage: (value / calculatePortfolioStats().totalValue) * 100,
  }));
};

// Platform stats for landing page
export const platformStats = {
  totalTokenized: 4500000000, // 4.5B FCFA
  totalInvestors: 12500,
  totalAssets: 24,
  avgYield: 7.8,
};

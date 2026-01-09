
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const mockTokens = [
    {
        name: 'Douala Tower REIT',
        symbol: 'DTREIT',
        description: 'Fractional ownership in the premium Douala Tower commercial complex. Prime location in the business district with high-quality tenants and stable rental income.',
        assetClass: 'Real Estate',
        totalSupply: 100000,
        availableSupply: 35000,
        price: 50000,
        yield: 8.5,
        status: 'active',
        heroImage: '/placeholder.svg',
        minInvestment: 100000,
    },
    {
        name: 'CEMAC Treasury Bond',
        symbol: 'CTBOND',
        description: 'Government-backed treasury bonds from CEMAC region countries. Low-risk fixed income with guaranteed returns.',
        assetClass: 'Debt',
        totalSupply: 500000,
        availableSupply: 200000,
        price: 10000,
        yield: 5.2,
        status: 'active',
        heroImage: '/placeholder.svg',
        minInvestment: 50000,
    },
    {
        name: 'AfriTech Ventures Fund',
        symbol: 'ATVF',
        description: 'Tokenized equity in a diversified portfolio of leading African technology startups. High growth potential with technology sector exposure.',
        assetClass: 'Equity',
        totalSupply: 50000,
        availableSupply: 12000,
        price: 100000,
        yield: 12.8,
        status: 'active',
        heroImage: '/placeholder.svg',
        minInvestment: 200000,
    },
    {
        name: 'Gold Standard Token',
        symbol: 'GSTK',
        description: 'Each token represents 1 gram of investment-grade gold stored in secure vaults in Switzerland. Physical gold backing with full liquidity.',
        assetClass: 'Commodities',
        totalSupply: 200000,
        availableSupply: 85000,
        price: 45000,
        yield: 3.2,
        status: 'active',
        heroImage: '/placeholder.svg',
        minInvestment: 45000,
    },
    {
        name: 'Yaoundé Commercial Hub',
        symbol: 'YCHHUB',
        description: 'Investment in a new mixed-use commercial development in central Yaoundé. Combining retail, office, and residential spaces.',
        assetClass: 'Real Estate',
        totalSupply: 75000,
        availableSupply: 0,
        price: 75000,
        yield: 9.1,
        status: 'sold_out',
        heroImage: '/placeholder.svg',
        minInvestment: 150000,
    },
    {
        name: 'AgriCommodities Fund',
        symbol: 'AGCF',
        description: 'Diversified exposure to Central African agricultural commodities including cocoa, coffee, and cotton futures.',
        assetClass: 'Commodities',
        totalSupply: 100000,
        availableSupply: 100000,
        price: 25000,
        yield: 7.5,
        status: 'coming_soon',
        heroImage: '/placeholder.svg',
        minInvestment: 75000,
    },
]

async function main() {
    console.log('Start seeding ...')

    // Clear existing tokens to avoid duplicates if re-running (optional, but safer for dev)
    // await prisma.token.deleteMany() 

    for (const token of mockTokens) {
        const existingToken = await prisma.token.findUnique({
            where: { symbol: token.symbol }
        })

        if (!existingToken) {
            const createdToken = await prisma.token.create({
                data: token,
            })
            console.log(`Created token with id: ${createdToken.id}`)
        } else {
            console.log(`Token ${token.symbol} already exists, skipping.`)
        }
    }
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

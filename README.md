# Azamra T Platform

## Project Description

The **Azamra T Platform** is a Minimum Viable Product (MVP) designed to demonstrate the tokenization of real-world assets. It provides a web interface for managing and showcasing various asset-backed tokens, allowing users to view available tokens in a marketplace and manage their personal portfolios. The platform includes administrative functionalities for creating and managing tokens, ensuring a controlled environment for asset representation.

## Features (MVP)

*   **User Authentication**: Secure user registration and login powered by Clerk.
*   **Admin Panel**: Dedicated section for administrators to create, view, edit, and manage asset tokens.
*   **Token Management**: Creation of asset tokens, including details like name, symbol, description, asset class, price, yield, supply, and minimum investment.
*   **Public Marketplace**: A browsable list of active asset tokens available to all users.
*   **Asset Detail Pages**: Individual pages for each token displaying comprehensive information.
*   **User Dashboard/Portfolio**: A personalized view for authenticated users to see their owned tokens and portfolio allocation.
*   **Responsive Design**: Built with modern web technologies for a seamless experience across devices.

## Setup Instructions

To get the **Azamra T Platform** up and running on your local machine, follow these steps:

### Prerequisites

*   **Node.js / Bun**: Ensure you have Node.js (v18 or higher) or Bun installed.
*   **PostgreSQL**: A running PostgreSQL database instance is required.

### 1. Clone the Repository

```bash
git clone https://github.com/leghadjeu-christian/azamra-tokenization.git
cd azamra-tokenization
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 3. Environment Variables

Create a `.env` file in the root of the project based on the `.env.example` file:

```bash
cp .env.example .env
```

Edit the `.env` file and replace the placeholder values with your actual credentials:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
DATABASE_URL="postgresql://user:password@host:5432/databasename?sslmode=require"
DIRECT_URL="postgresql://user:password@host:5432/databasename?sslmode=require"
```

*   **Clerk Keys**: Obtain your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` from your Clerk dashboard.
*   **Database URLs**: Configure `DATABASE_URL` and `DIRECT_URL` to point to your PostgreSQL database. `DIRECT_URL` is used by Prisma for migrations.

### 4. Database Setup

Apply Prisma migrations to set up your database schema:

```bash
npm prisma migrate dev --name init
```

Seed the database with initial data (optional, but recommended for demo):

```bash
npm run db:seed
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will be accessible at `http://localhost:3001`.


## Demo Procedures

1.  **Start the Application**: Ensure the application is running locally (`npm run dev`).
2.  **Access the Marketplace**: Navigate to `http://localhost:3001/marketplace` to view active tokens without logging in.
3.  **User Registration/Login**:
    *   Go to `http://localhost:3001/sign-up` to create a new user account.
    *   Alternatively, go to `http://localhost:3001/sign-in` to log in with an existing account.
4.  **Admin Token Creation**:
    *   After logging in, ensure your user account has admin privileges (this typically involves setting a role in your Clerk dashboard or a custom database field).
    *   Navigate to `http://localhost:3001/admin/tokens/new` to create a new asset token. Fill in the details and submit.
5.  **View User Dashboard**: Once logged in, navigate to `http://localhost:3001/dashboard` to see your personalized portfolio and other user-specific information.
6.  **View Token Details**: Click on any token in the marketplace or dashboard to view its detailed information.

## Project Limitations (MVP Scope)

*   **No Blockchain Integration**: This MVP does not include actual blockchain integration for token issuance or transfer. Tokenization is simulated within the application's database.
*   **Simplified Ownership**: Token ownership is managed purely within the application's database (`UserPortfolio` model) and does not represent actual on-chain asset ownership.
*   **Basic Authorization**: Admin access for token creation is based on a simple check (e.g., `requireAdmin` function). A more robust role-based access control (RBAC) system would be needed for production.
*   **No Trading Functionality**: The platform currently lacks features for buying, selling, or exchanging tokens.
*   **Limited Asset Classes**: While `assetClass` is a field, the current UI and logic might not fully differentiate or provide specific functionalities for each asset class beyond display.
*   **Scalability**: While Next.js and Prisma provide a good foundation, the current implementation might require further optimization for high-traffic production environments.

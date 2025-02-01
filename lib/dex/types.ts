export interface Token {
  address: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI?: string;
}

export interface Quote {
  protocol: string;
  inputAmount: string;
  outputAmount: string;
  gasEstimate: string;
  priceImpact: string;
}

export interface Pool {
  protocol: string;
  pair: string;
  liquidity: string;
  volume24h: string;
  fee: string;
}

export interface ArbitrageOpportunity {
  buyDex: string;
  sellDex: string;
  tokenPair: string;
  profitUSD: string;
  confidence: number;
  executionSteps: string[];
}
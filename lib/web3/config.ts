import { ethers } from 'ethers';

// API Keys
export const ALCHEMY_API_KEY = 'vZ9oK8UGiqGM0Trx49e80MVkiW2yI0Mn';
export const INFURA_API_KEY = '3f1d4ff533174d399f6f92e5c8e240dc';

export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  POLYGON: 137,
  // Add more chains as needed
};

export const RPC_URLS = {
  [SUPPORTED_CHAINS.ETHEREUM]: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
  [SUPPORTED_CHAINS.POLYGON]: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
};

export const getProvider = (chainId: number) => {
  const url = RPC_URLS[chainId];
  if (!url) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  return new ethers.providers.JsonRpcProvider(url);
};

// Initialize default provider
export const defaultProvider = getProvider(SUPPORTED_CHAINS.ETHEREUM);
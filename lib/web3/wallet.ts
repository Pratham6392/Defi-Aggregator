import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('Please install MetaMask to use this application');
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    return {
      provider,
      signer,
      address,
    };
  } catch (error) {
    console.error('Error connecting wallet:', error);
    throw error;
  }
};

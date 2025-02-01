import React, { useState } from 'react';
import { ethers } from 'ethers';
import { connectWallet } from '@/lib/web3/wallet';
import { set } from 'date-fns';
import { getWethContract, getUniContract } from '@/lib/dex/alphaRouter';

const WalletConnector: React.FC = () => {
  const [ wethContract, setWethContract] = useState<ethers.Contract | null>(null);
  const [uniContract, setUniContract] = useState<ethers.Contract | null>(null);
  const [wethAddress, setWethAddress] = useState<string | null>(null);
  const [uniAddress, setUniAddress] = useState<string | null>(null);
  const [wethAmount, setWethAmount] = useState<number | null>(null);
  const [uniAmount, setUniAmount] = useState<number | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnectWallet = async () => {
    try {
      const { provider, signer, address } = await connectWallet();
      setWalletAddress(address);

      // Example: Fetch and set contract data (modify these functions as needed)
      const wethContract = getWethContract();
      setWethContract(wethContract);
      
      const uniContract = getUniContract();
        setUniContract(uniContract);

      

      wethContract.balanceOf(address)
      .then((res :any) => {
        setWethAmount( Number(ethers.utils.formatEther(res)) )
      })
    uniContract.balanceOf(address)
      .then((res:any) => {
        setUniAmount( Number(ethers.utils.formatEther(res)) )
      })
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleConnectWallet}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Connect Wallet
      </button>
      {walletAddress && <p>Connected Address: {walletAddress}</p>}
      {wethAmount !== null && <p>WETH Balance: {wethAmount}</p>}
      {uniAmount !== null && <p>UNI Balance: {uniAmount}</p>}
    </div>
  );
};

export default WalletConnector;

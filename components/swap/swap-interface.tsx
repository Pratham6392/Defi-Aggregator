"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownUp } from "lucide-react"
import { connectWallet } from '@/lib/web3/wallet'
import { Component } from 'lucide-react'
import  ConfigModal  from './ConfigModal'

export function SwapInterface() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const[slippage, setSlippage] = useState(2)
  const[showModal, setShowModal] = useState(false)
  const[deadlineMinutes, setDeadlineMinutes] = useState(10)
  const[slippageAmount, setSlippageAmount] = useState(1)

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const { address } = await connectWallet()
      setWalletAddress(address)
    } catch (error) {
      console.error(error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!walletAddress ? (
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          ) : ( 
            <>
            <div className="space-y-2">
              <Input placeholder="0.0" type="number" />
              <select className="w-full rounded-md border p-2">
                <option>ETH</option>
                <option>USDC</option>
                <option>WBTC</option>
              </select>
            </div>
            <div className="flex justify-center">
              {/* <Button variant="ghost" size="icon">  
              </Button> */}
              <Component  className="h-4 w-4" onClick={() => setShowModal(true)} />
              {showModal && (
              <ConfigModal
                onClose={() => setShowModal(false)}
                setDeadlineMinutes={setDeadlineMinutes}
                deadlineMinutes={deadlineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount} />
            )}
            </div>
            <div className="space-y-2">
              <Input placeholder="0.0" type="number" disabled />
              <select className="w-full rounded-md border p-2">
                <option>USDC</option>
                <option>ETH</option>
                <option>WBTC</option>
              </select>
            </div>
            <Button className="w-full">Swap</Button>
          </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
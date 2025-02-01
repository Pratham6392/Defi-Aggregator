"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const opportunities = [
  {
    pair: "ETH/USDC",
    buyDex: "Uniswap",
    sellDex: "SushiSwap",
    profit: "$12.45",
    confidence: "High"
  },
  {
    pair: "WBTC/ETH",
    buyDex: "Curve",
    sellDex: "Uniswap",
    profit: "$8.32",
    confidence: "Medium"
  }
]

export function ArbitrageTable() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Arbitrage Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pair</TableHead>
              <TableHead>Buy On</TableHead>
              <TableHead>Sell On</TableHead>
              <TableHead>Profit</TableHead>
              <TableHead>Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opportunities.map((opp, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{opp.pair}</TableCell>
                <TableCell>{opp.buyDex}</TableCell>
                <TableCell>{opp.sellDex}</TableCell>
                <TableCell className="text-green-500">{opp.profit}</TableCell>
                <TableCell>{opp.confidence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
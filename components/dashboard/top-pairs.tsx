"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const topPairs = [
  {
    id: 1,
    pair: "ETH/USDT",
    volume: "$1.2M",
    change: "+2.5%"
  },
  // Add more mock data
]

export function TopPairs() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Trading Pairs</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {topPairs.map((pair) => (
              <div
                key={pair.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <p className="font-medium">{pair.pair}</p>
                <div className="text-right">
                  <p className="font-medium">{pair.volume}</p>
                  <p className={`text-sm ${
                    pair.change.startsWith("+") ? "text-green-500" : "text-red-500"
                  }`}>
                    {pair.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
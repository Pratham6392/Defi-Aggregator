"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const recentTrades = [
  {
    id: 1,
    pair: "ETH/USDT",
    amount: "1.5 ETH",
    price: "$2,850.20",
    type: "buy",
    time: "2 mins ago"
  },
  // Add more mock data
]

export function RecentTrades() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Trades</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {recentTrades.map((trade) => (
              <div
                key={trade.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">{trade.pair}</p>
                  <p className="text-sm text-muted-foreground">{trade.time}</p>
                </div>
                <div className="text-right">
                  <p className={trade.type === "buy" ? "text-green-500" : "text-red-500"}>
                    {trade.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">{trade.price}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
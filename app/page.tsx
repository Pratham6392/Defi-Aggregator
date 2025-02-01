import { DashboardShell } from "@/components/dashboard/shell"
import { Overview } from "@/components/dashboard/overview"
import { TopPairs } from "@/components/dashboard/top-pairs"
import { RecentTrades } from "@/components/dashboard/recent-trades"
import { SwapInterface } from "@/components/swap/swap-interface"
import { ArbitrageTable } from "@/components/arbitrage/arbitrage-table"

export default function Home() {
  return (
    <DashboardShell>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview />
        <TopPairs />
        <RecentTrades />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <SwapInterface />
        <ArbitrageTable />
      </div>
    </DashboardShell>
  )
}
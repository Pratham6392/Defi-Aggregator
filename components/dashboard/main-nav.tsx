"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, LineChart, Settings } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <LineChart className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          DeFi Aggregator
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Overview
        </Link>
        <Link
          href="/analytics"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/analytics" ? "text-foreground" : "text-foreground/60"
          )}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Analytics</span>
        </Link>
        <Link
          href="/settings"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/settings" ? "text-foreground" : "text-foreground/60"
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  )
}
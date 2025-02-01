"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useMemo } from "react"

const data = [
  { time: "00:00", volume: 4000 },
  { time: "04:00", volume: 3000 },
  { time: "08:00", volume: 2000 },
  { time: "12:00", volume: 2780 },
  { time: "16:00", volume: 1890 },
  { time: "20:00", volume: 2390 },
]

type TooltipProps = {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null
  
  return (
    <div className="bg-background border border-border rounded-lg p-2 shadow-sm">
      <p className="text-sm text-foreground">{`Time: ${label}`}</p>
      <p className="text-sm font-semibold text-primary">
        {`Volume: $${payload[0].value.toLocaleString()}`}
      </p>
    </div>
  )
}

export function Overview() {
  const chartConfig = useMemo(() => ({
    xAxis: {
      dataKey: "time",
      axisLine: false,
      tickLine: false,
      padding: { left: 10, right: 10 },
      tick: { fill: 'hsl(var(--muted-foreground))' },
      height: 30,
      interval: "preserveStartEnd",
    },
    yAxis: {
      axisLine: false,
      tickLine: false,
      width: 80,
      tick: { fill: 'hsl(var(--muted-foreground))' },
      tickFormatter: (value: number) => `$${value.toLocaleString()}`,
    },
    line: {
      type: "monotone" as const,
      dataKey: "volume",
      stroke: "hsl(var(--primary))",
      strokeWidth: 2,
      dot: false,
      activeDot: {
        r: 4,
        fill: 'hsl(var(--primary))',
        strokeWidth: 2,
      },
    },
  }), [])

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Trading Volume (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis 
                {...chartConfig.xAxis}
                allowDataOverflow={false}
                scale="auto"
                padding={{ left: 10, right: 10 }}
                minTickGap={5}
                orientation="bottom"
                tickMargin={10}
              />
              <YAxis 
                {...chartConfig.yAxis}
                allowDataOverflow={false}
                scale="auto"
                domain={['auto', 'auto']}
                orientation="left"
                tickMargin={10}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: 'hsl(var(--muted))' }}
                isAnimationActive={false}
              />
              <Line {...chartConfig.line} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
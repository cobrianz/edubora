import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StatsCard({ title, value, change, trend, icon: Icon, color = "blue" }) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    yellow: "text-yellow-600 bg-yellow-100",
    purple: "text-purple-600 bg-purple-100",
    red: "text-red-600 bg-red-100",
  }

  const trendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus,
  }

  const TrendIcon = trendIcon[trend] ?? Minus // fallback to a neutral icon

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("p-2 rounded-full", colorClasses[color])}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <TrendIcon
            className={cn(
              "mr-1 h-3 w-3",
              trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600",
            )}
          />
          <span className={cn(trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600")}>
            {change}
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, User, CreditCard, BookOpen, Settings } from "lucide-react"

export default function RecentActivity({ activities = [] }) {
  const defaultActivities = [
    {
      type: "student",
      message: "New student registration completed",
      time: "2 hours ago",
    },
    {
      type: "payment",
      message: "Fee payment received",
      time: "4 hours ago",
    },
    {
      type: "system",
      message: "System backup completed",
      time: "1 day ago",
    },
  ]

  const displayActivities = activities.length > 0 ? activities : defaultActivities

  const getIcon = (type) => {
    switch (type) {
      case "student":
        return <User className="h-4 w-4" />
      case "payment":
        return <CreditCard className="h-4 w-4" />
      case "teacher":
        return <BookOpen className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getVariant = (type) => {
    switch (type) {
      case "student":
        return "default"
      case "payment":
        return "secondary"
      case "teacher":
        return "outline"
      case "system":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest updates and changes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayActivities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Badge variant={getVariant(activity.type)} className="p-1">
                {getIcon(activity.type)}
              </Badge>
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

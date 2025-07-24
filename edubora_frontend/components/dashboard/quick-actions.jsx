"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ArrowRight } from "lucide-react"

export default function QuickActions({ actions = [] }) {
  const defaultActions = [
    {
      title: "Add Student",
      description: "Register a new student",
      href: "/dashboard/admin/students",
    },
    {
      title: "Create Class",
      description: "Set up a new class",
      href: "/dashboard/admin/academic",
    },
    {
      title: "Generate Report",
      description: "Create academic reports",
      href: "/dashboard/admin/reports",
    },
  ]

  const displayActions = actions.length > 0 ? actions : defaultActions

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayActions.map((action, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => (window.location.href = action.href)}
          >
            <div className="space-y-1">
              <p className="font-medium text-sm">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

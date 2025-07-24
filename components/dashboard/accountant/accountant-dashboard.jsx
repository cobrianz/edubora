"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import StatsCard from "@/components/ui/stats-card"
import QuickActions from "@/components/dashboard/quick-actions"

export default function AccountantDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "KSh 4.2M",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Outstanding Fees",
      value: "KSh 850K",
      change: "-8%",
      trend: "down",
      icon: TrendingUp,
      color: "yellow",
    },
    {
      title: "Fee Defaulters",
      value: "127",
      change: "-12%",
      trend: "down",
      icon: Users,
      color: "red",
    },
    {
      title: "This Month",
      value: "KSh 320K",
      change: "+22%",
      trend: "up",
      icon: AlertCircle,
      color: "blue",
    },
  ]

  const quickActions = [
    { title: "Record Payment", description: "Process fee payment", href: "/dashboard/accountant/payments" },
    { title: "Generate Invoice", description: "Create fee invoice", href: "/dashboard/accountant/invoices" },
    { title: "Fee Structure", description: "Manage fee rates", href: "/dashboard/accountant/structure" },
    { title: "Financial Reports", description: "View reports", href: "/dashboard/accountant/reports" },
  ]

  const recentPayments = [
    { student: "Sarah Mwangi", amount: 15000, method: "M-Pesa", date: "2024-01-10", status: "completed" },
    { student: "John Doe", amount: 12500, method: "Bank Transfer", date: "2024-01-10", status: "completed" },
    { student: "Mary Wanjiku", amount: 18000, method: "Cash", date: "2024-01-09", status: "completed" },
    { student: "Peter Kamau", amount: 10000, method: "M-Pesa", date: "2024-01-09", status: "pending" },
  ]

  const feeCollection = [
    { class: "Grade 1", collected: 85, total: 100, percentage: 85 },
    { class: "Grade 2", collected: 92, total: 105, percentage: 88 },
    { class: "Grade 3", collected: 78, total: 95, percentage: 82 },
    { class: "Grade 4", collected: 88, total: 98, percentage: 90 },
    { class: "Grade 5", collected: 95, total: 110, percentage: 86 },
  ]

  const defaulters = [
    { student: "Alice Nyong'o", class: "Grade 7A", amount: 25000, daysOverdue: 45 },
    { student: "David Ochieng", class: "Grade 6B", amount: 18000, daysOverdue: 32 },
    { student: "Grace Akinyi", class: "Grade 8A", amount: 22000, daysOverdue: 28 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
        <p className="text-muted-foreground">Monitor school finances and fee collection progress.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions actions={quickActions} />
        </div>

        {/* Recent Payments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Recent Payments
              </CardTitle>
              <CardDescription>Latest fee payments received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-sm">{payment.student}</p>
                        <p className="text-xs text-muted-foreground">{payment.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">KSh {payment.amount.toLocaleString()}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                        <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fee Collection by Class */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Fee Collection by Class
          </CardTitle>
          <CardDescription>Collection progress across different classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeCollection.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{item.class}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.collected}/{item.total} ({item.percentage}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fee Defaulters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Fee Defaulters
          </CardTitle>
          <CardDescription>Students with outstanding fee balances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {defaulters.map((defaulter, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-red-200 bg-red-50"
              >
                <div>
                  <p className="font-medium text-sm">{defaulter.student}</p>
                  <p className="text-xs text-muted-foreground">{defaulter.class}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">KSh {defaulter.amount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{defaulter.daysOverdue} days overdue</p>
                </div>
                <Button variant="outline" size="sm">
                  Send Notice
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import StatsCard from "@/components/ui/stats-card"
import QuickActions from "@/components/dashboard/quick-actions"

export default function LibrarianDashboard() {
  const stats = [
    {
      title: "Total Books",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: BookOpen,
      color: "blue",
    },
    {
      title: "Books Borrowed",
      value: "456",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      title: "Overdue Books",
      value: "23",
      change: "-15%",
      trend: "down",
      icon: Clock,
      color: "yellow",
    },
    {
      title: "New Arrivals",
      value: "45",
      change: "+25%",
      trend: "up",
      icon: AlertTriangle,
      color: "purple",
    },
  ]

  const quickActions = [
    { title: "Issue Book", description: "Lend book to student", href: "/dashboard/librarian/issue" },
    { title: "Return Book", description: "Process book return", href: "/dashboard/librarian/return" },
    { title: "Add New Book", description: "Register new book", href: "/dashboard/librarian/books/new" },
    { title: "View Overdue", description: "Check overdue books", href: "/dashboard/librarian/overdue" },
  ]

  const recentTransactions = [
    { type: "issue", student: "Sarah Mwangi", book: "Mathematics Grade 7", date: "2024-01-10", dueDate: "2024-01-24" },
    { type: "return", student: "John Doe", book: "English Literature", date: "2024-01-10", status: "on-time" },
    { type: "issue", student: "Mary Wanjiku", book: "Science Experiments", date: "2024-01-09", dueDate: "2024-01-23" },
    { type: "return", student: "Peter Kamau", book: "History of Kenya", date: "2024-01-09", status: "late" },
  ]

  const overdueBooks = [
    { student: "Alice Nyong'o", book: "Advanced Mathematics", dueDate: "2024-01-05", daysOverdue: 8 },
    { student: "David Ochieng", book: "Physics Principles", dueDate: "2024-01-07", daysOverdue: 6 },
    { student: "Grace Akinyi", book: "Chemistry Lab Manual", dueDate: "2024-01-08", daysOverdue: 5 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Library Dashboard</h1>
        <p className="text-muted-foreground">Manage library resources and track book circulation.</p>
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

        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>Latest book issues and returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Badge variant={transaction.type === "issue" ? "default" : "secondary"}>{transaction.type}</Badge>
                      <div>
                        <p className="font-medium text-sm">{transaction.student}</p>
                        <p className="text-xs text-muted-foreground">{transaction.book}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{transaction.date}</p>
                      {transaction.type === "issue" && (
                        <p className="text-xs text-muted-foreground">Due: {transaction.dueDate}</p>
                      )}
                      {transaction.type === "return" && (
                        <Badge
                          variant={transaction.status === "on-time" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overdue Books */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Overdue Books
          </CardTitle>
          <CardDescription>Books that need to be returned</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {overdueBooks.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border border-red-200 bg-red-50"
              >
                <div>
                  <p className="font-medium text-sm">{item.student}</p>
                  <p className="text-xs text-muted-foreground">{item.book}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">{item.daysOverdue} days overdue</p>
                  <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                </div>
                <Button variant="outline" size="sm">
                  Send Reminder
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

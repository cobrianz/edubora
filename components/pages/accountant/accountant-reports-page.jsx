"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, DollarSign, Download, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function AccountantReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedGrade, setSelectedGrade] = useState("all")

  // Sample financial data
  const monthlyRevenue = [
    { month: "Jan", revenue: 850000, expenses: 320000, profit: 530000 },
    { month: "Feb", revenue: 920000, expenses: 340000, profit: 580000 },
    { month: "Mar", revenue: 780000, expenses: 310000, profit: 470000 },
    { month: "Apr", revenue: 950000, expenses: 360000, profit: 590000 },
    { month: "May", revenue: 880000, expenses: 330000, profit: 550000 },
    { month: "Jun", revenue: 970000, expenses: 380000, profit: 590000 },
  ]

  const feeCollectionByGrade = [
    { grade: "Grade 1", students: 45, collected: 1350000, pending: 150000, percentage: 90 },
    { grade: "Grade 2", students: 42, collected: 1260000, pending: 180000, percentage: 87.5 },
    { grade: "Grade 3", students: 48, collected: 1440000, pending: 240000, percentage: 85.7 },
    { grade: "Grade 4", students: 44, collected: 1320000, pending: 120000, percentage: 91.7 },
    { grade: "Grade 5", students: 46, collected: 1380000, pending: 200000, percentage: 87.3 },
    { grade: "Grade 6", students: 43, collected: 1290000, pending: 90000, percentage: 93.5 },
    { grade: "Grade 7", students: 41, collected: 1230000, pending: 170000, percentage: 87.9 },
    { grade: "Grade 8", students: 39, collected: 1170000, pending: 130000, percentage: 90 },
  ]

  const paymentMethods = [
    { method: "M-Pesa", amount: 4200000, percentage: 52, transactions: 1250 },
    { method: "Bank Transfer", amount: 2800000, percentage: 35, transactions: 420 },
    { method: "Cash", amount: 800000, percentage: 10, transactions: 180 },
    { method: "Cheque", amount: 240000, percentage: 3, transactions: 25 },
  ]

  const outstandingFees = [
    { studentName: "Grace Wanjiru", grade: "Grade 8A", amount: 48000, daysOverdue: 15, status: "overdue" },
    { studentName: "Michael Ochieng", grade: "Grade 5C", amount: 40000, daysOverdue: 8, status: "overdue" },
    { studentName: "Faith Akinyi", grade: "Grade 7B", amount: 45000, daysOverdue: 3, status: "pending" },
    { studentName: "David Mwangi", grade: "Grade 6A", amount: 42000, daysOverdue: 12, status: "overdue" },
    { studentName: "Esther Njoki", grade: "Grade 4C", amount: 38000, daysOverdue: 1, status: "pending" },
  ]

  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0)
  const totalExpenses = monthlyRevenue.reduce((sum, month) => sum + month.expenses, 0)
  const totalProfit = totalRevenue - totalExpenses

  const totalCollected = feeCollectionByGrade.reduce((sum, grade) => sum + grade.collected, 0)
  const totalPending = feeCollectionByGrade.reduce((sum, grade) => sum + grade.pending, 0)
  const overallCollectionRate = (totalCollected / (totalCollected + totalPending)) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">Comprehensive financial analytics and reporting</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KSh {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">KSh {totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">KSh {totalProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalProfit / totalRevenue) * 100).toFixed(1)}% profit margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallCollectionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Fee collection efficiency</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="collection">Fee Collection</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="outstanding">Outstanding Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Monthly Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trends</CardTitle>
                <CardDescription>Revenue, expenses, and profit over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyRevenue.map((month) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{month.month}</span>
                        <span className="text-muted-foreground">KSh {(month.revenue / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-xs">Revenue</span>
                          <Progress value={(month.revenue / 1000000) * 10} className="flex-1 h-2" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="text-xs">Expenses</span>
                          <Progress value={(month.expenses / 1000000) * 10} className="flex-1 h-2" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-xs">Profit</span>
                          <Progress value={(month.profit / 1000000) * 10} className="flex-1 h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
                <CardDescription>Breakdown of income streams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "Tuition Fees", amount: 6500000, percentage: 65, color: "bg-blue-500" },
                    { source: "Transport Fees", amount: 1500000, percentage: 15, color: "bg-green-500" },
                    { source: "Meal Fees", amount: 1000000, percentage: 10, color: "bg-yellow-500" },
                    { source: "Activity Fees", amount: 700000, percentage: 7, color: "bg-purple-500" },
                    { source: "Other Fees", amount: 300000, percentage: 3, color: "bg-gray-500" },
                  ].map((item) => (
                    <div key={item.source} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.source}</span>
                        <span className="text-muted-foreground">
                          KSh {(item.amount / 1000000).toFixed(1)}M ({item.percentage}%)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`h-2 w-4 rounded ${item.color}`} />
                        <Progress value={item.percentage} className="flex-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Collection by Grade</CardTitle>
              <CardDescription>Collection rates and outstanding amounts per grade</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grade</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Collected</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Collection Rate</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeCollectionByGrade.map((grade) => (
                    <TableRow key={grade.grade}>
                      <TableCell className="font-medium">{grade.grade}</TableCell>
                      <TableCell>{grade.students}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        KSh {grade.collected.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-red-600">KSh {grade.pending.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={grade.percentage} className="w-16" />
                          <span className="text-sm font-medium">{grade.percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            grade.percentage >= 90 ? "default" : grade.percentage >= 85 ? "secondary" : "destructive"
                          }
                        >
                          {grade.percentage >= 90 ? "Excellent" : grade.percentage >= 85 ? "Good" : "Needs Attention"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
                <CardDescription>How parents prefer to pay fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.method} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{method.method}</span>
                        <span className="text-muted-foreground">
                          KSh {(method.amount / 1000000).toFixed(1)}M ({method.percentage}%)
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={method.percentage} className="flex-1" />
                        <span className="text-xs text-muted-foreground">{method.transactions} transactions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transaction Analytics</CardTitle>
                <CardDescription>Payment processing insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Successful Payments</span>
                    </div>
                    <span className="text-green-600 font-bold">1,875</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">Pending Payments</span>
                    </div>
                    <span className="text-yellow-600 font-bold">23</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Failed Payments</span>
                    </div>
                    <span className="text-red-600 font-bold">12</span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Success Rate</span>
                      <span className="text-lg font-bold text-green-600">98.2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="outstanding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outstanding Fee Payments</CardTitle>
              <CardDescription>Students with pending or overdue payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Amount Due</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {outstandingFees.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{student.studentName}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell className="font-medium">KSh {student.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={student.daysOverdue > 7 ? "text-red-600 font-medium" : "text-yellow-600"}>
                          {student.daysOverdue} days
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.status === "overdue" ? "destructive" : "secondary"}>
                          {student.status === "overdue" ? "Overdue" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            Send Reminder
                          </Button>
                          <Button size="sm">Contact Parent</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

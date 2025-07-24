"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Plus, Search, Eye, Download, CreditCard, Smartphone, Building } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function AccountantPaymentsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const payments = [
    {
      id: 1,
      student: "Sarah Mwangi",
      admissionNo: "ADM2024001",
      amount: 15000,
      method: "M-Pesa",
      reference: "MPX123456789",
      date: "2024-01-15",
      status: "Completed",
      term: "Term 2 2024",
    },
    {
      id: 2,
      student: "John Doe",
      admissionNo: "ADM2024002",
      amount: 12500,
      method: "Bank Transfer",
      reference: "BT987654321",
      date: "2024-01-14",
      status: "Completed",
      term: "Term 2 2024",
    },
    {
      id: 3,
      student: "Mary Wanjiku",
      admissionNo: "ADM2024003",
      amount: 18000,
      method: "Cash",
      reference: "CSH001234",
      date: "2024-01-13",
      status: "Completed",
      term: "Term 2 2024",
    },
    {
      id: 4,
      student: "Peter Kamau",
      admissionNo: "ADM2024004",
      amount: 10000,
      method: "M-Pesa",
      reference: "MPX987654321",
      date: "2024-01-12",
      status: "Pending",
      term: "Term 2 2024",
    },
  ]

  const filteredPayments = payments.filter(
    (payment) =>
      payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRecordPayment = () => {
    toast({
      title: "Record Payment",
      description: "Opening payment recording form...",
    })
  }

  const handleViewPayment = (payment) => {
    toast({
      title: "Payment Details",
      description: `Viewing payment from ${payment.student}`,
    })
  }

  const getPaymentIcon = (method) => {
    switch (method) {
      case "M-Pesa":
        return <Smartphone className="h-4 w-4" />
      case "Bank Transfer":
        return <Building className="h-4 w-4" />
      case "Cash":
        return <DollarSign className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  const getMethodColor = (method) => {
    switch (method) {
      case "M-Pesa":
        return "bg-light-green/10 text-light-green border-light-green/20"
      case "Bank Transfer":
        return "bg-slate-blue/10 text-slate-blue border-slate-blue/20"
      case "Cash":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
          <p className="text-muted-foreground">Track and manage fee payments</p>
        </div>
        <Button
          onClick={handleRecordPayment}
          className="transition-all duration-300 hover:scale-105 bg-slate-blue hover:bg-slate-blue/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-light-green/10 border-light-green/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-light-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-light-green">KSh 4.2M</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-slate-blue/10 border-slate-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-blue">KSh 320K</div>
            <p className="text-xs text-muted-foreground">+22% from last month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 45K</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 850K</div>
            <p className="text-xs text-muted-foreground">Fee balances</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Payment Records</CardTitle>
          <CardDescription>View and manage all fee payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{payment.student}</TableCell>
                        <TableCell>{payment.admissionNo}</TableCell>
                        <TableCell className="font-bold text-light-green">
                          KSh {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getMethodColor(payment.method)}>
                            <span className="flex items-center gap-1">
                              {getPaymentIcon(payment.method)}
                              {payment.method}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleViewPayment(payment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="text-center py-8">
                <DollarSign className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Completed payments will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="text-center py-8">
                <Smartphone className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Pending payments will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="failed">
              <div className="text-center py-8">
                <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Failed payments will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-light-green/10">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-light-green" />
                  <span className="font-medium">M-Pesa</span>
                </div>
                <span className="font-bold text-light-green">65%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-blue/10">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-slate-blue" />
                  <span className="font-medium">Bank Transfer</span>
                </div>
                <span className="font-bold text-slate-blue">25%</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium">Cash</span>
                </div>
                <span className="font-bold text-yellow-600">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payments.slice(0, 4).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center gap-2">
                    {getPaymentIcon(payment.method)}
                    <div>
                      <p className="font-medium text-sm">{payment.student}</p>
                      <p className="text-xs text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-light-green">KSh {payment.amount.toLocaleString()}</p>
                    <Badge variant="outline" className="text-xs">
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

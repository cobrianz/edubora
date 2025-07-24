"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  Download,
  Eye,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Receipt,
  Smartphone,
  Building,
  Banknote,
} from "lucide-react"

export default function ParentFeesPage() {
  const [selectedChild, setSelectedChild] = useState("all")
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  // Sample data for parent's children
  const children = [
    {
      id: "STU-001",
      name: "Sarah Mwangi",
      grade: "Grade 7A",
      balance: 45000,
      status: "pending",
    },
    {
      id: "STU-002",
      name: "David Mwangi",
      grade: "Grade 5B",
      balance: 0,
      status: "paid",
    },
  ]

  // Sample fee invoices
  const feeInvoices = [
    {
      id: "INV-2024-001",
      studentName: "Sarah Mwangi",
      studentId: "STU-001",
      term: "Term 2, 2024",
      amount: 45000,
      dueDate: "2024-02-15",
      status: "pending",
      items: [
        { description: "Tuition Fee", amount: 35000 },
        { description: "Transport Fee", amount: 8000 },
        { description: "Meals Fee", amount: 2000 },
      ],
      createdDate: "2024-01-15",
    },
    {
      id: "INV-2024-002",
      studentName: "David Mwangi",
      studentId: "STU-002",
      term: "Term 2, 2024",
      amount: 42000,
      dueDate: "2024-02-15",
      status: "paid",
      items: [
        { description: "Tuition Fee", amount: 35000 },
        { description: "Activity Fee", amount: 7000 },
      ],
      createdDate: "2024-01-15",
      paidDate: "2024-01-20",
      paymentMethod: "M-Pesa",
      transactionId: "QA12345678",
    },
    {
      id: "INV-2023-012",
      studentName: "Sarah Mwangi",
      studentId: "STU-001",
      term: "Term 1, 2024",
      amount: 43000,
      dueDate: "2023-11-15",
      status: "paid",
      items: [
        { description: "Tuition Fee", amount: 35000 },
        { description: "Transport Fee", amount: 8000 },
      ],
      createdDate: "2023-10-15",
      paidDate: "2023-11-10",
      paymentMethod: "Bank Transfer",
      transactionId: "BT98765432",
    },
  ]

  // Sample payment history
  const paymentHistory = [
    {
      id: "PAY-001",
      date: "2024-01-20",
      amount: 42000,
      method: "M-Pesa",
      transactionId: "QA12345678",
      student: "David Mwangi",
      status: "completed",
    },
    {
      id: "PAY-002",
      date: "2023-11-10",
      amount: 43000,
      method: "Bank Transfer",
      transactionId: "BT98765432",
      student: "Sarah Mwangi",
      status: "completed",
    },
    {
      id: "PAY-003",
      date: "2023-08-15",
      amount: 40000,
      method: "Cash",
      transactionId: "CASH001",
      student: "David Mwangi",
      status: "completed",
    },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { label: "Paid", variant: "default", className: "bg-green-100 text-green-800" },
      pending: { label: "Pending", variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
      overdue: { label: "Overdue", variant: "destructive", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status] || statusConfig.pending
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const filteredInvoices =
    selectedChild === "all" ? feeInvoices : feeInvoices.filter((invoice) => invoice.studentId === selectedChild)

  const totalBalance = children.reduce((sum, child) => sum + child.balance, 0)
  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fee Management</h1>
          <p className="text-muted-foreground">View and manage your children's school fees</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Children</SelectItem>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  {child.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Statement
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">KSh {totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across {children.length} children</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KSh {totalPaid.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Feb 15</div>
            <p className="text-xs text-muted-foreground">Term 2 fees due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {children.filter((c) => c.status === "paid").length}/{children.length}
            </div>
            <p className="text-xs text-muted-foreground">Children up to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Children Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Children Fee Status</CardTitle>
          <CardDescription>Current fee status for each child</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {children.map((child) => (
              <div key={child.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">{child.grade}</p>
                  </div>
                  {getStatusBadge(child.status)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Outstanding Balance:</span>
                  <span className={`font-bold ${child.balance > 0 ? "text-red-600" : "text-green-600"}`}>
                    KSh {child.balance.toLocaleString()}
                  </span>
                </div>

                {child.balance > 0 && (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedInvoice(
                        feeInvoices.find((inv) => inv.studentId === child.id && inv.status === "pending"),
                      )
                      setIsPaymentDialogOpen(true)
                    }}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Now
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Fee Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fee Invoices</CardTitle>
              <CardDescription>All fee invoices for your children</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Term</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.studentName}</TableCell>
                      <TableCell>{invoice.term}</TableCell>
                      <TableCell className="font-medium">KSh {invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          {invoice.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedInvoice(invoice)
                                setIsPaymentDialogOpen(true)
                              }}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Pay
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            PDF
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Record of all fee payments made</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{payment.student}</TableCell>
                      <TableCell className="font-medium text-green-600">
                        KSh {payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {payment.method === "M-Pesa" && <Smartphone className="h-4 w-4" />}
                          {payment.method === "Bank Transfer" && <Building className="h-4 w-4" />}
                          {payment.method === "Cash" && <Banknote className="h-4 w-4" />}
                          <span>{payment.method}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Receipt className="mr-2 h-4 w-4" />
                          Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Make Payment</DialogTitle>
            <DialogDescription>Pay fees for {selectedInvoice?.studentName}</DialogDescription>
          </DialogHeader>
          {selectedInvoice && <PaymentForm invoice={selectedInvoice} onClose={() => setIsPaymentDialogOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function PaymentForm({ invoice, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  return (
    <div className="space-y-4">
      {/* Invoice Summary */}
      <div className="p-4 bg-gray-50 rounded-lg space-y-2">
        <div className="flex justify-between">
          <span>Invoice:</span>
          <span className="font-medium">{invoice.id}</span>
        </div>
        <div className="flex justify-between">
          <span>Student:</span>
          <span className="font-medium">{invoice.studentName}</span>
        </div>
        <div className="flex justify-between">
          <span>Term:</span>
          <span>{invoice.term}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total Amount:</span>
          <span>KSh {invoice.amount.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-2">
        <Label>Payment Method</Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Choose payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mpesa">M-Pesa</SelectItem>
            <SelectItem value="bank">Bank Transfer</SelectItem>
            <SelectItem value="card">Credit/Debit Card</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* M-Pesa Phone Number */}
      {paymentMethod === "mpesa" && (
        <div className="space-y-2">
          <Label htmlFor="phone">M-Pesa Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="254712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      )}

      {/* Bank Transfer Details */}
      {paymentMethod === "bank" && (
        <div className="p-4 bg-blue-50 rounded-lg space-y-2">
          <h4 className="font-medium">Bank Details</h4>
          <div className="text-sm space-y-1">
            <div>Bank: KCB Bank Kenya</div>
            <div>Account: 1234567890</div>
            <div>Account Name: Edubora School</div>
            <div>Reference: {invoice.id}</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!paymentMethod}>
          {paymentMethod === "mpesa"
            ? "Send STK Push"
            : paymentMethod === "bank"
              ? "I've Made Transfer"
              : "Proceed to Payment"}
        </Button>
      </div>
    </div>
  )
}

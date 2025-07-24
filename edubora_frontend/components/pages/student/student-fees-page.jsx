"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, CreditCard, Download, Calendar, AlertCircle, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import PaymentInitiateModal from "@/components/modals/payment-initiate-modal" // Import the new modal

export default function StudentFeesPage() {
  const { toast } = useToast()
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const feeStructure = {
    tuitionFee: 35000,
    examFee: 5000,
    activityFee: 3000,
    libraryFee: 2000,
    total: 45000,
  }

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: "PAY001",
      date: "2024-06-15",
      amount: 20000,
      method: "M-Pesa",
      reference: "MP240615001",
      status: "Completed",
      description: "Partial tuition payment",
    },
    {
      id: "PAY002",
      date: "2024-07-01",
      amount: 10000,
      method: "Bank Transfer",
      reference: "BT240701002",
      status: "Completed",
      description: "Tuition payment",
    },
    {
      id: "PAY003",
      date: "2024-07-10",
      amount: 5000,
      method: "Cash",
      reference: "CSH240710003",
      status: "Pending",
      description: "Exam fee payment",
    },
  ])

  const currentBalance = {
    totalFees: feeStructure.total,
    paidAmount: paymentHistory
      .filter((payment) => payment.status === "Completed")
      .reduce((sum, payment) => sum + payment.amount, 0),
    pendingAmount: paymentHistory
      .filter((payment) => payment.status === "Pending")
      .reduce((sum, payment) => sum + payment.amount, 0),
  }

  currentBalance.outstandingAmount = currentBalance.totalFees - currentBalance.paidAmount - currentBalance.pendingAmount

  const handleMakePayment = () => {
    setShowPaymentModal(true)
  }

  const handlePaymentSuccess = (newPayment) => {
    setPaymentHistory((prevHistory) => [...prevHistory, newPayment])
    // Recalculate balance or fetch fresh data if connected to a backend
  }

  const handleDownloadReceipt = (paymentId) => {
    toast({
      title: "Download Started",
      description: "Receipt is being downloaded",
    })
  }

  const handleDownloadStatement = () => {
    toast({
      title: "Download Started",
      description: "Fee statement is being generated",
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Fees</h1>
          <p className="text-muted-foreground">View your fee structure and payment history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadStatement}>
            <Download className="mr-2 h-4 w-4" />
            Download Statement
          </Button>
          <Button onClick={handleMakePayment}>
            <CreditCard className="mr-2 h-4 w-4" />
            Make Payment
          </Button>
        </div>
      </div>

      {/* Fee Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {currentBalance.totalFees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KSh {currentBalance.paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((currentBalance.paidAmount / currentBalance.totalFees) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              KSh {currentBalance.pendingAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Processing</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              KSh {currentBalance.outstandingAmount.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Due amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Fee Overview</TabsTrigger>
          <TabsTrigger value="structure">Fee Structure</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Progress</CardTitle>
                <CardDescription>Your fee payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Payment Progress</span>
                    <span>{Math.round((currentBalance.paidAmount / currentBalance.totalFees) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(currentBalance.paidAmount / currentBalance.totalFees) * 100}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Paid</p>
                      <p className="font-medium text-green-600">KSh {currentBalance.paidAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Remaining</p>
                      <p className="font-medium text-red-600">
                        KSh {currentBalance.outstandingAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Payment Due</CardTitle>
                <CardDescription>Upcoming payment information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">KSh 10,000</div>
                    <p className="text-sm text-muted-foreground">Due by August 15, 2024</p>
                  </div>
                  <Button onClick={handleMakePayment} className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle>Fee Structure</CardTitle>
              <CardDescription>Breakdown of all fees for this academic year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Tuition Fee</span>
                    <span className="font-bold">KSh {feeStructure.tuitionFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Examination Fee</span>
                    <span className="font-bold">KSh {feeStructure.examFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Activity Fee</span>
                    <span className="font-bold">KSh {feeStructure.activityFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Library Fee</span>
                    <span className="font-bold">KSh {feeStructure.libraryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="font-bold text-lg">Total Annual Fee</span>
                    <span className="font-bold text-lg text-blue-600">KSh {feeStructure.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>All your fee payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="font-medium">KSh {payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {payment.status === "Completed" && (
                            <Button variant="ghost" size="sm" onClick={() => handleDownloadReceipt(payment.id)}>
                              <Download className="h-4 w-4 mr-1" />
                              Receipt
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts">
          <Card>
            <CardHeader>
              <CardTitle>Payment Receipts</CardTitle>
              <CardDescription>Download your payment receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory
                  .filter((payment) => payment.status === "Completed")
                  .map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Receipt #{payment.reference}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.date} - KSh {payment.amount.toLocaleString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadReceipt(payment.id)}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {showPaymentModal && (
        <PaymentInitiateModal
          totalAmount={currentBalance.outstandingAmount > 0 ? currentBalance.outstandingAmount : feeStructure.total}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}

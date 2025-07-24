"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, CreditCard, Receipt, Calculator } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PaymentModal({ student, onClose, onPayment }) {
  const { toast } = useToast()
  const [paymentData, setPaymentData] = useState({
    studentId: student?.id || "",
    studentName: student?.name || "",
    admissionNo: student?.admissionNo || "",
    paymentMethod: "mpesa",
    amount: "",
    reference: "",
    notes: "",
    receiptNumber: `RCP${Date.now()}`,
    feeBreakdown: student?.feeBreakdown || [
      { category: "Tuition", amount: 35000, paid: 20000, balance: 15000 },
      { category: "Transport", amount: 8000, paid: 5000, balance: 3000 },
      { category: "Meals", amount: 5000, paid: 0, balance: 5000 },
    ],
    partialPayments: [],
  })

  const paymentMethods = [
    { value: "mpesa", label: "M-Pesa", icon: "📱" },
    { value: "bank", label: "Bank Transfer", icon: "🏦" },
    { value: "cash", label: "Cash", icon: "💵" },
    { value: "cheque", label: "Cheque", icon: "📝" },
    { value: "card", label: "Credit/Debit Card", icon: "💳" },
  ]

  const handleInputChange = (field, value) => {
    setPaymentData({ ...paymentData, [field]: value })
  }

  const handlePartialPayment = (category, amount) => {
    const updatedBreakdown = paymentData.feeBreakdown.map((item) =>
      item.category === category ? { ...item, paid: item.paid + amount, balance: item.balance - amount } : item,
    )

    const newPartialPayment = {
      id: Date.now(),
      category,
      amount,
      date: new Date().toISOString(),
    }

    setPaymentData({
      ...paymentData,
      feeBreakdown: updatedBreakdown,
      partialPayments: [...paymentData.partialPayments, newPartialPayment],
    })
  }

  const getTotalBalance = () => {
    return paymentData.feeBreakdown.reduce((total, item) => total + item.balance, 0)
  }

  const getTotalPaid = () => {
    return paymentData.feeBreakdown.reduce((total, item) => total + item.paid, 0)
  }

  const getTotalFees = () => {
    return paymentData.feeBreakdown.reduce((total, item) => total + item.amount, 0)
  }

  const handlePayment = () => {
    if (!paymentData.amount || Number(paymentData.amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      })
      return
    }

    if (Number(paymentData.amount) > getTotalBalance()) {
      toast({
        title: "Amount Exceeds Balance",
        description: "Payment amount cannot exceed the outstanding balance",
        variant: "destructive",
      })
      return
    }

    if (!paymentData.reference.trim()) {
      toast({
        title: "Missing Reference",
        description: "Please enter a payment reference number",
        variant: "destructive",
      })
      return
    }

    const payment = {
      id: `PAY${Date.now()}`,
      ...paymentData,
      amount: Number(paymentData.amount),
      date: new Date().toISOString(),
      status: "Completed",
    }

    onPayment(payment)
    toast({
      title: "Payment Recorded",
      description: `Payment of KSh ${Number(paymentData.amount).toLocaleString()} has been recorded successfully`,
    })
  }

  const generateReference = () => {
    const method = paymentData.paymentMethod.toUpperCase()
    const timestamp = Date.now().toString().slice(-6)
    const reference = `${method}${timestamp}`
    setPaymentData({ ...paymentData, reference })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Record Payment
            </CardTitle>
            <CardDescription>Process fee payment for {paymentData.studentName}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Student Information */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Student Information</h4>
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <span className="text-sm text-muted-foreground">Name:</span>
                <p className="font-medium">{paymentData.studentName}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Admission No:</span>
                <p className="font-medium">{paymentData.admissionNo}</p>
              </div>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Fee Breakdown
            </h4>
            <div className="space-y-3">
              {paymentData.feeBreakdown.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.category}</span>
                    <Badge variant={item.balance === 0 ? "default" : "secondary"}>
                      {item.balance === 0 ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total:</span>
                      <p className="font-medium">KSh {item.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Paid:</span>
                      <p className="font-medium text-green-600">KSh {item.paid.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Balance:</span>
                      <p className="font-medium text-red-600">KSh {item.balance.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="grid gap-2 md:grid-cols-3">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Fees</p>
                  <p className="text-xl font-bold">KSh {getTotalFees().toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Amount Paid</p>
                  <p className="text-xl font-bold text-green-600">KSh {getTotalPaid().toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <p className="text-xl font-bold text-red-600">KSh {getTotalBalance().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <h4 className="font-medium">Payment Details</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={paymentData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        <div className="flex items-center gap-2">
                          <span>{method.icon}</span>
                          {method.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount (KSh)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={paymentData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  placeholder="0"
                  max={getTotalBalance()}
                />
                <p className="text-xs text-muted-foreground">Maximum: KSh {getTotalBalance().toLocaleString()}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reference">Reference Number</Label>
                  <Button variant="outline" size="sm" onClick={generateReference}>
                    Generate
                  </Button>
                </div>
                <Input
                  id="reference"
                  value={paymentData.reference}
                  onChange={(e) => handleInputChange("reference", e.target.value)}
                  placeholder="e.g., MPESA123456789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptNumber">Receipt Number</Label>
                <Input
                  id="receiptNumber"
                  value={paymentData.receiptNumber}
                  onChange={(e) => handleInputChange("receiptNumber", e.target.value)}
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={paymentData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional payment notes..."
                rows={3}
              />
            </div>
          </div>

          {/* Quick Payment Options */}
          <div className="space-y-4">
            <h4 className="font-medium">Quick Payment Options</h4>
            <div className="grid gap-2 md:grid-cols-3">
              <Button
                variant="outline"
                onClick={() => setPaymentData({ ...paymentData, amount: getTotalBalance().toString() })}
              >
                Pay Full Balance
                <br />
                <span className="text-xs">KSh {getTotalBalance().toLocaleString()}</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setPaymentData({ ...paymentData, amount: Math.round(getTotalBalance() / 2).toString() })}
              >
                Pay Half
                <br />
                <span className="text-xs">KSh {Math.round(getTotalBalance() / 2).toLocaleString()}</span>
              </Button>
              <Button variant="outline" onClick={() => setPaymentData({ ...paymentData, amount: "10000" })}>
                Pay KSh 10,000
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handlePayment}>
              <Receipt className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

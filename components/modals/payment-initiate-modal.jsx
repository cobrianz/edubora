"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CreditCard, DollarSign, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function PaymentInitiateModal({ totalAmount, onClose, onPaymentSuccess }) {
  const { toast } = useToast()
  const [amount, setAmount] = useState(totalAmount || "")
  const [method, setMethod] = useState("")
  const [reference, setReference] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePaymentSubmit = () => {
    if (!amount || !method) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and select a payment method.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    toast({
      title: "Processing Payment",
      description: "Your payment is being processed...",
    })

    setTimeout(() => {
      setIsProcessing(false)
      const success = Math.random() > 0.2 // Simulate 80% success rate
      if (success) {
        toast({
          title: "Payment Successful!",
          description: `KSh ${Number.parseFloat(amount).toLocaleString()} paid via ${method}.`,
          variant: "default",
        })
        onPaymentSuccess({
          amount: Number.parseFloat(amount),
          method,
          reference: reference || `REF-${Date.now()}`,
          status: "Completed",
          date: new Date().toISOString().split("T")[0],
        })
        onClose()
      } else {
        toast({
          title: "Payment Failed",
          description: "There was an issue processing your payment. Please try again.",
          variant: "destructive",
        })
      }
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-md animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Make Payment
            </CardTitle>
            <CardDescription>Enter payment details to settle your fees.</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (KSh)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="e.g., 15000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isProcessing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="method">Payment Method</Label>
            <Select value={method} onValueChange={setMethod} disabled={isProcessing}>
              <SelectTrigger id="method">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M-Pesa">M-Pesa</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Reference (Optional)</Label>
            <Input
              id="reference"
              placeholder="e.g., Transaction ID"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              disabled={isProcessing}
            />
          </div>

          <Button onClick={handlePaymentSubmit} className="w-full" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <DollarSign className="mr-2 h-4 w-4" />
                Confirm Payment
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

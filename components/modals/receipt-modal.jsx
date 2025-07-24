"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Receipt, Download, PrinterIcon as Print, Mail, Share } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReceiptModal({ payment, onClose }) {
  const { toast } = useToast()
  const [isDownloading, setIsDownloading] = useState(false)

  const receiptData = {
    receiptNumber: payment?.receiptNumber || `RCP${Date.now()}`,
    date: payment?.date || new Date().toISOString(),
    studentName: payment?.studentName || "John Doe",
    admissionNo: payment?.admissionNo || "ADM2024001",
    grade: payment?.grade || "Grade 7A",
    paymentMethod: payment?.paymentMethod || "mpesa",
    reference: payment?.reference || "MPESA123456789",
    amount: payment?.amount || 15000,
    feeBreakdown: payment?.feeBreakdown || [
      { category: "Tuition", amount: 10000 },
      { category: "Transport", amount: 3000 },
      { category: "Meals", amount: 2000 },
    ],
    notes: payment?.notes || "",
    processedBy: "Finance Office",
    schoolInfo: {
      name: "CBC Primary School",
      address: "123 Education Lane, Nairobi",
      phone: "+254 700 123 456",
      email: "finance@cbcschool.ac.ke",
    },
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsDownloading(false)
    toast({
      title: "Receipt Downloaded",
      description: "Receipt PDF has been downloaded successfully",
    })
  }

  const handlePrint = () => {
    window.print()
    toast({
      title: "Print Dialog Opened",
      description: "Receipt is ready for printing",
    })
  }

  const handleEmail = () => {
    toast({
      title: "Email Sent",
      description: "Receipt has been emailed to the parent",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Receipt ${receiptData.receiptNumber}`,
        text: `Payment receipt for ${receiptData.studentName}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Receipt link copied to clipboard",
      })
    }
  }

  const getPaymentMethodIcon = (method) => {
    const icons = {
      mpesa: "📱",
      bank: "🏦",
      cash: "💵",
      cheque: "📝",
      card: "💳",
    }
    return icons[method] || "💳"
  }

  const getPaymentMethodName = (method) => {
    const names = {
      mpesa: "M-Pesa",
      bank: "Bank Transfer",
      cash: "Cash",
      cheque: "Cheque",
      card: "Credit/Debit Card",
    }
    return names[method] || "Other"
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Payment Receipt
            </CardTitle>
            <CardDescription>Receipt #{receiptData.receiptNumber}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleEmail}>
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Print className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* School Header */}
          <div className="text-center space-y-2 pb-4 border-b">
            <h2 className="text-2xl font-bold">{receiptData.schoolInfo.name}</h2>
            <p className="text-muted-foreground">{receiptData.schoolInfo.address}</p>
            <p className="text-muted-foreground">
              {receiptData.schoolInfo.phone} | {receiptData.schoolInfo.email}
            </p>
          </div>

          {/* Receipt Header */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">PAYMENT RECEIPT</h3>
            <div className="flex justify-center">
              <Badge variant="default" className="text-lg px-4 py-1">
                PAID
              </Badge>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Receipt Number</p>
                <p className="font-bold text-lg">{receiptData.receiptNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date(receiptData.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processed By</p>
                <p className="font-medium">{receiptData.processedBy}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Student Name</p>
                <p className="font-bold">{receiptData.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admission Number</p>
                <p className="font-medium">{receiptData.admissionNo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Grade</p>
                <p className="font-medium">{receiptData.grade}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div className="space-y-4">
            <h4 className="font-bold">Payment Details</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getPaymentMethodIcon(receiptData.paymentMethod)}</span>
                  <span className="font-medium">{getPaymentMethodName(receiptData.paymentMethod)}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reference Number</p>
                <p className="font-medium font-mono">{receiptData.reference}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Fee Breakdown */}
          <div className="space-y-4">
            <h4 className="font-bold">Fee Breakdown</h4>
            <div className="space-y-2">
              {receiptData.feeBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-dashed">
                  <span>{item.category}</span>
                  <span className="font-medium">KSh {item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total Amount */}
          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Total Amount Paid:</span>
              <span className="text-2xl font-bold text-green-600">KSh {receiptData.amount.toLocaleString()}</span>
            </div>
          </div>

          {/* Notes */}
          {receiptData.notes && (
            <div className="space-y-2">
              <h4 className="font-medium">Notes</h4>
              <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">{receiptData.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            <p>This is a computer-generated receipt and does not require a signature.</p>
            <p>For any queries, please contact the Finance Office.</p>
            <p className="mt-2">Generated on {new Date().toLocaleString()}</p>
          </div>

          <div className="flex justify-center gap-2 pt-4">
            <Button onClick={handleDownload} disabled={isDownloading} className="min-w-32">
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

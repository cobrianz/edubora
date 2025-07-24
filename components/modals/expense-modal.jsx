"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, DollarSign, Upload, FileText, Save, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ExpenseModal({ expense, onClose, onSave }) {
  const { toast } = useToast()
  const [expenseData, setExpenseData] = useState({
    id: expense?.id || `EXP${Date.now()}`,
    category: expense?.category || "",
    description: expense?.description || "",
    amount: expense?.amount || "",
    date: expense?.date || new Date().toISOString().split("T")[0],
    vendor: expense?.vendor || "",
    paymentMethod: expense?.paymentMethod || "bank",
    reference: expense?.reference || "",
    notes: expense?.notes || "",
    status: expense?.status || "pending",
    approvedBy: expense?.approvedBy || "",
    receipts: expense?.receipts || [],
    department: expense?.department || "",
    budgetCode: expense?.budgetCode || "",
  })

  const categories = [
    "Salaries & Benefits",
    "Utilities",
    "Maintenance & Repairs",
    "Supplies & Materials",
    "Transportation",
    "Professional Services",
    "Insurance",
    "Marketing & Advertising",
    "Equipment",
    "Food & Catering",
    "Training & Development",
    "Other",
  ]

  const departments = [
    "Administration",
    "Academic",
    "Finance",
    "Maintenance",
    "Transport",
    "Catering",
    "Sports",
    "Library",
    "IT",
  ]

  const paymentMethods = [
    { value: "bank", label: "Bank Transfer" },
    { value: "cash", label: "Cash" },
    { value: "cheque", label: "Cheque" },
    { value: "card", label: "Credit/Debit Card" },
    { value: "mpesa", label: "M-Pesa" },
  ]

  const handleInputChange = (field, value) => {
    setExpenseData({ ...expenseData, [field]: value })
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const newReceipts = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }))

    setExpenseData({
      ...expenseData,
      receipts: [...expenseData.receipts, ...newReceipts],
    })
  }

  const removeReceipt = (receiptId) => {
    setExpenseData({
      ...expenseData,
      receipts: expenseData.receipts.filter((r) => r.id !== receiptId),
    })
  }

  const handleSave = (status = expenseData.status) => {
    if (!expenseData.category) {
      toast({
        title: "Missing Information",
        description: "Please select an expense category",
        variant: "destructive",
      })
      return
    }

    if (!expenseData.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter expense description",
        variant: "destructive",
      })
      return
    }

    if (!expenseData.amount || Number(expenseData.amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid expense amount",
        variant: "destructive",
      })
      return
    }

    const finalExpense = {
      ...expenseData,
      amount: Number(expenseData.amount),
      status,
      createdDate: expense?.createdDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      approvedDate: status === "approved" ? new Date().toISOString() : expense?.approvedDate,
    }

    onSave(finalExpense)
    toast({
      title: "Expense Saved",
      description: `Expense has been ${status === "approved" ? "approved" : "saved"} successfully`,
    })
  }

  const generateReference = () => {
    const prefix = expenseData.paymentMethod.toUpperCase()
    const timestamp = Date.now().toString().slice(-6)
    const reference = `${prefix}${timestamp}`
    setExpenseData({ ...expenseData, reference })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {expense ? "Edit Expense" : "Add New Expense"}
            </CardTitle>
            <CardDescription>{expense ? `Expense ${expense.id}` : "Record a new expense transaction"}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                expenseData.status === "approved"
                  ? "default"
                  : expenseData.status === "pending"
                    ? "secondary"
                    : "destructive"
              }
            >
              {expenseData.status.charAt(0).toUpperCase() + expenseData.status.slice(1)}
            </Badge>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h4 className="font-medium">Basic Information</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={expenseData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={expenseData.department}
                  onValueChange={(value) => handleInputChange("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (KSh)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={expenseData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={expenseData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={expenseData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the expense"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor/Supplier</Label>
                <Input
                  id="vendor"
                  value={expenseData.vendor}
                  onChange={(e) => handleInputChange("vendor", e.target.value)}
                  placeholder="Vendor name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budgetCode">Budget Code</Label>
                <Input
                  id="budgetCode"
                  value={expenseData.budgetCode}
                  onChange={(e) => handleInputChange("budgetCode", e.target.value)}
                  placeholder="e.g., BUD-2024-001"
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h4 className="font-medium">Payment Information</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={expenseData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  value={expenseData.reference}
                  onChange={(e) => handleInputChange("reference", e.target.value)}
                  placeholder="Payment reference"
                />
              </div>
            </div>
          </div>

          {/* Receipts & Documents */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Receipts & Documents</h4>
              <div>
                <input
                  type="file"
                  id="fileUpload"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById("fileUpload").click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              </div>
            </div>

            {expenseData.receipts.length > 0 && (
              <div className="space-y-2">
                {expenseData.receipts.map((receipt) => (
                  <div key={receipt.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">{receipt.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(receipt.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => removeReceipt(receipt.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={expenseData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any additional notes or comments..."
              rows={3}
            />
          </div>

          {/* Approval Section */}
          {expense && expense.status !== "pending" && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Approval Information</h4>
              <div className="grid gap-2 md:grid-cols-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <p className="font-medium capitalize">{expenseData.status}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Approved By:</span>
                  <p className="font-medium">{expenseData.approvedBy || "N/A"}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {expenseData.status === "pending" && (
              <Button variant="outline" onClick={() => handleSave("approved")}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve & Save
              </Button>
            )}
            <Button onClick={() => handleSave()}>
              <Save className="mr-2 h-4 w-4" />
              Save Expense
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

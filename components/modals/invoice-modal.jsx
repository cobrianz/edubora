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
import { X, FileText, Send, Download, Plus, Trash2, Calculator } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function InvoiceModal({ invoice, student, onClose, onSave }) {
  const { toast } = useToast()
  const [invoiceData, setInvoiceData] = useState({
    id: invoice?.id || `INV-${Date.now()}`,
    studentId: student?.id || invoice?.studentId || "",
    studentName: student?.name || invoice?.studentName || "",
    admissionNo: student?.admissionNo || invoice?.admissionNo || "",
    grade: student?.grade || invoice?.grade || "",
    invoiceDate: invoice?.invoiceDate || new Date().toISOString().split("T")[0],
    dueDate: invoice?.dueDate || "",
    term: invoice?.term || "Term 1",
    academicYear: invoice?.academicYear || "2024-2025",
    items: invoice?.items || [{ id: 1, description: "Tuition Fee", amount: 35000, quantity: 1 }],
    discount: invoice?.discount || 0,
    discountType: invoice?.discountType || "fixed",
    notes: invoice?.notes || "",
    status: invoice?.status || "draft",
    paymentTerms: invoice?.paymentTerms || "Net 30",
  })

  const handleInputChange = (field, value) => {
    setInvoiceData({ ...invoiceData, [field]: value })
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = invoiceData.items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setInvoiceData({ ...invoiceData, items: updatedItems })
  }

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      description: "",
      amount: 0,
      quantity: 1,
    }
    setInvoiceData({ ...invoiceData, items: [...invoiceData.items, newItem] })
  }

  const removeItem = (index) => {
    if (invoiceData.items.length > 1) {
      const updatedItems = invoiceData.items.filter((_, i) => i !== index)
      setInvoiceData({ ...invoiceData, items: updatedItems })
    }
  }

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((total, item) => total + item.amount * item.quantity, 0)
  }

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal()
    if (invoiceData.discountType === "percentage") {
      return (subtotal * invoiceData.discount) / 100
    }
    return invoiceData.discount
  }

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount()
  }

  const handleSave = (status = "draft") => {
    if (!invoiceData.studentName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a student",
        variant: "destructive",
      })
      return
    }

    if (!invoiceData.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please set a due date",
        variant: "destructive",
      })
      return
    }

    if (invoiceData.items.some((item) => !item.description.trim() || item.amount <= 0)) {
      toast({
        title: "Invalid Items",
        description: "Please ensure all items have descriptions and valid amounts",
        variant: "destructive",
      })
      return
    }

    const finalInvoice = {
      ...invoiceData,
      status,
      subtotal: calculateSubtotal(),
      discountAmount: calculateDiscount(),
      totalAmount: calculateTotal(),
      createdDate: invoice?.createdDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    }

    onSave(finalInvoice)
    toast({
      title: "Invoice Saved",
      description: `Invoice ${invoiceData.id} has been ${status === "sent" ? "sent" : "saved"} successfully`,
    })
  }

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Invoice PDF is being generated...",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {invoice ? "Edit Invoice" : "Create Invoice"}
            </CardTitle>
            <CardDescription>{invoice ? `Invoice ${invoice.id}` : "Generate a new fee invoice"}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={invoiceData.status === "sent" ? "default" : "secondary"}>
              {invoiceData.status.charAt(0).toUpperCase() + invoiceData.status.slice(1)}
            </Badge>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Invoice Header */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">Invoice Information</h4>
              <div className="grid gap-3">
                <div className="space-y-2">
                  <Label htmlFor="invoiceId">Invoice Number</Label>
                  <Input
                    id="invoiceId"
                    value={invoiceData.id}
                    onChange={(e) => handleInputChange("id", e.target.value)}
                    readOnly
                  />
                </div>
                <div className="grid gap-3 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceDate">Invoice Date</Label>
                    <Input
                      id="invoiceDate"
                      type="date"
                      value={invoiceData.invoiceDate}
                      onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Student Information</h4>
              <div className="grid gap-3">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    value={invoiceData.studentName}
                    onChange={(e) => handleInputChange("studentName", e.target.value)}
                    placeholder="Select or enter student name"
                  />
                </div>
                <div className="grid gap-3 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="admissionNo">Admission No.</Label>
                    <Input
                      id="admissionNo"
                      value={invoiceData.admissionNo}
                      onChange={(e) => handleInputChange("admissionNo", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Input
                      id="grade"
                      value={invoiceData.grade}
                      onChange={(e) => handleInputChange("grade", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Period */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year</Label>
              <Input
                id="academicYear"
                value={invoiceData.academicYear}
                onChange={(e) => handleInputChange("academicYear", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Term</Label>
              <Select value={invoiceData.term} onValueChange={(value) => handleInputChange("term", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Term 1">Term 1</SelectItem>
                  <SelectItem value="Term 2">Term 2</SelectItem>
                  <SelectItem value="Term 3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select
                value={invoiceData.paymentTerms}
                onValueChange={(value) => handleInputChange("paymentTerms", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net 15">Net 15 days</SelectItem>
                  <SelectItem value="Net 30">Net 30 days</SelectItem>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                  <SelectItem value="End of Month">End of Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Invoice Items
              </h4>
              <Button variant="outline" size="sm" onClick={addItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {invoiceData.items.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="grid gap-3 md:grid-cols-5">
                    <div className="md:col-span-2 space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        placeholder="Fee description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Amount (KSh)</Label>
                      <Input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleItemChange(index, "amount", Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Total</Label>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">KSh {(item.amount * item.quantity).toLocaleString()}</span>
                        {invoiceData.items.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discount */}
          <div className="space-y-4">
            <h4 className="font-medium">Discount</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="discountType">Discount Type</Label>
                <Select
                  value={invoiceData.discountType}
                  onValueChange={(value) => handleInputChange("discountType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount {invoiceData.discountType === "percentage" ? "(%)" : "(KSh)"}</Label>
                <Input
                  id="discount"
                  type="number"
                  value={invoiceData.discount}
                  onChange={(e) => handleInputChange("discount", Number(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label>Discount Amount</Label>
                <div className="p-2 bg-muted rounded border">
                  <span className="font-medium">KSh {calculateDiscount().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-3">Invoice Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>KSh {calculateSubtotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>- KSh {calculateDiscount().toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span>KSh {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={invoiceData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Additional notes or payment instructions..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={() => handleSave("draft")}>
              Save Draft
            </Button>
            <Button onClick={() => handleSave("sent")}>
              <Send className="mr-2 h-4 w-4" />
              Save & Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

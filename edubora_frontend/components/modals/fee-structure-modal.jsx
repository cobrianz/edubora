"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, Trash2, DollarSign, Save, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function FeeStructureModal({ feeStructure, onClose, onSave }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    id: feeStructure?.id || `FS${Date.now()}`,
    name: feeStructure?.name || "",
    academicYear: feeStructure?.academicYear || "2024-2025",
    term: feeStructure?.term || "Term 1",
    grade: feeStructure?.grade || "",
    description: feeStructure?.description || "",
    status: feeStructure?.status || "Draft",
    feeItems: feeStructure?.feeItems || [
      { id: 1, category: "Tuition", description: "Tuition Fee", amount: 0, mandatory: true },
    ],
    discounts: feeStructure?.discounts || [],
    paymentPlan: feeStructure?.paymentPlan || {
      allowInstallments: false,
      installments: 1,
      dueDate: "",
    },
  })

  const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]
  const terms = ["Term 1", "Term 2", "Term 3"]
  const feeCategories = [
    "Tuition",
    "Transport",
    "Meals",
    "Uniform",
    "Books",
    "Activity",
    "Laboratory",
    "Library",
    "Sports",
    "Examination",
    "Other",
  ]

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFeeItemChange = (index, field, value) => {
    const updatedItems = formData.feeItems.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setFormData({ ...formData, feeItems: updatedItems })
  }

  const addFeeItem = () => {
    const newItem = {
      id: Date.now(),
      category: "Other",
      description: "",
      amount: 0,
      mandatory: false,
    }
    setFormData({ ...formData, feeItems: [...formData.feeItems, newItem] })
  }

  const removeFeeItem = (index) => {
    if (formData.feeItems.length > 1) {
      const updatedItems = formData.feeItems.filter((_, i) => i !== index)
      setFormData({ ...formData, feeItems: updatedItems })
    }
  }

  const addDiscount = () => {
    const newDiscount = {
      id: Date.now(),
      name: "",
      type: "percentage",
      value: 0,
      conditions: "",
    }
    setFormData({ ...formData, discounts: [...formData.discounts, newDiscount] })
  }

  const removeDiscount = (index) => {
    const updatedDiscounts = formData.discounts.filter((_, i) => i !== index)
    setFormData({ ...formData, discounts: updatedDiscounts })
  }

  const handleDiscountChange = (index, field, value) => {
    const updatedDiscounts = formData.discounts.map((discount, i) =>
      i === index ? { ...discount, [field]: value } : discount,
    )
    setFormData({ ...formData, discounts: updatedDiscounts })
  }

  const calculateTotalFees = () => {
    return formData.feeItems.reduce((total, item) => total + (Number(item.amount) || 0), 0)
  }

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a fee structure name",
        variant: "destructive",
      })
      return
    }

    if (!formData.grade) {
      toast({
        title: "Missing Information",
        description: "Please select a grade",
        variant: "destructive",
      })
      return
    }

    const totalAmount = calculateTotalFees()
    const structureData = {
      ...formData,
      totalAmount,
      createdDate: feeStructure?.createdDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    }

    onSave(structureData)
    toast({
      title: "Fee Structure Saved",
      description: `${formData.name} has been saved successfully`,
    })
  }

  const handleCopyStructure = () => {
    const copiedStructure = {
      ...formData,
      id: `FS${Date.now()}`,
      name: `${formData.name} (Copy)`,
      status: "Draft",
    }
    setFormData(copiedStructure)
    toast({
      title: "Structure Copied",
      description: "Fee structure has been duplicated for editing",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {feeStructure ? "Edit Fee Structure" : "Create Fee Structure"}
            </CardTitle>
            <CardDescription>Configure fee structure for academic year and grade</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {feeStructure && (
              <Button variant="outline" onClick={handleCopyStructure}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            )}
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
                <Label htmlFor="name">Structure Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., Grade 7 Term 1 2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input
                  id="academicYear"
                  value={formData.academicYear}
                  onChange={(e) => handleInputChange("academicYear", e.target.value)}
                  placeholder="2024-2025"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Term</Label>
                <Select value={formData.term} onValueChange={(value) => handleInputChange("term", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Additional details about this fee structure..."
                rows={3}
              />
            </div>
          </div>

          {/* Fee Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Fee Items</h4>
              <Button variant="outline" size="sm" onClick={addFeeItem}>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {formData.feeItems.map((item, index) => (
                <div key={item.id} className="p-4 border rounded-lg space-y-3">
                  <div className="grid gap-3 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={item.category}
                        onValueChange={(value) => handleFeeItemChange(index, "category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {feeCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={item.description}
                        onChange={(e) => handleFeeItemChange(index, "description", e.target.value)}
                        placeholder="Fee description"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Amount (KSh)</Label>
                      <Input
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleFeeItemChange(index, "amount", Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Options</Label>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`mandatory-${index}`}
                            checked={item.mandatory}
                            onCheckedChange={(checked) => handleFeeItemChange(index, "mandatory", checked)}
                          />
                          <Label htmlFor={`mandatory-${index}`} className="text-sm">
                            Mandatory
                          </Label>
                        </div>
                        {formData.feeItems.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => removeFeeItem(index)}
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

            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Fee Amount:</span>
                <span className="text-xl font-bold text-blue-600">KSh {calculateTotalFees().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Discounts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Discounts & Scholarships</h4>
              <Button variant="outline" size="sm" onClick={addDiscount}>
                <Plus className="mr-2 h-4 w-4" />
                Add Discount
              </Button>
            </div>

            {formData.discounts.length > 0 && (
              <div className="space-y-3">
                {formData.discounts.map((discount, index) => (
                  <div key={discount.id} className="p-4 border rounded-lg space-y-3">
                    <div className="grid gap-3 md:grid-cols-4">
                      <div className="space-y-2">
                        <Label>Discount Name</Label>
                        <Input
                          value={discount.name}
                          onChange={(e) => handleDiscountChange(index, "name", e.target.value)}
                          placeholder="e.g., Sibling Discount"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={discount.type}
                          onValueChange={(value) => handleDiscountChange(index, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage</SelectItem>
                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Value</Label>
                        <Input
                          type="number"
                          value={discount.value}
                          onChange={(e) => handleDiscountChange(index, "value", Number(e.target.value))}
                          placeholder={discount.type === "percentage" ? "10" : "5000"}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Action</Label>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-10 w-full text-red-600"
                          onClick={() => removeDiscount(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Conditions</Label>
                      <Input
                        value={discount.conditions}
                        onChange={(e) => handleDiscountChange(index, "conditions", e.target.value)}
                        placeholder="e.g., Applicable for siblings, merit-based, etc."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Plan */}
          <div className="space-y-4">
            <h4 className="font-medium">Payment Plan</h4>
            <div className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowInstallments"
                  checked={formData.paymentPlan.allowInstallments}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      paymentPlan: { ...formData.paymentPlan, allowInstallments: checked },
                    })
                  }
                />
                <Label htmlFor="allowInstallments">Allow Installment Payments</Label>
              </div>

              {formData.paymentPlan.allowInstallments && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Number of Installments</Label>
                    <Select
                      value={formData.paymentPlan.installments.toString()}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          paymentPlan: { ...formData.paymentPlan, installments: Number(value) },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Installments</SelectItem>
                        <SelectItem value="3">3 Installments</SelectItem>
                        <SelectItem value="4">4 Installments</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Final Due Date</Label>
                    <Input
                      type="date"
                      value={formData.paymentPlan.dueDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentPlan: { ...formData.paymentPlan, dueDate: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h4 className="font-medium">Status</h4>
            <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Fee Structure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

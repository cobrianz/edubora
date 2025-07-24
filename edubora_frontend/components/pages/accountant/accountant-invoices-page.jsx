"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Send,
  Download,
  Edit,
  Trash2,
  FileText,
  DollarSign,
} from "lucide-react"

export default function AccountantInvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Sample invoice data
  const invoices = [
    {
      id: "INV-2024-001",
      studentName: "Sarah Mwangi",
      studentId: "STU-001",
      grade: "Grade 7A",
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
      studentName: "John Kiprotich",
      studentId: "STU-002",
      grade: "Grade 6B",
      amount: 42000,
      dueDate: "2024-02-15",
      status: "paid",
      items: [
        { description: "Tuition Fee", amount: 35000 },
        { description: "Activity Fee", amount: 7000 },
      ],
      createdDate: "2024-01-15",
      paidDate: "2024-01-20",
    },
    {
      id: "INV-2024-003",
      studentName: "Grace Wanjiru",
      studentId: "STU-003",
      grade: "Grade 8A",
      amount: 48000,
      dueDate: "2024-02-10",
      status: "overdue",
      items: [
        { description: "Tuition Fee", amount: 35000 },
        { description: "Transport Fee", amount: 8000 },
        { description: "Uniform Fee", amount: 5000 },
      ],
      createdDate: "2024-01-10",
    },
    {
      id: "INV-2024-004",
      studentName: "Michael Ochieng",
      studentId: "STU-004",
      grade: "Grade 5C",
      amount: 40000,
      dueDate: "2024-02-20",
      status: "draft",
      items: [
        { description: "Tuition Fee", amount: 35000 },
        { description: "Library Fee", amount: 5000 },
      ],
      createdDate: "2024-01-18",
    },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { label: "Paid", variant: "default", className: "bg-green-100 text-green-800" },
      pending: { label: "Pending", variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
      overdue: { label: "Overdue", variant: "destructive", className: "bg-red-100 text-red-800" },
      draft: { label: "Draft", variant: "outline", className: "bg-gray-100 text-gray-800" },
    }

    const config = statusConfig[status] || statusConfig.draft
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.studentId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || invoice.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = filteredInvoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const pendingAmount = totalAmount - paidAmount

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice Management</h1>
          <p className="text-muted-foreground">Create, manage, and track student fee invoices</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>Generate a new fee invoice for a student</DialogDescription>
            </DialogHeader>
            <CreateInvoiceForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredInvoices.length}</div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((i) => i.status === "draft").length} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {totalAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all invoices</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KSh {paidAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((paidAmount / totalAmount) * 100)}% collection rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">KSh {pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Outstanding payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Grade</TableHead>
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
                  <TableCell>
                    <div>
                      <div className="font-medium">{invoice.studentName}</div>
                      <div className="text-sm text-muted-foreground">{invoice.studentId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.grade}</TableCell>
                  <TableCell className="font-medium">KSh {invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="mr-2 h-4 w-4" />
                          Send to Parent
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function CreateInvoiceForm({ onClose }) {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [invoiceItems, setInvoiceItems] = useState([{ description: "", amount: 0 }])

  const students = [
    { id: "STU-001", name: "Sarah Mwangi", grade: "Grade 7A" },
    { id: "STU-002", name: "John Kiprotich", grade: "Grade 6B" },
    { id: "STU-003", name: "Grace Wanjiru", grade: "Grade 8A" },
    { id: "STU-004", name: "Michael Ochieng", grade: "Grade 5C" },
  ]

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { description: "", amount: 0 }])
  }

  const removeInvoiceItem = (index) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index))
  }

  const updateInvoiceItem = (index, field, value) => {
    const updated = invoiceItems.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setInvoiceItems(updated)
  }

  const totalAmount = invoiceItems.reduce((sum, item) => sum + (Number.parseFloat(item.amount) || 0), 0)

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="student">Select Student</Label>
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name} - {student.grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input type="date" id="dueDate" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Invoice Items</Label>
            <Button type="button" variant="outline" size="sm" onClick={addInvoiceItem}>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          <div className="space-y-2">
            {invoiceItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateInvoiceItem(index, "description", e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) => updateInvoiceItem(index, "amount", e.target.value)}
                  className="w-32"
                />
                {invoiceItems.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeInvoiceItem(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium">Total Amount:</span>
            <span className="text-lg font-bold">KSh {totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea id="notes" placeholder="Additional notes for this invoice..." rows={3} />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="outline">Save as Draft</Button>
        <Button>Create & Send</Button>
      </div>
    </div>
  )
}

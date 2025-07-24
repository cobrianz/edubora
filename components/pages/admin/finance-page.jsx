"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  Plus,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Eye,
  Edit,
  Download,
  FileText,
  CreditCard,
  Receipt,
  AlertCircle,
  Clock,
  Search,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
} from "recharts"

// Import modals
import FeeStructureModal from "@/components/modals/fee-structure-modal"
import PaymentModal from "@/components/modals/payment-modal"
import InvoiceModal from "@/components/modals/invoice-modal"
import ReceiptModal from "@/components/modals/receipt-modal"
import ReminderModal from "@/components/modals/reminder-modal"
import ExpenseModal from "@/components/modals/expense-modal"
import FinanceReportModal from "@/components/modals/finance-report-modal"

export default function FinancePage() {
  const { toast } = useToast()

  // Modal states
  const [showFeeStructureModal, setShowFeeStructureModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)

  const [selectedFeeStructure, setSelectedFeeStructure] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterGrade, setFilterGrade] = useState("all")

  // Sample data
  const [feeStructures, setFeeStructures] = useState([
    {
      id: 1,
      name: "Grade 6 Fee Structure 2024",
      grade: "Grade 6",
      academicYear: "2024-2025",
      totalAmount: 45000,
      components: [
        { name: "Tuition Fee", amount: 30000, mandatory: true },
        { name: "Activity Fee", amount: 5000, mandatory: true },
        { name: "Transport Fee", amount: 8000, mandatory: false },
        { name: "Lunch Fee", amount: 2000, mandatory: false },
      ],
      paymentSchedule: "Termly",
      isActive: true,
    },
    {
      id: 2,
      name: "Grade 7 Fee Structure 2024",
      grade: "Grade 7",
      academicYear: "2024-2025",
      totalAmount: 48000,
      components: [
        { name: "Tuition Fee", amount: 32000, mandatory: true },
        { name: "Activity Fee", amount: 6000, mandatory: true },
        { name: "Transport Fee", amount: 8000, mandatory: false },
        { name: "Lunch Fee", amount: 2000, mandatory: false },
      ],
      paymentSchedule: "Termly",
      isActive: true,
    },
  ])

  const [payments, setPayments] = useState([
    {
      id: 1,
      studentName: "John Doe",
      admissionNumber: "ADM001",
      grade: "Grade 7A",
      amount: 16000,
      paymentMethod: "Bank Transfer",
      reference: "TXN001234",
      date: "2024-12-15",
      status: "Completed",
      feeType: "Tuition Fee",
      term: "Term 1",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      admissionNumber: "ADM002",
      grade: "Grade 6B",
      amount: 15000,
      paymentMethod: "Cash",
      reference: "CSH001",
      date: "2024-12-14",
      status: "Completed",
      feeType: "Tuition Fee",
      term: "Term 1",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      admissionNumber: "ADM003",
      grade: "Grade 7B",
      amount: 8000,
      paymentMethod: "Mobile Money",
      reference: "MM123456",
      date: "2024-12-13",
      status: "Pending",
      feeType: "Transport Fee",
      term: "Term 1",
    },
  ])

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: "INV-2024-001",
      studentName: "John Doe",
      admissionNumber: "ADM001",
      grade: "Grade 7A",
      totalAmount: 16000,
      paidAmount: 16000,
      balance: 0,
      dueDate: "2024-12-31",
      status: "Paid",
      items: [
        { description: "Tuition Fee - Term 1", amount: 10667 },
        { description: "Activity Fee - Term 1", amount: 2000 },
        { description: "Transport Fee - Term 1", amount: 2667 },
        { description: "Lunch Fee - Term 1", amount: 666 },
      ],
    },
    {
      id: 2,
      invoiceNumber: "INV-2024-002",
      studentName: "Jane Smith",
      admissionNumber: "ADM002",
      grade: "Grade 6B",
      totalAmount: 15000,
      paidAmount: 10000,
      balance: 5000,
      dueDate: "2024-12-25",
      status: "Partial",
      items: [
        { description: "Tuition Fee - Term 1", amount: 10000 },
        { description: "Activity Fee - Term 1", amount: 1667 },
        { description: "Transport Fee - Term 1", amount: 2667 },
        { description: "Lunch Fee - Term 1", amount: 666 },
      ],
    },
  ])

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Teacher Salaries - December",
      category: "Salaries",
      amount: 150000,
      date: "2024-12-01",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      reference: "SAL-DEC-2024",
    },
    {
      id: 2,
      description: "Electricity Bill",
      category: "Utilities",
      amount: 8500,
      date: "2024-12-10",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      reference: "ELEC-001",
    },
    {
      id: 3,
      description: "Learning Materials",
      category: "Academic",
      amount: 25000,
      date: "2024-12-12",
      status: "Pending",
      paymentMethod: "Cheque",
      reference: "CHQ-001",
    },
  ])

  // Analytics data
  const revenueData = [
    { month: "Sep", revenue: 450000, expenses: 320000, profit: 130000 },
    { month: "Oct", revenue: 480000, expenses: 340000, profit: 140000 },
    { month: "Nov", revenue: 520000, expenses: 360000, profit: 160000 },
    { month: "Dec", revenue: 580000, expenses: 380000, profit: 200000 },
  ]

  const feeCollectionData = [
    { grade: "Grade 6", collected: 85, pending: 15 },
    { grade: "Grade 7", collected: 78, pending: 22 },
    { grade: "Grade 8", collected: 92, pending: 8 },
    { grade: "Grade 9", collected: 88, pending: 12 },
  ]

  const paymentMethodData = [
    { name: "Bank Transfer", value: 45, fill: "#3b82f6" },
    { name: "Cash", value: 30, fill: "#10b981" },
    { name: "Mobile Money", value: 20, fill: "#f59e0b" },
    { name: "Cheque", value: 5, fill: "#ef4444" },
  ]

  const expenseCategories = [
    { category: "Salaries", amount: 150000, percentage: 60 },
    { category: "Utilities", amount: 25000, percentage: 10 },
    { category: "Academic", amount: 40000, percentage: 16 },
    { category: "Maintenance", amount: 20000, percentage: 8 },
    { category: "Administration", amount: 15000, percentage: 6 },
  ]

  // Handlers
  const handleCreateFeeStructure = () => {
    setSelectedFeeStructure(null)
    setShowFeeStructureModal(true)
  }

  const handleEditFeeStructure = (structure) => {
    setSelectedFeeStructure(structure)
    setShowFeeStructureModal(true)
  }

  const handleRecordPayment = (student = null) => {
    setSelectedStudent(student)
    setShowPaymentModal(true)
  }

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice)
    setShowInvoiceModal(true)
  }

  const handleGenerateReceipt = (payment) => {
    setSelectedPayment(payment)
    setShowReceiptModal(true)
  }

  const handleSendReminder = () => {
    setShowReminderModal(true)
  }

  const handleAddExpense = () => {
    setShowExpenseModal(true)
  }

  const handleGenerateReport = () => {
    setShowReportModal(true)
  }

  const handleSaveFeeStructure = (structureData) => {
    if (selectedFeeStructure) {
      setFeeStructures(feeStructures.map((s) => (s.id === selectedFeeStructure.id ? { ...s, ...structureData } : s)))
      toast({
        title: "Fee Structure Updated",
        description: `${structureData.name} has been updated successfully`,
      })
    } else {
      const newStructure = {
        id: feeStructures.length + 1,
        ...structureData,
      }
      setFeeStructures([...feeStructures, newStructure])
      toast({
        title: "Fee Structure Created",
        description: `${structureData.name} has been created successfully`,
      })
    }
    setShowFeeStructureModal(false)
  }

  const handleSavePayment = (paymentData) => {
    const newPayment = {
      id: payments.length + 1,
      ...paymentData,
      date: new Date().toISOString().split("T")[0],
    }
    setPayments([...payments, newPayment])
    toast({
      title: "Payment Recorded",
      description: `Payment of KES ${paymentData.amount.toLocaleString()} has been recorded`,
    })
    setShowPaymentModal(false)
  }

  const handleSaveExpense = (expenseData) => {
    const newExpense = {
      id: expenses.length + 1,
      ...expenseData,
      date: new Date().toISOString().split("T")[0],
    }
    setExpenses([...expenses, newExpense])
    toast({
      title: "Expense Added",
      description: `Expense of KES ${expenseData.amount.toLocaleString()} has been recorded`,
    })
    setShowExpenseModal(false)
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || payment.status.toLowerCase() === filterStatus
    const matchesGrade = filterGrade === "all" || payment.grade.toLowerCase().includes(filterGrade.replace("-", " "))
    return matchesSearch && matchesStatus && matchesGrade
  })

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0)
  const totalProfit = totalRevenue - totalExpenses
  const pendingPayments = payments.filter((p) => p.status === "Pending").length
  const completedPayments = payments.filter((p) => p.status === "Completed").length

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance Management</h1>
          <p className="text-muted-foreground">Comprehensive financial management and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={handleSendReminder}>
            <AlertCircle className="mr-2 h-4 w-4" />
            Send Reminders
          </Button>
          <Button onClick={handleCreateFeeStructure}>
            <Plus className="mr-2 h-4 w-4" />
            Fee Structure
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KES {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">KES {totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">KES {totalProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">{completedPayments} completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`KES ${value.toLocaleString()}`, ""]} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Fee Collection by Grade</CardTitle>
            <CardDescription>Collection rates across different grades</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feeCollectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="collected" fill="#10b981" name="Collected %" />
                <Bar dataKey="pending" fill="#ef4444" name="Pending %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment methods used</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown of expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{category.category}</span>
                    <span>
                      KES {category.amount.toLocaleString()} ({category.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${category.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="fee-structures" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="fee-structures">Fee Structures</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="fee-structures">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fee Structures</CardTitle>
                  <CardDescription>Manage fee structures for different grades</CardDescription>
                </div>
                <Button onClick={handleCreateFeeStructure}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Structure
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {feeStructures.map((structure) => (
                  <Card key={structure.id} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{structure.name}</CardTitle>
                        <Badge variant={structure.isActive ? "default" : "secondary"}>
                          {structure.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <CardDescription>
                        {structure.grade} • {structure.academicYear}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Amount:</span>
                          <span className="font-medium">KES {structure.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Components:</span>
                          <span className="font-medium">{structure.components.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Payment Schedule:</span>
                          <span className="font-medium">{structure.paymentSchedule}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditFeeStructure(structure)}
                          className="flex-1"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Records</CardTitle>
                  <CardDescription>Track and manage student payments</CardDescription>
                </div>
                <Button onClick={() => handleRecordPayment()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Record Payment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by student name or admission number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterGrade} onValueChange={setFilterGrade}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="grade-6">Grade 6</SelectItem>
                    <SelectItem value="grade-7">Grade 7</SelectItem>
                    <SelectItem value="grade-8">Grade 8</SelectItem>
                    <SelectItem value="grade-9">Grade 9</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.studentName}</div>
                            <div className="text-sm text-muted-foreground">{payment.admissionNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>{payment.grade}</TableCell>
                        <TableCell className="font-medium">KES {payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{payment.paymentMethod}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              payment.status === "Completed"
                                ? "default"
                                : payment.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleGenerateReceipt(payment)}>
                              <Receipt className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Student Invoices</CardTitle>
                  <CardDescription>Manage student fee invoices and statements</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Paid Amount</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{invoice.studentName}</div>
                            <div className="text-sm text-muted-foreground">{invoice.admissionNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>KES {invoice.totalAmount.toLocaleString()}</TableCell>
                        <TableCell>KES {invoice.paidAmount.toLocaleString()}</TableCell>
                        <TableCell
                          className={invoice.balance > 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}
                        >
                          KES {invoice.balance.toLocaleString()}
                        </TableCell>
                        <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              invoice.status === "Paid"
                                ? "default"
                                : invoice.status === "Partial"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleViewInvoice(invoice)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <CreditCard className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Expense Management</CardTitle>
                  <CardDescription>Track and manage school expenses</CardDescription>
                </div>
                <Button onClick={handleAddExpense}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.map((expense) => (
                      <TableRow key={expense.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{expense.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{expense.category}</Badge>
                        </TableCell>
                        <TableCell>KES {expense.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                        <TableCell>{expense.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge variant={expense.status === "Paid" ? "default" : "secondary"}>{expense.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate comprehensive financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={handleGenerateReport}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Revenue Report</h4>
                        <p className="text-sm text-muted-foreground">Monthly revenue analysis</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={handleGenerateReport}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fee Collection Report</h4>
                        <p className="text-sm text-muted-foreground">Collection status by grade</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={handleGenerateReport}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <TrendingDown className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Expense Report</h4>
                        <p className="text-sm text-muted-foreground">Expense breakdown analysis</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={handleGenerateReport}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
                        <Users className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Student Statement</h4>
                        <p className="text-sm text-muted-foreground">Individual fee statements</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={handleGenerateReport}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Outstanding Fees</h4>
                        <p className="text-sm text-muted-foreground">Pending payment report</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={handleGenerateReport}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                        <Calendar className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Annual Report</h4>
                        <p className="text-sm text-muted-foreground">Comprehensive yearly analysis</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showFeeStructureModal && (
        <FeeStructureModal
          feeStructure={selectedFeeStructure}
          onClose={() => setShowFeeStructureModal(false)}
          onSave={handleSaveFeeStructure}
        />
      )}

      {showPaymentModal && (
        <PaymentModal student={selectedStudent} onClose={() => setShowPaymentModal(false)} onSave={handleSavePayment} />
      )}

      {showInvoiceModal && <InvoiceModal invoice={selectedInvoice} onClose={() => setShowInvoiceModal(false)} />}

      {showReceiptModal && <ReceiptModal payment={selectedPayment} onClose={() => setShowReceiptModal(false)} />}

      {showReminderModal && (
        <ReminderModal
          onClose={() => setShowReminderModal(false)}
          onSend={(reminderData) => {
            toast({
              title: "Reminders Sent",
              description: `Payment reminders sent to ${reminderData.recipients.length} recipients`,
            })
            setShowReminderModal(false)
          }}
        />
      )}

      {showExpenseModal && <ExpenseModal onClose={() => setShowExpenseModal(false)} onSave={handleSaveExpense} />}

      {showReportModal && (
        <FinanceReportModal
          onClose={() => setShowReportModal(false)}
          onGenerate={(reportData) => {
            toast({
              title: "Report Generated",
              description: `${reportData.title} has been generated successfully`,
            })
            setShowReportModal(false)
          }}
        />
      )}
    </div>
  )
}

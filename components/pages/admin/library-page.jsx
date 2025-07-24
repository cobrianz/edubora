"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Users,
  AlertTriangle,
  Settings,
  Bell,
  RotateCcw,
  FileText,
  BarChart3,
  TrendingUp,
  Calendar,
  CheckCircle,
  X,
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
  Cell,
  AreaChart,
  Area,
} from "recharts"

// Import modals
import AddBookModal from "@/components/modals/add-book-modal"
import IssueBookModal from "@/components/modals/issue-book-modal"
import BookDetailsModal from "@/components/modals/book-details-modal"
import RemindModal from "@/components/modals/remind-modal"
import LibraryReportModal from "@/components/modals/library-report-modal"
import LibrarySettingsModal from "@/components/modals/library-settings-modal"

export default function LibraryPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedBook, setSelectedBook] = useState(null)
  const [selectedBorrowRecord, setSelectedBorrowRecord] = useState(null)
  const [modalMode, setModalMode] = useState("view")

  // Modal states
  const [showAddBookModal, setShowAddBookModal] = useState(false)
  const [showIssueBookModal, setShowIssueBookModal] = useState(false)
  const [showBookDetailsModal, setShowBookDetailsModal] = useState(false)
  const [showRemindModal, setShowRemindModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  // Return book inline state
  const [showReturnSection, setShowReturnSection] = useState(false)
  const [returnCondition, setReturnCondition] = useState("Good")
  const [returnNotes, setReturnNotes] = useState("")
  const [lateFee, setLateFee] = useState(0)

  // Sample data
  const [books, setBooks] = useState([
    {
      id: "BK001",
      title: "Mathematics Grade 8",
      author: "John Smith",
      isbn: "978-0-123456-78-9",
      category: "Textbook",
      publisher: "Education Press",
      year: "2023",
      copies: 25,
      available: 18,
      borrowed: 7,
      status: "Available",
      condition: "Good",
      location: "A1-B3",
      price: 1200,
      dateAdded: "2024-01-15",
    },
    {
      id: "BK002",
      title: "English Literature",
      author: "Jane Doe",
      isbn: "978-0-987654-32-1",
      category: "Literature",
      publisher: "Academic Books",
      year: "2022",
      copies: 20,
      available: 15,
      borrowed: 5,
      status: "Available",
      condition: "Excellent",
      location: "B2-C4",
      price: 950,
      dateAdded: "2024-02-10",
    },
    {
      id: "BK003",
      title: "Science Experiments",
      author: "Dr. Wilson",
      isbn: "978-0-456789-01-2",
      category: "Science",
      publisher: "Science World",
      year: "2023",
      copies: 15,
      available: 0,
      borrowed: 15,
      status: "Out of Stock",
      condition: "Good",
      location: "C1-D2",
      price: 1500,
      dateAdded: "2024-01-20",
    },
  ])

  const [borrowRecords, setBorrowRecords] = useState([
    {
      id: "BR001",
      studentId: "ST001",
      studentName: "Alice Johnson",
      studentGrade: "Grade 8A",
      bookId: "BK001",
      bookTitle: "Mathematics Grade 8",
      bookAuthor: "John Smith",
      bookIsbn: "978-0-123456-78-9",
      issueDate: "2024-11-20",
      dueDate: "2024-12-04",
      status: "Active",
    },
    {
      id: "BR002",
      studentId: "ST002",
      studentName: "Bob Wilson",
      studentGrade: "Grade 7B",
      bookId: "BK002",
      bookTitle: "English Literature",
      bookAuthor: "Jane Doe",
      bookIsbn: "978-0-987654-32-1",
      issueDate: "2024-11-15",
      dueDate: "2024-11-29",
      status: "Overdue",
    },
  ])

  const [students] = useState([
    { id: "ST001", name: "Alice Johnson", grade: "Grade 8A", booksIssued: 2 },
    { id: "ST002", name: "Bob Wilson", grade: "Grade 7B", booksIssued: 1 },
    { id: "ST003", name: "Carol Davis", grade: "Grade 6C", booksIssued: 0 },
  ])

  // Chart data
  const borrowingTrendsData = [
    { month: "Jan", borrowed: 45, returned: 42 },
    { month: "Feb", borrowed: 52, returned: 48 },
    { month: "Mar", borrowed: 48, returned: 50 },
    { month: "Apr", borrowed: 61, returned: 55 },
    { month: "May", borrowed: 55, returned: 58 },
    { month: "Jun", borrowed: 67, returned: 62 },
  ]

  const categoryDistributionData = [
    { name: "Textbooks", value: 45, color: "#3b82f6" },
    { name: "Literature", value: 25, color: "#10b981" },
    { name: "Science", value: 15, color: "#f59e0b" },
    { name: "Reference", value: 10, color: "#ef4444" },
    { name: "Others", value: 5, color: "#8b5cf6" },
  ]

  const popularBooksData = [
    { title: "Mathematics Grade 8", borrowed: 25 },
    { title: "English Literature", borrowed: 22 },
    { title: "Science Experiments", borrowed: 20 },
    { title: "History of Kenya", borrowed: 18 },
    { title: "Geography Atlas", borrowed: 15 },
  ]

  const dailyActivityData = [
    { day: "Mon", issued: 12, returned: 8 },
    { day: "Tue", issued: 15, returned: 11 },
    { day: "Wed", issued: 18, returned: 14 },
    { day: "Thu", issued: 14, returned: 16 },
    { day: "Fri", issued: 20, returned: 18 },
    { day: "Sat", issued: 8, returned: 12 },
    { day: "Sun", issued: 5, returned: 7 },
  ]

  // Statistics
  const totalBooks = books.reduce((sum, book) => sum + book.copies, 0)
  const availableBooks = books.reduce((sum, book) => sum + book.available, 0)
  const borrowedBooks = books.reduce((sum, book) => sum + book.borrowed, 0)
  const overdueBooks = borrowRecords.filter((record) => {
    const dueDate = new Date(record.dueDate)
    const today = new Date()
    return today > dueDate && record.status === "Active"
  }).length

  // Handlers
  const handleAddBook = (bookData) => {
    setBooks([...books, bookData])
    setShowAddBookModal(false)
  }

  const handleIssueBook = (issueData) => {
    setBorrowRecords([...borrowRecords, issueData])
    // Update book availability
    setBooks(
      books.map((book) =>
        book.id === issueData.bookId ? { ...book, available: book.available - 1, borrowed: book.borrowed + 1 } : book,
      ),
    )
    setShowIssueBookModal(false)
  }

  const handleReturnBookInline = (record) => {
    setSelectedBorrowRecord(record)
    setShowReturnSection(true)

    // Calculate if book is overdue
    const dueDate = new Date(record.dueDate)
    const today = new Date()
    const isOverdue = today > dueDate
    const daysOverdue = isOverdue ? Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)) : 0
    const calculatedLateFee = isOverdue ? daysOverdue * 10 : 0
    setLateFee(calculatedLateFee)
  }

  const handleProcessReturn = () => {
    if (!selectedBorrowRecord) return

    const returnData = {
      ...selectedBorrowRecord,
      returnDate: new Date().toISOString().split("T")[0],
      returnCondition,
      notes: returnNotes,
      lateFee,
      status: "Returned",
    }

    setBorrowRecords(borrowRecords.map((record) => (record.id === returnData.id ? returnData : record)))

    // Update book availability
    const book = books.find((b) => b.id === returnData.bookId)
    if (book) {
      setBooks(
        books.map((b) =>
          b.id === returnData.bookId ? { ...b, available: b.available + 1, borrowed: b.borrowed - 1 } : b,
        ),
      )
    }

    setShowReturnSection(false)
    setSelectedBorrowRecord(null)
    setReturnCondition("Good")
    setReturnNotes("")
    setLateFee(0)

    toast({
      title: "Book Returned",
      description: `"${returnData.bookTitle}" has been returned successfully`,
    })
  }

  const handleCancelReturn = () => {
    setShowReturnSection(false)
    setSelectedBorrowRecord(null)
    setReturnCondition("Good")
    setReturnNotes("")
    setLateFee(0)
  }

  const handleViewBook = (book) => {
    setSelectedBook(book)
    setModalMode("view")
    setShowBookDetailsModal(true)
  }

  const handleEditBook = (book) => {
    setSelectedBook(book)
    setModalMode("edit")
    setShowBookDetailsModal(true)
  }

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId))
    setShowBookDetailsModal(false)
  }

  const handleSaveBook = (bookData) => {
    setBooks(books.map((book) => (book.id === bookData.id ? bookData : book)))
    setShowBookDetailsModal(false)
  }

  const handleSendReminder = (reminderData) => {
    setShowRemindModal(false)
    // In a real app, this would send actual reminders
  }

  const handleGenerateReport = (reportData) => {
    setShowReportModal(false)
    // In a real app, this would generate and download the report
  }

  const handleSaveSettings = (settingsData) => {
    setShowSettingsModal(false)
    // In a real app, this would save the settings
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "available") return matchesSearch && book.available > 0
    if (selectedFilter === "borrowed") return matchesSearch && book.borrowed > 0
    if (selectedFilter === "out-of-stock") return matchesSearch && book.available === 0

    return matchesSearch && book.category.toLowerCase() === selectedFilter.toLowerCase()
  })

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Management</h1>
          <p className="text-muted-foreground">Manage books, borrowing, and library operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowReportModal(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={() => setShowSettingsModal(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">{books.length} unique titles</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{availableBooks}</div>
            <p className="text-xs text-muted-foreground">Ready to borrow</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borrowed</CardTitle>
            <Users className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{borrowedBooks}</div>
            <p className="text-xs text-muted-foreground">Currently out</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">{overdueBooks}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Borrowing Trends
            </CardTitle>
            <CardDescription>Monthly borrowing and return statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={borrowingTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="borrowed"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="returned"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Category Distribution
            </CardTitle>
            <CardDescription>Books by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Popular Books</CardTitle>
            <CardDescription>Most borrowed books this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={popularBooksData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="title" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="borrowed" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Daily Activity
            </CardTitle>
            <CardDescription>Books issued and returned this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="issued" fill="#3b82f6" name="Issued" />
                <Bar dataKey="returned" fill="#10b981" name="Returned" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Library Management Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Library Operations</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowRemindModal(true)}>
              <Bell className="mr-2 h-4 w-4" />
              Send Reminders
            </Button>
            <Button onClick={() => setShowIssueBookModal(true)}>
              <BookOpen className="mr-2 h-4 w-4" />
              Issue Book
            </Button>
            <Button onClick={() => setShowAddBookModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </div>
        </div>

        {/* Inline Return Book Section */}
        {showReturnSection && selectedBorrowRecord && (
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Return Book
                </CardTitle>
                <CardDescription>Process book return for {selectedBorrowRecord.studentName}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCancelReturn}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Book Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title:</span>
                      <span className="font-medium">{selectedBorrowRecord.bookTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Author:</span>
                      <span>{selectedBorrowRecord.bookAuthor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span>{new Date(selectedBorrowRecord.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Student Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">{selectedBorrowRecord.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grade:</span>
                      <span>{selectedBorrowRecord.studentGrade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Return Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overdue Warning */}
              {(() => {
                const dueDate = new Date(selectedBorrowRecord.dueDate)
                const today = new Date()
                const isOverdue = today > dueDate
                const daysOverdue = isOverdue ? Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)) : 0

                return isOverdue ? (
                  <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <h4 className="font-medium text-red-800 dark:text-red-200">Overdue Book</h4>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      This book is {daysOverdue} day(s) overdue. A late fee of KSh {daysOverdue * 10} will be applied.
                    </p>
                  </div>
                ) : null
              })()}

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="returnCondition">Book Condition</Label>
                  <Select value={returnCondition} onValueChange={setReturnCondition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                      <SelectItem value="Damaged">Damaged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lateFee">Late Fee (KSh)</Label>
                  <Input
                    id="lateFee"
                    type="number"
                    value={lateFee}
                    onChange={(e) => setLateFee(Number(e.target.value))}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="returnNotes">Notes</Label>
                  <Input
                    id="returnNotes"
                    value={returnNotes}
                    onChange={(e) => setReturnNotes(e.target.value)}
                    placeholder="Optional notes"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={handleCancelReturn}>
                  Cancel
                </Button>
                <Button onClick={handleProcessReturn}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Process Return
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="books" className="space-y-4">
          <TabsList>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
            <TabsTrigger value="overdue">Overdue Books</TabsTrigger>
          </TabsList>

          <TabsContent value="books">
            <Card>
              <CardHeader>
                <CardTitle>Book Inventory</CardTitle>
                <CardDescription>Manage your library's book collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Books</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="borrowed">Borrowed</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                        <SelectItem value="textbook">Textbooks</SelectItem>
                        <SelectItem value="literature">Literature</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Borrowed</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell className="font-medium">{book.title}</TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{book.category}</Badge>
                          </TableCell>
                          <TableCell>{book.copies}</TableCell>
                          <TableCell className="text-green-600">{book.available}</TableCell>
                          <TableCell className="text-blue-600">{book.borrowed}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                book.status === "Available"
                                  ? "default"
                                  : book.status === "Out of Stock"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {book.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleViewBook(book)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleEditBook(book)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600"
                                onClick={() => handleDeleteBook(book.id)}
                              >
                                <Trash2 className="h-4 w-4" />
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

          <TabsContent value="borrowed">
            <Card>
              <CardHeader>
                <CardTitle>Currently Borrowed Books</CardTitle>
                <CardDescription>Books that are currently checked out</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Book</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {borrowRecords
                        .filter((record) => record.status === "Active")
                        .map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{record.studentName}</p>
                                <p className="text-sm text-muted-foreground">{record.studentGrade}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{record.bookTitle}</p>
                                <p className="text-sm text-muted-foreground">{record.bookAuthor}</p>
                              </div>
                            </TableCell>
                            <TableCell>{new Date(record.issueDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(record.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant="default">Active</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm" onClick={() => handleReturnBookInline(record)}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Return
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overdue">
            <Card>
              <CardHeader>
                <CardTitle>Overdue Books</CardTitle>
                <CardDescription>Books that are past their due date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Book</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Days Overdue</TableHead>
                        <TableHead>Late Fee</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {borrowRecords
                        .filter((record) => {
                          const dueDate = new Date(record.dueDate)
                          const today = new Date()
                          return today > dueDate && record.status === "Active"
                        })
                        .map((record) => {
                          const dueDate = new Date(record.dueDate)
                          const today = new Date()
                          const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24))
                          const lateFee = daysOverdue * 10 // KSh 10 per day

                          return (
                            <TableRow key={record.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{record.studentName}</p>
                                  <p className="text-sm text-muted-foreground">{record.studentGrade}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{record.bookTitle}</p>
                                  <p className="text-sm text-muted-foreground">{record.bookAuthor}</p>
                                </div>
                              </TableCell>
                              <TableCell>{new Date(record.dueDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <Badge variant="destructive">{daysOverdue} days</Badge>
                              </TableCell>
                              <TableCell className="text-red-600 font-medium">KSh {lateFee}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button variant="outline" size="sm" onClick={() => handleReturnBookInline(record)}>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Return
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showAddBookModal && <AddBookModal onClose={() => setShowAddBookModal(false)} onSave={handleAddBook} />}

      {showIssueBookModal && (
        <IssueBookModal
          books={books}
          students={students}
          onClose={() => setShowIssueBookModal(false)}
          onIssue={handleIssueBook}
        />
      )}

      {showBookDetailsModal && selectedBook && (
        <BookDetailsModal
          book={selectedBook}
          mode={modalMode}
          onClose={() => setShowBookDetailsModal(false)}
          onSave={handleSaveBook}
          onDelete={handleDeleteBook}
        />
      )}

      {showRemindModal && (
        <RemindModal
          borrowRecords={borrowRecords}
          onClose={() => setShowRemindModal(false)}
          onSendReminder={handleSendReminder}
        />
      )}

      {showReportModal && (
        <LibraryReportModal onClose={() => setShowReportModal(false)} onGenerate={handleGenerateReport} />
      )}

      {showSettingsModal && (
        <LibrarySettingsModal onClose={() => setShowSettingsModal(false)} onSave={handleSaveSettings} />
      )}
    </div>
  )
}

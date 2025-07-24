"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, User, Calendar, AlertTriangle, BookOpenCheck } from "lucide-react"

export default function LibrarianIssuePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("student")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)
  const [isIssueDialogOpen, setIsIssueDialogOpen] = useState(false)

  // Sample students data
  const students = [
    {
      id: "STU-001",
      name: "Sarah Mwangi",
      grade: "Grade 7A",
      admissionNumber: "ADM001",
      booksIssued: 2,
      maxBooks: 3,
      status: "active",
    },
    {
      id: "STU-002",
      name: "John Kiprotich",
      grade: "Grade 6B",
      admissionNumber: "ADM002",
      booksIssued: 1,
      maxBooks: 3,
      status: "active",
    },
    {
      id: "STU-003",
      name: "Grace Wanjiru",
      grade: "Grade 8A",
      admissionNumber: "ADM003",
      booksIssued: 3,
      maxBooks: 3,
      status: "maxed",
    },
    {
      id: "STU-004",
      name: "Michael Ochieng",
      grade: "Grade 5C",
      admissionNumber: "ADM004",
      booksIssued: 0,
      maxBooks: 3,
      status: "active",
    },
  ]

  // Sample books data
  const books = [
    {
      id: "BK-001",
      title: "Mathematics for Grade 7",
      author: "Dr. Jane Smith",
      isbn: "978-0123456789",
      category: "Textbook",
      totalCopies: 50,
      availableCopies: 12,
      issuedCopies: 38,
      status: "available",
    },
    {
      id: "BK-002",
      title: "English Literature Anthology",
      author: "Prof. John Doe",
      isbn: "978-0987654321",
      category: "Literature",
      totalCopies: 30,
      availableCopies: 0,
      issuedCopies: 30,
      status: "unavailable",
    },
    {
      id: "BK-003",
      title: "Science Experiments for Kids",
      author: "Dr. Mary Johnson",
      isbn: "978-0456789123",
      category: "Science",
      totalCopies: 25,
      availableCopies: 8,
      issuedCopies: 17,
      status: "available",
    },
    {
      id: "BK-004",
      title: "History of Kenya",
      author: "Prof. David Kimani",
      isbn: "978-0789123456",
      category: "History",
      totalCopies: 40,
      availableCopies: 15,
      issuedCopies: 25,
      status: "available",
    },
  ]

  // Sample recent issues
  const recentIssues = [
    {
      id: "ISS-001",
      studentName: "Sarah Mwangi",
      bookTitle: "Mathematics for Grade 7",
      issueDate: "2024-01-20",
      dueDate: "2024-02-03",
      status: "issued",
    },
    {
      id: "ISS-002",
      studentName: "John Kiprotich",
      bookTitle: "Science Experiments for Kids",
      issueDate: "2024-01-19",
      dueDate: "2024-02-02",
      status: "issued",
    },
    {
      id: "ISS-003",
      studentName: "Grace Wanjiru",
      bookTitle: "History of Kenya",
      issueDate: "2024-01-18",
      dueDate: "2024-02-01",
      status: "overdue",
    },
  ]

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStudentStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Active", className: "bg-green-100 text-green-800" },
      maxed: { label: "Max Books", className: "bg-yellow-100 text-yellow-800" },
      suspended: { label: "Suspended", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status] || statusConfig.active
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const getBookStatusBadge = (status) => {
    const statusConfig = {
      available: { label: "Available", className: "bg-green-100 text-green-800" },
      unavailable: { label: "Unavailable", className: "bg-red-100 text-red-800" },
      limited: { label: "Limited", className: "bg-yellow-100 text-yellow-800" },
    }

    const config = statusConfig[status] || statusConfig.available
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const handleIssueBook = () => {
    if (selectedStudent && selectedBook) {
      // Here you would typically make an API call to issue the book
      console.log("Issuing book:", selectedBook.title, "to student:", selectedStudent.name)
      setIsIssueDialogOpen(false)
      setSelectedStudent(null)
      setSelectedBook(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Issue Books</h1>
          <p className="text-muted-foreground">Issue library books to students</p>
        </div>
        <Dialog open={isIssueDialogOpen} onOpenChange={setIsIssueDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <BookOpenCheck className="mr-2 h-4 w-4" />
              Quick Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Issue Book</DialogTitle>
              <DialogDescription>Select a student and book to issue</DialogDescription>
            </DialogHeader>
            <QuickIssueForm
              students={students}
              books={books.filter((b) => b.status === "available")}
              onIssue={handleIssueBook}
              onClose={() => setIsIssueDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Issued Today</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Books</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{books.reduce((sum, book) => sum + book.availableCopies, 0)}</div>
            <p className="text-xs text-muted-foreground">Across {books.length} titles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Can borrow books</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {recentIssues.filter((i) => i.status === "overdue").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Issue</CardTitle>
            <CardDescription>Find students or books to issue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search Controls */}
            <div className="flex items-center space-x-2">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchType === "student" ? "Search students..." : "Search books..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto space-y-2">
              {searchType === "student"
                ? filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                        selectedStudent?.id === student.id ? "bg-primary/10 border-primary" : ""
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {student.grade} • {student.admissionNumber}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          {getStudentStatusBadge(student.status)}
                          <p className="text-xs text-muted-foreground">
                            {student.booksIssued}/{student.maxBooks} books
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : filteredBooks.map((book) => (
                    <div
                      key={book.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                        selectedBook?.id === book.id ? "bg-primary/10 border-primary" : ""
                      } ${book.status === "unavailable" ? "opacity-50" : ""}`}
                      onClick={() => book.status === "available" && setSelectedBook(book)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{book.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {book.author} • {book.category}
                          </p>
                          <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                        </div>
                        <div className="text-right space-y-1">
                          {getBookStatusBadge(book.status)}
                          <p className="text-xs text-muted-foreground">
                            {book.availableCopies}/{book.totalCopies} available
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Issue Button */}
            {selectedStudent && selectedBook && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="space-y-2">
                  <h4 className="font-medium">Ready to Issue</h4>
                  <p className="text-sm">
                    <strong>Student:</strong> {selectedStudent.name} ({selectedStudent.grade})
                  </p>
                  <p className="text-sm">
                    <strong>Book:</strong> {selectedBook.title}
                  </p>
                  <p className="text-sm">
                    <strong>Due Date:</strong> {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                  <Button className="w-full" onClick={handleIssueBook} disabled={selectedStudent.status === "maxed"}>
                    <BookOpenCheck className="mr-2 h-4 w-4" />
                    Issue Book
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>Books issued in the last few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentIssues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{issue.studentName}</h4>
                    <p className="text-sm text-muted-foreground">{issue.bookTitle}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Issued: {new Date(issue.issueDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Due: {new Date(issue.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={issue.status === "overdue" ? "destructive" : "default"}
                      className={issue.status === "overdue" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
                    >
                      {issue.status === "overdue" ? "Overdue" : "Active"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Book Availability Summary</CardTitle>
          <CardDescription>Current status of library books</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Total Copies</TableHead>
                <TableHead>Available</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.totalCopies}</TableCell>
                  <TableCell className="text-green-600 font-medium">{book.availableCopies}</TableCell>
                  <TableCell className="text-blue-600">{book.issuedCopies}</TableCell>
                  <TableCell>{getBookStatusBadge(book.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function QuickIssueForm({ students, books, onIssue, onClose }) {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedBook, setSelectedBook] = useState("")
  const [dueDate, setDueDate] = useState("")

  // Set default due date to 2 weeks from now
  useState(() => {
    const defaultDue = new Date()
    defaultDue.setDate(defaultDue.getDate() + 14)
    setDueDate(defaultDue.toISOString().split("T")[0])
  }, [])

  const handleSubmit = () => {
    if (selectedStudent && selectedBook) {
      onIssue()
    }
  }

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
              {students
                .filter((s) => s.status === "active")
                .map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name} - {student.grade} ({student.booksIssued}/{student.maxBooks} books)
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="book">Select Book</Label>
          <Select value={selectedBook} onValueChange={setSelectedBook}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a book" />
            </SelectTrigger>
            <SelectContent>
              {books.map((book) => (
                <SelectItem key={book.id} value={book.id}>
                  {book.title} - {book.author} ({book.availableCopies} available)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!selectedStudent || !selectedBook}>
          <BookOpenCheck className="mr-2 h-4 w-4" />
          Issue Book
        </Button>
      </div>
    </div>
  )
}

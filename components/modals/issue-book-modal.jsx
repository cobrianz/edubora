"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, BookOpen, Calendar, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function IssueBookModal({ books, students, onClose, onIssue }) {
  const { toast } = useToast()
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedBook, setSelectedBook] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [studentSearch, setStudentSearch] = useState("")
  const [bookSearch, setBookSearch] = useState("")

  // Set default due date to 2 weeks from now
  useState(() => {
    const defaultDue = new Date()
    defaultDue.setDate(defaultDue.getDate() + 14)
    setDueDate(defaultDue.toISOString().split("T")[0])
  }, [])

  const availableBooks = books.filter((book) => book.available > 0)
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase()),
  )
  const filteredBooks = availableBooks.filter((book) => book.title.toLowerCase().includes(bookSearch.toLowerCase()))

  const selectedStudentData = students.find((s) => s.id === selectedStudent)
  const selectedBookData = availableBooks.find((b) => b.id === selectedBook)

  const handleSubmit = () => {
    if (!selectedStudent || !selectedBook) {
      toast({
        title: "Missing Information",
        description: "Please select both a student and a book",
        variant: "destructive",
      })
      return
    }

    const issueData = {
      id: `ISS${Date.now()}`,
      studentId: selectedStudent,
      studentName: selectedStudentData.name,
      studentGrade: selectedStudentData.grade,
      bookId: selectedBook,
      bookTitle: selectedBookData.title,
      bookAuthor: selectedBookData.author,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate,
      status: "Active",
    }

    onIssue(issueData)
    toast({
      title: "Book Issued",
      description: `"${selectedBookData.title}" has been issued to ${selectedStudentData.name}`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Issue Book
            </CardTitle>
            <CardDescription>Issue a book to a student</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Student Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Student</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-2">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedStudent === student.id
                        ? "bg-primary/10 border-primary border"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                    onClick={() => setSelectedStudent(student.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.grade}</p>
                      </div>
                      <Badge variant="outline">{student.booksIssued || 0}/3 books</Badge>
                    </div>
                  </div>
                ))}
              </div>

              {selectedStudentData && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium mb-2">Selected Student</h4>
                  <p className="text-sm">
                    <strong>Name:</strong> {selectedStudentData.name}
                  </p>
                  <p className="text-sm">
                    <strong>Grade:</strong> {selectedStudentData.grade}
                  </p>
                  <p className="text-sm">
                    <strong>Books Issued:</strong> {selectedStudentData.booksIssued || 0}/3
                  </p>
                </div>
              )}
            </div>

            {/* Book Selection */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Book</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search books..."
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-2">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedBook === book.id ? "bg-primary/10 border-primary border" : "bg-muted hover:bg-muted/80"
                    }`}
                    onClick={() => setSelectedBook(book.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{book.title}</p>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                        <p className="text-xs text-muted-foreground">ISBN: {book.isbn}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{book.category}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{book.available} available</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedBookData && (
                <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium mb-2">Selected Book</h4>
                  <p className="text-sm">
                    <strong>Title:</strong> {selectedBookData.title}
                  </p>
                  <p className="text-sm">
                    <strong>Author:</strong> {selectedBookData.author}
                  </p>
                  <p className="text-sm">
                    <strong>Available:</strong> {selectedBookData.available} copies
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>

          {/* Issue Summary */}
          {selectedStudentData && selectedBookData && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Issue Summary
              </h4>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Student:</span>
                  <span className="font-medium">
                    {selectedStudentData.name} ({selectedStudentData.grade})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Book:</span>
                  <span className="font-medium">{selectedBookData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Issue Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <span className="font-medium">{new Date(dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!selectedStudent || !selectedBook}>
              <BookOpen className="mr-2 h-4 w-4" />
              Issue Book
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

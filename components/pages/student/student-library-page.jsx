"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Search, Eye, RefreshCw, Calendar, Clock, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import BookViewModal from "@/components/modals/book-view-modal"

export default function StudentLibraryPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showBookModal, setShowBookModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  const [availableBooks, setAvailableBooks] = useState([
    {
      id: "BK001",
      title: "Mathematics for Grade 7",
      author: "Dr. John Kamau",
      isbn: "978-9966-25-123-4",
      category: "Textbook",
      copies: 45,
      available: 38,
      borrowed: 7,
      status: "Available",
      publisher: "Kenya Literature Bureau",
      year: 2023,
      description: "A comprehensive textbook covering all topics for Grade 7 Mathematics.",
    },
    {
      id: "BK002",
      title: "English Grammar Essentials",
      author: "Mary Wanjiku",
      isbn: "978-9966-25-124-1",
      category: "Reference",
      copies: 30,
      available: 25,
      borrowed: 5,
      status: "Available",
      publisher: "East African Publishers",
      year: 2022,
      description: "An essential guide to English grammar rules and usage for students.",
    },
    {
      id: "BK003",
      title: "Kenyan History",
      author: "Prof. Peter Mwangi",
      isbn: "978-9966-25-125-8",
      category: "History",
      copies: 25,
      available: 0,
      borrowed: 25,
      status: "Out of Stock",
      publisher: "University of Nairobi Press",
      year: 2021,
      description: "A detailed account of Kenyan history from pre-colonial times to the present.",
    },
  ])

  const [borrowedBooks, setBorrowedBooks] = useState([
    {
      id: "BR001",
      title: "Mathematics for Grade 7",
      author: "Dr. John Kamau",
      borrowDate: "2024-07-01",
      dueDate: "2024-07-15",
      status: "Overdue",
      renewals: 1,
      maxRenewals: 2,
      isbn: "978-9966-25-123-4", // Added for consistency with BookViewModal
      category: "Textbook",
      publisher: "Kenya Literature Bureau",
      year: 2023,
      description: "A comprehensive textbook covering all topics for Grade 7 Mathematics.",
      copies: 45,
      available: 38,
      borrowed: 7, // Added for consistency
    },
    {
      id: "BR002",
      title: "Science Experiments for Kids",
      author: "Dr. Grace Achieng",
      borrowDate: "2024-07-10",
      dueDate: "2024-07-24",
      status: "Active",
      renewals: 0,
      maxRenewals: 2,
      isbn: "978-1234-56-789-0", // Added for consistency
      category: "Science",
      publisher: "Children's Books Inc.",
      year: 2020,
      description: "Fun and educational science experiments for young learners.",
      copies: 20,
      available: 15,
      borrowed: 5, // Added for consistency
    },
  ])

  const [readingList, setReadingList] = useState([
    {
      id: "RL001",
      title: "The River and the Source",
      author: "Margaret Ogola",
      category: "Literature",
      priority: "High",
      addedDate: "2024-07-01",
    },
    {
      id: "RL002",
      title: "Weep Not Child",
      author: "Ngugi wa Thiong'o",
      category: "Literature",
      priority: "Medium",
      addedDate: "2024-07-05",
    },
  ])

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "textbook", label: "Textbooks" },
    { value: "reference", label: "Reference" },
    { value: "fiction", label: "Fiction" },
    { value: "history", label: "History" },
    { value: "science", label: "Science" },
    { value: "literature", label: "Literature" }, // Added for reading list consistency
  ]

  const filteredBooks = availableBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || book.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleViewBook = (book) => {
    setSelectedBook(book)
    setShowBookModal(true)
  }

  const handleRenewBook = (bookId) => {
    setBorrowedBooks(
      borrowedBooks.map((book) =>
        book.id === bookId ? { ...book, renewals: book.renewals + 1, dueDate: "2024-08-07", status: "Active" } : book,
      ),
    )
    toast({
      title: "Book Renewed",
      description: "Your book has been renewed for 2 more weeks",
    })
  }

  const handleRequestBook = (book) => {
    toast({
      title: "Book Requested",
      description: `Your request for "${book.title}" has been submitted`,
    })
  }

  const handleAddToReadingList = (book) => {
    const newItem = {
      id: `RL${Date.now()}`,
      title: book.title,
      author: book.author,
      category: book.category,
      priority: "Medium",
      addedDate: new Date().toISOString().split("T")[0],
    }
    setReadingList([...readingList, newItem])
    toast({
      title: "Added to Reading List",
      description: `"${book.title}" has been added to your reading list`,
    })
  }

  const handleRemoveFromReadingList = (id) => {
    setReadingList(readingList.filter((item) => item.id !== id))
    toast({
      title: "Removed from List",
      description: "Book removed from your reading list.",
    })
  }

  const handleDownloadReport = () => {
    toast({
      title: "Download Started",
      description: "Your library report is being generated...",
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library</h1>
          <p className="text-muted-foreground">Browse books, manage borrowings, and track your reading</p>
        </div>
        <Button onClick={handleDownloadReport} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Borrowed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{borrowedBooks.length}</div>
            <p className="text-xs text-muted-foreground">Currently checked out</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {borrowedBooks.filter((book) => book.status === "Overdue").length}
            </div>
            <p className="text-xs text-muted-foreground">Need to return</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reading List</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readingList.length}</div>
            <p className="text-xs text-muted-foreground">Books to read</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Books</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {availableBooks.filter((book) => book.available > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">Ready to borrow</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="browse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="browse">Browse Books</TabsTrigger>
          <TabsTrigger value="borrowed">My Books</TabsTrigger>
          <TabsTrigger value="reading-list">Reading List</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <Card>
            <CardHeader>
              <CardTitle>Available Books</CardTitle>
              <CardDescription>Browse and borrow books from the library</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Available</TableHead>
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
                        <TableCell>
                          <span className={book.available > 0 ? "text-green-600" : "text-red-600"}>
                            {book.available}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={book.status === "Available" ? "default" : "destructive"}>{book.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleViewBook(book)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleAddToReadingList(book)}>
                              Add to List
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
              <CardTitle>My Borrowed Books</CardTitle>
              <CardDescription>Manage your currently borrowed books</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Borrowed Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowedBooks.map((book) => (
                      <TableRow key={book.id}>
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.borrowDate}</TableCell>
                        <TableCell>{book.dueDate}</TableCell>
                        <TableCell>
                          <Badge variant={book.status === "Overdue" ? "destructive" : "default"}>{book.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRenewBook(book.id)}
                              disabled={book.renewals >= book.maxRenewals}
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Renew ({book.renewals}/{book.maxRenewals})
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleViewBook(book)}>
                              <Eye className="h-4 w-4" />
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

        <TabsContent value="reading-list">
          <Card>
            <CardHeader>
              <CardTitle>My Reading List</CardTitle>
              <CardDescription>Books you want to read</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Added Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {readingList.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.author}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.priority === "High" ? "destructive" : "secondary"}>
                            {item.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.addedDate}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveFromReadingList(item.id)}>
                            Remove
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

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Borrowing History</CardTitle>
              <CardDescription>Your past book borrowings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your borrowing history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Book View Modal */}
      {showBookModal && (
        <BookViewModal book={selectedBook} onClose={() => setShowBookModal(false)} userRole="student" />
      )}
    </div>
  )
}

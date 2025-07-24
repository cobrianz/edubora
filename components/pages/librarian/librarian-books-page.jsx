"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Plus, Search, Eye, Edit, Trash2, Library, Users, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function LibrarianBooksPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")

  const books = [
    {
      id: 1,
      title: "Mathematics Grade 7",
      author: "Kenya Institute of Education",
      isbn: "978-9966-25-123-4",
      category: "Textbook",
      copies: 45,
      available: 38,
      borrowed: 7,
      status: "Available",
    },
    {
      id: 2,
      title: "English Literature Anthology",
      author: "Various Authors",
      isbn: "978-9966-25-456-7",
      category: "Literature",
      copies: 30,
      available: 25,
      borrowed: 5,
      status: "Available",
    },
    {
      id: 3,
      title: "Science Experiments for Kids",
      author: "Dr. Jane Smith",
      isbn: "978-9966-25-789-0",
      category: "Reference",
      copies: 20,
      available: 15,
      borrowed: 5,
      status: "Available",
    },
    {
      id: 4,
      title: "Kenyan History",
      author: "Prof. John Doe",
      isbn: "978-9966-25-012-3",
      category: "History",
      copies: 25,
      available: 0,
      borrowed: 25,
      status: "Out of Stock",
    },
  ]

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm),
  )

  const handleAddBook = () => {
    toast({
      title: "Add New Book",
      description: "Opening book registration form...",
    })
  }

  const handleViewBook = (book) => {
    toast({
      title: "Book Details",
      description: `Viewing details for "${book.title}"`,
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Management</h1>
          <p className="text-muted-foreground">Manage library books and inventory</p>
        </div>
        <Button
          onClick={handleAddBook}
          className="transition-all duration-300 hover:scale-105 bg-slate-blue hover:bg-slate-blue/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Book
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-slate-blue/10 border-slate-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-slate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-blue">2,847</div>
            <p className="text-xs text-muted-foreground">In collection</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-light-green/10 border-light-green/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Library className="h-4 w-4 text-light-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-light-green">2,391</div>
            <p className="text-xs text-muted-foreground">Ready to borrow</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Borrowed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">Currently out</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Book Inventory</CardTitle>
          <CardDescription>Manage your library collection</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Books</TabsTrigger>
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>

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
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>ISBN</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Copies</TableHead>
                      <TableHead>Available</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBooks.map((book) => (
                      <TableRow key={book.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{book.category}</Badge>
                        </TableCell>
                        <TableCell>{book.copies}</TableCell>
                        <TableCell>
                          <span
                            className={book.available > 0 ? "text-light-green font-medium" : "text-red-600 font-medium"}
                          >
                            {book.available}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={book.status === "Available" ? "default" : "destructive"}>{book.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleViewBook(book)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 transition-all duration-300 hover:scale-110"
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
            </TabsContent>

            <TabsContent value="available">
              <div className="text-center py-8">
                <Library className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Available books will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="borrowed">
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Currently borrowed books will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="overdue">
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Overdue books will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, BookOpen, User, Calendar, RefreshCw, Download, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function BookViewModal({ book, onClose, userRole = "student" }) {
  const { toast } = useToast()

  if (!book) return null

  const handleBorrowBook = () => {
    toast({
      title: "Borrow Request Sent",
      description: `Your request to borrow "${book.title}" has been sent.`,
    })
    // In a real app, this would send a request to the library system
    onClose()
  }

  const handleRenewBook = () => {
    toast({
      title: "Book Renewed",
      description: `"${book.title}" has been renewed for 2 more weeks.`,
    })
    // In a real app, this would update the borrowing record
    onClose()
  }

  const handleAddToReadingList = () => {
    toast({
      title: "Added to Reading List",
      description: `"${book.title}" has been added to your reading list.`,
    })
    // In a real app, this would add to user's reading list
    onClose()
  }

  const handleDownloadSample = () => {
    toast({
      title: "Download Started",
      description: `Downloading sample for "${book.title}"...`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {book.title}
            </CardTitle>
            <CardDescription>Details about this book</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Book Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Author:</span>
                  <span className="text-sm font-medium flex items-center gap-1">
                    <User className="h-4 w-4" /> {book.author}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <Badge variant="outline">{book.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ISBN:</span>
                  <span className="text-sm font-medium">{book.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Publisher:</span>
                  <span className="text-sm font-medium">{book.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Year:</span>
                  <span className="text-sm font-medium">{book.year}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Availability & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Copies:</span>
                  <span className="text-sm font-medium">{book.copies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Available Copies:</span>
                  <span className={`text-sm font-medium ${book.available > 0 ? "text-green-600" : "text-red-600"}`}>
                    {book.available}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Borrowed Copies:</span>
                  <span className="text-sm font-medium">{book.borrowed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant={book.status === "Available" ? "default" : "destructive"}>{book.status}</Badge>
                </div>
                {book.dueDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due Date: {book.dueDate}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {book.description || "No detailed description available for this book."}
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            {userRole === "student" && (
              <>
                {book.status === "Available" && <Button onClick={handleBorrowBook}>Borrow Book</Button>}
                {book.status === "Overdue" && ( // Assuming book object might have this status if it's a borrowed book
                  <Button variant="outline" onClick={handleRenewBook}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Renew Book
                  </Button>
                )}
                <Button variant="outline" onClick={handleAddToReadingList}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Reading List
                </Button>
                <Button variant="outline" onClick={handleDownloadSample}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Sample
                </Button>
              </>
            )}
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

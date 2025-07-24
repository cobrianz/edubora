"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, BookOpen, Edit, Trash2, Calendar, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BookDetailsModal({ book, mode = "view", onClose, onSave, onDelete }) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(mode === "edit")
  const [formData, setFormData] = useState(book || {})

  const categories = [
    "Textbook",
    "Reference",
    "Fiction",
    "Non-Fiction",
    "Science",
    "Mathematics",
    "History",
    "Literature",
    "Biography",
    "Children's Books",
    "Educational",
    "Technical",
  ]

  const conditions = ["New", "Good", "Fair", "Poor", "Damaged"]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!formData.title || !formData.author || !formData.isbn) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    onSave(formData)
    toast({
      title: "Book Updated",
      description: `"${formData.title}" has been updated successfully`,
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      onDelete(book.id)
      toast({
        title: "Book Deleted",
        description: `"${book.title}" has been removed from the library`,
      })
    }
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
    if (isEditing) {
      setFormData(book) // Reset form data if canceling edit
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {isEditing ? "Edit Book" : "Book Details"}
            </CardTitle>
            <CardDescription>
              {isEditing ? "Update book information" : "View detailed book information"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button variant="outline" size="icon" onClick={toggleEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleDelete} className="text-red-600 bg-transparent">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  {isEditing ? (
                    <Input
                      id="title"
                      value={formData.title || ""}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded">{book.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  {isEditing ? (
                    <Input
                      id="author"
                      value={formData.author || ""}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded">{book.author}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="isbn">ISBN</Label>
                  {isEditing ? (
                    <Input
                      id="isbn"
                      value={formData.isbn || ""}
                      onChange={(e) => handleInputChange("isbn", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded font-mono">{book.isbn}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  {isEditing ? (
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2">
                      <Badge variant="outline">{book.category}</Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publisher">Publisher</Label>
                  {isEditing ? (
                    <Input
                      id="publisher"
                      value={formData.publisher || ""}
                      onChange={(e) => handleInputChange("publisher", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded">{book.publisher}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Publication Year</Label>
                  {isEditing ? (
                    <Input
                      id="year"
                      type="number"
                      value={formData.year || ""}
                      onChange={(e) => handleInputChange("year", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded">{book.year}</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edition">Edition</Label>
                  {isEditing ? (
                    <Input
                      id="edition"
                      value={formData.edition || ""}
                      onChange={(e) => handleInputChange("edition", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded">{book.edition || "N/A"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  {isEditing ? (
                    <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Swahili">Swahili</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="p-2 bg-muted rounded">{book.language || "English"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pages">Pages</Label>
                  {isEditing ? (
                    <Input
                      id="pages"
                      type="number"
                      value={formData.pages || ""}
                      onChange={(e) => handleInputChange("pages", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded">{book.pages || "N/A"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Shelf Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={formData.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  ) : (
                    <div className="p-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{book.location || "Not assigned"}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                {isEditing ? (
                  <Textarea
                    id="description"
                    value={formData.description || ""}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                  />
                ) : (
                  <p className="p-2 bg-muted rounded min-h-[100px]">{book.description || "No description available"}</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Total Copies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={formData.copies || ""}
                        onChange={(e) => handleInputChange("copies", e.target.value)}
                      />
                    ) : (
                      <p className="text-2xl font-bold">{book.copies || 0}</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Available</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-600">{book.available || 0}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Borrowed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">{book.borrowed || 0}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  {isEditing ? (
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2">
                      <Badge
                        variant={
                          book.condition === "New" || book.condition === "Good"
                            ? "default"
                            : book.condition === "Fair"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {book.condition || "Good"}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (KSh)</Label>
                  {isEditing ? (
                    <Input
                      id="price"
                      type="number"
                      value={formData.price || ""}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-muted rounded">KSh {book.price || "0"}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <div className="p-2">
                  <Badge variant={book.status === "Available" ? "default" : "destructive"}>
                    {book.status || "Available"}
                  </Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Added on: {book.dateAdded ? new Date(book.dateAdded).toLocaleDateString() : "Unknown"}
                  </span>
                </div>

                <div className="space-y-2">
                  <Label>Recent Activity</Label>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">Book added to library</p>
                      <p className="text-xs text-muted-foreground">
                        {book.dateAdded ? new Date(book.dateAdded).toLocaleDateString() : "Date unknown"}
                      </p>
                    </div>
                    {book.borrowed > 0 && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <p className="text-sm">Currently borrowed by {book.borrowed} student(s)</p>
                        <p className="text-xs text-muted-foreground">Active borrowings</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Borrowing Statistics</Label>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Total Borrowings</p>
                      <p className="text-2xl font-bold">{book.totalBorrowings || 0}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Average Rating</p>
                      <p className="text-2xl font-bold">{book.rating || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-6 border-t">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={toggleEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

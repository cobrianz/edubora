"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, BookOpen, Calendar, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReturnBookModal({ borrowRecord, onClose, onReturn }) {
  const { toast } = useToast()
  const [returnCondition, setReturnCondition] = useState("Good")
  const [notes, setNotes] = useState("")
  const [lateFee, setLateFee] = useState(0)

  const conditions = ["Excellent", "Good", "Fair", "Poor", "Damaged"]

  // Calculate if book is overdue
  const dueDate = new Date(borrowRecord.dueDate)
  const today = new Date()
  const isOverdue = today > dueDate
  const daysOverdue = isOverdue ? Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24)) : 0

  // Calculate late fee (KSh 10 per day)
  const calculatedLateFee = isOverdue ? daysOverdue * 10 : 0

  useState(() => {
    setLateFee(calculatedLateFee)
  }, [calculatedLateFee])

  const handleReturn = () => {
    const returnData = {
      ...borrowRecord,
      returnDate: new Date().toISOString().split("T")[0],
      returnCondition,
      notes,
      lateFee,
      status: "Returned",
    }

    onReturn(returnData)
    toast({
      title: "Book Returned",
      description: `"${borrowRecord.bookTitle}" has been returned successfully`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-2xl animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Return Book
            </CardTitle>
            <CardDescription>Process book return and update records</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Book and Student Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Book Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="font-medium">{borrowRecord.bookTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Author:</span>
                  <span>{borrowRecord.bookAuthor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="font-mono">{borrowRecord.bookIsbn}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Student Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{borrowRecord.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Grade:</span>
                  <span>{borrowRecord.studentGrade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Student ID:</span>
                  <span>{borrowRecord.studentId}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Borrowing Details */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Borrowing Details
            </h4>
            <div className="grid gap-2 md:grid-cols-3 text-sm">
              <div>
                <span className="text-muted-foreground">Issue Date:</span>
                <p className="font-medium">{new Date(borrowRecord.issueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Due Date:</span>
                <p className="font-medium">{new Date(borrowRecord.dueDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Return Date:</span>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Overdue Warning */}
          {isOverdue && (
            <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <h4 className="font-medium text-red-800 dark:text-red-200">Overdue Book</h4>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300">
                This book is {daysOverdue} day(s) overdue. A late fee of KSh {calculatedLateFee} will be applied.
              </p>
            </div>
          )}

          {/* Return Condition */}
          <div className="space-y-2">
            <Label htmlFor="condition">Book Condition on Return</Label>
            <Select value={returnCondition} onValueChange={setReturnCondition}>
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
          </div>

          {/* Late Fee */}
          {isOverdue && (
            <div className="space-y-2">
              <Label htmlFor="lateFee">Late Fee (KSh)</Label>
              <Input
                id="lateFee"
                type="number"
                value={lateFee}
                onChange={(e) => setLateFee(Number(e.target.value))}
                min="0"
              />
              <p className="text-xs text-muted-foreground">Calculated at KSh 10 per day overdue. Adjust if needed.</p>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Return Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about the book condition or return process..."
              rows={3}
            />
          </div>

          {/* Return Summary */}
          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Return Summary
            </h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span>Book:</span>
                <span className="font-medium">{borrowRecord.bookTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>Student:</span>
                <span className="font-medium">{borrowRecord.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span>Return Condition:</span>
                <Badge
                  variant={
                    returnCondition === "Excellent" || returnCondition === "Good"
                      ? "default"
                      : returnCondition === "Fair"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {returnCondition}
                </Badge>
              </div>
              {isOverdue && (
                <div className="flex justify-between">
                  <span>Late Fee:</span>
                  <span className="font-medium text-red-600">KSh {lateFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge variant="default">Ready to Return</Badge>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleReturn}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Process Return
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

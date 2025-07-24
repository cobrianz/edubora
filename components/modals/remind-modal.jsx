"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Bell, Mail, MessageSquare, Phone, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RemindModal({ borrowRecords = [], onClose, onSendReminder }) {
  const { toast } = useToast()
  const [selectedRecords, setSelectedRecords] = useState([])
  const [reminderType, setReminderType] = useState("email")
  const [message, setMessage] = useState("")
  const [reminderTemplate, setReminderTemplate] = useState("overdue")

  const reminderTypes = [
    { value: "email", label: "Email", icon: Mail },
    { value: "sms", label: "SMS", icon: MessageSquare },
    { value: "call", label: "Phone Call", icon: Phone },
    { value: "all", label: "All Methods", icon: Bell },
  ]

  const templates = {
    overdue: `Dear [STUDENT_NAME],

This is a friendly reminder that the following book is overdue:

Book: [BOOK_TITLE]
Due Date: [DUE_DATE]
Days Overdue: [DAYS_OVERDUE]

Please return the book as soon as possible to avoid additional late fees.

Thank you,
School Library`,

    due_soon: `Dear [STUDENT_NAME],

This is a reminder that the following book is due soon:

Book: [BOOK_TITLE]
Due Date: [DUE_DATE]

Please return the book on time to avoid late fees.

Thank you,
School Library`,

    custom: "",
  }

  // Filter overdue records
  const overdueRecords = borrowRecords.filter((record) => {
    const dueDate = new Date(record.dueDate)
    const today = new Date()
    return today > dueDate && record.status === "Active"
  })

  // Filter due soon records (due within 3 days)
  const dueSoonRecords = borrowRecords.filter((record) => {
    const dueDate = new Date(record.dueDate)
    const today = new Date()
    const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    return dueDate <= threeDaysFromNow && dueDate > today && record.status === "Active"
  })

  useState(() => {
    setMessage(templates[reminderTemplate])
  }, [reminderTemplate])

  const handleRecordSelection = (recordId, checked) => {
    if (checked) {
      setSelectedRecords([...selectedRecords, recordId])
    } else {
      setSelectedRecords(selectedRecords.filter((id) => id !== recordId))
    }
  }

  const handleSelectAll = (records, checked) => {
    if (checked) {
      const recordIds = records.map((record) => record.id)
      setSelectedRecords([...new Set([...selectedRecords, ...recordIds])])
    } else {
      const recordIds = records.map((record) => record.id)
      setSelectedRecords(selectedRecords.filter((id) => !recordIds.includes(id)))
    }
  }

  const handleSendReminder = () => {
    if (selectedRecords.length === 0) {
      toast({
        title: "No Records Selected",
        description: "Please select at least one borrowing record",
        variant: "destructive",
      })
      return
    }

    if (!message.trim()) {
      toast({
        title: "No Message",
        description: "Please enter a reminder message",
        variant: "destructive",
      })
      return
    }

    const reminderData = {
      recordIds: selectedRecords,
      type: reminderType,
      message,
      sentDate: new Date().toISOString(),
    }

    onSendReminder(reminderData)
    toast({
      title: "Reminders Sent",
      description: `${selectedRecords.length} reminder(s) sent successfully via ${reminderType}`,
    })
  }

  const getDaysOverdue = (dueDate) => {
    const due = new Date(dueDate)
    const today = new Date()
    return Math.ceil((today - due) / (1000 * 60 * 60 * 24))
  }

  const getDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate)
    const today = new Date()
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Send Reminders
            </CardTitle>
            <CardDescription>Send return reminders to students with overdue or due soon books</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Overdue Books */}
          {overdueRecords.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-red-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Overdue Books ({overdueRecords.length})
                </h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all-overdue"
                    checked={overdueRecords.every((record) => selectedRecords.includes(record.id))}
                    onCheckedChange={(checked) => handleSelectAll(overdueRecords, checked)}
                  />
                  <Label htmlFor="select-all-overdue" className="text-sm">
                    Select All
                  </Label>
                </div>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {overdueRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <Checkbox
                      id={`record-${record.id}`}
                      checked={selectedRecords.includes(record.id)}
                      onCheckedChange={(checked) => handleRecordSelection(record.id, checked)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{record.studentName}</p>
                          <p className="text-sm text-muted-foreground">{record.bookTitle}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="destructive">{getDaysOverdue(record.dueDate)} days overdue</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Due: {new Date(record.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Due Soon Books */}
          {dueSoonRecords.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-yellow-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Due Soon ({dueSoonRecords.length})
                </h4>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all-due-soon"
                    checked={dueSoonRecords.every((record) => selectedRecords.includes(record.id))}
                    onCheckedChange={(checked) => handleSelectAll(dueSoonRecords, checked)}
                  />
                  <Label htmlFor="select-all-due-soon" className="text-sm">
                    Select All
                  </Label>
                </div>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {dueSoonRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                  >
                    <Checkbox
                      id={`record-${record.id}`}
                      checked={selectedRecords.includes(record.id)}
                      onCheckedChange={(checked) => handleRecordSelection(record.id, checked)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{record.studentName}</p>
                          <p className="text-sm text-muted-foreground">{record.bookTitle}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">Due in {getDaysUntilDue(record.dueDate)} days</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Due: {new Date(record.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Records */}
          {overdueRecords.length === 0 && dueSoonRecords.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No overdue or due soon books found</p>
            </div>
          )}

          {/* Reminder Configuration */}
          {(overdueRecords.length > 0 || dueSoonRecords.length > 0) && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reminderType">Reminder Method</Label>
                  <Select value={reminderType} onValueChange={setReminderType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reminderTypes.map((type) => {
                        const Icon = type.icon
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Message Template</Label>
                  <Select value={reminderTemplate} onValueChange={setReminderTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overdue">Overdue Reminder</SelectItem>
                      <SelectItem value="due_soon">Due Soon Reminder</SelectItem>
                      <SelectItem value="custom">Custom Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Reminder Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your reminder message..."
                  rows={8}
                />
                <p className="text-xs text-muted-foreground">
                  Use placeholders: [STUDENT_NAME], [BOOK_TITLE], [DUE_DATE], [DAYS_OVERDUE]
                </p>
              </div>

              {/* Selected Summary */}
              {selectedRecords.length > 0 && (
                <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-medium mb-2">Reminder Summary</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <strong>Recipients:</strong> {selectedRecords.length} student(s)
                    </p>
                    <p>
                      <strong>Method:</strong> {reminderTypes.find((t) => t.value === reminderType)?.label}
                    </p>
                    <p>
                      <strong>Template:</strong>{" "}
                      {reminderTemplate === "overdue"
                        ? "Overdue Reminder"
                        : reminderTemplate === "due_soon"
                          ? "Due Soon Reminder"
                          : "Custom Message"}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSendReminder} disabled={selectedRecords.length === 0}>
                  <Bell className="mr-2 h-4 w-4" />
                  Send Reminders ({selectedRecords.length})
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

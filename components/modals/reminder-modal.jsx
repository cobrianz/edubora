"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Bell, Mail, MessageSquare, Phone, Send, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ReminderModal({ students = [], onClose, onSendReminder }) {
  const { toast } = useToast()
  const [selectedStudents, setSelectedStudents] = useState([])
  const [reminderType, setReminderType] = useState("email")
  const [message, setMessage] = useState("")
  const [subject, setSubject] = useState("")
  const [template, setTemplate] = useState("overdue")
  const [scheduleReminder, setScheduleReminder] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")

  const reminderTypes = [
    { value: "email", label: "Email", icon: Mail, description: "Send email to parents" },
    { value: "sms", label: "SMS", icon: MessageSquare, description: "Send text message" },
    { value: "call", label: "Phone Call", icon: Phone, description: "Schedule phone call" },
    { value: "all", label: "All Methods", icon: Bell, description: "Email, SMS, and call" },
  ]

  const templates = {
    overdue: {
      subject: "Overdue Fee Payment Reminder",
      message: `
  ]

  const templates = {
    overdue: {
      subject: "Overdue Fee Payment Reminder",
      message: \`Dear Parent/Guardian,

This is a friendly reminder that your child's school fees are overdue.

Student: [STUDENT_NAME]
Admission No: [ADMISSION_NO]
Outstanding Amount: KSh [AMOUNT]
Due Date: [DUE_DATE]

Please make the payment as soon as possible to avoid any inconvenience.

Thank you for your cooperation.

Best regards,
Finance Office
CBC Primary School`,
    },
    gentle: {
      subject: "Fee Payment Reminder",
      message: `Dear Parent/Guardian,

We hope this message finds you well.

This is a gentle reminder regarding the school fees for [STUDENT_NAME] (Admission No: [ADMISSION_NO]).

Outstanding Balance: KSh [AMOUNT]

We understand that circumstances may vary, and we're here to help. Please contact our finance office if you need to discuss payment arrangements.

Thank you for your continued support.

Warm regards,
Finance Team`,
    },
    urgent: {
      subject: "URGENT: Fee Payment Required",
      message: `Dear Parent/Guardian,

URGENT NOTICE: School fees for [STUDENT_NAME] are significantly overdue.

Student Details:
- Name: [STUDENT_NAME]
- Admission No: [ADMISSION_NO]
- Outstanding Amount: KSh [AMOUNT]
- Days Overdue: [DAYS_OVERDUE]

Immediate payment is required to avoid suspension of services. Please contact the finance office immediately.

Finance Office
CBC Primary School
Phone: +254 700 123 456`,
    },
    custom: {
      subject: "",
      message: "",
    },
  }

  const handleStudentSelection = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId])
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
    }
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(students.map((s) => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleTemplateChange = (templateKey) => {
    setTemplate(templateKey)
    const selectedTemplate = templates[templateKey]
    setSubject(selectedTemplate.subject)
    setMessage(selectedTemplate.message)
  }

  const handleSendReminder = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No Students Selected",
        description: "Please select at least one student",
        variant: "destructive",
      })
      return
    }

    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both subject and message",
        variant: "destructive",
      })
      return
    }

    const reminderData = {
      id: `REM${Date.now()}`,
      studentIds: selectedStudents,
      type: reminderType,
      subject,
      message,
      scheduled: scheduleReminder,
      scheduleDate: scheduleReminder ? scheduleDate : null,
      sentDate: scheduleReminder ? null : new Date().toISOString(),
      status: scheduleReminder ? "Scheduled" : "Sent",
    }

    onSendReminder(reminderData)
    toast({
      title: scheduleReminder ? "Reminder Scheduled" : "Reminders Sent",
      description: `${selectedStudents.length} reminder(s) ${scheduleReminder ? "scheduled" : "sent"} successfully`,
    })
  }

  const getSelectedStudentsData = () => {
    return students.filter((s) => selectedStudents.includes(s.id))
  }

  const getTotalOutstanding = () => {
    return getSelectedStudentsData().reduce((total, student) => total + (student.balance || 0), 0)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Send Payment Reminders
            </CardTitle>
            <CardDescription>Send payment reminders to parents/guardians</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Student Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Select Students ({selectedStudents.length} selected)
              </h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={selectedStudents.length === students.length}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="selectAll" className="text-sm">
                  Select All
                </Label>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2">
              {students.map((student) => (
                <div key={student.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50">
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={(checked) => handleStudentSelection(student.id, checked)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.admissionNo} • {student.grade}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">KSh {(student.balance || 0).toLocaleString()}</p>
                        <Badge variant={student.daysOverdue > 30 ? "destructive" : "secondary"}>
                          {student.daysOverdue || 0} days overdue
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedStudents.length > 0 && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="grid gap-2 md:grid-cols-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Selected Students:</span>
                    <p className="font-medium">{selectedStudents.length}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Outstanding:</span>
                    <p className="font-medium text-red-600">KSh {getTotalOutstanding().toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Average Balance:</span>
                    <p className="font-medium">
                      KSh {Math.round(getTotalOutstanding() / selectedStudents.length).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reminder Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium">Reminder Configuration</h4>

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
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Message Template</Label>
                <Select value={template} onValueChange={handleTemplateChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overdue">Overdue Payment</SelectItem>
                    <SelectItem value="gentle">Gentle Reminder</SelectItem>
                    <SelectItem value="urgent">Urgent Notice</SelectItem>
                    <SelectItem value="custom">Custom Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter reminder subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your reminder message..."
                rows={8}
              />
              <p className="text-xs text-muted-foreground">
                Use placeholders: [STUDENT_NAME], [ADMISSION_NO], [AMOUNT], [DUE_DATE], [DAYS_OVERDUE]
              </p>
            </div>
          </div>

          {/* Schedule Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="scheduleReminder" checked={scheduleReminder} onCheckedChange={setScheduleReminder} />
              <Label htmlFor="scheduleReminder">Schedule reminder for later</Label>
            </div>

            {scheduleReminder && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">Schedule Date & Time</Label>
                  <Input
                    id="scheduleDate"
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {selectedStudents.length > 0 && subject && message && (
            <div className="space-y-4">
              <h4 className="font-medium">Preview</h4>
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Subject:</span>
                    <Badge variant="outline">{reminderTypes.find((t) => t.value === reminderType)?.label}</Badge>
                  </div>
                  <p className="font-medium">{subject}</p>
                  <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {message.substring(0, 200)}...
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSendReminder} disabled={selectedStudents.length === 0}>
              <Send className="mr-2 h-4 w-4" />
              {scheduleReminder ? "Schedule Reminders" : "Send Reminders"} ({selectedStudents.length})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

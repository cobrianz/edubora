"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Bell, Mail, MessageSquare, Phone, Users, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NotifyParentModal({ students = [], onClose, onSendNotification }) {
  const { toast } = useToast()
  const [selectedStudents, setSelectedStudents] = useState([])
  const [notificationType, setNotificationType] = useState("email")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [messageTemplate, setMessageTemplate] = useState("route_change")
  const [urgency, setUrgency] = useState("normal")

  const notificationTypes = [
    { value: "email", label: "Email", icon: Mail },
    { value: "sms", label: "SMS", icon: MessageSquare },
    { value: "call", label: "Phone Call", icon: Phone },
    { value: "all", label: "All Methods", icon: Bell },
  ]

  const templates = {
    route_change: {
      subject: "Transport Route Change Notification",
      message: `Dear Parent/Guardian,

We would like to inform you about an important change to your child's transport route.

Student: [STUDENT_NAME]
New Route: [ROUTE_NAME]
New Pickup Point: [PICKUP_POINT]
Effective Date: [EFFECTIVE_DATE]

Please ensure your child is at the new pickup point on time. If you have any questions, please contact the school transport office.

Best regards,
School Transport Department`,
    },
    schedule_update: {
      subject: "Transport Schedule Update",
      message: `Dear Parent/Guardian,

This is to notify you of an update to the transport schedule for your child.

Student: [STUDENT_NAME]
Route: [ROUTE_NAME]
New Pickup Time: [PICKUP_TIME]
New Drop-off Time: [DROPOFF_TIME]

Please adjust your schedule accordingly.

Best regards,
School Transport Department`,
    },
    fee_reminder: {
      subject: "Transport Fee Payment Reminder",
      message: `Dear Parent/Guardian,

This is a friendly reminder regarding your child's transport fee payment.

Student: [STUDENT_NAME]
Outstanding Amount: KSh [AMOUNT]
Due Date: [DUE_DATE]

Please make the payment at your earliest convenience to avoid any disruption in transport services.

Best regards,
School Finance Department`,
    },
    emergency: {
      subject: "URGENT: Transport Emergency Notification",
      message: `Dear Parent/Guardian,

URGENT NOTICE regarding your child's transport.

Student: [STUDENT_NAME]
Issue: [EMERGENCY_DETAILS]
Action Required: [ACTION_REQUIRED]

Please contact the school immediately at [PHONE_NUMBER].

School Administration`,
    },
    custom: {
      subject: "",
      message: "",
    },
  }

  useState(() => {
    const template = templates[messageTemplate]
    setSubject(template.subject)
    setMessage(template.message)
  }, [messageTemplate])

  const handleStudentSelection = (studentId, checked) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId])
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
    }
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(students.map((student) => student.id))
    } else {
      setSelectedStudents([])
    }
  }

  const handleSendNotification = () => {
    if (selectedStudents.length === 0) {
      toast({
        title: "No Recipients Selected",
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

    const notificationData = {
      studentIds: selectedStudents,
      type: notificationType,
      subject,
      message,
      urgency,
      sentDate: new Date().toISOString(),
      template: messageTemplate,
    }

    onSendNotification(notificationData)
    toast({
      title: "Notifications Sent",
      description: `${selectedStudents.length} notification(s) sent successfully via ${notificationType}`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notify Parents
            </CardTitle>
            <CardDescription>Send transport notifications to parents/guardians</CardDescription>
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
                Select Students ({students.length})
              </h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedStudents.length === students.length}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="text-sm">
                  Select All
                </Label>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2 max-h-48 overflow-y-auto">
              {students.map((student) => (
                <div key={student.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg border">
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={(checked) => handleStudentSelection(student.id, checked)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.grade}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{student.route}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{student.parentContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Configuration */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="notificationType">Notification Method</Label>
              <Select value={notificationType} onValueChange={setNotificationType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {notificationTypes.map((type) => {
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
              <Select value={messageTemplate} onValueChange={setMessageTemplate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="route_change">Route Change</SelectItem>
                  <SelectItem value="schedule_update">Schedule Update</SelectItem>
                  <SelectItem value="fee_reminder">Fee Reminder</SelectItem>
                  <SelectItem value="emergency">Emergency Notice</SelectItem>
                  <SelectItem value="custom">Custom Message</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={urgency} onValueChange={setUrgency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter notification subject..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message..."
                rows={8}
              />
              <p className="text-xs text-muted-foreground">
                Use placeholders: [STUDENT_NAME], [ROUTE_NAME], [PICKUP_POINT], [PICKUP_TIME], [AMOUNT], [DUE_DATE]
              </p>
            </div>
          </div>

          {/* Preview */}
          {selectedStudents.length > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-medium mb-2">Notification Preview</h4>
              <div className="text-sm space-y-1">
                <p>
                  <strong>Recipients:</strong> {selectedStudents.length} parent(s)/guardian(s)
                </p>
                <p>
                  <strong>Method:</strong> {notificationTypes.find((t) => t.value === notificationType)?.label}
                </p>
                <p>
                  <strong>Urgency:</strong>{" "}
                  <Badge variant={urgency === "urgent" ? "destructive" : urgency === "high" ? "secondary" : "default"}>
                    {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
                  </Badge>
                </p>
                <p>
                  <strong>Subject:</strong> {subject}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSendNotification} disabled={selectedStudents.length === 0}>
              <Send className="mr-2 h-4 w-4" />
              Send Notifications ({selectedStudents.length})
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

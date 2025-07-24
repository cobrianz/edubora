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
import { X, Send, MessageSquare, Users, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TeacherMessageModal({ teacher, selectedClass, onClose, onSend }) {
  const { toast } = useToast()
  const [message, setMessage] = useState({
    to: selectedClass || "",
    subject: "",
    content: "",
    priority: "normal",
    recipients: {
      students: selectedClass ? true : false,
      parents: false,
      individual: false,
    },
    individualRecipients: [],
    deliveryOptions: {
      immediate: true,
      scheduled: false,
      date: "",
      time: "",
    },
  })

  const availableClasses = teacher?.classes || ["Grade 7A", "Grade 7B", "Grade 8A"]
  const availableStudents = [
    { id: 1, name: "Sarah Mwangi", class: "Grade 7A", parent: "John Mwangi" },
    { id: 2, name: "David Ochieng", class: "Grade 7A", parent: "Mary Ochieng" },
    { id: 3, name: "Grace Wanjiku", class: "Grade 7B", parent: "Peter Wanjiku" },
  ]

  const handleRecipientChange = (type, checked) => {
    setMessage({
      ...message,
      recipients: { ...message.recipients, [type]: checked },
    })
  }

  const handleIndividualToggle = (student) => {
    const isSelected = message.individualRecipients.some((s) => s.id === student.id)
    if (isSelected) {
      setMessage({
        ...message,
        individualRecipients: message.individualRecipients.filter((s) => s.id !== student.id),
      })
    } else {
      setMessage({
        ...message,
        individualRecipients: [...message.individualRecipients, student],
      })
    }
  }

  const handleDeliveryChange = (field, value) => {
    setMessage({
      ...message,
      deliveryOptions: { ...message.deliveryOptions, [field]: value },
    })
  }

  const handleSend = () => {
    if (!message.subject.trim() || !message.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in subject and message content",
        variant: "destructive",
      })
      return
    }

    if (!message.to && message.individualRecipients.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please select recipients for your message",
        variant: "destructive",
      })
      return
    }

    onSend(message)
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully",
    })
  }

  const getRecipientCount = () => {
    let count = 0
    if (message.to && message.recipients.students) count += 30 // Approximate students per class
    if (message.to && message.recipients.parents) count += 30 // Approximate parents per class
    count += message.individualRecipients.length
    return count
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Send Message
            </CardTitle>
            <CardDescription>
              Send message from {teacher?.name} • {getRecipientCount()} recipients selected
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Teacher Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{teacher?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {teacher?.subject} Teacher • {teacher?.employeeId}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipients Selection */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Class</Label>
              <Select value={message.to} onValueChange={(value) => setMessage({ ...message, to: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {availableClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {message.to && (
              <div className="space-y-3">
                <Label>Recipients in {message.to}</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="students"
                      checked={message.recipients.students}
                      onCheckedChange={(checked) => handleRecipientChange("students", checked)}
                    />
                    <Label htmlFor="students" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Students (~30)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="parents"
                      checked={message.recipients.parents}
                      onCheckedChange={(checked) => handleRecipientChange("parents", checked)}
                    />
                    <Label htmlFor="parents" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Parents (~30)
                    </Label>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="individual"
                  checked={message.recipients.individual}
                  onCheckedChange={(checked) => handleRecipientChange("individual", checked)}
                />
                <Label htmlFor="individual">Select Individual Recipients</Label>
              </div>

              {message.recipients.individual && (
                <div className="space-y-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                  {availableStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`student-${student.id}`}
                          checked={message.individualRecipients.some((s) => s.id === student.id)}
                          onCheckedChange={() => handleIndividualToggle(student)}
                        />
                        <Label htmlFor={`student-${student.id}`} className="text-sm">
                          {student.name} ({student.class})
                        </Label>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Parent: {student.parent}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={message.subject}
                onChange={(e) => setMessage({ ...message, subject: e.target.value })}
                placeholder="Enter message subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={message.priority} onValueChange={(value) => setMessage({ ...message, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Message *</Label>
              <Textarea
                id="content"
                value={message.content}
                onChange={(e) => setMessage({ ...message, content: e.target.value })}
                placeholder="Type your message here..."
                rows={6}
              />
            </div>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4">
            <Label>Delivery Options</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="immediate"
                  checked={message.deliveryOptions.immediate}
                  onCheckedChange={(checked) => handleDeliveryChange("immediate", checked)}
                />
                <Label htmlFor="immediate">Send Immediately</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="scheduled"
                  checked={message.deliveryOptions.scheduled}
                  onCheckedChange={(checked) => handleDeliveryChange("scheduled", checked)}
                />
                <Label htmlFor="scheduled">Schedule for Later</Label>
              </div>
            </div>

            {message.deliveryOptions.scheduled && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={message.deliveryOptions.date}
                    onChange={(e) => handleDeliveryChange("date", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={message.deliveryOptions.time}
                    onChange={(e) => handleDeliveryChange("time", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          {getRecipientCount() > 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800">Message Summary</p>
                    <p className="text-sm text-green-600">
                      Ready to send to {getRecipientCount()} recipients
                      {message.deliveryOptions.scheduled &&
                        ` on ${message.deliveryOptions.date} at ${message.deliveryOptions.time}`}
                    </p>
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    {message.priority.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSend} disabled={getRecipientCount() === 0}>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

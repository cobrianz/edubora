"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  Send,
  Search,
  Plus,
  Reply,
  Archive,
  Star,
  Clock,
  AlertCircle,
  User,
  Calendar,
} from "lucide-react"

export default function ParentMessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isComposeOpen, setIsComposeOpen] = useState(false)

  // Sample messages data
  const messages = [
    {
      id: 1,
      from: "Mr. John Kamau",
      fromRole: "Mathematics Teacher",
      subject: "Sarah's Mathematics Progress",
      preview: "I wanted to update you on Sarah's excellent progress in Mathematics this term...",
      content:
        "Dear Mr. Mwangi,\n\nI wanted to update you on Sarah's excellent progress in Mathematics this term. She has shown remarkable improvement in algebra and geometry, consistently scoring above 85% in her assessments.\n\nSarah is particularly strong in problem-solving and shows great enthusiasm during class discussions. I encourage her to continue with this momentum.\n\nPlease feel free to reach out if you have any questions.\n\nBest regards,\nMr. John Kamau\nMathematics Teacher",
      timestamp: "2024-01-20T10:30:00Z",
      read: false,
      starred: true,
      category: "academic",
      priority: "normal",
      studentName: "Sarah Mwangi",
    },
    {
      id: 2,
      from: "School Administration",
      fromRole: "Admin Office",
      subject: "Parent-Teacher Meeting Invitation",
      preview: "You are cordially invited to attend the Parent-Teacher meeting scheduled for...",
      content:
        "Dear Parent/Guardian,\n\nYou are cordially invited to attend the Parent-Teacher meeting scheduled for February 15th, 2024, from 2:00 PM to 5:00 PM.\n\nThis meeting provides an opportunity to discuss your child's academic progress, behavior, and any concerns you may have.\n\nPlease confirm your attendance by replying to this message.\n\nThank you.\n\nSchool Administration",
      timestamp: "2024-01-18T14:15:00Z",
      read: true,
      starred: false,
      category: "announcement",
      priority: "high",
      studentName: "All Children",
    },
    {
      id: 3,
      from: "Ms. Grace Njeri",
      fromRole: "Class Teacher - Grade 7A",
      subject: "Field Trip Permission Required",
      preview: "We are organizing an educational field trip to the National Museum...",
      content:
        "Dear Parent,\n\nWe are organizing an educational field trip to the National Museum on March 5th, 2024. This trip is part of our Social Studies curriculum.\n\nDetails:\n- Date: March 5th, 2024\n- Time: 8:00 AM - 4:00 PM\n- Cost: KSh 1,500 per student\n- Transportation: School bus\n\nPlease sign and return the permission slip by February 25th.\n\nRegards,\nMs. Grace Njeri",
      timestamp: "2024-01-15T09:45:00Z",
      read: true,
      starred: false,
      category: "permission",
      priority: "normal",
      studentName: "Sarah Mwangi",
    },
    {
      id: 4,
      from: "School Nurse",
      fromRole: "Health Department",
      subject: "Health Check-up Reminder",
      preview: "This is a reminder about the upcoming health check-up for all students...",
      content:
        "Dear Parents,\n\nThis is a reminder about the upcoming health check-up for all students scheduled for next week.\n\nPlease ensure your child:\n- Has had breakfast\n- Brings their health card\n- Informs us of any current medications\n\nThe check-up is mandatory and free of charge.\n\nThank you,\nSchool Health Department",
      timestamp: "2024-01-12T11:20:00Z",
      read: false,
      starred: false,
      category: "health",
      priority: "normal",
      studentName: "All Children",
    },
    {
      id: 5,
      from: "Finance Office",
      fromRole: "Accounts Department",
      subject: "Fee Payment Reminder",
      preview: "This is a friendly reminder that Term 2 fees are due on February 15th...",
      content:
        "Dear Parent,\n\nThis is a friendly reminder that Term 2 fees are due on February 15th, 2024.\n\nOutstanding amount for David Mwangi (Grade 5B): KSh 42,000\n\nPayment methods:\n- M-Pesa: Paybill 123456\n- Bank Transfer: Account 9876543210\n- Cash at school office\n\nPlease contact us if you need a payment plan.\n\nThank you,\nFinance Office",
      timestamp: "2024-01-10T16:30:00Z",
      read: true,
      starred: false,
      category: "finance",
      priority: "high",
      studentName: "David Mwangi",
    },
  ]

  const categories = [
    { value: "all", label: "All Messages", count: messages.length },
    { value: "academic", label: "Academic", count: messages.filter((m) => m.category === "academic").length },
    {
      value: "announcement",
      label: "Announcements",
      count: messages.filter((m) => m.category === "announcement").length,
    },
    { value: "finance", label: "Finance", count: messages.filter((m) => m.category === "finance").length },
    { value: "health", label: "Health", count: messages.filter((m) => m.category === "health").length },
    { value: "permission", label: "Permissions", count: messages.filter((m) => m.category === "permission").length },
  ]

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || message.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const unreadCount = messages.filter((m) => !m.read).length
  const starredCount = messages.filter((m) => m.starred).length

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "normal":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      academic: { label: "Academic", className: "bg-blue-100 text-blue-800" },
      announcement: { label: "Announcement", className: "bg-purple-100 text-purple-800" },
      finance: { label: "Finance", className: "bg-green-100 text-green-800" },
      health: { label: "Health", className: "bg-red-100 text-red-800" },
      permission: { label: "Permission", className: "bg-yellow-100 text-yellow-800" },
    }

    const config = categoryConfig[category] || { label: category, className: "bg-gray-100 text-gray-800" }
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Communication with teachers and school administration</p>
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Compose Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Compose New Message</DialogTitle>
              <DialogDescription>Send a message to teachers or school administration</DialogDescription>
            </DialogHeader>
            <ComposeMessageForm onClose={() => setIsComposeOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">All conversations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Starred</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{starredCount}</div>
            <p className="text-xs text-muted-foreground">Important messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">New messages</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Message List */}
        <div className="md:col-span-1 space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 p-0 focus-visible:ring-0"
                />
              </div>
            </CardHeader>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    selectedCategory === category.value ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm">{category.label}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Message List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Messages</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`w-full p-3 text-left border-b last:border-b-0 hover:bg-muted transition-colors ${
                      selectedMessage?.id === message.id ? "bg-muted" : ""
                    } ${!message.read ? "bg-blue-50" : ""}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${!message.read ? "font-bold" : ""}`}>
                            {message.from}
                          </span>
                          {message.starred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                          {!message.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                        <div className="flex items-center space-x-1">
                          {getPriorityIcon(message.priority)}
                          <span className="text-xs text-muted-foreground">{formatTimestamp(message.timestamp)}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className={`text-sm ${!message.read ? "font-semibold" : ""}`}>{message.subject}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{message.preview}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        {getCategoryBadge(message.category)}
                        <span className="text-xs text-muted-foreground">{message.studentName}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="md:col-span-2">
          {selectedMessage ? (
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{selectedMessage.subject}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {selectedMessage.from
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedMessage.from}</span>
                      <span>•</span>
                      <span>{selectedMessage.fromRole}</span>
                      <span>•</span>
                      <span>{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getCategoryBadge(selectedMessage.category)}
                    {getPriorityIcon(selectedMessage.priority)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm">{selectedMessage.content}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Student: {selectedMessage.studentName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Star className="mr-2 h-4 w-4" />
                      Star
                    </Button>
                    <Button variant="outline" size="sm">
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </Button>
                    <Button size="sm">
                      <Reply className="mr-2 h-4 w-4" />
                      Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-medium">Select a message</h3>
                <p className="text-muted-foreground">Choose a message from the list to view its contents</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function ComposeMessageForm({ onClose }) {
  const [recipient, setRecipient] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [studentContext, setStudentContext] = useState("")

  const recipients = [
    { value: "class-teacher-7a", label: "Ms. Grace Njeri - Class Teacher Grade 7A" },
    { value: "math-teacher", label: "Mr. John Kamau - Mathematics Teacher" },
    { value: "principal", label: "Dr. Jane Wanjiku - School Principal" },
    { value: "admin", label: "School Administration" },
    { value: "finance", label: "Finance Office" },
    { value: "health", label: "School Nurse" },
  ]

  const students = [
    { value: "sarah", label: "Sarah Mwangi - Grade 7A" },
    { value: "david", label: "David Mwangi - Grade 5B" },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">To</Label>
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger>
              <SelectValue placeholder="Select recipient" />
            </SelectTrigger>
            <SelectContent>
              {recipients.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="student">Regarding Student (Optional)</Label>
          <Select value={studentContext} onValueChange={setStudentContext}>
            <SelectTrigger>
              <SelectValue placeholder="Select student" />
            </SelectTrigger>
            <SelectContent>
              {students.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="Enter message subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!recipient || !subject || !message}>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </div>
    </div>
  )
}

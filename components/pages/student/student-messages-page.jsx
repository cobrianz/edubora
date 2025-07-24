"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Search, Send, Users, Mail, Bell, Plus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import MessageComposeModal from "@/components/modals/message-compose-modal"

export default function StudentMessagesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [showComposeModal, setShowComposeModal] = useState(false)

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Mr. John Kamau",
      role: "Teacher",
      subject: "Assignment Reminder",
      message:
        "Don't forget to submit your mathematics assignment by Friday. If you need help, please see me during office hours.",
      timestamp: "2024-07-16 10:30 AM",
      status: "unread",
      priority: "normal",
    },
    {
      id: 2,
      from: "School Admin",
      role: "Admin",
      subject: "Sports Day Announcement",
      message: "Sports Day will be held on Friday, July 26th. Please bring your sports uniform and water bottle.",
      timestamp: "2024-07-16 09:15 AM",
      status: "read",
      priority: "high",
    },
    {
      id: 3,
      from: "Ms. Sarah Wanjiku",
      role: "Teacher",
      subject: "English Project",
      message: "Great work on your English project! Your creativity and effort really showed. Keep it up!",
      timestamp: "2024-07-15 04:20 PM",
      status: "read",
      priority: "normal",
    },
  ])

  const announcements = [
    {
      id: 1,
      title: "Library Hours Extended",
      message: "The library will now be open until 5:00 PM on weekdays to give students more study time.",
      date: "2024-07-16",
      type: "General",
    },
    {
      id: 2,
      title: "Parent-Teacher Conference",
      message: "Parent-teacher conferences are scheduled for next week. Please inform your parents.",
      date: "2024-07-15",
      type: "Academic",
    },
    {
      id: 3,
      title: "School Uniform Reminder",
      message: "Please ensure you are wearing the complete school uniform daily.",
      date: "2024-07-14",
      type: "General",
    },
  ]

  const filteredMessages = messages.filter(
    (message) =>
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleReplyMessage = (message) => {
    if (replyText.trim()) {
      toast({
        title: "Reply Sent",
        description: `Reply sent to ${message.from}`,
      })
      setReplyText("")
      setSelectedMessage(null)
    }
  }

  const handleViewMessage = (message) => {
    setSelectedMessage(message)
    if (message.status === "unread") {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, status: "read" } : m)))
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Stay connected with teachers and school updates</p>
        </div>
        <Button onClick={() => setShowComposeModal(true)} className="transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Mail className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {messages.filter((m) => m.status === "unread").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">From Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.role === "Teacher").length}</div>
            <p className="text-xs text-muted-foreground">Teacher messages</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{announcements.length}</div>
            <p className="text-xs text-muted-foreground">School updates</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Messages List */}
            <div className="md:col-span-2">
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Inbox
                  </CardTitle>
                  <CardDescription>Messages from teachers and school staff</CardDescription>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                          message.status === "unread" ? "border-blue-200 bg-blue-50" : ""
                        }`}
                        onClick={() => handleViewMessage(message)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-medium ${message.status === "unread" ? "font-bold" : ""}`}>
                                {message.from}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {message.role}
                              </Badge>
                              {message.priority === "high" && <Badge variant="destructive">High Priority</Badge>}
                            </div>
                            <h3 className={`font-medium ${message.status === "unread" ? "font-bold" : ""}`}>
                              {message.subject}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{message.message}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                            {message.status === "unread" && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 ml-auto"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Message Detail */}
            <div>
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Message Details</CardTitle>
                  <CardDescription>
                    {selectedMessage ? "Reply to this message" : "Select a message to view details"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedMessage ? (
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{selectedMessage.from}</span>
                          <Badge variant="outline">{selectedMessage.role}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{selectedMessage.subject}</h3>
                        <p className="text-sm text-muted-foreground">{selectedMessage.timestamp}</p>
                      </div>
                      <div>
                        <p className="text-sm leading-relaxed">{selectedMessage.message}</p>
                      </div>
                      <div className="border-t pt-4">
                        <Label htmlFor="reply">Reply:</Label>
                        <Textarea
                          id="reply"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply here..."
                          rows={4}
                          className="mt-2"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedMessage(null)}
                            className="transition-all duration-300 hover:scale-105 bg-transparent"
                          >
                            Close
                          </Button>
                          <Button
                            onClick={() => handleReplyMessage(selectedMessage)}
                            className="transition-all duration-300 hover:scale-105"
                            disabled={!replyText.trim()}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Select a message to view details and reply</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="announcements">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                School Announcements
              </CardTitle>
              <CardDescription>Important updates and notices from the school</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <div className="flex gap-2">
                        <Badge variant="outline">{announcement.type}</Badge>
                        <span className="text-xs text-muted-foreground">{announcement.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{announcement.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Message Compose Modal */}
      {showComposeModal && <MessageComposeModal onClose={() => setShowComposeModal(false)} userRole="student" />}
    </div>
  )
}

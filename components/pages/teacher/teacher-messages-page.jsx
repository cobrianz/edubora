"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Plus, Search, Send, Reply, Users, Mail } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import MessageComposeModal from "@/components/modals/message-compose-modal"

export default function TeacherMessagesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [showComposeModal, setShowComposeModal] = useState(false)

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "John Mwangi",
      role: "Parent",
      subject: "Sarah's Performance",
      message: "I would like to discuss Sarah's recent mathematics performance. Could we schedule a meeting?",
      timestamp: "2024-07-16 10:30 AM",
      status: "unread",
      priority: "normal",
    },
    {
      id: 2,
      from: "Admin Office",
      role: "Admin",
      subject: "Staff Meeting Reminder",
      message: "Reminder: Staff meeting tomorrow at 2:00 PM in the conference room.",
      timestamp: "2024-07-16 09:15 AM",
      status: "read",
      priority: "high",
    },
    {
      id: 3,
      from: "Mary Ochieng",
      role: "Parent",
      subject: "David's Absence",
      message: "David will be absent tomorrow due to a medical appointment. Please excuse his absence.",
      timestamp: "2024-07-15 04:20 PM",
      status: "read",
      priority: "normal",
    },
  ])

  const filteredMessages = messages.filter(
    (message) =>
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleComposeMessage = () => {
    setShowComposeModal(true)
  }

  const handleReplyMessage = (message) => {
    if (replyText.trim()) {
      // Simulate sending a reply by adding it to the messages list (or updating the original message)
      const newReply = {
        id: Date.now(),
        from: "You", // Assuming the teacher is "You"
        role: "Teacher",
        subject: `Re: ${message.subject}`,
        message: replyText.trim(),
        timestamp: new Date().toLocaleString(),
        status: "read", // Replies are considered read
        priority: "normal",
      }
      setMessages((prevMessages) => [newReply, ...prevMessages]) // Add reply to top
      toast({
        title: "Reply Sent",
        description: `Reply sent to ${message.from}`,
      })
      setReplyText("")
      setSelectedMessage(null) // Close message detail after replying
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
          <p className="text-muted-foreground">Communicate with parents, students, and staff</p>
        </div>
        <Button onClick={handleComposeMessage} className="transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          Compose Message
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
            <CardTitle className="text-sm font-medium">From Parents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.role === "Parent").length}</div>
            <p className="text-xs text-muted-foreground">Parent messages</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Reply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Within 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Messages List */}
        <div className="md:col-span-2">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Inbox
              </CardTitle>
              <CardDescription>Your recent messages and communications</CardDescription>
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
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All Messages</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="parents">From Parents</TabsTrigger>
                  <TabsTrigger value="admin">From Admin</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
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
                </TabsContent>

                <TabsContent value="unread">
                  <div className="space-y-4">
                    {filteredMessages
                      .filter((m) => m.status === "unread")
                      .map((message) => (
                        <div
                          key={message.id}
                          className="p-4 border border-blue-200 bg-blue-50 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-100"
                          onClick={() => handleViewMessage(message)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold">{message.from}</span>
                                <Badge variant="outline" className="text-xs">
                                  {message.role}
                                </Badge>
                              </div>
                              <h3 className="font-bold">{message.subject}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{message.message}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 ml-auto"></div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="parents">
                  <div className="space-y-4">
                    {filteredMessages
                      .filter((m) => m.role === "Parent")
                      .map((message) => (
                        <div
                          key={message.id}
                          className="p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50"
                          onClick={() => handleViewMessage(message)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <span className="font-medium">{message.from}</span>
                              <h3 className="font-medium">{message.subject}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{message.message}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="admin">
                  <div className="space-y-4">
                    {filteredMessages
                      .filter((m) => m.role === "Admin")
                      .map((message) => (
                        <div
                          key={message.id}
                          className="p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50"
                          onClick={() => handleViewMessage(message)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <span className="font-medium">{message.from}</span>
                              <h3 className="font-medium">{message.subject}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{message.message}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
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
      {/* Message Compose Modal */}
      {showComposeModal && <MessageComposeModal onClose={() => setShowComposeModal(false)} userRole="teacher" />}
    </div>
  )
}

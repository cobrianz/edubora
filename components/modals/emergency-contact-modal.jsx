"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Phone, MessageSquare, AlertTriangle, Send, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmergencyContactModal({ isOpen, onClose, contactType = "nurse" }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("call")
  const [messageData, setMessageData] = useState({
    priority: "High",
    subject: "",
    message: "",
    studentName: "",
    emergencyType: "",
  })

  const emergencyContacts = {
    nurse: {
      name: "Ms. Grace Njeri",
      title: "School Nurse",
      phone: "+254712345678",
      email: "nurse@edubora.school",
      location: "Medical Room, Block A",
      availability: "Monday - Friday, 8:00 AM - 5:00 PM",
    },
    emergency: {
      name: "Emergency Services",
      title: "Emergency Response",
      phone: "999",
      email: "emergency@kenya.gov",
      location: "National Emergency Center",
      availability: "24/7 Emergency Response",
    },
    hospital: {
      name: "Nairobi Hospital",
      title: "Emergency Department",
      phone: "+254202845000",
      email: "emergency@nairobihospital.org",
      location: "Argwings Kodhek Road, Nairobi",
      availability: "24/7 Emergency Services",
    },
  }

  const contact = emergencyContacts[contactType]

  const handleCall = () => {
    toast({
      title: "Calling " + contact.name,
      description: `Initiating call to ${contact.phone}`,
    })
    // In a real app, this would integrate with a calling system
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    toast({
      title: "Emergency Message Sent",
      description: `Message sent to ${contact.name} successfully.`,
    })
    setMessageData({
      priority: "High",
      subject: "",
      message: "",
      studentName: "",
      emergencyType: "",
    })
    onClose()
  }

  const handleInputChange = (field, value) => {
    setMessageData((prev) => ({ ...prev, [field]: value }))
  }

  const emergencyTypes = [
    "Medical Emergency",
    "Injury/Accident",
    "Allergic Reaction",
    "Mental Health Crisis",
    "Behavioral Emergency",
    "Other Emergency",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-red-500" />
            Emergency Contact - {contact.name}
          </DialogTitle>
          <DialogDescription>
            Contact emergency services or send urgent messages for student welfare emergencies.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{contact.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Title</Label>
                  <p className="text-sm text-muted-foreground">{contact.title}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">{contact.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{contact.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm text-muted-foreground">{contact.location}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Availability
                </Label>
                <p className="text-sm text-muted-foreground">{contact.availability}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Tabs */}
          <div className="flex gap-2 border-b">
            <Button
              variant={activeTab === "call" ? "default" : "ghost"}
              onClick={() => setActiveTab("call")}
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Button>
            <Button
              variant={activeTab === "message" ? "default" : "ghost"}
              onClick={() => setActiveTab("message")}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Send Message
            </Button>
          </div>

          {/* Call Tab */}
          {activeTab === "call" && (
            <div className="space-y-4">
              <div className="text-center py-8">
                <Phone className="mx-auto h-16 w-16 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Emergency Call</h3>
                <p className="text-muted-foreground mb-6">
                  Click the button below to initiate an emergency call to {contact.name}
                </p>
                <Button onClick={handleCall} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Call {contact.phone}
                </Button>
              </div>
            </div>
          )}

          {/* Message Tab */}
          {activeTab === "message" && (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input
                    id="studentName"
                    value={messageData.studentName}
                    onChange={(e) => handleInputChange("studentName", e.target.value)}
                    placeholder="Enter student name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyType">Emergency Type *</Label>
                  <Select
                    value={messageData.emergencyType}
                    onValueChange={(value) => handleInputChange("emergencyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select emergency type" />
                    </SelectTrigger>
                    <SelectContent>
                      {emergencyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={messageData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={messageData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief subject line"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Emergency Message *</Label>
                <Textarea
                  id="message"
                  value={messageData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Describe the emergency situation in detail..."
                  rows={6}
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  This message will be marked as urgent and sent immediately to {contact.name}.
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Badge
                  variant={
                    messageData.priority === "Critical"
                      ? "destructive"
                      : messageData.priority === "High"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {messageData.priority} Priority
                </Badge>
                {messageData.emergencyType && <Badge variant="outline">{messageData.emergencyType}</Badge>}
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                  <Send className="mr-2 h-4 w-4" />
                  Send Emergency Message
                </Button>
              </DialogFooter>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

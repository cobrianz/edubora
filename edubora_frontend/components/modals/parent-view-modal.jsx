"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Phone,
  Mail,
  MapPin,
  Briefcase,
  MessageSquare,
  Edit,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  User,
  Users,
  TrendingUp,
  Activity,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ParentViewModal({ parent, onClose, onEdit, onMessage }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  // Enhanced parent data with more details
  const parentData = {
    id: parent?.id || "P001",
    name: parent?.name || "John Mwangi",
    email: parent?.email || "john.mwangi@email.com",
    phone: parent?.phone || "+254 712 345 678",
    alternatePhone: "+254 723 456 789",
    occupation: parent?.occupation || "Engineer",
    employer: "Kenya Power & Lighting Co.",
    relationship: parent?.relationship || "Father",
    address: parent?.address || "123 Moi Avenue, Nairobi, Kenya",
    city: "Nairobi",
    county: "Nairobi",
    postalCode: "00100",
    nationalId: "12345678",
    dateOfBirth: "1985-03-15",
    gender: "Male",
    status: parent?.status || "Active",
    joinDate: "2020-01-15",
    lastLogin: parent?.lastLogin || "2024-07-16",

    // Children with detailed information
    children: parent?.children || [
      {
        id: 1,
        name: "Sarah Mwangi",
        grade: "Grade 7A",
        admissionNumber: "ADM001",
        performance: 85,
        attendance: 96,
        subjects: ["Mathematics", "English", "Science", "Kiswahili"],
        recentGrades: [
          { subject: "Mathematics", grade: 88, date: "2024-07-15" },
          { subject: "English", grade: 82, date: "2024-07-14" },
          { subject: "Science", grade: 90, date: "2024-07-13" },
        ],
      },
      {
        id: 2,
        name: "David Mwangi",
        grade: "Grade 5B",
        admissionNumber: "ADM002",
        performance: 78,
        attendance: 94,
        subjects: ["Mathematics", "English", "Environmental Studies"],
        recentGrades: [
          { subject: "Mathematics", grade: 75, date: "2024-07-15" },
          { subject: "English", grade: 80, date: "2024-07-14" },
          { subject: "Environmental Studies", grade: 82, date: "2024-07-13" },
        ],
      },
    ],

    // Engagement metrics
    engagementLevel: parent?.engagementLevel || "High",
    meetingsAttended: parent?.meetingsAttended || 8,
    messagesReceived: parent?.messagesReceived || 15,
    messagesReplied: 12,
    eventParticipation: 85,
    responseRate: parent?.responseRate || 80,

    // Financial information
    feesStatus: parent?.feesStatus || "Up to Date",
    totalFeesPaid: 125000,
    outstandingBalance: 0,
    paymentHistory: [
      { date: "2024-07-01", amount: 45000, description: "Term 2 Fees", status: "Paid", method: "M-Pesa" },
      { date: "2024-04-01", amount: 45000, description: "Term 1 Fees", status: "Paid", method: "Bank Transfer" },
      { date: "2024-01-01", amount: 35000, description: "Registration Fee", status: "Paid", method: "Cash" },
    ],

    // Communication preferences
    preferredLanguage: "English",
    communicationMethod: "Email",
    receiveUpdates: true,
    receiveFeeReminders: true,
    receiveEventNotifications: true,
    receiveAcademicReports: true,

    // Recent activities
    recentActivities: [
      { date: "2024-07-16", activity: "Attended parent-teacher conference for Sarah", type: "meeting", icon: Calendar },
      { date: "2024-07-15", activity: "Replied to fee reminder message", type: "communication", icon: MessageSquare },
      { date: "2024-07-10", activity: "Paid term 2 fees via M-Pesa", type: "payment", icon: DollarSign },
      { date: "2024-07-05", activity: "Viewed David's academic report", type: "academic", icon: FileText },
      { date: "2024-07-01", activity: "Updated contact information", type: "profile", icon: User },
    ],

    // Engagement timeline
    engagementTimeline: [
      { month: "Jan", meetings: 2, messages: 5, events: 1 },
      { month: "Feb", meetings: 1, messages: 3, events: 2 },
      { month: "Mar", meetings: 2, messages: 4, events: 1 },
      { month: "Apr", meetings: 1, messages: 2, events: 0 },
      { month: "May", meetings: 1, messages: 1, events: 1 },
      { month: "Jun", meetings: 0, messages: 0, events: 0 },
      { month: "Jul", meetings: 1, messages: 0, events: 0 },
    ],
  }

  const getEngagementColor = (level) => {
    switch (level) {
      case "High":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "default"
      case "Inactive":
        return "secondary"
      case "Suspended":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "meeting":
        return <Calendar className="h-4 w-4" />
      case "communication":
        return <MessageSquare className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "academic":
        return <FileText className="h-4 w-4" />
      case "profile":
        return <User className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-16 w-16">
                <AvatarImage src={parentData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {parentData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{parentData.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-base">
                  <Badge variant={getStatusColor(parentData.status)}>{parentData.status}</Badge>
                  <span>•</span>
                  <span>{parentData.relationship}</span>
                  <span>•</span>
                  <span className={getEngagementColor(parentData.engagementLevel)}>
                    {parentData.engagementLevel} Engagement
                  </span>
                </DialogDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onMessage?.(parentData)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button onClick={() => onEdit?.(parentData)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{parentData.engagementLevel}</div>
                  <p className="text-xs text-muted-foreground">Based on participation</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{parentData.responseRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    {parentData.messagesReplied}/{parentData.messagesReceived} messages
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Meetings Attended</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{parentData.meetingsAttended}</div>
                  <p className="text-xs text-muted-foreground">This academic year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Fee Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{parentData.feesStatus}</div>
                  <p className="text-xs text-muted-foreground">KSh {parentData.outstandingBalance} outstanding</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{parentData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{parentData.phone}</span>
                  </div>
                  {parentData.alternatePhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{parentData.alternatePhone} (Alt)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {parentData.occupation} at {parentData.employer}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{parentData.address}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Parent ID:</span>
                    <span className="text-sm font-medium">{parentData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Join Date:</span>
                    <span className="text-sm font-medium">{parentData.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Login:</span>
                    <span className="text-sm font-medium">{parentData.lastLogin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">National ID:</span>
                    <span className="text-sm font-medium">{parentData.nationalId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gender:</span>
                    <span className="text-sm font-medium">{parentData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Emergency Contact:</span>
                    <span className="text-sm font-medium">
                      {parentData.emergencyContact ? (
                        <CheckCircle className="h-4 w-4 text-green-600 inline" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600 inline" />
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="children" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Children ({parentData.children.length})
                </CardTitle>
                <CardDescription>Students associated with this parent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {parentData.children.map((child) => (
                    <div key={child.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              {child.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-lg">{child.name}</p>
                            <div className="flex gap-2">
                              <Badge variant="outline">{child.grade}</Badge>
                              <Badge variant="secondary">{child.admissionNumber}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Performance</p>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">{child.performance}%</span>
                                <Progress value={child.performance} className="w-16 h-2" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Attendance</p>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">{child.attendance}%</span>
                                <Progress value={child.attendance} className="w-16 h-2" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="font-medium mb-2">Subjects</h4>
                          <div className="flex flex-wrap gap-1">
                            {child.subjects.map((subject, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Recent Grades</h4>
                          <div className="space-y-1">
                            {child.recentGrades.slice(0, 3).map((grade, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{grade.subject}</span>
                                <span className="font-medium">{grade.grade}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Fees Paid</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh {parentData.totalFeesPaid.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">This academic year</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">KSh {parentData.outstandingBalance}</div>
                  <p className="text-xs text-muted-foreground">All fees up to date</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{parentData.feesStatus}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">No pending payments</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment History</CardTitle>
                <CardDescription>Recent fee payments and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {parentData.paymentHistory.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {payment.date} • {payment.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">KSh {payment.amount.toLocaleString()}</p>
                        <Badge variant="default" className="text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Communication Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Preferred Language:</span>
                    <span className="text-sm font-medium">{parentData.preferredLanguage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Communication Method:</span>
                    <span className="text-sm font-medium">{parentData.communicationMethod}</span>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">General Updates</span>
                      {parentData.receiveUpdates ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Fee Reminders</span>
                      {parentData.receiveFeeReminders ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Event Notifications</span>
                      {parentData.receiveEventNotifications ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Academic Reports</span>
                      {parentData.receiveAcademicReports ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Communication Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Response Rate</span>
                        <span>{parentData.responseRate}%</span>
                      </div>
                      <Progress value={parentData.responseRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Event Participation</span>
                        <span>{parentData.eventParticipation}%</span>
                      </div>
                      <Progress value={parentData.eventParticipation} className="h-2" />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Messages Received:</span>
                      <span className="text-sm font-medium">{parentData.messagesReceived}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Messages Replied:</span>
                      <span className="text-sm font-medium">{parentData.messagesReplied}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Meetings Attended:</span>
                      <span className="text-sm font-medium">{parentData.meetingsAttended}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Engagement Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">{parentData.responseRate}</p>
                    <p className="text-sm text-muted-foreground">Overall Engagement Score</p>
                  </div>
                  <div className="mt-4">
                    <Progress value={parentData.responseRate} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activity Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Meetings</span>
                      <span className="text-sm font-medium">{parentData.meetingsAttended}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Messages</span>
                      <span className="text-sm font-medium">
                        {parentData.messagesReplied}/{parentData.messagesReceived}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Events</span>
                      <span className="text-sm font-medium">6/8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">↗ +15%</p>
                    <p className="text-sm text-muted-foreground">vs last month</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>This Month</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Last Month</span>
                      <span className="font-medium">70%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Engagement Breakdown</CardTitle>
                <CardDescription>Parent participation across different activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parentData.engagementTimeline.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="font-medium">{month.month}</div>
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{month.meetings} meetings</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{month.messages} messages</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{month.events} events</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activities</CardTitle>
                <CardDescription>Parent engagement and interaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {parentData.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Activities</span>
                      <span className="font-bold">{parentData.recentActivities.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Week</span>
                      <span className="font-bold">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Most Active Day</span>
                      <span className="font-bold">Monday</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">Meetings</span>
                      </div>
                      <span className="font-bold">40%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">Communications</span>
                      </div>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">Payments</span>
                      </div>
                      <span className="font-bold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">Academic</span>
                      </div>
                      <span className="font-bold">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

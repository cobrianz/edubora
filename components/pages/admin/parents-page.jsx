"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  MessageSquare,
  Phone,
  Mail,
  BarChart3,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Download,
  UserCheck,
  MoreHorizontal,
  Send,
  PhoneCall,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import ParentModal from "@/components/modals/parent-modal"
import ParentViewModal from "@/components/modals/parent-view-modal"
import ParentMessageModal from "@/components/modals/parent-message-modal"
import EmergencyContactModal from "@/components/modals/emergency-contact-modal"

const ParentsPage = () => {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [engagementFilter, setEngagementFilter] = useState("all")
  const [selectedParent, setSelectedParent] = useState(null)
  const [showParentModal, setShowParentModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [modalMode, setModalMode] = useState("view")

  const [parents, setParents] = useState([
    {
      id: "P001",
      name: "John Mwangi",
      email: "john.mwangi@email.com",
      phone: "+254 712 345 678",
      occupation: "Engineer",
      children: ["Sarah Mwangi (Grade 7)", "David Mwangi (Grade 5)"],
      relationship: "Father",
      status: "Active",
      lastLogin: "2024-07-16",
      engagementLevel: "High",
      meetingsAttended: 8,
      messagesReceived: 15,
      messagesReplied: 12,
      feesStatus: "Up to Date",
      emergencyContact: true,
      joinDate: "2020-01-15",
      address: "123 Moi Avenue, Nairobi",
      responseRate: 80,
    },
    {
      id: "P002",
      name: "Grace Mwangi",
      email: "grace.mwangi@email.com",
      phone: "+254 723 456 789",
      occupation: "Teacher",
      children: ["Sarah Mwangi (Grade 7)", "David Mwangi (Grade 5)"],
      relationship: "Mother",
      status: "Active",
      lastLogin: "2024-07-15",
      engagementLevel: "High",
      meetingsAttended: 10,
      messagesReceived: 22,
      messagesReplied: 20,
      feesStatus: "Up to Date",
      emergencyContact: true,
      joinDate: "2020-01-15",
      address: "123 Moi Avenue, Nairobi",
      responseRate: 91,
    },
    {
      id: "P003",
      name: "Mary Ochieng",
      email: "mary.ochieng@email.com",
      phone: "+254 734 567 890",
      occupation: "Nurse",
      children: ["Peter Ochieng (Grade 6)"],
      relationship: "Mother",
      status: "Active",
      lastLogin: "2024-07-10",
      engagementLevel: "Medium",
      meetingsAttended: 5,
      messagesReceived: 8,
      messagesReplied: 6,
      feesStatus: "Partial Payment",
      emergencyContact: true,
      joinDate: "2021-03-20",
      address: "456 Kenyatta Road, Kisumu",
      responseRate: 75,
    },
    {
      id: "P004",
      name: "James Kamau",
      email: "james.kamau@email.com",
      phone: "+254 745 678 901",
      occupation: "Business Owner",
      children: ["Alice Kamau (Grade 4)"],
      relationship: "Father",
      status: "Inactive",
      lastLogin: "2024-06-20",
      engagementLevel: "Low",
      meetingsAttended: 2,
      messagesReceived: 3,
      messagesReplied: 1,
      feesStatus: "Outstanding",
      emergencyContact: false,
      joinDate: "2022-09-10",
      address: "789 Uhuru Street, Mombasa",
      responseRate: 33,
    },
    {
      id: "P005",
      name: "Susan Wanjiku",
      email: "susan.wanjiku@email.com",
      phone: "+254 756 789 012",
      occupation: "Accountant",
      children: ["Michael Wanjiku (Grade 8)", "Lucy Wanjiku (Grade 3)"],
      relationship: "Mother",
      status: "Active",
      lastLogin: "2024-07-14",
      engagementLevel: "High",
      meetingsAttended: 9,
      messagesReceived: 18,
      messagesReplied: 16,
      feesStatus: "Up to Date",
      emergencyContact: true,
      joinDate: "2019-05-12",
      address: "321 Tom Mboya Street, Nakuru",
      responseRate: 89,
    },
  ])

  // Analytics data
  const analytics = {
    totalParents: parents.length,
    activeParents: parents.filter((p) => p.status === "Active").length,
    highEngagement: parents.filter((p) => p.engagementLevel === "High").length,
    feesUpToDate: parents.filter((p) => p.feesStatus === "Up to Date").length,
    averageResponseRate: Math.round(parents.reduce((sum, p) => sum + p.responseRate, 0) / parents.length),
    emergencyContacts: parents.filter((p) => p.emergencyContact).length,
  }

  // Chart data
  const engagementTrendData = [
    { month: "Jan", high: 45, medium: 30, low: 25 },
    { month: "Feb", high: 48, medium: 28, low: 24 },
    { month: "Mar", high: 52, medium: 26, low: 22 },
    { month: "Apr", high: 55, medium: 25, low: 20 },
    { month: "May", high: 58, medium: 24, low: 18 },
    { month: "Jun", high: 60, medium: 23, low: 17 },
    { month: "Jul", high: 62, medium: 22, low: 16 },
  ]

  const communicationData = [
    { method: "Email", count: 450, percentage: 65 },
    { method: "SMS", count: 280, percentage: 40 },
    { method: "Phone", count: 120, percentage: 17 },
    { method: "Portal", count: 380, percentage: 55 },
  ]

  const feeStatusData = [
    { name: "Up to Date", value: 75, color: "#10b981" },
    { name: "Partial Payment", value: 20, color: "#f59e0b" },
    { name: "Outstanding", value: 5, color: "#ef4444" },
  ]

  const responseRateData = [
    { month: "Jan", rate: 78 },
    { month: "Feb", rate: 82 },
    { month: "Mar", rate: 79 },
    { month: "Apr", rate: 85 },
    { month: "May", rate: 88 },
    { month: "Jun", rate: 84 },
    { month: "Jul", rate: 87 },
  ]

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.children.some((child) => child.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || parent.status.toLowerCase() === statusFilter
    const matchesEngagement = engagementFilter === "all" || parent.engagementLevel.toLowerCase() === engagementFilter

    return matchesSearch && matchesStatus && matchesEngagement
  })

  const handleAddParent = () => {
    setSelectedParent(null)
    setModalMode("create")
    setShowParentModal(true)
  }

  const handleViewParent = (parent) => {
    setSelectedParent(parent)
    setShowViewModal(true)
  }

  const handleEditParent = (parent) => {
    setSelectedParent(parent)
    setModalMode("edit")
    setShowParentModal(true)
  }

  const handleMessageParent = (parent) => {
    setSelectedParent(parent)
    setShowMessageModal(true)
  }

  const handleEmergencyContact = (parent) => {
    setSelectedParent(parent)
    setShowEmergencyModal(true)
  }

  const handleBulkMessage = () => {
    toast({
      title: "Bulk Message",
      description: "Opening bulk message composer for selected parents...",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Parent data is being exported to CSV...",
    })
  }

  const handleCallParent = (parent) => {
    toast({
      title: "Calling Parent",
      description: `Initiating call to ${parent.name} at ${parent.phone}`,
    })
  }

  const getEngagementColor = (level) => {
    switch (level) {
      case "High":
        return "text-green-600 bg-green-50"
      case "Medium":
        return "text-yellow-600 bg-yellow-50"
      case "Low":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getFeesStatusColor = (status) => {
    switch (status) {
      case "Up to Date":
        return "default"
      case "Partial Payment":
        return "secondary"
      case "Outstanding":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parent Management</h1>
          <p className="text-muted-foreground">Manage parent information, communication, and engagement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkMessage}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Bulk Message
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={handleAddParent}>
            <Plus className="mr-2 h-4 w-4" />
            Add Parent
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalParents}</div>
            <p className="text-xs text-muted-foreground">Registered parents</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Parents</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.activeParents}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((analytics.activeParents / analytics.totalParents) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{analytics.highEngagement}</div>
            <p className="text-xs text-muted-foreground">Highly engaged parents</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fees Up to Date</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.feesUpToDate}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((analytics.feesUpToDate / analytics.totalParents) * 100)}% compliance
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{analytics.averageResponseRate}%</div>
            <p className="text-xs text-muted-foreground">Average response rate</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Contacts</CardTitle>
            <Phone className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{analytics.emergencyContacts}</div>
            <p className="text-xs text-muted-foreground">Available for emergencies</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="parents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="parents">All Parents</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="parents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parent Directory</CardTitle>
              <CardDescription>Manage parent information and contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search parents, children, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={engagementFilter} onValueChange={setEngagementFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Engagement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parent Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Children</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Response Rate</TableHead>
                      <TableHead>Fees Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParents.map((parent) => (
                      <TableRow key={parent.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{parent.name}</p>
                            <p className="text-sm text-muted-foreground">{parent.relationship}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span className="text-sm">{parent.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span className="text-sm">{parent.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {parent.children.map((child, index) => (
                              <Badge key={index} variant="outline" className="text-xs block w-fit">
                                {child}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <Badge
                              variant="outline"
                              className={`${getEngagementColor(parent.engagementLevel)} text-xs`}
                            >
                              {parent.engagementLevel}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{parent.meetingsAttended} meetings</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{parent.responseRate}%</div>
                            <Progress value={parent.responseRate} className="w-16 h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getFeesStatusColor(parent.feesStatus)}>{parent.feesStatus}</Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewParent(parent)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditParent(parent)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Parent
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleMessageParent(parent)}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCallParent(parent)}>
                                <PhoneCall className="mr-2 h-4 w-4" />
                                Call Parent
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEmergencyContact(parent)}>
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Emergency Contact
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Engagement Trends
                </CardTitle>
                <CardDescription>Parent engagement levels over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={engagementTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="high"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="medium"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                    />
                    <Area type="monotone" dataKey="low" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Fee Payment Status
                </CardTitle>
                <CardDescription>Distribution of fee payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={feeStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {feeStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {feeStatusData.map((status, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                      <span className="text-sm">
                        {status.name}: {status.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Communication Methods</CardTitle>
                <CardDescription>Preferred communication channels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={communicationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="method" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Rate Trend</CardTitle>
                <CardDescription>Parent response rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={responseRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Parents</CardTitle>
                <CardDescription>Most engaged parents this term</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {parents
                    .filter((p) => p.engagementLevel === "High")
                    .slice(0, 5)
                    .map((parent, index) => (
                      <div key={parent.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{parent.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {parent.meetingsAttended} meetings • {parent.messagesReceived} messages
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="default">#{index + 1}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{parent.responseRate}% response</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attention Required</CardTitle>
                <CardDescription>Parents needing follow-up</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {parents
                    .filter((p) => p.engagementLevel === "Low" || p.feesStatus === "Outstanding")
                    .slice(0, 5)
                    .map((parent) => (
                      <div
                        key={parent.id}
                        className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{parent.name}</p>
                          <p className="text-xs text-red-600">
                            {parent.engagementLevel === "Low" && "Low engagement"}
                            {parent.feesStatus === "Outstanding" && " • Outstanding fees"}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => handleMessageParent(parent)}>
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleCallParent(parent)}>
                            <Phone className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Communication Statistics</CardTitle>
                <CardDescription>Overall communication metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">1,250</p>
                      <p className="text-sm text-muted-foreground">Emails Sent</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">890</p>
                      <p className="text-sm text-muted-foreground">SMS Sent</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">45</p>
                      <p className="text-sm text-muted-foreground">Meetings Held</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">78%</p>
                      <p className="text-sm text-muted-foreground">Response Rate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Communications</CardTitle>
                <CardDescription>Latest messages and interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Fee Reminder Sent</p>
                      <p className="text-xs text-muted-foreground">To 25 parents • 2 hours ago</p>
                    </div>
                    <Badge variant="outline">Email</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Parent Meeting Notice</p>
                      <p className="text-xs text-muted-foreground">To all parents • Yesterday</p>
                    </div>
                    <Badge variant="outline">SMS</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Academic Report Available</p>
                      <p className="text-xs text-muted-foreground">To 150 parents • 3 days ago</p>
                    </div>
                    <Badge variant="outline">Portal</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Emergency Contact Test</p>
                      <p className="text-xs text-muted-foreground">To emergency contacts • 1 week ago</p>
                    </div>
                    <Badge variant="outline">Phone</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Send messages and notifications to parents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button onClick={handleBulkMessage} className="h-20 flex-col">
                  <Send className="h-6 w-6 mb-2" />
                  Send Bulk Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleEmergencyContact({ name: "All Emergency Contacts" })}
                  className="h-20 flex-col"
                >
                  <AlertCircle className="h-6 w-6 mb-2" />
                  Emergency Alert
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Calendar className="h-6 w-6 mb-2" />
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">78%</p>
                  <p className="text-sm text-muted-foreground">Average Attendance Rate</p>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Parent-Teacher Conferences</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Academic Review Meetings</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">School Events</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portal Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">92%</p>
                  <p className="text-sm text-muted-foreground">Active Portal Users</p>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Active Users</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Weekly Active Users</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly Active Users</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">4.6</p>
                  <p className="text-sm text-muted-foreground">Average Satisfaction Score</p>
                </div>
                <div className="space-y-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Communication</span>
                    <span className="text-sm font-medium">4.8/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">School Services</span>
                    <span className="text-sm font-medium">4.5/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Overall Experience</span>
                    <span className="text-sm font-medium">4.6/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Activities</CardTitle>
              <CardDescription>Recent parent engagement activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    activity: "Parent-Teacher Conference",
                    date: "2024-07-20",
                    participants: 45,
                    type: "meeting",
                  },
                  {
                    activity: "School Sports Day",
                    date: "2024-07-15",
                    participants: 78,
                    type: "event",
                  },
                  {
                    activity: "Academic Review Meeting",
                    date: "2024-07-10",
                    participants: 32,
                    type: "meeting",
                  },
                  {
                    activity: "Parent Feedback Survey",
                    date: "2024-07-05",
                    participants: 89,
                    type: "survey",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {activity.type === "meeting" && <Calendar className="h-5 w-5 text-primary" />}
                        {activity.type === "event" && <Users className="h-5 w-5 text-primary" />}
                        {activity.type === "survey" && <BarChart3 className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{activity.participants} participants</p>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showParentModal && (
        <ParentModal
          parent={selectedParent}
          mode={modalMode}
          onClose={() => setShowParentModal(false)}
          onSave={(parentData) => {
            console.log("Parent saved:", parentData)
            setShowParentModal(false)
            toast({
              title: "Success",
              description: `Parent ${modalMode === "create" ? "added" : "updated"} successfully`,
            })
          }}
        />
      )}

      {showViewModal && selectedParent && (
        <ParentViewModal
          parent={selectedParent}
          onClose={() => setShowViewModal(false)}
          onEdit={(parent) => {
            setShowViewModal(false)
            handleEditParent(parent)
          }}
          onMessage={(parent) => {
            setShowViewModal(false)
            handleMessageParent(parent)
          }}
        />
      )}

      {showMessageModal && selectedParent && (
        <ParentMessageModal
          parent={selectedParent}
          onClose={() => setShowMessageModal(false)}
          onSend={(messageData) => {
            console.log("Message sent:", messageData)
            setShowMessageModal(false)
            toast({
              title: "Message Sent",
              description: `Message sent to ${selectedParent.name} successfully`,
            })
          }}
        />
      )}

      {showEmergencyModal && (
        <EmergencyContactModal
          isOpen={showEmergencyModal}
          onClose={() => setShowEmergencyModal(false)}
          contactType="nurse"
        />
      )}
    </div>
  )
}

export default ParentsPage

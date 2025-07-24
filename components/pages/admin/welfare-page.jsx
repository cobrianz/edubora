"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Users,
  AlertTriangle,
  Shield,
  Phone,
  BarChart3,
  PieChart,
  TrendingUp,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"

// Import modals
import WelfareCaseModal from "@/components/modals/welfare-case-modal"
import HealthRecordModal from "@/components/modals/health-record-modal"
import CounselingSessionModal from "@/components/modals/counseling-session-modal"
import EmergencyContactModal from "@/components/modals/emergency-contact-modal"

export default function WelfarePage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Modal states
  const [welfareCaseModal, setWelfareCaseModal] = useState({ isOpen: false, mode: "add", data: null })
  const [healthRecordModal, setHealthRecordModal] = useState({ isOpen: false, mode: "add", data: null })
  const [counselingModal, setCounselingModal] = useState({ isOpen: false, mode: "add", data: null })
  const [emergencyModal, setEmergencyModal] = useState({ isOpen: false, contactType: "nurse" })

  const [welfareRecords, setWelfareRecords] = useState([
    {
      id: "WEL001",
      studentName: "Sarah Mwangi",
      admissionNo: "ADM2024001",
      class: "Grade 7A",
      category: "Medical",
      issue: "Asthma condition",
      status: "Active",
      reportedDate: "2024-06-15",
      lastUpdate: "2024-07-10",
      priority: "High",
      assignedTo: "School Nurse",
    },
    {
      id: "WEL002",
      studentName: "David Ochieng",
      admissionNo: "ADM2024002",
      class: "Grade 6B",
      category: "Counseling",
      issue: "Academic stress",
      status: "In Progress",
      reportedDate: "2024-07-01",
      lastUpdate: "2024-07-15",
      priority: "Medium",
      assignedTo: "School Counselor",
    },
    {
      id: "WEL003",
      studentName: "Grace Akinyi",
      admissionNo: "ADM2024003",
      class: "Grade 8A",
      category: "Social",
      issue: "Bullying incident",
      status: "Resolved",
      reportedDate: "2024-06-20",
      lastUpdate: "2024-07-05",
      priority: "High",
      assignedTo: "Deputy Head",
    },
    {
      id: "WEL004",
      studentName: "John Kamau",
      admissionNo: "ADM2024004",
      class: "Grade 5C",
      category: "Financial",
      issue: "Fee assistance needed",
      status: "Under Review",
      reportedDate: "2024-07-08",
      lastUpdate: "2024-07-12",
      priority: "Medium",
      assignedTo: "Welfare Officer",
    },
  ])

  const [healthRecords, setHealthRecords] = useState([
    {
      id: "HLT001",
      studentName: "Sarah Mwangi",
      condition: "Asthma",
      medication: "Inhaler",
      allergies: "Dust, Pollen",
      emergencyContact: "+254712345678",
      lastCheckup: "2024-06-15",
      notes: "Requires inhaler during PE activities",
    },
    {
      id: "HLT002",
      studentName: "Michael Johnson",
      condition: "Diabetes Type 1",
      medication: "Insulin",
      allergies: "None",
      emergencyContact: "+254723456789",
      lastCheckup: "2024-07-01",
      notes: "Monitor blood sugar levels regularly",
    },
  ])

  const [counselingSessions, setCounselingSessions] = useState([
    {
      id: "CNS001",
      studentName: "David Ochieng",
      counselor: "Ms. Jane Counselor",
      sessionDate: "2024-07-15",
      duration: "45 minutes",
      type: "Individual",
      topic: "Academic Stress Management",
      status: "Completed",
      nextSession: "2024-07-22",
    },
    {
      id: "CNS002",
      studentName: "Alice Cooper",
      counselor: "Mr. John Therapist",
      sessionDate: "2024-07-16",
      duration: "30 minutes",
      type: "Group",
      topic: "Social Skills Development",
      status: "Scheduled",
      nextSession: "2024-07-23",
    },
  ])

  // Chart data
  const casesByCategoryData = [
    { name: "Medical", value: 35, color: "#ef4444" },
    { name: "Counseling", value: 28, color: "#3b82f6" },
    { name: "Social", value: 20, color: "#10b981" },
    { name: "Financial", value: 12, color: "#f59e0b" },
    { name: "Academic", value: 8, color: "#8b5cf6" },
    { name: "Behavioral", value: 7, color: "#ec4899" },
  ]

  const monthlyTrendsData = [
    { month: "Jan", cases: 45, resolved: 38 },
    { month: "Feb", cases: 52, resolved: 41 },
    { month: "Mar", cases: 48, resolved: 45 },
    { month: "Apr", cases: 61, resolved: 52 },
    { month: "May", cases: 58, resolved: 55 },
    { month: "Jun", cases: 67, resolved: 59 },
    { month: "Jul", cases: 73, resolved: 61 },
  ]

  const priorityDistributionData = [
    { priority: "Critical", count: 8, color: "#dc2626" },
    { priority: "High", count: 23, color: "#ea580c" },
    { priority: "Medium", count: 45, color: "#ca8a04" },
    { priority: "Low", count: 34, color: "#16a34a" },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "medical", label: "Medical" },
    { value: "counseling", label: "Counseling" },
    { value: "social", label: "Social" },
    { value: "financial", label: "Financial" },
  ]

  const filteredRecords = welfareRecords.filter((record) => {
    const matchesSearch =
      record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.issue.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || record.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalCases = welfareRecords.length
  const activeCases = welfareRecords.filter(
    (record) => record.status === "Active" || record.status === "In Progress",
  ).length
  const highPriorityCases = welfareRecords.filter((record) => record.priority === "High").length

  const handleAddWelfareCase = () => {
    setWelfareCaseModal({ isOpen: true, mode: "add", data: null })
  }

  const handleEditCase = (record) => {
    setWelfareCaseModal({ isOpen: true, mode: "edit", data: record })
  }

  const handleViewCase = (record) => {
    setWelfareCaseModal({ isOpen: true, mode: "view", data: record })
  }

  const handleAddHealthRecord = () => {
    setHealthRecordModal({ isOpen: true, mode: "add", data: null })
  }

  const handleViewHealthRecord = (record) => {
    setHealthRecordModal({ isOpen: true, mode: "view", data: record })
  }

  const handleEditHealthRecord = (record) => {
    setHealthRecordModal({ isOpen: true, mode: "edit", data: record })
  }

  const handleScheduleCounseling = () => {
    setCounselingModal({ isOpen: true, mode: "add", data: null })
  }

  const handleViewSession = (session) => {
    setCounselingModal({ isOpen: true, mode: "view", data: session })
  }

  const handleEditSession = (session) => {
    setCounselingModal({ isOpen: true, mode: "edit", data: session })
  }

  const handleExportReport = () => {
    toast({
      title: "Export Report",
      description: "Generating welfare report...",
    })
  }

  const handleEmergencyContact = (contactType) => {
    setEmergencyModal({ isOpen: true, contactType })
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Welfare</h1>
          <p className="text-muted-foreground">Manage student health, counseling, and welfare services</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={handleExportReport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={handleAddWelfareCase} className="transition-all duration-300 hover:scale-105">
            <Plus className="mr-2 h-4 w-4" />
            Add Case
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCases}</div>
            <p className="text-xs text-muted-foreground">All welfare cases</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{activeCases}</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPriorityCases}</div>
            <p className="text-xs text-muted-foreground">Urgent cases</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Records</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthRecords.length}</div>
            <p className="text-xs text-muted-foreground">Medical records</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Cases by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Cases",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={casesByCategoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {casesByCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cases: {
                  label: "New Cases",
                  color: "hsl(var(--chart-1))",
                },
                resolved: {
                  label: "Resolved",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="cases" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  <Line type="monotone" dataKey="resolved" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Priority Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Cases",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityDistributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="priority" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#8884d8">
                    {priorityDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cases">Welfare Cases</TabsTrigger>
          <TabsTrigger value="health">Health Records</TabsTrigger>
          <TabsTrigger value="counseling">Counseling</TabsTrigger>
          <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Student Welfare Cases
              </CardTitle>
              <CardDescription>Track and manage student welfare issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search cases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Issue</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow key={record.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{record.studentName}</div>
                            <div className="text-sm text-muted-foreground">{record.admissionNo}</div>
                          </div>
                        </TableCell>
                        <TableCell>{record.class}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.category}</Badge>
                        </TableCell>
                        <TableCell className="max-w-48 truncate">{record.issue}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              record.priority === "High"
                                ? "destructive"
                                : record.priority === "Medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {record.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              record.status === "Resolved"
                                ? "default"
                                : record.status === "Active" || record.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.assignedTo}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleViewCase(record)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleEditCase(record)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {record.priority === "High" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-red-600 transition-all duration-300 hover:scale-105"
                                onClick={() => handleEmergencyContact("nurse")}
                              >
                                <Phone className="h-3 w-3 mr-1" />
                                Alert
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Student Health Records
              </CardTitle>
              <CardDescription>Manage medical conditions and health information</CardDescription>
              <Button onClick={handleAddHealthRecord} className="w-fit transition-all duration-300 hover:scale-105">
                <Plus className="mr-2 h-4 w-4" />
                Add Health Record
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Medical Condition</TableHead>
                      <TableHead>Medication</TableHead>
                      <TableHead>Allergies</TableHead>
                      <TableHead>Emergency Contact</TableHead>
                      <TableHead>Last Checkup</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {healthRecords.map((record) => (
                      <TableRow key={record.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{record.studentName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.condition}</Badge>
                        </TableCell>
                        <TableCell>{record.medication}</TableCell>
                        <TableCell>{record.allergies}</TableCell>
                        <TableCell>{record.emergencyContact}</TableCell>
                        <TableCell>{record.lastCheckup}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleViewHealthRecord(record)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleEditHealthRecord(record)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-red-600 transition-all duration-300 hover:scale-105"
                              onClick={() => handleEmergencyContact("nurse")}
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="counseling">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Counseling Sessions
              </CardTitle>
              <CardDescription>Track counseling sessions and student support</CardDescription>
              <Button onClick={handleScheduleCounseling} className="w-fit transition-all duration-300 hover:scale-105">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Counselor</TableHead>
                      <TableHead>Session Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {counselingSessions.map((session) => (
                      <TableRow key={session.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{session.studentName}</TableCell>
                        <TableCell>{session.counselor}</TableCell>
                        <TableCell>{session.sessionDate}</TableCell>
                        <TableCell>{session.duration}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{session.type}</Badge>
                        </TableCell>
                        <TableCell className="max-w-48 truncate">{session.topic}</TableCell>
                        <TableCell>
                          <Badge variant={session.status === "Completed" ? "default" : "secondary"}>
                            {session.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleViewSession(session)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleEditSession(session)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>Quick access to emergency contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card
                  className="border-2 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleEmergencyContact("nurse")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto h-12 w-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-2">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-lg">School Nurse</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="font-medium">Ms. Grace Njeri</p>
                    <p className="text-sm text-muted-foreground">+254712345678</p>
                    <p className="text-xs text-muted-foreground">Medical Room, Block A</p>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Nurse
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className="border-2 border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleEmergencyContact("emergency")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto h-12 w-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-2">
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">Emergency Services</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="font-medium">Emergency Response</p>
                    <p className="text-sm text-muted-foreground">999</p>
                    <p className="text-xs text-muted-foreground">24/7 Emergency Response</p>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Emergency
                    </Button>
                  </CardContent>
                </Card>

                <Card
                  className="border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleEmergencyContact("hospital")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-2">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Hospital</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="font-medium">Nairobi Hospital</p>
                    <p className="text-sm text-muted-foreground">+254202845000</p>
                    <p className="text-xs text-muted-foreground">Emergency Department</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Hospital
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <WelfareCaseModal
        isOpen={welfareCaseModal.isOpen}
        onClose={() => setWelfareCaseModal({ isOpen: false, mode: "add", data: null })}
        mode={welfareCaseModal.mode}
        caseData={welfareCaseModal.data}
      />

      <HealthRecordModal
        isOpen={healthRecordModal.isOpen}
        onClose={() => setHealthRecordModal({ isOpen: false, mode: "add", data: null })}
        mode={healthRecordModal.mode}
        healthData={healthRecordModal.data}
      />

      <CounselingSessionModal
        isOpen={counselingModal.isOpen}
        onClose={() => setCounselingModal({ isOpen: false, mode: "add", data: null })}
        mode={counselingModal.mode}
        sessionData={counselingModal.data}
      />

      <EmergencyContactModal
        isOpen={emergencyModal.isOpen}
        onClose={() => setEmergencyModal({ isOpen: false, contactType: "nurse" })}
        contactType={emergencyModal.contactType}
      />
    </div>
  )
}

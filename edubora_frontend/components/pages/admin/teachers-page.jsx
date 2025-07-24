"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  UserCheck,
  Plus,
  Search,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  TrendingUp,
  Award,
  Calendar,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TeacherModal from "@/components/modals/teacher-modal"
import ConfirmationModal from "@/components/modals/confirmation-modal"
import { useToast } from "@/hooks/use-toast"
import TeacherViewModal from "@/components/modals/teacher-view-modal"
import TeacherMessageModal from "@/components/modals/teacher-message-modal"
import TeacherReportModal from "@/components/modals/teacher-report-modal"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

export default function TeachersPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showTeacherModal, setShowTeacherModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [teacherToDelete, setTeacherToDelete] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState(null)

  const [teachers, setTeachers] = useState([
    {
      id: "TCH001",
      name: "Mr. John Kamau",
      employeeId: "EMP2024001",
      subject: "Mathematics",
      department: "Mathematics",
      classes: ["Grade 7A", "Grade 8B", "Grade 9A"],
      phone: "+254712345678",
      email: "j.kamau@edubora.school",
      status: "Active",
      experience: "8 years",
      performance: 92,
      studentRating: 4.8,
      attendance: 98,
      qualifications: "B.Ed Mathematics, M.Sc Mathematics",
      joinDate: "2020-01-15",
    },
    {
      id: "TCH002",
      name: "Ms. Sarah Wanjiku",
      employeeId: "EMP2024002",
      subject: "English",
      department: "Languages",
      classes: ["Grade 6A", "Grade 7B"],
      phone: "+254723456789",
      email: "s.wanjiku@edubora.school",
      status: "Active",
      experience: "5 years",
      performance: 88,
      studentRating: 4.6,
      attendance: 96,
      qualifications: "B.Ed English Literature",
      joinDate: "2021-03-10",
    },
    {
      id: "TCH003",
      name: "Mr. David Ochieng",
      employeeId: "EMP2024003",
      subject: "Science",
      department: "Sciences",
      classes: ["Grade 8A", "Grade 9A"],
      phone: "+254734567890",
      email: "d.ochieng@edubora.school",
      status: "On Leave",
      experience: "12 years",
      performance: 95,
      studentRating: 4.9,
      attendance: 94,
      qualifications: "B.Sc Biology, B.Ed Science",
      joinDate: "2018-08-20",
    },
    {
      id: "TCH004",
      name: "Mrs. Grace Muthoni",
      employeeId: "EMP2024004",
      subject: "Kiswahili",
      department: "Languages",
      classes: ["Grade 6B", "Grade 7A", "Grade 8B"],
      phone: "+254745678901",
      email: "g.muthoni@edubora.school",
      status: "Active",
      experience: "10 years",
      performance: 90,
      studentRating: 4.7,
      attendance: 97,
      qualifications: "B.A Kiswahili, B.Ed Languages",
      joinDate: "2019-02-01",
    },
    {
      id: "TCH005",
      name: "Mr. Peter Njoroge",
      employeeId: "EMP2024005",
      subject: "Social Studies",
      department: "Social Studies",
      classes: ["Grade 7B", "Grade 8A"],
      phone: "+254756789012",
      email: "p.njoroge@edubora.school",
      status: "Active",
      experience: "6 years",
      performance: 85,
      studentRating: 4.5,
      attendance: 95,
      qualifications: "B.A History, B.Ed Social Studies",
      joinDate: "2022-01-12",
    },
  ])

  // Analytics data
  const performanceData = [
    { month: "Sep", mathematics: 92, english: 88, science: 95, kiswahili: 90, social: 85 },
    { month: "Oct", mathematics: 94, english: 90, science: 96, kiswahili: 92, social: 87 },
    { month: "Nov", mathematics: 93, english: 89, science: 97, kiswahili: 91, social: 86 },
    { month: "Dec", mathematics: 95, english: 91, science: 98, kiswahili: 93, social: 88 },
  ]

  const departmentStats = [
    { department: "Mathematics", teachers: 3, avgPerformance: 92, avgRating: 4.7 },
    { department: "Languages", teachers: 4, avgPerformance: 89, avgRating: 4.6 },
    { department: "Sciences", teachers: 2, avgPerformance: 95, avgRating: 4.8 },
    { department: "Social Studies", teachers: 2, avgPerformance: 85, avgRating: 4.5 },
    { department: "Creative Arts", teachers: 1, avgPerformance: 87, avgRating: 4.4 },
  ]

  const experienceDistribution = [
    { range: "0-2 years", count: 2, color: "#ef4444" },
    { range: "3-5 years", count: 3, color: "#f59e0b" },
    { range: "6-10 years", count: 4, color: "#10b981" },
    { range: "10+ years", count: 3, color: "#3b82f6" },
  ]

  const teacherWorkload = [
    { teacher: "John Kamau", classes: 3, students: 90, hours: 24 },
    { teacher: "Sarah Wanjiku", classes: 2, students: 62, hours: 20 },
    { teacher: "David Ochieng", classes: 2, students: 58, hours: 18 },
    { teacher: "Grace Muthoni", classes: 3, students: 88, hours: 22 },
    { teacher: "Peter Njoroge", classes: 2, students: 60, hours: 16 },
  ]

  const qualificationData = [
    { level: "Bachelor's", count: 8, percentage: 67 },
    { level: "Master's", count: 3, percentage: 25 },
    { level: "PhD", count: 1, percentage: 8 },
  ]

  const attendanceData = [
    { month: "Sep", attendance: 96.5 },
    { month: "Oct", attendance: 97.2 },
    { month: "Nov", attendance: 95.8 },
    { month: "Dec", attendance: 98.1 },
  ]

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === "all" || teacher.department === filterDepartment
    const matchesStatus = filterStatus === "all" || teacher.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleAddTeacher = () => {
    setSelectedTeacher(null)
    setShowTeacherModal(true)
  }

  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher)
    setShowTeacherModal(true)
  }

  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher)
    setShowViewModal(true)
  }

  const handleDeleteTeacher = (teacher) => {
    setTeacherToDelete(teacher)
    setShowConfirmModal(true)
  }

  const handleMessageTeacher = (teacher, className = null) => {
    setSelectedTeacher(teacher)
    setSelectedClass(className)
    setShowMessageModal(true)
  }

  const handleGenerateReport = (teacher) => {
    setSelectedTeacher(teacher)
    setShowReportModal(true)
  }

  const confirmDelete = () => {
    if (teacherToDelete) {
      setTeachers(teachers.filter((t) => t.id !== teacherToDelete.id))
      toast({
        title: "Teacher Deleted",
        description: `${teacherToDelete.name} has been removed from the system`,
      })
      setTeacherToDelete(null)
    }
  }

  const handleSaveTeacher = (teacherData) => {
    if (selectedTeacher) {
      setTeachers(teachers.map((t) => (t.id === selectedTeacher.id ? { ...t, ...teacherData } : t)))
      toast({
        title: "Teacher Updated",
        description: `${teacherData.name} has been updated successfully`,
      })
    } else {
      const newTeacher = {
        id: `TCH${String(teachers.length + 1).padStart(3, "0")}`,
        ...teacherData,
        classes: [],
        performance: 0,
        studentRating: 0,
        attendance: 0,
      }
      setTeachers([...teachers, newTeacher])
      toast({
        title: "Teacher Added",
        description: `${teacherData.name} has been added successfully`,
      })
    }
    setShowTeacherModal(false)
  }

  const handleImportTeachers = () => {
    toast({
      title: "Import Teachers",
      description: "Opening import wizard...",
    })
  }

  const handleExportTeachers = () => {
    toast({
      title: "Export Teachers",
      description: "Generating teacher list...",
    })
  }

  const handleSendMessage = (messageData) => {
    toast({
      title: "Message Sent",
      description: "Message has been sent successfully",
    })
    setShowMessageModal(false)
  }

  const handleReportGenerate = (reportConfig) => {
    toast({
      title: "Report Generated",
      description: "Teacher report has been generated successfully",
    })
    setShowReportModal(false)
  }

  const getAveragePerformance = () => {
    return Math.round(teachers.reduce((sum, teacher) => sum + teacher.performance, 0) / teachers.length)
  }

  const getAverageRating = () => {
    return (teachers.reduce((sum, teacher) => sum + teacher.studentRating, 0) / teachers.length).toFixed(1)
  }

  const getAverageAttendance = () => {
    return Math.round(teachers.reduce((sum, teacher) => sum + teacher.attendance, 0) / teachers.length)
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Management</h1>
          <p className="text-muted-foreground">Comprehensive teacher analytics and management system</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={handleImportTeachers}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import Teachers
          </Button>
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={handleExportTeachers}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={handleAddTeacher} className="transition-all duration-300 hover:scale-105">
            <Plus className="mr-2 h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{teachers.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Teachers</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {teachers.filter((t) => t.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((teachers.filter((t) => t.status === "Active").length / teachers.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{getAveragePerformance()}%</div>
            <p className="text-xs text-muted-foreground">+3% from last term</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Student Rating</CardTitle>
            <Award className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{getAverageRating()}/5.0</div>
            <p className="text-xs text-muted-foreground">Excellent rating</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{getAverageAttendance()}%</div>
            <p className="text-xs text-muted-foreground">Above target</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance by Subject
            </CardTitle>
            <CardDescription>Monthly performance trends across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mathematics" stroke="#3b82f6" strokeWidth={2} name="Mathematics" />
                <Line type="monotone" dataKey="english" stroke="#10b981" strokeWidth={2} name="English" />
                <Line type="monotone" dataKey="science" stroke="#f59e0b" strokeWidth={2} name="Science" />
                <Line type="monotone" dataKey="kiswahili" stroke="#ef4444" strokeWidth={2} name="Kiswahili" />
                <Line type="monotone" dataKey="social" stroke="#8b5cf6" strokeWidth={2} name="Social Studies" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Department Analysis</CardTitle>
            <CardDescription>Performance and ratings by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgPerformance" fill="#3b82f6" name="Avg Performance" />
                <Bar dataKey="avgRating" fill="#10b981" name="Avg Rating (x20)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Experience Distribution</CardTitle>
            <CardDescription>Teacher experience levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={experienceDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ range, count }) => `${range}: ${count}`}
                >
                  {experienceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Teacher Workload Analysis</CardTitle>
            <CardDescription>Classes, students, and teaching hours</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={teacherWorkload}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="teacher" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="students"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Students"
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Hours"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="teachers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="teachers">All Teachers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="teachers">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Teaching Staff Directory</CardTitle>
              <CardDescription>Manage and analyze teaching staff performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teachers, subjects, or employee ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Languages">Languages</SelectItem>
                    <SelectItem value="Sciences">Sciences</SelectItem>
                    <SelectItem value="Social Studies">Social Studies</SelectItem>
                    <SelectItem value="Creative Arts">Creative Arts</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Subject/Department</TableHead>
                      <TableHead>Classes</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-muted-foreground">{teacher.employeeId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{teacher.subject}</div>
                            <div className="text-sm text-muted-foreground">{teacher.department}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {teacher.classes.slice(0, 2).map((cls, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {cls}
                              </Badge>
                            ))}
                            {teacher.classes.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{teacher.classes.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{teacher.performance}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${teacher.performance}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{teacher.studentRating}</span>
                            <span className="text-yellow-500">★</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{teacher.attendance}%</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
                            {teacher.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleViewTeacher(teacher)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleEditTeacher(teacher)}
                              title="Edit Teacher"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleMessageTeacher(teacher)}
                              title="Send Message"
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleGenerateReport(teacher)}
                              title="Generate Report"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 transition-all duration-300 hover:scale-110"
                              onClick={() => handleDeleteTeacher(teacher)}
                              title="Delete Teacher"
                            >
                              <Trash2 className="h-4 w-4" />
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

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Qualification Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={qualificationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="count"
                      label={({ level, percentage }) => `${level}: ${percentage}%`}
                    >
                      {qualificationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={["#3b82f6", "#10b981", "#f59e0b"][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Teachers</CardTitle>
              <CardDescription>Based on student performance and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teachers
                  .sort((a, b) => b.performance - a.performance)
                  .slice(0, 5)
                  .map((teacher, index) => (
                    <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{teacher.name}</p>
                          <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{teacher.performance}% Performance</p>
                        <p className="text-sm text-muted-foreground">{teacher.studentRating}★ Rating</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departmentStats.map((dept, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {dept.department}
                    <Badge variant="outline">{dept.teachers} teachers</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Performance:</span>
                      <span className="font-medium">{dept.avgPerformance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Rating:</span>
                      <span className="font-medium">{dept.avgRating}★</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${dept.avgPerformance}%` }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create comprehensive reports for teachers and departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Department Performance Report</div>
                    <div className="text-sm text-muted-foreground">Comprehensive department analysis</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Teacher Evaluation Summary</div>
                    <div className="text-sm text-muted-foreground">Individual teacher assessments</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Attendance Report</div>
                    <div className="text-sm text-muted-foreground">Staff attendance analysis</div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Professional Development</div>
                    <div className="text-sm text-muted-foreground">Training and certification tracking</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Teacher Modal */}
      {showTeacherModal && (
        <TeacherModal teacher={selectedTeacher} onClose={() => setShowTeacherModal(false)} onSave={handleSaveTeacher} />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Delete Teacher"
        description={`Are you sure you want to delete ${teacherToDelete?.name}? This action cannot be undone.`}
        type="delete"
      />

      {/* Teacher View Modal */}
      {showViewModal && (
        <TeacherViewModal
          teacher={selectedTeacher}
          onClose={() => setShowViewModal(false)}
          onEdit={(teacher) => {
            setShowViewModal(false)
            handleEditTeacher(teacher)
          }}
          onMessage={(teacher, className) => {
            setShowViewModal(false)
            handleMessageTeacher(teacher, className)
          }}
          onGenerateReport={(teacher) => {
            setShowViewModal(false)
            handleGenerateReport(teacher)
          }}
        />
      )}

      {/* Teacher Message Modal */}
      {showMessageModal && (
        <TeacherMessageModal
          teacher={selectedTeacher}
          selectedClass={selectedClass}
          onClose={() => setShowMessageModal(false)}
          onSend={handleSendMessage}
        />
      )}

      {/* Teacher Report Modal */}
      {showReportModal && (
        <TeacherReportModal
          teacher={selectedTeacher}
          onClose={() => setShowReportModal(false)}
          onGenerate={handleReportGenerate}
        />
      )}
    </div>
  )
}

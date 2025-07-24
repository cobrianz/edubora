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
import {
  Users,
  Plus,
  Search,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  GraduationCap,
  MessageSquare,
  FileText,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  DollarSign,
  Mail,
  RefreshCw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

import StudentModal from "@/components/modals/student-modal"
import StudentViewModal from "@/components/modals/student-view-modal"
import StudentMessageModal from "@/components/modals/student-message-modal"
import StudentReportModal from "@/components/modals/student-report-modal"
import ConfirmationModal from "@/components/modals/confirmation-modal"

export default function StudentsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [studentToDelete, setStudentToDelete] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")

  const [students, setStudents] = useState([
    {
      id: "STU001",
      name: "Sarah Mwangi",
      class: "Grade 7A",
      admissionNumber: "ADM2024001",
      gender: "Female",
      age: 13,
      parent: "John Mwangi",
      phone: "+254712345678",
      email: "sarah.mwangi@school.edu",
      feeBalance: 15000,
      status: "Active",
      gpa: 3.8,
      attendance: 95,
      assignments: { completed: 28, total: 30 },
      lastLogin: "2024-12-15",
      subjects: ["Mathematics", "English", "Science", "Social Studies", "Kiswahili"],
      performance: { mathematics: 88, english: 92, science: 90, average: 90 },
    },
    {
      id: "STU002",
      name: "David Ochieng",
      class: "Grade 6B",
      admissionNumber: "ADM2024002",
      gender: "Male",
      age: 12,
      parent: "Mary Ochieng",
      phone: "+254723456789",
      email: "david.ochieng@school.edu",
      feeBalance: 0,
      status: "Active",
      gpa: 3.5,
      attendance: 92,
      assignments: { completed: 25, total: 28 },
      lastLogin: "2024-12-14",
      subjects: ["Mathematics", "English", "Science", "Social Studies"],
      performance: { mathematics: 82, english: 85, science: 88, average: 85 },
    },
    {
      id: "STU003",
      name: "Grace Akinyi",
      class: "Grade 8A",
      admissionNumber: "ADM2024003",
      gender: "Female",
      age: 14,
      parent: "Peter Akinyi",
      phone: "+254734567890",
      email: "grace.akinyi@school.edu",
      feeBalance: 8000,
      status: "Active",
      gpa: 3.9,
      attendance: 98,
      assignments: { completed: 32, total: 33 },
      lastLogin: "2024-12-15",
      subjects: ["Mathematics", "English", "Science", "Social Studies", "Kiswahili"],
      performance: { mathematics: 95, english: 94, science: 92, average: 94 },
    },
    {
      id: "STU004",
      name: "John Kamau",
      class: "Grade 5C",
      admissionNumber: "ADM2024004",
      gender: "Male",
      age: 11,
      parent: "Alice Kamau",
      phone: "+254745678901",
      email: "john.kamau@school.edu",
      feeBalance: 12000,
      status: "Inactive",
      gpa: 3.2,
      attendance: 88,
      assignments: { completed: 20, total: 25 },
      lastLogin: "2024-12-10",
      subjects: ["Mathematics", "English", "Science"],
      performance: { mathematics: 75, english: 78, science: 80, average: 78 },
    },
  ])

  // Analytics data
  const performanceData = [
    { month: "Sep", average: 82, mathematics: 80, english: 85, science: 81 },
    { month: "Oct", average: 85, mathematics: 83, english: 87, science: 84 },
    { month: "Nov", average: 87, mathematics: 85, english: 89, science: 87 },
    { month: "Dec", average: 89, mathematics: 87, english: 91, science: 89 },
  ]

  const gradeDistribution = [
    { grade: "A", count: 45, percentage: 35, color: "#10b981" },
    { grade: "B", count: 52, percentage: 40, color: "#3b82f6" },
    { grade: "C", count: 25, percentage: 20, color: "#f59e0b" },
    { grade: "D", count: 6, percentage: 5, color: "#ef4444" },
  ]

  const attendanceData = [
    { month: "Sep", present: 92, absent: 5, late: 3 },
    { month: "Oct", present: 94, absent: 4, late: 2 },
    { month: "Nov", present: 96, absent: 3, late: 1 },
    { month: "Dec", present: 95, absent: 3, late: 2 },
  ]

  const subjectPerformance = [
    { subject: "Mathematics", average: 85, students: 128, improvement: 5 },
    { subject: "English", average: 88, students: 128, improvement: 3 },
    { subject: "Science", average: 86, students: 128, improvement: 7 },
    { subject: "Social Studies", average: 82, students: 128, improvement: 2 },
    { subject: "Kiswahili", average: 80, students: 128, improvement: 4 },
  ]

  const feeAnalysis = [
    { category: "Fully Paid", count: 85, percentage: 66, amount: 3825000 },
    { category: "Partial Payment", count: 28, percentage: 22, amount: 1260000 },
    { category: "Outstanding", count: 15, percentage: 12, amount: 675000 },
  ]

  const classes = [
    { value: "all", label: "All Classes" },
    { value: "grade-1", label: "Grade 1" },
    { value: "grade-2", label: "Grade 2" },
    { value: "grade-3", label: "Grade 3" },
    { value: "grade-4", label: "Grade 4" },
    { value: "grade-5", label: "Grade 5" },
    { value: "grade-6", label: "Grade 6" },
    { value: "grade-7", label: "Grade 7" },
    { value: "grade-8", label: "Grade 8" },
    { value: "grade-9", label: "Grade 9" },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.parent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass =
      selectedClass === "all" || student.class.toLowerCase().includes(selectedClass.replace("-", " "))
    const matchesStatus = selectedStatus === "all" || student.status.toLowerCase() === selectedStatus.toLowerCase()
    return matchesSearch && matchesClass && matchesStatus
  })

  const handleAddStudent = () => {
    setSelectedStudent(null)
    setShowStudentModal(true)
  }

  const handleEditStudent = (student) => {
    setSelectedStudent(student)
    setShowStudentModal(true)
  }

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setShowViewModal(true)
  }

  const handleMessageStudent = (student) => {
    setSelectedStudent(student)
    setShowMessageModal(true)
  }

  const handleGenerateReport = (student) => {
    setSelectedStudent(student)
    setShowReportModal(true)
  }

  const handleDeleteStudent = (student) => {
    setStudentToDelete(student)
    setShowConfirmModal(true)
  }

  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter((s) => s.id !== studentToDelete.id))
      toast({
        title: "Student Deleted",
        description: `${studentToDelete.name} has been removed from the system`,
      })
      setStudentToDelete(null)
    }
  }

  const handleSaveStudent = (studentData) => {
    if (selectedStudent) {
      setStudents(students.map((s) => (s.id === selectedStudent.id ? { ...s, ...studentData } : s)))
      toast({
        title: "Student Updated",
        description: `${studentData.name} has been updated successfully`,
      })
    } else {
      const newStudent = {
        id: `STU${String(students.length + 1).padStart(3, "0")}`,
        ...studentData,
        feeBalance: 0,
        gpa: 0,
        attendance: 100,
        assignments: { completed: 0, total: 0 },
        lastLogin: new Date().toISOString().split("T")[0],
        subjects: [],
        performance: { mathematics: 0, english: 0, science: 0, average: 0 },
      }
      setStudents([...students, newStudent])
      toast({
        title: "Student Added",
        description: `${studentData.name} has been added successfully`,
      })
    }
    setShowStudentModal(false)
  }

  const handleSendMessage = (messageData) => {
    toast({
      title: "Message Sent",
      description: `Message sent successfully to ${messageData.recipients.length} recipient(s)`,
    })
    setShowMessageModal(false)
  }

  const handleReportGenerated = (reportConfig) => {
    toast({
      title: "Report Generated",
      description: `${reportConfig.reportType} report has been generated for ${reportConfig.student.name}`,
    })
    setShowReportModal(false)
  }

  const getGPAColor = (gpa) => {
    if (gpa >= 3.5) return "text-green-600"
    if (gpa >= 3.0) return "text-blue-600"
    if (gpa >= 2.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getAttendanceColor = (attendance) => {
    if (attendance >= 95) return "text-green-600"
    if (attendance >= 90) return "text-blue-600"
    if (attendance >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">Comprehensive student records and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" className="transition-all duration-300 hover:scale-105 bg-transparent">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button onClick={handleAddStudent} className="transition-all duration-300 hover:scale-105">
            <Plus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students.length}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students.filter((s) => s.status === "Active").length}</div>
                <p className="text-xs text-muted-foreground">96% of total</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.6</div>
                <p className="text-xs text-muted-foreground">+0.2 from last term</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fee Defaulters</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{students.filter((s) => s.feeBalance > 0).length}</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Analytics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Trends
                </CardTitle>
                <CardDescription>Monthly academic performance across subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={3} name="Average" />
                    <Line type="monotone" dataKey="mathematics" stroke="#10b981" strokeWidth={2} name="Mathematics" />
                    <Line type="monotone" dataKey="english" stroke="#f59e0b" strokeWidth={2} name="English" />
                    <Line type="monotone" dataKey="science" stroke="#ef4444" strokeWidth={2} name="Science" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Grade Distribution
                </CardTitle>
                <CardDescription>Current grade distribution across all students</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students, admission numbers, or parents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.value} value={cls.value}>
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>Student Records ({filteredStudents.length})</CardTitle>
              <CardDescription>Comprehensive student information and management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Parent/Guardian</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Fee Status</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-muted-foreground">{student.admissionNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{student.parent}</div>
                            <div className="text-sm text-muted-foreground">{student.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${getGPAColor(student.gpa)}`}>GPA: {student.gpa}</span>
                            <Progress value={student.performance.average} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                            {student.attendance}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={student.feeBalance > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                            KSh {student.feeBalance.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleViewStudent(student)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleEditStudent(student)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleMessageStudent(student)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleGenerateReport(student)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 transition-all duration-300 hover:scale-110"
                              onClick={() => handleDeleteStudent(student)}
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
          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Subject Performance Analysis
              </CardTitle>
              <CardDescription>Average performance across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="average" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Attendance Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Attendance Trends
                </CardTitle>
                <CardDescription>Monthly attendance patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="present"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                      name="Present"
                    />
                    <Area
                      type="monotone"
                      dataKey="absent"
                      stackId="1"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.6}
                      name="Absent"
                    />
                    <Area
                      type="monotone"
                      dataKey="late"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                      name="Late"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Fee Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Fee Collection Analysis
                </CardTitle>
                <CardDescription>Fee payment status distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feeAnalysis.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            backgroundColor: index === 0 ? "#10b981" : index === 1 ? "#f59e0b" : "#ef4444",
                          }}
                        />
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{item.count} students</div>
                        <div className="text-sm text-muted-foreground">KSh {item.amount.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students
                    .sort((a, b) => b.gpa - a.gpa)
                    .slice(0, 5)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <span className="text-green-600 font-bold">{student.gpa}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Attendance Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students
                    .sort((a, b) => b.attendance - a.attendance)
                    .slice(0, 5)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <span className="text-blue-600 font-bold">{student.attendance}%</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fee Defaulters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students
                    .filter((s) => s.feeBalance > 0)
                    .sort((a, b) => b.feeBalance - a.feeBalance)
                    .slice(0, 5)
                    .map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">#{index + 1}</Badge>
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <span className="text-red-600 font-bold">KSh {student.feeBalance.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
                <CardDescription>Generate common student reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  Class Performance Report
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  Attendance Summary
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Fee Collection Report
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Award className="mr-2 h-4 w-4" />
                  Academic Excellence Report
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Operations</CardTitle>
                <CardDescription>Perform actions on multiple students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Bulk Messages
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Parent Updates
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export Student Data
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Student Records
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showStudentModal && (
        <StudentModal student={selectedStudent} onClose={() => setShowStudentModal(false)} onSave={handleSaveStudent} />
      )}

      {showViewModal && (
        <StudentViewModal
          student={selectedStudent}
          onClose={() => setShowViewModal(false)}
          onEdit={handleEditStudent}
          onMessage={handleMessageStudent}
          onGenerateReport={handleGenerateReport}
        />
      )}

      {showMessageModal && (
        <StudentMessageModal
          student={selectedStudent}
          onClose={() => setShowMessageModal(false)}
          onSendMessage={handleSendMessage}
        />
      )}

      {showReportModal && (
        <StudentReportModal
          student={selectedStudent}
          onClose={() => setShowReportModal(false)}
          onGenerateReport={handleReportGenerated}
        />
      )}

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Delete Student"
        description={`Are you sure you want to delete ${studentToDelete?.name}? This action cannot be undone.`}
        type="delete"
      />
    </div>
  )
}

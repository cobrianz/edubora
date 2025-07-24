"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GraduationCap,
  Plus,
  BookOpen,
  Users,
  Settings,
  Eye,
  Edit,
  MessageSquare,
  FileText,
  BarChart3,
  TrendingUp,
  Target,
  Search,
  Download,
  Upload,
  Send,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Import modals
import ClassModal from "@/components/modals/class-modal"
import ConfirmationModal from "@/components/modals/confirmation-modal"
import ClassViewModal from "@/components/modals/class-view-modal"
import ClassSettingsModal from "@/components/modals/class-settings-modal"
import AssignmentModal from "@/components/modals/assignment-modal"
import AssignmentViewModal from "@/components/modals/assignment-view-modal"
import MessageComposeModal from "@/components/modals/message-compose-modal"
import LearningMaterialModal from "@/components/modals/learning-material-modal"
import CBCConfigurationModal from "@/components/modals/cbc-configuration-modal"
import AcademicReportModal from "@/components/modals/academic-report-modal"
import StudentProgressModal from "@/components/modals/student-progress-modal"
import SubjectManagementModal from "@/components/modals/subject-management-modal"
import SubjectPreviewModal from "@/components/modals/subject-preview-modal"
import SubjectConfigureModal from "@/components/modals/subject-configure-modal"
import ShareMaterialModal from "@/components/modals/share-material-modal"
import AssignmentSubmissionsModal from "@/components/modals/assignment-submissions-modal" // New import

export default function AcademicPage() {
  const { toast } = useToast()

  // Modal states
  const [showClassModal, setShowClassModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [showAssignmentViewModal, setShowAssignmentViewModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showMaterialModal, setShowMaterialModal] = useState(false)
  const [showCBCModal, setShowCBCModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [showSubjectPreviewModal, setShowSubjectPreviewModal] = useState(false)
  const [showSubjectConfigureModal, setShowSubjectConfigureModal] = useState(false)
  const [showShareMaterialModal, setShowShareMaterialModal] = useState(false)
  const [showAssignmentSubmissionsModal, setShowAssignmentSubmissionsModal] = useState(false) // New state

  const [selectedClass, setSelectedClass] = useState(null)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [classToDelete, setClassToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGrade, setFilterGrade] = useState("all")
  const [filterSubject, setFilterSubject] = useState("all")
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  // Sample data
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Grade 6A",
      students: 32,
      teacher: "Ms. Jane Doe",
      room: "Room 101",
      capacity: 35,
      subjects: ["Mathematics", "English", "Science", "Social Studies"],
      performance: 85,
      attendance: 94,
      assignments: 12,
      completedAssignments: 10,
    },
    {
      id: 2,
      name: "Grade 6B",
      students: 30,
      teacher: "Mr. John Smith",
      room: "Room 102",
      capacity: 35,
      subjects: ["Mathematics", "English", "Science", "Social Studies"],
      performance: 78,
      attendance: 91,
      assignments: 15,
      completedAssignments: 13,
    },
    {
      id: 3,
      name: "Grade 7A",
      students: 28,
      teacher: "Ms. Mary Johnson",
      room: "Room 201",
      capacity: 35,
      subjects: ["Mathematics", "English", "Science", "Social Studies", "Kiswahili"],
      performance: 92,
      attendance: 96,
      assignments: 18,
      completedAssignments: 16,
    },
    {
      id: 4,
      name: "Grade 7B",
      students: 31,
      teacher: "Mr. Peter Wilson",
      room: "Room 202",
      capacity: 35,
      subjects: ["Mathematics", "English", "Science", "Social Studies", "Kiswahili"],
      performance: 88,
      attendance: 93,
      assignments: 14,
      completedAssignments: 12,
    },
  ])

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Mathematics Problem Solving",
      subject: "Mathematics",
      class: "Grade 7A",
      dueDate: "2024-12-25",
      status: "Active",
      submissions: 24,
      totalStudents: 28,
      averageScore: 85,
      rubric: [
        { criteria: "Understanding", maxMarks: 25 },
        { criteria: "Application", maxMarks: 25 },
        { criteria: "Analysis", maxMarks: 25 },
        { criteria: "Communication", maxMarks: 25 },
      ],
      competencies: ["Critical Thinking", "Problem Solving", "Communication"],
      description: "Solve complex mathematical problems involving algebra and geometry.",
      instructions: "Show all your working. Use a calculator where necessary. Submit by due date.",
      duration: "2 hours",
      totalMarks: 100,
      // Sample student submissions for this assignment
      studentSubmissions: [
        {
          id: "SUB001",
          student: { id: "STU001", name: "John Doe", admissionNumber: "ADM2024001" },
          submittedDate: "2024-12-24",
          marks: 85,
          maxMarks: 100,
          grade: "A",
          status: "Graded",
          feedback: "Excellent work! Clear steps and accurate solutions.",
          attachments: ["john_doe_math_solution.pdf"],
        },
        {
          id: "SUB002",
          student: { id: "STU002", name: "Jane Smith", admissionNumber: "ADM2024002" },
          submittedDate: "2024-12-23",
          marks: 92,
          maxMarks: 100,
          grade: "A",
          status: "Graded",
          feedback: "Outstanding! Very thorough and well-presented.",
          attachments: ["jane_smith_math_solution.pdf"],
        },
        {
          id: "SUB003",
          student: { id: "STU003", name: "Mike Johnson", admissionNumber: "ADM2024003" },
          submittedDate: "2024-12-25",
          marks: null,
          maxMarks: 100,
          grade: null,
          status: "Pending",
          feedback: null,
          attachments: ["mike_johnson_math_solution.pdf"],
        },
        {
          id: "SUB004",
          student: { id: "STU004", name: "Emily White", admissionNumber: "ADM2024004" },
          submittedDate: "2024-12-24",
          marks: 78,
          maxMarks: 100,
          grade: "B",
          status: "Graded",
          feedback: "Good effort, but some minor errors in calculations.",
          attachments: ["emily_white_math_solution.pdf"],
        },
      ],
    },
    {
      id: 2,
      title: "English Essay Writing",
      subject: "English",
      class: "Grade 6A",
      dueDate: "2024-12-30",
      status: "Active",
      submissions: 18,
      totalStudents: 32,
      averageScore: 78,
      rubric: [
        { criteria: "Content", maxMarks: 15 },
        { criteria: "Language Use", maxMarks: 15 },
        { criteria: "Creativity", maxMarks: 10 },
        { criteria: "Organization", maxMarks: 10 },
      ],
      competencies: ["Communication", "Creativity"],
      description: "Write a persuasive essay on a given topic.",
      instructions: "Minimum 500 words. Include an introduction, body paragraphs, and conclusion.",
      duration: "1.5 hours",
      totalMarks: 50,
      studentSubmissions: [
        {
          id: "SUB005",
          student: { id: "STU005", name: "Chris Brown", admissionNumber: "ADM2024005" },
          submittedDate: "2024-12-29",
          marks: 42,
          maxMarks: 50,
          grade: "A",
          status: "Graded",
          feedback: "Well-argued essay with strong vocabulary.",
          attachments: ["chris_brown_essay.docx"],
        },
        {
          id: "SUB006",
          student: { id: "STU006", name: "Olivia Green", admissionNumber: "ADM2024006" },
          submittedDate: "2024-12-28",
          marks: null,
          maxMarks: 50,
          grade: null,
          status: "Pending",
          feedback: null,
          attachments: ["olivia_green_essay.docx"],
        },
      ],
    },
    {
      id: 3,
      title: "Science Experiment Report",
      subject: "Science",
      class: "Grade 7B",
      dueDate: "2024-12-20",
      status: "Completed",
      submissions: 31,
      totalStudents: 31,
      averageScore: 92,
      rubric: [
        { criteria: "Hypothesis", maxMarks: 20 },
        { criteria: "Method", maxMarks: 20 },
        { criteria: "Analysis", maxMarks: 20 },
        { criteria: "Conclusion", maxMarks: 15 },
      ],
      competencies: ["Critical Thinking", "Problem Solving", "Learning to Learn"],
      description: "Conduct an experiment and write a detailed report.",
      instructions: "Follow the scientific method. Include observations, data, and conclusions.",
      duration: "3 hours",
      totalMarks: 75,
      studentSubmissions: [
        {
          id: "SUB007",
          student: { id: "STU007", name: "Daniel Lee", admissionNumber: "ADM2024007" },
          submittedDate: "2024-12-19",
          marks: 68,
          maxMarks: 75,
          grade: "A",
          status: "Graded",
          feedback: "Outstanding report! Very clear and insightful.",
          attachments: ["daniel_lee_science_report.pdf"],
        },
      ],
    },
  ])

  const [learningMaterials, setLearningMaterials] = useState([
    {
      id: 1,
      title: "Grade 7 Mathematics Textbook",
      subject: "Mathematics",
      grade: "Grade 7",
      type: "Textbook",
      format: "PDF",
      size: "15.2 MB",
      downloads: 156,
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      title: "English Grammar Worksheets",
      subject: "English",
      grade: "Grade 6",
      type: "Worksheet",
      format: "PDF",
      size: "3.8 MB",
      downloads: 89,
      uploadDate: "2024-02-10",
    },
  ])

  // Analytics data
  const performanceData = [
    { month: "Sep", grade6: 78, grade7: 82, grade8: 85, grade9: 88 },
    { month: "Oct", grade6: 82, grade7: 85, grade8: 87, grade9: 90 },
    { month: "Nov", grade6: 85, grade7: 88, grade8: 90, grade9: 92 },
    { month: "Dec", grade6: 87, grade7: 90, grade8: 92, grade9: 94 },
  ]

  const subjectPerformance = [
    { subject: "Mathematics", average: 85, improvement: 5 },
    { subject: "English", average: 82, improvement: 3 },
    { subject: "Science", average: 88, improvement: 7 },
    { subject: "Social Studies", average: 79, improvement: 2 },
    { subject: "Kiswahili", average: 81, improvement: 4 },
  ]

  const competencyData = [
    { competency: "Critical Thinking", score: 85, fullMark: 100 },
    { competency: "Communication", score: 78, fullMark: 100 },
    { competency: "Problem Solving", score: 82, fullMark: 100 },
    { competency: "Creativity", score: 75, fullMark: 100 },
    { competency: "Digital Literacy", score: 88, fullMark: 100 },
    { competency: "Citizenship", score: 80, fullMark: 100 },
  ]

  const attendanceData = [
    { grade: "Grade 6", attendance: 92, target: 95 },
    { grade: "Grade 7", attendance: 94, target: 95 },
    { grade: "Grade 8", attendance: 91, target: 95 },
    { grade: "Grade 9", attendance: 96, target: 95 },
  ]

  const assignmentProgress = [
    { week: "Week 1", assigned: 12, completed: 8, pending: 4 },
    { week: "Week 2", assigned: 15, completed: 12, pending: 3 },
    { week: "Week 3", assigned: 18, completed: 16, pending: 2 },
    { week: "Week 4", assigned: 14, completed: 13, pending: 1 },
  ]

  // Handlers
  const handleAddClass = () => {
    setSelectedClass(null)
    setShowClassModal(true)
  }

  const handleEditClass = (classData) => {
    setSelectedClass(classData)
    setShowClassModal(true)
  }

  const handleViewClass = (classData) => {
    setSelectedClass(classData)
    setShowViewModal(true)
  }

  const handleClassSettings = (classData) => {
    setSelectedClass(classData)
    setShowSettingsModal(true)
  }

  const handleDeleteClass = (classData) => {
    setClassToDelete(classData)
    setShowConfirmModal(true)
  }

  const handleCreateAssignment = (classData = null) => {
    setSelectedClass(classData)
    setSelectedAssignment(null)
    setShowAssignmentModal(true)
  }

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment)
    setShowAssignmentViewModal(true)
  }

  const handleViewSubmissions = (assignment) => {
    setSelectedAssignment(assignment)
    setShowAssignmentSubmissionsModal(true)
  }

  const handleSendMessage = (recipient = null) => {
    setSelectedClass(recipient)
    setShowMessageModal(true)
  }

  const handleManageMaterials = () => {
    setShowMaterialModal(true)
  }

  const handleCBCConfiguration = () => {
    setShowCBCModal(true)
  }

  const handleGenerateReport = () => {
    setShowReportModal(true)
  }

  const handleViewProgress = (student) => {
    setSelectedStudent(student)
    setShowProgressModal(true)
  }

  const handleManageSubjects = () => {
    setShowSubjectModal(true)
  }

  const handleViewSubject = (subject) => {
    setSelectedSubject(subject)
    setShowSubjectPreviewModal(true)
  }

  const handleConfigureSubject = (subject) => {
    setSelectedSubject(subject)
    setShowSubjectConfigureModal(true)
  }

  const handleShareMaterial = (material) => {
    setSelectedMaterial(material)
    setShowShareMaterialModal(true)
  }

  const confirmDelete = () => {
    if (classToDelete) {
      setClasses(classes.filter((c) => c.id !== classToDelete.id))
      toast({
        title: "Class Deleted",
        description: `${classToDelete.name} has been removed`,
      })
      setClassToDelete(null)
    }
  }

  const handleSaveClass = (classData) => {
    if (selectedClass) {
      setClasses(classes.map((c) => (c.id === selectedClass.id ? { ...c, ...classData } : c)))
      toast({
        title: "Class Updated",
        description: `${classData.name} has been updated successfully`,
      })
    } else {
      const newClass = {
        id: classes.length + 1,
        ...classData,
        students: 0,
        performance: 0,
        attendance: 0,
        assignments: 0,
        completedAssignments: 0,
      }
      setClasses([...classes, newClass])
      toast({
        title: "Class Created",
        description: `${classData.name} has been created successfully`,
      })
    }
    setShowClassModal(false)
  }

  const handleSaveAssignment = (assignmentData) => {
    if (selectedAssignment) {
      setAssignments(assignments.map((a) => (a.id === selectedAssignment.id ? { ...a, ...assignmentData } : a)))
      toast({
        title: "Assignment Updated",
        description: `${assignmentData.title} has been updated successfully`,
      })
    } else {
      const newAssignment = {
        id: assignments.length + 1,
        ...assignmentData,
        submissions: 0,
        averageScore: 0,
        studentSubmissions: [], // Initialize with empty submissions
      }
      setAssignments([...assignments, newAssignment])
      toast({
        title: "Assignment Created",
        description: `${assignmentData.title} has been created successfully`,
      })
    }
    setShowAssignmentModal(false)
  }

  const handleUpdateSubmission = (updatedSubmission) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) => {
        if (assignment.id === selectedAssignment.id) {
          const updatedSubmissions = assignment.studentSubmissions.map((sub) =>
            sub.id === updatedSubmission.id ? updatedSubmission : sub,
          )
          // Recalculate average score and submissions count
          const gradedSubmissions = updatedSubmissions.filter((s) => s.status === "Graded")
          const newAverageScore =
            gradedSubmissions.length > 0
              ? Math.round(
                  gradedSubmissions.reduce((sum, sub) => sum + (sub.marks / sub.maxMarks) * 100, 0) /
                    gradedSubmissions.length,
                )
              : 0
          return {
            ...assignment,
            studentSubmissions: updatedSubmissions,
            submissions: updatedSubmissions.filter((s) => s.status !== "Pending").length,
            averageScore: newAverageScore,
          }
        }
        return assignment
      }),
    )
    toast({
      title: "Submission Graded",
      description: `Grade for ${updatedSubmission.student.name} has been saved.`,
    })
  }

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === "all" || cls.name.toLowerCase().includes(filterGrade.replace("-", " "))
    return matchesSearch && matchesGrade
  })

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = filterSubject === "all" || assignment.subject.toLowerCase() === filterSubject
    return matchesSearch && matchesSubject
  })

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Management</h1>
          <p className="text-muted-foreground">Comprehensive CBC academic system with analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCBCConfiguration}>
            <Settings className="mr-2 h-4 w-4" />
            CBC Config
          </Button>
          <Button variant="outline" onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button onClick={handleAddClass}>
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <GraduationCap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{classes.length}</div>
            <p className="text-xs text-muted-foreground">Across all grades</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {classes.reduce((sum, cls) => sum + cls.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled students</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(classes.reduce((sum, cls) => sum + cls.performance, 0) / classes.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall average</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {assignments.filter((a) => a.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Trends by Grade
            </CardTitle>
            <CardDescription>Monthly academic performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="grade6" stroke="#3b82f6" strokeWidth={2} name="Grade 6" />
                <Line type="monotone" dataKey="grade7" stroke="#10b981" strokeWidth={2} name="Grade 7" />
                <Line type="monotone" dataKey="grade8" stroke="#f59e0b" strokeWidth={2} name="Grade 8" />
                <Line type="monotone" dataKey="grade9" stroke="#ef4444" strokeWidth={2} name="Grade 9" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              CBC Competency Development
            </CardTitle>
            <CardDescription>Core competency assessment scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={competencyData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="competency" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Subject Performance Analysis</CardTitle>
            <CardDescription>Average scores and improvement trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#10b981" name="Average Score" />
                <Bar dataKey="improvement" fill="#3b82f6" name="Improvement" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Assignment Progress Tracking</CardTitle>
            <CardDescription>Weekly assignment completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={assignmentProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Completed"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Pending"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="classes" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="materials">Learning Materials</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Class Management</CardTitle>
                  <CardDescription>Manage classes, assignments, and student progress</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleSendMessage()}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button variant="outline" onClick={handleManageSubjects}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Manage Subjects
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search classes or teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterGrade} onValueChange={setFilterGrade}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="grade-6">Grade 6</SelectItem>
                    <SelectItem value="grade-7">Grade 7</SelectItem>
                    <SelectItem value="grade-8">Grade 8</SelectItem>
                    <SelectItem value="grade-9">Grade 9</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredClasses.map((cls) => (
                  <Card key={cls.id} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{cls.name}</CardTitle>
                        <Badge variant={cls.students >= cls.capacity ? "destructive" : "default"}>
                          {cls.students}/{cls.capacity}
                        </Badge>
                      </div>
                      <CardDescription>
                        {cls.teacher} • {cls.room}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Performance:</span>
                          <span className="font-medium">{cls.performance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Attendance:</span>
                          <span className="font-medium">{cls.attendance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Assignments:</span>
                          <span className="font-medium">
                            {cls.completedAssignments}/{cls.assignments}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {cls.subjects.slice(0, 3).map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                          {cls.subjects.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{cls.subjects.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-1 pt-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewClass(cls)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditClass(cls)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleClassSettings(cls)}>
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleCreateAssignment(cls)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Assignment Management</CardTitle>
                  <CardDescription>Create, manage, and track assignments across all classes</CardDescription>
                </div>
                <Button onClick={() => handleCreateAssignment()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Assignment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search assignments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="social studies">Social Studies</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assignment.title}</div>
                            <div className="text-sm text-muted-foreground">{assignment.subject}</div>
                          </div>
                        </TableCell>
                        <TableCell>{assignment.class}</TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {assignment.submissions}/{assignment.totalStudents}
                            </span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${(assignment.submissions / assignment.totalStudents) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{assignment.averageScore}%</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={assignment.status === "Active" ? "default" : "secondary"}>
                            {assignment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleViewAssignment(assignment)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleViewSubmissions(assignment)}>
                              <Edit className="h-4 w-4 mr-1" />
                              Grade
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

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Learning Materials</CardTitle>
                  <CardDescription>Manage and share educational resources</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Material
                  </Button>
                  <Button onClick={handleManageMaterials}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Material
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {learningMaterials.map((material) => (
                  <Card key={material.id} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{material.title}</CardTitle>
                          <CardDescription>
                            {material.subject} • {material.grade}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{material.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Format:</span>
                          <span>{material.format}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Size:</span>
                          <span>{material.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Downloads:</span>
                          <span>{material.downloads}</span>
                        </div>
                        <div className="flex gap-1 pt-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewSubject(material)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleShareMaterial(material)}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Subject Configuration</CardTitle>
                  <CardDescription>Configure CBC subjects and curriculum structure</CardDescription>
                </div>
                <Button onClick={() => handleConfigureSubject(null)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Subject
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subjectPerformance.map((subject, index) => (
                  <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{subject.subject}</CardTitle>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Average Score:</span>
                          <span className="font-medium">{subject.average}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Improvement:</span>
                          <span className="font-medium text-green-600">+{subject.improvement}%</span>
                        </div>
                        <div className="flex gap-1 pt-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewSubject(subject)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleConfigureSubject(subject)}>
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Attendance vs Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grade" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="attendance" fill="#10b981" name="Attendance" />
                    <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes
                    .sort((a, b) => b.performance - a.performance)
                    .slice(0, 4)
                    .map((cls, index) => (
                      <div key={cls.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{cls.name}</p>
                            <p className="text-sm text-muted-foreground">{cls.teacher}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{cls.performance}%</p>
                          <p className="text-sm text-muted-foreground">{cls.students} students</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showClassModal && (
        <ClassModal classData={selectedClass} onClose={() => setShowClassModal(false)} onSave={handleSaveClass} />
      )}

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Delete Class"
        description={`Are you sure you want to delete ${classToDelete?.name}? This action cannot be undone.`}
        type="delete"
      />

      {showViewModal && (
        <ClassViewModal
          classData={selectedClass}
          onClose={() => setShowViewModal(false)}
          onEdit={handleEditClass}
          onSettings={handleClassSettings}
          onCreateAssignment={handleCreateAssignment}
        />
      )}

      {showSettingsModal && (
        <ClassSettingsModal
          classData={selectedClass}
          onClose={() => setShowSettingsModal(false)}
          onSave={(settings) => {
            toast({
              title: "Settings Updated",
              description: "Class settings have been updated successfully",
            })
            setShowSettingsModal(false)
          }}
        />
      )}

      {showAssignmentModal && (
        <AssignmentModal
          assignment={selectedAssignment}
          classData={selectedClass}
          onClose={() => setShowAssignmentModal(false)}
          onSave={handleSaveAssignment}
        />
      )}

      {showAssignmentViewModal && (
        <AssignmentViewModal
          assignment={selectedAssignment}
          onClose={() => setShowAssignmentViewModal(false)}
          onEdit={(assignment) => {
            setSelectedAssignment(assignment)
            setShowAssignmentViewModal(false)
            setShowAssignmentModal(true)
          }}
        />
      )}

      {showAssignmentSubmissionsModal && (
        <AssignmentSubmissionsModal
          assignment={selectedAssignment}
          onClose={() => setShowAssignmentSubmissionsModal(false)}
          onUpdateSubmission={handleUpdateSubmission}
        />
      )}

      {showMessageModal && (
        <MessageComposeModal
          recipient={selectedClass}
          onClose={() => setShowMessageModal(false)}
          onSend={(messageData) => {
            toast({
              title: "Message Sent",
              description: "Message has been sent successfully",
            })
            setShowMessageModal(false)
          }}
        />
      )}

      {showMaterialModal && (
        <LearningMaterialModal
          onClose={() => setShowMaterialModal(false)}
          onSave={(materialData) => {
            setLearningMaterials([...learningMaterials, { id: learningMaterials.length + 1, ...materialData }])
            toast({
              title: "Material Added",
              description: "Learning material has been added successfully",
            })
            setShowMaterialModal(false)
          }}
        />
      )}

      {showCBCModal && (
        <CBCConfigurationModal
          onClose={() => setShowCBCModal(false)}
          onSave={(config) => {
            toast({
              title: "CBC Configuration Updated",
              description: "CBC settings have been updated successfully",
            })
            setShowCBCModal(false)
          }}
        />
      )}

      {showReportModal && (
        <AcademicReportModal
          onClose={() => setShowReportModal(false)}
          onGenerate={(reportConfig) => {
            toast({
              title: "Report Generated",
              description: "Academic report has been generated successfully",
            })
            setShowReportModal(false)
          }}
        />
      )}

      {showProgressModal && (
        <StudentProgressModal student={selectedStudent} onClose={() => setShowProgressModal(false)} />
      )}

      {showSubjectModal && (
        <SubjectManagementModal
          onClose={() => setShowSubjectModal(false)}
          onSave={(subjectData) => {
            toast({
              title: "Subject Updated",
              description: "Subject has been updated successfully",
            })
            setShowSubjectModal(false)
          }}
        />
      )}

      {showSubjectPreviewModal && (
        <SubjectPreviewModal
          subject={selectedSubject}
          onClose={() => setShowSubjectPreviewModal(false)}
          onConfigure={(subject) => {
            setShowSubjectPreviewModal(false)
            handleConfigureSubject(subject)
          }}
        />
      )}

      {showSubjectConfigureModal && (
        <SubjectConfigureModal
          subject={selectedSubject}
          onClose={() => setShowSubjectConfigureModal(false)}
          onSave={(config) => {
            toast({
              title: "Subject Configured",
              description: "Subject configuration has been saved successfully",
            })
            setShowSubjectConfigureModal(false)
          }}
        />
      )}

      {showShareMaterialModal && (
        <ShareMaterialModal
          material={selectedMaterial}
          onClose={() => setShowShareMaterialModal(false)}
          onShare={(shareData) => {
            toast({
              title: "Material Shared",
              description: "Learning material has been shared successfully",
            })
            setShowShareMaterialModal(false)
          }}
        />
      )}
    </div>
  )
}

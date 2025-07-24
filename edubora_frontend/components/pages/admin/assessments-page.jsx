"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ClipboardList,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Calendar,
  Users,
  Target,
  TrendingUp,
  PieChart,
  FileText,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import {
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts"

// Import modals
import AssessmentModal from "@/components/modals/assessment-modal"
import StudentAssessmentModal from "@/components/modals/student-assessment-modal"
import AssessmentViewModal from "@/components/modals/assessment-view-modal"
import AssessmentReportModal from "@/components/modals/assessment-report-modal"
import ConfirmationModal from "@/components/modals/confirmation-modal"

export default function AssessmentsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Modal states
  const [showAssessmentModal, setShowAssessmentModal] = useState(false)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [assessmentToDelete, setAssessmentToDelete] = useState(null)

  const [assessments, setAssessments] = useState([
    {
      id: "ASS001",
      title: "Mathematics Problem Solving Assessment",
      subject: "Mathematics",
      class: "Grade 7A",
      type: "Formative Assessment",
      date: "2024-12-15",
      duration: "90 minutes",
      totalMarks: 100,
      status: "Published",
      studentsAttempted: 32,
      averageScore: 78.5,
      competencies: ["Critical Thinking", "Problem Solving", "Communication"],
      createdBy: "Mrs. Johnson",
      createdDate: "2024-12-01",
      rubric: [
        { criteria: "Understanding", maxMarks: 25, description: "Demonstrates clear understanding of concepts" },
        { criteria: "Application", maxMarks: 25, description: "Applies knowledge to solve problems" },
        { criteria: "Analysis", maxMarks: 25, description: "Analyzes information critically" },
        { criteria: "Communication", maxMarks: 25, description: "Communicates ideas clearly" },
      ],
      description: "Comprehensive assessment focusing on mathematical problem-solving skills and critical thinking.",
      instructions: "Read all questions carefully. Show your working for all calculations. Time limit: 90 minutes.",
    },
    {
      id: "ASS002",
      title: "English Creative Writing Portfolio",
      subject: "English",
      class: "Grade 6B",
      type: "Summative Assessment",
      date: "2024-12-20",
      duration: "2 weeks",
      totalMarks: 50,
      status: "Draft",
      studentsAttempted: 0,
      averageScore: 0,
      competencies: ["Communication", "Creativity", "Self-Efficacy"],
      createdBy: "Mr. Smith",
      createdDate: "2024-12-05",
      rubric: [
        { criteria: "Content", maxMarks: 15, description: "Quality and relevance of content" },
        { criteria: "Language Use", maxMarks: 15, description: "Grammar, vocabulary, and style" },
        { criteria: "Creativity", maxMarks: 10, description: "Originality and creative expression" },
        { criteria: "Organization", maxMarks: 10, description: "Structure and flow of writing" },
      ],
      description: "Portfolio-based assessment showcasing creative writing skills across different genres.",
      instructions: "Create a portfolio with 5 pieces: poem, short story, descriptive essay, dialogue, and reflection.",
    },
    {
      id: "ASS003",
      title: "Science Practical Investigation",
      subject: "Science",
      class: "Grade 8A",
      type: "Performance Task",
      date: "2024-12-25",
      duration: "3 hours",
      totalMarks: 75,
      status: "Completed",
      studentsAttempted: 28,
      averageScore: 82.3,
      competencies: ["Critical Thinking", "Learning to Learn", "Problem Solving"],
      createdBy: "Dr. Wilson",
      createdDate: "2024-11-20",
      rubric: [
        { criteria: "Hypothesis", maxMarks: 20, description: "Clear and testable hypothesis" },
        { criteria: "Method", maxMarks: 20, description: "Appropriate methodology and procedure" },
        { criteria: "Analysis", maxMarks: 20, description: "Data analysis and interpretation" },
        { criteria: "Conclusion", maxMarks: 15, description: "Valid conclusions and recommendations" },
      ],
      description: "Hands-on scientific investigation focusing on experimental design and analysis.",
      instructions: "Design and conduct an experiment to test your hypothesis. Document all procedures and findings.",
    },
  ])

  // Sample analytics data
  const performanceData = [
    { month: "Sep", average: 75.2, assessments: 12 },
    { month: "Oct", average: 78.1, assessments: 15 },
    { month: "Nov", average: 82.3, assessments: 18 },
    { month: "Dec", average: 79.8, assessments: 14 },
  ]

  const subjectPerformance = [
    { subject: "Mathematics", average: 78.5, assessments: 8, students: 120 },
    { subject: "English", average: 82.1, assessments: 6, students: 120 },
    { subject: "Science", average: 75.3, assessments: 7, students: 120 },
    { subject: "Social Studies", average: 80.7, assessments: 5, students: 120 },
    { subject: "Kiswahili", average: 79.2, assessments: 4, students: 120 },
  ]

  const competencyData = [
    { competency: "Critical Thinking", score: 85, assessments: 15 },
    { competency: "Communication", score: 78, assessments: 12 },
    { competency: "Problem Solving", score: 82, assessments: 10 },
    { competency: "Creativity", score: 75, assessments: 8 },
    { competency: "Digital Literacy", score: 88, assessments: 6 },
    { competency: "Learning to Learn", score: 80, assessments: 9 },
  ]

  const gradeDistribution = [
    { grade: "A", count: 45, percentage: 25, color: "#10b981" },
    { grade: "B", count: 68, percentage: 38, color: "#3b82f6" },
    { grade: "C", count: 52, percentage: 29, color: "#f59e0b" },
    { grade: "D", count: 12, percentage: 7, color: "#ef4444" },
    { grade: "E", count: 3, percentage: 1, color: "#6b7280" },
  ]

  const assessmentTypes = [
    { type: "Formative", count: 15, percentage: 45 },
    { type: "Summative", count: 12, percentage: 36 },
    { type: "Performance Task", count: 6, percentage: 18 },
  ]

  const competencyRadar = [
    { subject: "Critical Thinking", A: 85, fullMark: 100 },
    { subject: "Communication", A: 78, fullMark: 100 },
    { subject: "Problem Solving", A: 82, fullMark: 100 },
    { subject: "Creativity", A: 75, fullMark: 100 },
    { subject: "Digital Literacy", A: 88, fullMark: 100 },
    { subject: "Citizenship", A: 80, fullMark: 100 },
  ]

  const classes = [
    { value: "all", label: "All Classes" },
    { value: "grade-6", label: "Grade 6" },
    { value: "grade-7", label: "Grade 7" },
    { value: "grade-8", label: "Grade 8" },
    { value: "grade-9", label: "Grade 9" },
  ]

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "mathematics", label: "Mathematics" },
    { value: "english", label: "English" },
    { value: "science", label: "Science" },
    { value: "social-studies", label: "Social Studies" },
    { value: "kiswahili", label: "Kiswahili" },
  ]

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass =
      selectedClass === "all" || assessment.class.toLowerCase().includes(selectedClass.replace("-", " "))
    const matchesSubject =
      selectedSubject === "all" || assessment.subject.toLowerCase().includes(selectedSubject.replace("-", " "))
    const matchesStatus = selectedStatus === "all" || assessment.status.toLowerCase() === selectedStatus
    return matchesSearch && matchesClass && matchesSubject && matchesStatus
  })

  const handleAddAssessment = () => {
    setSelectedAssessment(null)
    setShowAssessmentModal(true)
  }

  const handleEditAssessment = (assessment) => {
    setSelectedAssessment(assessment)
    setShowAssessmentModal(true)
  }

  const handleViewAssessment = (assessment) => {
    setSelectedAssessment(assessment)
    setShowViewModal(true)
  }

  const handleDeleteAssessment = (assessment) => {
    setAssessmentToDelete(assessment)
    setShowConfirmModal(true)
  }

  const handleViewStudentAssessment = (student) => {
    setSelectedStudent(student)
    setShowStudentModal(true)
  }

  const confirmDelete = () => {
    if (assessmentToDelete) {
      setAssessments(assessments.filter((a) => a.id !== assessmentToDelete.id))
      toast({
        title: "Assessment Deleted",
        description: `${assessmentToDelete.title} has been removed`,
      })
      setAssessmentToDelete(null)
    }
  }

  const handleSaveAssessment = (assessmentData) => {
    if (selectedAssessment) {
      setAssessments(assessments.map((a) => (a.id === selectedAssessment.id ? { ...a, ...assessmentData } : a)))
      toast({
        title: "Assessment Updated",
        description: `${assessmentData.title} has been updated successfully`,
      })
    } else {
      const newAssessment = {
        ...assessmentData,
        studentsAttempted: 0,
        averageScore: 0,
        createdBy: "Current User",
      }
      setAssessments([...assessments, newAssessment])
      toast({
        title: "Assessment Created",
        description: `${assessmentData.title} has been created successfully`,
      })
    }
    setShowAssessmentModal(false)
  }

  const handleExportResults = () => {
    toast({
      title: "Export Started",
      description: "Generating assessment results report...",
    })
  }

  const handleGenerateReport = () => {
    setShowReportModal(true)
  }

  // Calculate statistics
  const totalAssessments = assessments.length
  const activeAssessments = assessments.filter((a) => a.status === "Published").length
  const completedAssessments = assessments.filter((a) => a.status === "Completed").length
  const averageScore = Math.round(
    assessments.filter((a) => a.status === "Completed").reduce((sum, a) => sum + a.averageScore, 0) /
      completedAssessments || 0,
  )
  const totalStudentsAssessed = assessments.reduce((sum, a) => sum + a.studentsAttempted, 0)

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessment Management</h1>
          <p className="text-muted-foreground">Comprehensive CBC assessment system with analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={handleExportResults}>
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
          <Button onClick={handleAddAssessment}>
            <Plus className="mr-2 h-4 w-4" />
            Create Assessment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <ClipboardList className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalAssessments}</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assessments</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeAssessments}</div>
            <p className="text-xs text-muted-foreground">Currently published</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Assessed</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{totalStudentsAssessed}</div>
            <p className="text-xs text-muted-foreground">Total attempts</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>Monthly assessment performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="average"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Grade Distribution
            </CardTitle>
            <CardDescription>Overall grade distribution across assessments</CardDescription>
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

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Subject Performance
            </CardTitle>
            <CardDescription>Average performance by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              CBC Competencies
            </CardTitle>
            <CardDescription>Core competency development tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={competencyRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Assessment Management System
          </CardTitle>
          <CardDescription>Create, manage, and analyze CBC assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Assessments</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search assessments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
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
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssessments.map((assessment) => (
                      <TableRow key={assessment.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{assessment.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {assessment.totalMarks} marks • {assessment.duration}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{assessment.subject}</TableCell>
                        <TableCell>{assessment.class}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{assessment.type}</Badge>
                        </TableCell>
                        <TableCell>{new Date(assessment.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              assessment.status === "Completed"
                                ? "default"
                                : assessment.status === "Published"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {assessment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {assessment.status === "Completed" ? (
                            <div className="text-sm">
                              <div className="font-medium">{assessment.studentsAttempted} students</div>
                              <div className="text-muted-foreground">{assessment.averageScore}% avg</div>
                            </div>
                          ) : assessment.status === "Published" ? (
                            <div className="text-sm text-blue-600">
                              <div>{assessment.studentsAttempted} attempted</div>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not started</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleViewAssessment(assessment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleEditAssessment(assessment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 transition-all duration-300 hover:scale-110"
                              onClick={() => handleDeleteAssessment(assessment)}
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
            </TabsContent>

            <TabsContent value="published">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Students Attempted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssessments
                      .filter((a) => a.status === "Published")
                      .map((assessment) => (
                        <TableRow key={assessment.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">{assessment.title}</TableCell>
                          <TableCell>{assessment.subject}</TableCell>
                          <TableCell>{assessment.class}</TableCell>
                          <TableCell>
                            <span className="text-sm text-blue-600">{assessment.studentsAttempted} students</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewAssessment(assessment)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEditAssessment(assessment)}
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
            </TabsContent>

            <TabsContent value="draft">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Created By</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssessments
                      .filter((a) => a.status === "Draft")
                      .map((assessment) => (
                        <TableRow key={assessment.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">{assessment.title}</TableCell>
                          <TableCell>{assessment.subject}</TableCell>
                          <TableCell>{assessment.class}</TableCell>
                          <TableCell>{new Date(assessment.createdDate).toLocaleDateString()}</TableCell>
                          <TableCell>{assessment.createdBy}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEditAssessment(assessment)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600"
                                onClick={() => handleDeleteAssessment(assessment)}
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
            </TabsContent>

            <TabsContent value="completed">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssessments
                      .filter((a) => a.status === "Completed")
                      .map((assessment) => (
                        <TableRow key={assessment.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">{assessment.title}</TableCell>
                          <TableCell>{assessment.subject}</TableCell>
                          <TableCell>{assessment.class}</TableCell>
                          <TableCell>{assessment.studentsAttempted}</TableCell>
                          <TableCell>
                            <Badge variant="default">{assessment.averageScore}%</Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleViewAssessment(assessment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modals */}
      {showAssessmentModal && (
        <AssessmentModal
          assessment={selectedAssessment}
          onClose={() => setShowAssessmentModal(false)}
          onSave={handleSaveAssessment}
        />
      )}

      {showStudentModal && (
        <StudentAssessmentModal
          student={selectedStudent}
          assessments={assessments}
          onClose={() => setShowStudentModal(false)}
        />
      )}

      {showViewModal && <AssessmentViewModal assessment={selectedAssessment} onClose={() => setShowViewModal(false)} />}

      {showReportModal && <AssessmentReportModal onClose={() => setShowReportModal(false)} />}

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
        title="Delete Assessment"
        description={`Are you sure you want to delete ${assessmentToDelete?.title}? This action cannot be undone.`}
        type="delete"
      />
    </div>
  )
}

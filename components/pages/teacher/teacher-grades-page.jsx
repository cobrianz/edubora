"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Search, Edit, Download, BarChart3, TrendingUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import GradeAssignmentModal from "@/components/modals/grade-assignment-modal"

export default function TeacherGradesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [showGradeModal, setShowGradeModal] = useState(false)

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      student: "Sarah Mwangi",
      class: "Grade 7A",
      assignment: "Mathematics Worksheet",
      subject: "Mathematics",
      submittedDate: "2024-07-15",
      maxMarks: 50,
      marks: 45,
      grade: "A-",
      status: "Graded",
      feedback: "Excellent work! Keep it up.",
    },
    {
      id: 2,
      student: "David Ochieng",
      class: "Grade 7A",
      assignment: "Mathematics Worksheet",
      subject: "Mathematics",
      submittedDate: "2024-07-15",
      maxMarks: 50,
      marks: null,
      grade: null,
      status: "Pending",
      feedback: null,
    },
    {
      id: 3,
      student: "Grace Akinyi",
      class: "Grade 8B",
      assignment: "Science Project",
      subject: "Science",
      submittedDate: "2024-07-14",
      maxMarks: 100,
      marks: 88,
      grade: "A",
      status: "Graded",
      feedback: "Outstanding project with great research.",
    },
    {
      id: 4,
      student: "John Kamau",
      class: "Grade 7A",
      assignment: "Mathematics Worksheet",
      subject: "Mathematics",
      submittedDate: "2024-07-16",
      maxMarks: 50,
      marks: null,
      grade: null,
      status: "Pending",
      feedback: null,
    },
  ])

  const gradeDistribution = [
    { grade: "A", count: 8, percentage: 25 },
    { grade: "A-", count: 6, percentage: 19 },
    { grade: "B+", count: 10, percentage: 31 },
    { grade: "B", count: 5, percentage: 16 },
    { grade: "B-", count: 3, percentage: 9 },
  ]

  const classes = [
    { value: "all", label: "All Classes" },
    { value: "grade-7a", label: "Grade 7A" },
    { value: "grade-8b", label: "Grade 8B" },
  ]

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.assignment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass =
      selectedClass === "all" || submission.class.toLowerCase().includes(selectedClass.replace("-", " "))
    return matchesSearch && matchesClass
  })

  const handleGradeSubmission = (submission) => {
    setSelectedSubmission(submission)
    setShowGradeModal(true)
  }

  const handleSaveGrade = (gradeData) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((sub) =>
        sub.id === gradeData.id
          ? {
              ...sub,
              marks: gradeData.marks,
              grade: gradeData.grade,
              feedback: gradeData.feedback,
              status: "Graded",
            }
          : sub,
      ),
    )
    toast({
      title: "Grade Saved",
      description: `Grade saved for ${gradeData.student}`,
    })
    setShowGradeModal(false)
  }

  const handleExportGrades = () => {
    toast({
      title: "Export Grades",
      description: "Generating grade report...",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Graded":
        return "default"
      case "Pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getGradeColor = (grade) => {
    if (!grade) return ""
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grade Management</h1>
          <p className="text-muted-foreground">Grade assignments and track student performance</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleExportGrades}
            className="transition-all duration-300 hover:scale-105 bg-transparent"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Grades
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            <Edit className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {submissions.filter((s) => s.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">B+</div>
            <p className="text-xs text-muted-foreground">Class average</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">Graded submissions</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Grade Management</CardTitle>
          <CardDescription>Grade student submissions and track performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="submissions" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="pending">Pending Grading</TabsTrigger>
                <TabsTrigger value="graded">Graded</TabsTrigger>
                <TabsTrigger value="analytics">Grade Analytics</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search submissions..."
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
              </div>
            </div>

            <TabsContent value="submissions" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{submission.student}</TableCell>
                        <TableCell>{submission.assignment}</TableCell>
                        <TableCell>{submission.class}</TableCell>
                        <TableCell>{submission.submittedDate}</TableCell>
                        <TableCell>{submission.marks ? `${submission.marks}/${submission.maxMarks}` : "-"}</TableCell>
                        <TableCell>
                          {submission.grade ? (
                            <Badge variant="outline" className={getGradeColor(submission.grade)}>
                              {submission.grade}
                            </Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(submission.status)}>{submission.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleGradeSubmission(submission)}
                            className="transition-all duration-300 hover:scale-105"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            {submission.status === "Pending" ? "Grade" : "Edit"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Max Marks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions
                      .filter((s) => s.status === "Pending")
                      .map((submission) => (
                        <TableRow key={submission.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">{submission.student}</TableCell>
                          <TableCell>{submission.assignment}</TableCell>
                          <TableCell>{submission.submittedDate}</TableCell>
                          <TableCell>{submission.maxMarks}</TableCell>
                          <TableCell>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleGradeSubmission(submission)}
                              className="transition-all duration-300 hover:scale-105"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Grade Now
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="graded" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions
                      .filter((s) => s.status === "Graded")
                      .map((submission) => (
                        <TableRow key={submission.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">{submission.student}</TableCell>
                          <TableCell>{submission.assignment}</TableCell>
                          <TableCell>
                            {submission.marks}/{submission.maxMarks}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getGradeColor(submission.grade)}>
                              {submission.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{submission.feedback}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleGradeSubmission(submission)}
                              className="transition-all duration-300 hover:scale-105"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>Overview of student performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {gradeDistribution.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getGradeColor(item.grade)}>
                              Grade {item.grade}
                            </Badge>
                            <span className="text-sm">{item.count} students</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                            </div>
                            <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                    <CardDescription>Key metrics and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm font-medium">Class Average</p>
                        <p className="text-2xl font-bold text-green-600">82%</p>
                        <p className="text-xs text-muted-foreground">+5% from last assessment</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm font-medium">Top Performer</p>
                        <p className="text-lg font-semibold">Grace Akinyi</p>
                        <p className="text-xs text-muted-foreground">88% average</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm font-medium">Needs Attention</p>
                        <p className="text-lg font-semibold">2 students</p>
                        <p className="text-xs text-muted-foreground">Below 60% average</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Grade Assignment Modal */}
      {showGradeModal && (
        <GradeAssignmentModal
          submission={selectedSubmission}
          onClose={() => setShowGradeModal(false)}
          onSave={handleSaveGrade}
        />
      )}
    </div>
  )
}

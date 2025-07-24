"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClipboardList, Plus, Calendar, Users, Eye, Edit, FileText, BarChart3 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import AssessmentFormModal from "@/components/modals/assessment-form-modal"
import AssessmentViewModal from "@/components/modals/assessment-view-modal"

export default function TeacherAssessmentsPage() {
  const { toast } = useToast()
  const [showAssessmentModal, setShowAssessmentModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState(null)

  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: "Mid-term Mathematics Exam",
      class: "Grade 7A",
      subject: "Mathematics",
      type: "Exam",
      date: "2024-01-20",
      duration: "2 hours",
      totalMarks: 100,
      students: 32,
      completed: 28,
      status: "Ongoing",
      description: "Comprehensive exam covering topics from Term 1.",
      instructions: "Answer all questions. Show your working clearly.",
      competencies: ["Critical Thinking", "Problem Solving"],
    },
    {
      id: 2,
      title: "Algebra Quiz",
      class: "Grade 8B",
      subject: "Mathematics",
      type: "Quiz",
      date: "2024-01-18",
      duration: "30 mins",
      totalMarks: 20,
      students: 28,
      completed: 28,
      status: "Completed",
      description: "Short quiz on linear equations.",
      instructions: "Multiple choice and short answer questions.",
      competencies: ["Application", "Numerical Reasoning"],
    },
    {
      id: 3,
      title: "Geometry Assignment",
      class: "Grade 6A",
      subject: "Mathematics",
      type: "Assignment",
      date: "2024-01-25",
      duration: "1 week",
      totalMarks: 50,
      students: 30,
      completed: 0,
      status: "Scheduled",
      description: "Assignment on basic geometric shapes and properties.",
      instructions: "Drawings and calculations required.",
      competencies: ["Spatial Reasoning", "Creativity"],
    },
  ])

  const results = [
    { student: "Sarah Mwangi", marks: 85, grade: "A-", percentage: 85 },
    { student: "John Doe", marks: 78, grade: "B+", percentage: 78 },
    { student: "Mary Wanjiku", marks: 92, grade: "A", percentage: 92 },
    { student: "Peter Kamau", marks: 65, grade: "B-", percentage: 65 },
  ]

  const handleCreateAssessment = () => {
    setSelectedAssessment(null)
    setShowAssessmentModal(true)
  }

  const handleViewAssessment = (assessment) => {
    setSelectedAssessment(assessment)
    setShowViewModal(true)
  }

  const handleEditAssessment = (assessment) => {
    setSelectedAssessment(assessment)
    setShowAssessmentModal(true)
  }

  const handleSaveAssessment = (assessmentData) => {
    if (assessmentData.id) {
      // Edit existing assessment
      setAssessments((prevAssessments) =>
        prevAssessments.map((ass) => (ass.id === assessmentData.id ? assessmentData : ass)),
      )
      toast({
        title: "Assessment Updated",
        description: `${assessmentData.title} has been updated successfully.`,
      })
    } else {
      // Create new assessment
      const newAssessment = { ...assessmentData, id: Date.now() } // Assign a new ID
      setAssessments((prevAssessments) => [...prevAssessments, newAssessment])
      toast({
        title: "Assessment Created",
        description: `${assessmentData.title} has been created successfully.`,
      })
    }
    setShowAssessmentModal(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground">Create and manage student assessments</p>
        </div>
        <Button onClick={handleCreateAssessment} className="transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          Create Assessment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments.length}</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments.filter((a) => a.status === "Completed").length}</div>
            <p className="text-xs text-muted-foreground">
              {((assessments.filter((a) => a.status === "Completed").length / assessments.length) * 100 || 0).toFixed(
                0,
              )}
              % completion
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assessments.reduce((sum, ass) => sum + (ass.students - ass.completed), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Student submissions</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Class average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Assessment Management</CardTitle>
          <CardDescription>Create, manage and grade student assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assessments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="assessments">All Assessments</TabsTrigger>
              <TabsTrigger value="grading">Pending Grading</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="assessments" className="space-y-4">
              <div className="space-y-4">
                {assessments.map((assessment) => (
                  <Card key={assessment.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ClipboardList className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{assessment.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {assessment.subject} • {assessment.class}
                            </p>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>📅 {assessment.date}</span>
                              <span>⏱️ {assessment.duration}</span>
                              <span>📊 {assessment.totalMarks} marks</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              assessment.status === "Completed"
                                ? "default"
                                : assessment.status === "Ongoing"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="mb-2"
                          >
                            {assessment.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground mb-2">
                            {assessment.completed}/{assessment.students} completed
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewAssessment(assessment)}
                              className="transition-all duration-300 hover:scale-105"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditAssessment(assessment)}
                              className="transition-all duration-300 hover:scale-105"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="grading">
              <div className="text-center py-8">
                <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Assessments pending grading will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="results">
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow key={index} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{result.student}</TableCell>
                        <TableCell>{result.marks}/100</TableCell>
                        <TableCell>
                          <Badge variant="outline">{result.grade}</Badge>
                        </TableCell>
                        <TableCell>{result.percentage}%</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="text-center py-8">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Assessment analytics and insights will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Assessment Modals */}
      {showAssessmentModal && (
        <AssessmentFormModal
          assessment={selectedAssessment}
          onClose={() => setShowAssessmentModal(false)}
          onSave={handleSaveAssessment}
        />
      )}
      {showViewModal && <AssessmentViewModal assessment={selectedAssessment} onClose={() => setShowViewModal(false)} />}
    </div>
  )
}

"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, Clock, Upload, Download, Eye, AlertCircle, Radio } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import AssignmentViewModal from "@/components/modals/assignment-view-modal"
import AssignmentSubmissionModal from "@/components/modals/assignment-submission-modal"
import QuizAttemptModal from "@/components/modals/quiz-attempt-modal" // Import QuizAttemptModal
import { useState } from "react"

export default function StudentAssignmentsPage() {
  const { toast } = useToast()

  const [showViewModal, setShowViewModal] = useState(false)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [showQuizModal, setShowQuizModal] = useState(false) // State for Quiz Modal
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [selectedQuiz, setSelectedQuiz] = useState(null)

  const assignments = [
    {
      id: 1,
      title: "Mathematics Worksheet",
      subject: "Mathematics",
      teacher: "Mr. John Kamau",
      assignedDate: "2024-01-10",
      dueDate: "2024-01-20",
      status: "Pending",
      priority: "High",
      description: "Complete exercises 1-20 from Chapter 5 on Algebra",
      attachments: ["worksheet.pdf"],
      maxMarks: 50,
      type: "Assignment",
    },
    {
      id: 2,
      title: "Science Project",
      subject: "Science",
      teacher: "Mr. David Ochieng",
      assignedDate: "2024-01-05",
      dueDate: "2024-01-25",
      status: "In Progress",
      priority: "Medium",
      description: "Create a model of the solar system with explanations",
      attachments: ["project_guidelines.pdf", "rubric.pdf"],
      maxMarks: 100,
      type: "Assignment",
    },
    {
      id: 3,
      title: "English Essay",
      subject: "English",
      teacher: "Ms. Sarah Wanjiku",
      assignedDate: "2024-01-08",
      dueDate: "2024-01-15",
      status: "Submitted",
      priority: "Low",
      description: "Write a 500-word essay on 'My Future Career'",
      attachments: ["essay_prompt.pdf"],
      maxMarks: 25,
      submittedDate: "2024-01-14",
      grade: "A-",
      feedback: "Excellent work! Well-structured and thoughtful.",
      type: "Assignment",
    },
    {
      id: 4,
      title: "Mathematics Quiz 1",
      subject: "Mathematics",
      teacher: "Mr. John Kamau",
      assignedDate: "2024-07-18",
      dueDate: "2024-07-22",
      status: "Pending",
      priority: "High",
      description: "Short quiz on basic algebra concepts.",
      maxMarks: 20,
      type: "Quiz",
      duration: "30 minutes",
      questions: [
        {
          id: "q1",
          question: "What is 2 + 2?",
          type: "multiple-choice",
          options: [
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
          ],
          correctAnswer: "4",
          points: 5,
        },
        {
          id: "q2",
          question: "Is the sky blue?",
          type: "true-false",
          correctAnswer: "true",
          points: 5,
        },
        {
          id: "q3",
          question: "Select all prime numbers: 2, 4, 5, 6, 7",
          type: "multiple-select",
          options: [
            { label: "2", value: "2" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: "7", value: "7" },
          ],
          correctAnswer: ["2", "5", "7"],
          points: 10,
        },
      ],
    },
  ]

  const upcomingDeadlines = [
    { title: "Mathematics Worksheet", dueDate: "2024-01-20", daysLeft: 5, priority: "High", type: "Assignment" },
    { title: "Mathematics Quiz 1", dueDate: "2024-07-22", daysLeft: 1, priority: "High", type: "Quiz" },
    { title: "Science Project", dueDate: "2024-01-25", daysLeft: 10, priority: "Medium", type: "Assignment" },
    { title: "History Report", dueDate: "2024-01-30", daysLeft: 15, priority: "Low", type: "Assignment" },
  ]

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment)
    setShowViewModal(true)
  }

  const handleSubmitAssignment = (assignment) => {
    setSelectedAssignment(assignment)
    setShowSubmissionModal(true)
  }

  const handleTakeQuiz = (quiz) => {
    setSelectedQuiz(quiz)
    setShowQuizModal(true)
  }

  const handleSubmissionSave = (submissionData) => {
    toast({
      title: "Assignment Submitted",
      description: `Your assignment "${selectedAssignment.title}" has been submitted successfully`,
    })
    setShowSubmissionModal(false)
  }

  const handleQuizSubmission = (quizResult) => {
    toast({
      title: "Quiz Completed",
      description: `You finished "${selectedQuiz.title}" with a score of ${quizResult.score}/${selectedQuiz.totalMarks}.`,
    })
    setShowQuizModal(false)
    // Update quiz status to 'Submitted' or 'Graded' in your state/backend
  }

  const getDaysUntilDue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Assignments & Quizzes</h1>
          <p className="text-muted-foreground">Track, submit, and take your academic tasks</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">Assignments & Quizzes</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter((a) => a.status === "Pending" || a.status === "In Progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Need completion</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "Submitted").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting grades</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes</CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.type === "Quiz").length}</div>
            <p className="text-xs text-muted-foreground">Available quizzes</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Assignments List */}
        <div className="md:col-span-2">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>Your current and completed assignments & quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="submitted">Submitted</TabsTrigger>
                  <TabsTrigger value="graded">Graded</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {assignments.map((task) => (
                    <Card key={task.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              {task.type === "Quiz" ? (
                                <Radio className="h-5 w-5 text-primary" />
                              ) : (
                                <FileText className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{task.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {task.subject} • {task.teacher}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span>📅 Due: {task.dueDate}</span>
                                <span>📊 {task.maxMarks} marks</span>
                                {task.grade && <span>🎯 Grade: {task.grade}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex gap-2 mb-2">
                              <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                              <Badge variant={task.status === "Submitted" ? "default" : "secondary"}>
                                {task.status}
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewAssignment(task)}
                                className="transition-all duration-300 hover:scale-105"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              {task.type === "Assignment" && task.status !== "Submitted" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSubmitAssignment(task)}
                                  className="transition-all duration-300 hover:scale-105"
                                >
                                  <Upload className="h-4 w-4 mr-1" />
                                  Submit
                                </Button>
                              )}
                              {task.type === "Quiz" && task.status !== "Submitted" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleTakeQuiz(task)}
                                  className="transition-all duration-300 hover:scale-105"
                                >
                                  <Radio className="h-4 w-4 mr-1" />
                                  Take Quiz
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        {task.feedback && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium">Teacher Feedback:</p>
                            <p className="text-sm text-muted-foreground">{task.feedback}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="pending">
                  <div className="text-center py-8">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Pending assignments and quizzes will appear here</p>
                  </div>
                </TabsContent>

                <TabsContent value="submitted">
                  <div className="text-center py-8">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Submitted assignments and quizzes will appear here</p>
                  </div>
                </TabsContent>

                <TabsContent value="graded">
                  <div className="text-center py-8">
                    <Badge className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Graded assignments and quizzes will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Assignments & Quizzes due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium text-sm">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground">Due: {deadline.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={deadline.daysLeft <= 3 ? "destructive" : "secondary"}>
                        {deadline.daysLeft} days
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full transition-all duration-300 hover:scale-105">
                <Upload className="mr-2 h-4 w-4" />
                Submit Assignment
              </Button>
              <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Download Resources
              </Button>
              <Button variant="outline" className="w-full transition-all duration-300 hover:scale-105 bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Assignment View Modal */}
      {showViewModal && (
        <AssignmentViewModal
          assignment={selectedAssignment}
          onClose={() => setShowViewModal(false)}
          userRole="student"
        />
      )}

      {/* Assignment Submission Modal */}
      {showSubmissionModal && (
        <AssignmentSubmissionModal
          assignment={selectedAssignment}
          onClose={() => setShowSubmissionModal(false)}
          onSubmit={handleSubmissionSave}
        />
      )}

      {/* Quiz Attempt Modal */}
      {showQuizModal && (
        <QuizAttemptModal quiz={selectedQuiz} onClose={() => setShowQuizModal(false)} onSubmit={handleQuizSubmission} />
      )}
    </div>
  )
}

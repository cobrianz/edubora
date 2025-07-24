"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Calendar, Users, Eye, Edit, Download, Upload } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import AssignmentModal from "@/components/modals/assignment-modal"
import AssignmentViewModal from "@/components/modals/assignment-view-modal"

export default function TeacherAssignmentsPage() {
  const { toast } = useToast()

  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Algebra Worksheet",
      class: "Grade 8A",
      subject: "Mathematics",
      dueDate: "2024-01-25",
      assignedDate: "2024-01-15",
      totalStudents: 32,
      submitted: 28,
      graded: 25,
      status: "Active",
      description: "Complete exercises 1-20 from Chapter 5",
    },
    {
      id: 2,
      title: "Geometry Problems",
      class: "Grade 7B",
      subject: "Mathematics",
      dueDate: "2024-01-22",
      assignedDate: "2024-01-12",
      totalStudents: 30,
      submitted: 30,
      graded: 30,
      status: "Completed",
      description: "Solve geometric problems using theorems",
    },
    {
      id: 3,
      title: "Statistics Project",
      class: "Grade 9A",
      subject: "Mathematics",
      dueDate: "2024-01-30",
      assignedDate: "2024-01-20",
      totalStudents: 25,
      submitted: 15,
      graded: 0,
      status: "Active",
      description: "Collect and analyze data from school survey",
    },
  ])

  const submissions = [
    {
      id: 1,
      student: "Sarah Mwangi",
      assignment: "Algebra Worksheet",
      submittedDate: "2024-01-24",
      status: "Submitted",
      grade: "A-",
      feedback: "Excellent work on problem solving",
    },
    {
      id: 2,
      student: "John Doe",
      assignment: "Algebra Worksheet",
      submittedDate: "2024-01-25",
      status: "Late",
      grade: "B+",
      feedback: "Good understanding, submitted late",
    },
    {
      id: 3,
      student: "Mary Wanjiku",
      assignment: "Algebra Worksheet",
      submittedDate: "2024-01-23",
      status: "Submitted",
      grade: "A",
      feedback: "Perfect execution of all problems",
    },
  ]

  const handleCreateAssignment = () => {
    setSelectedAssignment(null)
    setShowAssignmentModal(true)
  }

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment)
    setShowViewModal(true)
  }

  const handleEditAssignment = (assignment) => {
    setSelectedAssignment(assignment)
    setShowAssignmentModal(true)
  }

  const handleSaveAssignment = (assignmentData) => {
    if (assignmentData.id) {
      // Edit existing assignment
      setAssignments((prevAssignments) =>
        prevAssignments.map((ass) => (ass.id === assignmentData.id ? assignmentData : ass)),
      )
      toast({
        title: "Assignment Updated",
        description: `${assignmentData.title} has been updated successfully`,
      })
    } else {
      // Create new assignment
      const newAssignment = { ...assignmentData, id: Date.now() } // Assign a new ID
      setAssignments((prevAssignments) => [...prevAssignments, newAssignment])
      toast({
        title: "Assignment Created",
        description: `${assignmentData.title} has been created successfully`,
      })
    }
    setShowAssignmentModal(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">Create and manage student assignments</p>
        </div>
        <Button onClick={handleCreateAssignment} className="transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.filter((a) => a.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.reduce((sum, ass) => sum + (ass.submitted - ass.graded), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Need grading</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submission Rate</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Average rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Assignment Management</CardTitle>
          <CardDescription>Create, distribute and grade assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="assignments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="assignments">All Assignments</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="grading">Grading</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="assignments" className="space-y-4">
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <Card key={assignment.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{assignment.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {assignment.subject} • {assignment.class}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{assignment.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>📅 Due: {assignment.dueDate}</span>
                              <span>
                                👥 {assignment.submitted}/{assignment.totalStudents} submitted
                              </span>
                              <span>✅ {assignment.graded} graded</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={assignment.status === "Completed" ? "default" : "secondary"} className="mb-2">
                            {assignment.status}
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewAssignment(assignment)}
                              className="transition-all duration-300 hover:scale-105"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditAssignment(assignment)}
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

            <TabsContent value="submissions" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id} className="transition-all duration-200 hover:bg-muted/50">
                      <TableCell className="font-medium">{submission.student}</TableCell>
                      <TableCell>{submission.assignment}</TableCell>
                      <TableCell>{submission.submittedDate}</TableCell>
                      <TableCell>
                        <Badge variant={submission.status === "Late" ? "destructive" : "default"}>
                          {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.grade}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="transition-all duration-300 hover:scale-105">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="grading">
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Assignments pending grading will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="text-center py-8">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Assignment analytics and performance insights</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <AssignmentModal
          assignment={selectedAssignment}
          onClose={() => setShowAssignmentModal(false)}
          onSave={handleSaveAssignment}
        />
      )}

      {/* Assignment View Modal */}
      {showViewModal && (
        <AssignmentViewModal
          assignment={selectedAssignment}
          onClose={() => setShowViewModal(false)}
          onEdit={handleEditAssignment}
          userRole="teacher"
        />
      )}
    </div>
  )
}

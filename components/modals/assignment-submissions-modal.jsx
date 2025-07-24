"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Download, X } from "lucide-react"
import GradeAssignmentModal from "@/components/modals/grade-assignment-modal"

export default function AssignmentSubmissionsModal({ assignment, onClose, onUpdateSubmission }) {
  const [showGradeModal, setShowGradeModal] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  const handleGradeSubmission = (submission) => {
    // Augment the submission object with assignment details
    const submissionWithAssignment = {
      ...submission,
      assignment: {
        id: assignment.id,
        title: assignment.title,
        totalMarks: assignment.totalMarks,
        // Add other relevant assignment details if needed by GradeAssignmentModal
      },
    }
    setSelectedSubmission(submissionWithAssignment)
    setShowGradeModal(true)
  }

  const handleSaveGrade = (gradeData) => {
    // Update the submission with new grade data
    const updatedSubmission = {
      ...selectedSubmission,
      marks: gradeData.score,
      grade: gradeData.grade,
      feedback: gradeData.feedback,
      status: "Graded",
    }
    onUpdateSubmission(updatedSubmission) // Pass updated submission back to parent
    setShowGradeModal(false)
    setSelectedSubmission(null)
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

  if (!assignment) return null

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Submissions for: {assignment.title}</DialogTitle>
          <DialogDescription>Manage and grade student submissions for this assignment.</DialogDescription>
        </DialogHeader>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Admission No.</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignment.studentSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No submissions yet for this assignment.
                  </TableCell>
                </TableRow>
              ) : (
                assignment.studentSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.student.name}</TableCell>
                    <TableCell>{submission.student.admissionNumber}</TableCell>
                    <TableCell>{submission.submittedDate}</TableCell>
                    <TableCell>
                      {submission.marks !== null ? `${submission.marks}/${submission.maxMarks}` : "-"}
                    </TableCell>
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
                      <div className="flex gap-2">
                        {submission.attachments && submission.attachments.length > 0 && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleGradeSubmission(submission)}>
                          <Edit className="h-4 w-4 mr-1" />
                          {submission.status === "Pending" ? "Grade" : "Edit Grade"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        {showGradeModal && selectedSubmission && (
          <GradeAssignmentModal
            submission={selectedSubmission}
            onClose={() => setShowGradeModal(false)}
            onSave={handleSaveGrade}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

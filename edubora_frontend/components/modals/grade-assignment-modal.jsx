"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Save, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GradeAssignmentModal({ submission, onClose, onSave }) {
  const { toast } = useToast()
  const [grading, setGrading] = useState({
    score: submission?.marks !== null ? submission.marks : "",
    maxScore: submission?.maxMarks || submission?.assignment?.totalMarks || 100, // Fallback to assignment's totalMarks
    feedback: submission?.feedback || "",
    grade: submission?.grade || "",
  })

  // Update local state if submission prop changes (e.g., when editing an already graded submission)
  useEffect(() => {
    setGrading({
      score: submission?.marks !== null ? submission.marks : "",
      maxScore: submission?.maxMarks || submission?.assignment?.totalMarks || 100,
      feedback: submission?.feedback || "",
      grade: submission?.grade || "",
    })
  }, [submission])

  const calculateGrade = (score, maxScore) => {
    if (score === "" || score === null || maxScore === 0) return null
    const percentage = (Number.parseFloat(score) / Number.parseFloat(maxScore)) * 100
    if (percentage >= 90) return "A"
    if (percentage >= 80) return "B"
    if (percentage >= 70) return "C"
    if (percentage >= 60) return "D"
    return "F"
  }

  const handleScoreChange = (value) => {
    const newScore = value === "" ? "" : Number.parseFloat(value)
    const newGrade = calculateGrade(newScore, grading.maxScore)
    setGrading({
      ...grading,
      score: newScore,
      grade: newGrade,
    })
  }

  const handleMaxScoreChange = (value) => {
    const newMaxScore = Number.parseFloat(value)
    const newGrade = calculateGrade(grading.score, newMaxScore)
    setGrading({
      ...grading,
      maxScore: newMaxScore,
      grade: newGrade,
    })
  }

  const handleSave = () => {
    if (grading.score === "" || grading.score === null) {
      toast({
        title: "Error",
        description: "Please enter a score.",
        variant: "destructive",
      })
      return
    }
    if (Number.parseFloat(grading.score) > Number.parseFloat(grading.maxScore)) {
      toast({
        title: "Error",
        description: "Score cannot be greater than maximum score.",
        variant: "destructive",
      })
      return
    }

    onSave({
      score: grading.score,
      maxScore: grading.maxScore,
      feedback: grading.feedback,
      grade: grading.grade,
    })
  }

  if (!submission || !submission.assignment || !submission.student) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-2xl animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Grade Assignment</CardTitle>
            <CardDescription>
              {submission.assignment.title} - {submission.student.name}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-950">
            <h4 className="font-medium mb-2">Student Submission</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm">Submitted: {submission.submittedDate || "Not submitted"}</span>
              {submission.attachments && submission.attachments.length > 0 && (
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="score" className="text-sm font-medium">
                Score
              </label>
              <Input
                id="score"
                type="number"
                value={grading.score}
                onChange={(e) => handleScoreChange(e.target.value)}
                placeholder="Enter score"
                max={grading.maxScore}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="maxScore" className="text-sm font-medium">
                Max Score
              </label>
              <Input
                id="maxScore"
                type="number"
                value={grading.maxScore}
                onChange={(e) => handleMaxScoreChange(e.target.value)}
                placeholder="Max score"
              />
            </div>
          </div>

          {grading.grade && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Grade:</span>
              <Badge variant="default">{grading.grade}</Badge>
              <span className="text-sm text-muted-foreground">
                ({grading.score}/{grading.maxScore} - {Math.round((grading.score / grading.maxScore) * 100)}%)
              </span>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="feedback" className="text-sm font-medium">
              Feedback
            </label>
            <Textarea
              id="feedback"
              value={grading.feedback}
              onChange={(e) => setGrading({ ...grading, feedback: e.target.value })}
              placeholder="Provide feedback to the student..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Grade
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Trophy, Calendar, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function GradeDetailsModal({ gradeDetails, onClose }) {
  if (!gradeDetails) return null

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    if (grade.startsWith("D")) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Grade Details: {gradeDetails.subject}
            </CardTitle>
            <CardDescription>Detailed breakdown of your performance in {gradeDetails.subject}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Grade:</span>
                  <span className={`text-lg font-bold ${getGradeColor(gradeDetails.currentGrade)}`}>
                    {gradeDetails.currentGrade}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Percentage:</span>
                  <span className="text-lg font-bold">{gradeDetails.percentage}%</span>
                </div>
                <div className="mt-2">
                  <Progress value={gradeDetails.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subject Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subject:</span>
                  <span className="text-sm font-medium">{gradeDetails.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Teacher:</span>
                  <span className="text-sm font-medium">{gradeDetails.teacher}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gradeDetails.assessments.map((assessment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{assessment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          <Calendar className="inline-block h-3 w-3 mr-1" />
                          {assessment.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{assessment.marks}</p>
                      <Badge variant="outline" className={getGradeColor(assessment.grade)}>
                        {assessment.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teacher Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {gradeDetails.feedback || "No specific feedback available for this subject yet."}
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

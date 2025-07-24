"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, Clock, FileText, Video, Edit } from "lucide-react"

export default function LessonViewModal({ lesson, onClose, onEdit }) {
  if (!lesson) return null

  const getIconForLessonType = (type) => {
    switch (type) {
      case "Theory":
        return <BookOpen className="h-6 w-6 text-slate-blue" />
      case "Practice":
        return <FileText className="h-6 w-6 text-light-green" />
      case "Video Lecture":
        return <Video className="h-6 w-6 text-purple-600" />
      default:
        return <BookOpen className="h-6 w-6 text-muted-foreground" />
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              {getIconForLessonType(lesson.type)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{lesson.title}</h2>
              <p className="text-sm text-muted-foreground">
                {lesson.subject} • {lesson.class}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>Detailed information about this lesson plan.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lesson Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Subject:</span>
                  <span className="text-sm font-medium">{lesson.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Class:</span>
                  <span className="text-sm font-medium">{lesson.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <Badge variant="outline">{lesson.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge
                    variant={
                      lesson.status === "Completed"
                        ? "default"
                        : lesson.status === "Scheduled"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {lesson.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Date: {lesson.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Time: {lesson.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Duration: {lesson.duration}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{lesson.description || "No description provided."}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materials</CardTitle>
            </CardHeader>
            <CardContent>
              {lesson.materials && lesson.materials.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {lesson.materials.map((material, index) => (
                    <Badge key={index} variant="secondary">
                      {material}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No materials listed.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          {onEdit && (
            <Button variant="outline" onClick={() => onEdit(lesson)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Lesson
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

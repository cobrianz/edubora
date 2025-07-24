"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, BookOpen, User, Calendar, FileText, Download, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function SubjectViewModal({ subject, onClose }) {
  const { toast } = useToast()

  if (!subject) return null

  const handleDownloadResource = (resourceName) => {
    toast({
      title: "Download Started",
      description: `Downloading ${resourceName}...`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {subject.name}
            </CardTitle>
            <CardDescription>Detailed information about your {subject.name} subject</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subject Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Teacher:</span>
                  <span className="text-sm font-medium flex items-center gap-1">
                    <User className="h-4 w-4" /> {subject.teacher}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current Grade:</span>
                  <Badge variant="outline" className="text-lg font-bold">
                    {subject.grade}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Overall Percentage:</span>
                  <span className="text-sm font-medium">{subject.percentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Attendance:</span>
                  <span className="text-sm font-medium">{subject.attendance}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming & Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Next Class: {subject.nextClass}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Assignments: {subject.assignments.completed}/{subject.assignments.total} completed
                  </span>
                </div>
                <div className="mt-2">
                  <h4 className="font-medium text-sm mb-1">Current Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {subject.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subject Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{subject.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources & Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {subject.resources && subject.resources.length > 0 ? (
                subject.resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span className="text-sm">{resource}</span>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadResource(resource)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No additional resources available.</p>
              )}
              <div className="pt-2 border-t mt-4">
                <Link href="/dashboard/student/lessons" passHref>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Video className="h-4 w-4 mr-2" />
                    View Video Lessons & Presentations
                  </Button>
                </Link>
              </div>
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

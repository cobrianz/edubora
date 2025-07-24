"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, FileText, Download, Upload, Calendar, Clock, Radio } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function AssignmentViewModal({ assignment, onClose, userRole = "student" }) {
  const { toast } = useToast()

  if (!assignment) return null

  const handleDownload = (fileName) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    })
  }

  const handleSubmit = () => {
    toast({
      title: "Assignment Submitted",
      description: "Your assignment has been submitted successfully",
    })
    // In a real app, this would trigger the submission logic
    onClose() // Close modal after simulated submission
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              {assignment.type === "Quiz" ? <Radio className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
              {assignment.title}
            </CardTitle>
            <CardDescription>
              {assignment.subject} - {assignment.teacher}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="submission">Submission</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Task Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Subject:</span>
                      <span className="text-sm font-medium">{assignment.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Teacher:</span>
                      <span className="text-sm font-medium">{assignment.teacher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <Badge variant="outline">{assignment.type}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Points:</span>
                      <span className="text-sm font-medium">{assignment.maxMarks} pts</span>
                    </div>
                    {assignment.type === "Quiz" && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Duration:</span>
                        <span className="text-sm font-medium">{assignment.duration}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Assigned: {assignment.assignedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Due: {assignment.dueDate}</span>
                    </div>
                    <div className="mt-2">
                      <Badge variant={assignment.status === "Submitted" ? "default" : "secondary"}>
                        {assignment.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{assignment.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{assignment.type} Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignment.type === "Assignment" ? (
                      <>
                        <p className="text-sm">
                          Complete the following tasks and submit your work before the due date:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                          <li>Read Chapter 5 of your textbook</li>
                          <li>Complete exercises 1-10 on page 45</li>
                          <li>Write a summary of key concepts</li>
                          <li>Submit your work in PDF format</li>
                        </ul>
                      </>
                    ) : (
                      <>
                        <p className="text-sm">
                          This is a timed quiz. Read each question carefully and select the best answer.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                          <li>Duration: {assignment.duration}</li>
                          <li>Total Questions: {assignment.questions?.length || "N/A"}</li>
                          <li>Points: {assignment.maxMarks}</li>
                          <li>Ensure you have a stable internet connection.</li>
                        </ul>
                      </>
                    )}

                    {assignment.attachments && assignment.attachments.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Resources:</h4>
                        {assignment.attachments.map((attachment, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(attachment)}
                            className="mr-2 mb-2"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            {attachment}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submission" className="space-y-4">
              {userRole === "student" ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{assignment.type === "Assignment" ? "Submit Assignment" : "Quiz Status"}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignment.status === "Submitted" ? (
                      <div className="text-center py-8">
                        <Badge variant="default" className="mb-4">
                          Submitted
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          You have already submitted this {assignment.type.toLowerCase()}.
                        </p>
                        {assignment.submittedDate && (
                          <p className="text-sm text-muted-foreground">Submitted on: {assignment.submittedDate}</p>
                        )}
                        {assignment.grade && (
                          <p className="text-sm text-muted-foreground">Your Grade: {assignment.grade}</p>
                        )}
                      </div>
                    ) : assignment.type === "Assignment" ? (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-sm text-gray-600 mb-4">
                            Drag and drop your files here, or click to browse
                          </p>
                          <Button variant="outline">Choose Files</Button>
                        </div>
                        <Button onClick={handleSubmit} className="w-full">
                          Submit Assignment
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Radio className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-sm text-muted-foreground">
                          This quiz is pending. Click "Take Quiz" on the assignments page to start.
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">Due: {assignment.dueDate}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Submissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {assignment.submissions || 0} students have submitted this {assignment.type.toLowerCase()}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  GraduationCap,
  ClipboardList,
  Calendar,
  DollarSign,
  Heart,
  Users,
  BarChart3,
  Phone,
  Mail,
  Download,
  MessageSquare,
  Edit,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StudentViewModal({ student, onClose, onEdit, onMessage }) {
  const { toast } = useToast()

  if (!student) return null

  const handleDownloadReport = () => {
    toast({
      title: "Download Started",
      description: "Student report is being generated...",
    })
  }

  const handleSendMessage = () => {
    if (onMessage) {
      onMessage(student)
    }
    toast({
      title: "Message Sent",
      description: `Message sent to ${student.name}'s parents`,
    })
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar || "/placeholder.svg"} />
              <AvatarFallback>{student.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-sm text-muted-foreground">
                {student.admissionNo} • {student.class} • {student.stream}
              </p>
            </div>
          </DialogTitle>
          <DialogDescription>Complete student profile and academic information</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Date of Birth</p>
                      <p className="text-sm text-muted-foreground">{student.dateOfBirth || "15/03/2010"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Gender</p>
                      <p className="text-sm text-muted-foreground">{student.gender || "Female"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Religion</p>
                      <p className="text-sm text-muted-foreground">{student.religion || "Christian"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Blood Group</p>
                      <p className="text-sm text-muted-foreground">{student.bloodGroup || "O+"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{student.address || "P.O. Box 123, Nairobi, Kenya"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Academic Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Current Grade</p>
                      <Badge variant="default">{student.currentGrade || "A-"}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Class Rank</p>
                      <p className="text-sm text-muted-foreground">{student.classRank || "3rd"} of 32</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Attendance</p>
                      <p className="text-sm text-muted-foreground">{student.attendance || "96%"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Subjects</p>
                      <p className="text-sm text-muted-foreground">8 subjects</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Performance Trend</p>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">85% - Excellent Performance</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded border">
                    <ClipboardList className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Submitted Mathematics Assignment</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded border">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Attended all classes today</p>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded border">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Received grade A- in Science test</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { subject: "Mathematics", grade: "A-", percentage: 85 },
                      { subject: "English", grade: "A", percentage: 92 },
                      { subject: "Science", grade: "B+", percentage: 78 },
                      { subject: "Kiswahili", grade: "B", percentage: 75 },
                      { subject: "Social Studies", grade: "A-", percentage: 88 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.subject}</span>
                          <Badge variant="outline">{item.grade}</Badge>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Term Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { term: "Term 1", grade: "A-", percentage: 88 },
                      { term: "Term 2", grade: "A", percentage: 85 },
                      { term: "Term 3", grade: "-", percentage: 0 },
                    ].map((term, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{term.term}</p>
                          <p className="text-sm text-muted-foreground">
                            {term.percentage > 0 ? `${term.percentage}% average` : "Not started"}
                          </p>
                        </div>
                        <Badge variant={term.percentage > 0 ? "default" : "secondary"}>{term.grade}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  <div className="text-center p-3 border rounded">
                    <p className="text-2xl font-bold text-green-600">8</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <p className="text-2xl font-bold text-orange-600">3</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <p className="text-2xl font-bold text-red-600">1</p>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: "Mathematics Worksheet",
                      subject: "Mathematics",
                      status: "Submitted",
                      grade: "A-",
                      dueDate: "2024-07-20",
                    },
                    {
                      title: "Science Project",
                      subject: "Science",
                      status: "Pending",
                      grade: "-",
                      dueDate: "2024-07-25",
                    },
                    {
                      title: "English Essay",
                      subject: "English",
                      status: "Overdue",
                      grade: "-",
                      dueDate: "2024-07-18",
                    },
                  ].map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {assignment.subject} • Due: {assignment.dueDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            assignment.status === "Submitted"
                              ? "default"
                              : assignment.status === "Overdue"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {assignment.status}
                        </Badge>
                        {assignment.grade !== "-" && (
                          <p className="text-sm text-muted-foreground mt-1">Grade: {assignment.grade}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">96%</p>
                      <p className="text-sm text-muted-foreground">Overall Attendance</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-green-600">45</p>
                        <p className="text-xs text-muted-foreground">Present</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-red-600">2</p>
                        <p className="text-xs text-muted-foreground">Absent</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-orange-600">1</p>
                        <p className="text-xs text-muted-foreground">Late</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { date: "2024-07-16", status: "Present" },
                      { date: "2024-07-15", status: "Present" },
                      { date: "2024-07-14", status: "Late" },
                      { date: "2024-07-13", status: "Present" },
                      { date: "2024-07-12", status: "Absent" },
                    ].map((record, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <span className="text-sm">{record.date}</span>
                        <Badge
                          variant={
                            record.status === "Present"
                              ? "default"
                              : record.status === "Late"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {record.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fees" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Fee Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Total Fees</p>
                        <p className="text-lg font-bold">KSh 45,000</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Paid</p>
                        <p className="text-lg font-bold text-green-600">KSh 30,000</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Outstanding</p>
                        <p className="text-lg font-bold text-red-600">KSh 15,000</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <Badge variant="secondary">Partial Payment</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Payment Progress</p>
                      <Progress value={67} className="h-3" />
                      <p className="text-xs text-muted-foreground mt-1">67% paid</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "2024-06-15", amount: 20000, method: "M-Pesa" },
                      { date: "2024-07-01", amount: 10000, method: "Bank Transfer" },
                    ].map((payment, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="text-sm font-medium">KSh {payment.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{payment.date}</p>
                        </div>
                        <Badge variant="outline">{payment.method}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Health Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Blood Group</p>
                      <p className="text-sm text-muted-foreground">O+</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Height</p>
                      <p className="text-sm text-muted-foreground">145 cm</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Weight</p>
                      <p className="text-sm text-muted-foreground">38 kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">BMI</p>
                      <p className="text-sm text-muted-foreground">18.1 (Normal)</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Allergies</p>
                    <p className="text-sm text-muted-foreground">None reported</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Medical Conditions</p>
                    <p className="text-sm text-muted-foreground">None</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medical Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <p className="font-medium text-sm">Annual Health Checkup</p>
                      <p className="text-xs text-muted-foreground">2024-01-15 • Dr. Jane Doe</p>
                      <Badge variant="default" className="mt-1">
                        Excellent Health
                      </Badge>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-medium text-sm">Vaccination Update</p>
                      <p className="text-xs text-muted-foreground">2024-03-10 • School Nurse</p>
                      <Badge variant="default" className="mt-1">
                        Up to Date
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="parents" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Father's Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">John Mwangi</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Occupation</p>
                    <p className="text-sm text-muted-foreground">Engineer</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <p className="text-sm text-muted-foreground">+254 712 345 678</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <p className="text-sm text-muted-foreground">john.mwangi@email.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Mother's Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">Grace Mwangi</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Occupation</p>
                    <p className="text-sm text-muted-foreground">Teacher</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <p className="text-sm text-muted-foreground">+254 723 456 789</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <p className="text-sm text-muted-foreground">grace.mwangi@email.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <p className="font-medium">Primary: Grace Mwangi (Mother)</p>
                    <p className="text-sm text-muted-foreground">+254 723 456 789</p>
                  </div>
                  <div className="p-3 border rounded">
                    <p className="font-medium">Secondary: John Mwangi (Father)</p>
                    <p className="text-sm text-muted-foreground">+254 712 345 678</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Academic Trend</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 bg-green-500 rounded flex-1"></div>
                        <span className="text-sm text-green-600">↗ Improving</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Attendance Trend</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 bg-blue-500 rounded flex-1"></div>
                        <span className="text-sm text-blue-600">→ Stable</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Assignment Completion</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 bg-purple-500 rounded flex-1"></div>
                        <span className="text-sm text-purple-600">↗ Excellent</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Strengths & Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-green-600">Strengths</p>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        <li>• Excellent in Mathematics</li>
                        <li>• Consistent attendance</li>
                        <li>• Good participation in class</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-600">Areas for Improvement</p>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        <li>• Science practical skills</li>
                        <li>• Time management for assignments</li>
                        <li>• Group work participation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button variant="outline" onClick={handleSendMessage}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Send Message
          </Button>
          {onEdit && (
            <Button variant="outline" onClick={() => onEdit(student)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Student
            </Button>
          )}
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

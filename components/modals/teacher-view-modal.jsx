"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  X,
  Edit,
  Phone,
  Mail,
  User,
  GraduationCap,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function TeacherViewModal({ teacher, onClose, onEdit, onMessage, onGenerateReport }) {
  if (!teacher) return null

  const handleEdit = () => {
    onEdit(teacher)
  }

  const handleCall = () => {
    window.open(`tel:${teacher.phone}`)
  }

  const handleEmail = () => {
    window.open(`mailto:${teacher.email}`)
  }

  const handleMessage = () => {
    onMessage(teacher)
  }

  const handleGenerateReport = () => {
    onGenerateReport(teacher)
  }

  // Sample performance data
  const performanceData = [
    { month: "Sep", performance: 85, attendance: 98 },
    { month: "Oct", performance: 88, attendance: 96 },
    { month: "Nov", performance: 92, attendance: 99 },
    { month: "Dec", performance: 90, attendance: 97 },
  ]

  const classPerformance = [
    { class: "Grade 7A", average: 88, students: 32 },
    { class: "Grade 7B", average: 85, students: 30 },
    { class: "Grade 8A", average: 92, students: 28 },
  ]

  const subjectDistribution = [
    { subject: "Mathematics", hours: 20, color: "#3b82f6" },
    { subject: "Science", hours: 15, color: "#10b981" },
    { subject: "English", hours: 10, color: "#f59e0b" },
  ]

  const studentFeedback = [
    { rating: "Excellent", count: 45, percentage: 75 },
    { rating: "Good", count: 12, percentage: 20 },
    { rating: "Average", count: 3, percentage: 5 },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt={teacher.name} />
              <AvatarFallback className="text-xl">
                {teacher.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <User className="h-6 w-6" />
                {teacher.name}
              </CardTitle>
              <CardDescription className="text-lg">
                {teacher.employeeId} • {teacher.subject} Teacher
              </CardDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={teacher.status === "Active" ? "default" : "secondary"} className="text-sm">
                  {teacher.status}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {teacher.experience}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleCall} title="Call">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleEmail} title="Email">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleMessage}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button variant="outline" onClick={handleGenerateReport}>
              <FileText className="mr-2 h-4 w-4" />
              Report
            </Button>
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Classes</p>
                    <p className="text-2xl font-bold text-blue-700">{teacher.classes?.length || 3}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Students</p>
                    <p className="text-2xl font-bold text-green-700">90</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Performance</p>
                    <p className="text-2xl font-bold text-purple-700">92%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Attendance</p>
                    <p className="text-2xl font-bold text-orange-700">98%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Full Name:</span>
                      <span className="font-medium">{teacher.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Employee ID:</span>
                      <span className="font-medium">{teacher.employeeId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{teacher.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{teacher.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>{teacher.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Department:</span>
                      <span className="font-medium">Mathematics Department</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Professional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Primary Subject:</span>
                      <span className="font-medium">{teacher.subject}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience:</span>
                      <span className="font-medium">{teacher.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Qualification:</span>
                      <span className="font-medium">Bachelor of Education (Mathematics)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date Joined:</span>
                      <span className="font-medium">January 15, 2020</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Teaching Load:</span>
                      <span className="font-medium">24 hours/week</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Specialization:</span>
                      <span className="font-medium">Algebra & Geometry</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="performance"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Performance"
                        />
                        <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2} name="Attendance" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subject Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={subjectDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          dataKey="hours"
                          label={({ subject, hours }) => `${subject}: ${hours}h`}
                        >
                          {subjectDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="classes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Assigned Classes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classPerformance.map((cls, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-lg">{cls.class}</h4>
                            <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{cls.students} students</p>
                            <p className="text-sm text-muted-foreground">5 periods/week</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Class Average:</span>
                            <span className="font-medium">{cls.average}%</span>
                          </div>
                          <Progress value={cls.average} className="h-2" />
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" onClick={() => onMessage(teacher, cls.class)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message Class
                          </Button>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Class Performance Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={classPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="class" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="average" fill="#3b82f6" name="Average Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Teaching Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Student Satisfaction:</span>
                        <span className="font-medium">4.8/5.0</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Lesson Completion:</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Assignment Grading:</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Parent Communication:</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-sm font-medium text-green-800">Best Teacher Award</div>
                      <div className="text-xs text-green-600">June 2024</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm font-medium text-blue-800">100% Pass Rate</div>
                      <div className="text-xs text-blue-600">Term 1 2024</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-sm font-medium text-purple-800">CBC Training Completed</div>
                      <div className="text-xs text-purple-600">Professional Development</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Weekly Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                      <div key={day} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="font-medium">{day}</div>
                        <div className="text-sm text-muted-foreground">8:00 AM - 3:00 PM (6 periods)</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Feedback Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentFeedback.map((feedback, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{feedback.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            {feedback.count} students ({feedback.percentage}%)
                          </span>
                        </div>
                        <Progress value={feedback.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Comments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm">"Excellent teacher, explains concepts very clearly."</p>
                      <p className="text-xs text-muted-foreground mt-1">- Grade 7A Student</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm">"Very patient and helpful with difficult topics."</p>
                      <p className="text-xs text-muted-foreground mt-1">- Grade 8A Student</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm">"Makes mathematics fun and interesting."</p>
                      <p className="text-xs text-muted-foreground mt-1">- Grade 7B Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available Reports</CardTitle>
                  <CardDescription>Generate detailed reports for this teacher</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Button
                      variant="outline"
                      className="h-auto p-4 justify-start bg-transparent"
                      onClick={handleGenerateReport}
                    >
                      <div className="text-left">
                        <div className="font-medium">Performance Report</div>
                        <div className="text-sm text-muted-foreground">Detailed teaching performance analysis</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                      <div className="text-left">
                        <div className="font-medium">Class Summary</div>
                        <div className="text-sm text-muted-foreground">Summary of all assigned classes</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                      <div className="text-left">
                        <div className="font-medium">Student Feedback</div>
                        <div className="text-sm text-muted-foreground">Compiled student feedback report</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 justify-start bg-transparent">
                      <div className="text-left">
                        <div className="font-medium">Attendance Report</div>
                        <div className="text-sm text-muted-foreground">Teacher attendance and punctuality</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

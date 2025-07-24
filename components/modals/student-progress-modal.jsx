"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, User, TrendingUp, Award, Calendar, MessageSquare, FileText, Target } from "lucide-react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts"

export default function StudentProgressModal({ student, onClose }) {
  const [selectedPeriod, setSelectedPeriod] = useState("term")

  // Sample student data
  const studentData = student || {
    id: 1,
    name: "Sarah Mwangi",
    class: "Grade 7A",
    admissionNo: "ADM2024001",
    photo: "/placeholder.svg?height=100&width=100",
    overallGrade: "A-",
    gpa: 3.7,
    attendance: 96,
    rank: 3,
    totalStudents: 28,
  }

  // Performance data over time
  const performanceData = [
    { month: "Sep", mathematics: 78, english: 85, science: 82, average: 82 },
    { month: "Oct", mathematics: 82, english: 88, science: 85, average: 85 },
    { month: "Nov", mathematics: 85, english: 90, science: 88, average: 88 },
    { month: "Dec", mathematics: 88, english: 92, science: 90, average: 90 },
  ]

  // Subject performance
  const subjectData = [
    { subject: "Mathematics", current: 88, target: 90, improvement: 10 },
    { subject: "English", current: 92, target: 95, improvement: 7 },
    { subject: "Science", current: 90, target: 92, improvement: 8 },
    { subject: "Social Studies", current: 85, target: 88, improvement: 5 },
    { subject: "Kiswahili", current: 82, target: 85, improvement: 6 },
  ]

  // Competency radar data
  const competencyData = [
    { competency: "Critical Thinking", score: 85, fullMark: 100 },
    { competency: "Communication", score: 92, fullMark: 100 },
    { competency: "Problem Solving", score: 88, fullMark: 100 },
    { competency: "Creativity", score: 78, fullMark: 100 },
    { competency: "Digital Literacy", score: 90, fullMark: 100 },
    { competency: "Citizenship", score: 85, fullMark: 100 },
  ]

  // Assignment progress
  const assignmentData = [
    { week: "Week 1", completed: 8, total: 10, onTime: 7 },
    { week: "Week 2", completed: 12, total: 15, onTime: 11 },
    { week: "Week 3", completed: 16, total: 18, onTime: 15 },
    { week: "Week 4", completed: 13, total: 14, onTime: 13 },
  ]

  // Attendance data
  const attendanceData = [
    { month: "Sep", present: 20, absent: 2, late: 1 },
    { month: "Oct", present: 22, absent: 1, late: 0 },
    { month: "Nov", present: 21, absent: 1, late: 1 },
    { month: "Dec", present: 19, absent: 0, late: 0 },
  ]

  // Recent achievements
  const achievements = [
    { title: "Mathematics Excellence", date: "2024-12-10", type: "Academic" },
    { title: "Perfect Attendance", date: "2024-12-05", type: "Attendance" },
    { title: "Science Fair Winner", date: "2024-11-28", type: "Competition" },
    { title: "Leadership Award", date: "2024-11-15", type: "Character" },
  ]

  // Areas for improvement
  const improvements = [
    { area: "Time Management", priority: "High", suggestion: "Use planning tools and set daily goals" },
    { area: "Mathematics Problem Solving", priority: "Medium", suggestion: "Practice more complex word problems" },
    { area: "Group Participation", priority: "Low", suggestion: "Engage more actively in group discussions" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">{studentData.name}</CardTitle>
              <CardDescription>
                {studentData.class} • {studentData.admissionNo} • Rank {studentData.rank} of {studentData.totalStudents}
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Overall Grade</p>
                    <p className="text-2xl font-bold text-blue-700">{studentData.overallGrade}</p>
                    <p className="text-sm text-blue-600">GPA: {studentData.gpa}</p>
                  </div>
                  <Award className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Attendance</p>
                    <p className="text-2xl font-bold text-green-700">{studentData.attendance}%</p>
                    <p className="text-sm text-green-600">Excellent</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Class Rank</p>
                    <p className="text-2xl font-bold text-purple-700">#{studentData.rank}</p>
                    <p className="text-sm text-purple-600">of {studentData.totalStudents}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Assignments</p>
                    <p className="text-2xl font-bold text-orange-700">94%</p>
                    <p className="text-sm text-orange-600">Completion Rate</p>
                  </div>
                  <FileText className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="competencies">Competencies</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance Trends</CardTitle>
                  <CardDescription>Monthly performance across all subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="mathematics" stroke="#3b82f6" strokeWidth={2} name="Mathematics" />
                      <Line type="monotone" dataKey="english" stroke="#10b981" strokeWidth={2} name="English" />
                      <Line type="monotone" dataKey="science" stroke="#f59e0b" strokeWidth={2} name="Science" />
                      <Line type="monotone" dataKey="average" stroke="#ef4444" strokeWidth={3} name="Average" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                    <CardDescription>Current scores vs targets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={subjectData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="current" fill="#3b82f6" name="Current Score" />
                        <Bar dataKey="target" fill="#10b981" name="Target Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {subjectData.map((subject, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{subject.subject}</h4>
                          <Badge variant="outline">{subject.current}%</Badge>
                        </div>
                        <Progress value={subject.current} className="h-2 mb-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Target: {subject.target}%</span>
                          <span className="text-green-600">+{subject.improvement}% improvement</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="competencies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>CBC Core Competencies</CardTitle>
                  <CardDescription>Competency development assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={competencyData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="competency" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Progress</CardTitle>
                  <CardDescription>Weekly assignment completion and timeliness</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={assignmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="completed"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                        name="Completed"
                      />
                      <Area
                        type="monotone"
                        dataKey="onTime"
                        stackId="2"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                        name="On Time"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Tracking</CardTitle>
                  <CardDescription>Monthly attendance patterns and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="present" fill="#10b981" name="Present" />
                      <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                      <Bar dataKey="late" fill="#f59e0b" name="Late" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-green-600" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">{achievement.date}</p>
                          </div>
                          <Badge variant="outline">{achievement.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {improvements.map((improvement, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{improvement.area}</p>
                            <Badge
                              variant={
                                improvement.priority === "High"
                                  ? "destructive"
                                  : improvement.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {improvement.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{improvement.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Teacher Comments & Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <p className="font-medium text-blue-900">Mathematics Teacher - Ms. Johnson</p>
                      <p className="text-blue-800 mt-1">
                        "Sarah shows excellent problem-solving skills and consistently demonstrates understanding of
                        complex mathematical concepts. Recommend advancing to more challenging problems."
                      </p>
                      <p className="text-sm text-blue-600 mt-2">December 15, 2024</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <p className="font-medium text-green-900">English Teacher - Mr. Smith</p>
                      <p className="text-green-800 mt-1">
                        "Outstanding writing skills and creative expression. Sarah's essays consistently exceed
                        expectations. Consider entering her work in the school writing competition."
                      </p>
                      <p className="text-sm text-green-600 mt-2">December 12, 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Parent
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

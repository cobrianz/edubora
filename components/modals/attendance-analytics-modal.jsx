"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserCheck, Users, TrendingUp, TrendingDown, Clock, AlertTriangle, CheckCircle, Download } from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useToast } from "@/hooks/use-toast"

export default function AttendanceAnalyticsModal({ onClose }) {
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("month")
  const [selectedClass, setSelectedClass] = useState("all")

  const attendanceData = [
    { date: "Mon", present: 1180, absent: 65, late: 12, total: 1245 },
    { date: "Tue", present: 1195, absent: 40, late: 10, total: 1245 },
    { date: "Wed", present: 1210, absent: 25, late: 10, total: 1245 },
    { date: "Thu", present: 1225, absent: 15, late: 5, total: 1245 },
    { date: "Fri", present: 1200, absent: 35, late: 10, total: 1245 },
    { date: "Sat", present: 1190, absent: 45, late: 10, total: 1245 },
  ]

  const monthlyTrends = [
    { month: "Jan", rate: 94.2, present: 1110, absent: 70 },
    { month: "Feb", rate: 95.1, present: 1137, absent: 58 },
    { month: "Mar", rate: 96.3, present: 1165, absent: 45 },
    { month: "Apr", rate: 95.8, present: 1173, absent: 52 },
    { month: "May", rate: 96.7, present: 1202, absent: 43 },
    { month: "Jun", rate: 96.2, present: 1198, absent: 47 },
  ]

  const classAttendance = [
    { class: "Grade 1", rate: 98.5, present: 118, total: 120, trend: "up" },
    { class: "Grade 2", rate: 97.6, present: 122, total: 125, trend: "up" },
    { class: "Grade 3", rate: 96.9, present: 126, total: 130, trend: "down" },
    { class: "Grade 4", rate: 96.3, present: 130, total: 135, trend: "up" },
    { class: "Grade 5", rate: 95.7, present: 134, total: 140, trend: "down" },
    { class: "Grade 6", rate: 95.2, present: 138, total: 145, trend: "up" },
    { class: "Grade 7", rate: 94.7, present: 142, total: 150, trend: "down" },
    { class: "Grade 8", rate: 94.2, present: 146, total: 155, trend: "up" },
    { class: "Grade 9", rate: 93.8, present: 136, total: 145, trend: "down" },
  ]

  const attendancePatterns = [
    { pattern: "Excellent (95-100%)", count: 892, percentage: 71.6, color: "#10b981" },
    { pattern: "Good (85-94%)", count: 234, percentage: 18.8, color: "#3b82f6" },
    { pattern: "Fair (75-84%)", count: 89, percentage: 7.1, color: "#f59e0b" },
    { pattern: "Poor (Below 75%)", count: 30, percentage: 2.4, color: "#ef4444" },
  ]

  const frequentAbsentees = [
    { name: "John Kamau", class: "Grade 8A", absences: 12, rate: 78.5, reason: "Health issues" },
    { name: "Mary Wanjiku", class: "Grade 7B", absences: 10, rate: 82.1, reason: "Family issues" },
    { name: "Peter Ochieng", class: "Grade 6A", absences: 9, rate: 84.3, reason: "Transport issues" },
    { name: "Grace Muthoni", class: "Grade 9A", absences: 8, rate: 86.7, reason: "Health issues" },
    { name: "David Kiprop", class: "Grade 5B", absences: 7, rate: 88.2, reason: "Family issues" },
  ]

  const attendanceMetrics = [
    {
      title: "Overall Attendance",
      value: "96.2%",
      change: "+0.5%",
      trend: "up",
      description: "School-wide attendance rate",
    },
    {
      title: "Present Today",
      value: "1,198",
      change: "+23",
      trend: "up",
      description: "Students present today",
    },
    {
      title: "Chronic Absentees",
      value: "30",
      change: "-5",
      trend: "down",
      description: "Students with <75% attendance",
    },
    {
      title: "Perfect Attendance",
      value: "456",
      change: "+12",
      trend: "up",
      description: "Students with 100% attendance",
    },
  ]

  const timePatterns = [
    { time: "8:00 AM", onTime: 1050, late: 148, absent: 47 },
    { time: "9:00 AM", onTime: 1180, late: 18, absent: 47 },
    { time: "10:00 AM", onTime: 1195, late: 3, absent: 47 },
    { time: "11:00 AM", onTime: 1198, late: 0, absent: 47 },
  ]

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Attendance analytics report is being generated...",
    })
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Attendance Analytics
              </DialogTitle>
              <DialogDescription>Comprehensive attendance analysis and insights</DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="term">This Term</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
              {attendanceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.description}</p>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">{metric.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Daily Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Attendance</CardTitle>
                  <CardDescription>This week's attendance breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="present" stackId="a" fill="#10b981" />
                      <Bar dataKey="late" stackId="a" fill="#f59e0b" />
                      <Bar dataKey="absent" stackId="a" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-600" />
                      <span className="text-sm">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-600" />
                      <span className="text-sm">Late</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-600" />
                      <span className="text-sm">Absent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Patterns</CardTitle>
                  <CardDescription>Student attendance distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={attendancePatterns}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="count"
                      >
                        {attendancePatterns.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {attendancePatterns.map((pattern, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pattern.color }} />
                          <span className="text-sm">{pattern.pattern}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{pattern.count}</span>
                          <span className="text-xs text-muted-foreground ml-2">({pattern.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time-based Attendance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Arrival Time Patterns
                </CardTitle>
                <CardDescription>Student arrival patterns throughout the morning</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timePatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="onTime"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="late"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance Trends</CardTitle>
                <CardDescription>Attendance rate trends over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                      <h4 className="font-medium text-green-800 dark:text-green-200">Positive Trend</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Attendance has improved by 2.0% since January
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200">Seasonal Pattern</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Attendance typically peaks in March and May
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Weather Impact</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Rainy seasons show slight attendance dips
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Best Month</span>
                      <Badge variant="default">May (96.7%)</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Improvement</span>
                      <Badge variant="outline">+2.5% vs Last Term</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Consistency</span>
                      <Badge variant="secondary">High</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Target Achievement</span>
                      <Badge variant="default">Above 95%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Class-wise Attendance</CardTitle>
                <CardDescription>Attendance rates across all classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classAttendance.map((classData, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{classData.class}</p>
                          <p className="text-sm text-muted-foreground">
                            {classData.present}/{classData.total} students
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium">{classData.rate}%</p>
                          <Progress value={classData.rate} className="w-20 h-2 mt-1" />
                        </div>
                        <div className={`${classData.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {classData.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Day of Week Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="present" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Absence Reasons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Health Issues</span>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20 h-2" />
                        <span className="text-sm">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Family Issues</span>
                      <div className="flex items-center gap-2">
                        <Progress value={25} className="w-20 h-2" />
                        <span className="text-sm">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Transport Issues</span>
                      <div className="flex items-center gap-2">
                        <Progress value={20} className="w-20 h-2" />
                        <span className="text-sm">20%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Other</span>
                      <div className="flex items-center gap-2">
                        <Progress value={10} className="w-20 h-2" />
                        <span className="text-sm">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Frequent Absentees
                </CardTitle>
                <CardDescription>Students requiring attendance intervention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {frequentAbsentees.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.class}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="destructive">{student.absences} absences</Badge>
                          <Badge variant="outline">{student.rate}%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{student.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Action Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-950">
                      <h4 className="font-medium text-red-800 dark:text-red-200">Critical</h4>
                      <p className="text-sm text-red-700 dark:text-red-300">30 students with attendance below 75%</p>
                    </div>
                    <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Warning</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">89 students with attendance 75-84%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Parent Meetings</p>
                        <p className="text-xs text-muted-foreground">
                          Schedule meetings with parents of frequent absentees
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Health Support</p>
                        <p className="text-xs text-muted-foreground">
                          Provide health support for students with medical issues
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Transport Solutions</p>
                        <p className="text-xs text-muted-foreground">Explore transport options for affected students</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

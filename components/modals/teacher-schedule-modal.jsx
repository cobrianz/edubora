"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, User, Calendar, Users, BarChart3, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function TeacherScheduleModal({ teacher, onClose, onEdit }) {
  const { toast } = useToast()
  const [selectedWeek, setSelectedWeek] = useState("current")
  const [selectedTeacher, setSelectedTeacher] = useState(teacher?.id || "T001")

  // Sample teachers data
  const teachers = [
    {
      id: "T001",
      name: "Mr. John Kamau",
      subject: "Mathematics",
      email: "john.kamau@school.edu",
      phone: "+254 712 345 678",
      totalPeriods: 24,
      assignedPeriods: 22,
      freeSlots: 8,
      workload: 92,
    },
    {
      id: "T002",
      name: "Ms. Sarah Wanjiku",
      subject: "English",
      email: "sarah.wanjiku@school.edu",
      phone: "+254 723 456 789",
      totalPeriods: 20,
      assignedPeriods: 18,
      freeSlots: 12,
      workload: 90,
    },
    {
      id: "T003",
      name: "Dr. Mary Njeri",
      subject: "Science",
      email: "mary.njeri@school.edu",
      phone: "+254 734 567 890",
      totalPeriods: 18,
      assignedPeriods: 16,
      freeSlots: 14,
      workload: 89,
    },
  ]

  // Sample schedule data
  const scheduleData = {
    T001: {
      Monday: [
        { time: "8:00-8:40", subject: "Mathematics", class: "Grade 7A", room: "Room 201" },
        { time: "8:40-9:20", subject: "Mathematics", class: "Grade 8A", room: "Room 201" },
        { time: "9:20-10:00", subject: "Mathematics", class: "Grade 7B", room: "Room 201" },
        { time: "10:00-10:20", subject: "Break", class: "", room: "" },
        { time: "10:20-11:00", subject: "Mathematics", class: "Grade 8B", room: "Room 201" },
        { time: "11:00-11:40", subject: "Free Period", class: "", room: "" },
        { time: "11:40-12:20", subject: "Mathematics", class: "Grade 9A", room: "Room 201" },
        { time: "12:20-1:00", subject: "Lunch", class: "", room: "" },
        { time: "1:00-1:40", subject: "Free Period", class: "", room: "" },
        { time: "1:40-2:20", subject: "Mathematics", class: "Grade 9B", room: "Room 201" },
        { time: "2:20-3:00", subject: "Remedial Class", class: "Grade 7A", room: "Room 201" },
      ],
      Tuesday: [
        { time: "8:00-8:40", subject: "Mathematics", class: "Grade 8A", room: "Room 201" },
        { time: "8:40-9:20", subject: "Mathematics", class: "Grade 7A", room: "Room 201" },
        { time: "9:20-10:00", subject: "Free Period", class: "", room: "" },
        { time: "10:00-10:20", subject: "Break", class: "", room: "" },
        { time: "10:20-11:00", subject: "Mathematics", class: "Grade 7B", room: "Room 201" },
        { time: "11:00-11:40", subject: "Mathematics", class: "Grade 8B", room: "Room 201" },
        { time: "11:40-12:20", subject: "Mathematics", class: "Grade 9A", room: "Room 201" },
        { time: "12:20-1:00", subject: "Lunch", class: "", room: "" },
        { time: "1:00-1:40", subject: "Mathematics", class: "Grade 9B", room: "Room 201" },
        { time: "1:40-2:20", subject: "Free Period", class: "", room: "" },
        { time: "2:20-3:00", subject: "Staff Meeting", class: "", room: "Staff Room" },
      ],
      // Add more days...
    },
  }

  // Analytics data
  const workloadData = [
    { day: "Mon", periods: 7, free: 2 },
    { day: "Tue", periods: 6, free: 3 },
    { day: "Wed", periods: 8, free: 1 },
    { day: "Thu", periods: 7, free: 2 },
    { day: "Fri", periods: 6, free: 3 },
  ]

  const subjectDistribution = [
    { subject: "Grade 7A", periods: 6, color: "#3b82f6" },
    { subject: "Grade 7B", periods: 5, color: "#10b981" },
    { subject: "Grade 8A", periods: 5, color: "#f59e0b" },
    { subject: "Grade 8B", periods: 4, color: "#ef4444" },
    { subject: "Grade 9A", periods: 4, color: "#8b5cf6" },
    { subject: "Grade 9B", periods: 3, color: "#06b6d4" },
  ]

  const weeklyTrends = [
    { week: "Week 1", workload: 85, satisfaction: 4.2 },
    { week: "Week 2", workload: 92, satisfaction: 4.0 },
    { week: "Week 3", workload: 88, satisfaction: 4.3 },
    { week: "Week 4", workload: 90, satisfaction: 4.1 },
  ]

  const currentTeacher = teachers.find((t) => t.id === selectedTeacher) || teachers[0]
  const currentSchedule = scheduleData[selectedTeacher] || scheduleData.T001

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  const timeSlots = [
    "8:00-8:40",
    "8:40-9:20",
    "9:20-10:00",
    "10:00-10:20",
    "10:20-11:00",
    "11:00-11:40",
    "11:40-12:20",
    "12:20-1:00",
    "1:00-1:40",
    "1:40-2:20",
    "2:20-3:00",
  ]

  const handleExportSchedule = () => {
    toast({
      title: "Export Started",
      description: `${currentTeacher.name}'s schedule is being exported`,
    })
  }

  const handleEditSchedule = () => {
    onEdit(currentTeacher)
    toast({
      title: "Edit Mode",
      description: `Opening schedule editor for ${currentTeacher.name}`,
    })
  }

  const getPeriodColor = (subject) => {
    if (subject === "Break" || subject === "Lunch") return "bg-gray-100 text-gray-600"
    if (subject === "Free Period") return "bg-green-100 text-green-700"
    if (subject.includes("Meeting")) return "bg-purple-100 text-purple-700"
    if (subject.includes("Remedial")) return "bg-orange-100 text-orange-700"
    return "bg-blue-100 text-blue-700"
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Teacher Schedule Management
            </CardTitle>
            <CardDescription>View and manage teacher schedules and workload</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportSchedule}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={handleEditSchedule}>
              Edit Schedule
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="schedule" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="workload">Workload Analysis</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
              <TabsTrigger value="summary">Summary Report</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-4">
              {/* Teacher Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{currentTeacher.name}</h3>
                        <p className="text-sm text-muted-foreground">{currentTeacher.subject} Teacher</p>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600">{currentTeacher.assignedPeriods}</div>
                        <div className="text-muted-foreground">Assigned</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{currentTeacher.freeSlots}</div>
                        <div className="text-muted-foreground">Free Slots</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-orange-600">{currentTeacher.workload}%</div>
                        <div className="text-muted-foreground">Workload</div>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>

              {/* Weekly Schedule Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Weekly Schedule
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current Week</SelectItem>
                        <SelectItem value="next">Next Week</SelectItem>
                        <SelectItem value="previous">Previous Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-24">Time</TableHead>
                          {days.map((day) => (
                            <TableHead key={day} className="text-center min-w-40">
                              {day}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeSlots.map((time) => (
                          <TableRow key={time}>
                            <TableCell className="font-medium text-sm">{time}</TableCell>
                            {days.map((day) => {
                              const daySchedule = currentSchedule[day] || []
                              const period = daySchedule.find((p) => p.time === time)

                              return (
                                <TableCell key={`${day}-${time}`} className="p-1">
                                  {period ? (
                                    <div
                                      className={`p-2 rounded text-xs ${getPeriodColor(period.subject)} border cursor-pointer hover:shadow-md transition-all duration-200`}
                                    >
                                      <div className="font-medium">{period.subject}</div>
                                      {period.class && <div className="text-xs opacity-75">{period.class}</div>}
                                      {period.room && <div className="text-xs opacity-75">{period.room}</div>}
                                    </div>
                                  ) : (
                                    <div className="p-2 rounded text-xs bg-gray-50 border-2 border-dashed border-gray-200 text-center text-gray-400">
                                      Free
                                    </div>
                                  )}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workload" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Daily Workload Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Daily Workload Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={workloadData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="periods" fill="#3b82f6" name="Teaching Periods" />
                        <Bar dataKey="free" fill="#10b981" name="Free Periods" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Class Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Class Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={subjectDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="periods"
                          label={({ subject, periods }) => `${subject}: ${periods}`}
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

              {/* Workload Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Workload Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{currentTeacher.assignedPeriods}</div>
                      <div className="text-sm text-muted-foreground">Total Periods</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{currentTeacher.freeSlots}</div>
                      <div className="text-sm text-muted-foreground">Free Slots</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{currentTeacher.workload}%</div>
                      <div className="text-sm text-muted-foreground">Workload</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">4.2</div>
                      <div className="text-sm text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              {/* Performance Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={weeklyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="workload"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Workload %"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="satisfaction"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Satisfaction"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Teaching Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Class Preparation</span>
                        <Badge variant="default">Excellent</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Student Engagement</span>
                        <Badge variant="default">Very Good</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Management</span>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Resource Utilization</span>
                        <Badge variant="default">Excellent</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Schedule Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Peak Hours Usage</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Break Distribution</span>
                        <span className="font-medium">Optimal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Room Transitions</span>
                        <span className="font-medium">Minimal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Consecutive Classes</span>
                        <span className="font-medium">3 max</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="p-2 bg-green-50 rounded text-sm">✓ Well-balanced schedule</div>
                      <div className="p-2 bg-blue-50 rounded text-sm">
                        💡 Consider adding prep time before Grade 9 classes
                      </div>
                      <div className="p-2 bg-yellow-50 rounded text-sm">⚠️ Friday afternoon load could be reduced</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Summary Report</CardTitle>
                  <CardDescription>Comprehensive overview of {currentTeacher.name}'s schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h4 className="font-medium mb-3">Contact Information</h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{currentTeacher.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span>{currentTeacher.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subject:</span>
                        <span>{currentTeacher.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Department:</span>
                        <span>Mathematics Department</span>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Statistics */}
                  <div>
                    <h4 className="font-medium mb-3">Schedule Statistics</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Teaching Periods:</span>
                          <span className="font-medium">{currentTeacher.assignedPeriods}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Free Periods:</span>
                          <span className="font-medium">{currentTeacher.freeSlots}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Classes Taught:</span>
                          <span className="font-medium">6 different classes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Rooms Used:</span>
                          <span className="font-medium">2 rooms</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Workload Percentage:</span>
                          <Badge variant={currentTeacher.workload > 90 ? "destructive" : "default"}>
                            {currentTeacher.workload}%
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Peak Teaching Day:</span>
                          <span className="font-medium">Wednesday</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lightest Day:</span>
                          <span className="font-medium">Friday</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Consecutive Classes (Max):</span>
                          <span className="font-medium">3 periods</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weekly Overview */}
                  <div>
                    <h4 className="font-medium mb-3">Weekly Overview</h4>
                    <div className="space-y-2">
                      {days.map((day) => {
                        const daySchedule = currentSchedule[day] || []
                        const teachingPeriods = daySchedule.filter(
                          (p) => p.subject !== "Break" && p.subject !== "Lunch" && p.subject !== "Free Period",
                        ).length
                        return (
                          <div key={day} className="flex justify-between items-center p-2 bg-muted rounded">
                            <span className="font-medium">{day}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{teachingPeriods} periods</span>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${(teachingPeriods / 9) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
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

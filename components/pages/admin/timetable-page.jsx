"use client"

import { Switch } from "@/components/ui/switch"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Calendar,
  Users,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  Settings,
  AlertTriangle,
  BarChart3,
  Wand2,
  Eye,
} from "lucide-react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Import modals
import PeriodModal from "@/components/modals/period-modal"
import TeacherScheduleModal from "@/components/modals/teacher-schedule-modal"
import RoomAllocationModal from "@/components/modals/room-allocation-modal"
import ConflictResolutionModal from "@/components/modals/conflict-resolution-modal"
import GenerateTimetableModal from "@/components/modals/generate-timetable-modal"

export default function TimetablePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedWeek, setSelectedWeek] = useState("current")
  const [selectedClass, setSelectedClass] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Modal states
  const [showPeriodModal, setShowPeriodModal] = useState(false)
  const [showTeacherScheduleModal, setShowTeacherScheduleModal] = useState(false)
  const [showRoomAllocationModal, setShowRoomAllocationModal] = useState(false)
  const [showConflictModal, setShowConflictModal] = useState(false)
  const [showGenerateModal, setShowGenerateModal] = useState(false)

  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)

  // Sample timetable data
  const [timetableData, setTimetableData] = useState({
    Monday: {
      "8:00-8:40": {
        "Grade 7A": { subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 201" },
        "Grade 7B": { subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 202" },
        "Grade 8A": { subject: "Science", teacher: "Dr. Mary Njeri", room: "Lab 1" },
        "Grade 8B": { subject: "Kiswahili", teacher: "Mr. Peter Mwangi", room: "Room 203" },
      },
      "8:40-9:20": {
        "Grade 7A": { subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 201" },
        "Grade 7B": { subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 202" },
        "Grade 8A": { subject: "Social Studies", teacher: "Ms. Grace Achieng", room: "Room 204" },
        "Grade 8B": { subject: "Science", teacher: "Dr. Mary Njeri", room: "Lab 1" },
      },
      "9:20-10:00": {
        "Grade 7A": { subject: "Science", teacher: "Dr. Mary Njeri", room: "Lab 1" },
        "Grade 7B": { subject: "Social Studies", teacher: "Ms. Grace Achieng", room: "Room 202" },
        "Grade 8A": { subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 204" },
        "Grade 8B": { subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 203" },
      },
      "10:00-10:20": {
        All: { subject: "Break", teacher: "", room: "" },
      },
      "10:20-11:00": {
        "Grade 7A": { subject: "Social Studies", teacher: "Ms. Grace Achieng", room: "Room 201" },
        "Grade 7B": { subject: "Science", teacher: "Dr. Mary Njeri", room: "Lab 1" },
        "Grade 8A": { subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 204" },
        "Grade 8B": { subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 203" },
      },
    },
    // Add more days...
  })

  const classes = ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 7B", "Grade 8A", "Grade 8B", "Grade 9A", "Grade 9B"]
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

  // Analytics data
  const teacherWorkloadData = [
    { teacher: "Mr. John Kamau", periods: 22, utilization: 92 },
    { teacher: "Ms. Sarah Wanjiku", periods: 20, utilization: 83 },
    { teacher: "Dr. Mary Njeri", periods: 18, utilization: 75 },
    { teacher: "Mr. Peter Mwangi", periods: 16, utilization: 67 },
    { teacher: "Ms. Grace Achieng", periods: 19, utilization: 79 },
  ]

  const roomUtilizationData = [
    { room: "Room 201", utilization: 85, capacity: 35 },
    { room: "Room 202", utilization: 80, capacity: 35 },
    { room: "Lab 1", utilization: 70, capacity: 30 },
    { room: "Computer Lab", utilization: 60, capacity: 25 },
    { room: "Library", utilization: 45, capacity: 50 },
  ]

  const subjectDistribution = [
    { subject: "Mathematics", periods: 24, color: "#3b82f6" },
    { subject: "English", periods: 20, color: "#10b981" },
    { subject: "Science", periods: 18, color: "#f59e0b" },
    { subject: "Social Studies", periods: 16, color: "#ef4444" },
    { subject: "Kiswahili", periods: 14, color: "#8b5cf6" },
  ]

  const weeklyTrends = [
    { day: "Mon", efficiency: 85, conflicts: 2 },
    { day: "Tue", efficiency: 88, conflicts: 1 },
    { day: "Wed", efficiency: 82, conflicts: 3 },
    { day: "Thu", efficiency: 90, conflicts: 1 },
    { day: "Fri", efficiency: 87, conflicts: 2 },
  ]

  const timetableMetrics = [
    { metric: "Teacher Satisfaction", value: 85, max: 100 },
    { metric: "Room Utilization", value: 75, max: 100 },
    { metric: "Schedule Efficiency", value: 88, max: 100 },
    { metric: "Conflict Resolution", value: 92, max: 100 },
    { metric: "Resource Optimization", value: 78, max: 100 },
  ]

  const handleAddPeriod = (day, timeSlot) => {
    setSelectedPeriod({ day, timeSlot })
    setIsEditMode(false)
    setShowPeriodModal(true)
  }

  const handleEditPeriod = (day, timeSlot, classData) => {
    setSelectedPeriod({ day, timeSlot, ...classData })
    setIsEditMode(true)
    setShowPeriodModal(true)
  }

  const handleSavePeriod = (periodData) => {
    // Update timetable data
    const { day, timeSlot, class: className, ...rest } = periodData

    setTimetableData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: {
          ...prev[day]?.[timeSlot],
          [className]: rest,
        },
      },
    }))

    setShowPeriodModal(false)
    setSelectedPeriod(null)
  }

  const handleDeletePeriod = (day, timeSlot, className) => {
    setTimetableData((prev) => {
      const newData = { ...prev }
      if (newData[day] && newData[day][timeSlot]) {
        delete newData[day][timeSlot][className]
        if (Object.keys(newData[day][timeSlot]).length === 0) {
          delete newData[day][timeSlot]
        }
      }
      return newData
    })

    toast({
      title: "Period Deleted",
      description: `${className} period removed from ${day} ${timeSlot}`,
    })
  }

  const handleViewTeacherSchedule = (teacher) => {
    setSelectedTeacher(teacher)
    setShowTeacherScheduleModal(true)
  }

  const handleExportTimetable = () => {
    toast({
      title: "Export Started",
      description: "Timetable is being exported to PDF",
    })
  }

  const handleImportTimetable = () => {
    toast({
      title: "Import Feature",
      description: "File import dialog would open here",
    })
  }

  const getPeriodColor = (subject) => {
    if (subject === "Break" || subject === "Lunch") return "bg-gray-100 text-gray-600 border-gray-200"
    if (subject === "Mathematics") return "bg-blue-100 text-blue-700 border-blue-200"
    if (subject === "English") return "bg-green-100 text-green-700 border-green-200"
    if (subject === "Science") return "bg-orange-100 text-orange-700 border-orange-200"
    if (subject === "Social Studies") return "bg-red-100 text-red-700 border-red-200"
    if (subject === "Kiswahili") return "bg-purple-100 text-purple-700 border-purple-200"
    return "bg-gray-100 text-gray-700 border-gray-200"
  }

  const filteredClasses = selectedClass === "all" ? classes : [selectedClass]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Timetable Management</h1>
          <p className="text-muted-foreground">Create, manage, and optimize school timetables</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowConflictModal(true)}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Conflicts (3)
          </Button>
          <Button variant="outline" onClick={() => setShowGenerateModal(true)}>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate
          </Button>
          <Button onClick={() => setShowRoomAllocationModal(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Manage
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Periods</p>
                <p className="text-2xl font-bold">240</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Teachers</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rooms in Use</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Timetable Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
          <TabsTrigger value="management">Resource Management</TabsTrigger>
          <TabsTrigger value="settings">Settings & Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Timetable
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
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>
                          {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={handleExportTimetable}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Time</TableHead>
                      {days.map((day) => (
                        <TableHead key={day} className="text-center min-w-48">
                          {day}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeSlots.map((timeSlot) => (
                      <TableRow key={timeSlot}>
                        <TableCell className="font-medium text-sm">{timeSlot}</TableCell>
                        {days.map((day) => {
                          const dayData = timetableData[day]?.[timeSlot] || {}

                          return (
                            <TableCell key={`${day}-${timeSlot}`} className="p-1">
                              <div className="space-y-1">
                                {filteredClasses.map((className) => {
                                  const periodData = dayData[className] || dayData["All"]

                                  return (
                                    <div key={className} className="relative group">
                                      {periodData ? (
                                        <div
                                          className={`p-2 rounded text-xs border cursor-pointer hover:shadow-md transition-all duration-200 ${getPeriodColor(periodData.subject)}`}
                                          onClick={() =>
                                            handleEditPeriod(day, timeSlot, { class: className, ...periodData })
                                          }
                                        >
                                          <div className="font-medium">{periodData.subject}</div>
                                          {selectedClass === "all" && (
                                            <div className="text-xs opacity-75">{className}</div>
                                          )}
                                          {periodData.teacher && (
                                            <div className="text-xs opacity-75">{periodData.teacher}</div>
                                          )}
                                          {periodData.room && (
                                            <div className="text-xs opacity-75">{periodData.room}</div>
                                          )}

                                          {/* Action buttons on hover */}
                                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="flex gap-1">
                                              <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-5 w-5"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  handleEditPeriod(day, timeSlot, { class: className, ...periodData })
                                                }}
                                              >
                                                <Edit className="h-3 w-3" />
                                              </Button>
                                              <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-5 w-5 text-red-600"
                                                onClick={(e) => {
                                                  e.stopPropagation()
                                                  handleDeletePeriod(day, timeSlot, className)
                                                }}
                                              >
                                                <Trash2 className="h-3 w-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div
                                          className="p-2 rounded text-xs bg-gray-50 border-2 border-dashed border-gray-200 text-center text-gray-400 cursor-pointer hover:border-gray-300 hover:bg-gray-100 transition-colors"
                                          onClick={() => handleAddPeriod(day, timeSlot)}
                                        >
                                          <Plus className="h-4 w-4 mx-auto mb-1" />
                                          Add Period
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Teacher Workload Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Teacher Workload Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={teacherWorkloadData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="teacher" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="periods" fill="#3b82f6" name="Periods" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Room Utilization Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Room Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roomUtilizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="room" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="utilization" fill="#10b981" name="Utilization %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Subject Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
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

            {/* Weekly Efficiency Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} name="Efficiency %" />
                    <Line type="monotone" dataKey="conflicts" stroke="#ef4444" strokeWidth={2} name="Conflicts" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Timetable Performance Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Timetable Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={timetableMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Performance"
                    dataKey="value"
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

          {/* Analytics Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Peak Teaching Hours</span>
                  <Badge variant="outline">10:20-11:40</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Most Utilized Room</span>
                  <Badge variant="outline">Room 201 (85%)</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Busiest Teacher</span>
                  <Badge variant="outline">Mr. John Kamau</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Optimal Day</span>
                  <Badge variant="outline">Thursday</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-2 bg-blue-50 rounded text-sm">💡 Consider redistributing Mr. Kamau's workload</div>
                <div className="p-2 bg-green-50 rounded text-sm">✓ Room utilization is well balanced</div>
                <div className="p-2 bg-yellow-50 rounded text-sm">⚠️ Friday afternoon efficiency could be improved</div>
                <div className="p-2 bg-purple-50 rounded text-sm">🎯 Science lab usage is optimal</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setShowConflictModal(true)}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Resolve Conflicts
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setShowTeacherScheduleModal(true)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  View Teacher Schedules
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setShowRoomAllocationModal(true)}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Manage Rooms
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={handleExportTimetable}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Teacher Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Teacher Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {teacherWorkloadData.map((teacher) => (
                    <div key={teacher.teacher} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{teacher.teacher}</div>
                        <div className="text-sm text-muted-foreground">{teacher.periods} periods assigned</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            teacher.utilization > 90
                              ? "destructive"
                              : teacher.utilization > 70
                                ? "secondary"
                                : "default"
                          }
                        >
                          {teacher.utilization}%
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => handleViewTeacherSchedule(teacher)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full" onClick={() => setShowTeacherScheduleModal(true)}>
                  <Users className="mr-2 h-4 w-4" />
                  Manage All Teachers
                </Button>
              </CardContent>
            </Card>

            {/* Room Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Room Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {roomUtilizationData.map((room) => (
                    <div key={room.room} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{room.room}</div>
                        <div className="text-sm text-muted-foreground">Capacity: {room.capacity} students</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${room.utilization > 80 ? "bg-red-600" : room.utilization > 60 ? "bg-yellow-600" : "bg-green-600"}`}
                            style={{ width: `${room.utilization}%` }}
                          ></div>
                        </div>
                        <span className="text-sm w-12">{room.utilization}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full" onClick={() => setShowRoomAllocationModal(true)}>
                  <MapPin className="mr-2 h-4 w-4" />
                  Manage All Rooms
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Resource Optimization */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Underutilized Resources</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Library</span>
                      <span className="text-blue-600">45% usage</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Computer Lab</span>
                      <span className="text-blue-600">60% usage</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Overutilized Resources</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Room 201</span>
                      <span className="text-orange-600">85% usage</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mr. John Kamau</span>
                      <span className="text-orange-600">92% workload</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Optimization Suggestions</h4>
                  <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
                    <div>• Move some classes to Library</div>
                    <div>• Balance teacher workloads</div>
                    <div>• Optimize room transitions</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Timetable Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Timetable Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" onClick={() => setShowGenerateModal(true)}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate New Timetable
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setShowConflictModal(true)}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Conflict Resolution Center
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleExportTimetable}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Timetable
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleImportTimetable}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import Timetable
                </Button>
              </CardContent>
            </Card>

            {/* System Settings */}
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolHours">School Hours</Label>
                  <div className="flex gap-2">
                    <Input type="time" defaultValue="08:00" className="flex-1" />
                    <span className="self-center">to</span>
                    <Input type="time" defaultValue="15:00" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periodDuration">Period Duration (minutes)</Label>
                  <Input type="number" defaultValue="40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
                  <Input type="number" defaultValue="20" />
                </div>
                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Features */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Automation Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-resolve conflicts</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Smart room allocation</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Teacher workload balancing</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Automatic backup</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Conflict alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Schedule changes</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly reports</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System maintenance</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showPeriodModal && (
        <PeriodModal
          period={selectedPeriod}
          day={selectedPeriod?.day}
          timeSlot={selectedPeriod?.timeSlot}
          onClose={() => {
            setShowPeriodModal(false)
            setSelectedPeriod(null)
          }}
          onSave={handleSavePeriod}
          isEdit={isEditMode}
        />
      )}

      {showTeacherScheduleModal && (
        <TeacherScheduleModal
          teacher={selectedTeacher}
          onClose={() => {
            setShowTeacherScheduleModal(false)
            setSelectedTeacher(null)
          }}
          onEdit={(teacher) => {
            toast({
              title: "Edit Mode",
              description: `Opening schedule editor for ${teacher.name}`,
            })
          }}
        />
      )}

      {showRoomAllocationModal && (
        <RoomAllocationModal
          onClose={() => setShowRoomAllocationModal(false)}
          onSave={(rooms) => {
            toast({
              title: "Rooms Updated",
              description: "Room allocation has been saved successfully",
            })
          }}
        />
      )}

      {showConflictModal && (
        <ConflictResolutionModal
          onClose={() => setShowConflictModal(false)}
          onResolve={(conflictId, suggestionId) => {
            toast({
              title: "Conflict Resolved",
              description: "The scheduling conflict has been resolved",
            })
          }}
        />
      )}

      {showGenerateModal && (
        <GenerateTimetableModal
          onClose={() => setShowGenerateModal(false)}
          onGenerate={(timetableData) => {
            toast({
              title: "Timetable Generated",
              description: "New timetable has been created successfully",
            })
            setShowGenerateModal(false)
          }}
        />
      )}
    </div>
  )
}

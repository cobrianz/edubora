"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Plus, Download, Eye, BookOpen, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function TimetablePage() {
  const { toast } = useToast()
  const [selectedClass, setSelectedClass] = useState("grade-7a")
  const [selectedWeek, setSelectedWeek] = useState("current")

  const classes = [
    { value: "grade-7a", label: "Grade 7A" },
    { value: "grade-7b", label: "Grade 7B" },
    { value: "grade-8a", label: "Grade 8A" },
    { value: "grade-8b", label: "Grade 8B" },
  ]

  const weeks = [
    { value: "current", label: "Current Week" },
    { value: "next", label: "Next Week" },
    { value: "previous", label: "Previous Week" },
  ]

  const timeSlots = [
    "8:00 - 8:40",
    "8:40 - 9:20",
    "9:20 - 10:00",
    "10:00 - 10:20", // Break
    "10:20 - 11:00",
    "11:00 - 11:40",
    "11:40 - 12:20",
    "12:20 - 1:00", // Lunch
    "1:00 - 1:40",
    "1:40 - 2:20",
    "2:20 - 3:00",
  ]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const timetableData = {
    "grade-7a": {
      Monday: {
        "8:00 - 8:40": { subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 201" },
        "8:40 - 9:20": { subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 201" },
        "9:20 - 10:00": { subject: "Kiswahili", teacher: "Mr. Peter Mwangi", room: "Room 201" },
        "10:00 - 10:20": { subject: "Break", teacher: "", room: "" },
        "10:20 - 11:00": { subject: "Science", teacher: "Dr. Mary Njeri", room: "Lab 1" },
        "11:00 - 11:40": { subject: "Social Studies", teacher: "Ms. Grace Achieng", room: "Room 201" },
        "11:40 - 12:20": { subject: "Art & Craft", teacher: "Mr. David Ochieng", room: "Art Room" },
        "12:20 - 1:00": { subject: "Lunch Break", teacher: "", room: "" },
        "1:00 - 1:40": { subject: "Physical Education", teacher: "Mr. James Kiprop", room: "Field" },
        "1:40 - 2:20": { subject: "Music", teacher: "Ms. Faith Wanjiru", room: "Music Room" },
        "2:20 - 3:00": { subject: "Study Time", teacher: "Class Teacher", room: "Room 201" },
      },
      Tuesday: {
        "8:00 - 8:40": { subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 201" },
        "8:40 - 9:20": { subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 201" },
        "9:20 - 10:00": { subject: "Science", teacher: "Dr. Mary Njeri", room: "Lab 1" },
        "10:00 - 10:20": { subject: "Break", teacher: "", room: "" },
        "10:20 - 11:00": { subject: "Kiswahili", teacher: "Mr. Peter Mwangi", room: "Room 201" },
        "11:00 - 11:40": { subject: "Social Studies", teacher: "Ms. Grace Achieng", room: "Room 201" },
        "11:40 - 12:20": { subject: "Computer Studies", teacher: "Mr. Paul Kimani", room: "Computer Lab" },
        "12:20 - 1:00": { subject: "Lunch Break", teacher: "", room: "" },
        "1:00 - 1:40": { subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 201" },
        "1:40 - 2:20": { subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 201" },
        "2:20 - 3:00": { subject: "Library Time", teacher: "Librarian", room: "Library" },
      },
      // Add more days...
    },
  }

  const teachers = [
    { id: 1, name: "Mr. John Kamau", subject: "Mathematics", totalPeriods: 24, assignedPeriods: 20 },
    { id: 2, name: "Ms. Sarah Wanjiku", subject: "English", totalPeriods: 20, assignedPeriods: 18 },
    { id: 3, name: "Dr. Mary Njeri", subject: "Science", totalPeriods: 18, assignedPeriods: 16 },
    { id: 4, name: "Mr. Peter Mwangi", subject: "Kiswahili", totalPeriods: 15, assignedPeriods: 14 },
  ]

  const rooms = [
    { id: 1, name: "Room 201", capacity: 35, currentClass: "Grade 7A", utilization: 85 },
    { id: 2, name: "Room 202", capacity: 35, currentClass: "Grade 7B", utilization: 80 },
    { id: 3, name: "Lab 1", capacity: 30, currentClass: "Science Classes", utilization: 70 },
    { id: 4, name: "Computer Lab", capacity: 25, currentClass: "Computer Studies", utilization: 60 },
  ]

  const handleEditPeriod = (day, time) => {
    toast({
      title: "Edit Period",
      description: `Editing ${day} ${time} period`,
    })
  }

  const handleGenerateTimetable = () => {
    toast({
      title: "Generate Timetable",
      description: "Auto-generating optimized timetable...",
    })
  }

  const handleExportTimetable = () => {
    toast({
      title: "Export Timetable",
      description: "Exporting timetable as PDF...",
    })
  }

  const handleViewTeacherSchedule = (teacher) => {
    toast({
      title: "Teacher Schedule",
      description: `Viewing schedule for ${teacher.name}`,
    })
  }

  const handleViewRoomSchedule = (room) => {
    toast({
      title: "Room Schedule",
      description: `Viewing schedule for ${room.name}`,
    })
  }

  const getCurrentTimetable = () => {
    return timetableData[selectedClass] || {}
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timetable Management</h1>
          <p className="text-muted-foreground">Manage class schedules and resource allocation</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={handleExportTimetable}
          >
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button onClick={handleGenerateTimetable} className="transition-all duration-300 hover:scale-105">
            <Plus className="mr-2 h-4 w-4" />
            Auto Generate
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Active timetables</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teaching Periods</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Per week</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Room Utilization</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Average usage</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teacher Load</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">Avg periods/teacher</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="timetable" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timetable">Class Timetables</TabsTrigger>
          <TabsTrigger value="teachers">Teacher Schedules</TabsTrigger>
          <TabsTrigger value="rooms">Room Allocation</TabsTrigger>
          <TabsTrigger value="conflicts">Conflict Resolution</TabsTrigger>
        </TabsList>

        <TabsContent value="timetable">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Timetable
              </CardTitle>
              <CardDescription>View and edit class schedules</CardDescription>
              <div className="flex gap-2">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.value} value={cls.value}>
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select week" />
                  </SelectTrigger>
                  <SelectContent>
                    {weeks.map((week) => (
                      <SelectItem key={week.value} value={week.value}>
                        {week.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">Time</TableHead>
                      {days.map((day) => (
                        <TableHead key={day} className="text-center min-w-40">
                          {day}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeSlots.map((time) => (
                      <TableRow key={time} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{time}</TableCell>
                        {days.map((day) => {
                          const currentTimetable = getCurrentTimetable()
                          const period = currentTimetable[day]?.[time]
                          const isBreak = period?.subject === "Break" || period?.subject === "Lunch Break"

                          return (
                            <TableCell key={`${day}-${time}`} className="p-2">
                              {period ? (
                                <div
                                  className={`p-2 rounded-lg text-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
                                    isBreak
                                      ? "bg-gray-100 text-gray-600 text-center"
                                      : "bg-blue-50 border border-blue-200 hover:bg-blue-100"
                                  }`}
                                  onClick={() => !isBreak && handleEditPeriod(day, time)}
                                >
                                  <div className="font-medium">{period.subject}</div>
                                  {!isBreak && (
                                    <>
                                      <div className="text-xs text-muted-foreground">{period.teacher}</div>
                                      <div className="text-xs text-muted-foreground">{period.room}</div>
                                    </>
                                  )}
                                </div>
                              ) : (
                                <div
                                  className="p-2 rounded-lg border-2 border-dashed border-gray-300 text-center text-gray-400 cursor-pointer transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                                  onClick={() => handleEditPeriod(day, time)}
                                >
                                  <Plus className="h-4 w-4 mx-auto" />
                                  <div className="text-xs">Add Period</div>
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

        <TabsContent value="teachers">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Teacher Schedules
              </CardTitle>
              <CardDescription>View teacher workload and schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Assigned Periods</TableHead>
                      <TableHead>Total Periods</TableHead>
                      <TableHead>Workload</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers.map((teacher) => (
                      <TableRow key={teacher.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.subject}</TableCell>
                        <TableCell>{teacher.assignedPeriods}</TableCell>
                        <TableCell>{teacher.totalPeriods}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(teacher.assignedPeriods / teacher.totalPeriods) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">
                              {Math.round((teacher.assignedPeriods / teacher.totalPeriods) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 transition-all duration-300 hover:scale-110"
                            onClick={() => handleViewTeacherSchedule(teacher)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rooms">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Room Allocation
              </CardTitle>
              <CardDescription>Manage classroom and facility usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room Name</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Current Assignment</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{room.name}</TableCell>
                        <TableCell>{room.capacity} students</TableCell>
                        <TableCell>{room.currentClass}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  room.utilization > 80
                                    ? "bg-red-600"
                                    : room.utilization > 60
                                      ? "bg-yellow-600"
                                      : "bg-green-600"
                                }`}
                                style={{ width: `${room.utilization}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{room.utilization}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              room.utilization > 80 ? "destructive" : room.utilization > 60 ? "secondary" : "default"
                            }
                          >
                            {room.utilization > 80 ? "High Usage" : room.utilization > 60 ? "Moderate" : "Available"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 transition-all duration-300 hover:scale-110"
                            onClick={() => handleViewRoomSchedule(room)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflicts">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Conflict Resolution</CardTitle>
              <CardDescription>Identify and resolve scheduling conflicts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No scheduling conflicts detected</p>
                <Button className="transition-all duration-300 hover:scale-105">
                  <Plus className="mr-2 h-4 w-4" />
                  Run Conflict Check
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

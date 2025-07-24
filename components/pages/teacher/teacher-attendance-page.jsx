"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, Calendar, Users, Clock, Save, Download } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import AttendanceDetailModal from "@/components/modals/attendance-detail-modal"

export default function TeacherAttendancePage() {
  const { toast } = useToast()
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [attendance, setAttendance] = useState({})
  const [showAttendanceDetailModal, setShowAttendanceDetailModal] = useState(false)
  const [selectedAttendanceRecord, setSelectedAttendanceRecord] = useState(null)

  const classes = [
    { id: "7a", name: "Grade 7A", subject: "Mathematics" },
    { id: "8b", name: "Grade 8B", subject: "Mathematics" },
    { id: "6a", name: "Grade 6A", subject: "Mathematics" },
  ]

  const students = [
    { id: 1, name: "Sarah Mwangi", admissionNo: "ADM001", rollNo: "01" },
    { id: 2, name: "John Doe", admissionNo: "ADM002", rollNo: "02" },
    { id: 3, name: "Mary Wanjiku", admissionNo: "ADM003", rollNo: "03" },
    { id: 4, name: "Peter Kamau", admissionNo: "ADM004", rollNo: "04" },
    { id: 5, name: "Grace Akinyi", admissionNo: "ADM005", rollNo: "05" },
    { id: 6, name: "David Ochieng", admissionNo: "ADM006", rollNo: "06" },
  ]

  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: "2024-01-15", class: "Grade 7A", present: 28, absent: 4, percentage: 87.5 },
    { date: "2024-01-14", class: "Grade 8B", present: 26, absent: 2, percentage: 92.9 },
    { date: "2024-01-13", class: "Grade 6A", present: 29, absent: 1, percentage: 96.7 },
    { date: "2024-01-12", class: "Grade 7A", present: 30, absent: 2, percentage: 93.8 },
  ])

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: isPresent,
    }))
  }

  const handleSaveAttendance = () => {
    if (!selectedClass) {
      toast({
        title: "Error",
        description: "Please select a class first",
        variant: "destructive",
      })
      return
    }

    const presentCount = Object.values(attendance).filter(Boolean).length
    const totalStudents = students.length
    const absentCount = totalStudents - presentCount
    const percentage = ((presentCount / totalStudents) * 100).toFixed(1)

    const newRecord = {
      date: selectedDate,
      class: classes.find((cls) => cls.id === selectedClass)?.name || selectedClass,
      present: presentCount,
      absent: absentCount,
      percentage: Number.parseFloat(percentage),
    }

    setAttendanceHistory((prevHistory) => [newRecord, ...prevHistory])

    toast({
      title: "Attendance Saved",
      description: `${presentCount}/${totalStudents} students present (${percentage}%)`,
    })
  }

  const handleMarkAllPresent = () => {
    const allPresent = {}
    students.forEach((student) => {
      allPresent[student.id] = true
    })
    setAttendance(allPresent)
    toast({
      title: "All Marked Present",
      description: "All students have been marked as present",
    })
  }

  const handleMarkAllAbsent = () => {
    const allAbsent = {}
    students.forEach((student) => {
      allAbsent[student.id] = false
    })
    setAttendance(allAbsent)
    toast({
      title: "All Marked Absent",
      description: "All students have been marked as absent",
    })
  }

  const handleViewAttendanceDetails = (record) => {
    setSelectedAttendanceRecord(record)
    setShowAttendanceDetailModal(true)
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">Mark and track student attendance</p>
        </div>
        <Button onClick={handleSaveAttendance} className="transition-all duration-300 hover:scale-105">
          <Save className="mr-2 h-4 w-4" />
          Save Attendance
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Scheduled today</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">168</div>
            <p className="text-xs text-muted-foreground">93.3% attendance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Need follow-up</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Select class and date to mark student attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mark" className="space-y-4">
            <TabsList>
              <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
              <TabsTrigger value="history">Attendance History</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="mark" className="space-y-4">
              {/* Class and Date Selection */}
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Select Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} - {cls.subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleMarkAllPresent}
                    className="transition-all duration-300 hover:scale-105 bg-transparent"
                  >
                    Mark All Present
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleMarkAllAbsent}
                    className="transition-all duration-300 hover:scale-105 bg-transparent"
                  >
                    Mark All Absent
                  </Button>
                </div>
              </div>

              {/* Student List */}
              {selectedClass ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Roll No.</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Admission No.</TableHead>
                        <TableHead>Present</TableHead>
                        <TableHead>Absent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">{student.rollNo}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.admissionNo}</TableCell>
                          <TableCell>
                            <Checkbox
                              checked={attendance[student.id] === true}
                              onCheckedChange={(checked) => handleAttendanceChange(student.id, checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <Checkbox
                              checked={attendance[student.id] === false}
                              onCheckedChange={(checked) => handleAttendanceChange(student.id, !checked)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a class to start marking attendance</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Attendance Records</h3>
                <Button variant="outline" className="transition-all duration-300 hover:scale-105 bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceHistory.map((record, index) => (
                    <TableRow key={index} className="transition-all duration-200 hover:bg-muted/50">
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.class}</TableCell>
                      <TableCell className="text-green-600 font-medium">{record.present}</TableCell>
                      <TableCell className="text-red-600 font-medium">{record.absent}</TableCell>
                      <TableCell>
                        <Badge variant={record.percentage >= 90 ? "default" : "secondary"}>{record.percentage}%</Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAttendanceDetails(record)}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="reports">
              <div className="text-center py-8">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Attendance reports and analytics will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Attendance Detail Modal */}
      {showAttendanceDetailModal && (
        <AttendanceDetailModal
          attendanceRecord={selectedAttendanceRecord}
          onClose={() => setShowAttendanceDetailModal(false)}
        />
      )}
    </div>
  )
}

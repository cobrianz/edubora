"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Download, BookOpen, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function StudentTimetablePage() {
  const { toast } = useToast()
  const [selectedWeek, setSelectedWeek] = useState("current")

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

  const myTimetable = {
    Monday: {
      "8:00 - 8:40": { subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 201" },
      "8:40 - 9:20": { subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 201" },
      "9:20 - 10:00": { subject: "Kiswahili", teacher: "Mr. Peter Mwangi", room: "Room 201" },
      "10:00 - 10:20": { subject: "Break", teacher: "", room: "" },
      "10:20 - 11:00": { subject: "Science", teacher: "Dr. Mary Njeri", room: "Lab 1" },
      "11:00 - 11:40": { subject: "Science", teacher: "Dr. Mary Njeri", room: "Lab 1" },
      "11:40 - 12:20": { subject: "Social Studies", teacher: "Ms. Grace Achieng", room: "Room 201" },
      "12:20 - 1:00": { subject: "Lunch Break", teacher: "", room: "" },
      "1:00 - 1:40": { subject: "Art & Craft", teacher: "Mr. David Ochieng", room: "Art Room" },
      "1:40 - 2:20": { subject: "Physical Education", teacher: "Mr. James Omondi", room: "Field" },
      "2:20 - 3:00": { subject: "Club Activities", teacher: "", room: "Various" },
    },
    Tuesday: {
      "8:00 - 8:40": { subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 201" },
      "8:40 - 9:20": { subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 201" },
      "9:20 - 10:00": { subject: "Science", teacher: "Dr. Mary Njeri", room: "Room 201" },
      "10:00 - 10:20": { subject: "Break", teacher: "", room: "" },
      "10:20 - 11:00": { subject: "Kiswahili", teacher: "Mr. Peter Mwangi", room: "Room 201" },
      "11:00 - 11:40": { subject: "Social Studies", teacher: "Ms. Grace Achieng", room: "Room 201" },
      "11:40 - 12:20": { subject: "Religious Education", teacher: "Mrs. Faith Muthoni", room: "Room 201" },
      "12:20 - 1:00": { subject: "Lunch Break", teacher: "", room: "" },
      "1:00 - 1:40": { subject: "Music", teacher: "Mr. Charles Otieno", room: "Music Room" },
      "1:40 - 2:20": { subject: "Library", teacher: "Mrs. Jane Kamau", room: "Library" },
      "2:20 - 3:00": { subject: "Homework Time", teacher: "Various", room: "Room 201" },
    },
    // Add more days...
  }

  const upcomingClasses = [
    { time: "8:00 AM", subject: "Mathematics", teacher: "Mr. John Kamau", room: "Room 201", status: "Next" },
    { time: "8:40 AM", subject: "English", teacher: "Ms. Sarah Wanjiku", room: "Room 201", status: "Upcoming" },
    { time: "9:20 AM", subject: "Kiswahili", teacher: "Mr. Peter Mwangi", room: "Room 201", status: "Upcoming" },
  ]

  const handleExportTimetable = () => {
    toast({
      title: "Export Timetable",
      description: "Exporting your timetable as PDF...",
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Timetable</h1>
          <p className="text-muted-foreground">View your class schedule and upcoming lessons</p>
        </div>
        <div className="flex gap-2">
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
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={handleExportTimetable}
          >
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35</div>
            <p className="text-xs text-muted-foreground">Per week</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">Core subjects</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Subject teachers</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Monday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Weekly Timetable */}
        <div className="md:col-span-2">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>Your class timetable for the week</CardDescription>
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
                          const period = myTimetable[day]?.[time]
                          const isBreak = period?.subject === "Break" || period?.subject === "Lunch Break"
                          const isClass = period?.teacher && !isBreak

                          return (
                            <TableCell key={`${day}-${time}`} className="p-2">
                              {period ? (
                                <div
                                  className={`p-2 rounded-lg text-sm ${
                                    isBreak
                                      ? "bg-gray-100 text-gray-600 text-center"
                                      : isClass
                                        ? "bg-blue-50 border border-blue-200"
                                        : "bg-yellow-50 border border-yellow-200 text-center"
                                  }`}
                                >
                                  <div className="font-medium">{period.subject}</div>
                                  {period.teacher && (
                                    <>
                                      <div className="text-xs text-muted-foreground">{period.teacher}</div>
                                      <div className="text-xs text-muted-foreground">{period.room}</div>
                                    </>
                                  )}
                                </div>
                              ) : (
                                <div className="p-2 rounded-lg border-2 border-dashed border-gray-300 text-center text-gray-400">
                                  <div className="text-xs">No Class</div>
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
        </div>

        {/* Upcoming Classes */}
        <div>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Classes
              </CardTitle>
              <CardDescription>Your upcoming classes today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingClasses.map((classInfo, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{classInfo.time}</span>
                      <Badge variant={classInfo.status === "Next" ? "default" : "outline"}>{classInfo.status}</Badge>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium">{classInfo.subject}</div>
                      <div className="text-muted-foreground">{classInfo.teacher}</div>
                      <div className="text-muted-foreground">{classInfo.room}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-medium text-sm">Science Project Due</p>
                  <p className="text-xs text-muted-foreground">Tomorrow, Dr. Mary Njeri</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-medium text-sm">Mathematics Quiz</p>
                  <p className="text-xs text-muted-foreground">Wednesday, Mr. John Kamau</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-medium text-sm">Field Trip Permission</p>
                  <p className="text-xs text-muted-foreground">Submit by Friday</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

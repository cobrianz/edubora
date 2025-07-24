"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, BookOpen, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import ClassViewModal from "@/components/modals/class-view-modal"
import { useState } from "react"

export default function TeacherTimetablePage() {
  const { toast } = useToast()
  const [showClassViewModal, setShowClassViewModal] = useState(false)
  const [selectedClassData, setSelectedClassData] = useState(null)

  const timetableData = {
    Monday: [
      {
        time: "8:00 - 8:40",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      {
        time: "8:40 - 9:20",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      { time: "9:20 - 10:00", subject: "Free Period", class: "", room: "" },
      {
        time: "10:20 - 11:00",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "11:00 - 11:40",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      { time: "11:40 - 12:20", subject: "Free Period", class: "", room: "" },
      {
        time: "2:00 - 2:40",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "2:40 - 3:20",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
    ],
    Tuesday: [
      {
        time: "8:00 - 8:40",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "8:40 - 9:20",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      {
        time: "9:20 - 10:00",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      { time: "10:20 - 11:00", subject: "Free Period", class: "", room: "" },
      {
        time: "11:00 - 11:40",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "11:40 - 12:20",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      { time: "2:00 - 2:40", subject: "Free Period", class: "", room: "" },
      {
        time: "2:40 - 3:20",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
    ],
    Wednesday: [
      {
        time: "8:00 - 8:40",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      {
        time: "8:40 - 9:20",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "9:20 - 10:00",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "10:20 - 11:00",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      { time: "11:00 - 11:40", subject: "Free Period", class: "", room: "" },
      {
        time: "11:40 - 12:20",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "2:00 - 2:40",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      { time: "2:40 - 3:20", subject: "Free Period", class: "", room: "" },
    ],
    Thursday: [
      {
        time: "8:00 - 8:40",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "8:40 - 9:20",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      { time: "9:20 - 10:00", subject: "Free Period", class: "", room: "" },
      {
        time: "10:20 - 11:00",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "11:00 - 11:40",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "11:40 - 12:20",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      {
        time: "2:00 - 2:40",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      { time: "2:40 - 3:20", subject: "Free Period", class: "", room: "" },
    ],
    Friday: [
      {
        time: "8:00 - 8:40",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      {
        time: "8:40 - 9:20",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "9:20 - 10:00",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      { time: "10:20 - 11:00", subject: "Free Period", class: "", room: "" },
      {
        time: "11:00 - 11:40",
        subject: "Mathematics",
        class: "Grade 7A",
        room: "Room 12",
        students: 32,
        capacity: 35,
        teacher: "Mr. John Kamau",
      },
      { time: "11:40 - 12:20", subject: "Free Period", class: "", room: "" },
      {
        time: "2:00 - 2:40",
        subject: "Mathematics",
        class: "Grade 8B",
        room: "Room 12",
        students: 28,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
      {
        time: "2:40 - 3:20",
        subject: "Mathematics",
        class: "Grade 6A",
        room: "Room 12",
        students: 30,
        capacity: 30,
        teacher: "Mr. John Kamau",
      },
    ],
  }

  const handleExportTimetable = () => {
    toast({
      title: "Export Timetable",
      description: "Downloading your timetable as PDF...",
    })
  }

  const handleViewClassDetails = (classInfo) => {
    if (classInfo.class) {
      setSelectedClassData(classInfo)
      setShowClassViewModal(true)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Timetable</h1>
          <p className="text-muted-foreground">Your weekly teaching schedule</p>
        </div>
        <Button
          variant="outline"
          onClick={handleExportTimetable}
          className="transition-all duration-300 hover:scale-105 bg-transparent"
        >
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes per Week</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
            <p className="text-xs text-muted-foreground">Teaching periods</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Periods</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">Available slots</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Mathematics</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Room</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Primary classroom</p>
          </CardContent>
        </Card>
      </div>

      {/* Timetable */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Timetable
          </CardTitle>
          <CardDescription>Your complete teaching schedule for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Time</th>
                  {Object.keys(timetableData).map((day) => (
                    <th key={day} className="text-left p-3 font-medium">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }, (_, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium text-sm">{timetableData.Monday[index]?.time || ""}</td>
                    {Object.keys(timetableData).map((day) => {
                      const classInfo = timetableData[day][index]
                      return (
                        <td key={day} className="p-3">
                          {classInfo?.subject ? (
                            <div
                              className={`p-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
                                classInfo.subject === "Free Period"
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                              }`}
                              onClick={() => handleViewClassDetails(classInfo)}
                            >
                              <div className="font-medium text-sm">{classInfo.subject}</div>
                              {classInfo.class && (
                                <>
                                  <div className="text-xs">{classInfo.class}</div>
                                  <div className="text-xs flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {classInfo.room}
                                  </div>
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="p-2 text-center text-gray-400 text-sm">-</div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Your classes for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timetableData.Monday.filter((item) => item.subject !== "Free Period").map((classInfo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">{classInfo.time.split(" - ")[0]}</div>
                    <div className="text-xs text-muted-foreground">{classInfo.time.split(" - ")[1]}</div>
                  </div>
                  <div>
                    <div className="font-medium">{classInfo.subject}</div>
                    <div className="text-sm text-muted-foreground">{classInfo.class}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1">
                    {classInfo.room}
                  </Badge>
                  <div className="text-xs text-muted-foreground">40 minutes</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class View Modal */}
      {showClassViewModal && (
        <ClassViewModal
          classData={selectedClassData}
          onClose={() => setShowClassViewModal(false)}
          // onEdit and onSettings are not directly used here, but kept for consistency if needed
          onEdit={() => toast({ title: "Edit Class", description: "Edit functionality not implemented here." })}
          onSettings={() =>
            toast({ title: "Class Settings", description: "Settings functionality not implemented here." })
          }
        />
      )}
    </div>
  )
}

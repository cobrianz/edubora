"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, Clock, Eye, MessageSquare } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import ClassViewModal from "@/components/modals/class-view-modal"

export default function TeacherClassesPage() {
  const { toast } = useToast()
  const [selectedClass, setSelectedClass] = useState(null)
  const [showClassModal, setShowClassModal] = useState(false)

  const myClasses = [
    {
      id: 1,
      name: "Grade 7A",
      subject: "Mathematics",
      students: 32,
      room: "Room 12",
      schedule: "Mon, Wed, Fri - 8:00 AM",
      nextClass: "Today 8:00 AM",
      attendance: 94,
      assignments: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Grade 8B",
      subject: "Mathematics",
      students: 28,
      room: "Room 12",
      schedule: "Tue, Thu - 9:30 AM",
      nextClass: "Tomorrow 9:30 AM",
      attendance: 89,
      assignments: 2,
      status: "Active",
    },
    {
      id: 3,
      name: "Grade 6A",
      subject: "Mathematics",
      students: 30,
      room: "Room 12",
      schedule: "Mon, Wed, Fri - 2:00 PM",
      nextClass: "Today 2:00 PM",
      attendance: 96,
      assignments: 4,
      status: "Active",
    },
  ]

  const students = [
    { id: 1, name: "Sarah Mwangi", admissionNo: "ADM001", attendance: 95, lastGrade: "A-" },
    { id: 2, name: "John Doe", admissionNo: "ADM002", attendance: 92, lastGrade: "B+" },
    { id: 3, name: "Mary Wanjiku", admissionNo: "ADM003", attendance: 98, lastGrade: "A" },
    { id: 4, name: "Peter Kamau", admissionNo: "ADM004", attendance: 87, lastGrade: "B" },
  ]

  const handleViewClass = (classItem) => {
    setSelectedClass(classItem)
    setShowClassModal(true)
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
          <p className="text-muted-foreground">Manage your assigned classes and students</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Across 3 grades</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">180</div>
            <p className="text-xs text-muted-foreground">Under your guidance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93%</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
      </div>

      {/* My Classes */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            My Classes
          </CardTitle>
          <CardDescription>Classes you are currently teaching</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myClasses.map((classItem) => (
              <Card key={classItem.id} className="transition-all duration-300 hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{classItem.name}</CardTitle>
                      <CardDescription>{classItem.subject}</CardDescription>
                    </div>
                    <Badge variant="default">{classItem.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Students:</span>
                      <span className="ml-1 font-medium">{classItem.students}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Room:</span>
                      <span className="ml-1 font-medium">{classItem.room}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Schedule:</span>
                      <span className="ml-1 font-medium">{classItem.schedule}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Next:</span>
                      <span className="ml-1 font-medium">{classItem.nextClass}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewClass(classItem)}
                      className="transition-all duration-300 hover:scale-105"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Students */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Recent Student Activity
          </CardTitle>
          <CardDescription>Latest updates from your students</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Admission No.</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Last Grade</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="transition-all duration-200 hover:bg-muted/50">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.admissionNo}</TableCell>
                  <TableCell>
                    <Badge variant={student.attendance >= 90 ? "default" : "secondary"}>{student.attendance}%</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.lastGrade}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Class View Modal */}
      {showClassModal && <ClassViewModal classData={selectedClass} onClose={() => setShowClassModal(false)} />}
    </div>
  )
}

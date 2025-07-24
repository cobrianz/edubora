"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, Eye, MessageSquare, TrendingUp, Award, UserCheck } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import StudentViewModal from "@/components/modals/student-view-modal"
import MessageComposeModal from "@/components/modals/message-compose-modal"

export default function TeacherStudentsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showMessageComposeModal, setShowMessageComposeModal] = useState(false)

  const students = [
    {
      id: "STU001",
      name: "Sarah Mwangi",
      class: "Grade 7A",
      admissionNumber: "ADM2024001",
      gender: "Female",
      age: 13,
      parent: "John Mwangi",
      phone: "+254712345678",
      currentGrade: "A-",
      attendance: 95,
      lastAssignment: "Mathematics Worksheet - A",
      status: "Active",
      dateOfBirth: "2010-03-15",
      stream: "Blue",
      religion: "Christian",
      bloodGroup: "O+",
      address: "P.O. Box 123, Nairobi, Kenya",
      classRank: "3rd",
    },
    {
      id: "STU002",
      name: "David Ochieng",
      class: "Grade 7A",
      admissionNumber: "ADM2024002",
      gender: "Male",
      age: 13,
      parent: "Mary Ochieng",
      phone: "+254723456789",
      currentGrade: "B+",
      attendance: 88,
      lastAssignment: "Mathematics Worksheet - B+",
      status: "Active",
      dateOfBirth: "2010-05-20",
      stream: "Blue",
      religion: "Christian",
      bloodGroup: "A-",
      address: "P.O. Box 124, Nairobi, Kenya",
      classRank: "10th",
    },
    {
      id: "STU003",
      name: "Grace Akinyi",
      class: "Grade 8B",
      admissionNumber: "ADM2024003",
      gender: "Female",
      age: 14,
      parent: "Peter Akinyi",
      phone: "+254734567890",
      currentGrade: "A",
      attendance: 92,
      lastAssignment: "Science Project - A",
      status: "Active",
      dateOfBirth: "2009-11-01",
      stream: "Green",
      religion: "Christian",
      bloodGroup: "B+",
      address: "P.O. Box 125, Nairobi, Kenya",
      classRank: "1st",
    },
    {
      id: "STU004",
      name: "John Kamau",
      class: "Grade 7A",
      admissionNumber: "ADM2024004",
      gender: "Male",
      age: 13,
      parent: "Alice Kamau",
      phone: "+254745678901",
      currentGrade: "B",
      attendance: 85,
      lastAssignment: "Mathematics Worksheet - B",
      status: "Active",
      dateOfBirth: "2010-07-22",
      stream: "Blue",
      religion: "Christian",
      bloodGroup: "AB-",
      address: "P.O. Box 126, Nairobi, Kenya",
      classRank: "15th",
    },
  ]

  const classes = [
    { value: "all", label: "All Classes" },
    { value: "grade-7a", label: "Grade 7A" },
    { value: "grade-8b", label: "Grade 8B" },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass =
      selectedClass === "all" || student.class.toLowerCase().includes(selectedClass.replace("-", " "))
    return matchesSearch && matchesClass
  })

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setShowViewModal(true)
  }

  const handleMessageStudent = (student) => {
    setSelectedStudent(student) // Set selected student for the message modal
    setShowMessageComposeModal(true)
  }

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  const getAttendanceColor = (attendance) => {
    if (attendance >= 90) return "text-green-600"
    if (attendance >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Students</h1>
          <p className="text-muted-foreground">Manage and track your students' progress</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">B+</div>
            <p className="text-xs text-muted-foreground">Class performance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">Average attendance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Grade A students</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
          <CardDescription>View and manage your students' information and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All Students</TabsTrigger>
                <TabsTrigger value="grade-7a">Grade 7A</TabsTrigger>
                <TabsTrigger value="grade-8b">Grade 8B</TabsTrigger>
                <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.value} value={cls.value}>
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Current Grade</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Last Assignment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{student.admissionNumber}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getGradeColor(student.currentGrade)}>
                            {student.currentGrade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={getAttendanceColor(student.attendance)}>{student.attendance}%</span>
                        </TableCell>
                        <TableCell className="text-sm">{student.lastAssignment}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleViewStudent(student)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleMessageStudent(student)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="grade-7a">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Current Grade</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents
                      .filter((s) => s.class === "Grade 7A")
                      .map((student) => (
                        <TableRow key={student.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getGradeColor(student.currentGrade)}>
                              {student.currentGrade}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={getAttendanceColor(student.attendance)}>{student.attendance}%</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewStudent(student)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleMessageStudent(student)}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="grade-8b">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Current Grade</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents
                      .filter((s) => s.class === "Grade 8B")
                      .map((student) => (
                        <TableRow key={student.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getGradeColor(student.currentGrade)}>
                              {student.currentGrade}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={getAttendanceColor(student.attendance)}>{student.attendance}%</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewStudent(student)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleMessageStudent(student)}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="top-performers">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents
                      .filter((s) => s.currentGrade.startsWith("A"))
                      .map((student) => (
                        <TableRow key={student.id} className="transition-all duration-200 hover:bg-muted/50">
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-green-600">
                              {student.currentGrade}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className={getAttendanceColor(student.attendance)}>{student.attendance}%</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleViewStudent(student)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleMessageStudent(student)}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Student View Modal */}
      {showViewModal && (
        <StudentViewModal
          student={selectedStudent}
          onClose={() => setShowViewModal(false)}
          onEdit={() => {
            toast({
              title: "Edit Student",
              description: "Student editing is handled by the admin",
            })
          }}
          onMessage={handleMessageStudent} // Pass handleMessageStudent to StudentViewModal
        />
      )}

      {/* Message Compose Modal */}
      {showMessageComposeModal && (
        <MessageComposeModal
          onClose={() => setShowMessageComposeModal(false)}
          userRole="teacher"
          recipient={selectedStudent ? { name: selectedStudent.name, id: selectedStudent.id, role: "student" } : null}
        />
      )}
    </div>
  )
}

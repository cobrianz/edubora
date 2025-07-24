"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Edit, Settings, Users, GraduationCap, Calendar, BookOpen, BarChart3 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ClassViewModal({ classData, onClose, onEdit, onSettings }) {
  if (!classData) return null

  const handleEdit = () => {
    onEdit(classData)
  }

  const handleSettings = () => {
    onSettings(classData)
  }

  // Mock data for demonstration
  const students = [
    { id: 1, name: "Sarah Mwangi", admissionNo: "ADM001", performance: "A-", attendance: "95%" },
    { id: 2, name: "David Ochieng", admissionNo: "ADM002", performance: "B+", attendance: "92%" },
    { id: 3, name: "Grace Akinyi", admissionNo: "ADM003", performance: "A", attendance: "98%" },
    { id: 4, name: "John Kamau", admissionNo: "ADM004", performance: "B", attendance: "88%" },
  ]

  const subjects = [
    { name: "Mathematics", teacher: "Mr. John Kamau", periods: 6 },
    { name: "English", teacher: "Ms. Sarah Wanjiku", periods: 5 },
    { name: "Science", teacher: "Dr. Mary Njeri", periods: 4 },
    { name: "Social Studies", teacher: "Ms. Grace Achieng", periods: 3 },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              {classData.name}
            </CardTitle>
            <CardDescription>
              Class Teacher: {classData.teacher} • Room: {classData.room}
            </CardDescription>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">
                {classData.students}/{classData.capacity} Students
              </Badge>
              <Badge variant={classData.students >= classData.capacity ? "destructive" : "default"}>
                {classData.students >= classData.capacity ? "Full" : "Available"}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSettings}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Class Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class Name:</span>
                      <span className="font-medium">{classData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class Teacher:</span>
                      <span className="font-medium">{classData.teacher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room:</span>
                      <span className="font-medium">{classData.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium">{classData.capacity} students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Enrollment:</span>
                      <span className="font-medium">{classData.students} students</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Performance Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class Average:</span>
                      <Badge variant="default">B+</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Attendance Rate:</span>
                      <span className="font-medium text-green-600">93%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pass Rate:</span>
                      <span className="font-medium text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Top Performer:</span>
                      <span className="font-medium">Grace Akinyi</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Schedule Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Daily Periods:</span>
                      <span className="font-medium">8 periods</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekly Hours:</span>
                      <span className="font-medium">35 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Break Time:</span>
                      <span className="font-medium">10:00 - 10:20 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lunch Time:</span>
                      <span className="font-medium">12:20 - 1:00 PM</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Class Students ({students.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Admission No.</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.admissionNo}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{student.performance}</Badge>
                            </TableCell>
                            <TableCell>{student.attendance}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                View Profile
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

            <TabsContent value="subjects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Subject Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Teacher</TableHead>
                          <TableHead>Weekly Periods</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subjects.map((subject, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{subject.name}</TableCell>
                            <TableCell>{subject.teacher}</TableCell>
                            <TableCell>{subject.periods} periods</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                View Details
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

            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mathematics</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>English</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Science</span>
                        <span>82%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Class Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">A Grade Students:</span>
                      <span className="font-medium text-green-600">8 (25%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">B Grade Students:</span>
                      <span className="font-medium text-blue-600">18 (56%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">C Grade Students:</span>
                      <span className="font-medium text-yellow-600">5 (16%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Below Average:</span>
                      <span className="font-medium text-red-600">1 (3%)</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

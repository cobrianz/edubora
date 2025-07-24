"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Plus, UserMinus, Mail, Eye, UserCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ParticipantManagementModal({ isOpen, onClose, activity = null }) {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")

  const [currentParticipants, setCurrentParticipants] = useState([
    {
      id: "STU001",
      name: "John Doe",
      admissionNo: "ADM2024001",
      class: "Grade 7A",
      joinDate: "2024-01-15",
      attendance: 85,
      performance: "Excellent",
      contact: "+254712345678",
      status: "Active",
    },
    {
      id: "STU002",
      name: "Jane Smith",
      admissionNo: "ADM2024002",
      class: "Grade 7B",
      joinDate: "2024-02-01",
      attendance: 92,
      performance: "Good",
      contact: "+254723456789",
      status: "Active",
    },
    {
      id: "STU003",
      name: "Mike Johnson",
      admissionNo: "ADM2024003",
      class: "Grade 6A",
      joinDate: "2024-01-20",
      attendance: 78,
      performance: "Average",
      contact: "+254734567890",
      status: "Inactive",
    },
  ])

  const [availableStudents, setAvailableStudents] = useState([
    {
      id: "STU004",
      name: "Sarah Wilson",
      admissionNo: "ADM2024004",
      class: "Grade 7A",
      contact: "+254745678901",
    },
    {
      id: "STU005",
      name: "David Brown",
      admissionNo: "ADM2024005",
      class: "Grade 6B",
      contact: "+254756789012",
    },
    {
      id: "STU006",
      name: "Grace Lee",
      admissionNo: "ADM2024006",
      class: "Grade 8A",
      contact: "+254767890123",
    },
  ])

  const classes = [
    { value: "all", label: "All Classes" },
    { value: "grade-6a", label: "Grade 6A" },
    { value: "grade-6b", label: "Grade 6B" },
    { value: "grade-7a", label: "Grade 7A" },
    { value: "grade-7b", label: "Grade 7B" },
    { value: "grade-8a", label: "Grade 8A" },
  ]

  const filteredParticipants = currentParticipants.filter((participant) => {
    const matchesSearch =
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass =
      selectedClass === "all" || participant.class.toLowerCase().includes(selectedClass.replace("-", " "))
    return matchesSearch && matchesClass
  })

  const filteredAvailableStudents = availableStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass =
      selectedClass === "all" || student.class.toLowerCase().includes(selectedClass.replace("-", " "))
    return matchesSearch && matchesClass
  })

  const handleAddParticipant = (student) => {
    toast({
      title: "Student Added",
      description: `${student.name} has been added to ${activity?.name}`,
    })
  }

  const handleRemoveParticipant = (participant) => {
    toast({
      title: "Student Removed",
      description: `${participant.name} has been removed from ${activity?.name}`,
    })
  }

  const handleSendNotification = (participant) => {
    toast({
      title: "Notification Sent",
      description: `Notification sent to ${participant.name}'s parent`,
    })
  }

  const handleViewProfile = (student) => {
    toast({
      title: "View Profile",
      description: `Opening profile for ${student.name}`,
    })
  }

  const getPerformanceBadge = (performance) => {
    switch (performance) {
      case "Excellent":
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
      case "Good":
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
      case "Average":
        return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
      default:
        return <Badge variant="outline">N/A</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Manage Participants - {activity?.name}
          </DialogTitle>
          <DialogDescription>Add, remove, and manage students in this activity</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Current Participants</p>
                    <p className="text-2xl font-bold text-blue-600">{currentParticipants.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Active</p>
                    <p className="text-2xl font-bold text-green-600">
                      {currentParticipants.filter((p) => p.status === "Active").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium">Avg Attendance</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(
                      currentParticipants.reduce((sum, p) => sum + p.attendance, 0) / currentParticipants.length,
                    )}
                    %
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium">Capacity</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {currentParticipants.length}/{activity?.maxCapacity || 30}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Participants</TabsTrigger>
              <TabsTrigger value="available">Add Participants</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Participants</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search participants..."
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
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Class</TableHead>
                          <TableHead>Join Date</TableHead>
                          <TableHead>Attendance</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredParticipants.map((participant) => (
                          <TableRow key={participant.id} className="transition-all duration-200 hover:bg-muted/50">
                            <TableCell>
                              <div>
                                <div className="font-medium">{participant.name}</div>
                                <div className="text-sm text-muted-foreground">{participant.admissionNo}</div>
                              </div>
                            </TableCell>
                            <TableCell>{participant.class}</TableCell>
                            <TableCell>{participant.joinDate}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className={participant.attendance >= 80 ? "text-green-600" : "text-red-600"}>
                                  {participant.attendance}%
                                </span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      participant.attendance >= 80 ? "bg-green-600" : "bg-red-600"
                                    }`}
                                    style={{ width: `${participant.attendance}%` }}
                                  ></div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getPerformanceBadge(participant.performance)}</TableCell>
                            <TableCell>
                              <Badge variant={participant.status === "Active" ? "default" : "secondary"}>
                                {participant.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 transition-all duration-300 hover:scale-110"
                                  onClick={() => handleViewProfile(participant)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-blue-600 transition-all duration-300 hover:scale-110"
                                  onClick={() => handleSendNotification(participant)}
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600 transition-all duration-300 hover:scale-110"
                                  onClick={() => handleRemoveParticipant(participant)}
                                >
                                  <UserMinus className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="available" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Available Students</CardTitle>
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
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Class</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAvailableStudents.map((student) => (
                          <TableRow key={student.id} className="transition-all duration-200 hover:bg-muted/50">
                            <TableCell>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.admissionNo}</div>
                              </div>
                            </TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>{student.contact}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 transition-all duration-300 hover:scale-110"
                                  onClick={() => handleViewProfile(student)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-green-600 transition-all duration-300 hover:scale-110"
                                  onClick={() => handleAddParticipant(student)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

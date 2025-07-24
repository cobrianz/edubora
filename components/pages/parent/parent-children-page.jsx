"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, GraduationCap, Calendar, DollarSign, Eye, MessageSquare, FileText, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ParentChildrenPage() {
  const { toast } = useToast()
  const [selectedChild, setSelectedChild] = useState(null)

  const children = [
    {
      id: 1,
      name: "Sarah Mwangi",
      class: "Grade 7A",
      admissionNo: "ADM2024001",
      age: 13,
      photo: "/placeholder.svg?height=100&width=100",
      attendance: 96,
      averageGrade: "A-",
      feeBalance: 12500,
      subjects: [
        { name: "Mathematics", grade: "A-", percentage: 85 },
        { name: "English", grade: "A", percentage: 92 },
        { name: "Science", grade: "B+", percentage: 78 },
        { name: "Kiswahili", grade: "B", percentage: 75 },
      ],
      recentActivities: [
        { type: "grade", message: "Scored A- in Mathematics test", date: "2024-01-10" },
        { type: "attendance", message: "Perfect attendance this week", date: "2024-01-08" },
        { type: "assignment", message: "Submitted Science project", date: "2024-01-05" },
      ],
    },
    {
      id: 2,
      name: "John Mwangi",
      class: "Grade 5B",
      admissionNo: "ADM2024002",
      age: 11,
      photo: "/placeholder.svg?height=100&width=100",
      attendance: 92,
      averageGrade: "B+",
      feeBalance: 12500,
      subjects: [
        { name: "Mathematics", grade: "B+", percentage: 82 },
        { name: "English", grade: "B", percentage: 75 },
        { name: "Science", grade: "A-", percentage: 86 },
        { name: "Kiswahili", grade: "B+", percentage: 80 },
      ],
      recentActivities: [
        { type: "grade", message: "Improved in English composition", date: "2024-01-09" },
        { type: "assignment", message: "Late submission for Math homework", date: "2024-01-07" },
        { type: "achievement", message: "Won Science fair competition", date: "2024-01-03" },
      ],
    },
  ]

  const handleViewChild = (child) => {
    setSelectedChild(child)
    toast({
      title: "Child Selected",
      description: `Viewing details for ${child.name}`,
    })
  }

  const handleMessageTeacher = (child) => {
    toast({
      title: "Message Teacher",
      description: `Opening message for ${child.name}'s class teacher`,
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Children</h1>
          <p className="text-muted-foreground">Monitor your children's academic progress</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-slate-blue/10 border-slate-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Children</CardTitle>
            <Users className="h-4 w-4 text-slate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-blue">2</div>
            <p className="text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-light-green/10 border-light-green/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <GraduationCap className="h-4 w-4 text-light-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-light-green">B+</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Average attendance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fee Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 25,000</div>
            <p className="text-xs text-muted-foreground">Total outstanding</p>
          </CardContent>
        </Card>
      </div>

      {/* Children Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {children.map((child) => (
          <Card key={child.id} className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-slate-blue/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-slate-blue" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{child.name}</CardTitle>
                  <CardDescription>
                    {child.class} • {child.admissionNo}
                  </CardDescription>
                  <Badge variant="outline" className="mt-1">
                    Age {child.age}
                  </Badge>
                </div>
                <Badge variant="outline" className="text-lg font-bold">
                  {child.averageGrade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-light-green/10 rounded-lg">
                  <div className="text-lg font-bold text-light-green">{child.attendance}%</div>
                  <div className="text-xs text-muted-foreground">Attendance</div>
                </div>
                <div className="text-center p-3 bg-slate-blue/10 rounded-lg">
                  <div className="text-lg font-bold text-slate-blue">{child.subjects.length}</div>
                  <div className="text-xs text-muted-foreground">Subjects</div>
                </div>
                <div className="text-center p-3 bg-red-500/10 rounded-lg">
                  <div className="text-lg font-bold text-red-600">{(child.feeBalance / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-muted-foreground">Fee Balance</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <p className="text-sm font-medium mb-2">Recent Activity:</p>
                <div className="space-y-2">
                  {child.recentActivities.slice(0, 2).map((activity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          activity.type === "grade"
                            ? "bg-light-green"
                            : activity.type === "attendance"
                              ? "bg-slate-blue"
                              : activity.type === "achievement"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                        }`}
                      />
                      <span className="flex-1">{activity.message}</span>
                      <span className="text-muted-foreground text-xs">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 transition-all duration-300 hover:scale-105 bg-transparent"
                  onClick={() => handleViewChild(child)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 transition-all duration-300 hover:scale-105 bg-transparent"
                  onClick={() => handleMessageTeacher(child)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message Teacher
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View */}
      {selectedChild && (
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {selectedChild.name} - Detailed View
            </CardTitle>
            <CardDescription>Comprehensive academic overview</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="subjects" className="space-y-4">
              <TabsList>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>

              <TabsContent value="subjects" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {selectedChild.subjects.map((subject, index) => (
                    <Card key={index} className="transition-all duration-300 hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{subject.name}</h4>
                          <Badge variant="outline">{subject.grade}</Badge>
                        </div>
                        <Progress value={subject.percentage} className="h-2 mb-2" />
                        <p className="text-sm text-muted-foreground">{subject.percentage}%</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="attendance">
                <div className="text-center py-8">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Detailed attendance records will be shown here</p>
                </div>
              </TabsContent>

              <TabsContent value="assignments">
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Assignment tracking will be displayed here</p>
                </div>
              </TabsContent>

              <TabsContent value="activities">
                <div className="space-y-3">
                  {selectedChild.recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          activity.type === "grade"
                            ? "bg-light-green/10"
                            : activity.type === "attendance"
                              ? "bg-slate-blue/10"
                              : activity.type === "achievement"
                                ? "bg-yellow-500/10"
                                : "bg-gray-100"
                        }`}
                      >
                        {activity.type === "grade" && <Trophy className="h-4 w-4 text-light-green" />}
                        {activity.type === "attendance" && <Calendar className="h-4 w-4 text-slate-blue" />}
                        {activity.type === "achievement" && <Trophy className="h-4 w-4 text-yellow-600" />}
                        {activity.type === "assignment" && <FileText className="h-4 w-4 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.message}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

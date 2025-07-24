"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ClipboardList, Trophy, Calendar, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import StatsCard from "@/components/ui/stats-card"
import QuickActions from "@/components/dashboard/quick-actions"

export default function StudentDashboard() {
  const stats = [
    {
      title: "My Subjects",
      value: "8",
      change: "0%",
      trend: "neutral",
      icon: BookOpen,
      color: "blue",
    },
    {
      title: "Assignments Due",
      value: "3",
      change: "-25%",
      trend: "down",
      icon: ClipboardList,
      color: "yellow",
    },
    {
      title: "Attendance Rate",
      value: "96%",
      change: "+2%",
      trend: "up",
      icon: Trophy,
      color: "green",
    },
    {
      title: "Today's Classes",
      value: "6",
      change: "0%",
      trend: "neutral",
      icon: Calendar,
      color: "purple",
    },
  ]

  const quickActions = [
    { title: "View Assignments", description: "Check pending homework", href: "/dashboard/student/assignments" },
    { title: "Check Grades", description: "View latest marks", href: "/dashboard/student/grades" },
    { title: "Class Timetable", description: "Today's schedule", href: "/dashboard/student/timetable" },
    { title: "Library Books", description: "Borrowed books", href: "/dashboard/student/library" },
  ]

  const upcomingAssignments = [
    { title: "Mathematics Worksheet", subject: "Mathematics", dueDate: "2024-01-15", priority: "high" },
    { title: "Science Project", subject: "Science", dueDate: "2024-01-18", priority: "medium" },
    { title: "English Essay", subject: "English", dueDate: "2024-01-20", priority: "low" },
  ]

  const recentGrades = [
    { subject: "Mathematics", assessment: "Mid-term Exam", grade: "A-", percentage: 85 },
    { subject: "Science", assessment: "CAT 2", grade: "B+", percentage: 78 },
    { subject: "English", assessment: "Essay", grade: "A", percentage: 92 },
    { subject: "Kiswahili", assessment: "Oral Test", grade: "B", percentage: 75 },
  ]

  const todaySchedule = [
    { time: "8:00 AM", subject: "Mathematics", teacher: "Mr. Kamau", room: "Room 12" },
    { time: "9:30 AM", subject: "English", teacher: "Ms. Wanjiku", room: "Room 8" },
    { time: "11:00 AM", subject: "Science", teacher: "Mr. Ochieng", room: "Lab 1" },
    { time: "2:00 PM", subject: "Kiswahili", teacher: "Ms. Akinyi", room: "Room 5" },
    { time: "3:30 PM", subject: "Social Studies", teacher: "Mr. Mwangi", room: "Room 10" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your academic progress and today's schedule.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <QuickActions actions={quickActions} />
        </div>

        {/* Upcoming Assignments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Upcoming Assignments
              </CardTitle>
              <CardDescription>Assignments due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <AlertCircle
                          className={`h-4 w-4 ${
                            assignment.priority === "high"
                              ? "text-red-600"
                              : assignment.priority === "medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{assignment.title}</p>
                        <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{assignment.dueDate}</p>
                      <Badge
                        variant={
                          assignment.priority === "high"
                            ? "destructive"
                            : assignment.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {assignment.priority} priority
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Grades
            </CardTitle>
            <CardDescription>Your latest assessment results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{grade.subject}</p>
                    <p className="text-xs text-muted-foreground">{grade.assessment}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{grade.grade}</p>
                    <p className="text-xs text-muted-foreground">{grade.percentage}%</p>
                  </div>
                </div>
                <Progress value={grade.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.teacher} • {item.room}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

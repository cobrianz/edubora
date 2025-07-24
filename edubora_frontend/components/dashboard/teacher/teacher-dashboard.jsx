"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ClipboardList, TrendingUp, Eye } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import StatsCard from "@/components/ui/stats-card"
import QuickActions from "@/components/dashboard/quick-actions"
import RecentActivity from "@/components/dashboard/recent-activity"
import AssignmentViewModal from "@/components/modals/assignment-view-modal"
import MessageComposeModal from "@/components/modals/message-compose-modal"
import AnalyticsModal from "@/components/modals/analytics-modal"
import { useToast } from "@/hooks/use-toast"

export default function TeacherDashboard() {
  const { toast } = useToast()
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)

  const stats = [
    {
      title: "My Classes",
      value: "4",
      change: "0%",
      trend: "neutral",
      icon: Users,
      color: "blue",
    },
    {
      title: "Total Students",
      value: "142",
      change: "+3%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      title: "Assignments",
      value: "12",
      change: "+2",
      trend: "up",
      icon: ClipboardList,
      color: "purple",
    },
    {
      title: "Avg. Performance",
      value: "B+",
      change: "+0.2",
      trend: "up",
      icon: TrendingUp,
      color: "yellow",
    },
  ]

  const quickActions = [
    {
      title: "Create Assignment",
      description: "Create new assignment for your class",
      href: "/dashboard/teacher/assignments",
    },
    { title: "Take Attendance", description: "Mark student attendance", href: "/dashboard/teacher/attendance" },
    { title: "Grade Assignments", description: "Review and grade submissions", href: "/dashboard/teacher/grades" },
    { title: "Send Message", description: "Message students or parents", action: () => setShowMessageModal(true) },
  ]

  const recentActivities = [
    { type: "assignment", message: "New assignment submitted by John Doe", time: "2 hours ago" },
    { type: "grade", message: "Graded Mathematics test for Grade 7A", time: "4 hours ago" },
    { type: "message", message: "Message sent to Grade 6B parents", time: "6 hours ago" },
    { type: "attendance", message: "Attendance marked for today's classes", time: "1 day ago" },
  ]

  const upcomingAssignments = [
    {
      id: "ASG001",
      title: "Mathematics Quiz",
      class: "Grade 7A",
      dueDate: "2024-07-20",
      submissions: 25,
      totalStudents: 32,
      status: "Active",
    },
    {
      id: "ASG002",
      title: "Science Project",
      class: "Grade 6B",
      dueDate: "2024-07-22",
      submissions: 18,
      totalStudents: 28,
      status: "Active",
    },
    {
      id: "ASG003",
      title: "English Essay",
      class: "Grade 8A",
      dueDate: "2024-07-25",
      submissions: 30,
      totalStudents: 35,
      status: "Active",
    },
  ]

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment)
    setShowAssignmentModal(true)
  }

  const handleViewAnalytics = () => {
    setShowAnalyticsModal(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your classes and students.</p>
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

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      {/* Additional Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Upcoming Assignments
              </CardTitle>
              <Button variant="outline" size="sm" onClick={handleViewAnalytics}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </div>
            <CardDescription>Assignments due soon</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {assignment.class} • Due: {assignment.dueDate}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress
                      value={(assignment.submissions / assignment.totalStudents) * 100}
                      className="h-2 flex-1"
                    />
                    <span className="text-xs text-muted-foreground">
                      {assignment.submissions}/{assignment.totalStudents}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleViewAssignment(assignment)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Class Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Class Performance
            </CardTitle>
            <CardDescription>Average performance by class</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Grade 7A - Mathematics</p>
                  <p className="text-sm text-muted-foreground">32 students</p>
                </div>
                <div className="text-right">
                  <Badge variant="default">A-</Badge>
                  <p className="text-sm text-muted-foreground">85% avg</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Grade 6B - Mathematics</p>
                  <p className="text-sm text-muted-foreground">28 students</p>
                </div>
                <div className="text-right">
                  <Badge variant="default">B+</Badge>
                  <p className="text-sm text-muted-foreground">78% avg</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Grade 8A - Mathematics</p>
                  <p className="text-sm text-muted-foreground">35 students</p>
                </div>
                <div className="text-right">
                  <Badge variant="default">B</Badge>
                  <p className="text-sm text-muted-foreground">75% avg</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment View Modal */}
      {showAssignmentModal && (
        <AssignmentViewModal
          assignment={selectedAssignment}
          onClose={() => setShowAssignmentModal(false)}
          userRole="teacher"
        />
      )}

      {/* Message Compose Modal */}
      {showMessageModal && <MessageComposeModal onClose={() => setShowMessageModal(false)} />}

      {/* Analytics Modal */}
      {showAnalyticsModal && <AnalyticsModal onClose={() => setShowAnalyticsModal(false)} userRole="teacher" />}
    </div>
  )
}

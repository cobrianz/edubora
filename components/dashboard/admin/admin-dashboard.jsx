"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import {
  Users,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Calendar,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  Settings,
  Plus,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  FileText,
  Sun,
  Moon,
  Monitor,
  MapPin,
} from "lucide-react"
import StatsCard from "@/components/ui/stats-card"
import QuickActions from "@/components/dashboard/quick-actions"
import RecentActivity from "@/components/dashboard/recent-activity"

// Import modals
import QuickAddModal from "@/components/modals/quick-add-modal"
import SettingsModal from "@/components/modals/settings-modal"
import PerformanceAnalyticsModal from "@/components/modals/performance-analytics-modal"
import AttendanceAnalyticsModal from "@/components/modals/attendance-analytics-modal"
import FinancialAnalyticsModal from "@/components/modals/financial-analytics-modal"
import AcademicAnalyticsModal from "@/components/modals/academic-analytics-modal"

export default function AdminDashboard() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showPerformanceAnalytics, setShowPerformanceAnalytics] = useState(false)
  const [showAttendanceAnalytics, setShowAttendanceAnalytics] = useState(false)
  const [showFinancialAnalytics, setShowFinancialAnalytics] = useState(false)
  const [showAcademicAnalytics, setShowAcademicAnalytics] = useState(false)

  // Mock data for dashboard
  const dashboardStats = {
    totalStudents: 1247,
    totalTeachers: 85,
    totalParents: 1180,
    totalStaff: 45,
    monthlyRevenue: 2450000,
    outstandingFees: 180000,
    attendanceRate: 94.5,
    academicPerformance: 78.2,
    activeClasses: 42,
    upcomingEvents: 8,
    pendingApprovals: 12,
    systemAlerts: 3,
  }

  const recentEnrollments = [
    { id: 1, name: "Sarah Wanjiku", class: "Grade 7A", date: "2024-07-16", status: "Active" },
    { id: 2, name: "John Mwangi", class: "Grade 5B", date: "2024-07-15", status: "Pending" },
    { id: 3, name: "Grace Akinyi", class: "Grade 3C", date: "2024-07-14", status: "Active" },
    { id: 4, name: "Peter Kiprotich", class: "Grade 8A", date: "2024-07-13", status: "Active" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Parent-Teacher Conference", date: "2024-07-20", time: "09:00", type: "Meeting" },
    { id: 2, title: "Sports Day", date: "2024-07-25", time: "08:00", type: "Event" },
    { id: 3, title: "Science Fair", date: "2024-07-30", time: "10:00", type: "Academic" },
    { id: 4, title: "Staff Meeting", date: "2024-08-01", time: "14:00", type: "Meeting" },
  ]

  const systemAlerts = [
    { id: 1, message: "Server backup completed successfully", type: "success", time: "2 hours ago" },
    { id: 2, message: "3 fee payment reminders sent", type: "info", time: "4 hours ago" },
    { id: 3, message: "Low storage space warning", type: "warning", time: "1 day ago" },
  ]

  // ----------------------------------------------------------------------------
  // Mock financial analytics data (used by <FinancialAnalyticsModal />)
  const financialAnalyticsData = {
    totalRevenue: 12300000, // KSh
    monthlyGrowth: 8.1, // %
    collectionRate: 92.5, // %
    outstandingFees: 1800000, // KSh
    feeCollection: [
      { month: "Jan", collected: 950000, target: 1000000, outstanding: 50000 },
      { month: "Feb", collected: 1100000, target: 1200000, outstanding: 100000 },
      { month: "Mar", collected: 1250000, target: 1300000, outstanding: 50000 },
      { month: "Apr", collected: 1350000, target: 1400000, outstanding: 50000 },
      { month: "May", collected: 1420000, target: 1500000, outstanding: 80000 },
      { month: "Jun", collected: 1480000, target: 1600000, outstanding: 120000 },
    ],
    breakdown: [
      { category: "Tuition", amount: 8200000, color: "#3b82f6", percentage: 66.7 },
      { category: "Transport", amount: 1600000, color: "#10b981", percentage: 13.0 },
      { category: "Meals", amount: 900000, color: "#f59e0b", percentage: 7.3 },
      { category: "Uniforms", amount: 650000, color: "#ef4444", percentage: 5.3 },
      { category: "Others", amount: 750000, color: "#8b5cf6", percentage: 6.1 },
    ],
    expenses: [
      { category: "Salaries", amount: 4200000, percentage: 35.0 },
      { category: "Utilities", amount: 1800000, percentage: 15.0 },
      { category: "Repairs", amount: 1200000, percentage: 10.0 },
      { category: "Supplies", amount: 900000, percentage: 7.5 },
      { category: "Events", amount: 750000, percentage: 6.3 },
      { category: "Other", amount: 3100000, percentage: 26.2 },
    ],
  }
  // ----------------------------------------------------------------------------

  const performanceMetrics = [
    { subject: "Mathematics", average: 82, trend: "up" },
    { subject: "English", average: 78, trend: "up" },
    { subject: "Science", average: 75, trend: "down" },
    { subject: "Social Studies", average: 80, trend: "up" },
    { subject: "Kiswahili", average: 77, trend: "stable" },
  ]

  const quickActionItems = [
    {
      title: "Add Student",
      description: "Register a new student",
      icon: Users,
      action: () => setShowQuickAdd(true),
      color: "bg-blue-500",
    },
    {
      title: "Add Teacher",
      description: "Register a new teacher",
      icon: GraduationCap,
      action: () => setShowQuickAdd(true),
      color: "bg-green-500",
    },
    {
      title: "Send Announcement",
      description: "Broadcast message to all",
      icon: MessageSquare,
      action: () => setShowQuickAdd(true),
      color: "bg-purple-500",
    },
    {
      title: "View Analytics",
      description: "Check performance metrics",
      icon: BarChart3,
      action: () => setShowPerformanceAnalytics(true),
      color: "bg-orange-500",
    },
    {
      title: "System Settings",
      description: "Configure system settings",
      icon: Settings,
      action: () => setShowSettings(true),
      color: "bg-gray-500",
    },
    {
      title: "Generate Report",
      description: "Create custom reports",
      icon: FileText,
      action: () => router.push("/dashboard/admin/reports"),
      color: "bg-red-500",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      user: "Sarah Wanjiku",
      action: "enrolled in Grade 7A",
      time: "2 hours ago",
      type: "enrollment",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      user: "John Mwangi",
      action: "paid school fees",
      time: "4 hours ago",
      type: "payment",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      user: "Grace Akinyi",
      action: "submitted assignment",
      time: "6 hours ago",
      type: "academic",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      user: "Peter Kiprotich",
      action: "marked present",
      time: "1 day ago",
      type: "attendance",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      user: "Mary Wanjiru",
      action: "updated profile",
      time: "2 days ago",
      type: "profile",
      avatar: "/placeholder.svg",
    },
  ]

  const handleThemeToggle = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const handleViewAllStudents = () => {
    router.push("/dashboard/admin/students")
  }

  const handleViewAllEvents = () => {
    router.push("/dashboard/admin/events")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Welcome back! Here's what's happening at your school.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleThemeToggle} size="sm">
            {getThemeIcon()}
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button onClick={() => setShowQuickAdd(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
          <Button variant="outline" onClick={() => setShowSettings(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={dashboardStats.totalStudents.toLocaleString()}
          description="+12% from last month"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Total Teachers"
          value={dashboardStats.totalTeachers.toString()}
          description="+2 new this month"
          icon={GraduationCap}
          trend="up"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`KSh ${(dashboardStats.monthlyRevenue / 1000000).toFixed(1)}M`}
          description="+8% from last month"
          icon={DollarSign}
          trend="up"
        />
        <StatsCard
          title="Attendance Rate"
          value={`${dashboardStats.attendanceRate}%`}
          description="+2.1% from last week"
          icon={UserCheck}
          trend="up"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <QuickActions items={quickActionItems} />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest activities across the system</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity activities={recentActivities} />
          </CardContent>
        </Card>
      </div>

      {/* Analytics and Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Academic Performance
            </CardTitle>
            <CardDescription>Subject-wise performance overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{metric.average}%</span>
                    {metric.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                    {metric.trend === "down" && <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />}
                    {metric.trend === "stable" && <div className="h-3 w-3 rounded-full bg-gray-400" />}
                  </div>
                </div>
                <Progress value={metric.average} className="h-2" />
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              onClick={() => setShowAcademicAnalytics(true)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>System alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Classes</span>
                  <span className="text-sm font-medium">{dashboardStats.activeClasses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Upcoming Events</span>
                  <span className="text-sm font-medium">{dashboardStats.upcomingEvents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pending Approvals</span>
                  <span className="text-sm font-medium">{dashboardStats.pendingApprovals}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">System Alerts</span>
                  <Badge variant={dashboardStats.systemAlerts > 0 ? "destructive" : "default"}>
                    {dashboardStats.systemAlerts}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Recent Alerts</h4>
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
                  {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                  {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                  {alert.type === "info" && <Bell className="h-4 w-4 text-blue-500 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events and Recent Enrollments */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Scheduled events and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={handleViewAllEvents}>
              <Calendar className="mr-2 h-4 w-4" />
              View All Events
            </Button>
          </CardContent>
        </Card>

        {/* Recent Enrollments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Enrollments
            </CardTitle>
            <CardDescription>Latest student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEnrollments.map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {enrollment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{enrollment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {enrollment.class} • {enrollment.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant={enrollment.status === "Active" ? "default" : "secondary"}>{enrollment.status}</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={handleViewAllStudents}>
              <Users className="mr-2 h-4 w-4" />
              View All Students
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Overview
          </CardTitle>
          <CardDescription>Revenue and fee collection summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="text-2xl font-bold">KSh {(dashboardStats.monthlyRevenue / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-green-600">+8% from last month</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Outstanding Fees</p>
              <p className="text-2xl font-bold">KSh {(dashboardStats.outstandingFees / 1000).toFixed(0)}K</p>
              <p className="text-xs text-red-600">-15% from last month</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Collection Rate</p>
              <p className="text-2xl font-bold">92.5%</p>
              <p className="text-xs text-green-600">+3% from last month</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Fee Defaulters</p>
              <p className="text-2xl font-bold">23</p>
              <p className="text-xs text-yellow-600">-5 from last month</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowFinancialAnalytics(true)}>
              <PieChart className="mr-2 h-4 w-4" />
              Financial Analytics
            </Button>
            <Button variant="outline" onClick={() => setShowAttendanceAnalytics(true)}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Attendance Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showQuickAdd && (
        <QuickAddModal
          isOpen={showQuickAdd}
          onClose={() => setShowQuickAdd(false)}
          onSave={(data) => {
            console.log("Quick add data:", data)
            // Handle the saved data here
          }}
        />
      )}

      {showSettings && (
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSave={(data) => {
            console.log("Settings data:", data)
            // Handle the saved settings here
          }}
        />
      )}

      {showPerformanceAnalytics && <PerformanceAnalyticsModal onClose={() => setShowPerformanceAnalytics(false)} />}

      {showAttendanceAnalytics && <AttendanceAnalyticsModal onClose={() => setShowAttendanceAnalytics(false)} />}

      {showFinancialAnalytics && (
        <FinancialAnalyticsModal onClose={() => setShowFinancialAnalytics(false)} data={financialAnalyticsData} />
      )}

      {showAcademicAnalytics && <AcademicAnalyticsModal onClose={() => setShowAcademicAnalytics(false)} />}
    </div>
  )
}

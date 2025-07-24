"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, DollarSign, UserCheck, Award, Download, RefreshCw } from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
} from "recharts"
import { useToast } from "@/hooks/use-toast"
import PerformanceAnalyticsModal from "@/components/modals/performance-analytics-modal"
import AttendanceAnalyticsModal from "@/components/modals/attendance-analytics-modal"

export default function AnalyticsPage() {
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("month")
  const [showPerformanceModal, setShowPerformanceModal] = useState(false)
  const [showAttendanceModal, setShowAttendanceModal] = useState(false)
  const [showTrendsModal, setShowTrendsModal] = useState(false)

  // Sample data
  const overviewStats = [
    {
      title: "Total Students",
      value: "1,245",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Average Performance",
      value: "84.2%",
      change: "+2.3%",
      trend: "up",
      icon: Award,
      color: "text-green-600",
    },
    {
      title: "Attendance Rate",
      value: "96.2%",
      change: "+0.8%",
      trend: "up",
      icon: UserCheck,
      color: "text-purple-600",
    },
    {
      title: "Revenue",
      value: "KSh 12.3M",
      change: "+8.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-orange-600",
    },
  ]

  const performanceData = [
    { month: "Jan", performance: 78.5, attendance: 94.2, revenue: 10.2 },
    { month: "Feb", performance: 79.2, attendance: 95.1, revenue: 10.8 },
    { month: "Mar", performance: 81.1, attendance: 96.3, revenue: 11.2 },
    { month: "Apr", performance: 82.3, attendance: 95.8, revenue: 11.8 },
    { month: "May", performance: 83.7, attendance: 96.7, revenue: 12.1 },
    { month: "Jun", performance: 84.2, attendance: 96.2, revenue: 12.3 },
  ]

  const subjectPerformance = [
    { subject: "Math", score: 82.5, students: 1245 },
    { subject: "English", score: 85.2, students: 1245 },
    { subject: "Kiswahili", score: 79.8, students: 1245 },
    { subject: "Science", score: 81.3, students: 1245 },
    { subject: "Social", score: 83.1, students: 1245 },
    { subject: "Arts", score: 87.6, students: 1245 },
  ]

  const gradeDistribution = [
    { grade: "A", count: 312, color: "#10b981" },
    { grade: "B", count: 456, color: "#3b82f6" },
    { grade: "C", count: 298, color: "#f59e0b" },
    { grade: "D", count: 134, color: "#ef4444" },
    { grade: "E", count: 45, color: "#6b7280" },
  ]

  const classPerformance = [
    { class: "Grade 1", performance: 88.5, attendance: 98.5, students: 120 },
    { class: "Grade 2", performance: 86.2, attendance: 97.6, students: 125 },
    { class: "Grade 3", performance: 84.8, attendance: 96.9, students: 130 },
    { class: "Grade 4", performance: 83.1, attendance: 96.3, students: 135 },
    { class: "Grade 5", performance: 82.3, attendance: 95.7, students: 140 },
    { class: "Grade 6", performance: 81.7, attendance: 95.2, students: 145 },
    { class: "Grade 7", performance: 80.9, attendance: 94.7, students: 150 },
    { class: "Grade 8", performance: 79.5, attendance: 94.2, students: 155 },
    { class: "Grade 9", performance: 78.2, attendance: 93.8, students: 145 },
  ]

  const analyticsCards = [
    {
      title: "Performance Analytics",
      description: "Detailed academic performance analysis",
      icon: BarChart3,
      color: "bg-blue-500",
      action: () => setShowPerformanceModal(true),
      metrics: [
        { label: "Overall Average", value: "84.2%" },
        { label: "Top Performers", value: "312 students" },
        { label: "Improvement Rate", value: "+2.3%" },
      ],
    },
    {
      title: "Attendance Analytics",
      description: "Comprehensive attendance tracking and insights",
      icon: UserCheck,
      color: "bg-green-500",
      action: () => setShowAttendanceModal(true),
      metrics: [
        { label: "Attendance Rate", value: "96.2%" },
        { label: "Perfect Attendance", value: "456 students" },
        { label: "Chronic Absentees", value: "30 students" },
      ],
    },
    {
      title: "Trend Analysis",
      description: "Long-term trends and predictive insights",
      icon: TrendingUp,
      color: "bg-purple-500",
      action: () => setShowTrendsModal(true),
      metrics: [
        { label: "Growth Rate", value: "+12.5%" },
        { label: "Retention Rate", value: "98.7%" },
        { label: "Satisfaction", value: "4.8/5" },
      ],
    },
  ]

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Analytics data has been updated with the latest information",
    })
  }

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Comprehensive analytics report is being generated...",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights into school performance and trends</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="term">This Term</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="flex items-center gap-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <Badge variant={stat.trend === "up" ? "default" : "destructive"}>{stat.change}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {analyticsCards.map((card, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={card.action}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${card.color} text-white`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {card.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <span className="text-sm font-medium">{metric.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overall Trends</CardTitle>
                <CardDescription>Key metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="performance"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="attendance"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Current grade breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {gradeDistribution.map((grade, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: grade.color }} />
                      <span className="text-sm">
                        {grade.grade}: {grade.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Average scores by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[70, 90]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Performance</CardTitle>
                <CardDescription>Performance by grade level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classPerformance.slice(0, 6).map((classData, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{classData.class}</p>
                          <p className="text-sm text-muted-foreground">{classData.students} students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{classData.performance}%</p>
                        <p className="text-sm text-muted-foreground">{classData.attendance}% attendance</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
              <CardDescription>Monthly attendance patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsLineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[90, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue collection</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showPerformanceModal && <PerformanceAnalyticsModal onClose={() => setShowPerformanceModal(false)} />}
      {showAttendanceModal && <AttendanceAnalyticsModal onClose={() => setShowAttendanceModal(false)} />}
    </div>
  )
}

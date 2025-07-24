"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Award,
  MessageSquare,
  Eye,
  Download,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { useToast } from "@/hooks/use-toast"
import AnalyticsModal from "@/components/modals/analytics-modal"
import StudentProgressModal from "@/components/modals/student-progress-modal"
import MessageComposeModal from "@/components/modals/message-compose-modal"

export default function ParentDashboard() {
  const { toast } = useToast()
  const [selectedChild, setSelectedChild] = useState(null)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("term")

  // Sample children data with comprehensive analytics
  const children = [
    {
      id: 1,
      name: "Sarah Mwangi",
      class: "Grade 7A",
      admissionNo: "ADM2024001",
      age: 13,
      photo: "/placeholder.svg?height=100&width=100",
      overallGrade: "A-",
      gpa: 3.7,
      attendance: 96,
      rank: 3,
      totalStudents: 28,
      feeBalance: 12500,
      subjects: [
        { name: "Mathematics", grade: "A-", percentage: 88, trend: "up", improvement: 5 },
        { name: "English", grade: "A", percentage: 92, trend: "up", improvement: 3 },
        { name: "Science", grade: "B+", percentage: 85, trend: "stable", improvement: 0 },
        { name: "Social Studies", grade: "B+", percentage: 82, trend: "up", improvement: 4 },
        { name: "Kiswahili", grade: "B", percentage: 78, trend: "down", improvement: -2 },
      ],
      recentActivities: [
        { type: "grade", message: "Scored A- in Mathematics test", date: "2024-12-15", priority: "high" },
        { type: "attendance", message: "Perfect attendance this week", date: "2024-12-12", priority: "medium" },
        { type: "assignment", message: "Submitted Science project early", date: "2024-12-10", priority: "low" },
        { type: "achievement", message: "Won English essay competition", date: "2024-12-08", priority: "high" },
      ],
      assignments: {
        total: 45,
        completed: 42,
        pending: 3,
        overdue: 0,
        averageScore: 88,
      },
      competencies: [
        { name: "Critical Thinking", score: 85, target: 90 },
        { name: "Communication", score: 92, target: 95 },
        { name: "Problem Solving", score: 88, target: 90 },
        { name: "Creativity", score: 78, target: 85 },
        { name: "Digital Literacy", score: 90, target: 92 },
        { name: "Citizenship", score: 85, target: 88 },
      ],
    },
    {
      id: 2,
      name: "John Mwangi",
      class: "Grade 5B",
      admissionNo: "ADM2024002",
      age: 11,
      photo: "/placeholder.svg?height=100&width=100",
      overallGrade: "B+",
      gpa: 3.2,
      attendance: 92,
      rank: 8,
      totalStudents: 30,
      feeBalance: 12500,
      subjects: [
        { name: "Mathematics", grade: "B+", percentage: 82, trend: "up", improvement: 6 },
        { name: "English", grade: "B", percentage: 75, trend: "up", improvement: 4 },
        { name: "Science", grade: "A-", percentage: 86, trend: "up", improvement: 8 },
        { name: "Social Studies", grade: "B", percentage: 78, trend: "stable", improvement: 1 },
        { name: "Kiswahili", grade: "B+", percentage: 80, trend: "up", improvement: 5 },
      ],
      recentActivities: [
        { type: "grade", message: "Improved in Mathematics", date: "2024-12-14", priority: "medium" },
        { type: "assignment", message: "Late submission for English essay", date: "2024-12-11", priority: "high" },
        { type: "achievement", message: "Science fair participation", date: "2024-12-09", priority: "medium" },
        { type: "attendance", message: "Missed 2 days due to illness", date: "2024-12-05", priority: "low" },
      ],
      assignments: {
        total: 38,
        completed: 35,
        pending: 2,
        overdue: 1,
        averageScore: 79,
      },
      competencies: [
        { name: "Critical Thinking", score: 78, target: 85 },
        { name: "Communication", score: 75, target: 80 },
        { name: "Problem Solving", score: 82, target: 85 },
        { name: "Creativity", score: 88, target: 90 },
        { name: "Digital Literacy", score: 80, target: 85 },
        { name: "Citizenship", score: 85, target: 88 },
      ],
    },
  ]

  // Analytics data
  const performanceData = [
    { month: "Sep", sarah: 82, john: 76, average: 79 },
    { month: "Oct", sarah: 85, john: 78, average: 81.5 },
    { month: "Nov", sarah: 88, john: 81, average: 84.5 },
    { month: "Dec", sarah: 90, john: 83, average: 86.5 },
  ]

  const attendanceData = [
    { month: "Sep", sarah: 95, john: 90, target: 95 },
    { month: "Oct", sarah: 96, john: 92, target: 95 },
    { month: "Nov", sarah: 97, john: 91, target: 95 },
    { month: "Dec", sarah: 96, john: 94, target: 95 },
  ]

  const subjectComparisonData = [
    { subject: "Math", sarah: 88, john: 82 },
    { subject: "English", sarah: 92, john: 75 },
    { subject: "Science", sarah: 85, john: 86 },
    { subject: "Social", sarah: 82, john: 78 },
    { subject: "Kiswahili", sarah: 78, john: 80 },
  ]

  const feeData = [
    { category: "Tuition", amount: 15000, paid: 15000, status: "Paid" },
    { category: "Transport", amount: 5000, paid: 5000, status: "Paid" },
    { category: "Meals", amount: 3000, paid: 1500, status: "Partial" },
    { category: "Activities", amount: 2000, paid: 0, status: "Pending" },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

  const handleViewChild = (child) => {
    setSelectedChild(child)
    setShowProgress(true)
  }

  const handleViewAnalytics = () => {
    setShowAnalytics(true)
  }

  const handleSendMessage = () => {
    setShowMessage(true)
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Academic report has been downloaded successfully",
    })
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      default:
        return "text-green-600"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Parent Dashboard</h1>
          <p className="text-muted-foreground">Monitor your children's academic progress and school activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleViewAnalytics}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="outline" onClick={handleSendMessage}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Teachers
          </Button>
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Children</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{children.length}</div>
            <p className="text-xs text-muted-foreground">Active students</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <GraduationCap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {(children.reduce((sum, child) => sum + child.gpa, 0) / children.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Overall GPA</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(children.reduce((sum, child) => sum + child.attendance, 0) / children.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Average attendance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fee Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              KSh {(children.reduce((sum, child) => sum + child.feeBalance, 0) / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">Total outstanding</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>Monthly academic performance comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sarah" stroke="#3b82f6" strokeWidth={2} name="Sarah" />
                <Line type="monotone" dataKey="john" stroke="#10b981" strokeWidth={2} name="John" />
                <Line type="monotone" dataKey="average" stroke="#f59e0b" strokeWidth={2} name="Average" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Attendance Tracking
            </CardTitle>
            <CardDescription>Monthly attendance vs school target</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sarah"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Sarah"
                />
                <Area
                  type="monotone"
                  dataKey="john"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="John"
                />
                <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Subject Performance Comparison</CardTitle>
            <CardDescription>Performance across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sarah" fill="#3b82f6" name="Sarah" />
                <Bar dataKey="john" fill="#10b981" name="John" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Fee Payment Status</CardTitle>
            <CardDescription>Current fee payment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={feeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ category, amount }) => `${category}: ${amount}`}
                >
                  {feeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Children Overview */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            {children.map((child) => (
              <Card key={child.id} className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={child.photo || "/placeholder.svg"} alt={child.name} />
                      <AvatarFallback>
                        <Users className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{child.name}</CardTitle>
                      <CardDescription>
                        {child.class} • {child.admissionNo}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-lg font-bold">
                          {child.overallGrade}
                        </Badge>
                        <Badge variant="secondary">Rank #{child.rank}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{child.gpa}</div>
                      <div className="text-xs text-muted-foreground">GPA</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{child.attendance}%</div>
                      <div className="text-xs text-muted-foreground">Attendance</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{child.subjects.length}</div>
                      <div className="text-xs text-muted-foreground">Subjects</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">
                        {Math.round((child.assignments.completed / child.assignments.total) * 100)}%
                      </div>
                      <div className="text-xs text-muted-foreground">Assignments</div>
                    </div>
                  </div>

                  {/* Subject Performance */}
                  <div>
                    <h4 className="font-medium mb-3">Subject Performance</h4>
                    <div className="space-y-2">
                      {child.subjects.slice(0, 3).map((subject, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{subject.name}</span>
                            {getTrendIcon(subject.trend)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{subject.grade}</Badge>
                            <span className="text-sm text-muted-foreground">{subject.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div>
                    <h4 className="font-medium mb-3">Recent Activities</h4>
                    <div className="space-y-2">
                      {child.recentActivities.slice(0, 2).map((activity, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <div
                            className={`h-2 w-2 rounded-full mt-2 ${
                              activity.type === "grade"
                                ? "bg-green-500"
                                : activity.type === "attendance"
                                  ? "bg-blue-500"
                                  : activity.type === "achievement"
                                    ? "bg-yellow-500"
                                    : "bg-gray-400"
                            }`}
                          />
                          <div className="flex-1">
                            <span className={getPriorityColor(activity.priority)}>{activity.message}</span>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleViewChild(child)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={handleSendMessage}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message Teacher
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            {children.map((child) => (
              <Card key={child.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {child.name} - Academic Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="font-medium">Subject Grades</h4>
                      {child.subjects.map((subject, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{subject.name}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{subject.grade}</Badge>
                              {getTrendIcon(subject.trend)}
                            </div>
                          </div>
                          <Progress value={subject.percentage} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{subject.percentage}%</span>
                            <span
                              className={
                                subject.improvement > 0
                                  ? "text-green-600"
                                  : subject.improvement < 0
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }
                            >
                              {subject.improvement > 0 ? "+" : ""}
                              {subject.improvement}% from last term
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">CBC Competencies</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={child.competencies}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar
                            name="Score"
                            dataKey="score"
                            stroke="#3b82f6"
                            fill="#3b82f6"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                          <Radar
                            name="Target"
                            dataKey="target"
                            stroke="#10b981"
                            fill="transparent"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities">
          <div className="space-y-6">
            {children.map((child) => (
              <Card key={child.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {child.name} - Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {child.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            activity.type === "grade"
                              ? "bg-green-100"
                              : activity.type === "attendance"
                                ? "bg-blue-100"
                                : activity.type === "achievement"
                                  ? "bg-yellow-100"
                                  : "bg-gray-100"
                          }`}
                        >
                          {activity.type === "grade" && <Award className="h-5 w-5 text-green-600" />}
                          {activity.type === "attendance" && <Calendar className="h-5 w-5 text-blue-600" />}
                          {activity.type === "achievement" && <Star className="h-5 w-5 text-yellow-600" />}
                          {activity.type === "assignment" && <BookOpen className="h-5 w-5 text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.message}</p>
                          <p className="text-sm text-muted-foreground">{activity.date}</p>
                          <Badge
                            variant={
                              activity.priority === "high"
                                ? "destructive"
                                : activity.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="mt-2"
                          >
                            {activity.priority} priority
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fees">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fee Payment Overview</CardTitle>
                <CardDescription>Current term fee structure and payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feeData.map((fee, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            fee.status === "Paid"
                              ? "bg-green-100"
                              : fee.status === "Partial"
                                ? "bg-yellow-100"
                                : "bg-red-100"
                          }`}
                        >
                          {fee.status === "Paid" && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {fee.status === "Partial" && <Clock className="h-5 w-5 text-yellow-600" />}
                          {fee.status === "Pending" && <AlertCircle className="h-5 w-5 text-red-600" />}
                        </div>
                        <div>
                          <p className="font-medium">{fee.category}</p>
                          <p className="text-sm text-muted-foreground">
                            KSh {fee.paid.toLocaleString()} of KSh {fee.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            fee.status === "Paid" ? "default" : fee.status === "Partial" ? "secondary" : "destructive"
                          }
                        >
                          {fee.status}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          {fee.status !== "Paid" && `KSh ${(fee.amount - fee.paid).toLocaleString()} remaining`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-900">Total Outstanding</p>
                      <p className="text-2xl font-bold text-blue-700">
                        KSh {feeData.reduce((sum, fee) => sum + (fee.amount - fee.paid), 0).toLocaleString()}
                      </p>
                    </div>
                    <Button>Make Payment</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showAnalytics && <AnalyticsModal onClose={() => setShowAnalytics(false)} userRole="parent" data={children} />}

      {showProgress && selectedChild && (
        <StudentProgressModal student={selectedChild} onClose={() => setShowProgress(false)} />
      )}

      {showMessage && (
        <MessageComposeModal
          onClose={() => setShowMessage(false)}
          recipients={children.map((child) => `${child.name}'s Teachers`)}
        />
      )}
    </div>
  )
}

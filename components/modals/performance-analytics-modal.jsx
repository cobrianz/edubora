"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Award, Target, BarChart3, Download } from "lucide-react"
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

export default function PerformanceAnalyticsModal({ onClose }) {
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("term")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")

  const performanceData = [
    { month: "Jan", average: 78.5, improvement: 2.3, students: 1180 },
    { month: "Feb", average: 79.2, improvement: 0.7, students: 1195 },
    { month: "Mar", average: 81.1, improvement: 1.9, students: 1210 },
    { month: "Apr", average: 82.3, improvement: 1.2, students: 1225 },
    { month: "May", average: 83.7, improvement: 1.4, students: 1235 },
    { month: "Jun", average: 84.2, improvement: 0.5, students: 1245 },
  ]

  const subjectPerformance = [
    { subject: "Mathematics", average: 82.5, students: 1245, trend: "up" },
    { subject: "English", average: 85.2, students: 1245, trend: "up" },
    { subject: "Kiswahili", average: 79.8, students: 1245, trend: "down" },
    { subject: "Science", average: 81.3, students: 1245, trend: "up" },
    { subject: "Social Studies", average: 83.1, students: 1245, trend: "up" },
    { subject: "Creative Arts", average: 87.6, students: 1245, trend: "up" },
  ]

  const gradeDistribution = [
    { grade: "A (80-100%)", count: 312, percentage: 25.1, color: "#10b981" },
    { grade: "B (70-79%)", count: 456, percentage: 36.6, color: "#3b82f6" },
    { grade: "C (60-69%)", count: 298, percentage: 23.9, color: "#f59e0b" },
    { grade: "D (50-59%)", count: 134, percentage: 10.8, color: "#ef4444" },
    { grade: "E (0-49%)", count: 45, percentage: 3.6, color: "#6b7280" },
  ]

  const classPerformance = [
    { class: "Grade 1", average: 88.5, students: 120, rank: 1 },
    { class: "Grade 2", average: 86.2, students: 125, rank: 2 },
    { class: "Grade 3", average: 84.8, students: 130, rank: 3 },
    { class: "Grade 4", average: 83.1, students: 135, rank: 4 },
    { class: "Grade 5", average: 82.3, students: 140, rank: 5 },
    { class: "Grade 6", average: 81.7, students: 145, rank: 6 },
    { class: "Grade 7", average: 80.9, students: 150, rank: 7 },
    { class: "Grade 8", average: 79.5, students: 155, rank: 8 },
    { class: "Grade 9", average: 78.2, students: 145, rank: 9 },
  ]

  const topPerformers = [
    { name: "Grace Akinyi", class: "Grade 8A", average: 98.5, improvement: "+2.3%" },
    { name: "David Mwangi", class: "Grade 7B", average: 96.8, improvement: "+1.8%" },
    { name: "Faith Wanjiku", class: "Grade 6A", average: 95.2, improvement: "+3.1%" },
    { name: "Samuel Ochieng", class: "Grade 8B", average: 94.7, improvement: "+0.9%" },
    { name: "Mary Njeri", class: "Grade 7A", average: 93.9, improvement: "+2.7%" },
  ]

  const performanceMetrics = [
    {
      title: "Overall Average",
      value: "84.2%",
      change: "+1.8%",
      trend: "up",
      description: "School-wide performance",
    },
    {
      title: "Pass Rate",
      value: "96.4%",
      change: "+2.1%",
      trend: "up",
      description: "Students scoring 50% and above",
    },
    {
      title: "Excellence Rate",
      value: "61.7%",
      change: "+4.3%",
      trend: "up",
      description: "Students scoring 70% and above",
    },
    {
      title: "Improvement Rate",
      value: "78.9%",
      change: "+5.2%",
      trend: "up",
      description: "Students showing improvement",
    },
  ]

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Performance analytics report is being generated...",
    })
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Analytics
              </DialogTitle>
              <DialogDescription>Comprehensive academic performance analysis</DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="term">This Term</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
              {performanceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.description}</p>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">{metric.change}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Performance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>Average performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 90]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="average" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Grade Distribution */}
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
                        outerRadius={120}
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
                  <div className="space-y-2 mt-4">
                    {gradeDistribution.map((grade, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: grade.color }} />
                          <span className="text-sm">{grade.grade}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{grade.count}</span>
                          <span className="text-xs text-muted-foreground ml-2">({grade.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Performers
                </CardTitle>
                <CardDescription>Highest achieving students this term</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.class}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{student.average}%</p>
                        <p className="text-sm text-green-600">{student.improvement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance Analysis</CardTitle>
                <CardDescription>Performance breakdown by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{subject.subject}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={subject.trend === "up" ? "default" : "destructive"}>
                              {subject.trend === "up" ? (
                                <TrendingUp className="h-3 w-3 mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 mr-1" />
                              )}
                              {subject.average}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={subject.average} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">{subject.students} students enrolled</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={100} />
                    <YAxis domain={[70, 90]} />
                    <Tooltip />
                    <Bar dataKey="average" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Class Performance Ranking</CardTitle>
                <CardDescription>Performance comparison across all classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {classPerformance.map((classData, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                            classData.rank <= 3 ? "bg-yellow-100 text-yellow-800" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {classData.rank}
                        </div>
                        <div>
                          <p className="font-medium">{classData.class}</p>
                          <p className="text-sm text-muted-foreground">{classData.students} students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{classData.average}%</p>
                        <Progress value={classData.average} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Detailed trend analysis over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsLineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="improvement"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                      <h4 className="font-medium text-green-800 dark:text-green-200">Strong Performance</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Creative Arts shows the highest average at 87.6%, indicating strong artistic talent.
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200">Improvement Trend</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Overall performance has improved by 5.7% compared to last term.
                      </p>
                    </div>
                    <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Area for Focus</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Kiswahili performance needs attention with a slight decline this term.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                      <div>
                        <p className="text-sm font-medium">Enhance Kiswahili Support</p>
                        <p className="text-xs text-muted-foreground">
                          Consider additional tutoring sessions for struggling students
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                      <div>
                        <p className="text-sm font-medium">Leverage Creative Arts Success</p>
                        <p className="text-xs text-muted-foreground">
                          Use successful teaching methods from Creative Arts in other subjects
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mt-2" />
                      <div>
                        <p className="text-sm font-medium">Focus on Lower Grades</p>
                        <p className="text-xs text-muted-foreground">
                          Grades 8-9 need additional support to improve performance
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, BookOpen, Users, Target, Award, BarChart3, Settings, Edit } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function SubjectPreviewModal({ subject, onClose, onEdit, onConfigure }) {
  const subjectData = subject || {
    id: 1,
    name: "Mathematics",
    code: "MATH7",
    grade: "Grade 7",
    teacher: "Ms. Johnson",
    students: 28,
    description: "Comprehensive mathematics curriculum covering algebra, geometry, and statistics",
    performance: {
      average: 85,
      highest: 98,
      lowest: 62,
      passRate: 92,
    },
    topics: [
      { name: "Algebra", progress: 85, completed: true },
      { name: "Geometry", progress: 70, completed: false },
      { name: "Statistics", progress: 45, completed: false },
      { name: "Probability", progress: 0, completed: false },
    ],
    assessments: [
      { name: "Mid-term Exam", date: "2024-11-15", average: 82, submissions: 28 },
      { name: "Assignment 1", date: "2024-11-20", average: 88, submissions: 26 },
      { name: "Quiz 1", date: "2024-11-25", average: 90, submissions: 28 },
    ],
    competencies: [
      { name: "Problem Solving", score: 85 },
      { name: "Mathematical Reasoning", score: 78 },
      { name: "Communication", score: 82 },
      { name: "Application", score: 88 },
    ],
  }

  const performanceData = [
    { month: "Sep", average: 78, target: 80 },
    { month: "Oct", average: 82, target: 80 },
    { month: "Nov", average: 85, target: 80 },
    { month: "Dec", average: 87, target: 80 },
  ]

  const gradeDistribution = [
    { grade: "A", count: 8, percentage: 29 },
    { grade: "B", count: 12, percentage: 43 },
    { grade: "C", count: 6, percentage: 21 },
    { grade: "D", count: 2, percentage: 7 },
  ]

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">{subjectData.name}</CardTitle>
              <CardDescription>
                {subjectData.code} • {subjectData.grade} • {subjectData.teacher}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onConfigure && onConfigure(subjectData)}>
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </Button>
            <Button variant="outline" onClick={() => onEdit && onEdit(subjectData)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Students</p>
                    <p className="text-2xl font-bold text-blue-700">{subjectData.students}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Average Score</p>
                    <p className="text-2xl font-bold text-green-700">{subjectData.performance.average}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Pass Rate</p>
                    <p className="text-2xl font-bold text-purple-700">{subjectData.performance.passRate}%</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Topics Covered</p>
                    <p className="text-2xl font-bold text-orange-700">
                      {subjectData.topics.filter((t) => t.completed).length}/{subjectData.topics.length}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="competencies">Competencies</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{subjectData.description}</p>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} name="Average" />
                        <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} name="Target" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={gradeDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          dataKey="count"
                          label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                        >
                          {gradeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Detailed performance metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3 mb-6">
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{subjectData.performance.highest}%</p>
                      <p className="text-sm text-muted-foreground">Highest Score</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{subjectData.performance.average}%</p>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{subjectData.performance.lowest}%</p>
                      <p className="text-sm text-muted-foreground">Lowest Score</p>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={gradeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="grade" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" name="Number of Students" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Curriculum Progress</CardTitle>
                  <CardDescription>Topic coverage and completion status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectData.topics.map((topic, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{topic.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={topic.completed ? "default" : "secondary"}>
                              {topic.completed ? "Completed" : "In Progress"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{topic.progress}%</span>
                          </div>
                        </div>
                        <Progress value={topic.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Assessments</CardTitle>
                  <CardDescription>Assessment results and submission rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectData.assessments.map((assessment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{assessment.name}</p>
                          <p className="text-sm text-muted-foreground">{assessment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{assessment.average}% average</p>
                          <p className="text-sm text-muted-foreground">
                            {assessment.submissions}/{subjectData.students} submissions
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competencies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>CBC Competencies</CardTitle>
                  <CardDescription>Core competency development in this subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectData.competencies.map((competency, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{competency.name}</span>
                          <span className="text-sm text-muted-foreground">{competency.score}%</span>
                        </div>
                        <Progress value={competency.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

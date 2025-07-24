"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { X, User, BarChart3, Target, Award, TrendingUp, Calendar, BookOpen } from "lucide-react"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function StudentAssessmentModal({ student, assessments = [], onClose }) {
  const [studentData, setStudentData] = useState({
    id: student?.id || "STU001",
    name: student?.name || "John Doe",
    class: student?.class || "Grade 7A",
    admissionNumber: student?.admissionNumber || "ADM2024001",
    profileImage: student?.profileImage || "/placeholder.svg?height=100&width=100",
  })

  // Sample student assessment data
  const [studentAssessments, setStudentAssessments] = useState([
    {
      id: "ASS001",
      title: "Mathematics Problem Solving",
      subject: "Mathematics",
      type: "Formative Assessment",
      date: "2024-12-15",
      totalMarks: 100,
      obtainedMarks: 85,
      percentage: 85,
      grade: "A",
      status: "Completed",
      competencies: {
        "Critical Thinking": 90,
        "Problem Solving": 85,
        Communication: 80,
      },
      rubricScores: [
        { criteria: "Understanding", maxMarks: 25, obtained: 22 },
        { criteria: "Application", maxMarks: 25, obtained: 21 },
        { criteria: "Analysis", maxMarks: 25, obtained: 20 },
        { criteria: "Communication", maxMarks: 25, obtained: 22 },
      ],
      teacherComments:
        "Excellent problem-solving skills demonstrated. Shows clear understanding of mathematical concepts.",
    },
    {
      id: "ASS002",
      title: "English Creative Writing",
      subject: "English",
      type: "Summative Assessment",
      date: "2024-12-10",
      totalMarks: 50,
      obtainedMarks: 42,
      percentage: 84,
      grade: "A",
      status: "Completed",
      competencies: {
        Communication: 85,
        Creativity: 90,
        "Self-Efficacy": 80,
      },
      rubricScores: [
        { criteria: "Content", maxMarks: 15, obtained: 13 },
        { criteria: "Language Use", maxMarks: 15, obtained: 12 },
        { criteria: "Creativity", maxMarks: 10, obtained: 9 },
        { criteria: "Organization", maxMarks: 10, obtained: 8 },
      ],
      teacherComments: "Creative and well-structured writing. Good use of vocabulary and literary devices.",
    },
    {
      id: "ASS003",
      title: "Science Investigation",
      subject: "Science",
      type: "Performance Task",
      date: "2024-12-05",
      totalMarks: 75,
      obtainedMarks: 68,
      percentage: 91,
      grade: "A",
      status: "Completed",
      competencies: {
        "Critical Thinking": 95,
        "Learning to Learn": 88,
        "Problem Solving": 90,
      },
      rubricScores: [
        { criteria: "Hypothesis", maxMarks: 20, obtained: 18 },
        { criteria: "Method", maxMarks: 20, obtained: 17 },
        { criteria: "Analysis", maxMarks: 20, obtained: 19 },
        { criteria: "Conclusion", maxMarks: 15, obtained: 14 },
      ],
      teacherComments: "Outstanding scientific inquiry skills. Clear methodology and insightful analysis.",
    },
  ])

  // Performance analytics data
  const performanceData = [
    { month: "Sep", score: 78 },
    { month: "Oct", score: 82 },
    { month: "Nov", score: 85 },
    { month: "Dec", score: 87 },
  ]

  const subjectPerformance = [
    { subject: "Mathematics", score: 85, assessments: 3 },
    { subject: "English", score: 84, assessments: 2 },
    { subject: "Science", score: 91, assessments: 2 },
    { subject: "Social Studies", score: 79, assessments: 1 },
  ]

  const competencyRadar = [
    { competency: "Critical Thinking", score: 90, fullMark: 100 },
    { competency: "Communication", score: 82, fullMark: 100 },
    { competency: "Problem Solving", score: 88, fullMark: 100 },
    { competency: "Creativity", score: 90, fullMark: 100 },
    { competency: "Learning to Learn", score: 88, fullMark: 100 },
    { competency: "Self-Efficacy", score: 80, fullMark: 100 },
  ]

  const gradeDistribution = [
    { grade: "A", count: 5, color: "#10b981" },
    { grade: "B", count: 2, color: "#3b82f6" },
    { grade: "C", count: 0, color: "#f59e0b" },
    { grade: "D", count: 0, color: "#ef4444" },
  ]

  // Calculate statistics
  const totalAssessments = studentAssessments.length
  const averageScore = Math.round(
    studentAssessments.reduce((sum, assessment) => sum + assessment.percentage, 0) / totalAssessments,
  )
  const highestScore = Math.max(...studentAssessments.map((a) => a.percentage))
  const lowestScore = Math.min(...studentAssessments.map((a) => a.percentage))

  const getGradeColor = (grade) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800 border-green-200"
      case "B":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "C":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "D":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {studentData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {studentData.name} - Assessment Overview
              </CardTitle>
              <CardDescription>
                {studentData.class} • Admission No: {studentData.admissionNumber}
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Assessments</p>
                    <p className="text-2xl font-bold text-blue-700">{totalAssessments}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Average Score</p>
                    <p className="text-2xl font-bold text-green-700">{averageScore}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Highest Score</p>
                    <p className="text-2xl font-bold text-purple-700">{highestScore}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Grade A Count</p>
                    <p className="text-2xl font-bold text-orange-700">{gradeDistribution[0].count}</p>
                  </div>
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="assessments" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="competencies">Competencies</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="assessments" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentAssessments.map((assessment) => (
                      <TableRow key={assessment.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{assessment.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {assessment.obtainedMarks}/{assessment.totalMarks} marks
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{assessment.subject}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{assessment.type}</Badge>
                        </TableCell>
                        <TableCell>{new Date(assessment.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{assessment.percentage}%</span>
                            <Progress value={assessment.percentage} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(assessment.grade)}>{assessment.grade}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{assessment.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Detailed Assessment Cards */}
              <div className="space-y-4">
                <h4 className="font-medium">Detailed Assessment Breakdown</h4>
                {studentAssessments.map((assessment) => (
                  <Card key={assessment.id} className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                        <Badge className={getGradeColor(assessment.grade)}>Grade {assessment.grade}</Badge>
                      </div>
                      <CardDescription>
                        {assessment.subject} • {assessment.type} • {new Date(assessment.date).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h5 className="font-medium mb-2">Rubric Breakdown</h5>
                          <div className="space-y-2">
                            {assessment.rubricScores.map((rubric, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm">{rubric.criteria}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">
                                    {rubric.obtained}/{rubric.maxMarks}
                                  </span>
                                  <Progress value={(rubric.obtained / rubric.maxMarks) * 100} className="w-16" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Competency Scores</h5>
                          <div className="space-y-2">
                            {Object.entries(assessment.competencies).map(([competency, score]) => (
                              <div key={competency} className="flex items-center justify-between">
                                <span className="text-sm">{competency}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{score}%</span>
                                  <Progress value={score} className="w-16" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {assessment.teacherComments && (
                        <div className="mt-4 p-3 bg-muted rounded-lg">
                          <h5 className="font-medium mb-1">Teacher Comments</h5>
                          <p className="text-sm text-muted-foreground">{assessment.teacherComments}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance Trend
                    </CardTitle>
                    <CardDescription>Monthly performance progression</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Subject Performance
                    </CardTitle>
                    <CardDescription>Performance across different subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={subjectPerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="subject" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="score" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="competencies" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      CBC Competency Development
                    </CardTitle>
                    <CardDescription>Core competency assessment scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <RadarChart data={competencyRadar}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="competency" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="Score"
                          dataKey="score"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Competency Breakdown</CardTitle>
                    <CardDescription>Individual competency scores and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {competencyRadar.map((comp) => (
                        <div key={comp.competency} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{comp.competency}</span>
                            <span className="text-sm font-bold">{comp.score}%</span>
                          </div>
                          <Progress value={comp.score} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            {comp.score >= 90
                              ? "Excellent"
                              : comp.score >= 80
                                ? "Good"
                                : comp.score >= 70
                                  ? "Satisfactory"
                                  : "Needs Improvement"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>Distribution of grades across assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={gradeDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ grade, count }) => `${grade}: ${count}`}
                        >
                          {gradeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Insights</CardTitle>
                    <CardDescription>Key performance indicators and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                        <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Strengths</h5>
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                          <li>• Excellent performance in Science (91% average)</li>
                          <li>• Strong critical thinking skills (90% competency)</li>
                          <li>• Consistent improvement over time</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Areas for Growth</h5>
                        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                          <li>• Focus on communication skills development</li>
                          <li>• Practice more collaborative activities</li>
                          <li>• Enhance self-efficacy through goal setting</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                        <h5 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Recommendations</h5>
                        <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                          <li>• Participate in debate club for communication</li>
                          <li>• Take on leadership roles in group projects</li>
                          <li>• Set personal learning goals each term</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Learning Progress Timeline
                  </CardTitle>
                  <CardDescription>Chronological view of assessment progress and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {studentAssessments.map((assessment, index) => (
                      <div key={assessment.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              assessment.percentage >= 90
                                ? "bg-green-500"
                                : assessment.percentage >= 80
                                  ? "bg-blue-500"
                                  : assessment.percentage >= 70
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }`}
                          />
                          {index < studentAssessments.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-200 dark:bg-gray-700 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{assessment.title}</h4>
                            <Badge className={getGradeColor(assessment.grade)}>
                              {assessment.percentage}% - Grade {assessment.grade}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {assessment.subject} • {new Date(assessment.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm">{assessment.teacherComments}</p>
                          <div className="flex gap-2 mt-2">
                            {Object.entries(assessment.competencies).map(([comp, score]) => (
                              <Badge key={comp} variant="outline" className="text-xs">
                                {comp}: {score}%
                              </Badge>
                            ))}
                          </div>
                        </div>
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

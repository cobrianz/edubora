"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { X, Eye, Users, BarChart3, Target, FileText, Award } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function AssessmentViewModal({ assessment, onClose }) {
  // Sample student results for the assessment
  const [studentResults] = useState([
    {
      id: "STU001",
      name: "John Doe",
      admissionNumber: "ADM2024001",
      obtainedMarks: 85,
      percentage: 85,
      grade: "A",
      competencyScores: {
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
      status: "Completed",
      submissionDate: "2024-12-15T10:30:00",
    },
    {
      id: "STU002",
      name: "Jane Smith",
      admissionNumber: "ADM2024002",
      obtainedMarks: 92,
      percentage: 92,
      grade: "A",
      competencyScores: {
        "Critical Thinking": 95,
        "Problem Solving": 90,
        Communication: 88,
      },
      rubricScores: [
        { criteria: "Understanding", maxMarks: 25, obtained: 24 },
        { criteria: "Application", maxMarks: 25, obtained: 23 },
        { criteria: "Analysis", maxMarks: 25, obtained: 23 },
        { criteria: "Communication", maxMarks: 25, obtained: 22 },
      ],
      status: "Completed",
      submissionDate: "2024-12-15T09:45:00",
    },
    {
      id: "STU003",
      name: "Mike Johnson",
      admissionNumber: "ADM2024003",
      obtainedMarks: 78,
      percentage: 78,
      grade: "B",
      competencyScores: {
        "Critical Thinking": 80,
        "Problem Solving": 75,
        Communication: 78,
      },
      rubricScores: [
        { criteria: "Understanding", maxMarks: 25, obtained: 20 },
        { criteria: "Application", maxMarks: 25, obtained: 19 },
        { criteria: "Analysis", maxMarks: 25, obtained: 18 },
        { criteria: "Communication", maxMarks: 25, obtained: 21 },
      ],
      status: "Completed",
      submissionDate: "2024-12-15T11:15:00",
    },
  ])

  // Analytics data
  const gradeDistribution = [
    { grade: "A", count: 15, percentage: 47, color: "#10b981" },
    { grade: "B", count: 12, percentage: 37, color: "#3b82f6" },
    { grade: "C", count: 4, percentage: 13, color: "#f59e0b" },
    { grade: "D", count: 1, percentage: 3, color: "#ef4444" },
  ]

  const competencyAnalysis = [
    { competency: "Critical Thinking", average: 88, students: 32 },
    { competency: "Problem Solving", average: 83, students: 32 },
    { competency: "Communication", average: 82, students: 32 },
  ]

  const rubricAnalysis =
    assessment.rubric?.map((criteria) => ({
      criteria: criteria.criteria,
      average: Math.round(Math.random() * 20 + 15), // Sample data
      maxMarks: criteria.maxMarks,
    })) || []

  const performanceDistribution = [
    { range: "90-100%", count: 8 },
    { range: "80-89%", count: 12 },
    { range: "70-79%", count: 8 },
    { range: "60-69%", count: 3 },
    { range: "Below 60%", count: 1 },
  ]

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

  const calculateStats = () => {
    const totalStudents = studentResults.length
    const averageScore = Math.round(
      studentResults.reduce((sum, student) => sum + student.percentage, 0) / totalStudents,
    )
    const highestScore = Math.max(...studentResults.map((s) => s.percentage))
    const lowestScore = Math.min(...studentResults.map((s) => s.percentage))
    const passRate = Math.round((studentResults.filter((s) => s.percentage >= 50).length / totalStudents) * 100)

    return { totalStudents, averageScore, highestScore, lowestScore, passRate }
  }

  const stats = calculateStats()

  if (!assessment) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {assessment.title}
            </CardTitle>
            <CardDescription>
              {assessment.subject} • {assessment.class} • {assessment.type}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={assessment.status === "Published" ? "default" : "secondary"}>{assessment.status}</Badge>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Assessment Overview */}
          <div className="grid gap-4 md:grid-cols-5 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Total Students</p>
                    <p className="text-2xl font-bold text-blue-700">{stats.totalStudents}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Average Score</p>
                    <p className="text-2xl font-bold text-green-700">{stats.averageScore}%</p>
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
                    <p className="text-2xl font-bold text-purple-700">{stats.highestScore}%</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Pass Rate</p>
                    <p className="text-2xl font-bold text-orange-700">{stats.passRate}%</p>
                  </div>
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Total Marks</p>
                    <p className="text-2xl font-bold text-red-700">{assessment.totalMarks}</p>
                  </div>
                  <FileText className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="results">Student Results</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="competencies">Competencies</TabsTrigger>
              <TabsTrigger value="rubric">Rubric Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subject:</span>
                        <span className="font-medium">{assessment.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Class:</span>
                        <span className="font-medium">{assessment.class}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <Badge variant="outline">{assessment.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{new Date(assessment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{assessment.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Marks:</span>
                        <span className="font-medium">{assessment.totalMarks}</span>
                      </div>
                    </div>

                    {assessment.description && (
                      <div className="pt-4 border-t">
                        <h5 className="font-medium mb-2">Description</h5>
                        <p className="text-sm text-muted-foreground">{assessment.description}</p>
                      </div>
                    )}

                    {assessment.instructions && (
                      <div className="pt-4 border-t">
                        <h5 className="font-medium mb-2">Instructions</h5>
                        <p className="text-sm text-muted-foreground">{assessment.instructions}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
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
                          label={({ grade, percentage }) => `${grade}: ${percentage}%`}
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
              </div>

              {assessment.competencies && assessment.competencies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>CBC Competencies Assessed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {assessment.competencies.map((competency) => (
                        <Badge key={competency} variant="secondary">
                          {competency}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submission Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentResults.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.admissionNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>
                              {student.obtainedMarks}/{assessment.totalMarks}
                            </span>
                            <Progress value={student.percentage} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{student.percentage}%</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getGradeColor(student.grade)}>{student.grade}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{student.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(student.submissionDate).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Distribution</CardTitle>
                    <CardDescription>Number of students in each score range</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Statistical Summary</CardTitle>
                    <CardDescription>Key performance statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{stats.averageScore}%</div>
                          <div className="text-sm text-blue-600">Class Average</div>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{stats.passRate}%</div>
                          <div className="text-sm text-green-600">Pass Rate</div>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{stats.highestScore}%</div>
                          <div className="text-sm text-purple-600">Highest Score</div>
                        </div>
                        <div className="p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{stats.lowestScore}%</div>
                          <div className="text-sm text-orange-600">Lowest Score</div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h5 className="font-medium mb-3">Performance Insights</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span>{gradeDistribution[0].count} students achieved Grade A</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span>{gradeDistribution[1].count} students achieved Grade B</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                            <span>Standard deviation: ±{Math.round(Math.random() * 10 + 5)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="competencies" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    CBC Competency Analysis
                  </CardTitle>
                  <CardDescription>Average competency scores across all students</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={competencyAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="competency" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="average" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                {competencyAnalysis.map((comp) => (
                  <Card key={comp.competency}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{comp.competency}</span>
                          <span className="text-lg font-bold">{comp.average}%</span>
                        </div>
                        <Progress value={comp.average} className="h-2" />
                        <div className="text-xs text-muted-foreground">{comp.students} students assessed</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rubric" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rubric Performance Analysis</CardTitle>
                  <CardDescription>Average scores for each assessment criteria</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={rubricAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="criteria" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="average" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                {rubricAnalysis.map((criteria) => (
                  <Card key={criteria.criteria}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{criteria.criteria}</span>
                          <span className="text-sm text-muted-foreground">
                            {criteria.average}/{criteria.maxMarks}
                          </span>
                        </div>
                        <Progress value={(criteria.average / criteria.maxMarks) * 100} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Average: {Math.round((criteria.average / criteria.maxMarks) * 100)}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

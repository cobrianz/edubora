"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, Award, Calendar, BarChart3 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function StudentReportsPage() {
  const { toast } = useToast()

  const termReports = [
    {
      term: "Term 1 2024",
      subjects: [
        { name: "Mathematics", marks: 85, grade: "A-", position: 3, outOf: 32 },
        { name: "English", marks: 78, grade: "B+", position: 8, outOf: 32 },
        { name: "Kiswahili", marks: 82, grade: "A-", position: 5, outOf: 32 },
        { name: "Science", marks: 88, grade: "A", position: 2, outOf: 32 },
        { name: "Social Studies", marks: 75, grade: "B", position: 12, outOf: 32 },
        { name: "Religious Education", marks: 90, grade: "A", position: 1, outOf: 32 },
      ],
      overall: { average: 83, grade: "A-", position: 4, outOf: 32 },
      teacherComment: "Excellent performance! Keep up the good work in all subjects.",
      headComment: "A dedicated student with consistent performance across all subjects.",
    },
    {
      term: "Term 2 2024",
      subjects: [
        { name: "Mathematics", marks: 88, grade: "A", position: 2, outOf: 32 },
        { name: "English", marks: 80, grade: "A-", position: 6, outOf: 32 },
        { name: "Kiswahili", marks: 85, grade: "A-", position: 4, outOf: 32 },
        { name: "Science", marks: 90, grade: "A", position: 1, outOf: 32 },
        { name: "Social Studies", marks: 78, grade: "B+", position: 9, outOf: 32 },
        { name: "Religious Education", marks: 92, grade: "A", position: 1, outOf: 32 },
      ],
      overall: { average: 85.5, grade: "A", position: 3, outOf: 32 },
      teacherComment: "Showing great improvement, especially in Mathematics and Science.",
      headComment: "Commendable progress. Continue with the same dedication.",
    },
  ]

  const progressData = [
    { subject: "Mathematics", term1: 85, term2: 88, improvement: "+3" },
    { subject: "English", term1: 78, term2: 80, improvement: "+2" },
    { subject: "Kiswahili", term1: 82, term2: 85, improvement: "+3" },
    { subject: "Science", term1: 88, term2: 90, improvement: "+2" },
    { subject: "Social Studies", term1: 75, term2: 78, improvement: "+3" },
    { subject: "Religious Education", term1: 90, term2: 92, improvement: "+2" },
  ]

  const achievements = [
    { title: "Best in Science", term: "Term 2 2024", description: "Top performer in Science" },
    { title: "Most Improved", term: "Term 2 2024", description: "Significant improvement across subjects" },
    { title: "Perfect Attendance", term: "Term 1 2024", description: "100% attendance record" },
  ]

  const handleDownloadReport = (term) => {
    toast({
      title: "Download Report",
      description: `Downloading ${term} report card...`,
    })
  }

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Reports</h1>
          <p className="text-muted-foreground">View your academic performance and progress</p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85.5%</div>
            <p className="text-xs text-muted-foreground">Grade A performance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Position</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3rd</div>
            <p className="text-xs text-muted-foreground">Out of 32 students</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Subject</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Religious Ed</div>
            <p className="text-xs text-muted-foreground">92% average</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+2.5%</div>
            <p className="text-xs text-muted-foreground">From last term</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Academic Performance</CardTitle>
          <CardDescription>Detailed view of your academic progress and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="reports" className="space-y-4">
            <TabsList>
              <TabsTrigger value="reports">Term Reports</TabsTrigger>
              <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-4">
              {termReports.map((report, index) => (
                <Card key={index} className="transition-all duration-300 hover:shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.term}</CardTitle>
                      <CardDescription>
                        Overall: {report.overall.average}% - Grade {report.overall.grade} - Position{" "}
                        {report.overall.position}/{report.overall.outOf}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadReport(report.term)}
                      className="transition-all duration-300 hover:scale-105 bg-transparent"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead>Marks</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Position</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {report.subjects.map((subject, subIndex) => (
                            <TableRow key={subIndex} className="transition-all duration-200 hover:bg-muted/50">
                              <TableCell className="font-medium">{subject.name}</TableCell>
                              <TableCell>{subject.marks}%</TableCell>
                              <TableCell>
                                <Badge variant="outline" className={getGradeColor(subject.grade)}>
                                  {subject.grade}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {subject.position}/{subject.outOf}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Class Teacher's Comment:</p>
                        <p className="text-sm text-blue-700">{report.teacherComment}</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">Head Teacher's Comment:</p>
                        <p className="text-sm text-green-700">{report.headComment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Progress Comparison</CardTitle>
                  <CardDescription>Compare your performance across terms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Term 1</TableHead>
                          <TableHead>Term 2</TableHead>
                          <TableHead>Improvement</TableHead>
                          <TableHead>Trend</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {progressData.map((subject, index) => (
                          <TableRow key={index} className="transition-all duration-200 hover:bg-muted/50">
                            <TableCell className="font-medium">{subject.subject}</TableCell>
                            <TableCell>{subject.term1}%</TableCell>
                            <TableCell>{subject.term2}%</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-green-600">
                                {subject.improvement}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Award className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span className="text-xs text-muted-foreground">{achievement.term}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-yellow-600">
                          Achievement
                        </Badge>
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

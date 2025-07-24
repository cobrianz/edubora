"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, BookOpen, TrendingUp, TrendingDown, Target, Download, Filter } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function AcademicAnalyticsModal({ onClose, data }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Academic Analytics Details
            </CardTitle>
            <CardDescription>Comprehensive academic performance analysis and insights</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">School Average</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{data.averageGrade}%</div>
                    <p className="text-sm text-muted-foreground">Overall performance</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+{data.improvementRate}% improvement</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pass Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{data.passRate}%</div>
                    <p className="text-sm text-muted-foreground">Students passing</p>
                    <Progress value={data.passRate} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">+{data.improvementRate}%</div>
                    <p className="text-sm text-muted-foreground">Year over year</p>
                    <Badge variant="default" className="mt-2">
                      Excellent Progress
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance by Grade</CardTitle>
                  <CardDescription>Average scores across all grade levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.performanceByGrade}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="grade" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="average" fill="#3b82f6" name="Average Score" />
                      <Bar dataKey="passRate" fill="#10b981" name="Pass Rate" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Performance analysis by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.topSubjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{subject.subject}</p>
                            <p className="text-sm text-muted-foreground">{subject.students} students</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{subject.average}%</span>
                            {subject.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                            {subject.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                            {subject.trend === "stable" && <Target className="h-4 w-4 text-blue-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{subject.passRate}% pass rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grades" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Level Analysis</CardTitle>
                  <CardDescription>Detailed performance by grade level</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.performanceByGrade.map((grade, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{grade.grade}</span>
                          <div className="flex items-center gap-2">
                            <span>{grade.average}% avg</span>
                            <Badge variant={grade.passRate > 90 ? "default" : "secondary"}>
                              {grade.passRate}% pass
                            </Badge>
                          </div>
                        </div>
                        <Progress value={grade.average} className="h-2" />
                        <p className="text-xs text-muted-foreground">{grade.students} students</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Term Comparison</CardTitle>
                  <CardDescription>Academic performance across terms</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.termComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="term" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} name="Average Score" />
                      <Line type="monotone" dataKey="passRate" stroke="#10b981" strokeWidth={2} name="Pass Rate" />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {data.termComparison.map((term, index) => (
                      <div key={index} className="text-center p-3 border rounded-lg">
                        <p className="font-medium">{term.term}</p>
                        <p className="text-2xl font-bold text-blue-600">{term.average}%</p>
                        <p className="text-sm text-muted-foreground">{term.passRate}% pass rate</p>
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

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, BarChart3, TrendingUp, PieChart, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsModal({ onClose, userRole = "student", data = {} }) {
  const [selectedPeriod, setSelectedPeriod] = useState("term")

  const studentAnalytics = {
    performance: {
      currentGPA: 3.2,
      trend: "up",
      subjects: [
        { name: "Mathematics", grade: "A-", percentage: 85 },
        { name: "English", grade: "A", percentage: 92 },
        { name: "Science", grade: "B+", percentage: 78 },
        { name: "Kiswahili", grade: "B", percentage: 75 },
      ],
    },
    attendance: {
      overall: 95,
      trend: "up",
      monthly: [92, 94, 95, 96, 95],
    },
    assignments: {
      completed: 30,
      total: 37,
      onTime: 28,
      late: 2,
    },
  }

  const teacherAnalytics = {
    classPerformance: {
      averageGrade: "B+",
      passRate: 87,
      trend: "up",
    },
    attendance: {
      classAverage: 92,
      trend: "stable",
    },
    assignments: {
      submitted: 85,
      pending: 15,
      graded: 70,
    },
  }

  const adminAnalytics = {
    schoolOverview: {
      totalStudents: 1247,
      totalTeachers: 89,
      averagePerformance: "B+",
      attendanceRate: 94,
    },
    financial: {
      feeCollection: 87,
      revenue: 2400000,
      expenses: 1800000,
    },
    academic: {
      passRate: 89,
      topPerformers: 15,
      needsSupport: 8,
    },
  }

  const getAnalyticsData = () => {
    switch (userRole) {
      case "teacher":
        return teacherAnalytics
      case "admin":
        return adminAnalytics
      default:
        return studentAnalytics
    }
  }

  const analyticsData = getAnalyticsData()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Analytics Dashboard
            </CardTitle>
            <CardDescription>Comprehensive performance and progress analytics</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
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
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {userRole === "student" && (
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Academic Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{studentAnalytics.performance.currentGPA}</div>
                      <p className="text-sm text-muted-foreground">Current GPA</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">Improving</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Attendance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{studentAnalytics.attendance.overall}%</div>
                      <p className="text-sm text-muted-foreground">This term</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${studentAnalytics.attendance.overall}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Assignment Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {Math.round(
                          (studentAnalytics.assignments.completed / studentAnalytics.assignments.total) * 100,
                        )}
                        %
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {studentAnalytics.assignments.completed}/{studentAnalytics.assignments.total} completed
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {userRole === "teacher" && (
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Class Average</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{teacherAnalytics.classPerformance.averageGrade}</div>
                      <p className="text-sm text-muted-foreground">Overall class performance</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pass Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{teacherAnalytics.classPerformance.passRate}%</div>
                      <p className="text-sm text-muted-foreground">Students passing</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{teacherAnalytics.attendance.classAverage}%</div>
                      <p className="text-sm text-muted-foreground">Class average</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {userRole === "admin" && (
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{adminAnalytics.schoolOverview.totalStudents}</div>
                      <p className="text-sm text-muted-foreground">Enrolled students</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">School Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{adminAnalytics.schoolOverview.averagePerformance}</div>
                      <p className="text-sm text-muted-foreground">Average grade</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Fee Collection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{adminAnalytics.financial.feeCollection}%</div>
                      <p className="text-sm text-muted-foreground">Collection rate</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pass Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{adminAnalytics.academic.passRate}%</div>
                      <p className="text-sm text-muted-foreground">Overall pass rate</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Performance charts will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <PieChart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Attendance charts will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Trend analysis will be displayed here</p>
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

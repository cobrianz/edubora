"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Download, Eye, BarChart3, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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

export default function ViewReportModal({ report, onClose, onDownload }) {
  const { toast } = useToast()

  // Sample report data
  const reportData = {
    academic: {
      title: "Academic Performance Report",
      period: "Term 2, 2024",
      generatedDate: "2024-12-07",
      summary: {
        totalStudents: 1247,
        averageGrade: "B+",
        passRate: 94.2,
        topPerformers: 156,
      },
      charts: {
        gradeDistribution: [
          { grade: "A", count: 156, percentage: 12.5 },
          { grade: "B", count: 423, percentage: 33.9 },
          { grade: "C", count: 512, percentage: 41.1 },
          { grade: "D", count: 134, percentage: 10.7 },
          { grade: "E", count: 22, percentage: 1.8 },
        ],
        subjectPerformance: [
          { subject: "Mathematics", average: 78.5, students: 1247 },
          { subject: "English", average: 82.1, students: 1247 },
          { subject: "Science", average: 75.3, students: 1247 },
          { subject: "Social Studies", average: 80.7, students: 1247 },
          { subject: "Kiswahili", average: 79.2, students: 1247 },
        ],
        termTrends: [
          { term: "Term 1", average: 76.2 },
          { term: "Term 2", average: 78.5 },
          { term: "Term 3", average: 77.8 },
        ],
      },
    },
    attendance: {
      title: "Attendance Analysis Report",
      period: "November 2024",
      generatedDate: "2024-12-07",
      summary: {
        totalStudents: 1247,
        averageAttendance: 94.8,
        perfectAttendance: 423,
        chronicAbsences: 23,
      },
      charts: {
        dailyAttendance: [
          { day: "Mon", present: 1180, absent: 67 },
          { day: "Tue", present: 1195, absent: 52 },
          { day: "Wed", present: 1203, absent: 44 },
          { day: "Thu", present: 1189, absent: 58 },
          { day: "Fri", present: 1167, absent: 80 },
        ],
        gradeAttendance: [
          { grade: "Grade 6", attendance: 96.2 },
          { grade: "Grade 7", attendance: 94.8 },
          { grade: "Grade 8", attendance: 93.5 },
          { grade: "Grade 9", attendance: 95.1 },
        ],
        monthlyTrends: [
          { month: "Aug", attendance: 93.2 },
          { month: "Sep", attendance: 94.1 },
          { month: "Oct", attendance: 95.3 },
          { month: "Nov", attendance: 94.8 },
        ],
      },
    },
    financial: {
      title: "Financial Performance Report",
      period: "Q3 2024",
      generatedDate: "2024-12-07",
      summary: {
        totalRevenue: 15750000,
        totalExpenses: 12340000,
        netProfit: 3410000,
        feeCollection: 87.3,
      },
      charts: {
        revenueBreakdown: [
          { source: "Tuition Fees", amount: 12500000, percentage: 79.4 },
          { source: "Transport Fees", amount: 1800000, percentage: 11.4 },
          { source: "Lunch Fees", amount: 950000, percentage: 6.0 },
          { source: "Other Fees", amount: 500000, percentage: 3.2 },
        ],
        monthlyRevenue: [
          { month: "Jul", revenue: 5200000, expenses: 4100000 },
          { month: "Aug", revenue: 5350000, expenses: 4150000 },
          { month: "Sep", revenue: 5200000, expenses: 4090000 },
        ],
        expenseCategories: [
          { category: "Salaries", amount: 7500000, percentage: 60.8 },
          { category: "Utilities", amount: 1200000, percentage: 9.7 },
          { category: "Supplies", amount: 1800000, percentage: 14.6 },
          { category: "Maintenance", amount: 950000, percentage: 7.7 },
          { category: "Other", amount: 890000, percentage: 7.2 },
        ],
      },
    },
  }

  const currentReport = reportData[report?.type] || reportData.academic

  const handleDownload = (format) => {
    onDownload({ ...report, format })
    toast({
      title: "Download Started",
      description: `${currentReport.title} is being downloaded as ${format.toUpperCase()}`,
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              {currentReport.title}
            </CardTitle>
            <CardDescription>
              Period: {currentReport.period} • Generated: {currentReport.generatedDate}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleDownload("pdf")}>
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button variant="outline" onClick={() => handleDownload("excel")}>
              <Download className="mr-2 h-4 w-4" />
              Excel
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Report Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(currentReport.summary).map(([key, value]) => (
              <Card key={key}>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {typeof value === "number" && value > 1000 ? value.toLocaleString() : value}
                      {key.includes("Rate") || key.includes("Attendance") ? "%" : ""}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Report Content */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
              <TabsTrigger value="details">Detailed Data</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Primary Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {report?.type === "academic" && "Grade Distribution"}
                      {report?.type === "attendance" && "Daily Attendance"}
                      {report?.type === "financial" && "Revenue Breakdown"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      {report?.type === "academic" && (
                        <BarChart data={currentReport.charts.gradeDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="grade" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3b82f6" />
                        </BarChart>
                      )}
                      {report?.type === "attendance" && (
                        <BarChart data={currentReport.charts.dailyAttendance}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="present" fill="#10b981" name="Present" />
                          <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                        </BarChart>
                      )}
                      {report?.type === "financial" && (
                        <PieChart>
                          <Pie
                            data={currentReport.charts.revenueBreakdown}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="amount"
                            label={({ source, percentage }) => `${source}: ${percentage}%`}
                          >
                            {currentReport.charts.revenueBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={`hsl(${index * 90}, 70%, 50%)`} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(value)} />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Secondary Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {report?.type === "academic" && "Subject Performance"}
                      {report?.type === "attendance" && "Grade-wise Attendance"}
                      {report?.type === "financial" && "Monthly Revenue vs Expenses"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      {report?.type === "academic" && (
                        <BarChart data={currentReport.charts.subjectPerformance} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="subject" type="category" width={100} />
                          <Tooltip />
                          <Bar dataKey="average" fill="#10b981" />
                        </BarChart>
                      )}
                      {report?.type === "attendance" && (
                        <BarChart data={currentReport.charts.gradeAttendance}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="grade" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="attendance" fill="#3b82f6" />
                        </BarChart>
                      )}
                      {report?.type === "financial" && (
                        <LineChart data={currentReport.charts.monthlyRevenue}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => formatCurrency(value)} />
                          <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                          <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="charts">
              <div className="grid gap-6">
                {/* Trends Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Trends Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      {report?.type === "academic" && (
                        <LineChart data={currentReport.charts.termTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="term" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={3} />
                        </LineChart>
                      )}
                      {report?.type === "attendance" && (
                        <LineChart data={currentReport.charts.monthlyTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={3} />
                        </LineChart>
                      )}
                      {report?.type === "financial" && (
                        <PieChart>
                          <Pie
                            data={currentReport.charts.expenseCategories}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="amount"
                            label={({ category, percentage }) => `${category}: ${percentage}%`}
                          >
                            {currentReport.charts.expenseCategories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 50%)`} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(value)} />
                        </PieChart>
                      )}
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {report?.type === "academic" && (
                        <div className="space-y-4">
                          <h4 className="font-medium">Grade Distribution Details</h4>
                          <div className="grid gap-2">
                            {currentReport.charts.gradeDistribution.map((item) => (
                              <div
                                key={item.grade}
                                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline">Grade {item.grade}</Badge>
                                  <span>{item.count} students</span>
                                </div>
                                <span className="font-medium">{item.percentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {report?.type === "attendance" && (
                        <div className="space-y-4">
                          <h4 className="font-medium">Attendance Summary</h4>
                          <div className="grid gap-2">
                            {currentReport.charts.gradeAttendance.map((item) => (
                              <div
                                key={item.grade}
                                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                              >
                                <span>{item.grade}</span>
                                <Badge
                                  variant={
                                    item.attendance > 95
                                      ? "default"
                                      : item.attendance > 90
                                        ? "secondary"
                                        : "destructive"
                                  }
                                >
                                  {item.attendance}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {report?.type === "financial" && (
                        <div className="space-y-4">
                          <h4 className="font-medium">Revenue Sources</h4>
                          <div className="grid gap-2">
                            {currentReport.charts.revenueBreakdown.map((item) => (
                              <div
                                key={item.source}
                                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                              >
                                <span>{item.source}</span>
                                <div className="text-right">
                                  <div className="font-medium">{formatCurrency(item.amount)}</div>
                                  <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Key Insights & Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {report?.type === "academic" && (
                        <>
                          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Positive Trends</h4>
                            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                              <li>• Overall pass rate of 94.2% exceeds target of 90%</li>
                              <li>• Mathematics performance improved by 3.2% from last term</li>
                              <li>• 156 students achieved Grade A (12.5% of total)</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                              Areas for Improvement
                            </h4>
                            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                              <li>• Science average (75.3%) below school target of 78%</li>
                              <li>• 22 students (1.8%) scored Grade E - need intervention</li>
                              <li>• Consider additional support for struggling students</li>
                            </ul>
                          </div>
                        </>
                      )}

                      {report?.type === "attendance" && (
                        <>
                          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Positive Trends</h4>
                            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                              <li>• Overall attendance rate of 94.8% meets target</li>
                              <li>• 423 students (33.9%) have perfect attendance</li>
                              <li>• Wednesday shows highest attendance (96.5%)</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                            <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Concerns</h4>
                            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                              <li>• 23 students have chronic absences &gt;10 days)</li>
                              <li>• Friday attendance consistently lower (93.6%)</li>
                              <li>• Grade 8 attendance below average (93.5%)</li>
                            </ul>
                          </div>
                        </>
                      )}

                      {report?.type === "financial" && (
                        <>
                          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                            <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Financial Health</h4>
                            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                              <li>• Net profit margin of 21.7% indicates healthy finances</li>
                              <li>• Fee collection rate of 87.3% is above industry average</li>
                              <li>• Revenue growth of 3.8% quarter-over-quarter</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Recommendations</h4>
                            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                              <li>• Implement payment plans to improve fee collection</li>
                              <li>• Review utility expenses (9.7% of total) for optimization</li>
                              <li>• Consider diversifying revenue streams</li>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => handleDownload("pdf")}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

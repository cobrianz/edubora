"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Plus,
  Search,
  Eye,
  Download,
  Calendar,
  BarChart3,
  Users,
  TrendingUp,
  Settings,
  Trash2,
  Edit,
  Clock,
  CheckCircle,
  X,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  AreaChart,
  Area,
} from "recharts"

// Import modals
import GenerateReportModal from "@/components/modals/generate-report-modal"
import ViewReportModal from "@/components/modals/view-report-modal"
import ScheduleReportModal from "@/components/modals/schedule-report-modal"

export default function ReportsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState(null)
  const [selectedSchedule, setSelectedSchedule] = useState(null)

  // Modal states
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  // Inline management states
  const [showManageSection, setShowManageSection] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState(null)
  const [scheduleForm, setScheduleForm] = useState({
    reportName: "",
    frequency: "weekly",
    status: "Active",
  })

  // Sample data
  const [reports, setReports] = useState([
    {
      id: "RPT001",
      name: "Academic Performance Q3 2024",
      type: "academic",
      generatedDate: "2024-12-07",
      period: "Q3 2024",
      format: "pdf",
      size: "2.4 MB",
      downloads: 15,
      status: "Generated",
    },
    {
      id: "RPT002",
      name: "Attendance Analysis November",
      type: "attendance",
      generatedDate: "2024-12-05",
      period: "November 2024",
      format: "excel",
      size: "1.8 MB",
      downloads: 8,
      status: "Generated",
    },
    {
      id: "RPT003",
      name: "Financial Summary Q3",
      type: "financial",
      generatedDate: "2024-12-03",
      period: "Q3 2024",
      format: "both",
      size: "3.2 MB",
      downloads: 22,
      status: "Generated",
    },
  ])

  const [scheduledReports, setScheduledReports] = useState([
    {
      id: "SCH001",
      reportName: "Weekly Academic Summary",
      reportType: "academic",
      frequency: "weekly",
      dayOfWeek: "monday",
      time: "09:00",
      recipients: 5,
      status: "Active",
      nextRun: "2024-12-09T09:00:00Z",
      lastRun: "2024-12-02T09:00:00Z",
      createdDate: "2024-11-15",
    },
    {
      id: "SCH002",
      reportName: "Monthly Financial Report",
      reportType: "financial",
      frequency: "monthly",
      dayOfMonth: "1",
      time: "08:00",
      recipients: 3,
      status: "Active",
      nextRun: "2025-01-01T08:00:00Z",
      lastRun: "2024-12-01T08:00:00Z",
      createdDate: "2024-10-20",
    },
    {
      id: "SCH003",
      reportName: "Term Attendance Report",
      reportType: "attendance",
      frequency: "termly",
      time: "10:00",
      recipients: 7,
      status: "Paused",
      nextRun: null,
      lastRun: "2024-11-30T10:00:00Z",
      createdDate: "2024-09-10",
    },
  ])

  // Analytics data
  const reportGenerationTrends = [
    { month: "Jul", reports: 12, downloads: 45 },
    { month: "Aug", reports: 15, downloads: 52 },
    { month: "Sep", reports: 18, downloads: 67 },
    { month: "Oct", reports: 14, downloads: 48 },
    { month: "Nov", reports: 20, downloads: 73 },
    { month: "Dec", reports: 8, downloads: 28 },
  ]

  const reportTypeDistribution = [
    { name: "Academic", value: 35, color: "#3b82f6" },
    { name: "Financial", value: 25, color: "#10b981" },
    { name: "Attendance", value: 20, color: "#f59e0b" },
    { name: "Library", value: 12, color: "#ef4444" },
    { name: "Transport", value: 8, color: "#8b5cf6" },
  ]

  const popularReports = [
    { name: "Academic Performance", generated: 45, downloads: 180 },
    { name: "Financial Summary", generated: 32, downloads: 156 },
    { name: "Attendance Analysis", generated: 28, downloads: 134 },
    { name: "Library Statistics", generated: 18, downloads: 89 },
    { name: "Transport Report", generated: 12, downloads: 67 },
  ]

  const usageMetrics = [
    { day: "Mon", views: 25, downloads: 18 },
    { day: "Tue", views: 32, downloads: 24 },
    { day: "Wed", views: 28, downloads: 21 },
    { day: "Thu", views: 35, downloads: 28 },
    { day: "Fri", views: 42, downloads: 35 },
    { day: "Sat", views: 15, downloads: 12 },
    { day: "Sun", views: 8, downloads: 6 },
  ]

  // Handlers
  const handleGenerateReport = (reportData) => {
    setReports([reportData, ...reports])
    setShowGenerateModal(false)
  }

  const handleViewReport = (report) => {
    setSelectedReport(report)
    setShowViewModal(true)
  }

  const handleDownloadReport = (report, format = null) => {
    const downloadFormat = format || report.format
    toast({
      title: "Download Started",
      description: `${report.name} is being downloaded as ${downloadFormat.toUpperCase()}`,
    })

    // Update download count
    setReports(reports.map((r) => (r.id === report.id ? { ...r, downloads: r.downloads + 1 } : r)))
  }

  const handleScheduleReport = (scheduleData) => {
    setScheduledReports([scheduleData, ...scheduledReports])
    setShowScheduleModal(false)
  }

  const handleDeleteReport = (reportId) => {
    setReports(reports.filter((r) => r.id !== reportId))
    toast({
      title: "Report Deleted",
      description: "The report has been removed from the system",
    })
  }

  const handleToggleSchedule = (scheduleId) => {
    setScheduledReports(
      scheduledReports.map((schedule) =>
        schedule.id === scheduleId
          ? { ...schedule, status: schedule.status === "Active" ? "Paused" : "Active" }
          : schedule,
      ),
    )
  }

  const handleDeleteSchedule = (scheduleId) => {
    setScheduledReports(scheduledReports.filter((s) => s.id !== scheduleId))
    toast({
      title: "Schedule Deleted",
      description: "The scheduled report has been removed",
    })
  }

  const handleEditScheduleInline = (schedule) => {
    setEditingSchedule(schedule.id)
    setScheduleForm({
      reportName: schedule.reportName,
      frequency: schedule.frequency,
      status: schedule.status,
    })
  }

  const handleSaveScheduleInline = () => {
    setScheduledReports(
      scheduledReports.map((schedule) =>
        schedule.id === editingSchedule ? { ...schedule, ...scheduleForm } : schedule,
      ),
    )
    setEditingSchedule(null)
    setScheduleForm({ reportName: "", frequency: "weekly", status: "Active" })
    toast({
      title: "Schedule Updated",
      description: "The scheduled report has been updated successfully",
    })
  }

  const handleCancelEditInline = () => {
    setEditingSchedule(null)
    setScheduleForm({ reportName: "", frequency: "weekly", status: "Active" })
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
    if (selectedFilter === "all") return matchesSearch
    return matchesSearch && report.type === selectedFilter
  })

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate, view, and manage comprehensive school reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowScheduleModal(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button onClick={() => setShowGenerateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{reports.length}</div>
            <p className="text-xs text-muted-foreground">Generated this month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {reports.reduce((sum, report) => sum + report.downloads, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total downloads</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
              {scheduledReports.filter((s) => s.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">Active schedules</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              {reports.reduce((sum, report) => sum + Number.parseFloat(report.size), 0).toFixed(1)} MB
            </div>
            <p className="text-xs text-muted-foreground">Total file size</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Report Generation Trends
            </CardTitle>
            <CardDescription>Monthly report generation and download statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={reportGenerationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="reports"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="Reports Generated"
                />
                <Area
                  type="monotone"
                  dataKey="downloads"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                  name="Downloads"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Report Type Distribution
            </CardTitle>
            <CardDescription>Breakdown of reports by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {reportTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Popular Reports</CardTitle>
            <CardDescription>Most generated and downloaded reports</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={popularReports} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="generated" fill="#3b82f6" name="Generated" />
                <Bar dataKey="downloads" fill="#10b981" name="Downloads" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usage Patterns
            </CardTitle>
            <CardDescription>Daily report views and downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} name="Views" />
                <Line type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={2} name="Downloads" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>View and download previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reports</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="library">Library</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Generated</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(report.generatedDate).toLocaleDateString()}</TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{report.format.toUpperCase()}</Badge>
                        </TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>{report.downloads}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleViewReport(report)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDownloadReport(report)}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600"
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Manage automated report generation schedules</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setShowManageSection(!showManageSection)}>
                <Settings className="mr-2 h-4 w-4" />
                {showManageSection ? "Hide" : "Manage"} Schedules
              </Button>
            </CardHeader>
            <CardContent>
              {/* Inline Management Section */}
              {showManageSection && (
                <div className="mb-6 p-4 bg-muted rounded-lg border">
                  <h4 className="font-medium mb-4">Manage Report Schedules</h4>
                  <div className="space-y-4">
                    {scheduledReports.map((schedule) => (
                      <div
                        key={schedule.id}
                        className="flex items-center justify-between p-3 bg-background rounded border"
                      >
                        {editingSchedule === schedule.id ? (
                          <div className="flex items-center gap-3 flex-1">
                            <Input
                              value={scheduleForm.reportName}
                              onChange={(e) => setScheduleForm({ ...scheduleForm, reportName: e.target.value })}
                              className="max-w-xs"
                            />
                            <Select
                              value={scheduleForm.frequency}
                              onValueChange={(value) => setScheduleForm({ ...scheduleForm, frequency: value })}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="termly">Termly</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select
                              value={scheduleForm.status}
                              onValueChange={(value) => setScheduleForm({ ...scheduleForm, status: value })}
                            >
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Paused">Paused</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="flex gap-1">
                              <Button size="sm" onClick={handleSaveScheduleInline}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelEditInline}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="font-medium">{schedule.reportName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {schedule.frequency} • {schedule.recipients} recipients
                                </p>
                              </div>
                              <Badge variant={schedule.status === "Active" ? "default" : "secondary"}>
                                {schedule.status}
                              </Badge>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" onClick={() => handleEditScheduleInline(schedule)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleToggleSchedule(schedule.id)}>
                                {schedule.status === "Active" ? "Pause" : "Resume"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 bg-transparent"
                                onClick={() => handleDeleteSchedule(schedule.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledReports.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="font-medium">{schedule.reportName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {schedule.reportType}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{schedule.frequency}</TableCell>
                        <TableCell>{schedule.recipients}</TableCell>
                        <TableCell>
                          {schedule.nextRun ? new Date(schedule.nextRun).toLocaleString() : "Not scheduled"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={schedule.status === "Active" ? "default" : "secondary"}>
                            {schedule.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleToggleSchedule(schedule.id)}>
                              {schedule.status === "Active" ? (
                                <Clock className="h-4 w-4" />
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600"
                              onClick={() => handleDeleteSchedule(schedule.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-configured report templates for quick generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Academic Performance Summary",
                    description: "Comprehensive academic performance analysis",
                    type: "academic",
                    icon: BarChart3,
                  },
                  {
                    name: "Financial Health Report",
                    description: "Revenue, expenses, and financial metrics",
                    type: "financial",
                    icon: TrendingUp,
                  },
                  {
                    name: "Attendance Analysis",
                    description: "Student attendance patterns and trends",
                    type: "attendance",
                    icon: Users,
                  },
                  {
                    name: "Library Usage Report",
                    description: "Book borrowing and library statistics",
                    type: "library",
                    icon: FileText,
                  },
                  {
                    name: "Transport Efficiency",
                    description: "Bus utilization and transport metrics",
                    type: "transport",
                    icon: Users,
                  },
                  {
                    name: "Comprehensive Overview",
                    description: "All-in-one school performance report",
                    type: "comprehensive",
                    icon: FileText,
                  },
                ].map((template) => {
                  const Icon = template.icon
                  return (
                    <Card key={template.name} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Icon className="h-5 w-5 text-blue-600" />
                          {template.name}
                        </CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="capitalize">
                            {template.type}
                          </Badge>
                          <Button size="sm" onClick={() => setShowGenerateModal(true)}>
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showGenerateModal && (
        <GenerateReportModal onClose={() => setShowGenerateModal(false)} onGenerate={handleGenerateReport} />
      )}

      {showViewModal && selectedReport && (
        <ViewReportModal
          report={selectedReport}
          onClose={() => setShowViewModal(false)}
          onDownload={handleDownloadReport}
        />
      )}

      {showScheduleModal && (
        <ScheduleReportModal onClose={() => setShowScheduleModal(false)} onSchedule={handleScheduleReport} />
      )}
    </div>
  )
}

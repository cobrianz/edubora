"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { X, FileText, Download, Eye, BarChart3, Users, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AcademicReportModal({ onClose, onGenerate }) {
  const { toast } = useToast()
  const [reportConfig, setReportConfig] = useState({
    title: "",
    type: "Performance Report",
    period: "Current Term",
    format: "PDF",
    recipients: [],
    filters: {
      grades: [],
      classes: [],
      subjects: [],
      students: [],
    },
    sections: {
      overview: true,
      performance: true,
      attendance: true,
      assignments: true,
      competencies: true,
      recommendations: true,
    },
    customSections: [],
    schedule: {
      immediate: true,
      scheduled: false,
      date: "",
      time: "",
      recurring: false,
      frequency: "Weekly",
    },
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const reportTypes = [
    "Performance Report",
    "Progress Report",
    "Competency Assessment",
    "Class Summary",
    "Individual Student Report",
    "Subject Analysis",
    "Attendance Report",
    "CBC Compliance Report",
  ]

  const periods = ["Current Term", "Previous Term", "Academic Year", "Last 30 Days", "Last 90 Days", "Custom Range"]

  const formats = ["PDF", "Excel", "Word", "PowerPoint", "HTML"]

  const recipientTypes = ["Parents", "Teachers", "Students", "Administration", "Board Members", "Ministry of Education"]

  const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9"]
  const classes = ["6A", "6B", "7A", "7B", "8A", "8B", "9A", "9B"]
  const subjects = ["Mathematics", "English", "Science", "Social Studies", "Kiswahili"]

  const handleConfigChange = (field, value) => {
    setReportConfig({ ...reportConfig, [field]: value })
  }

  const handleSectionChange = (section, value) => {
    setReportConfig({
      ...reportConfig,
      sections: { ...reportConfig.sections, [section]: value },
    })
  }

  const handleFilterChange = (filterType, value) => {
    const currentFilters = reportConfig.filters[filterType]
    const updatedFilters = currentFilters.includes(value)
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value]

    setReportConfig({
      ...reportConfig,
      filters: { ...reportConfig.filters, [filterType]: updatedFilters },
    })
  }

  const handleScheduleChange = (field, value) => {
    setReportConfig({
      ...reportConfig,
      schedule: { ...reportConfig.schedule, [field]: value },
    })
  }

  const addRecipient = (recipient) => {
    if (!reportConfig.recipients.includes(recipient)) {
      setReportConfig({
        ...reportConfig,
        recipients: [...reportConfig.recipients, recipient],
      })
    }
  }

  const removeRecipient = (recipient) => {
    setReportConfig({
      ...reportConfig,
      recipients: reportConfig.recipients.filter((r) => r !== recipient),
    })
  }

  const simulateGeneration = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate report generation progress
    const steps = [
      { progress: 20, message: "Collecting data..." },
      { progress: 40, message: "Processing performance metrics..." },
      { progress: 60, message: "Generating charts and graphs..." },
      { progress: 80, message: "Formatting report..." },
      { progress: 100, message: "Report generated successfully!" },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setGenerationProgress(step.progress)
      toast({
        title: "Generating Report",
        description: step.message,
      })
    }

    setIsGenerating(false)
    onGenerate(reportConfig)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!reportConfig.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a report title",
        variant: "destructive",
      })
      return
    }

    if (reportConfig.recipients.length === 0) {
      toast({
        title: "Missing Recipients",
        description: "Please select at least one recipient",
        variant: "destructive",
      })
      return
    }

    simulateGeneration()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Academic Report
            </CardTitle>
            <CardDescription>Create comprehensive academic reports with analytics and insights</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {isGenerating ? (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Generating Report...</h3>
                <Progress value={generationProgress} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-muted-foreground">{generationProgress}% Complete</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="basic" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="filters">Filters</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Report Title *</Label>
                      <Input
                        id="title"
                        value={reportConfig.title}
                        onChange={(e) => handleConfigChange("title", e.target.value)}
                        placeholder="e.g., Term 2 Performance Report"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Report Type</Label>
                      <Select value={reportConfig.type} onValueChange={(value) => handleConfigChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {reportTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="period">Reporting Period</Label>
                      <Select
                        value={reportConfig.period}
                        onValueChange={(value) => handleConfigChange("period", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {periods.map((period) => (
                            <SelectItem key={period} value={period}>
                              {period}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="format">Output Format</Label>
                      <Select
                        value={reportConfig.format}
                        onValueChange={(value) => handleConfigChange("format", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {formats.map((format) => (
                            <SelectItem key={format} value={format}>
                              {format}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {reportConfig.period === "Custom Range" && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Report Sections</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="overview"
                            checked={reportConfig.sections.overview}
                            onCheckedChange={(checked) => handleSectionChange("overview", checked)}
                          />
                          <Label htmlFor="overview" className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Executive Overview
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="performance"
                            checked={reportConfig.sections.performance}
                            onCheckedChange={(checked) => handleSectionChange("performance", checked)}
                          />
                          <Label htmlFor="performance" className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Academic Performance
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="attendance"
                            checked={reportConfig.sections.attendance}
                            onCheckedChange={(checked) => handleSectionChange("attendance", checked)}
                          />
                          <Label htmlFor="attendance" className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Attendance Analysis
                          </Label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="assignments"
                            checked={reportConfig.sections.assignments}
                            onCheckedChange={(checked) => handleSectionChange("assignments", checked)}
                          />
                          <Label htmlFor="assignments" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Assignment Progress
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="competencies"
                            checked={reportConfig.sections.competencies}
                            onCheckedChange={(checked) => handleSectionChange("competencies", checked)}
                          />
                          <Label htmlFor="competencies" className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            CBC Competencies
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="recommendations"
                            checked={reportConfig.sections.recommendations}
                            onCheckedChange={(checked) => handleSectionChange("recommendations", checked)}
                          />
                          <Label htmlFor="recommendations" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Recommendations
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="filters" className="space-y-4">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>Grade Levels</Label>
                      <div className="flex flex-wrap gap-2">
                        {grades.map((grade) => (
                          <Badge
                            key={grade}
                            variant={reportConfig.filters.grades.includes(grade) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleFilterChange("grades", grade)}
                          >
                            {grade}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Classes</Label>
                      <div className="flex flex-wrap gap-2">
                        {classes.map((cls) => (
                          <Badge
                            key={cls}
                            variant={reportConfig.filters.classes.includes(cls) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleFilterChange("classes", cls)}
                          >
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Subjects</Label>
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((subject) => (
                          <Badge
                            key={subject}
                            variant={reportConfig.filters.subjects.includes(subject) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleFilterChange("subjects", subject)}
                          >
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="delivery" className="space-y-4">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>Recipients</Label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {recipientTypes.map((recipient) => (
                          <Button
                            key={recipient}
                            type="button"
                            variant={reportConfig.recipients.includes(recipient) ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              reportConfig.recipients.includes(recipient)
                                ? removeRecipient(recipient)
                                : addRecipient(recipient)
                            }
                          >
                            {recipient}
                          </Button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {reportConfig.recipients.map((recipient) => (
                          <Badge key={recipient} variant="default" className="cursor-pointer">
                            {recipient}
                            <X className="h-3 w-3 ml-1" onClick={() => removeRecipient(recipient)} />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Delivery Schedule</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="immediate"
                              checked={reportConfig.schedule.immediate}
                              onCheckedChange={(checked) => handleScheduleChange("immediate", checked)}
                            />
                            <Label htmlFor="immediate">Generate Immediately</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="scheduled"
                              checked={reportConfig.schedule.scheduled}
                              onCheckedChange={(checked) => handleScheduleChange("scheduled", checked)}
                            />
                            <Label htmlFor="scheduled">Schedule for Later</Label>
                          </div>
                        </div>

                        {reportConfig.schedule.scheduled && (
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Date</Label>
                              <Input
                                type="date"
                                value={reportConfig.schedule.date}
                                onChange={(e) => handleScheduleChange("date", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Time</Label>
                              <Input
                                type="time"
                                value={reportConfig.schedule.time}
                                onChange={(e) => handleScheduleChange("time", e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="recurring"
                            checked={reportConfig.schedule.recurring}
                            onCheckedChange={(checked) => handleScheduleChange("recurring", checked)}
                          />
                          <Label htmlFor="recurring">Recurring Report</Label>
                        </div>

                        {reportConfig.schedule.recurring && (
                          <div className="space-y-2">
                            <Label>Frequency</Label>
                            <Select
                              value={reportConfig.schedule.frequency}
                              onValueChange={(value) => handleScheduleChange("frequency", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Daily">Daily</SelectItem>
                                <SelectItem value="Weekly">Weekly</SelectItem>
                                <SelectItem value="Monthly">Monthly</SelectItem>
                                <SelectItem value="Termly">Termly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="button" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button type="submit">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

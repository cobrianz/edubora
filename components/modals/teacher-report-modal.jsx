"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, FileText, Download, Calendar, BarChart3, Users, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TeacherReportModal({ teacher, onClose, onGenerate }) {
  const { toast } = useToast()
  const [reportConfig, setReportConfig] = useState({
    type: "performance",
    period: "current-term",
    customPeriod: {
      startDate: "",
      endDate: "",
    },
    sections: {
      personalInfo: true,
      classPerformance: true,
      studentFeedback: true,
      attendance: true,
      achievements: true,
      recommendations: false,
    },
    format: "pdf",
    delivery: {
      method: "download",
      email: "",
      schedule: "immediate",
      date: "",
      time: "",
    },
    includeCharts: true,
    includeComparisons: true,
    confidential: false,
    notes: "",
  })

  const reportTypes = [
    { value: "performance", label: "Performance Report", description: "Comprehensive teaching performance analysis" },
    { value: "class-summary", label: "Class Summary", description: "Summary of all assigned classes" },
    { value: "student-feedback", label: "Student Feedback", description: "Compiled student feedback and ratings" },
    { value: "attendance", label: "Attendance Report", description: "Teacher attendance and punctuality record" },
    { value: "professional", label: "Professional Development", description: "Training and development progress" },
    { value: "comprehensive", label: "Comprehensive Report", description: "Complete teacher evaluation report" },
  ]

  const periods = [
    { value: "current-term", label: "Current Term" },
    { value: "last-term", label: "Last Term" },
    { value: "current-year", label: "Current Academic Year" },
    { value: "last-year", label: "Last Academic Year" },
    { value: "custom", label: "Custom Period" },
  ]

  const handleSectionToggle = (section, checked) => {
    setReportConfig({
      ...reportConfig,
      sections: { ...reportConfig.sections, [section]: checked },
    })
  }

  const handleDeliveryChange = (field, value) => {
    setReportConfig({
      ...reportConfig,
      delivery: { ...reportConfig.delivery, [field]: value },
    })
  }

  const handleCustomPeriodChange = (field, value) => {
    setReportConfig({
      ...reportConfig,
      customPeriod: { ...reportConfig.customPeriod, [field]: value },
    })
  }

  const handleGenerate = () => {
    if (
      reportConfig.period === "custom" &&
      (!reportConfig.customPeriod.startDate || !reportConfig.customPeriod.endDate)
    ) {
      toast({
        title: "Missing Information",
        description: "Please select start and end dates for custom period",
        variant: "destructive",
      })
      return
    }

    if (reportConfig.delivery.method === "email" && !reportConfig.delivery.email) {
      toast({
        title: "Missing Email",
        description: "Please enter email address for delivery",
        variant: "destructive",
      })
      return
    }

    onGenerate(reportConfig)
    toast({
      title: "Report Generated",
      description: `${reportTypes.find((t) => t.value === reportConfig.type)?.label} has been generated successfully`,
    })
  }

  const getSelectedSectionsCount = () => {
    return Object.values(reportConfig.sections).filter(Boolean).length
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Teacher Report
            </CardTitle>
            <CardDescription>
              Generate detailed report for {teacher?.name} • {teacher?.employeeId}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="config" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
            </TabsList>

            <TabsContent value="config" className="space-y-6">
              {/* Teacher Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{teacher?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {teacher?.subject} Teacher • {teacher?.employeeId} • {teacher?.experience}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline">{teacher?.status}</Badge>
                        <Badge variant="outline">{teacher?.classes?.length || 3} Classes</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select
                    value={reportConfig.type}
                    onValueChange={(value) => setReportConfig({ ...reportConfig, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div>
                            <div className="font-medium">{type.label}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Report Period</Label>
                  <Select
                    value={reportConfig.period}
                    onValueChange={(value) => setReportConfig({ ...reportConfig, period: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {reportConfig.period === "custom" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={reportConfig.customPeriod.startDate}
                        onChange={(e) => handleCustomPeriodChange("startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={reportConfig.customPeriod.endDate}
                        onChange={(e) => handleCustomPeriodChange("endDate", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select
                    value={reportConfig.format}
                    onValueChange={(value) => setReportConfig({ ...reportConfig, format: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="word">Word Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Additional Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeCharts"
                        checked={reportConfig.includeCharts}
                        onCheckedChange={(checked) => setReportConfig({ ...reportConfig, includeCharts: checked })}
                      />
                      <Label htmlFor="includeCharts" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Include Charts and Graphs
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeComparisons"
                        checked={reportConfig.includeComparisons}
                        onCheckedChange={(checked) => setReportConfig({ ...reportConfig, includeComparisons: checked })}
                      />
                      <Label htmlFor="includeComparisons">Include Peer Comparisons</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="confidential"
                        checked={reportConfig.confidential}
                        onCheckedChange={(checked) => setReportConfig({ ...reportConfig, confidential: checked })}
                      />
                      <Label htmlFor="confidential">Mark as Confidential</Label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sections" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Report Sections</Label>
                  <Badge variant="outline">{getSelectedSectionsCount()} sections selected</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="personalInfo"
                        checked={reportConfig.sections.personalInfo}
                        onCheckedChange={(checked) => handleSectionToggle("personalInfo", checked)}
                      />
                      <Label htmlFor="personalInfo" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Personal Information
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="classPerformance"
                        checked={reportConfig.sections.classPerformance}
                        onCheckedChange={(checked) => handleSectionToggle("classPerformance", checked)}
                      />
                      <Label htmlFor="classPerformance" className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Class Performance
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="studentFeedback"
                        checked={reportConfig.sections.studentFeedback}
                        onCheckedChange={(checked) => handleSectionToggle("studentFeedback", checked)}
                      />
                      <Label htmlFor="studentFeedback">Student Feedback</Label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="attendance"
                        checked={reportConfig.sections.attendance}
                        onCheckedChange={(checked) => handleSectionToggle("attendance", checked)}
                      />
                      <Label htmlFor="attendance" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Attendance Record
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="achievements"
                        checked={reportConfig.sections.achievements}
                        onCheckedChange={(checked) => handleSectionToggle("achievements", checked)}
                      />
                      <Label htmlFor="achievements" className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Achievements
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recommendations"
                        checked={reportConfig.sections.recommendations}
                        onCheckedChange={(checked) => handleSectionToggle("recommendations", checked)}
                      />
                      <Label htmlFor="recommendations">Recommendations</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Additional Notes</Label>
                  <Textarea
                    value={reportConfig.notes}
                    onChange={(e) => setReportConfig({ ...reportConfig, notes: e.target.value })}
                    placeholder="Add any specific notes or requirements for this report..."
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Delivery Method</Label>
                  <Select
                    value={reportConfig.delivery.method}
                    onValueChange={(value) => handleDeliveryChange("method", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="download">Download Immediately</SelectItem>
                      <SelectItem value="email">Send via Email</SelectItem>
                      <SelectItem value="both">Download and Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(reportConfig.delivery.method === "email" || reportConfig.delivery.method === "both") && (
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={reportConfig.delivery.email}
                      onChange={(e) => handleDeliveryChange("email", e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Schedule</Label>
                  <Select
                    value={reportConfig.delivery.schedule}
                    onValueChange={(value) => handleDeliveryChange("schedule", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Generate Immediately</SelectItem>
                      <SelectItem value="scheduled">Schedule for Later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {reportConfig.delivery.schedule === "scheduled" && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={reportConfig.delivery.date}
                        onChange={(e) => handleDeliveryChange("date", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={reportConfig.delivery.time}
                        onChange={(e) => handleDeliveryChange("time", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Summary */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="font-medium text-green-800">Report Summary</p>
                    <div className="text-sm text-green-600 space-y-1">
                      <p>
                        Type: {reportTypes.find((t) => t.value === reportConfig.type)?.label} (
                        {reportConfig.format.toUpperCase()})
                      </p>
                      <p>Period: {periods.find((p) => p.value === reportConfig.period)?.label}</p>
                      <p>Sections: {getSelectedSectionsCount()} selected</p>
                      <p>
                        Delivery: {reportConfig.delivery.method}{" "}
                        {reportConfig.delivery.schedule === "scheduled" &&
                          `on ${reportConfig.delivery.date} at ${reportConfig.delivery.time}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleGenerate}>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

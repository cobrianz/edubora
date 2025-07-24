"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Download, FileText, BarChart3, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AssessmentReportModal({ onClose }) {
  const { toast } = useToast()
  const [reportConfig, setReportConfig] = useState({
    reportType: "comprehensive",
    dateRange: "current-term",
    classes: [],
    subjects: [],
    assessmentTypes: [],
    includeCharts: true,
    includeCompetencies: true,
    includeRubrics: true,
    includeComments: true,
    format: "pdf",
  })

  const reportTypes = [
    {
      value: "comprehensive",
      label: "Comprehensive Assessment Report",
      description: "Complete analysis with all metrics",
    },
    { value: "performance", label: "Performance Summary", description: "Focus on scores and grades" },
    { value: "competency", label: "Competency Analysis", description: "CBC competency development tracking" },
    { value: "individual", label: "Individual Student Reports", description: "Detailed reports per student" },
    { value: "class", label: "Class Performance Report", description: "Class-level analysis and comparison" },
  ]

  const dateRanges = [
    { value: "current-term", label: "Current Term" },
    { value: "last-term", label: "Last Term" },
    { value: "current-year", label: "Current Academic Year" },
    { value: "custom", label: "Custom Date Range" },
  ]

  const classes = ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 7B", "Grade 8A", "Grade 8B", "Grade 9A", "Grade 9B"]

  const subjects = [
    "Mathematics",
    "English",
    "Kiswahili",
    "Science",
    "Social Studies",
    "Religious Education",
    "Physical Education",
    "Art & Craft",
  ]

  const assessmentTypes = [
    "Formative Assessment",
    "Summative Assessment",
    "Diagnostic Assessment",
    "Performance Task",
    "Project",
    "Practical",
  ]

  const handleConfigChange = (field, value) => {
    setReportConfig((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field, value) => {
    setReportConfig((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation Started",
      description: "Your assessment report is being generated. You'll receive a notification when it's ready.",
    })

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Generated Successfully",
        description: "Your assessment report has been generated and is ready for download.",
      })
    }, 3000)

    onClose()
  }

  const getSelectedCount = (array) => array.length

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Assessment Report
            </CardTitle>
            <CardDescription>Create comprehensive assessment reports with analytics and insights</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="type" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="type">Report Type</TabsTrigger>
              <TabsTrigger value="filters">Filters</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <TabsContent value="type" className="space-y-4">
              <div>
                <h4 className="font-medium mb-4">Select Report Type</h4>
                <div className="grid gap-4">
                  {reportTypes.map((type) => (
                    <Card
                      key={type.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        reportConfig.reportType === type.value ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950" : ""
                      }`}
                      onClick={() => handleConfigChange("reportType", type.value)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              reportConfig.reportType === type.value ? "bg-blue-500 border-blue-500" : "border-gray-300"
                            }`}
                          />
                          <div>
                            <h5 className="font-medium">{type.label}</h5>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="filters" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Date Range</Label>
                    <Select
                      value={reportConfig.dateRange}
                      onValueChange={(value) => handleConfigChange("dateRange", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dateRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {reportConfig.dateRange === "custom" && (
                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <Label>Start Date</Label>
                        <Input type="date" className="mt-1" />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input type="date" className="mt-1" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-base font-medium">Output Format</Label>
                  <Select value={reportConfig.format} onValueChange={(value) => handleConfigChange("format", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV Data</SelectItem>
                      <SelectItem value="html">HTML Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium">Classes</Label>
                    <Badge variant="outline">{getSelectedCount(reportConfig.classes)} selected</Badge>
                  </div>
                  <div className="grid gap-2 md:grid-cols-4">
                    {classes.map((className) => (
                      <div key={className} className="flex items-center space-x-2">
                        <Checkbox
                          id={`class-${className}`}
                          checked={reportConfig.classes.includes(className)}
                          onCheckedChange={() => handleArrayToggle("classes", className)}
                        />
                        <Label htmlFor={`class-${className}`} className="text-sm">
                          {className}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium">Subjects</Label>
                    <Badge variant="outline">{getSelectedCount(reportConfig.subjects)} selected</Badge>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={`subject-${subject}`}
                          checked={reportConfig.subjects.includes(subject)}
                          onCheckedChange={() => handleArrayToggle("subjects", subject)}
                        />
                        <Label htmlFor={`subject-${subject}`} className="text-sm">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-medium">Assessment Types</Label>
                    <Badge variant="outline">{getSelectedCount(reportConfig.assessmentTypes)} selected</Badge>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    {assessmentTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={reportConfig.assessmentTypes.includes(type)}
                          onCheckedChange={() => handleArrayToggle("assessmentTypes", type)}
                        />
                        <Label htmlFor={`type-${type}`} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="options" className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Report Content Options</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Include Charts and Graphs</h5>
                      <p className="text-sm text-muted-foreground">Add visual analytics and performance charts</p>
                    </div>
                    <Checkbox
                      checked={reportConfig.includeCharts}
                      onCheckedChange={(checked) => handleConfigChange("includeCharts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">CBC Competency Analysis</h5>
                      <p className="text-sm text-muted-foreground">Include competency development tracking</p>
                    </div>
                    <Checkbox
                      checked={reportConfig.includeCompetencies}
                      onCheckedChange={(checked) => handleConfigChange("includeCompetencies", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Rubric Breakdown</h5>
                      <p className="text-sm text-muted-foreground">Show detailed rubric scoring analysis</p>
                    </div>
                    <Checkbox
                      checked={reportConfig.includeRubrics}
                      onCheckedChange={(checked) => handleConfigChange("includeRubrics", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Teacher Comments</h5>
                      <p className="text-sm text-muted-foreground">Include qualitative feedback and observations</p>
                    </div>
                    <Checkbox
                      checked={reportConfig.includeComments}
                      onCheckedChange={(checked) => handleConfigChange("includeComments", checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Report Configuration Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Report Type:</span>
                        <p className="font-medium">
                          {reportTypes.find((t) => t.value === reportConfig.reportType)?.label}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Date Range:</span>
                        <p className="font-medium">
                          {dateRanges.find((d) => d.value === reportConfig.dateRange)?.label}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Format:</span>
                        <p className="font-medium">{reportConfig.format.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Classes:</span>
                        <p className="font-medium">
                          {reportConfig.classes.length === 0
                            ? "All Classes"
                            : `${reportConfig.classes.length} selected`}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Subjects:</span>
                        <p className="font-medium">
                          {reportConfig.subjects.length === 0
                            ? "All Subjects"
                            : `${reportConfig.subjects.length} selected`}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Assessment Types:</span>
                        <p className="font-medium">
                          {reportConfig.assessmentTypes.length === 0
                            ? "All Types"
                            : `${reportConfig.assessmentTypes.length} selected`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h5 className="font-medium mb-3">Content Options</h5>
                    <div className="flex flex-wrap gap-2">
                      {reportConfig.includeCharts && <Badge variant="secondary">Charts & Graphs</Badge>}
                      {reportConfig.includeCompetencies && <Badge variant="secondary">CBC Competencies</Badge>}
                      {reportConfig.includeRubrics && <Badge variant="secondary">Rubric Analysis</Badge>}
                      {reportConfig.includeComments && <Badge variant="secondary">Teacher Comments</Badge>}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800 dark:text-blue-200">Estimated Report Size</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Based on your selections, this report will include approximately 15-25 pages with detailed
                      analytics, charts, and student performance data.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleGenerateReport} className="transition-all duration-300 hover:scale-105">
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { X, FileText, Download, BarChart3, Users, TrendingUp, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GenerateReportModal({ onClose, onGenerate }) {
  const { toast } = useToast()
  const [reportType, setReportType] = useState("academic")
  const [reportName, setReportName] = useState("")
  const [dateRange, setDateRange] = useState("current_term")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedGrades, setSelectedGrades] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [format, setFormat] = useState("pdf")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeDetails, setIncludeDetails] = useState(true)
  const [includeInsights, setIncludeInsights] = useState(true)
  const [customNotes, setCustomNotes] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState("")

  const reportTypes = [
    {
      value: "academic",
      label: "Academic Performance",
      description: "Student grades, performance metrics, and academic analysis",
      icon: BarChart3,
    },
    {
      value: "attendance",
      label: "Attendance Report",
      description: "Student attendance patterns and analysis",
      icon: Users,
    },
    {
      value: "financial",
      label: "Financial Report",
      description: "Revenue, expenses, and financial performance",
      icon: TrendingUp,
    },
    {
      value: "library",
      label: "Library Report",
      description: "Book borrowing statistics and library usage",
      icon: FileText,
    },
    {
      value: "transport",
      label: "Transport Report",
      description: "Bus utilization and transport efficiency",
      icon: Users,
    },
    {
      value: "comprehensive",
      label: "Comprehensive Report",
      description: "All-in-one report covering all aspects",
      icon: FileText,
    },
  ]

  const dateRanges = [
    { value: "current_term", label: "Current Term" },
    { value: "last_term", label: "Last Term" },
    { value: "current_year", label: "Current Academic Year" },
    { value: "last_month", label: "Last Month" },
    { value: "last_quarter", label: "Last Quarter" },
    { value: "custom", label: "Custom Date Range" },
  ]

  const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]

  const subjects = [
    "Mathematics",
    "English",
    "Kiswahili",
    "Science",
    "Social Studies",
    "Religious Education",
    "Physical Education",
    "Art & Craft",
    "Music",
  ]

  const handleGradeToggle = (grade, checked) => {
    if (checked) {
      setSelectedGrades([...selectedGrades, grade])
    } else {
      setSelectedGrades(selectedGrades.filter((g) => g !== grade))
    }
  }

  const handleSubjectToggle = (subject, checked) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subject])
    } else {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject))
    }
  }

  const handleSelectAllGrades = (checked) => {
    if (checked) {
      setSelectedGrades([...grades])
    } else {
      setSelectedGrades([])
    }
  }

  const handleSelectAllSubjects = (checked) => {
    if (checked) {
      setSelectedSubjects([...subjects])
    } else {
      setSelectedSubjects([])
    }
  }

  const simulateGeneration = async () => {
    const steps = [
      { step: "Collecting data...", progress: 20 },
      { step: "Processing analytics...", progress: 40 },
      { step: "Generating charts...", progress: 60 },
      { step: "Compiling report...", progress: 80 },
      { step: "Finalizing document...", progress: 100 },
    ]

    for (const { step, progress } of steps) {
      setGenerationStep(step)
      setGenerationProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  const handleGenerate = async () => {
    if (!reportName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a report name",
        variant: "destructive",
      })
      return
    }

    if (dateRange === "custom" && (!startDate || !endDate)) {
      toast({
        title: "Missing Date Range",
        description: "Please select start and end dates for custom range",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationStep("Initializing...")

    try {
      await simulateGeneration()

      const reportData = {
        id: `RPT${Date.now()}`,
        type: reportType,
        name: reportName,
        dateRange,
        startDate: dateRange === "custom" ? startDate : null,
        endDate: dateRange === "custom" ? endDate : null,
        selectedGrades: reportType === "academic" ? selectedGrades : null,
        selectedSubjects: reportType === "academic" ? selectedSubjects : null,
        format,
        options: {
          includeCharts,
          includeDetails,
          includeInsights,
        },
        customNotes,
        generatedDate: new Date().toISOString(),
        status: "Generated",
      }

      onGenerate(reportData)

      toast({
        title: "Report Generated Successfully",
        description: `${reportName} has been generated and is ready for download`,
      })

      setIsGenerating(false)
    } catch (error) {
      setIsGenerating(false)
      toast({
        title: "Generation Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive",
      })
    }
  }

  const selectedReportType = reportTypes.find((r) => r.value === reportType)
  const ReportIcon = selectedReportType?.icon || FileText

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Report
            </CardTitle>
            <CardDescription>Create comprehensive reports with customizable options</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isGenerating}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {isGenerating && (
            <div className="p-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <h4 className="font-medium">Generating Report...</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{generationStep}</span>
                  <span>{generationProgress}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>
            </div>
          )}

          {!isGenerating && (
            <>
              {/* Report Type Selection */}
              <div className="space-y-4">
                <h4 className="font-medium">Report Type</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  {reportTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <div
                        key={type.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          reportType === type.value
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setReportType(type.value)}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="h-5 w-5 mt-0.5 text-blue-600" />
                          <div>
                            <h5 className="font-medium">{type.label}</h5>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Report Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium">Report Configuration</h4>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="reportName">Report Name</Label>
                    <Input
                      id="reportName"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      placeholder={`${selectedReportType?.label} - ${new Date().toLocaleDateString()}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Output Format</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                        <SelectItem value="both">Both PDF & Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="dateRange">Date Range</Label>
                    <Select value={dateRange} onValueChange={setDateRange}>
                      <SelectTrigger>
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

                  {dateRange === "custom" && (
                    <div className="grid gap-2 grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Academic Report Specific Options */}
              {reportType === "academic" && (
                <div className="space-y-4">
                  <h4 className="font-medium">Academic Filters</h4>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Grades ({selectedGrades.length})</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="selectAllGrades"
                            checked={selectedGrades.length === grades.length}
                            onCheckedChange={handleSelectAllGrades}
                          />
                          <Label htmlFor="selectAllGrades" className="text-sm">
                            Select All
                          </Label>
                        </div>
                      </div>
                      <div className="grid gap-2 grid-cols-2">
                        {grades.map((grade) => (
                          <div key={grade} className="flex items-center space-x-2">
                            <Checkbox
                              id={`grade-${grade}`}
                              checked={selectedGrades.includes(grade)}
                              onCheckedChange={(checked) => handleGradeToggle(grade, checked)}
                            />
                            <Label htmlFor={`grade-${grade}`} className="text-sm">
                              {grade}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Subjects ({selectedSubjects.length})</Label>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="selectAllSubjects"
                            checked={selectedSubjects.length === subjects.length}
                            onCheckedChange={handleSelectAllSubjects}
                          />
                          <Label htmlFor="selectAllSubjects" className="text-sm">
                            Select All
                          </Label>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        {subjects.map((subject) => (
                          <div key={subject} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subject-${subject}`}
                              checked={selectedSubjects.includes(subject)}
                              onCheckedChange={(checked) => handleSubjectToggle(subject, checked)}
                            />
                            <Label htmlFor={`subject-${subject}`} className="text-sm">
                              {subject}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Report Options */}
              <div className="space-y-4">
                <h4 className="font-medium">Report Options</h4>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label>Include Sections</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="includeCharts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
                        <Label htmlFor="includeCharts" className="text-sm">
                          Charts & Visualizations
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="includeDetails" checked={includeDetails} onCheckedChange={setIncludeDetails} />
                        <Label htmlFor="includeDetails" className="text-sm">
                          Detailed Data Tables
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="includeInsights" checked={includeInsights} onCheckedChange={setIncludeInsights} />
                        <Label htmlFor="includeInsights" className="text-sm">
                          Insights & Recommendations
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customNotes">Custom Notes (Optional)</Label>
                    <Textarea
                      id="customNotes"
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="Add any custom notes or instructions for this report..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Report Preview */}
              {reportName && (
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <ReportIcon className="h-4 w-4" />
                    Report Preview
                  </h4>
                  <div className="grid gap-2 md:grid-cols-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">{reportName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Type:</span>
                      <p className="font-medium">{selectedReportType?.label}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Period:</span>
                      <p className="font-medium">
                        {dateRange === "custom" && startDate && endDate
                          ? `${startDate} to ${endDate}`
                          : dateRanges.find((r) => r.value === dateRange)?.label}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Format:</span>
                      <p className="font-medium">{format.toUpperCase()}</p>
                    </div>
                    {reportType === "academic" && selectedGrades.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Grades:</span>
                        <p className="font-medium">{selectedGrades.length} selected</p>
                      </div>
                    )}
                    {reportType === "academic" && selectedSubjects.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Subjects:</span>
                        <p className="font-medium">{selectedSubjects.length} selected</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isGenerating}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} disabled={!reportName || isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Mail, Eye, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StudentReportModal({ student, onClose, onGenerate }) {
  const { toast } = useToast()
  const [reportType, setReportType] = useState("comprehensive")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [includeSections, setIncludeSections] = useState({
    personal: true,
    academic: true,
    attendance: true,
    assignments: true,
    fees: true,
    health: false,
    behavior: true,
    extracurricular: false,
  })
  const [dateRange, setDateRange] = useState("current_term")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")
  const [emailRecipients, setEmailRecipients] = useState([])
  const [additionalComments, setAdditionalComments] = useState("")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeRecommendations, setIncludeRecommendations] = useState(true)

  const reportTypes = [
    {
      value: "comprehensive",
      label: "Comprehensive Report",
      description: "Complete student profile with all sections",
    },
    { value: "academic", label: "Academic Report", description: "Focus on academic performance and grades" },
    { value: "attendance", label: "Attendance Report", description: "Detailed attendance analysis" },
    { value: "behavioral", label: "Behavioral Report", description: "Behavior and discipline records" },
    { value: "progress", label: "Progress Report", description: "Term-by-term progress tracking" },
    { value: "custom", label: "Custom Report", description: "Select specific sections to include" },
  ]

  const reportFormats = [
    { value: "pdf", label: "PDF Document", icon: "📄" },
    { value: "excel", label: "Excel Spreadsheet", icon: "📊" },
    { value: "word", label: "Word Document", icon: "📝" },
    { value: "html", label: "HTML Report", icon: "🌐" },
  ]

  const dateRanges = [
    { value: "current_term", label: "Current Term" },
    { value: "current_year", label: "Current Academic Year" },
    { value: "last_term", label: "Last Term" },
    { value: "last_year", label: "Last Academic Year" },
    { value: "all_time", label: "All Time" },
    { value: "custom", label: "Custom Date Range" },
  ]

  const emailOptions = [
    { id: "student", label: "Student", email: "sarah.mwangi@student.school.com" },
    { id: "father", label: "Father", email: "john.mwangi@email.com" },
    { id: "mother", label: "Mother", email: "grace.mwangi@email.com" },
    { id: "class_teacher", label: "Class Teacher", email: "teacher@school.com" },
    { id: "head_teacher", label: "Head Teacher", email: "head@school.com" },
  ]

  const handleSectionToggle = (section, checked) => {
    setIncludeSections((prev) => ({
      ...prev,
      [section]: checked,
    }))
  }

  const handleEmailRecipientToggle = (recipientId, checked) => {
    if (checked) {
      const recipient = emailOptions.find((r) => r.id === recipientId)
      if (recipient && !emailRecipients.find((r) => r.id === recipientId)) {
        setEmailRecipients([...emailRecipients, recipient])
      }
    } else {
      setEmailRecipients(emailRecipients.filter((r) => r.id !== recipientId))
    }
  }

  const handleGenerateReport = () => {
    const reportData = {
      student,
      type: reportType,
      format: reportFormat,
      sections: includeSections,
      dateRange,
      customStartDate: dateRange === "custom" ? customStartDate : null,
      customEndDate: dateRange === "custom" ? customEndDate : null,
      emailRecipients,
      additionalComments,
      includeCharts,
      includeRecommendations,
    }

    if (onGenerate) {
      onGenerate(reportData)
    }

    toast({
      title: "Report Generated",
      description: `${reportType} report for ${student?.name || "student"} has been generated`,
    })

    onClose()
  }

  const handlePreviewReport = () => {
    toast({
      title: "Preview Generated",
      description: "Report preview is being prepared...",
    })
  }

  const getSelectedSectionsCount = () => {
    return Object.values(includeSections).filter(Boolean).length
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Student Report
          </DialogTitle>
          <DialogDescription>Create a comprehensive report for {student?.name || "the student"}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Setup</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Report Type</CardTitle>
                  <CardDescription>Choose the type of report to generate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reportTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-3 border rounded cursor-pointer transition-colors ${
                          reportType === type.value ? "border-blue-500 bg-blue-50" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setReportType(type.value)}
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="reportType"
                            value={type.value}
                            checked={reportType === type.value}
                            onChange={() => setReportType(type.value)}
                          />
                          <div>
                            <p className="font-medium text-sm">{type.label}</p>
                            <p className="text-xs text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Format & Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="format">Report Format</Label>
                      <Select value={reportFormat} onValueChange={setReportFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportFormats.map((format) => (
                            <SelectItem key={format.value} value={format.value}>
                              {format.icon} {format.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="dateRange">Date Range</Label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
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
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={customStartDate}
                            onChange={(e) => setCustomStartDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={customEndDate}
                            onChange={(e) => setCustomEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="includeCharts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
                        <Label htmlFor="includeCharts" className="text-sm">
                          Include Charts & Graphs
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="includeRecommendations"
                          checked={includeRecommendations}
                          onCheckedChange={setIncludeRecommendations}
                        />
                        <Label htmlFor="includeRecommendations" className="text-sm">
                          Include Recommendations
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Student Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Name:</span>
                      <span className="text-sm">{student?.name || "Sarah Mwangi"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Class:</span>
                      <span className="text-sm">{student?.class || "Grade 7A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Admission No:</span>
                      <span className="text-sm">{student?.admissionNo || "ADM001"}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Report Sections</span>
                  <Badge variant="secondary">{getSelectedSectionsCount()} selected</Badge>
                </CardTitle>
                <CardDescription>Choose which sections to include in the report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries({
                    personal: "Personal Information",
                    academic: "Academic Performance",
                    attendance: "Attendance Records",
                    assignments: "Assignment History",
                    fees: "Fee Information",
                    health: "Health Records",
                    behavior: "Behavioral Records",
                    extracurricular: "Extracurricular Activities",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2 p-3 border rounded">
                      <Checkbox
                        id={key}
                        checked={includeSections[key]}
                        onCheckedChange={(checked) => handleSectionToggle(key, checked)}
                      />
                      <Label htmlFor={key} className="text-sm font-medium">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <Label htmlFor="comments">Additional Comments</Label>
                  <Textarea
                    id="comments"
                    value={additionalComments}
                    onChange={(e) => setAdditionalComments(e.target.value)}
                    placeholder="Add any additional comments or notes for the report..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Recipients
                  </CardTitle>
                  <CardDescription>Select who should receive the report via email</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {emailOptions.map((option) => (
                      <div key={option.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={emailRecipients.some((r) => r.id === option.id)}
                            onCheckedChange={(checked) => handleEmailRecipientToggle(option.id, checked)}
                          />
                          <div>
                            <Label htmlFor={option.id} className="text-sm font-medium">
                              {option.label}
                            </Label>
                            <p className="text-xs text-muted-foreground">{option.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {emailRecipients.length > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-800">
                        Report will be sent to {emailRecipients.length} recipient(s)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        <span className="text-sm">Download Report</span>
                      </div>
                      <Badge variant="default">Primary</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">Email Report</span>
                      </div>
                      <Badge variant="secondary">Optional</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span className="text-sm">Portal Notification</span>
                      </div>
                      <Badge variant="secondary">Optional</Badge>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-800">
                      The report will be available for download immediately and sent via email if recipients are
                      selected.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Report Preview
                </CardTitle>
                <CardDescription>Preview of the report configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Report Type:</p>
                      <p className="text-sm text-muted-foreground capitalize">{reportType.replace("_", " ")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Format:</p>
                      <p className="text-sm text-muted-foreground uppercase">{reportFormat}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Date Range:</p>
                      <p className="text-sm text-muted-foreground">
                        {dateRange === "custom"
                          ? `${customStartDate} to ${customEndDate}`
                          : dateRange.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sections Included:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Object.entries(includeSections)
                          .filter(([_, included]) => included)
                          .map(([section, _]) => (
                            <Badge key={section} variant="outline" className="text-xs">
                              {section.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Email Recipients:</p>
                      {emailRecipients.length > 0 ? (
                        <div className="space-y-1">
                          {emailRecipients.map((recipient) => (
                            <p key={recipient.id} className="text-sm text-muted-foreground">
                              • {recipient.label} ({recipient.email})
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No email recipients selected</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Additional Options:</p>
                      <div className="space-y-1">
                        {includeCharts && <p className="text-sm text-muted-foreground">• Include charts and graphs</p>}
                        {includeRecommendations && (
                          <p className="text-sm text-muted-foreground">• Include recommendations</p>
                        )}
                        {additionalComments && (
                          <p className="text-sm text-muted-foreground">• Additional comments included</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-muted/50 rounded">
                  <h4 className="font-medium text-sm mb-2">Report Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    This {reportType.replace("_", " ")} report for {student?.name || "the student"} will include{" "}
                    {getSelectedSectionsCount()} sections and will be generated in {reportFormat.toUpperCase()} format.
                    {emailRecipients.length > 0 &&
                      ` The report will be sent to ${emailRecipients.length} recipient(s) via email.`}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" onClick={handlePreviewReport}>
                    <Eye className="mr-2 h-4 w-4" />
                    Generate Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

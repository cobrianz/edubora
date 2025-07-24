"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, Clock, Mail, Users, FileText, Bell } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ScheduleReportModal({ onClose, onSchedule }) {
  const { toast } = useToast()
  const [reportType, setReportType] = useState("academic")
  const [reportName, setReportName] = useState("")
  const [frequency, setFrequency] = useState("weekly")
  const [dayOfWeek, setDayOfWeek] = useState("monday")
  const [dayOfMonth, setDayOfMonth] = useState("1")
  const [time, setTime] = useState("09:00")
  const [recipients, setRecipients] = useState([])
  const [format, setFormat] = useState("pdf")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeDetails, setIncludeDetails] = useState(true)
  const [includeInsights, setIncludeInsights] = useState(true)
  const [autoEmail, setAutoEmail] = useState(true)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const reportTypes = [
    { value: "academic", label: "Academic Performance", description: "Student grades and performance metrics" },
    { value: "attendance", label: "Attendance Report", description: "Student attendance analysis" },
    { value: "financial", label: "Financial Report", description: "Revenue, expenses, and financial health" },
    { value: "library", label: "Library Report", description: "Book borrowing and library statistics" },
    { value: "transport", label: "Transport Report", description: "Bus utilization and transport metrics" },
    { value: "staff", label: "Staff Report", description: "Teacher performance and staff analytics" },
  ]

  const recipientOptions = [
    { id: "principal", name: "Principal", email: "principal@school.edu", role: "Administrator" },
    { id: "deputy", name: "Deputy Principal", email: "deputy@school.edu", role: "Administrator" },
    { id: "academic_director", name: "Academic Director", email: "academic@school.edu", role: "Academic" },
    { id: "finance_manager", name: "Finance Manager", email: "finance@school.edu", role: "Finance" },
    { id: "librarian", name: "Head Librarian", email: "librarian@school.edu", role: "Library" },
    { id: "transport_manager", name: "Transport Manager", email: "transport@school.edu", role: "Transport" },
    { id: "board_chair", name: "Board Chairperson", email: "board@school.edu", role: "Board" },
  ]

  const frequencies = [
    { value: "daily", label: "Daily", description: "Every day" },
    { value: "weekly", label: "Weekly", description: "Once per week" },
    { value: "monthly", label: "Monthly", description: "Once per month" },
    { value: "quarterly", label: "Quarterly", description: "Every 3 months" },
    { value: "termly", label: "Termly", description: "Each school term" },
  ]

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ]

  const handleRecipientToggle = (recipientId, checked) => {
    if (checked) {
      setRecipients([...recipients, recipientId])
    } else {
      setRecipients(recipients.filter((id) => id !== recipientId))
    }
  }

  const handleSelectAllRecipients = (checked) => {
    if (checked) {
      setRecipients(recipientOptions.map((r) => r.id))
    } else {
      setRecipients([])
    }
  }

  const handleSchedule = () => {
    if (!reportName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a report name",
        variant: "destructive",
      })
      return
    }

    if (recipients.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please select at least one recipient",
        variant: "destructive",
      })
      return
    }

    const scheduleData = {
      id: `SCH${Date.now()}`,
      reportType,
      reportName,
      frequency,
      dayOfWeek: frequency === "weekly" ? dayOfWeek : null,
      dayOfMonth: frequency === "monthly" ? dayOfMonth : null,
      time,
      recipients: recipients.map((id) => recipientOptions.find((r) => r.id === id)),
      format,
      options: {
        includeCharts,
        includeDetails,
        includeInsights,
      },
      autoEmail,
      startDate: startDate || new Date().toISOString().split("T")[0],
      endDate,
      status: "Active",
      createdDate: new Date().toISOString(),
      nextRun: calculateNextRun(),
    }

    onSchedule(scheduleData)
    toast({
      title: "Report Scheduled",
      description: `${reportName} has been scheduled successfully`,
    })
  }

  const calculateNextRun = () => {
    const now = new Date()
    const [hours, minutes] = time.split(":").map(Number)

    const nextRun = new Date()
    nextRun.setHours(hours, minutes, 0, 0)

    if (frequency === "daily") {
      if (nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 1)
      }
    } else if (frequency === "weekly") {
      const targetDay = daysOfWeek.findIndex((d) => d.value === dayOfWeek)
      const currentDay = nextRun.getDay()
      const daysUntilTarget = (targetDay - currentDay + 7) % 7

      if (daysUntilTarget === 0 && nextRun <= now) {
        nextRun.setDate(nextRun.getDate() + 7)
      } else {
        nextRun.setDate(nextRun.getDate() + daysUntilTarget)
      }
    } else if (frequency === "monthly") {
      nextRun.setDate(Number.parseInt(dayOfMonth))
      if (nextRun <= now) {
        nextRun.setMonth(nextRun.getMonth() + 1)
      }
    }

    return nextRun.toISOString()
  }

  const selectedReportType = reportTypes.find((r) => r.value === reportType)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Report
            </CardTitle>
            <CardDescription>Set up automated report generation and delivery</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Report Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Report Configuration
            </h4>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
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
                <Label htmlFor="reportName">Report Name</Label>
                <Input
                  id="reportName"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder={`${selectedReportType?.label} - Automated`}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
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

              <div className="space-y-2">
                <Label>Report Sections</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="includeCharts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
                    <Label htmlFor="includeCharts" className="text-sm">
                      Include Charts & Graphs
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="includeDetails" checked={includeDetails} onCheckedChange={setIncludeDetails} />
                    <Label htmlFor="includeDetails" className="text-sm">
                      Include Detailed Data
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="includeInsights" checked={includeInsights} onCheckedChange={setIncludeInsights} />
                    <Label htmlFor="includeInsights" className="text-sm">
                      Include Insights & Recommendations
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Schedule Configuration
            </h4>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencies.map((freq) => (
                      <SelectItem key={freq.value} value={freq.value}>
                        <div>
                          <div className="font-medium">{freq.label}</div>
                          <div className="text-xs text-muted-foreground">{freq.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {frequency === "weekly" && (
                <div className="space-y-2">
                  <Label htmlFor="dayOfWeek">Day of Week</Label>
                  <Select value={dayOfWeek} onValueChange={setDayOfWeek}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {frequency === "monthly" && (
                <div className="space-y-2">
                  <Label htmlFor="dayOfMonth">Day of Month</Label>
                  <Select value={dayOfMonth} onValueChange={setDayOfMonth}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Recipients */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Recipients ({recipients.length})
              </h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={recipients.length === recipientOptions.length}
                  onCheckedChange={handleSelectAllRecipients}
                />
                <Label htmlFor="selectAll" className="text-sm">
                  Select All
                </Label>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              {recipientOptions.map((recipient) => (
                <div key={recipient.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg border">
                  <Checkbox
                    id={`recipient-${recipient.id}`}
                    checked={recipients.includes(recipient.id)}
                    onCheckedChange={(checked) => handleRecipientToggle(recipient.id, checked)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{recipient.name}</p>
                        <p className="text-sm text-muted-foreground">{recipient.email}</p>
                      </div>
                      <Badge variant="outline">{recipient.role}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Options */}
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Delivery Options
            </h4>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="autoEmail" checked={autoEmail} onCheckedChange={setAutoEmail} />
                <Label htmlFor="autoEmail">Automatically email reports to recipients</Label>
              </div>
            </div>
          </div>

          {/* Schedule Preview */}
          {reportName && recipients.length > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-medium mb-2">Schedule Preview</h4>
              <div className="grid gap-2 md:grid-cols-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Report:</span>
                  <p className="font-medium">{reportName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="font-medium">{selectedReportType?.label}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Frequency:</span>
                  <p className="font-medium">
                    {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                    {frequency === "weekly" && ` (${dayOfWeek}s)`}
                    {frequency === "monthly" &&
                      ` (${dayOfMonth}${getDaySuffix(Number.parseInt(dayOfMonth))} of each month)`}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Time:</span>
                  <p className="font-medium">{time}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Recipients:</span>
                  <p className="font-medium">{recipients.length} selected</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Run:</span>
                  <p className="font-medium">{new Date(calculateNextRun()).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSchedule} disabled={!reportName || recipients.length === 0}>
              <Bell className="mr-2 h-4 w-4" />
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th"
  }
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

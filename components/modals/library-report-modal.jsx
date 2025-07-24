"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { X, FileText, Download, Calendar, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LibraryReportModal({ onClose, onGenerate }) {
  const { toast } = useToast()
  const [reportType, setReportType] = useState("inventory")
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  })
  const [format, setFormat] = useState("pdf")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedMetrics, setSelectedMetrics] = useState([])

  const reportTypes = [
    { value: "inventory", label: "Book Inventory Report", description: "Complete list of all books in the library" },
    { value: "borrowing", label: "Borrowing Statistics", description: "Analysis of book borrowing patterns" },
    { value: "overdue", label: "Overdue Books Report", description: "List of overdue books and students" },
    { value: "popular", label: "Popular Books Report", description: "Most borrowed and requested books" },
    { value: "financial", label: "Financial Report", description: "Library revenue and expenses" },
    { value: "student", label: "Student Activity Report", description: "Individual student borrowing history" },
    { value: "comprehensive", label: "Comprehensive Report", description: "All library statistics and data" },
  ]

  const categories = [
    "Textbook",
    "Reference",
    "Fiction",
    "Non-Fiction",
    "Science",
    "Mathematics",
    "History",
    "Literature",
    "Biography",
    "Children's Books",
  ]

  const metrics = [
    "Total Books",
    "Books Borrowed",
    "Available Books",
    "Overdue Books",
    "New Acquisitions",
    "Popular Categories",
    "Student Participation",
    "Revenue Generated",
  ]

  const formats = [
    { value: "pdf", label: "PDF Document" },
    { value: "excel", label: "Excel Spreadsheet" },
    { value: "csv", label: "CSV File" },
    { value: "word", label: "Word Document" },
  ]

  const handleCategoryChange = (category, checked) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const handleMetricChange = (metric, checked) => {
    if (checked) {
      setSelectedMetrics([...selectedMetrics, metric])
    } else {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric))
    }
  }

  const handleGenerate = () => {
    const reportData = {
      type: reportType,
      dateRange,
      format,
      includeCharts,
      categories: selectedCategories,
      metrics: selectedMetrics,
      generatedDate: new Date().toISOString(),
    }

    onGenerate(reportData)
    toast({
      title: "Report Generated",
      description: `${reportTypes.find((r) => r.value === reportType)?.label} is being prepared for download`,
    })
  }

  const selectedReportType = reportTypes.find((r) => r.value === reportType)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Library Report
            </CardTitle>
            <CardDescription>Create comprehensive library reports and analytics</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Report Type Selection */}
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
            {selectedReportType && <p className="text-sm text-muted-foreground">{selectedReportType.description}</p>}
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <DatePickerWithRange date={dateRange} onDateChange={setDateRange} className="w-full" />
            </div>
          </div>

          {/* Format Selection */}
          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formats.map((fmt) => (
                  <SelectItem key={fmt.value} value={fmt.value}>
                    {fmt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Include Charts */}
          <div className="flex items-center space-x-2">
            <Checkbox id="includeCharts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
            <Label htmlFor="includeCharts" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Include Charts and Graphs
            </Label>
          </div>

          {/* Category Filter */}
          {(reportType === "inventory" || reportType === "borrowing" || reportType === "comprehensive") && (
            <div className="space-y-3">
              <Label>Book Categories (Optional)</Label>
              <div className="grid gap-2 md:grid-cols-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Leave empty to include all categories</p>
            </div>
          )}

          {/* Metrics Selection */}
          {reportType === "comprehensive" && (
            <div className="space-y-3">
              <Label>Metrics to Include</Label>
              <div className="grid gap-2 md:grid-cols-2">
                {metrics.map((metric) => (
                  <div key={metric} className="flex items-center space-x-2">
                    <Checkbox
                      id={`metric-${metric}`}
                      checked={selectedMetrics.includes(metric)}
                      onCheckedChange={(checked) => handleMetricChange(metric, checked)}
                    />
                    <Label htmlFor={`metric-${metric}`} className="text-sm">
                      {metric}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report Preview */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Report Preview</h4>
            <div className="text-sm space-y-1">
              <p>
                <strong>Type:</strong> {selectedReportType?.label}
              </p>
              <p>
                <strong>Period:</strong> {dateRange.from?.toLocaleDateString()} - {dateRange.to?.toLocaleDateString()}
              </p>
              <p>
                <strong>Format:</strong> {formats.find((f) => f.value === format)?.label}
              </p>
              <p>
                <strong>Charts:</strong> {includeCharts ? "Included" : "Not included"}
              </p>
              {selectedCategories.length > 0 && (
                <p>
                  <strong>Categories:</strong> {selectedCategories.join(", ")}
                </p>
              )}
              {selectedMetrics.length > 0 && (
                <p>
                  <strong>Metrics:</strong> {selectedMetrics.length} selected
                </p>
              )}
            </div>
          </div>

          {/* Report Sections Preview */}
          <div className="space-y-3">
            <Label>Report Will Include:</Label>
            <div className="grid gap-2 text-sm">
              {reportType === "inventory" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Complete book inventory list</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Books by category and condition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>Availability statistics</span>
                  </div>
                </>
              )}

              {reportType === "borrowing" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Borrowing trends and patterns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Most active students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Peak borrowing periods</span>
                  </div>
                </>
              )}

              {reportType === "overdue" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>List of overdue books</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Student contact information</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span>Late fee calculations</span>
                  </div>
                </>
              )}

              {reportType === "popular" && (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Most borrowed books</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Popular categories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Reading preferences</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
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

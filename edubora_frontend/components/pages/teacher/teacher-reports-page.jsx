"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, Users, GraduationCap, ClipboardList } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import GenerateReportModal from "@/components/modals/generate-report-modal"
import ViewReportModal from "@/components/modals/view-report-modal"

export default function TeacherReportsPage() {
  const { toast } = useToast()
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [showGenerateReportModal, setShowGenerateReportModal] = useState(false)
  const [showViewReportModal, setShowViewReportModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)

  const classes = [
    { value: "all", label: "All Classes" },
    { value: "grade-7a", label: "Grade 7A" },
    { value: "grade-8b", label: "Grade 8B" },
  ]

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "mathematics", label: "Mathematics" },
    { value: "english", label: "English" },
  ]

  const reportCategories = [
    {
      title: "Student Performance Reports",
      icon: GraduationCap,
      reports: [
        {
          name: "Class Performance Summary",
          description: "Overall performance analysis for your classes",
          lastGenerated: "2024-07-15",
          status: "Ready",
          type: "performance-summary",
        },
        {
          name: "Individual Student Progress",
          description: "Detailed progress reports for each student",
          lastGenerated: "2024-07-12",
          status: "Ready",
          type: "student-progress",
        },
        {
          name: "Subject-wise Analysis",
          description: "Performance breakdown by subject topics",
          lastGenerated: "2024-07-10",
          status: "Ready",
          type: "subject-analysis",
        },
      ],
    },
    {
      title: "Assessment Reports",
      icon: ClipboardList,
      reports: [
        {
          name: "Assessment Results Summary",
          description: "Summary of all assessments conducted",
          lastGenerated: "2024-07-14",
          status: "Ready",
          type: "assessment-summary",
        },
        {
          name: "Grade Distribution",
          description: "Distribution of grades across assessments",
          lastGenerated: "2024-07-13",
          status: "Ready",
          type: "grade-distribution",
        },
        {
          name: "Improvement Tracking",
          description: "Track student improvement over time",
          lastGenerated: "2024-07-11",
          status: "Ready",
          type: "improvement-tracking",
        },
      ],
    },
    {
      title: "Attendance Reports",
      icon: Users,
      reports: [
        {
          name: "Class Attendance Summary",
          description: "Attendance patterns for your classes",
          lastGenerated: "2024-07-16",
          status: "Ready",
          type: "attendance-summary",
        },
        {
          name: "Absenteeism Report",
          description: "Students with attendance concerns",
          lastGenerated: "2024-07-15",
          status: "Ready",
          type: "absenteeism-report",
        },
      ],
    },
  ]

  const handleGenerateReport = (reportName, reportType) => {
    setSelectedReport({ name: reportName, type: reportType, class: selectedClass, subject: selectedSubject })
    setShowGenerateReportModal(true)
  }

  const handleDownloadReport = (report) => {
    setSelectedReport(report)
    setShowViewReportModal(true) // Using ViewReportModal to simulate download/view
    toast({
      title: "Download Started",
      description: `${report.name} download has started`,
    })
  }

  const onReportGenerated = (generatedReportData) => {
    toast({
      title: "Report Generated",
      description: `${generatedReportData.name} has been generated successfully.`,
    })
    setShowGenerateReportModal(false)
    // In a real app, you'd add this to a list of generated reports or trigger a download
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Reports</h1>
          <p className="text-muted-foreground">Generate and view reports for your classes</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls.value} value={cls.value}>
                  {cls.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Active classes</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground">Under your guidance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">B+</div>
            <p className="text-xs text-muted-foreground">Class average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        {reportCategories.map((category, categoryIndex) => (
          <TabsContent key={categoryIndex} value={category.title.toLowerCase().split(" ")[0]} className="space-y-4">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-5 w-5" />
                  {category.title}
                </CardTitle>
                <CardDescription>Generate and manage {category.title.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {category.reports.map((report, reportIndex) => (
                    <Card key={reportIndex} className="transition-all duration-300 hover:shadow-md">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{report.name}</CardTitle>
                            <CardDescription className="mt-1">{report.description}</CardDescription>
                          </div>
                          <Badge variant={report.status === "Ready" ? "default" : "secondary"}>{report.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">Last generated: {report.lastGenerated}</p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="transition-all duration-300 hover:scale-105 bg-transparent"
                              onClick={() => handleGenerateReport(report.name, report.type)}
                            >
                              <BarChart3 className="mr-1 h-3 w-3" />
                              Generate
                            </Button>
                            {report.status === "Ready" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="transition-all duration-300 hover:scale-105"
                                onClick={() => handleDownloadReport(report)}
                              >
                                <Download className="mr-1 h-3 w-3" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Generate Report Modal */}
      {showGenerateReportModal && (
        <GenerateReportModal
          reportType={selectedReport?.type}
          onClose={() => setShowGenerateReportModal(false)}
          onGenerate={onReportGenerated}
        />
      )}

      {/* View Report Modal (used for download simulation) */}
      {showViewReportModal && (
        <ViewReportModal reportData={selectedReport} onClose={() => setShowViewReportModal(false)} />
      )}
    </div>
  )
}

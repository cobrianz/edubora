"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, BarChart3, Download, Eye, Calendar } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import GradeDetailsModal from "@/components/modals/grade-details-modal" // Import the new modal

export default function StudentGradesPage() {
  const { toast } = useToast()
  const [showGradeDetailsModal, setShowGradeDetailsModal] = useState(false)
  const [selectedGradeDetails, setSelectedGradeDetails] = useState(null)

  const subjects = [
    {
      name: "Mathematics",
      teacher: "Mr. John Kamau",
      currentGrade: "A-",
      percentage: 85,
      feedback: "Good understanding of concepts, focus on problem-solving speed.",
      assessments: [
        { name: "Mid-term Exam", date: "2024-01-15", marks: "85/100", grade: "A-" },
        { name: "Quiz 1", date: "2024-01-10", marks: "18/20", grade: "A" },
        { name: "Assignment 1", date: "2024-01-05", marks: "45/50", grade: "A" },
      ],
    },
    {
      name: "English",
      teacher: "Ms. Sarah Wanjiku",
      currentGrade: "A",
      percentage: 92,
      feedback: "Excellent work! Well-structured essays and strong vocabulary.",
      assessments: [
        { name: "Essay Writing", date: "2024-01-14", marks: "23/25", grade: "A" },
        { name: "Reading Test", date: "2024-01-08", marks: "38/40", grade: "A" },
        { name: "Grammar Quiz", date: "2024-01-03", marks: "19/20", grade: "A" },
      ],
    },
    {
      name: "Science",
      teacher: "Mr. David Ochieng",
      currentGrade: "B+",
      percentage: 78,
      feedback: "Solid effort, but review lab procedures for better accuracy.",
      assessments: [
        { name: "Lab Report", date: "2024-01-12", marks: "35/50", grade: "B" },
        { name: "Theory Test", date: "2024-01-06", marks: "32/40", grade: "B+" },
        { name: "Project", date: "2024-01-01", marks: "42/50", grade: "A-" },
      ],
    },
    {
      name: "Kiswahili",
      teacher: "Ms. Grace Akinyi",
      currentGrade: "B",
      percentage: 75,
      feedback: "Good progress in spoken Kiswahili, practice more written composition.",
      assessments: [
        { name: "Insha", date: "2024-01-11", marks: "30/40", grade: "B" },
        { name: "Lugha", date: "2024-01-07", marks: "28/35", grade: "B+" },
        { name: "Mazungumzo", date: "2024-01-02", marks: "22/30", grade: "B" },
      ],
    },
  ]

  const termProgress = [
    { term: "Term 1", percentage: 88, grade: "A-", status: "Completed" },
    { term: "Term 2", percentage: 82, grade: "B+", status: "Current" },
    { term: "Term 3", percentage: 0, grade: "-", status: "Upcoming" },
  ]

  const handleViewDetails = (subject) => {
    setSelectedGradeDetails(subject)
    setShowGradeDetailsModal(true)
  }

  const handleDownloadReport = () => {
    toast({
      title: "Download Report",
      description: "Generating grade report...",
    })
  }

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    if (grade.startsWith("D")) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Grades</h1>
          <p className="text-muted-foreground">Track your academic performance</p>
        </div>
        <Button onClick={handleDownloadReport} className="transition-all duration-300 hover:scale-105">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">B+</div>
            <p className="text-xs text-muted-foreground">82.5% average</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Subject</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">English</div>
            <p className="text-xs text-muted-foreground">92% - Grade A</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assessments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+5%</div>
            <p className="text-xs text-muted-foreground">From last term</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Academic Performance</CardTitle>
          <CardDescription>Your grades and progress across all subjects</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="subjects" className="space-y-4">
            <TabsList>
              <TabsTrigger value="subjects">By Subject</TabsTrigger>
              <TabsTrigger value="assessments">Recent Assessments</TabsTrigger>
              <TabsTrigger value="progress">Term Progress</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="space-y-4">
              <div className="grid gap-4">
                {subjects.map((subject, index) => (
                  <Card key={index} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{subject.name}</h3>
                          <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getGradeColor(subject.currentGrade)}`}>
                            {subject.currentGrade}
                          </div>
                          <p className="text-sm text-muted-foreground">{subject.percentage}%</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{subject.percentage}%</span>
                        </div>
                        <Progress value={subject.percentage} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Recent Assessments:</h4>
                        {subject.assessments.slice(0, 3).map((assessment, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <span>{assessment.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">{assessment.date}</span>
                              <Badge variant="outline">{assessment.grade}</Badge>
                              <span className="font-medium">{assessment.marks}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(subject)}
                          className="transition-all duration-300 hover:scale-105"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View All Assessments
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assessments" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.flatMap((subject) =>
                    subject.assessments.map((assessment, idx) => (
                      <TableRow
                        key={`${subject.name}-${idx}`}
                        className="transition-all duration-200 hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{assessment.name}</TableCell>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell>{assessment.date}</TableCell>
                        <TableCell>{assessment.marks}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getGradeColor(assessment.grade)}>
                            {assessment.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="transition-all duration-300 hover:scale-105"
                            onClick={() => handleViewDetails({ ...subject, assessments: [assessment] })} // Pass specific assessment for view
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="progress" className="space-y-4">
              <div className="grid gap-4">
                {termProgress.map((term, index) => (
                  <Card key={index} className="transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{term.term}</h3>
                          <Badge variant={term.status === "Current" ? "default" : "secondary"}>{term.status}</Badge>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getGradeColor(term.grade)}`}>{term.grade}</div>
                          <p className="text-sm text-muted-foreground">{term.percentage}%</p>
                        </div>
                      </div>
                      {term.percentage > 0 && (
                        <div className="mt-4">
                          <Progress value={term.percentage} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="text-center py-8">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Performance analytics and trends will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {showGradeDetailsModal && (
        <GradeDetailsModal gradeDetails={selectedGradeDetails} onClose={() => setShowGradeDetailsModal(false)} />
      )}
    </div>
  )
}

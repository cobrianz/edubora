"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Trophy, Clock, TrendingUp, Eye, FileText, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import SubjectViewModal from "@/components/modals/subject-view-modal"
import NotesModal from "@/components/modals/notes-modal"

export default function StudentSubjectsPage() {
  const { toast } = useToast()
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      teacher: "Mr. John Kamau",
      grade: "A-",
      percentage: 85,
      attendance: 96,
      assignments: { completed: 8, total: 10 },
      nextClass: "Today 8:00 AM",
      color: "slate-blue",
      topics: ["Algebra", "Geometry", "Statistics"],
      description: "Comprehensive study of mathematical concepts including algebra, geometry, and statistics.",
      resources: ["Math Textbook PDF", "Algebra Practice Sheet"],
      notes: "Key formulas for quadratic equations. Remember to review trigonometry basics.",
    },
    {
      id: 2,
      name: "English",
      teacher: "Ms. Sarah Wanjiku",
      grade: "A",
      percentage: 92,
      attendance: 98,
      assignments: { completed: 9, total: 10 },
      nextClass: "Tomorrow 9:30 AM",
      color: "light-green",
      topics: ["Literature", "Grammar", "Writing"],
      description: "Focus on literary analysis, grammar rules, and essay writing techniques.",
      resources: ["English Literature Guide", "Grammar Handbook"],
      notes: "Essay structure: Introduction, Body Paragraphs (PEEL), Conclusion. Use varied vocabulary.",
    },
    {
      id: 3,
      name: "Science",
      teacher: "Mr. David Ochieng",
      grade: "B+",
      percentage: 78,
      attendance: 94,
      assignments: { completed: 7, total: 9 },
      nextClass: "Today 11:00 AM",
      color: "purple",
      topics: ["Biology", "Chemistry", "Physics"],
      description: "Exploration of biological processes, chemical reactions, and fundamental physics principles.",
      resources: ["Science Lab Manual", "Periodic Table"],
      notes: "Biology: Cell structure and function. Chemistry: Balancing equations. Physics: Newton's Laws.",
    },
    {
      id: 4,
      name: "Kiswahili",
      teacher: "Ms. Grace Akinyi",
      grade: "B",
      percentage: 75,
      attendance: 92,
      assignments: { completed: 6, total: 8 },
      nextClass: "Tomorrow 2:00 PM",
      color: "orange",
      topics: ["Lugha", "Fasihi", "Utungaji"],
      description: "Study of Kiswahili language, literature, and composition skills.",
      resources: ["Kamusi ya Kiswahili", "Fasihi Andishi Notes"],
      notes: "Insha: Structure and common errors. Lugha: Nouns and verbs agreement.",
    },
  ]

  const handleViewSubject = (subject) => {
    setSelectedSubject(subject)
    setShowSubjectModal(true)
  }

  const handleViewNotes = (subject) => {
    setSelectedSubject(subject)
    setShowNotesModal(true)
  }

  const getColorClasses = (color) => {
    const colors = {
      "slate-blue": "bg-blue-500/10 border-blue-500/20 text-blue-600",
      "light-green": "bg-green-500/10 border-green-500/20 text-green-600",
      purple: "bg-purple-500/10 border-purple-500/20 text-purple-600",
      orange: "bg-orange-500/10 border-orange-500/20 text-orange-600",
    }
    return colors[color] || colors["slate-blue"]
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Subjects</h1>
          <p className="text-muted-foreground">Track your academic progress across all subjects</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-blue-500/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-green-500/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Trophy className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">B+</div>
            <p className="text-xs text-muted-foreground">82.5% average</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">Overall attendance</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30/37</div>
            <p className="text-xs text-muted-foreground">81% completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {subjects.map((subject) => (
          <Card key={subject.id} className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 rounded-lg flex items-center justify-center ${getColorClasses(subject.color)}`}
                  >
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription>{subject.teacher}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-lg font-bold">
                  {subject.grade}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{subject.percentage}%</span>
                </div>
                <Progress value={subject.percentage} className="h-2" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">{subject.attendance}%</div>
                  <div className="text-xs text-muted-foreground">Attendance</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">
                    {subject.assignments.completed}/{subject.assignments.total}
                  </div>
                  <div className="text-xs text-muted-foreground">Assignments</div>
                </div>
              </div>

              {/* Topics */}
              <div>
                <p className="text-sm font-medium mb-2">Current Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {subject.topics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Next Class */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Next: {subject.nextClass}</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewSubject(subject)}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewNotes(subject)}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Notes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
          <CardDescription>Your academic progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
            <p className="text-muted-foreground mb-4">Track your progress with detailed charts and insights</p>
            <Button className="transition-all duration-300 hover:scale-105 bg-blue-600 hover:bg-blue-600/90">
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subject View Modal */}
      {showSubjectModal && <SubjectViewModal subject={selectedSubject} onClose={() => setShowSubjectModal(false)} />}

      {/* Notes Modal */}
      {showNotesModal && <NotesModal subject={selectedSubject} onClose={() => setShowNotesModal(false)} />}
    </div>
  )
}

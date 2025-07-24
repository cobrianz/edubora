"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Plus, Calendar, Clock, Eye, Edit, FileText, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import LessonModal from "@/components/modals/lesson-modal"
import LessonViewModal from "@/components/modals/lesson-view-modal"

export default function TeacherLessonsPage() {
  const { toast } = useToast()
  const [showLessonModal, setShowLessonModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)

  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Introduction to Algebra",
      subject: "Mathematics",
      class: "Grade 7A",
      date: "2024-01-15",
      time: "8:00 AM",
      duration: "40 mins",
      status: "Completed",
      type: "Theory",
      materials: ["Textbook Ch. 5", "Worksheet", "Calculator"],
      description: "An introductory lesson covering basic algebraic concepts and operations.",
    },
    {
      id: 2,
      title: "Solving Linear Equations",
      subject: "Mathematics",
      class: "Grade 8B",
      date: "2024-01-16",
      time: "9:30 AM",
      duration: "40 mins",
      status: "Scheduled",
      type: "Practice",
      materials: ["Practice Problems", "Whiteboard", "Examples"],
      description: "Hands-on practice session for solving linear equations with one variable.",
    },
    {
      id: 3,
      title: "Quadratic Functions",
      subject: "Mathematics",
      class: "Grade 9A",
      date: "2024-01-17",
      time: "11:00 AM",
      duration: "40 mins",
      status: "Draft",
      type: "Theory",
      materials: ["Graphing Paper", "Calculator", "Textbook"],
      description: "Exploring the properties and graphs of quadratic functions.",
    },
  ])

  const handleCreateLesson = () => {
    setSelectedLesson(null)
    setShowLessonModal(true)
  }

  const handleViewLesson = (lesson) => {
    setSelectedLesson(lesson)
    setShowViewModal(true)
  }

  const handleEditLesson = (lesson) => {
    setSelectedLesson(lesson)
    setShowLessonModal(true)
  }

  const handleSaveLesson = (lessonData) => {
    if (lessonData.id) {
      // Edit existing lesson
      setLessons((prevLessons) => prevLessons.map((lesson) => (lesson.id === lessonData.id ? lessonData : lesson)))
      toast({
        title: "Lesson Updated",
        description: `${lessonData.title} has been updated successfully.`,
      })
    } else {
      // Create new lesson
      const newLesson = { ...lessonData, id: Date.now() } // Assign a new ID
      setLessons((prevLessons) => [...prevLessons, newLesson])
      toast({
        title: "Lesson Created",
        description: `${lessonData.title} has been created successfully.`,
      })
    }
    setShowLessonModal(false)
  }

  const getIconForLessonType = (type) => {
    switch (type) {
      case "Theory":
        return <BookOpen className="h-6 w-6 text-slate-blue" />
      case "Practice":
        return <FileText className="h-6 w-6 text-light-green" />
      case "Video Lecture":
        return <Video className="h-6 w-6 text-purple-600" />
      default:
        return <BookOpen className="h-6 w-6 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lesson Plans</h1>
          <p className="text-muted-foreground">Create and manage your lesson plans</p>
        </div>
        <Button
          onClick={handleCreateLesson}
          className="transition-all duration-300 hover:scale-105 bg-slate-blue hover:bg-slate-blue/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Lesson
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-slate-blue/10 border-slate-blue/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-slate-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.length}</div>
            <p className="text-xs text-muted-foreground">This term</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-light-green/10 border-light-green/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Calendar className="h-4 w-4 text-light-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.filter((l) => l.status === "Completed").length}</div>
            <p className="text-xs text-muted-foreground">
              {((lessons.filter((l) => l.status === "Completed").length / lessons.length) * 100 || 0).toFixed(0)}%
              completion
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.filter((l) => l.status === "Scheduled").length}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.filter((l) => l.status === "Draft").length}</div>
            <p className="text-xs text-muted-foreground">Need completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Lesson Plans</CardTitle>
          <CardDescription>Manage your teaching materials and lesson structure</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Lessons</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4">
                {lessons.map((lesson) => (
                  <Card key={lesson.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-slate-blue/10 flex items-center justify-center">
                            {getIconForLessonType(lesson.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {lesson.subject} • {lesson.class}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {lesson.date} at {lesson.time}
                              </span>
                              <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              lesson.status === "Completed"
                                ? "default"
                                : lesson.status === "Scheduled"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="mb-2"
                          >
                            {lesson.status}
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewLesson(lesson)}
                              className="transition-all duration-300 hover:scale-105"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditLesson(lesson)}
                              className="transition-all duration-300 hover:scale-105"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Materials:</p>
                        <div className="flex flex-wrap gap-2">
                          {lesson.materials.map((material, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {material}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scheduled">
              <div className="space-y-4">
                {lessons.filter((l) => l.status === "Scheduled").length > 0 ? (
                  lessons
                    .filter((l) => l.status === "Scheduled")
                    .map((lesson) => (
                      <Card key={lesson.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-lg bg-slate-blue/10 flex items-center justify-center">
                                {getIconForLessonType(lesson.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{lesson.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.subject} • {lesson.class}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {lesson.date} at {lesson.time}
                                  </span>
                                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary" className="mb-2">
                                {lesson.status}
                              </Badge>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewLesson(lesson)}
                                  className="transition-all duration-300 hover:scale-105"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditLesson(lesson)}
                                  className="transition-all duration-300 hover:scale-105"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No scheduled lessons found.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="space-y-4">
                {lessons.filter((l) => l.status === "Completed").length > 0 ? (
                  lessons
                    .filter((l) => l.status === "Completed")
                    .map((lesson) => (
                      <Card key={lesson.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-lg bg-slate-blue/10 flex items-center justify-center">
                                {getIconForLessonType(lesson.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{lesson.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.subject} • {lesson.class}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {lesson.date} at {lesson.time}
                                  </span>
                                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="default" className="mb-2">
                                {lesson.status}
                              </Badge>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewLesson(lesson)}
                                  className="transition-all duration-300 hover:scale-105"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditLesson(lesson)}
                                  className="transition-all duration-300 hover:scale-105"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No completed lessons found.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="drafts">
              <div className="space-y-4">
                {lessons.filter((l) => l.status === "Draft").length > 0 ? (
                  lessons
                    .filter((l) => l.status === "Draft")
                    .map((lesson) => (
                      <Card key={lesson.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-lg bg-slate-blue/10 flex items-center justify-center">
                                {getIconForLessonType(lesson.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{lesson.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {lesson.subject} • {lesson.class}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {lesson.date} at {lesson.time}
                                  </span>
                                  <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="mb-2">
                                {lesson.status}
                              </Badge>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewLesson(lesson)}
                                  className="transition-all duration-300 hover:scale-105"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditLesson(lesson)}
                                  className="transition-all duration-300 hover:scale-105"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No draft lessons found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Lesson Modals */}
      {showLessonModal && (
        <LessonModal lesson={selectedLesson} onClose={() => setShowLessonModal(false)} onSave={handleSaveLesson} />
      )}
      {showViewModal && (
        <LessonViewModal lesson={selectedLesson} onClose={() => setShowViewModal(false)} onEdit={handleEditLesson} />
      )}
    </div>
  )
}

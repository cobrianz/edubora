"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Video, Presentation, BookOpen, PlayCircle, Eye, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import LessonContentModal from "@/components/modals/lesson-content-modal"

export default function StudentLessonsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [showLessonModal, setShowLessonModal] = useState(false)

  const lessons = [
    {
      id: 1,
      title: "Algebra Basics: Equations",
      subject: "Mathematics",
      teacher: "Mr. John Kamau",
      type: "Video Lesson",
      duration: "25 min",
      date: "2024-07-10",
      description: "An introductory lesson on solving linear equations.",
      contentUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder YouTube embed
      materials: ["algebra_notes.pdf", "practice_worksheet.pdf"],
    },
    {
      id: 2,
      title: "The Water Cycle",
      subject: "Science",
      teacher: "Mr. David Ochieng",
      type: "Presentation",
      duration: "15 slides",
      date: "2024-07-08",
      description: "Interactive presentation explaining the stages of the water cycle.",
      contentUrl: "/placeholder.svg?height=400&width=600", // Placeholder image for presentation
      materials: ["water_cycle_summary.pdf"],
    },
    {
      id: 3,
      title: "Literary Devices in Poetry",
      subject: "English",
      teacher: "Ms. Sarah Wanjiku",
      type: "Video Lesson",
      duration: "30 min",
      date: "2024-07-05",
      description: "Exploring common literary devices used in poetry.",
      contentUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder YouTube embed
      materials: ["poetry_analysis_guide.pdf"],
    },
  ]

  const filteredLessons = lessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.teacher.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewLesson = (lesson) => {
    setSelectedLesson(lesson)
    setShowLessonModal(true)
  }

  const handleDownloadMaterial = (materialName) => {
    toast({
      title: "Download Started",
      description: `Downloading ${materialName}...`,
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Lessons</h1>
          <p className="text-muted-foreground">Access video lessons and presentations</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.length}</div>
            <p className="text-xs text-muted-foreground">Available for you</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Lessons</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.filter((l) => l.type === "Video Lesson").length}</div>
            <p className="text-xs text-muted-foreground">Watch and learn</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presentations</CardTitle>
            <Presentation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.filter((l) => l.type === "Presentation").length}</div>
            <p className="text-xs text-muted-foreground">Interactive slides</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Lessons</CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Added this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
          <CardDescription>Browse available video lessons and presentations</CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="video">Video Lessons</TabsTrigger>
              <TabsTrigger value="presentation">Presentations</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredLessons.map((lesson) => (
                <Card key={lesson.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          {lesson.type === "Video Lesson" ? (
                            <Video className="h-5 w-5 text-primary" />
                          ) : (
                            <Presentation className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {lesson.subject} • {lesson.teacher}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{lesson.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>📅 {lesson.date}</span>
                            <span>⏱️ {lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{lesson.type}</Badge>
                        <div className="flex gap-1 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewLesson(lesson)}
                            className="transition-all duration-300 hover:scale-105"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                    {lesson.materials && lesson.materials.length > 0 && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-2">Materials:</p>
                        <div className="flex flex-wrap gap-2">
                          {lesson.materials.map((material, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadMaterial(material)}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              {material}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              {filteredLessons.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No lessons found matching your search.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="video" className="space-y-4">
              {filteredLessons
                .filter((l) => l.type === "Video Lesson")
                .map((lesson) => (
                  <Card key={lesson.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Video className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {lesson.subject} • {lesson.teacher}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{lesson.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>📅 {lesson.date}</span>
                              <span>⏱️ {lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{lesson.type}</Badge>
                          <div className="flex gap-1 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewLesson(lesson)}
                              className="transition-all duration-300 hover:scale-105"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                      {lesson.materials && lesson.materials.length > 0 && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium mb-2">Materials:</p>
                          <div className="flex flex-wrap gap-2">
                            {lesson.materials.map((material, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadMaterial(material)}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                {material}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              {filteredLessons.filter((l) => l.type === "Video Lesson").length === 0 && (
                <div className="text-center py-8">
                  <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No video lessons available.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="presentation" className="space-y-4">
              {filteredLessons
                .filter((l) => l.type === "Presentation")
                .map((lesson) => (
                  <Card key={lesson.id} className="transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Presentation className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {lesson.subject} • {lesson.teacher}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{lesson.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span>📅 {lesson.date}</span>
                              <span>⏱️ {lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{lesson.type}</Badge>
                          <div className="flex gap-1 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewLesson(lesson)}
                              className="transition-all duration-300 hover:scale-105"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                      {lesson.materials && lesson.materials.length > 0 && (
                        <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium mb-2">Materials:</p>
                          <div className="flex flex-wrap gap-2">
                            {lesson.materials.map((material, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadMaterial(material)}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                {material}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              {filteredLessons.filter((l) => l.type === "Presentation").length === 0 && (
                <div className="text-center py-8">
                  <Presentation className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No presentations available.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {showLessonModal && <LessonContentModal lesson={selectedLesson} onClose={() => setShowLessonModal(false)} />}
    </div>
  )
}

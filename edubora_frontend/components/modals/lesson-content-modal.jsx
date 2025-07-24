"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Video, Presentation, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LessonContentModal({ lesson, onClose }) {
  const { toast } = useToast()

  if (!lesson) return null

  const handleDownloadMaterial = (materialName) => {
    toast({
      title: "Download Started",
      description: `Downloading ${materialName}...`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              {lesson.type === "Video Lesson" ? <Video className="h-5 w-5" /> : <Presentation className="h-5 w-5" />}
              {lesson.title}
            </CardTitle>
            <CardDescription>
              {lesson.subject} - {lesson.teacher}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {lesson.type === "Video Lesson" && lesson.contentUrl && (
            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src={lesson.contentUrl}
                title={lesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          )}

          {lesson.type === "Presentation" && lesson.contentUrl && (
            <div className="w-full rounded-lg overflow-hidden border">
              {/* Placeholder for an embedded presentation viewer or image */}
              <img
                src={lesson.contentUrl || "/placeholder.svg"}
                alt={`${lesson.title} presentation`}
                className="w-full h-auto object-contain"
              />
              <div className="p-4 text-center text-muted-foreground">
                <p>Presentation content would be embedded here.</p>
                <p>For now, you see a placeholder image.</p>
              </div>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Lesson Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Description:</span> {lesson.description}
              </p>
              <p className="text-sm">
                <span className="font-medium">Date:</span> {lesson.date}
              </p>
              <p className="text-sm">
                <span className="font-medium">Duration/Slides:</span> {lesson.duration}
              </p>
            </CardContent>
          </Card>

          {lesson.materials && lesson.materials.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Supporting Materials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {lesson.materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                    <span className="text-sm">{material}</span>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadMaterial(material)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

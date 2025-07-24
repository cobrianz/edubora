"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Upload, FileText, ImageIcon, Video, Music, File, Save, Link, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LearningMaterialModal({ material, onClose, onSave }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    id: material?.id || `MAT${Date.now()}`,
    title: material?.title || "",
    description: material?.description || "",
    subject: material?.subject || "",
    grade: material?.grade || "",
    type: material?.type || "Document",
    category: material?.category || "Textbook",
    format: material?.format || "PDF",
    language: material?.language || "English",
    difficulty: material?.difficulty || "Intermediate",
    tags: material?.tags || [],
    chapters: material?.chapters || [],
    learningObjectives: material?.learningObjectives || [],
    prerequisites: material?.prerequisites || [],
    estimatedTime: material?.estimatedTime || "",
    accessLevel: material?.accessLevel || "All Students",
    isInteractive: material?.isInteractive || false,
    hasAssessment: material?.hasAssessment || false,
    allowDownload: material?.allowDownload || true,
    trackProgress: material?.trackProgress || false,
    expiryDate: material?.expiryDate || "",
    files: material?.files || [],
    links: material?.links || [],
    metadata: material?.metadata || {
      author: "",
      publisher: "",
      publishDate: "",
      isbn: "",
      edition: "",
      pages: "",
    },
  })

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [newTag, setNewTag] = useState("")
  const [newChapter, setNewChapter] = useState("")
  const [newObjective, setNewObjective] = useState("")
  const [newLink, setNewLink] = useState({ title: "", url: "" })

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
    "Life Skills",
  ]

  const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]

  const materialTypes = ["Document", "Video", "Audio", "Interactive", "Assessment", "Presentation", "Worksheet"]

  const categories = ["Textbook", "Workbook", "Reference", "Supplementary", "Assessment", "Activity", "Project"]

  const formats = ["PDF", "DOC", "PPT", "MP4", "MP3", "HTML", "SCORM", "Interactive"]

  const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"]

  const accessLevels = ["All Students", "Specific Grade", "Specific Class", "Teachers Only", "Premium"]

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleMetadataChange = (field, value) => {
    setFormData({
      ...formData,
      metadata: { ...formData.metadata, [field]: value },
    })
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setUploadedFiles([...uploadedFiles, ...files])
  }

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const removeTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  const addChapter = () => {
    if (newChapter.trim()) {
      setFormData({
        ...formData,
        chapters: [...formData.chapters, newChapter.trim()],
      })
      setNewChapter("")
    }
  }

  const removeChapter = (index) => {
    setFormData({
      ...formData,
      chapters: formData.chapters.filter((_, i) => i !== index),
    })
  }

  const addObjective = () => {
    if (newObjective.trim()) {
      setFormData({
        ...formData,
        learningObjectives: [...formData.learningObjectives, newObjective.trim()],
      })
      setNewObjective("")
    }
  }

  const removeObjective = (index) => {
    setFormData({
      ...formData,
      learningObjectives: formData.learningObjectives.filter((_, i) => i !== index),
    })
  }

  const addLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      setFormData({
        ...formData,
        links: [...formData.links, { ...newLink }],
      })
      setNewLink({ title: "", url: "" })
    }
  }

  const removeLink = (index) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index),
    })
  }

  const getFileIcon = (filename) => {
    const ext = filename.split(".").pop()?.toLowerCase()
    switch (ext) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "doc":
      case "docx":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageIcon className="h-4 w-4 text-green-500" />
      case "mp4":
      case "avi":
      case "mov":
        return <Video className="h-4 w-4 text-purple-500" />
      case "mp3":
      case "wav":
        return <Music className="h-4 w-4 text-orange-500" />
      default:
        return <File className="h-4 w-4 text-gray-500" />
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a material title",
        variant: "destructive",
      })
      return
    }

    if (!formData.subject || !formData.grade) {
      toast({
        title: "Missing Information",
        description: "Please select subject and grade",
        variant: "destructive",
      })
      return
    }

    const materialData = {
      ...formData,
      files: [...formData.files, ...uploadedFiles.map((f) => f.name)],
      uploadDate: material?.uploadDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      size: uploadedFiles.reduce((total, file) => total + file.size, 0),
      downloads: material?.downloads || 0,
      views: material?.views || 0,
    }

    onSave(materialData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {material ? "Edit Learning Material" : "Add Learning Material"}
            </CardTitle>
            <CardDescription>
              {material ? "Update material details" : "Upload and configure learning resources"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="structure">Structure</TabsTrigger>
                <TabsTrigger value="access">Access & Settings</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Material Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Grade 7 Mathematics Textbook"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Material Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {materialTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade Level *</Label>
                    <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => handleInputChange("difficulty", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((difficulty) => (
                          <SelectItem key={difficulty} value={difficulty}>
                            {difficulty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the learning material and its purpose..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>File Upload</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
                      <Input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.mp3"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("file-upload").click()}
                      >
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files</Label>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.name)}
                              <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>External Links</Label>
                    <div className="grid gap-2 md:grid-cols-2">
                      <Input
                        value={newLink.title}
                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                        placeholder="Link title"
                      />
                      <div className="flex gap-2">
                        <Input
                          value={newLink.url}
                          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                          placeholder="URL"
                        />
                        <Button type="button" onClick={addLink}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {formData.links.length > 0 && (
                      <div className="space-y-2">
                        {formData.links.map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <div className="flex items-center gap-2">
                              <Link className="h-4 w-4" />
                              <span className="text-sm">{link.title}</span>
                              <span className="text-xs text-muted-foreground">({link.url})</span>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeLink(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="structure" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Chapters/Sections</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newChapter}
                        onChange={(e) => setNewChapter(e.target.value)}
                        placeholder="Chapter title"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addChapter())}
                      />
                      <Button type="button" onClick={addChapter}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.chapters.length > 0 && (
                      <div className="space-y-2">
                        {formData.chapters.map((chapter, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">{chapter}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeChapter(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Learning Objectives</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newObjective}
                        onChange={(e) => setNewObjective(e.target.value)}
                        placeholder="Learning objective"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addObjective())}
                      />
                      <Button type="button" onClick={addObjective}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.learningObjectives.length > 0 && (
                      <div className="space-y-2">
                        {formData.learningObjectives.map((objective, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm">{objective}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeObjective(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="estimatedTime">Estimated Study Time</Label>
                      <Input
                        id="estimatedTime"
                        value={formData.estimatedTime}
                        onChange={(e) => handleInputChange("estimatedTime", e.target.value)}
                        placeholder="e.g., 2 hours, 30 minutes"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prerequisites">Prerequisites</Label>
                      <Input
                        value={formData.prerequisites.join(", ")}
                        onChange={(e) =>
                          handleInputChange(
                            "prerequisites",
                            e.target.value.split(", ").filter((p) => p.trim()),
                          )
                        }
                        placeholder="Required prior knowledge"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="access" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="accessLevel">Access Level</Label>
                    <Select
                      value={formData.accessLevel}
                      onValueChange={(value) => handleInputChange("accessLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accessLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isInteractive"
                      checked={formData.isInteractive}
                      onCheckedChange={(checked) => handleInputChange("isInteractive", checked)}
                    />
                    <Label htmlFor="isInteractive">Interactive Content</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAssessment"
                      checked={formData.hasAssessment}
                      onCheckedChange={(checked) => handleInputChange("hasAssessment", checked)}
                    />
                    <Label htmlFor="hasAssessment">Includes Assessment</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowDownload"
                      checked={formData.allowDownload}
                      onCheckedChange={(checked) => handleInputChange("allowDownload", checked)}
                    />
                    <Label htmlFor="allowDownload">Allow Download</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="trackProgress"
                      checked={formData.trackProgress}
                      onCheckedChange={(checked) => handleInputChange("trackProgress", checked)}
                    />
                    <Label htmlFor="trackProgress">Track Student Progress</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="metadata" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.metadata.author}
                      onChange={(e) => handleMetadataChange("author", e.target.value)}
                      placeholder="Material author"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      value={formData.metadata.publisher}
                      onChange={(e) => handleMetadataChange("publisher", e.target.value)}
                      placeholder="Publishing company"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input
                      id="publishDate"
                      type="date"
                      value={formData.metadata.publishDate}
                      onChange={(e) => handleMetadataChange("publishDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={formData.metadata.isbn}
                      onChange={(e) => handleMetadataChange("isbn", e.target.value)}
                      placeholder="ISBN number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edition">Edition</Label>
                    <Input
                      id="edition"
                      value={formData.metadata.edition}
                      onChange={(e) => handleMetadataChange("edition", e.target.value)}
                      placeholder="e.g., 2nd Edition"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pages">Number of Pages</Label>
                    <Input
                      id="pages"
                      type="number"
                      value={formData.metadata.pages}
                      onChange={(e) => handleMetadataChange("pages", e.target.value)}
                      placeholder="Total pages"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Kiswahili">Kiswahili</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">File Format</Label>
                    <Select value={formData.format} onValueChange={(value) => handleInputChange("format", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((format) => (
                          <SelectItem key={format} value={format}>
                            {format}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {material ? "Update Material" : "Save Material"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

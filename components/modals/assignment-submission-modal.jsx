"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Upload, FileText, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AssignmentSubmissionModal({ assignment, onClose, onSubmit }) {
  const { toast } = useToast()
  const [files, setFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!assignment) return null

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files)
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const newFiles = Array.from(event.dataTransfer.files)
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (files.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to upload for your submission.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    toast({
      title: "Submitting Assignment",
      description: `Uploading ${files.length} file(s) for "${assignment.title}"...`,
    })

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onSubmit({
        assignmentId: assignment.id,
        files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
        submittedDate: new Date().toISOString().split("T")[0],
      })
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Submit: {assignment.title}
            </CardTitle>
            <CardDescription>Upload your completed assignment files.</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors duration-200"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("file-upload-input").click()}
          >
            <input
              id="file-upload-input"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={isSubmitting}
            />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">Drag and drop your files here, or click to browse</p>
            <p className="text-xs text-muted-foreground">
              Max file size: 10MB. Supported formats: PDF, DOCX, JPG, PNG.
            </p>
          </div>

          {files.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Files ({files.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(index)} disabled={isSubmitting}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || files.length === 0}>
              {isSubmitting ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Assignment
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

export default function AssignmentModal({ assignment, onClose, onSave }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: assignment?.title || "",
    description: assignment?.description || "",
    subject: assignment?.subject || "",
    class: assignment?.class || "",
    dueDate: assignment?.dueDate ? new Date(assignment.dueDate) : null,
    maxMarks: assignment?.maxMarks || assignment?.totalMarks || "",
    instructions: assignment?.instructions || "",
    attachments: assignment?.attachments || [],
  })

  const [newAttachments, setNewAttachments] = useState([])

  const classes = [
    { value: "grade-6a", label: "Grade 6A" },
    { value: "grade-7a", label: "Grade 7A" },
    { value: "grade-7b", label: "Grade 7B" },
    { value: "grade-8a", label: "Grade 8A" },
    { value: "grade-8b", label: "Grade 8B" },
    { value: "grade-9a", label: "Grade 9A" },
  ]

  const subjects = [
    { value: "mathematics", label: "Mathematics" },
    { value: "english", label: "English" },
    { value: "science", label: "Science" },
    { value: "kiswahili", label: "Kiswahili" },
    { value: "social-studies", label: "Social Studies" },
  ]

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    setNewAttachments([...newAttachments, ...files])
  }

  const removeAttachment = (index, isNew = false) => {
    if (isNew) {
      setNewAttachments(newAttachments.filter((_, i) => i !== index))
    } else {
      setFormData((prev) => ({
        ...prev,
        attachments: prev.attachments.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.class || !formData.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const assignmentData = {
      ...formData,
      dueDate: format(formData.dueDate, "yyyy-MM-dd"),
      attachments: [...formData.attachments, ...newAttachments.map((f) => f.name)],
      id: assignment?.id || Date.now(),
      assignedDate: assignment?.assignedDate || format(new Date(), "yyyy-MM-dd"),
      status: assignment?.status || "Active",
    }

    onSave(assignmentData)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{assignment ? "Edit Assignment" : "Create New Assignment"}</DialogTitle>
          <DialogDescription>
            {assignment ? "Update assignment details" : "Create a new assignment for your students"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter assignment title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                <SelectTrigger>
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxMarks">Maximum Marks</Label>
              <Input
                id="maxMarks"
                type="number"
                value={formData.maxMarks}
                onChange={(e) => handleInputChange("maxMarks", e.target.value)}
                placeholder="Enter maximum marks"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dueDate}
                  onSelect={(date) => handleInputChange("dueDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the assignment..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => handleInputChange("instructions", e.target.value)}
              placeholder="Detailed instructions for students..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Attachments</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Click to upload files or drag and drop</p>
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt,.jpg,.png"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("file-upload").click()}>
                Choose Files
              </Button>
            </div>
          </div>

          {/* Existing Attachments */}
          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              <Label>Current Attachments</Label>
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{file}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index, false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Attachments */}
          {newAttachments.length > 0 && (
            <div className="space-y-2">
              <Label>New Attachments</Label>
              <div className="space-y-2">
                {newAttachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index, true)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {assignment ? "Update Assignment" : "Create Assignment"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

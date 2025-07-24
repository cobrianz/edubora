"use client"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"

export default function AssessmentFormModal({ assessment, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: assessment?.id || Date.now(),
    title: assessment?.title || "",
    class: assessment?.class || "",
    subject: assessment?.subject || "",
    type: assessment?.type || "Exam",
    date: assessment?.date || "",
    duration: assessment?.duration || "",
    totalMarks: assessment?.totalMarks || 0,
    instructions: assessment?.instructions || "",
    competencies: assessment?.competencies || [],
    status: assessment?.status || "Scheduled",
  })
  const [newCompetency, setNewCompetency] = useState("")

  useEffect(() => {
    if (assessment) {
      setFormData({
        id: assessment.id,
        title: assessment.title,
        class: assessment.class,
        subject: assessment.subject,
        type: assessment.type,
        date: assessment.date,
        duration: assessment.duration,
        totalMarks: assessment.totalMarks,
        instructions: assessment.instructions,
        competencies: assessment.competencies || [],
        status: assessment.status,
      })
    }
  }, [assessment])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddCompetency = () => {
    if (newCompetency.trim() && !formData.competencies.includes(newCompetency.trim())) {
      setFormData((prev) => ({
        ...prev,
        competencies: [...prev.competencies, newCompetency.trim()],
      }))
      setNewCompetency("")
    }
  }

  const handleRemoveCompetency = (compToRemove) => {
    setFormData((prev) => ({
      ...prev,
      competencies: prev.competencies.filter((comp) => comp !== compToRemove),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const subjects = ["Mathematics", "English", "Science", "History"]
  const classes = ["Grade 6A", "Grade 7A", "Grade 8B", "Grade 9A"]
  const assessmentTypes = ["Exam", "Quiz", "Assignment", "Project"]
  const assessmentStatuses = ["Draft", "Scheduled", "Ongoing", "Completed", "Published"]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{assessment ? "Edit Assessment" : "Create New Assessment"}</DialogTitle>
          <DialogDescription>
            {assessment ? "Modify the details of this assessment." : "Fill in the details to create a new assessment."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Select value={formData.subject} onValueChange={(val) => handleSelectChange("subject", val)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class" className="text-right">
              Class
            </Label>
            <Select value={formData.class} onValueChange={(val) => handleSelectChange("class", val)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={formData.type} onValueChange={(val) => handleSelectChange("type", val)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select assessment type" />
              </SelectTrigger>
              <SelectContent>
                {assessmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration
            </Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 2 hours"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalMarks" className="text-right">
              Total Marks
            </Label>
            <Input
              id="totalMarks"
              type="number"
              value={formData.totalMarks}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="instructions" className="text-right pt-2">
              Instructions
            </Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={handleChange}
              className="col-span-3"
              rows={4}
              placeholder="Detailed instructions for the assessment"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="competencies" className="text-right pt-2">
              Competencies
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex gap-2">
                <Input
                  id="newCompetency"
                  value={newCompetency}
                  onChange={(e) => setNewCompetency(e.target.value)}
                  placeholder="Add CBC competency (e.g., Critical Thinking)"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddCompetency} variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.competencies.map((comp, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {comp}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => handleRemoveCompetency(comp)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(val) => handleSelectChange("status", val)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {assessmentStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{assessment ? "Save Changes" : "Create Assessment"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

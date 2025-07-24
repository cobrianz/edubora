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

export default function LessonModal({ lesson, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: lesson?.id || Date.now(),
    title: lesson?.title || "",
    subject: lesson?.subject || "",
    class: lesson?.class || "",
    date: lesson?.date || "",
    time: lesson?.time || "",
    duration: lesson?.duration || "",
    status: lesson?.status || "Draft",
    type: lesson?.type || "Theory",
    materials: lesson?.materials || [],
    description: lesson?.description || "",
  })
  const [newMaterial, setNewMaterial] = useState("")

  useEffect(() => {
    if (lesson) {
      setFormData({
        id: lesson.id,
        title: lesson.title,
        subject: lesson.subject,
        class: lesson.class,
        date: lesson.date,
        time: lesson.time,
        duration: lesson.duration,
        status: lesson.status,
        type: lesson.type,
        materials: lesson.materials,
        description: lesson.description,
      })
    }
  }, [lesson])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddMaterial = () => {
    if (newMaterial.trim() && !formData.materials.includes(newMaterial.trim())) {
      setFormData((prev) => ({
        ...prev,
        materials: [...prev.materials, newMaterial.trim()],
      }))
      setNewMaterial("")
    }
  }

  const handleRemoveMaterial = (materialToRemove) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((material) => material !== materialToRemove),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const subjects = ["Mathematics", "English", "Science", "History"]
  const classes = ["Grade 6A", "Grade 7A", "Grade 8B", "Grade 9A"]
  const lessonTypes = ["Theory", "Practice", "Video Lecture"]
  const lessonStatuses = ["Draft", "Scheduled", "Completed"]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{lesson ? "Edit Lesson Plan" : "Create New Lesson Plan"}</DialogTitle>
          <DialogDescription>
            {lesson ? "Modify the details of this lesson." : "Fill in the details to create a new lesson plan."}
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
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
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
              placeholder="e.g., 40 mins"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={formData.type} onValueChange={(val) => handleSelectChange("type", val)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select lesson type" />
              </SelectTrigger>
              <SelectContent>
                {lessonTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                {lessonStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="materials" className="text-right pt-2">
              Materials
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex gap-2">
                <Input
                  id="newMaterial"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  placeholder="Add material (e.g., Textbook Ch. 5)"
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddMaterial} variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.materials.map((material, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {material}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => handleRemoveMaterial(material)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
              rows={4}
              placeholder="Brief description of the lesson"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{lesson ? "Save Changes" : "Create Lesson"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

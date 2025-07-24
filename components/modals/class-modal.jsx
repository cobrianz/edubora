"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Save, GraduationCap } from "lucide-react"

export default function ClassModal({ classData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    section: "",
    capacity: "",
    room: "",
    teacher: "",
    subjects: [],
  })

  const teachers = [
    "Ms. Jane Doe",
    "Mr. John Smith",
    "Ms. Mary Johnson",
    "Mr. Peter Wilson",
    "Ms. Sarah Wanjiku",
    "Mr. David Ochieng",
  ]

  useEffect(() => {
    if (classData) {
      setFormData({
        name: classData.name || "",
        grade: classData.name?.split(" ")[1]?.charAt(0) || "",
        section: classData.name?.split(" ")[1]?.charAt(1) || "",
        capacity: classData.capacity?.toString() || "",
        room: classData.room || "",
        teacher: classData.teacher || "",
        subjects: [],
      })
    }
  }, [classData])

  const handleSubmit = (e) => {
    e.preventDefault()
    const className = `Grade ${formData.grade}${formData.section}`
    onSave({ ...formData, name: className })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-2xl animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              {classData ? "Edit Class" : "Add New Class"}
            </CardTitle>
            <CardDescription>{classData ? "Update class information" : "Create a new class"}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grade">Grade *</Label>
                <Select value={formData.grade} onValueChange={(value) => handleChange("grade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((grade) => (
                      <SelectItem key={grade} value={grade.toString()}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="section">Section *</Label>
                <Select value={formData.section} onValueChange={(value) => handleChange("section", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A", "B", "C", "D"].map((section) => (
                      <SelectItem key={section} value={section}>
                        Section {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleChange("capacity", e.target.value)}
                  placeholder="e.g., 35"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Room Number *</Label>
                <Input
                  id="room"
                  value={formData.room}
                  onChange={(e) => handleChange("room", e.target.value)}
                  placeholder="e.g., Room 101"
                  required
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="teacher">Class Teacher *</Label>
                <Select value={formData.teacher} onValueChange={(value) => handleChange("teacher", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher} value={teacher}>
                        {teacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="transition-all duration-300 hover:scale-105">
                <Save className="mr-2 h-4 w-4" />
                {classData ? "Update Class" : "Create Class"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

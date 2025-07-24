"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Save, Clock, BookOpen, Users, MapPin, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PeriodModal({ period, day, timeSlot, onClose, onSave, isEdit = false }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    subject: "",
    teacher: "",
    room: "",
    class: "",
    notes: "",
    type: "regular", // regular, break, lunch, assembly
  })
  const [conflicts, setConflicts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Sample data
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
    "Computer Studies",
  ]

  const teachers = [
    { id: "T001", name: "Mr. John Kamau", subject: "Mathematics", availability: "available" },
    { id: "T002", name: "Ms. Sarah Wanjiku", subject: "English", availability: "busy" },
    { id: "T003", name: "Dr. Mary Njeri", subject: "Science", availability: "available" },
    { id: "T004", name: "Mr. Peter Mwangi", subject: "Kiswahili", availability: "available" },
    { id: "T005", name: "Ms. Grace Achieng", subject: "Social Studies", availability: "available" },
    { id: "T006", name: "Mr. David Ochieng", subject: "Art & Craft", availability: "busy" },
    { id: "T007", name: "Mr. James Kiprop", subject: "Physical Education", availability: "available" },
    { id: "T008", name: "Ms. Faith Wanjiru", subject: "Music", availability: "available" },
    { id: "T009", name: "Mr. Paul Kimani", subject: "Computer Studies", availability: "available" },
  ]

  const rooms = [
    { id: "R001", name: "Room 201", capacity: 35, type: "classroom", availability: "available" },
    { id: "R002", name: "Room 202", capacity: 35, type: "classroom", availability: "occupied" },
    { id: "R003", name: "Lab 1", capacity: 30, type: "laboratory", availability: "available" },
    { id: "R004", name: "Computer Lab", capacity: 25, type: "computer", availability: "available" },
    { id: "R005", name: "Art Room", capacity: 20, type: "special", availability: "available" },
    { id: "R006", name: "Music Room", capacity: 25, type: "special", availability: "occupied" },
    { id: "R007", name: "Library", capacity: 50, type: "library", availability: "available" },
    { id: "R008", name: "Assembly Hall", capacity: 500, type: "hall", availability: "available" },
  ]

  const classes = ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 7B", "Grade 8A", "Grade 8B", "Grade 9A", "Grade 9B"]

  const periodTypes = [
    { value: "regular", label: "Regular Class", color: "blue" },
    { value: "break", label: "Break Time", color: "gray" },
    { value: "lunch", label: "Lunch Break", color: "green" },
    { value: "assembly", label: "Assembly", color: "purple" },
    { value: "study", label: "Study Period", color: "orange" },
    { value: "exam", label: "Examination", color: "red" },
  ]

  useEffect(() => {
    if (isEdit && period) {
      setFormData({
        subject: period.subject || "",
        teacher: period.teacher || "",
        room: period.room || "",
        class: period.class || "",
        notes: period.notes || "",
        type: period.type || "regular",
      })
    }
  }, [isEdit, period])

  useEffect(() => {
    // Check for conflicts when form data changes
    checkConflicts()
  }, [formData])

  const checkConflicts = () => {
    const detectedConflicts = []

    // Teacher conflict
    const selectedTeacher = teachers.find((t) => t.name === formData.teacher)
    if (selectedTeacher && selectedTeacher.availability === "busy") {
      detectedConflicts.push({
        type: "teacher",
        message: `${formData.teacher} is already scheduled for another class at this time`,
        severity: "high",
      })
    }

    // Room conflict
    const selectedRoom = rooms.find((r) => r.name === formData.room)
    if (selectedRoom && selectedRoom.availability === "occupied") {
      detectedConflicts.push({
        type: "room",
        message: `${formData.room} is already occupied at this time`,
        severity: "high",
      })
    }

    // Subject-teacher mismatch
    if (formData.subject && formData.teacher) {
      const teacher = teachers.find((t) => t.name === formData.teacher)
      if (teacher && teacher.subject !== formData.subject) {
        detectedConflicts.push({
          type: "mismatch",
          message: `${formData.teacher} specializes in ${teacher.subject}, not ${formData.subject}`,
          severity: "medium",
        })
      }
    }

    // Room capacity check
    if (formData.room && formData.class) {
      const room = rooms.find((r) => r.name === formData.room)
      const estimatedStudents = 32 // Assume average class size
      if (room && room.capacity < estimatedStudents) {
        detectedConflicts.push({
          type: "capacity",
          message: `${formData.room} capacity (${room.capacity}) may be insufficient for ${formData.class}`,
          severity: "low",
        })
      }
    }

    setConflicts(detectedConflicts)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    // Validation
    if (formData.type === "regular") {
      if (!formData.subject || !formData.teacher || !formData.room || !formData.class) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields for regular classes",
          variant: "destructive",
        })
        return
      }
    }

    // Check for high severity conflicts
    const highSeverityConflicts = conflicts.filter((c) => c.severity === "high")
    if (highSeverityConflicts.length > 0) {
      toast({
        title: "Scheduling Conflicts",
        description: "Please resolve high priority conflicts before saving",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const periodData = {
        ...formData,
        day,
        timeSlot,
        id: isEdit ? period.id : `P${Date.now()}`,
        conflicts: conflicts.length,
        createdAt: isEdit ? period.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      onSave(periodData)

      toast({
        title: isEdit ? "Period Updated" : "Period Created",
        description: `${formData.subject || formData.type} period has been ${isEdit ? "updated" : "scheduled"} successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save period. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getConflictColor = (severity) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getConflictIcon = (type) => {
    switch (type) {
      case "teacher":
        return Users
      case "room":
        return MapPin
      case "mismatch":
        return BookOpen
      case "capacity":
        return Users
      default:
        return AlertTriangle
    }
  }

  const selectedPeriodType = periodTypes.find((pt) => pt.value === formData.type)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {isEdit ? "Edit Period" : "Add Period"}
            </CardTitle>
            <CardDescription>
              {day} • {timeSlot}
              {selectedPeriodType && (
                <Badge variant="outline" className="ml-2">
                  {selectedPeriodType.label}
                </Badge>
              )}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Conflicts Alert */}
          {conflicts.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-orange-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Scheduling Conflicts ({conflicts.length})
              </h4>
              <div className="space-y-2">
                {conflicts.map((conflict, index) => {
                  const ConflictIcon = getConflictIcon(conflict.type)
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        conflict.severity === "high"
                          ? "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
                          : conflict.severity === "medium"
                            ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800"
                            : "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <ConflictIcon className="h-4 w-4 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm">{conflict.message}</p>
                          <Badge variant={getConflictColor(conflict.severity)} className="mt-1">
                            {conflict.severity} priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Period Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Period Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periodTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${type.color}-500`}></div>
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Regular Class Fields */}
          {formData.type === "regular" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
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
                  <Label htmlFor="class">Class *</Label>
                  <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
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
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="teacher">Teacher *</Label>
                  <Select value={formData.teacher} onValueChange={(value) => handleInputChange("teacher", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.name}>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="font-medium">{teacher.name}</div>
                              <div className="text-xs text-muted-foreground">{teacher.subject}</div>
                            </div>
                            <Badge
                              variant={teacher.availability === "available" ? "default" : "destructive"}
                              className="ml-2"
                            >
                              {teacher.availability}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room">Room *</Label>
                  <Select value={formData.room} onValueChange={(value) => handleInputChange("room", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.name}>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="font-medium">{room.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {room.type} • Capacity: {room.capacity}
                              </div>
                            </div>
                            <Badge
                              variant={room.availability === "available" ? "default" : "destructive"}
                              className="ml-2"
                            >
                              {room.availability}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          {/* Break/Lunch Fields */}
          {(formData.type === "break" || formData.type === "lunch") && (
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {formData.type === "break" ? "Break time" : "Lunch break"} - No additional configuration required
              </p>
            </div>
          )}

          {/* Assembly Fields */}
          {formData.type === "assembly" && (
            <div className="space-y-2">
              <Label htmlFor="room">Venue</Label>
              <Select value={formData.room} onValueChange={(value) => handleInputChange("room", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select venue" />
                </SelectTrigger>
                <SelectContent>
                  {rooms
                    .filter((room) => room.type === "hall" || room.capacity > 100)
                    .map((room) => (
                      <SelectItem key={room.id} value={room.name}>
                        {room.name} (Capacity: {room.capacity})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Add any additional notes or instructions..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEdit ? "Update Period" : "Add Period"}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Users, Clock, User } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function CounselingSessionModal({ isOpen, onClose, mode = "add", sessionData = null }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    studentName: sessionData?.studentName || "",
    admissionNo: sessionData?.admissionNo || "",
    class: sessionData?.class || "",
    counselor: sessionData?.counselor || "",
    sessionDate: sessionData?.sessionDate ? new Date(sessionData.sessionDate) : new Date(),
    sessionTime: sessionData?.sessionTime || "",
    duration: sessionData?.duration || "45",
    type: sessionData?.type || "Individual",
    topic: sessionData?.topic || "",
    status: sessionData?.status || "Scheduled",
    nextSession: sessionData?.nextSession ? new Date(sessionData.nextSession) : null,
    sessionNotes: sessionData?.sessionNotes || "",
    goals: sessionData?.goals || "",
    progress: sessionData?.progress || "",
    recommendations: sessionData?.recommendations || "",
    followUpRequired: sessionData?.followUpRequired || false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (mode === "add") {
      toast({
        title: "Session Scheduled",
        description: `Counseling session for ${formData.studentName} has been scheduled successfully.`,
      })
    } else if (mode === "edit") {
      toast({
        title: "Session Updated",
        description: `Counseling session for ${formData.studentName} has been updated successfully.`,
      })
    }

    onClose()
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            {mode === "add"
              ? "Schedule Counseling Session"
              : mode === "edit"
                ? "Edit Counseling Session"
                : "Session Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Schedule a new counseling session for student support."
              : mode === "edit"
                ? "Update the counseling session information."
                : "View detailed information about this counseling session."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Student Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange("studentName", e.target.value)}
                  placeholder="Enter student name"
                  disabled={mode === "view"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admissionNo">Admission Number</Label>
                <Input
                  id="admissionNo"
                  value={formData.admissionNo}
                  onChange={(e) => handleInputChange("admissionNo", e.target.value)}
                  placeholder="Enter admission number"
                  disabled={mode === "view"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) => handleInputChange("class", value)}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade 1A">Grade 1A</SelectItem>
                    <SelectItem value="Grade 2A">Grade 2A</SelectItem>
                    <SelectItem value="Grade 3A">Grade 3A</SelectItem>
                    <SelectItem value="Grade 4A">Grade 4A</SelectItem>
                    <SelectItem value="Grade 5A">Grade 5A</SelectItem>
                    <SelectItem value="Grade 6A">Grade 6A</SelectItem>
                    <SelectItem value="Grade 7A">Grade 7A</SelectItem>
                    <SelectItem value="Grade 8A">Grade 8A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Session Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="counselor">Counselor *</Label>
                <Select
                  value={formData.counselor}
                  onValueChange={(value) => handleInputChange("counselor", value)}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select counselor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ms. Jane Counselor">Ms. Jane Counselor</SelectItem>
                    <SelectItem value="Mr. John Therapist">Mr. John Therapist</SelectItem>
                    <SelectItem value="Dr. Mary Psychologist">Dr. Mary Psychologist</SelectItem>
                    <SelectItem value="Ms. Sarah Advisor">Ms. Sarah Advisor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Session Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Group">Group</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Crisis">Crisis Intervention</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Session Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.sessionDate && "text-muted-foreground",
                      )}
                      disabled={mode === "view"}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.sessionDate ? format(formData.sessionDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.sessionDate}
                      onSelect={(date) => handleInputChange("sessionDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTime">Session Time</Label>
                <Input
                  id="sessionTime"
                  type="time"
                  value={formData.sessionTime}
                  onChange={(e) => handleInputChange("sessionTime", e.target.value)}
                  disabled={mode === "view"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => handleInputChange("duration", value)}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Session Content */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Session Content</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Session Topic *</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => handleInputChange("topic", e.target.value)}
                  placeholder="e.g., Academic Stress Management, Social Skills Development"
                  disabled={mode === "view"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Session Goals</Label>
                <Textarea
                  id="goals"
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  placeholder="What are the objectives for this session?"
                  rows={3}
                  disabled={mode === "view"}
                />
              </div>

              {(mode === "edit" || mode === "view") && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="sessionNotes">Session Notes</Label>
                    <Textarea
                      id="sessionNotes"
                      value={formData.sessionNotes}
                      onChange={(e) => handleInputChange("sessionNotes", e.target.value)}
                      placeholder="Notes from the counseling session..."
                      rows={4}
                      disabled={mode === "view"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="progress">Progress Assessment</Label>
                    <Textarea
                      id="progress"
                      value={formData.progress}
                      onChange={(e) => handleInputChange("progress", e.target.value)}
                      placeholder="Student's progress and response to counseling..."
                      rows={3}
                      disabled={mode === "view"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recommendations">Recommendations</Label>
                    <Textarea
                      id="recommendations"
                      value={formData.recommendations}
                      onChange={(e) => handleInputChange("recommendations", e.target.value)}
                      placeholder="Recommendations for future sessions or interventions..."
                      rows={3}
                      disabled={mode === "view"}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Follow-up */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow-up</h3>
            <div className="space-y-2">
              <Label>Next Session Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.nextSession && "text-muted-foreground",
                    )}
                    disabled={mode === "view"}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.nextSession ? format(formData.nextSession, "PPP") : "Schedule next session"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.nextSession}
                    onSelect={(date) => handleInputChange("nextSession", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {mode === "view" && (
            <div className="flex gap-2 pt-4">
              <Badge
                variant={
                  formData.status === "Completed"
                    ? "default"
                    : formData.status === "Scheduled"
                      ? "secondary"
                      : formData.status === "Cancelled"
                        ? "destructive"
                        : "outline"
                }
              >
                {formData.status}
              </Badge>
              <Badge variant="outline">{formData.type}</Badge>
              <Badge variant="outline">{formData.duration} minutes</Badge>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === "view" ? "Close" : "Cancel"}
            </Button>
            {mode !== "view" && <Button type="submit">{mode === "add" ? "Schedule Session" : "Update Session"}</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

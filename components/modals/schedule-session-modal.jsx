"use client"

import { useState, useEffect } from "react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Users, Repeat, Bell } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export default function ScheduleSessionModal({ isOpen, onClose, session = null, mode = "add" }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    activity: "",
    type: "",
    date: null,
    startTime: "",
    endTime: "",
    venue: "",
    instructor: "",
    maxParticipants: "",
    description: "",
    requirements: "",
    recurring: false,
    frequency: "",
    endDate: null,
    reminder: false,
    reminderTime: "",
    status: "Scheduled",
  })

  useEffect(() => {
    if (session && (mode === "edit" || mode === "view")) {
      setFormData({
        title: session.title || "",
        activity: session.activity || "",
        type: session.type || "",
        date: session.date ? new Date(session.date) : null,
        startTime: session.startTime || "",
        endTime: session.endTime || "",
        venue: session.venue || "",
        instructor: session.instructor || "",
        maxParticipants: session.maxParticipants?.toString() || "",
        description: session.description || "",
        requirements: session.requirements || "",
        recurring: session.recurring || false,
        frequency: session.frequency || "",
        endDate: session.endDate ? new Date(session.endDate) : null,
        reminder: session.reminder || false,
        reminderTime: session.reminderTime || "",
        status: session.status || "Scheduled",
      })
    } else {
      setFormData({
        title: "",
        activity: "",
        type: "",
        date: null,
        startTime: "",
        endTime: "",
        venue: "",
        instructor: "",
        maxParticipants: "",
        description: "",
        requirements: "",
        recurring: false,
        frequency: "",
        endDate: null,
        reminder: false,
        reminderTime: "",
        status: "Scheduled",
      })
    }
  }, [session, mode])

  const activities = [
    "Football Club",
    "Basketball Club",
    "Drama Club",
    "Music Club",
    "Science Club",
    "Chess Club",
    "Art Club",
    "Debate Club",
    "Environmental Club",
    "Computer Club",
  ]

  const sessionTypes = [
    "Training",
    "Practice",
    "Meeting",
    "Competition",
    "Workshop",
    "Performance",
    "Tournament",
    "Rehearsal",
  ]

  const frequencies = ["Daily", "Weekly", "Bi-weekly", "Monthly"]

  const instructors = [
    "Mr. James Kiprop",
    "Ms. Faith Wanjiru",
    "Dr. Mary Njeri",
    "Mr. Paul Kimani",
    "Mrs. Grace Muthoni",
    "Mr. David Ochieng",
    "Ms. Sarah Wanjiku",
  ]

  const venues = [
    "Main Hall",
    "Sports Field",
    "Music Room",
    "Art Studio",
    "Science Lab",
    "Computer Lab",
    "Library",
    "Gymnasium",
    "Outdoor Court",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.activity || !formData.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const action = mode === "add" ? "scheduled" : "updated"
    toast({
      title: "Success",
      description: `Session ${action} successfully!`,
    })

    onClose()
  }

  const isReadOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {mode === "add" && "Schedule New Session"}
            {mode === "edit" && "Edit Session"}
            {mode === "view" && "Session Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add" && "Schedule a new activity session"}
            {mode === "edit" && "Update session information"}
            {mode === "view" && "View session details and information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Session Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter session title"
                disabled={isReadOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity">Activity *</Label>
              <Select
                value={formData.activity}
                onValueChange={(value) => handleInputChange("activity", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  {activities.map((activity) => (
                    <SelectItem key={activity} value={activity}>
                      {activity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Session Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Select
                value={formData.instructor}
                onValueChange={(value) => handleInputChange("instructor", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor} value={instructor}>
                      {instructor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Select
                value={formData.venue}
                onValueChange={(value) => handleInputChange("venue", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select venue" />
                </SelectTrigger>
                <SelectContent>
                  {venues.map((venue) => (
                    <SelectItem key={venue} value={venue}>
                      {venue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Session Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground",
                    )}
                    disabled={isReadOnly}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleInputChange("date", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxParticipants">Maximum Participants</Label>
            <Input
              id="maxParticipants"
              type="number"
              value={formData.maxParticipants}
              onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
              placeholder="Enter max participants"
              disabled={isReadOnly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the session..."
              rows={3}
              disabled={isReadOnly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange("requirements", e.target.value)}
              placeholder="List any requirements..."
              rows={2}
              disabled={isReadOnly}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                Recurring Session
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recurring"
                  checked={formData.recurring}
                  onCheckedChange={(checked) => handleInputChange("recurring", checked)}
                  disabled={isReadOnly}
                />
                <Label htmlFor="recurring">Make this a recurring session</Label>
              </div>

              {formData.recurring && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={formData.frequency}
                      onValueChange={(value) => handleInputChange("frequency", value)}
                      disabled={isReadOnly}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {frequencies.map((frequency) => (
                          <SelectItem key={frequency} value={frequency}>
                            {frequency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.endDate && "text-muted-foreground",
                          )}
                          disabled={isReadOnly}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : "Pick end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => handleInputChange("endDate", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Reminder Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reminder"
                  checked={formData.reminder}
                  onCheckedChange={(checked) => handleInputChange("reminder", checked)}
                  disabled={isReadOnly}
                />
                <Label htmlFor="reminder">Send reminder notifications</Label>
              </div>

              {formData.reminder && (
                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Reminder Time</Label>
                  <Select
                    value={formData.reminderTime}
                    onValueChange={(value) => handleInputChange("reminderTime", value)}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select reminder time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15min">15 minutes before</SelectItem>
                      <SelectItem value="30min">30 minutes before</SelectItem>
                      <SelectItem value="1hour">1 hour before</SelectItem>
                      <SelectItem value="1day">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {mode === "view" && session && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Session Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline">{session.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Registered</p>
                    <p className="font-medium">{session.registered || 0} participants</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{session.maxParticipants || 0} max</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!isReadOnly && (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{mode === "add" ? "Schedule Session" : "Update Session"}</Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

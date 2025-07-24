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
import { CalendarIcon, Award, Trophy, Medal, Star, Plus, X, Users } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function AchievementModal({ isOpen, onClose, achievement = null, mode = "add" }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    activity: "",
    category: "",
    date: null,
    level: "",
    position: "",
    description: "",
    participants: [],
    coach: "",
    venue: "",
    competition: "",
    certificate: "",
    photos: [],
    notes: "",
    recognition: "",
  })

  const [newParticipant, setNewParticipant] = useState("")

  useEffect(() => {
    if (achievement && (mode === "edit" || mode === "view")) {
      setFormData({
        title: achievement.title || "",
        activity: achievement.activity || "",
        category: achievement.category || "",
        date: achievement.date ? new Date(achievement.date) : null,
        level: achievement.level || "",
        position: achievement.position || "",
        description: achievement.description || "",
        participants: achievement.participants || [],
        coach: achievement.coach || "",
        venue: achievement.venue || "",
        competition: achievement.competition || "",
        certificate: achievement.certificate || "",
        photos: achievement.photos || [],
        notes: achievement.notes || "",
        recognition: achievement.recognition || "",
      })
    } else {
      setFormData({
        title: "",
        activity: "",
        category: "",
        date: null,
        level: "",
        position: "",
        description: "",
        participants: [],
        coach: "",
        venue: "",
        competition: "",
        certificate: "",
        photos: [],
        notes: "",
        recognition: "",
      })
    }
  }, [achievement, mode])

  const categories = [
    "Sports",
    "Arts",
    "Academic",
    "Music",
    "Drama",
    "Science",
    "Technology",
    "Leadership",
    "Community Service",
  ]

  const levels = ["School", "District", "County", "Regional", "National", "International"]

  const positions = [
    "1st Place",
    "2nd Place",
    "3rd Place",
    "Winner",
    "Runner-up",
    "Finalist",
    "Participant",
    "Best Performance",
    "Most Improved",
    "Outstanding Achievement",
  ]

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setFormData((prev) => ({
        ...prev,
        participants: [...prev.participants, newParticipant.trim()],
      }))
      setNewParticipant("")
    }
  }

  const removeParticipant = (index) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index),
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

    const action = mode === "add" ? "recorded" : "updated"
    toast({
      title: "Success",
      description: `Achievement ${action} successfully!`,
    })

    onClose()
  }

  const isReadOnly = mode === "view"

  const getPositionIcon = (position) => {
    if (position.includes("1st") || position === "Winner") return <Trophy className="h-4 w-4 text-yellow-500" />
    if (position.includes("2nd") || position === "Runner-up") return <Medal className="h-4 w-4 text-gray-400" />
    if (position.includes("3rd")) return <Medal className="h-4 w-4 text-amber-600" />
    return <Star className="h-4 w-4 text-blue-500" />
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            {mode === "add" && "Record New Achievement"}
            {mode === "edit" && "Edit Achievement"}
            {mode === "view" && "Achievement Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add" && "Record a new student achievement or award"}
            {mode === "edit" && "Update achievement information"}
            {mode === "view" && "View achievement details and information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Achievement Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter achievement title"
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
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                disabled={isReadOnly}
              >
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
              <Label htmlFor="level">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleInputChange("level", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position/Award</Label>
              <Select
                value={formData.position}
                onValueChange={(value) => handleInputChange("position", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      <div className="flex items-center gap-2">
                        {getPositionIcon(position)}
                        {position}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Achievement Date *</Label>
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
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => handleInputChange("venue", e.target.value)}
                placeholder="Enter venue"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the achievement..."
              rows={3}
              disabled={isReadOnly}
            />
          </div>

          <div className="space-y-2">
            <Label>Participants</Label>
            <div className="flex gap-2">
              <Input
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                placeholder="Add participant name..."
                disabled={isReadOnly}
              />
              <Button type="button" onClick={addParticipant} disabled={isReadOnly}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.participants.map((participant, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {participant}
                  {!isReadOnly && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeParticipant(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coach">Coach/Teacher</Label>
              <Input
                id="coach"
                value={formData.coach}
                onChange={(e) => handleInputChange("coach", e.target.value)}
                placeholder="Enter coach/teacher name"
                disabled={isReadOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="competition">Competition/Event</Label>
              <Input
                id="competition"
                value={formData.competition}
                onChange={(e) => handleInputChange("competition", e.target.value)}
                placeholder="Enter competition name"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recognition">Recognition/Certificate</Label>
            <Input
              id="recognition"
              value={formData.recognition}
              onChange={(e) => handleInputChange("recognition", e.target.value)}
              placeholder="Enter certificate or recognition details"
              disabled={isReadOnly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any additional notes or comments..."
              rows={3}
              disabled={isReadOnly}
            />
          </div>

          {mode === "view" && achievement && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Achievement Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <Badge variant="outline">{achievement.level}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Position</p>
                    <div className="flex items-center gap-2">
                      {getPositionIcon(achievement.position)}
                      <Badge variant="default">{achievement.position}</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <p className="font-medium">{achievement.participants?.length || 0} students</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{achievement.date}</p>
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
              <Button type="submit">{mode === "add" ? "Record Achievement" : "Update Achievement"}</Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

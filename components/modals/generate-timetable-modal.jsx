"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { X, Wand2, Settings, Clock, Users, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GenerateTimetableModal({ onClose, onGenerate }) {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState("")
  const [settings, setSettings] = useState({
    // Basic Settings
    academicYear: "2024-2025",
    term: "term2",
    startDate: "2024-01-15",
    endDate: "2024-04-12",

    // Schedule Configuration
    schoolStartTime: "08:00",
    schoolEndTime: "15:00",
    periodDuration: 40,
    breakDuration: 20,
    lunchDuration: 40,
    periodsPerDay: 8,
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],

    // Optimization Preferences
    teacherWorkloadBalance: [80], // 80%
    roomUtilizationTarget: [75], // 75%
    consecutivePeriodsLimit: 3,
    minimumBreakBetweenSubjects: false,
    prioritizeSpecializedRooms: true,
    avoidBackToBackClasses: true,

    // Subject Constraints
    coreSubjectsPriority: true,
    practicalSubjectsInLabs: true,
    physicalEducationOutdoor: true,

    // Advanced Options
    allowSplitClasses: false,
    enableSubstitutions: true,
    considerTeacherPreferences: true,
    optimizeRoomTransitions: true,

    // Classes to Include
    selectedClasses: [],
    selectedSubjects: [],
    selectedTeachers: [],
  })

  // Sample data
  const classes = ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 7B", "Grade 8A", "Grade 8B", "Grade 9A", "Grade 9B"]

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
    "Mr. John Kamau",
    "Ms. Sarah Wanjiku",
    "Dr. Mary Njeri",
    "Mr. Peter Mwangi",
    "Ms. Grace Achieng",
    "Mr. David Ochieng",
    "Mr. James Kiprop",
    "Ms. Faith Wanjiru",
  ]

  const terms = [
    { value: "term1", label: "Term 1 (Jan - Apr)" },
    { value: "term2", label: "Term 2 (May - Aug)" },
    { value: "term3", label: "Term 3 (Sep - Dec)" },
  ]

  const workingDaysOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
  ]

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleArrayToggle = (array, item, key) => {
    const newArray = array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
    handleSettingChange(key, newArray)
  }

  const handleSelectAll = (items, key) => {
    const currentArray = settings[key]
    const newArray = currentArray.length === items.length ? [] : [...items]
    handleSettingChange(key, newArray)
  }

  const simulateGeneration = async () => {
    const steps = [
      { step: "Initializing generation parameters...", progress: 10 },
      { step: "Analyzing teacher availability...", progress: 20 },
      { step: "Checking room constraints...", progress: 30 },
      { step: "Optimizing subject distribution...", progress: 45 },
      { step: "Resolving scheduling conflicts...", progress: 60 },
      { step: "Balancing teacher workload...", progress: 75 },
      { step: "Finalizing room assignments...", progress: 90 },
      { step: "Generating timetable document...", progress: 100 },
    ]

    for (const { step, progress } of steps) {
      setGenerationStep(step)
      setGenerationProgress(progress)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }
  }

  const handleGenerate = async () => {
    // Validation
    if (settings.selectedClasses.length === 0) {
      toast({
        title: "No Classes Selected",
        description: "Please select at least one class to generate timetable for",
        variant: "destructive",
      })
      return
    }

    if (settings.workingDays.length === 0) {
      toast({
        title: "No Working Days",
        description: "Please select at least one working day",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationStep("Starting generation...")

    try {
      await simulateGeneration()

      const timetableData = {
        id: `TT${Date.now()}`,
        settings,
        generatedAt: new Date().toISOString(),
        status: "generated",
        conflicts: Math.floor(Math.random() * 3), // Simulate conflicts
        efficiency: Math.floor(Math.random() * 20) + 80, // 80-100%
      }

      onGenerate(timetableData)

      toast({
        title: "Timetable Generated Successfully",
        description: `New timetable created with ${timetableData.conflicts} conflicts to resolve`,
      })

      setIsGenerating(false)
    } catch (error) {
      setIsGenerating(false)
      toast({
        title: "Generation Failed",
        description: "There was an error generating the timetable. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Generate Timetable
            </CardTitle>
            <CardDescription>Create an optimized timetable using AI-powered scheduling</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isGenerating}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {isGenerating && (
            <div className="p-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                <h4 className="font-medium">Generating Timetable...</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{generationStep}</span>
                  <span>{generationProgress}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
              </div>
            </div>
          )}

          {!isGenerating && (
            <>
              {/* Basic Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Basic Configuration
                </h4>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input
                      id="academicYear"
                      value={settings.academicYear}
                      onChange={(e) => handleSettingChange("academicYear", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="term">Term</Label>
                    <Select value={settings.term} onValueChange={(value) => handleSettingChange("term", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {terms.map((term) => (
                          <SelectItem key={term.value} value={term.value}>
                            {term.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={settings.startDate}
                      onChange={(e) => handleSettingChange("startDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={settings.endDate}
                      onChange={(e) => handleSettingChange("endDate", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Schedule Configuration
                </h4>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="schoolStartTime">School Start Time</Label>
                    <Input
                      id="schoolStartTime"
                      type="time"
                      value={settings.schoolStartTime}
                      onChange={(e) => handleSettingChange("schoolStartTime", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schoolEndTime">School End Time</Label>
                    <Input
                      id="schoolEndTime"
                      type="time"
                      value={settings.schoolEndTime}
                      onChange={(e) => handleSettingChange("schoolEndTime", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="periodDuration">Period Duration (minutes)</Label>
                    <Input
                      id="periodDuration"
                      type="number"
                      value={settings.periodDuration}
                      onChange={(e) => handleSettingChange("periodDuration", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
                    <Input
                      id="breakDuration"
                      type="number"
                      value={settings.breakDuration}
                      onChange={(e) => handleSettingChange("breakDuration", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lunchDuration">Lunch Duration (minutes)</Label>
                    <Input
                      id="lunchDuration"
                      type="number"
                      value={settings.lunchDuration}
                      onChange={(e) => handleSettingChange("lunchDuration", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="periodsPerDay">Periods Per Day</Label>
                    <Input
                      id="periodsPerDay"
                      type="number"
                      value={settings.periodsPerDay}
                      onChange={(e) => handleSettingChange("periodsPerDay", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Working Days</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleSelectAll(
                          workingDaysOptions.map((d) => d.value),
                          "workingDays",
                        )
                      }
                    >
                      {settings.workingDays.length === workingDaysOptions.length ? "Deselect All" : "Select All"}
                    </Button>
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    {workingDaysOptions.map((day) => (
                      <div key={day.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day.value}`}
                          checked={settings.workingDays.includes(day.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleSettingChange("workingDays", [...settings.workingDays, day.value])
                            } else {
                              handleSettingChange(
                                "workingDays",
                                settings.workingDays.filter((d) => d !== day.value),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={`day-${day.value}`}>{day.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Optimization Settings */}
              <div className="space-y-4">
                <h4 className="font-medium">Optimization Settings</h4>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Teacher Workload Balance: {settings.teacherWorkloadBalance[0]}%</Label>
                      <Slider
                        value={settings.teacherWorkloadBalance}
                        onValueChange={(value) => handleSettingChange("teacherWorkloadBalance", value)}
                        max={100}
                        min={50}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Room Utilization Target: {settings.roomUtilizationTarget[0]}%</Label>
                      <Slider
                        value={settings.roomUtilizationTarget}
                        onValueChange={(value) => handleSettingChange("roomUtilizationTarget", value)}
                        max={100}
                        min={40}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="consecutiveLimit">Max Consecutive Periods</Label>
                      <Input
                        id="consecutiveLimit"
                        type="number"
                        value={settings.consecutivePeriodsLimit}
                        onChange={(e) =>
                          handleSettingChange("consecutivePeriodsLimit", Number.parseInt(e.target.value))
                        }
                        min={1}
                        max={6}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="minimumBreak"
                        checked={settings.minimumBreakBetweenSubjects}
                        onCheckedChange={(checked) => handleSettingChange("minimumBreakBetweenSubjects", checked)}
                      />
                      <Label htmlFor="minimumBreak">Minimum break between same subjects</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="prioritizeRooms"
                        checked={settings.prioritizeSpecializedRooms}
                        onCheckedChange={(checked) => handleSettingChange("prioritizeSpecializedRooms", checked)}
                      />
                      <Label htmlFor="prioritizeRooms">Prioritize specialized rooms</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="avoidBackToBack"
                        checked={settings.avoidBackToBackClasses}
                        onCheckedChange={(checked) => handleSettingChange("avoidBackToBackClasses", checked)}
                      />
                      <Label htmlFor="avoidBackToBack">Avoid back-to-back classes</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="coreSubjects"
                        checked={settings.coreSubjectsPriority}
                        onCheckedChange={(checked) => handleSettingChange("coreSubjectsPriority", checked)}
                      />
                      <Label htmlFor="coreSubjects">Prioritize core subjects</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="practicalLabs"
                        checked={settings.practicalSubjectsInLabs}
                        onCheckedChange={(checked) => handleSettingChange("practicalSubjectsInLabs", checked)}
                      />
                      <Label htmlFor="practicalLabs">Schedule practical subjects in labs</Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Filters */}
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Classes & Subjects Selection
                </h4>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Classes to Include</Label>
                      <Button variant="outline" size="sm" onClick={() => handleSelectAll(classes, "selectedClasses")}>
                        {settings.selectedClasses.length === classes.length ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2 max-h-32 overflow-y-auto border rounded p-2">
                      {classes.map((cls) => (
                        <div key={cls} className="flex items-center space-x-2">
                          <Checkbox
                            id={`class-${cls}`}
                            checked={settings.selectedClasses.includes(cls)}
                            onCheckedChange={() => handleArrayToggle(settings.selectedClasses, cls, "selectedClasses")}
                          />
                          <Label htmlFor={`class-${cls}`} className="text-sm">
                            {cls}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {settings.selectedClasses.length} of {classes.length} classes selected
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Subjects to Include</Label>
                      <Button variant="outline" size="sm" onClick={() => handleSelectAll(subjects, "selectedSubjects")}>
                        {settings.selectedSubjects.length === subjects.length ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    <div className="grid gap-2 md:grid-cols-1 max-h-32 overflow-y-auto border rounded p-2">
                      {subjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subject-${subject}`}
                            checked={settings.selectedSubjects.includes(subject)}
                            onCheckedChange={() =>
                              handleArrayToggle(settings.selectedSubjects, subject, "selectedSubjects")
                            }
                          />
                          <Label htmlFor={`subject-${subject}`} className="text-sm">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {settings.selectedSubjects.length} of {subjects.length} subjects selected
                    </div>
                  </div>
                </div>
              </div>

              {/* Generation Summary */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Generation Summary</h4>
                <div className="grid gap-2 md:grid-cols-2 text-sm">
                  <div>Classes: {settings.selectedClasses.length} selected</div>
                  <div>Subjects: {settings.selectedSubjects.length} selected</div>
                  <div>Working Days: {settings.workingDays.length} days</div>
                  <div>Periods per Day: {settings.periodsPerDay}</div>
                  <div>Period Duration: {settings.periodDuration} minutes</div>
                  <div>Target Efficiency: {settings.teacherWorkloadBalance[0]}%</div>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isGenerating}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating || settings.selectedClasses.length === 0}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Timetable
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

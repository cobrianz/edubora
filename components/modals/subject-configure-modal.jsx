"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { X, Settings, BookOpen, Plus, Trash2, Save, Target, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SubjectConfigureModal({ subject, onClose, onSave }) {
  const { toast } = useToast()
  const [config, setConfig] = useState({
    basic: {
      name: subject?.name || "",
      code: subject?.code || "",
      description: subject?.description || "",
      grade: subject?.grade || "",
      department: subject?.department || "",
      credits: subject?.credits || 1,
      hoursPerWeek: subject?.hoursPerWeek || 4,
      isActive: subject?.isActive ?? true,
      isMandatory: subject?.isMandatory ?? true,
    },
    curriculum: {
      learningAreas: subject?.learningAreas || [],
      strands: subject?.strands || [],
      subStrands: subject?.subStrands || [],
      competencies: subject?.competencies || [],
      values: subject?.values || [],
    },
    assessment: {
      formativeWeight: subject?.formativeWeight || 40,
      summativeWeight: subject?.summativeWeight || 60,
      methods: subject?.assessmentMethods || [],
      rubrics: subject?.rubrics || [],
      gradingScale: subject?.gradingScale || "percentage",
    },
    resources: {
      textbooks: subject?.textbooks || [],
      digitalResources: subject?.digitalResources || [],
      materials: subject?.materials || [],
      equipment: subject?.equipment || [],
    },
    schedule: {
      termStructure: subject?.termStructure || "3-term",
      periodsPerWeek: subject?.periodsPerWeek || 5,
      periodDuration: subject?.periodDuration || 40,
      topics: subject?.topics || {},
    },
    settings: {
      allowMakeup: subject?.allowMakeup ?? true,
      requiresPrerequisites: subject?.requiresPrerequisites ?? false,
      prerequisites: subject?.prerequisites || [],
      maxStudents: subject?.maxStudents || 35,
      minStudents: subject?.minStudents || 10,
    },
  })

  const [newItem, setNewItem] = useState("")
  const [activeSection, setActiveSection] = useState("basic")

  const cbcLearningAreas = [
    "Languages",
    "Mathematics",
    "Environmental Activities",
    "Hygiene and Nutrition Activities",
    "Creative Activities",
    "Movement and Creative Activities",
    "Religious Education",
  ]

  const cbcCompetencies = [
    "Communication and Collaboration",
    "Critical Thinking and Problem Solving",
    "Imagination and Creativity",
    "Citizenship",
    "Digital Literacy",
    "Learning to Learn",
    "Self-Efficacy",
  ]

  const cbcValues = ["Love", "Responsibility", "Respect", "Unity", "Peace", "Patriotism", "Social Justice", "Integrity"]

  const assessmentMethods = [
    "Observation",
    "Oral Questions",
    "Written Tests",
    "Projects",
    "Portfolios",
    "Practical Activities",
    "Peer Assessment",
    "Self Assessment",
  ]

  const handleBasicChange = (field, value) => {
    setConfig({
      ...config,
      basic: { ...config.basic, [field]: value },
    })
  }

  const handleCurriculumChange = (field, value) => {
    setConfig({
      ...config,
      curriculum: { ...config.curriculum, [field]: value },
    })
  }

  const handleAssessmentChange = (field, value) => {
    setConfig({
      ...config,
      assessment: { ...config.assessment, [field]: value },
    })
  }

  const handleResourceChange = (field, value) => {
    setConfig({
      ...config,
      resources: { ...config.resources, [field]: value },
    })
  }

  const handleScheduleChange = (field, value) => {
    setConfig({
      ...config,
      schedule: { ...config.schedule, [field]: value },
    })
  }

  const handleSettingsChange = (field, value) => {
    setConfig({
      ...config,
      settings: { ...config.settings, [field]: value },
    })
  }

  const addToArray = (section, field, value) => {
    if (value.trim()) {
      const currentArray = config[section][field]
      setConfig({
        ...config,
        [section]: {
          ...config[section],
          [field]: [...currentArray, value.trim()],
        },
      })
      setNewItem("")
    }
  }

  const removeFromArray = (section, field, index) => {
    const currentArray = config[section][field]
    setConfig({
      ...config,
      [section]: {
        ...config[section],
        [field]: currentArray.filter((_, i) => i !== index),
      },
    })
  }

  const toggleArrayItem = (section, field, item) => {
    const currentArray = config[section][field]
    const isSelected = currentArray.includes(item)

    if (isSelected) {
      setConfig({
        ...config,
        [section]: {
          ...config[section],
          [field]: currentArray.filter((i) => i !== item),
        },
      })
    } else {
      setConfig({
        ...config,
        [section]: {
          ...config[section],
          [field]: [...currentArray, item],
        },
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!config.basic.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a subject name",
        variant: "destructive",
      })
      return
    }

    if (!config.basic.code.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a subject code",
        variant: "destructive",
      })
      return
    }

    // Validate assessment weights
    const totalWeight = config.assessment.formativeWeight + config.assessment.summativeWeight
    if (totalWeight !== 100) {
      toast({
        title: "Invalid Assessment Configuration",
        description: `Assessment weights must total 100% (currently ${totalWeight}%)`,
        variant: "destructive",
      })
      return
    }

    onSave(config)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configure Subject: {config.basic.name || "New Subject"}
            </CardTitle>
            <CardDescription>Comprehensive CBC-aligned subject configuration and curriculum setup</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Subject Name *</Label>
                        <Input
                          id="name"
                          value={config.basic.name}
                          onChange={(e) => handleBasicChange("name", e.target.value)}
                          placeholder="e.g., Mathematics"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="code">Subject Code *</Label>
                        <Input
                          id="code"
                          value={config.basic.code}
                          onChange={(e) => handleBasicChange("code", e.target.value)}
                          placeholder="e.g., MATH7"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="grade">Grade Level</Label>
                        <Select value={config.basic.grade} onValueChange={(value) => handleBasicChange("grade", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Grade 6">Grade 6</SelectItem>
                            <SelectItem value="Grade 7">Grade 7</SelectItem>
                            <SelectItem value="Grade 8">Grade 8</SelectItem>
                            <SelectItem value="Grade 9">Grade 9</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={config.basic.department}
                          onValueChange={(value) => handleBasicChange("department", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Languages">Languages</SelectItem>
                            <SelectItem value="Sciences">Sciences</SelectItem>
                            <SelectItem value="Social Studies">Social Studies</SelectItem>
                            <SelectItem value="Creative Arts">Creative Arts</SelectItem>
                            <SelectItem value="Physical Education">Physical Education</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="credits">Credits</Label>
                        <Input
                          id="credits"
                          type="number"
                          value={config.basic.credits}
                          onChange={(e) => handleBasicChange("credits", Number(e.target.value))}
                          min="1"
                          max="10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                        <Input
                          id="hoursPerWeek"
                          type="number"
                          value={config.basic.hoursPerWeek}
                          onChange={(e) => handleBasicChange("hoursPerWeek", Number(e.target.value))}
                          min="1"
                          max="20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={config.basic.description}
                        onChange={(e) => handleBasicChange("description", e.target.value)}
                        placeholder="Describe the subject and its objectives..."
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isActive"
                          checked={config.basic.isActive}
                          onCheckedChange={(checked) => handleBasicChange("isActive", checked)}
                        />
                        <Label htmlFor="isActive">Active Subject</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isMandatory"
                          checked={config.basic.isMandatory}
                          onCheckedChange={(checked) => handleBasicChange("isMandatory", checked)}
                        />
                        <Label htmlFor="isMandatory">Mandatory Subject</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      CBC Curriculum Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Learning Areas</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {cbcLearningAreas.map((area) => (
                            <Badge
                              key={area}
                              variant={config.curriculum.learningAreas.includes(area) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleArrayItem("curriculum", "learningAreas", area)}
                            >
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Core Competencies</Label>
                        <div className="grid gap-2 md:grid-cols-2 mt-2">
                          {cbcCompetencies.map((competency) => (
                            <div key={competency} className="flex items-center space-x-2">
                              <Checkbox
                                id={`competency-${competency}`}
                                checked={config.curriculum.competencies.includes(competency)}
                                onCheckedChange={() => toggleArrayItem("curriculum", "competencies", competency)}
                              />
                              <Label htmlFor={`competency-${competency}`} className="text-sm">
                                {competency}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Values</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {cbcValues.map((value) => (
                            <Badge
                              key={value}
                              variant={config.curriculum.values.includes(value) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => toggleArrayItem("curriculum", "values", value)}
                            >
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Learning Strands</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Add learning strand"
                            onKeyPress={(e) =>
                              e.key === "Enter" && (e.preventDefault(), addToArray("curriculum", "strands", newItem))
                            }
                          />
                          <Button type="button" onClick={() => addToArray("curriculum", "strands", newItem)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {config.curriculum.strands.map((strand, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeFromArray("curriculum", "strands", index)}
                            >
                              {strand} <X className="h-3 w-3 ml-1" />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Assessment Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">Assessment Weights</Label>
                        <div className="grid gap-4 md:grid-cols-2 mt-4">
                          <div className="space-y-2">
                            <Label>Formative Assessment (%)</Label>
                            <Slider
                              value={[config.assessment.formativeWeight]}
                              onValueChange={(value) => handleAssessmentChange("formativeWeight", value[0])}
                              max={70}
                              step={5}
                              className="w-full"
                            />
                            <div className="text-center text-sm text-muted-foreground">
                              {config.assessment.formativeWeight}%
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Summative Assessment (%)</Label>
                            <Slider
                              value={[config.assessment.summativeWeight]}
                              onValueChange={(value) => handleAssessmentChange("summativeWeight", value[0])}
                              max={70}
                              step={5}
                              className="w-full"
                            />
                            <div className="text-center text-sm text-muted-foreground">
                              {config.assessment.summativeWeight}%
                            </div>
                          </div>
                        </div>
                        <div className="text-center text-sm text-muted-foreground mt-2">
                          Total: {config.assessment.formativeWeight + config.assessment.summativeWeight}%
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium">Assessment Methods</Label>
                        <div className="grid gap-2 md:grid-cols-2 mt-2">
                          {assessmentMethods.map((method) => (
                            <div key={method} className="flex items-center space-x-2">
                              <Checkbox
                                id={`method-${method}`}
                                checked={config.assessment.methods.includes(method)}
                                onCheckedChange={() => toggleArrayItem("assessment", "methods", method)}
                              />
                              <Label htmlFor={`method-${method}`} className="text-sm">
                                {method}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Grading Scale</Label>
                        <Select
                          value={config.assessment.gradingScale}
                          onValueChange={(value) => handleAssessmentChange("gradingScale", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                            <SelectItem value="letter">Letter Grades (A-E)</SelectItem>
                            <SelectItem value="competency">Competency Levels (1-4)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {["textbooks", "digitalResources", "materials", "equipment"].map((resourceType) => (
                      <div key={resourceType}>
                        <Label className="text-base font-medium capitalize">
                          {resourceType.replace(/([A-Z])/g, " $1")}
                        </Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder={`Add ${resourceType.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                            onKeyPress={(e) =>
                              e.key === "Enter" && (e.preventDefault(), addToArray("resources", resourceType, newItem))
                            }
                          />
                          <Button type="button" onClick={() => addToArray("resources", resourceType, newItem)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2 mt-2">
                          {config.resources[resourceType].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <span className="text-sm">{item}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromArray("resources", resourceType, index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Term Structure</Label>
                        <Select
                          value={config.schedule.termStructure}
                          onValueChange={(value) => handleScheduleChange("termStructure", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3-term">3 Terms</SelectItem>
                            <SelectItem value="2-semester">2 Semesters</SelectItem>
                            <SelectItem value="4-quarter">4 Quarters</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Periods per Week</Label>
                        <Input
                          type="number"
                          value={config.schedule.periodsPerWeek}
                          onChange={(e) => handleScheduleChange("periodsPerWeek", Number(e.target.value))}
                          min="1"
                          max="10"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Period Duration (minutes)</Label>
                        <Input
                          type="number"
                          value={config.schedule.periodDuration}
                          onChange={(e) => handleScheduleChange("periodDuration", Number(e.target.value))}
                          min="30"
                          max="90"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Maximum Students</Label>
                        <Input
                          type="number"
                          value={config.settings.maxStudents}
                          onChange={(e) => handleSettingsChange("maxStudents", Number(e.target.value))}
                          min="1"
                          max="50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Minimum Students</Label>
                        <Input
                          type="number"
                          value={config.settings.minStudents}
                          onChange={(e) => handleSettingsChange("minStudents", Number(e.target.value))}
                          min="1"
                          max="20"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="allowMakeup"
                          checked={config.settings.allowMakeup}
                          onCheckedChange={(checked) => handleSettingsChange("allowMakeup", checked)}
                        />
                        <Label htmlFor="allowMakeup">Allow Makeup Assessments</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="requiresPrerequisites"
                          checked={config.settings.requiresPrerequisites}
                          onCheckedChange={(checked) => handleSettingsChange("requiresPrerequisites", checked)}
                        />
                        <Label htmlFor="requiresPrerequisites">Requires Prerequisites</Label>
                      </div>
                    </div>

                    {config.settings.requiresPrerequisites && (
                      <div>
                        <Label className="text-base font-medium">Prerequisites</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="Add prerequisite subject"
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              (e.preventDefault(), addToArray("settings", "prerequisites", newItem))
                            }
                          />
                          <Button type="button" onClick={() => addToArray("settings", "prerequisites", newItem)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {config.settings.prerequisites.map((prereq, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeFromArray("settings", "prerequisites", index)}
                            >
                              {prereq} <X className="h-3 w-3 ml-1" />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

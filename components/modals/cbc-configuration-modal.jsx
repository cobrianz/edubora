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
import { X, Settings, Plus, Trash2, Save, Target, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CBCConfigurationModal({ onClose, onSave }) {
  const { toast } = useToast()
  const [config, setConfig] = useState({
    learningAreas: [
      { id: 1, name: "Languages", subjects: ["English", "Kiswahili"], color: "#3b82f6" },
      { id: 2, name: "Mathematics", subjects: ["Mathematics"], color: "#10b981" },
      { id: 3, name: "Environment", subjects: ["Science", "Social Studies"], color: "#f59e0b" },
      { id: 4, name: "Creative Arts", subjects: ["Art & Craft", "Music"], color: "#ef4444" },
    ],
    coreCompetencies: [
      { id: 1, name: "Communication and Collaboration", weight: 20, description: "Ability to communicate effectively" },
      { id: 2, name: "Critical Thinking and Problem Solving", weight: 25, description: "Analytical thinking skills" },
      { id: 3, name: "Creativity and Imagination", weight: 15, description: "Creative expression and innovation" },
      { id: 4, name: "Citizenship", weight: 15, description: "Social responsibility and ethics" },
      { id: 5, name: "Digital Literacy", weight: 15, description: "Technology skills and digital citizenship" },
      { id: 6, name: "Learning to Learn", weight: 10, description: "Self-directed learning abilities" },
    ],
    assessmentStructure: {
      formativeWeight: 40,
      summativeWeight: 60,
      rubricLevels: [
        "Exceeding Expectations",
        "Meeting Expectations",
        "Approaching Expectations",
        "Below Expectations",
      ],
      gradingScale: {
        A: { min: 80, max: 100, description: "Exceeding Expectations" },
        B: { min: 65, max: 79, description: "Meeting Expectations" },
        C: { min: 50, max: 64, description: "Approaching Expectations" },
        D: { min: 0, max: 49, description: "Below Expectations" },
      },
    },
    progressTracking: {
      enablePortfolio: true,
      enablePeerAssessment: true,
      enableSelfAssessment: true,
      trackingFrequency: "Weekly",
      reportingPeriods: ["Term 1", "Term 2", "Term 3"],
    },
    values: ["Respect", "Responsibility", "Social Justice", "Integrity", "Love", "Unity", "Peace"],
  })

  const [newLearningArea, setNewLearningArea] = useState({ name: "", subjects: [], color: "#3b82f6" })
  const [newCompetency, setNewCompetency] = useState({ name: "", weight: 0, description: "" })
  const [newValue, setNewValue] = useState("")
  const [newSubject, setNewSubject] = useState("")

  const handleConfigChange = (section, field, value) => {
    setConfig({
      ...config,
      [section]: { ...config[section], [field]: value },
    })
  }

  const addLearningArea = () => {
    if (newLearningArea.name.trim()) {
      setConfig({
        ...config,
        learningAreas: [
          ...config.learningAreas,
          {
            id: config.learningAreas.length + 1,
            ...newLearningArea,
            subjects: newLearningArea.subjects.filter((s) => s.trim()),
          },
        ],
      })
      setNewLearningArea({ name: "", subjects: [], color: "#3b82f6" })
    }
  }

  const removeLearningArea = (id) => {
    setConfig({
      ...config,
      learningAreas: config.learningAreas.filter((area) => area.id !== id),
    })
  }

  const addCompetency = () => {
    if (newCompetency.name.trim()) {
      setConfig({
        ...config,
        coreCompetencies: [
          ...config.coreCompetencies,
          {
            id: config.coreCompetencies.length + 1,
            ...newCompetency,
          },
        ],
      })
      setNewCompetency({ name: "", weight: 0, description: "" })
    }
  }

  const removeCompetency = (id) => {
    setConfig({
      ...config,
      coreCompetencies: config.coreCompetencies.filter((comp) => comp.id !== id),
    })
  }

  const addValue = () => {
    if (newValue.trim() && !config.values.includes(newValue.trim())) {
      setConfig({
        ...config,
        values: [...config.values, newValue.trim()],
      })
      setNewValue("")
    }
  }

  const removeValue = (value) => {
    setConfig({
      ...config,
      values: config.values.filter((v) => v !== value),
    })
  }

  const addSubjectToArea = (areaId) => {
    if (newSubject.trim()) {
      setConfig({
        ...config,
        learningAreas: config.learningAreas.map((area) =>
          area.id === areaId ? { ...area, subjects: [...area.subjects, newSubject.trim()] } : area,
        ),
      })
      setNewSubject("")
    }
  }

  const removeSubjectFromArea = (areaId, subject) => {
    setConfig({
      ...config,
      learningAreas: config.learningAreas.map((area) =>
        area.id === areaId ? { ...area, subjects: area.subjects.filter((s) => s !== subject) } : area,
      ),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate competency weights
    const totalWeight = config.coreCompetencies.reduce((sum, comp) => sum + comp.weight, 0)
    if (totalWeight !== 100) {
      toast({
        title: "Invalid Configuration",
        description: `Core competency weights must total 100% (currently ${totalWeight}%)`,
        variant: "destructive",
      })
      return
    }

    // Validate assessment structure
    if (config.assessmentStructure.formativeWeight + config.assessmentStructure.summativeWeight !== 100) {
      toast({
        title: "Invalid Assessment Structure",
        description: "Formative and summative weights must total 100%",
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
              CBC Curriculum Configuration
            </CardTitle>
            <CardDescription>Configure the Competency-Based Curriculum structure and settings</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="areas" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="areas">Learning Areas</TabsTrigger>
                <TabsTrigger value="competencies">Core Competencies</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="tracking">Progress Tracking</TabsTrigger>
                <TabsTrigger value="values">Values</TabsTrigger>
              </TabsList>

              <TabsContent value="areas" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Learning Areas Configuration</h4>
                    <Button type="button" onClick={addLearningArea} disabled={!newLearningArea.name.trim()}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Learning Area
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Learning Area</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label>Area Name</Label>
                          <Input
                            value={newLearningArea.name}
                            onChange={(e) => setNewLearningArea({ ...newLearningArea, name: e.target.value })}
                            placeholder="e.g., Languages"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <Input
                            type="color"
                            value={newLearningArea.color}
                            onChange={(e) => setNewLearningArea({ ...newLearningArea, color: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Add Subject</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newSubject}
                              onChange={(e) => setNewSubject(e.target.value)}
                              placeholder="Subject name"
                            />
                            <Button
                              type="button"
                              onClick={() => {
                                if (newSubject.trim()) {
                                  setNewLearningArea({
                                    ...newLearningArea,
                                    subjects: [...newLearningArea.subjects, newSubject.trim()],
                                  })
                                  setNewSubject("")
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {newLearningArea.subjects.map((subject, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() =>
                              setNewLearningArea({
                                ...newLearningArea,
                                subjects: newLearningArea.subjects.filter((_, i) => i !== index),
                              })
                            }
                          >
                            {subject} <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    {config.learningAreas.map((area) => (
                      <Card key={area.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: area.color }} />
                              <CardTitle className="text-lg">{area.name}</CardTitle>
                            </div>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeLearningArea(area.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Label>Subjects ({area.subjects.length})</Label>
                            <div className="flex flex-wrap gap-2">
                              {area.subjects.map((subject) => (
                                <Badge
                                  key={subject}
                                  variant="outline"
                                  className="cursor-pointer"
                                  onClick={() => removeSubjectFromArea(area.id, subject)}
                                >
                                  {subject} <X className="h-3 w-3 ml-1" />
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2 mt-2">
                              <Input
                                value={newSubject}
                                onChange={(e) => setNewSubject(e.target.value)}
                                placeholder="Add subject"
                                size="sm"
                              />
                              <Button type="button" size="sm" onClick={() => addSubjectToArea(area.id)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="competencies" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Core Competencies</h4>
                    <Button type="button" onClick={addCompetency} disabled={!newCompetency.name.trim()}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Competency
                    </Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Competency</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Competency Name</Label>
                          <Input
                            value={newCompetency.name}
                            onChange={(e) => setNewCompetency({ ...newCompetency, name: e.target.value })}
                            placeholder="e.g., Critical Thinking"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Weight (%)</Label>
                          <Input
                            type="number"
                            value={newCompetency.weight}
                            onChange={(e) => setNewCompetency({ ...newCompetency, weight: Number(e.target.value) })}
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={newCompetency.description}
                          onChange={(e) => setNewCompetency({ ...newCompetency, description: e.target.value })}
                          placeholder="Describe this competency..."
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {config.coreCompetencies.map((competency) => (
                      <Card key={competency.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Target className="h-4 w-4 text-blue-600" />
                                <h5 className="font-medium">{competency.name}</h5>
                                <Badge variant="outline">{competency.weight}%</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{competency.description}</p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCompetency(competency.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Total Weight:{" "}
                          <span
                            className={`font-medium ${
                              config.coreCompetencies.reduce((sum, comp) => sum + comp.weight, 0) === 100
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {config.coreCompetencies.reduce((sum, comp) => sum + comp.weight, 0)}%
                          </span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-4">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assessment Structure</CardTitle>
                      <CardDescription>Configure assessment weights and grading scale</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Formative Assessment Weight (%)</Label>
                          <Slider
                            value={[config.assessmentStructure.formativeWeight]}
                            onValueChange={(value) =>
                              handleConfigChange("assessmentStructure", "formativeWeight", value[0])
                            }
                            max={70}
                            step={5}
                            className="w-full"
                          />
                          <div className="text-center text-sm text-muted-foreground">
                            {config.assessmentStructure.formativeWeight}%
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Summative Assessment Weight (%)</Label>
                          <Slider
                            value={[config.assessmentStructure.summativeWeight]}
                            onValueChange={(value) =>
                              handleConfigChange("assessmentStructure", "summativeWeight", value[0])
                            }
                            max={70}
                            step={5}
                            className="w-full"
                          />
                          <div className="text-center text-sm text-muted-foreground">
                            {config.assessmentStructure.summativeWeight}%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Grading Scale</CardTitle>
                      <CardDescription>CBC performance levels and grade boundaries</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(config.assessmentStructure.gradingScale).map(([grade, info]) => (
                          <div key={grade} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <Badge variant="outline" className="text-lg font-bold w-12 justify-center">
                                {grade}
                              </Badge>
                              <div>
                                <p className="font-medium">{info.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  {info.min}% - {info.max}%
                                </p>
                              </div>
                            </div>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  grade === "A"
                                    ? "bg-green-600"
                                    : grade === "B"
                                      ? "bg-blue-600"
                                      : grade === "C"
                                        ? "bg-yellow-600"
                                        : "bg-red-600"
                                }`}
                                style={{ width: `${info.max - info.min + 1}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tracking" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Tracking Settings</CardTitle>
                    <CardDescription>Configure how student progress is tracked and reported</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="enablePortfolio"
                            checked={config.progressTracking.enablePortfolio}
                            onCheckedChange={(checked) =>
                              handleConfigChange("progressTracking", "enablePortfolio", checked)
                            }
                          />
                          <Label htmlFor="enablePortfolio">Enable Student Portfolios</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="enablePeerAssessment"
                            checked={config.progressTracking.enablePeerAssessment}
                            onCheckedChange={(checked) =>
                              handleConfigChange("progressTracking", "enablePeerAssessment", checked)
                            }
                          />
                          <Label htmlFor="enablePeerAssessment">Enable Peer Assessment</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="enableSelfAssessment"
                            checked={config.progressTracking.enableSelfAssessment}
                            onCheckedChange={(checked) =>
                              handleConfigChange("progressTracking", "enableSelfAssessment", checked)
                            }
                          />
                          <Label htmlFor="enableSelfAssessment">Enable Self Assessment</Label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Tracking Frequency</Label>
                          <Select
                            value={config.progressTracking.trackingFrequency}
                            onValueChange={(value) =>
                              handleConfigChange("progressTracking", "trackingFrequency", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Daily">Daily</SelectItem>
                              <SelectItem value="Weekly">Weekly</SelectItem>
                              <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                              <SelectItem value="Monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="values" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Core Values</CardTitle>
                    <CardDescription>Define the core values that guide the curriculum</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="Add core value"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addValue())}
                      />
                      <Button type="button" onClick={addValue}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-2 md:grid-cols-3">
                      {config.values.map((value) => (
                        <div key={value} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">{value}</span>
                          </div>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeValue(value)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
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

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
import { X, BookOpen, Plus, Trash2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SubjectManagementModal({ subject, onClose, onSave }) {
  const { toast } = useToast()
  const [subjectData, setSubjectData] = useState({
    id: subject?.id || `SUB${Date.now()}`,
    name: subject?.name || "",
    code: subject?.code || "",
    description: subject?.description || "",
    category: subject?.category || "Core",
    grade: subject?.grade || "",
    department: subject?.department || "",
    credits: subject?.credits || 1,
    hoursPerWeek: subject?.hoursPerWeek || 4,
    isActive: subject?.isActive ?? true,
    prerequisites: subject?.prerequisites || [],
    learningOutcomes: subject?.learningOutcomes || [],
    assessmentMethods: subject?.assessmentMethods || [],
    resources: subject?.resources || [],
    strands: subject?.strands || [],
    competencies: subject?.competencies || [],
    gradingCriteria: subject?.gradingCriteria || {
      formativeWeight: 40,
      summativeWeight: 60,
      participationWeight: 10,
      projectWeight: 20,
      examWeight: 30,
    },
    schedule: subject?.schedule || {
      term1: { weeks: 12, topics: [] },
      term2: { weeks: 12, topics: [] },
      term3: { weeks: 12, topics: [] },
    },
  })

  const [newPrerequisite, setNewPrerequisite] = useState("")
  const [newOutcome, setNewOutcome] = useState("")
  const [newMethod, setNewMethod] = useState("")
  const [newResource, setNewResource] = useState("")
  const [newStrand, setNewStrand] = useState("")
  const [newCompetency, setNewCompetency] = useState("")
  const [newTopic, setNewTopic] = useState({ term: "term1", topic: "", weeks: 1 })

  const categories = ["Core", "Optional", "Elective", "Remedial", "Advanced"]
  const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]
  const departments = [
    "Languages",
    "Mathematics",
    "Sciences",
    "Social Studies",
    "Creative Arts",
    "Physical Education",
    "Technical Studies",
    "Life Skills",
  ]

  const handleInputChange = (field, value) => {
    setSubjectData({ ...subjectData, [field]: value })
  }

  const handleGradingChange = (field, value) => {
    setSubjectData({
      ...subjectData,
      gradingCriteria: { ...subjectData.gradingCriteria, [field]: value },
    })
  }

  const handleScheduleChange = (term, field, value) => {
    setSubjectData({
      ...subjectData,
      schedule: {
        ...subjectData.schedule,
        [term]: { ...subjectData.schedule[term], [field]: value },
      },
    })
  }

  const addToArray = (field, value, setter) => {
    if (value.trim()) {
      setSubjectData({
        ...subjectData,
        [field]: [...subjectData[field], value.trim()],
      })
      setter("")
    }
  }

  const removeFromArray = (field, index) => {
    setSubjectData({
      ...subjectData,
      [field]: subjectData[field].filter((_, i) => i !== index),
    })
  }

  const addTopic = () => {
    if (newTopic.topic.trim()) {
      const term = newTopic.term
      const currentTopics = subjectData.schedule[term].topics || []
      handleScheduleChange(term, "topics", [...currentTopics, { topic: newTopic.topic.trim(), weeks: newTopic.weeks }])
      setNewTopic({ term: "term1", topic: "", weeks: 1 })
    }
  }

  const removeTopic = (term, index) => {
    const currentTopics = subjectData.schedule[term].topics || []
    handleScheduleChange(
      term,
      "topics",
      currentTopics.filter((_, i) => i !== index),
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!subjectData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a subject name",
        variant: "destructive",
      })
      return
    }

    if (!subjectData.code.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a subject code",
        variant: "destructive",
      })
      return
    }

    // Validate grading weights
    const totalWeight = subjectData.gradingCriteria.formativeWeight + subjectData.gradingCriteria.summativeWeight

    if (totalWeight !== 100) {
      toast({
        title: "Invalid Grading Criteria",
        description: `Formative and summative weights must total 100% (currently ${totalWeight}%)`,
        variant: "destructive",
      })
      return
    }

    onSave(subjectData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {subject ? "Edit Subject" : "Add Subject"}
            </CardTitle>
            <CardDescription>
              {subject ? "Update subject configuration" : "Configure a new subject for the curriculum"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Subject Name *</Label>
                    <Input
                      id="name"
                      value={subjectData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g., Mathematics"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code">Subject Code *</Label>
                    <Input
                      id="code"
                      value={subjectData.code}
                      onChange={(e) => handleInputChange("code", e.target.value)}
                      placeholder="e.g., MATH7"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={subjectData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
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
                    <Label htmlFor="grade">Grade Level</Label>
                    <Select value={subjectData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {grades.map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={subjectData.department}
                      onValueChange={(value) => handleInputChange("department", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input
                      id="credits"
                      type="number"
                      value={subjectData.credits}
                      onChange={(e) => handleInputChange("credits", Number(e.target.value))}
                      min="1"
                      max="10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hoursPerWeek">Hours per Week</Label>
                    <Input
                      id="hoursPerWeek"
                      type="number"
                      value={subjectData.hoursPerWeek}
                      onChange={(e) => handleInputChange("hoursPerWeek", Number(e.target.value))}
                      min="1"
                      max="20"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={subjectData.isActive}
                      onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                    />
                    <Label htmlFor="isActive">Active Subject</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={subjectData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the subject and its objectives..."
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Prerequisites</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newPrerequisite}
                        onChange={(e) => setNewPrerequisite(e.target.value)}
                        placeholder="Add prerequisite"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addToArray("prerequisites", newPrerequisite, setNewPrerequisite))
                        }
                      />
                      <Button
                        type="button"
                        onClick={() => addToArray("prerequisites", newPrerequisite, setNewPrerequisite)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subjectData.prerequisites.map((prereq, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeFromArray("prerequisites", index)}
                        >
                          {prereq} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Learning Outcomes</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newOutcome}
                        onChange={(e) => setNewOutcome(e.target.value)}
                        placeholder="Add learning outcome"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addToArray("learningOutcomes", newOutcome, setNewOutcome))
                        }
                      />
                      <Button type="button" onClick={() => addToArray("learningOutcomes", newOutcome, setNewOutcome)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {subjectData.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{outcome}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromArray("learningOutcomes", index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Learning Strands</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newStrand}
                        onChange={(e) => setNewStrand(e.target.value)}
                        placeholder="Add learning strand"
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addToArray("strands", newStrand, setNewStrand))
                        }
                      />
                      <Button type="button" onClick={() => addToArray("strands", newStrand, setNewStrand)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subjectData.strands.map((strand, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => removeFromArray("strands", index)}
                        >
                          {strand} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Core Competencies</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newCompetency}
                        onChange={(e) => setNewCompetency(e.target.value)}
                        placeholder="Add competency"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addToArray("competencies", newCompetency, setNewCompetency))
                        }
                      />
                      <Button type="button" onClick={() => addToArray("competencies", newCompetency, setNewCompetency)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subjectData.competencies.map((comp, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="cursor-pointer"
                          onClick={() => removeFromArray("competencies", index)}
                        >
                          {comp} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-4">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Grading Criteria</CardTitle>
                      <CardDescription>Configure assessment weights and criteria</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Formative Assessment Weight (%)</Label>
                          <Slider
                            value={[subjectData.gradingCriteria.formativeWeight]}
                            onValueChange={(value) => handleGradingChange("formativeWeight", value[0])}
                            max={70}
                            step={5}
                            className="w-full"
                          />
                          <div className="text-center text-sm text-muted-foreground">
                            {subjectData.gradingCriteria.formativeWeight}%
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Summative Assessment Weight (%)</Label>
                          <Slider
                            value={[subjectData.gradingCriteria.summativeWeight]}
                            onValueChange={(value) => handleGradingChange("summativeWeight", value[0])}
                            max={70}
                            step={5}
                            className="w-full"
                          />
                          <div className="text-center text-sm text-muted-foreground">
                            {subjectData.gradingCriteria.summativeWeight}%
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label>Participation Weight (%)</Label>
                          <Input
                            type="number"
                            value={subjectData.gradingCriteria.participationWeight}
                            onChange={(e) => handleGradingChange("participationWeight", Number(e.target.value))}
                            min="0"
                            max="30"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Project Weight (%)</Label>
                          <Input
                            type="number"
                            value={subjectData.gradingCriteria.projectWeight}
                            onChange={(e) => handleGradingChange("projectWeight", Number(e.target.value))}
                            min="0"
                            max="40"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Exam Weight (%)</Label>
                          <Input
                            type="number"
                            value={subjectData.gradingCriteria.examWeight}
                            onChange={(e) => handleGradingChange("examWeight", Number(e.target.value))}
                            min="0"
                            max="50"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <Label>Assessment Methods</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newMethod}
                        onChange={(e) => setNewMethod(e.target.value)}
                        placeholder="Add assessment method"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addToArray("assessmentMethods", newMethod, setNewMethod))
                        }
                      />
                      <Button type="button" onClick={() => addToArray("assessmentMethods", newMethod, setNewMethod)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subjectData.assessmentMethods.map((method, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeFromArray("assessmentMethods", index)}
                        >
                          {method} <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4">
                <div className="space-y-2">
                  <Label>Learning Resources</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newResource}
                      onChange={(e) => setNewResource(e.target.value)}
                      placeholder="Add learning resource"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addToArray("resources", newResource, setNewResource))
                      }
                    />
                    <Button type="button" onClick={() => addToArray("resources", newResource, setNewResource)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {subjectData.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">{resource}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromArray("resources", index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="space-y-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Add Topic to Schedule</h4>
                    <div className="grid gap-4 md:grid-cols-4">
                      <Select
                        value={newTopic.term}
                        onValueChange={(value) => setNewTopic({ ...newTopic, term: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="term1">Term 1</SelectItem>
                          <SelectItem value="term2">Term 2</SelectItem>
                          <SelectItem value="term3">Term 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={newTopic.topic}
                        onChange={(e) => setNewTopic({ ...newTopic, topic: e.target.value })}
                        placeholder="Topic name"
                      />
                      <Input
                        type="number"
                        value={newTopic.weeks}
                        onChange={(e) => setNewTopic({ ...newTopic, weeks: Number(e.target.value) })}
                        placeholder="Weeks"
                        min="1"
                        max="12"
                      />
                      <Button type="button" onClick={addTopic}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    {["term1", "term2", "term3"].map((term) => (
                      <Card key={term}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {term === "term1" ? "Term 1" : term === "term2" ? "Term 2" : "Term 3"}
                          </CardTitle>
                          <CardDescription>
                            {subjectData.schedule[term].weeks} weeks • {subjectData.schedule[term].topics?.length || 0}{" "}
                            topics
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 mb-4">
                            <Label>Number of Weeks</Label>
                            <Input
                              type="number"
                              value={subjectData.schedule[term].weeks}
                              onChange={(e) => handleScheduleChange(term, "weeks", Number(e.target.value))}
                              min="1"
                              max="15"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Topics</Label>
                            <div className="space-y-2">
                              {(subjectData.schedule[term].topics || []).map((topic, index) => (
                                <div key={index} className="flex items-center justify-between p-2 border rounded">
                                  <div>
                                    <span className="text-sm font-medium">{topic.topic}</span>
                                    <span className="text-xs text-muted-foreground ml-2">({topic.weeks} weeks)</span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeTopic(term, index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {subject ? "Update Subject" : "Save Subject"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

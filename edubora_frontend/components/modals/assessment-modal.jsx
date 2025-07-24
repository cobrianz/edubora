"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Save, ClipboardList, Plus, Trash2, Users, BarChart3 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function AssessmentModal({ assessment, onClose, onSave }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    id: assessment?.id || `ASS${Date.now()}`,
    title: assessment?.title || "",
    subject: assessment?.subject || "",
    class: assessment?.class || "",
    type: assessment?.type || "",
    date: assessment?.date || "",
    duration: assessment?.duration || "",
    totalMarks: assessment?.totalMarks?.toString() || "",
    description: assessment?.description || "",
    instructions: assessment?.instructions || "",
    status: assessment?.status || "Draft",
    rubric: assessment?.rubric || [
      { criteria: "Understanding", maxMarks: 25, description: "Demonstrates clear understanding of concepts" },
      { criteria: "Application", maxMarks: 25, description: "Applies knowledge to solve problems" },
      { criteria: "Analysis", maxMarks: 25, description: "Analyzes information critically" },
      { criteria: "Communication", maxMarks: 25, description: "Communicates ideas clearly" },
    ],
    competencies: assessment?.competencies || [],
    learningOutcomes: assessment?.learningOutcomes || [],
    resources: assessment?.resources || [],
    accommodations: assessment?.accommodations || [],
  })

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
    "Life Skills",
  ]

  const classes = [
    "Grade 6A",
    "Grade 6B",
    "Grade 7A",
    "Grade 7B",
    "Grade 8A",
    "Grade 8B",
    "Grade 9A",
    "Grade 9B",
  ]

  const assessmentTypes = [
    "Formative Assessment",
    "Summative Assessment",
    "Diagnostic Assessment",
    "Peer Assessment",
    "Self Assessment",
    "Project",
    "Practical",
    "Oral Presentation",
    "Portfolio",
    "Performance Task",
  ]

  const cbcCompetencies = [
    "Communication and Collaboration",
    "Critical Thinking and Problem Solving",
    "Creativity and Imagination",
    "Citizenship",
    "Digital Literacy",
    "Learning to Learn",
    "Self-Efficacy",
  ]

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleRubricChange = (index, field, value) => {
    const updatedRubric = formData.rubric.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setFormData({ ...formData, rubric: updatedRubric })
  }

  const addRubricCriteria = () => {
    const newCriteria = {
      criteria: "",
      maxMarks: 0,
      description: "",
    }
    setFormData({ ...formData, rubric: [...formData.rubric, newCriteria] })
  }

  const removeRubricCriteria = (index) => {
    if (formData.rubric.length > 1) {
      const updatedRubric = formData.rubric.filter((_, i) => i !== index)
      setFormData({ ...formData, rubric: updatedRubric })
    }
  }

  const handleCompetencyToggle = (competency, checked) => {
    if (checked) {
      setFormData({ ...formData, competencies: [...formData.competencies, competency] })
    } else {
      setFormData({ ...formData, competencies: formData.competencies.filter((c) => c !== competency) })
    }
  }

  const addLearningOutcome = () => {
    setFormData({ ...formData, learningOutcomes: [...formData.learningOutcomes, ""] })
  }

  const updateLearningOutcome = (index, value) => {
    const updated = formData.learningOutcomes.map((outcome, i) => (i === index ? value : outcome))
    setFormData({ ...formData, learningOutcomes: updated })
  }

  const removeLearningOutcome = (index) => {
    const updated = formData.learningOutcomes.filter((_, i) => i !== index)
    setFormData({ ...formData, learningOutcomes: updated })
  }

  const calculateTotalRubricMarks = () => {
    return formData.rubric.reduce((total, item) => total + (Number(item.maxMarks) || 0), 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter an assessment title",
        variant: "destructive",
      })
      return
    }

    if (!formData.subject || !formData.class) {
      toast({
        title: "Missing Information",
        description: "Please select subject and class",
        variant: "destructive",
      })
      return
    }

    const totalRubricMarks = calculateTotalRubricMarks()
    const totalMarks = Number(formData.totalMarks) || totalRubricMarks

    const assessmentData = {
      ...formData,
      totalMarks,
      rubricTotal: totalRubricMarks,
      createdDate: assessment?.createdDate || new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    }

    onSave(assessmentData)
    toast({
      title: "Assessment Saved",
      description: `${formData.title} has been saved successfully`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              {assessment ? "Edit Assessment" : "Create New Assessment"}
            </CardTitle>
            <CardDescription>
              {assessment ? "Update assessment details" : "Design a comprehensive CBC assessment"}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={formData.status === "Published" ? "default" : "secondary"}>{formData.status}</Badge>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="rubric">Rubric</TabsTrigger>
                <TabsTrigger value="competencies">Competencies</TabsTrigger>
                <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assessment Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Mathematics Problem Solving Assessment"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Assessment Type *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {assessmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

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

                  <div className="space-y-2">
                    <Label htmlFor="date">Assessment Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      placeholder="e.g., 90 minutes"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of the assessment purpose and content"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions for Students</Label>
                  <Textarea
                    id="instructions"
                    value={formData.instructions}
                    onChange={(e) => handleInputChange("instructions", e.target.value)}
                    placeholder="Detailed instructions for students taking the assessment"
                    rows={4}
                  />
                </div>
              </TabsContent>

              <TabsContent value="rubric" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Assessment Rubric</h4>
                    <p className="text-sm text-muted-foreground">Define criteria and marking scheme</p>
                  </div>
                  <Button type="button" variant="outline" onClick={addRubricCriteria}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Criteria
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.rubric.map((criteria, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="space-y-2">
                            <Label>Criteria</Label>
                            <Input
                              value={criteria.criteria}
                              onChange={(e) => handleRubricChange(index, "criteria", e.target.value)}
                              placeholder="e.g., Understanding"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Max Marks</Label>
                            <Input
                              type="number"
                              value={criteria.maxMarks}
                              onChange={(e) => handleRubricChange(index, "maxMarks", Number(e.target.value))}
                              placeholder="25"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Action</Label>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => removeRubricCriteria(index)}
                              disabled={formData.rubric.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3 space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={criteria.description}
                            onChange={(e) => handleRubricChange(index, "description", e.target.value)}
                            placeholder="Describe what this criteria measures"
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Rubric Marks:</span>
                      <span className="text-xl font-bold text-blue-600">{calculateTotalRubricMarks()}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="competencies" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">CBC Core Competencies</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select the competencies this assessment will evaluate
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {cbcCompetencies.map((competency) => (
                    <div key={competency} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`competency-${competency}`}
                        checked={formData.competencies.includes(competency)}
                        onCheckedChange={(checked) => handleCompetencyToggle(competency, checked)}
                      />
                      <Label htmlFor={`competency-${competency}`} className="text-sm font-medium">
                        {competency}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h5 className="font-medium mb-2">Selected Competencies ({formData.competencies.length})</h5>
                  <div className="flex flex-wrap gap-2">
                    {formData.competencies.map((competency) => (
                      <Badge key={competency} variant="default">
                        {competency}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="outcomes" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Learning Outcomes</h4>
                    <p className="text-sm text-muted-foreground">Define what students should achieve</p>
                  </div>
                  <Button type="button" variant="outline" onClick={addLearningOutcome}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Outcome
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={outcome}
                        onChange={(e) => updateLearningOutcome(index, e.target.value)}
                        placeholder={`Learning outcome ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeLearningOutcome(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {formData.learningOutcomes.length === 0 && (
                  <div className="text-center py-8">
                    <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No learning outcomes defined yet</p>
                    <Button type="button" variant="outline" onClick={addLearningOutcome} className="mt-2">
                      Add First Outcome
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks (Override)</Label>
                    <Input
                      id="totalMarks"
                      type="number"
                      value={formData.totalMarks}
                      onChange={(e) => handleInputChange("totalMarks", e.target.value)}
                      placeholder={`Auto: ${calculateTotalRubricMarks()}`}
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty to use rubric total ({calculateTotalRubricMarks()})
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <h5 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Assessment Summary
                  </h5>
                  <div className="grid gap-2 md:grid-cols-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Subject:</span>
                      <p className="font-medium">{formData.subject || "Not selected"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Class:</span>
                      <p className="font-medium">{formData.class || "Not selected"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Marks:</span>
                      <p className="font-medium">{Number(formData.totalMarks) || calculateTotalRubricMarks()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Competencies:</span>
                      <p className="font-medium">{formData.competencies.length} selected</p>
                    </div>
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
                {assessment ? "Update Assessment" : "Create Assessment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

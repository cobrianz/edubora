"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Save, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentModal({ student, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    admissionNumber: "",
    class: "",
    gender: "",
    dateOfBirth: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
    medicalInfo: "",
    previousSchool: "",
    kcpeMarks: "",
    status: "Active",
  })

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        admissionNumber: student.admissionNumber || "",
        class: student.class || "",
        gender: student.gender || "",
        dateOfBirth: "",
        parentName: student.parent || "",
        parentPhone: student.phone || "",
        parentEmail: "",
        address: "",
        medicalInfo: "",
        previousSchool: "",
        kcpeMarks: "",
        status: student.status || "Active",
      })
    }
  }, [student])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {student ? "Edit Student" : "Add New Student"}
            </CardTitle>
            <CardDescription>
              {student ? "Update student information" : "Enter student details to register"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="personal" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="parent">Parent/Guardian</TabsTrigger>
                <TabsTrigger value="medical">Medical & Other</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Enter student's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionNumber">Admission Number *</Label>
                    <Input
                      id="admissionNumber"
                      value={formData.admissionNumber}
                      onChange={(e) => handleChange("admissionNumber", e.target.value)}
                      placeholder="e.g., ADM2024001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Home Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Enter home address"
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="academic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class/Grade *</Label>
                    <Select value={formData.class} onValueChange={(value) => handleChange("class", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grade 1A">Grade 1A</SelectItem>
                        <SelectItem value="Grade 1B">Grade 1B</SelectItem>
                        <SelectItem value="Grade 2A">Grade 2A</SelectItem>
                        <SelectItem value="Grade 2B">Grade 2B</SelectItem>
                        <SelectItem value="Grade 3A">Grade 3A</SelectItem>
                        <SelectItem value="Grade 3B">Grade 3B</SelectItem>
                        <SelectItem value="Grade 4A">Grade 4A</SelectItem>
                        <SelectItem value="Grade 4B">Grade 4B</SelectItem>
                        <SelectItem value="Grade 5A">Grade 5A</SelectItem>
                        <SelectItem value="Grade 5B">Grade 5B</SelectItem>
                        <SelectItem value="Grade 6A">Grade 6A</SelectItem>
                        <SelectItem value="Grade 6B">Grade 6B</SelectItem>
                        <SelectItem value="Grade 7A">Grade 7A</SelectItem>
                        <SelectItem value="Grade 7B">Grade 7B</SelectItem>
                        <SelectItem value="Grade 8A">Grade 8A</SelectItem>
                        <SelectItem value="Grade 8B">Grade 8B</SelectItem>
                        <SelectItem value="Grade 9A">Grade 9A</SelectItem>
                        <SelectItem value="Grade 9B">Grade 9B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Transferred">Transferred</SelectItem>
                        <SelectItem value="Graduated">Graduated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousSchool">Previous School</Label>
                    <Input
                      id="previousSchool"
                      value={formData.previousSchool}
                      onChange={(e) => handleChange("previousSchool", e.target.value)}
                      placeholder="Name of previous school"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kcpeMarks">KCPE Marks (if applicable)</Label>
                    <Input
                      id="kcpeMarks"
                      type="number"
                      value={formData.kcpeMarks}
                      onChange={(e) => handleChange("kcpeMarks", e.target.value)}
                      placeholder="Enter KCPE marks"
                      min="0"
                      max="500"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="parent" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => handleChange("parentName", e.target.value)}
                      placeholder="Enter parent/guardian name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number *</Label>
                    <Input
                      id="parentPhone"
                      value={formData.parentPhone}
                      onChange={(e) => handleChange("parentPhone", e.target.value)}
                      placeholder="+254712345678"
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="parentEmail">Email Address</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => handleChange("parentEmail", e.target.value)}
                      placeholder="parent@example.com"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="medical" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="medicalInfo">Medical Information</Label>
                  <Textarea
                    id="medicalInfo"
                    value={formData.medicalInfo}
                    onChange={(e) => handleChange("medicalInfo", e.target.value)}
                    placeholder="Any medical conditions, allergies, or special needs"
                    rows={4}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="transition-all duration-300 hover:scale-105">
                <Save className="mr-2 h-4 w-4" />
                {student ? "Update Student" : "Add Student"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

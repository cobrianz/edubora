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
import { CalendarIcon, Heart, Shield, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function HealthRecordModal({ isOpen, onClose, mode = "add", healthData = null }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    studentName: healthData?.studentName || "",
    admissionNo: healthData?.admissionNo || "",
    class: healthData?.class || "",
    condition: healthData?.condition || "",
    medication: healthData?.medication || "",
    allergies: healthData?.allergies || "",
    emergencyContact: healthData?.emergencyContact || "",
    emergencyContactName: healthData?.emergencyContactName || "",
    bloodType: healthData?.bloodType || "",
    weight: healthData?.weight || "",
    height: healthData?.height || "",
    lastCheckup: healthData?.lastCheckup ? new Date(healthData.lastCheckup) : null,
    nextCheckup: healthData?.nextCheckup ? new Date(healthData.nextCheckup) : null,
    notes: healthData?.notes || "",
    chronicConditions: healthData?.chronicConditions || [],
    medications: healthData?.medications || [],
    vaccinations: healthData?.vaccinations || [],
  })

  const [newMedication, setNewMedication] = useState("")
  const [newVaccination, setNewVaccination] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (mode === "add") {
      toast({
        title: "Health Record Added",
        description: `Health record for ${formData.studentName} has been created successfully.`,
      })
    } else if (mode === "edit") {
      toast({
        title: "Health Record Updated",
        description: `Health record for ${formData.studentName} has been updated successfully.`,
      })
    }

    onClose()
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addMedication = () => {
    if (newMedication.trim()) {
      setFormData((prev) => ({
        ...prev,
        medications: [...prev.medications, newMedication.trim()],
      }))
      setNewMedication("")
    }
  }

  const removeMedication = (index) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }))
  }

  const addVaccination = () => {
    if (newVaccination.trim()) {
      setFormData((prev) => ({
        ...prev,
        vaccinations: [...prev.vaccinations, newVaccination.trim()],
      }))
      setNewVaccination("")
    }
  }

  const removeVaccination = (index) => {
    setFormData((prev) => ({
      ...prev,
      vaccinations: prev.vaccinations.filter((_, i) => i !== index),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            {mode === "add" ? "Add Health Record" : mode === "edit" ? "Edit Health Record" : "Health Record Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Create a comprehensive health record for the student."
              : mode === "edit"
                ? "Update the student's health information."
                : "View detailed health information for this student."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Basic Information
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
                <Label htmlFor="admissionNo">Admission Number *</Label>
                <Input
                  id="admissionNo"
                  value={formData.admissionNo}
                  onChange={(e) => handleInputChange("admissionNo", e.target.value)}
                  placeholder="Enter admission number"
                  disabled={mode === "view"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Class *</Label>
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

          {/* Physical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Physical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(value) => handleInputChange("bloodType", value)}
                  disabled={mode === "view"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  placeholder="Enter weight"
                  disabled={mode === "view"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  placeholder="Enter height"
                  disabled={mode === "view"}
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medical Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="condition">Primary Medical Condition</Label>
                <Input
                  id="condition"
                  value={formData.condition}
                  onChange={(e) => handleInputChange("condition", e.target.value)}
                  placeholder="e.g., Asthma, Diabetes"
                  disabled={mode === "view"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Known Allergies</Label>
                <Input
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="e.g., Peanuts, Dust, Pollen"
                  disabled={mode === "view"}
                />
              </div>
            </div>

            {/* Medications */}
            <div className="space-y-2">
              <Label>Current Medications</Label>
              {mode !== "view" && (
                <div className="flex gap-2">
                  <Input
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Add medication"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMedication())}
                  />
                  <Button type="button" onClick={addMedication} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {formData.medications.map((med, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {med}
                    {mode !== "view" && (
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeMedication(index)} />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Vaccinations */}
            <div className="space-y-2">
              <Label>Vaccinations</Label>
              {mode !== "view" && (
                <div className="flex gap-2">
                  <Input
                    value={newVaccination}
                    onChange={(e) => setNewVaccination(e.target.value)}
                    placeholder="Add vaccination"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addVaccination())}
                  />
                  <Button type="button" onClick={addVaccination} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {formData.vaccinations.map((vac, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {vac}
                    {mode !== "view" && (
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeVaccination(index)} />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                  placeholder="Emergency contact name"
                  disabled={mode === "view"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Contact Phone</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="+254712345678"
                  disabled={mode === "view"}
                />
              </div>
            </div>
          </div>

          {/* Checkup Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medical Checkups</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Last Checkup</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.lastCheckup && "text-muted-foreground",
                      )}
                      disabled={mode === "view"}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.lastCheckup ? format(formData.lastCheckup, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.lastCheckup}
                      onSelect={(date) => handleInputChange("lastCheckup", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Next Checkup</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.nextCheckup && "text-muted-foreground",
                      )}
                      disabled={mode === "view"}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.nextCheckup ? format(formData.nextCheckup, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.nextCheckup}
                      onSelect={(date) => handleInputChange("nextCheckup", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any additional medical notes or instructions..."
              rows={4}
              disabled={mode === "view"}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === "view" ? "Close" : "Cancel"}
            </Button>
            {mode !== "view" && <Button type="submit">{mode === "add" ? "Create Record" : "Update Record"}</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

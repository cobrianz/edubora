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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, MapPin, Phone, Mail, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StudentTransportModal({ isOpen, onClose, student = null, mode = "assign" }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    admissionNo: "",
    class: "",
    route: "",
    pickupPoint: "",
    dropoffPoint: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    emergencyContact: "",
    feeStatus: "Pending",
    specialNeeds: "",
    notes: "",
  })

  useEffect(() => {
    if (student && mode === "view") {
      setFormData({
        studentId: student.id || "",
        studentName: student.studentName || "",
        admissionNo: student.admissionNo || "",
        class: student.class || "",
        route: student.route || "",
        pickupPoint: student.pickupPoint || "",
        dropoffPoint: student.dropoffPoint || "",
        parentName: student.parentName || "",
        parentPhone: student.parentContact || "",
        parentEmail: student.parentEmail || "",
        emergencyContact: student.emergencyContact || "",
        feeStatus: student.feeStatus || "Pending",
        specialNeeds: student.specialNeeds || "",
        notes: student.notes || "",
      })
    } else {
      setFormData({
        studentId: "",
        studentName: "",
        admissionNo: "",
        class: "",
        route: "",
        pickupPoint: "",
        dropoffPoint: "",
        parentName: "",
        parentPhone: "",
        parentEmail: "",
        emergencyContact: "",
        feeStatus: "Pending",
        specialNeeds: "",
        notes: "",
      })
    }
  }, [student, mode])

  const routes = [
    "Route A - Westlands",
    "Route B - Eastlands",
    "Route C - South B",
    "Route D - Karen",
    "Route E - Kasarani",
  ]

  const students = [
    { id: "STU001", name: "John Doe", admissionNo: "ADM2024001", class: "Grade 7A" },
    { id: "STU002", name: "Jane Smith", admissionNo: "ADM2024002", class: "Grade 6B" },
    { id: "STU003", name: "Mike Johnson", admissionNo: "ADM2024003", class: "Grade 8A" },
  ]

  const pickupPoints = {
    "Route A - Westlands": ["Westlands Mall", "ABC Place", "Sarit Centre"],
    "Route B - Eastlands": ["Eastleigh", "Pangani", "Mathare"],
    "Route C - South B": ["South B", "South C", "Nyayo Stadium"],
    "Route D - Karen": ["Karen Shopping Centre", "Junction Mall", "Karen Country Club"],
    "Route E - Kasarani": ["Kasarani Stadium", "Thika Road Mall", "Roysambu"],
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStudentSelect = (studentId) => {
    const selectedStudent = students.find((s) => s.id === studentId)
    if (selectedStudent) {
      setFormData((prev) => ({
        ...prev,
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        admissionNo: selectedStudent.admissionNo,
        class: selectedStudent.class,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.studentName || !formData.route || !formData.pickupPoint) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const action = mode === "assign" ? "assigned" : "updated"
    toast({
      title: "Success",
      description: `Student transport ${action} successfully!`,
    })

    onClose()
  }

  const handleSendNotification = () => {
    toast({
      title: "Notification Sent",
      description: `Transport notification sent to ${formData.parentName}`,
    })
  }

  const isReadOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {mode === "assign" && "Assign Student Transport"}
            {mode === "view" && "Student Transport Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "assign" && "Assign a student to a transport route"}
            {mode === "view" && "View student transport information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === "assign" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Select Student</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={formData.studentId} onValueChange={handleStudentSelect} disabled={isReadOnly}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} - {student.admissionNo} ({student.class})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => handleInputChange("studentName", e.target.value)}
                disabled={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admissionNo">Admission Number</Label>
              <Input
                id="admissionNo"
                value={formData.admissionNo}
                onChange={(e) => handleInputChange("admissionNo", e.target.value)}
                disabled={true}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class</Label>
            <Input
              id="class"
              value={formData.class}
              onChange={(e) => handleInputChange("class", e.target.value)}
              disabled={true}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Transport Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="route">Route *</Label>
                <Select
                  value={formData.route}
                  onValueChange={(value) => handleInputChange("route", value)}
                  disabled={isReadOnly}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select route" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route} value={route}>
                        {route}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupPoint">Pickup Point *</Label>
                  <Select
                    value={formData.pickupPoint}
                    onValueChange={(value) => handleInputChange("pickupPoint", value)}
                    disabled={isReadOnly || !formData.route}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pickup point" />
                    </SelectTrigger>
                    <SelectContent>
                      {(pickupPoints[formData.route] || []).map((point) => (
                        <SelectItem key={point} value={point}>
                          {point}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoffPoint">Dropoff Point</Label>
                  <Select
                    value={formData.dropoffPoint}
                    onValueChange={(value) => handleInputChange("dropoffPoint", value)}
                    disabled={isReadOnly || !formData.route}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dropoff point" />
                    </SelectTrigger>
                    <SelectContent>
                      {(pickupPoints[formData.route] || []).map((point) => (
                        <SelectItem key={point} value={point}>
                          {point}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Parent/Guardian Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                <Input
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => handleInputChange("parentName", e.target.value)}
                  placeholder="Enter parent/guardian name"
                  disabled={isReadOnly}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Phone Number</Label>
                  <Input
                    id="parentPhone"
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange("parentPhone", e.target.value)}
                    placeholder="+254712345678"
                    disabled={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Email Address</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => handleInputChange("parentEmail", e.target.value)}
                    placeholder="parent@email.com"
                    disabled={isReadOnly}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  placeholder="+254723456789"
                  disabled={isReadOnly}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="feeStatus">Fee Status</Label>
              <Select
                value={formData.feeStatus}
                onValueChange={(value) => handleInputChange("feeStatus", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialNeeds">Special Needs</Label>
              <Input
                id="specialNeeds"
                value={formData.specialNeeds}
                onChange={(e) => handleInputChange("specialNeeds", e.target.value)}
                placeholder="Any special requirements"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any additional information"
              disabled={isReadOnly}
            />
          </div>

          {mode === "view" && student && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Transport Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Route</p>
                    <Badge variant="outline">{student.route}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fee Status</p>
                    <Badge variant={student.feeStatus === "Paid" ? "default" : "destructive"}>
                      {student.feeStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Point</p>
                    <p className="font-medium">{student.pickupPoint}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Parent Contact</p>
                    <p className="font-medium">{student.parentContact}</p>
                  </div>
                </div>
                {mode === "view" && (
                  <div className="mt-4">
                    <Button onClick={handleSendNotification} className="w-full">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Notification to Parent
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {!isReadOnly && (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{mode === "assign" ? "Assign Transport" : "Update Transport"}</Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

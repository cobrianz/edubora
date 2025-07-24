"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { X, Users, MapPin, Search, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AssignStudentTransportModal({ routes = [], students = [], onClose, onAssign }) {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [selectedRoute, setSelectedRoute] = useState("")
  const [pickupPoint, setPickupPoint] = useState("")
  const [dropoffPoint, setDropoffPoint] = useState("")
  const [parentName, setParentName] = useState("")
  const [parentPhone, setParentPhone] = useState("")
  const [parentEmail, setParentEmail] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const [monthlyFee, setMonthlyFee] = useState("")
  const [specialRequirements, setSpecialRequirements] = useState("")
  const [notes, setNotes] = useState("")

  // Filter students not already assigned to transport
  const availableStudents = students.filter((student) => !student.transportAssigned)
  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get pickup points for selected route
  const selectedRouteData = routes.find((route) => route.id === selectedRoute)
  const pickupPoints = selectedRouteData?.stops || []

  useEffect(() => {
    if (selectedStudent) {
      setParentName(selectedStudent.parentName || "")
      setParentPhone(selectedStudent.parentPhone || "")
      setParentEmail(selectedStudent.parentEmail || "")
      setEmergencyContact(selectedStudent.emergencyContact || "")
    }
  }, [selectedStudent])

  useEffect(() => {
    if (selectedRouteData) {
      setMonthlyFee(selectedRouteData.fare?.toString() || "")
    }
  }, [selectedRouteData])

  const handleStudentSelect = (student) => {
    setSelectedStudent(student)
  }

  const handleAssign = () => {
    if (!selectedStudent) {
      toast({
        title: "No Student Selected",
        description: "Please select a student to assign transport",
        variant: "destructive",
      })
      return
    }

    if (!selectedRoute || !pickupPoint) {
      toast({
        title: "Missing Information",
        description: "Please select route and pickup point",
        variant: "destructive",
      })
      return
    }

    if (!parentName || !parentPhone) {
      toast({
        title: "Missing Parent Information",
        description: "Please enter parent name and phone number",
        variant: "destructive",
      })
      return
    }

    const assignmentData = {
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      admissionNo: selectedStudent.admissionNo,
      grade: selectedStudent.grade,
      routeId: selectedRoute,
      routeName: selectedRouteData.name,
      pickupPoint,
      dropoffPoint: dropoffPoint || pickupPoint,
      parentName,
      parentPhone,
      parentEmail,
      emergencyContact,
      monthlyFee: Number.parseFloat(monthlyFee) || 0,
      specialRequirements,
      notes,
      assignedDate: new Date().toISOString().split("T")[0],
      feeStatus: "Pending",
      status: "Active",
    }

    onAssign(assignmentData)
    toast({
      title: "Student Assigned",
      description: `${selectedStudent.name} has been assigned to ${selectedRouteData.name}`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Assign Student Transport
            </CardTitle>
            <CardDescription>Assign a student to a transport route</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Student Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Select Student
              </h4>
              <Badge variant="outline">{availableStudents.length} available</Badge>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name, admission number, or grade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2 max-h-48 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedStudent?.id === student.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => handleStudentSelect(student)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.admissionNo}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{student.grade}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "No students found matching your search"
                    : "No students available for transport assignment"}
                </p>
              </div>
            )}
          </div>

          {/* Selected Student Info */}
          {selectedStudent && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-medium mb-2">Selected Student</h4>
              <div className="grid gap-2 md:grid-cols-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                  <p className="font-medium">{selectedStudent.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Admission No:</span>
                  <p className="font-medium">{selectedStudent.admissionNo}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Grade:</span>
                  <p className="font-medium">{selectedStudent.grade}</p>
                </div>
              </div>
            </div>
          )}

          {/* Transport Assignment */}
          {selectedStudent && (
            <>
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Transport Details
                </h4>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="route">Route *</Label>
                    <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        {routes.map((route) => (
                          <SelectItem key={route.id} value={route.id}>
                            <div>
                              <div className="font-medium">{route.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {route.distance} • {route.duration} • KSh {route.fare}/month
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyFee">Monthly Fee (KSh)</Label>
                    <Input
                      id="monthlyFee"
                      type="number"
                      value={monthlyFee}
                      onChange={(e) => setMonthlyFee(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pickupPoint">Pickup Point *</Label>
                    <Select value={pickupPoint} onValueChange={setPickupPoint} disabled={!selectedRoute}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pickup point" />
                      </SelectTrigger>
                      <SelectContent>
                        {pickupPoints.map((point, index) => (
                          <SelectItem key={index} value={point}>
                            {point}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dropoffPoint">Drop-off Point</Label>
                    <Select value={dropoffPoint} onValueChange={setDropoffPoint} disabled={!selectedRoute}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select drop-off point (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {pickupPoints.map((point, index) => (
                          <SelectItem key={index} value={point}>
                            {point}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="space-y-4">
                <h4 className="font-medium">Parent/Guardian Information</h4>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Enter parent/guardian name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number *</Label>
                    <Input
                      id="parentPhone"
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="+254712345678"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email Address</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="parent@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="+254723456789"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Input
                    id="specialRequirements"
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    placeholder="Any special needs or requirements"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional information or instructions"
                    rows={3}
                  />
                </div>
              </div>

              {/* Assignment Summary */}
              {selectedRoute && pickupPoint && (
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <h4 className="font-medium mb-2">Assignment Summary</h4>
                  <div className="grid gap-2 md:grid-cols-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Student:</span>
                      <p className="font-medium">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Route:</span>
                      <p className="font-medium">{selectedRouteData?.name}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pickup Point:</span>
                      <p className="font-medium">{pickupPoint}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly Fee:</span>
                      <p className="font-medium">KSh {monthlyFee}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedStudent || !selectedRoute || !pickupPoint}>
              <UserPlus className="mr-2 h-4 w-4" />
              Assign Transport
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

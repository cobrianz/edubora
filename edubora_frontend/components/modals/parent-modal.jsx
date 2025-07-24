"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { User, Users, Save, Plus, Trash2, CalendarIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function ParentModal({ parent, mode = "create", onClose, onSave }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: parent?.firstName || "",
    lastName: parent?.lastName || "",
    email: parent?.email || "",
    phone: parent?.phone || "",
    alternatePhone: parent?.alternatePhone || "",
    occupation: parent?.occupation || "",
    employer: parent?.employer || "",
    relationship: parent?.relationship || "",
    nationalId: parent?.nationalId || "",
    dateOfBirth: parent?.dateOfBirth || null,
    gender: parent?.gender || "",

    // Address Information
    address: parent?.address || "",
    city: parent?.city || "",
    county: parent?.county || "",
    postalCode: parent?.postalCode || "",

    // Children Information
    children: parent?.children || [],

    // Communication Preferences
    preferredLanguage: parent?.preferredLanguage || "english",
    communicationMethod: parent?.communicationMethod || "email",
    receiveUpdates: parent?.receiveUpdates !== false,
    receiveFeeReminders: parent?.receiveFeeReminders !== false,
    receiveEventNotifications: parent?.receiveEventNotifications !== false,
    receiveAcademicReports: parent?.receiveAcademicReports !== false,

    // Emergency Contact
    emergencyContact: parent?.emergencyContact || false,
    emergencyContactName: parent?.emergencyContactName || "",
    emergencyContactPhone: parent?.emergencyContactPhone || "",
    emergencyContactRelationship: parent?.emergencyContactRelationship || "",

    // Additional Information
    notes: parent?.notes || "",
    status: parent?.status || "active",
  })

  const [newChild, setNewChild] = useState({
    name: "",
    grade: "",
    admissionNumber: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddChild = () => {
    if (newChild.name && newChild.grade) {
      setFormData((prev) => ({
        ...prev,
        children: [...prev.children, { ...newChild, id: Date.now() }],
      }))
      setNewChild({ name: "", grade: "", admissionNumber: "" })
      toast({
        title: "Child Added",
        description: "Child has been added to the parent's profile",
      })
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in child's name and grade",
        variant: "destructive",
      })
    }
  }

  const handleRemoveChild = (childId) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.filter((child) => child.id !== childId),
    }))
    toast({
      title: "Child Removed",
      description: "Child has been removed from the parent's profile",
    })
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Name, Email, Phone)",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onSave?.(formData)
      toast({
        title: mode === "create" ? "Parent Added" : "Parent Updated",
        description: `${formData.firstName} ${formData.lastName} has been ${mode === "create" ? "added" : "updated"} successfully`,
      })
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save parent information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {mode === "create" ? "Add New Parent" : "Edit Parent"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Enter parent/guardian information to create a new profile"
              : "Update parent/guardian information"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="children">Children</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>Basic parent/guardian details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                      placeholder="Enter alternate phone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Select
                      value={formData.relationship}
                      onValueChange={(value) => handleInputChange("relationship", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="father">Father</SelectItem>
                        <SelectItem value="mother">Mother</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                        <SelectItem value="grandparent">Grandparent</SelectItem>
                        <SelectItem value="uncle">Uncle</SelectItem>
                        <SelectItem value="aunt">Aunt</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      placeholder="Enter occupation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employer">Employer</Label>
                    <Input
                      id="employer"
                      value={formData.employer}
                      onChange={(e) => handleInputChange("employer", e.target.value)}
                      placeholder="Enter employer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationalId">National ID</Label>
                    <Input
                      id="nationalId"
                      value={formData.nationalId}
                      onChange={(e) => handleInputChange("nationalId", e.target.value)}
                      placeholder="Enter national ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.dateOfBirth && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateOfBirth}
                          onSelect={(date) => handleInputChange("dateOfBirth", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Address Information</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter street address"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City/Town</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="Enter city"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="county">County</Label>
                        <Input
                          id="county"
                          value={formData.county}
                          onChange={(e) => handleInputChange("county", e.target.value)}
                          placeholder="Enter county"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          placeholder="Enter postal code"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Enter any additional notes about the parent"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="children" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Children Information</CardTitle>
                <CardDescription>Manage children associated with this parent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Add New Child</h4>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="childName">Child Name</Label>
                      <Input
                        id="childName"
                        value={newChild.name}
                        onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                        placeholder="Enter child's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="childGrade">Grade</Label>
                      <Select
                        value={newChild.grade}
                        onValueChange={(value) => setNewChild({ ...newChild, grade: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grade-1">Grade 1</SelectItem>
                          <SelectItem value="grade-2">Grade 2</SelectItem>
                          <SelectItem value="grade-3">Grade 3</SelectItem>
                          <SelectItem value="grade-4">Grade 4</SelectItem>
                          <SelectItem value="grade-5">Grade 5</SelectItem>
                          <SelectItem value="grade-6">Grade 6</SelectItem>
                          <SelectItem value="grade-7">Grade 7</SelectItem>
                          <SelectItem value="grade-8">Grade 8</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admissionNumber">Admission Number</Label>
                      <Input
                        id="admissionNumber"
                        value={newChild.admissionNumber}
                        onChange={(e) => setNewChild({ ...newChild, admissionNumber: e.target.value })}
                        placeholder="Enter admission number"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleAddChild} className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Child
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Current Children ({formData.children.length})</h4>
                  {formData.children.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="mx-auto h-12 w-12 mb-4" />
                      <p>No children added yet</p>
                      <p className="text-sm">Add children using the form above</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.children.map((child, index) => (
                        <div
                          key={child.id || index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{child.name}</p>
                              <div className="flex gap-2">
                                <Badge variant="outline">{child.grade}</Badge>
                                {child.admissionNumber && <Badge variant="secondary">{child.admissionNumber}</Badge>}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveChild(child.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Communication Preferences</CardTitle>
                <CardDescription>Configure how this parent receives communications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="preferredLanguage">Preferred Language</Label>
                    <Select
                      value={formData.preferredLanguage}
                      onValueChange={(value) => handleInputChange("preferredLanguage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="kiswahili">Kiswahili</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="communicationMethod">Preferred Communication Method</Label>
                    <Select
                      value={formData.communicationMethod}
                      onValueChange={(value) => handleInputChange("communicationMethod", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="portal">Parent Portal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Notification Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="receiveUpdates">General Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive general school updates and announcements
                        </p>
                      </div>
                      <Switch
                        id="receiveUpdates"
                        checked={formData.receiveUpdates}
                        onCheckedChange={(checked) => handleInputChange("receiveUpdates", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="receiveFeeReminders">Fee Reminders</Label>
                        <p className="text-sm text-muted-foreground">Receive fee payment reminders and notifications</p>
                      </div>
                      <Switch
                        id="receiveFeeReminders"
                        checked={formData.receiveFeeReminders}
                        onCheckedChange={(checked) => handleInputChange("receiveFeeReminders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="receiveEventNotifications">Event Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about school events and activities
                        </p>
                      </div>
                      <Switch
                        id="receiveEventNotifications"
                        checked={formData.receiveEventNotifications}
                        onCheckedChange={(checked) => handleInputChange("receiveEventNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="receiveAcademicReports">Academic Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive academic progress reports and grade updates
                        </p>
                      </div>
                      <Switch
                        id="receiveAcademicReports"
                        checked={formData.receiveAcademicReports}
                        onCheckedChange={(checked) => handleInputChange("receiveAcademicReports", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contact Information</CardTitle>
                <CardDescription>Emergency contact details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="emergencyContact"
                    checked={formData.emergencyContact}
                    onCheckedChange={(checked) => handleInputChange("emergencyContact", checked)}
                  />
                  <Label htmlFor="emergencyContact">Set this parent as an emergency contact</Label>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Alternative Emergency Contact</h4>
                  <p className="text-sm text-muted-foreground">
                    Provide an alternative emergency contact in case this parent is unavailable
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                        placeholder="Enter emergency contact name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyContactPhone"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                        placeholder="Enter emergency contact phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContactRelationship">Relationship to Child</Label>
                      <Select
                        value={formData.emergencyContactRelationship}
                        onValueChange={(value) => handleInputChange("emergencyContactRelationship", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grandparent">Grandparent</SelectItem>
                          <SelectItem value="uncle">Uncle</SelectItem>
                          <SelectItem value="aunt">Aunt</SelectItem>
                          <SelectItem value="family-friend">Family Friend</SelectItem>
                          <SelectItem value="neighbor">Neighbor</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                {mode === "create" ? "Adding..." : "Updating..."}
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {mode === "create" ? "Add Parent" : "Update Parent"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

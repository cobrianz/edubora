"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Edit, Save, Phone, Mail, MapPin, Calendar, GraduationCap, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TeacherProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Mr. John Kamau",
    employeeId: "EMP2024001",
    email: "j.kamau@edubora.school",
    phone: "+254712345678",
    address: "123 Westlands, Nairobi",
    dateOfBirth: "1985-03-15",
    qualification: "Bachelor of Education (Mathematics)",
    experience: "8 years",
    subjects: ["Mathematics"],
    classes: ["Grade 7A", "Grade 8B", "Grade 6A"],
    bio: "Passionate mathematics teacher with 8 years of experience in secondary education. Committed to making mathematics accessible and enjoyable for all students.",
  })

  const handleSave = () => {
    setIsEditing(false)
    // In a real application, you would send profileData to a backend API here
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    })
  }

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="transition-all duration-300 hover:scale-105"
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Header */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.qualification}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="default">Mathematics Teacher</Badge>
                <Badge variant="outline">{profileData.experience} Experience</Badge>
                <Badge variant="outline">{profileData.classes.length} Classes</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="professional">Professional Details</TabsTrigger>
          <TabsTrigger value="teaching">Teaching Assignment</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input id="name" value={profileData.name} onChange={(e) => handleChange("name", e.target.value)} />
                  ) : (
                    <p className="text-lg font-medium">{profileData.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <p className="text-lg font-mono">{profileData.employeeId}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  ) : (
                    <p className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {profileData.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  ) : (
                    <p className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {profileData.phone}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  {isEditing ? (
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    />
                  ) : (
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {profileData.dateOfBirth}
                    </p>
                  )}
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {profileData.address}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>Your educational background and experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qualification">Highest Qualification</Label>
                  {isEditing ? (
                    <Input
                      id="qualification"
                      value={profileData.qualification}
                      onChange={(e) => handleChange("qualification", e.target.value)}
                    />
                  ) : (
                    <p className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      {profileData.qualification}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  {isEditing ? (
                    <Input
                      id="experience"
                      value={profileData.experience}
                      onChange={(e) => handleChange("experience", e.target.value)}
                    />
                  ) : (
                    <p className="text-lg font-medium">{profileData.experience}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Subjects</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.subjects.map((subject, index) => (
                      <Badge key={index} variant="default">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Teaching Status</Label>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    rows={4}
                  />
                ) : (
                  <p className="text-sm leading-relaxed">{profileData.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teaching">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Teaching Assignment</CardTitle>
              <CardDescription>Your current classes and teaching load</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Assigned Classes</Label>
                <div className="mt-2 space-y-2">
                  {profileData.classes.map((cls, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-medium">{cls}</span>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">Mathematics</Badge>
                        <Badge variant="secondary">30 Students</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">{profileData.classes.length}</div>
                  <div className="text-sm text-muted-foreground">Classes</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">90</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold">30</div>
                  <div className="text-sm text-muted-foreground">Hours/Week</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Notification Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-notifications" defaultChecked />
                      <Label htmlFor="email-notifications">Email notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms-notifications" defaultChecked />
                      <Label htmlFor="sms-notifications">SMS notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="app-notifications" defaultChecked />
                      <Label htmlFor="app-notifications">In-app notifications</Label>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Privacy Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="profile-visibility" defaultChecked />
                      <Label htmlFor="profile-visibility">Make profile visible to parents</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="contact-visibility" />
                      <Label htmlFor="contact-visibility">Allow direct contact from parents</Label>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="mr-2 bg-transparent">
                    Change Password
                  </Button>
                  <Button variant="outline">Download Data</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

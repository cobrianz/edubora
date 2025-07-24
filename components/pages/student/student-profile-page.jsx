"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Save, Edit, GraduationCap, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function StudentProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Sarah Mwangi",
    admissionNo: "ADM2024001",
    email: "sarah.mwangi@student.edubora.school",
    phone: "+254712345678",
    address: "123 Student Lane, Nairobi",
    grade: "Grade 7A",
    admissionDate: "January 15, 2023",
    parent: "John Mwangi",
    parentPhone: "+254723456789",
    parentEmail: "john.mwangi@email.com",
    status: "Active",
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    })
  }

  const handleProfileChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">View and update your personal information</p>
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
            <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center">
              <User className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.grade} Student</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="default">{profile.status}</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Admission No.</p>
              <p className="font-medium">{profile.admissionNo}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="academic">Academic Details</TabsTrigger>
          <TabsTrigger value="parent">Parent/Guardian</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => handleProfileChange("address", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionNo">Admission Number</Label>
                    <Input id="admissionNo" value={profile.admissionNo} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionDate">Admission Date</Label>
                    <Input id="admissionDate" value={profile.admissionDate} disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Details
              </CardTitle>
              <CardDescription>Your academic information and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Current Class</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Grade:</span>
                      <span className="font-medium">{profile.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class Teacher:</span>
                      <span className="font-medium">Mr. John Kamau</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Academic Year:</span>
                      <span className="font-medium">2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Term:</span>
                      <span className="font-medium">Term 2</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Grade:</span>
                      <Badge variant="default">B+</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Attendance:</span>
                      <Badge variant="default">98%</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Behavior:</span>
                      <Badge variant="default">Excellent</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class Rank:</span>
                      <Badge variant="default">5/32</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Subject Performance</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { subject: "Mathematics", grade: "A", teacher: "Mr. John Kamau" },
                    { subject: "English", grade: "B+", teacher: "Ms. Sarah Wanjiku" },
                    { subject: "Kiswahili", grade: "A-", teacher: "Mr. Peter Mwangi" },
                    { subject: "Science", grade: "B", teacher: "Dr. Mary Njeri" },
                    { subject: "Social Studies", grade: "B+", teacher: "Ms. Grace Achieng" },
                    { subject: "Art & Craft", grade: "A", teacher: "Mr. David Ochieng" },
                  ].map((subject, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{subject.subject}</h4>
                          <Badge variant="default">{subject.grade}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parent">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Parent/Guardian Information
              </CardTitle>
              <CardDescription>Your parent or guardian's contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent">Parent/Guardian Name</Label>
                    <Input
                      id="parent"
                      value={profile.parent}
                      onChange={(e) => handleProfileChange("parent", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Email Address</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={profile.parentEmail}
                      onChange={(e) => handleProfileChange("parentEmail", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number</Label>
                    <Input
                      id="parentPhone"
                      value={profile.parentPhone}
                      onChange={(e) => handleProfileChange("parentPhone", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input id="relationship" value="Father" disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements & Awards
              </CardTitle>
              <CardDescription>Your academic and co-curricular achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">Mathematics Competition Winner</h4>
                          <Badge variant="default">2024</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          1st place in the regional mathematics competition
                        </p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">Science Project Award</h4>
                          <Badge variant="default">2023</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Best innovative project in the science fair</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Co-curricular Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">School Choir</h4>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Member since 2023</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">Environmental Club</h4>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Club Secretary</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

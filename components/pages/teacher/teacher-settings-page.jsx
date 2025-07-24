"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { User, Bell, Shield, Palette, Save, Sun, Moon, Monitor } from "lucide-react"

export default function TeacherSettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  // Settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    assignmentReminders: true,
    gradeNotifications: true,
    parentMessages: true,
    systemUpdates: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    contactInfo: false,
    scheduleVisibility: true,
    performanceData: false,
  })

  const [classroomSettings, setClassroomSettings] = useState({
    autoGrading: true,
    lateSubmissions: true,
    studentFeedback: true,
    parentUpdates: true,
    attendanceReminders: true,
  })

  const handleSaveSettings = async (settingsType) => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings Saved",
        description: `${settingsType} settings have been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and settings</p>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="classroom" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Classroom
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about important updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">General Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Teaching Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Assignment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Reminders for assignment deadlines</p>
                    </div>
                    <Switch
                      checked={notificationSettings.assignmentReminders}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, assignmentReminders: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Grade Notifications</Label>
                      <p className="text-sm text-muted-foreground">Notify when grades need to be submitted</p>
                    </div>
                    <Switch
                      checked={notificationSettings.gradeNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, gradeNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Parent Messages</Label>
                      <p className="text-sm text-muted-foreground">Notifications for new parent messages</p>
                    </div>
                    <Switch
                      checked={notificationSettings.parentMessages}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, parentMessages: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Notification")} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control what information is visible to others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Profile Visibility</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Profile</Label>
                      <p className="text-sm text-muted-foreground">Make your profile visible to parents and students</p>
                    </div>
                    <Switch
                      checked={privacySettings.profileVisibility}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, profileVisibility: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Contact Information</Label>
                      <p className="text-sm text-muted-foreground">Allow parents to see your contact details</p>
                    </div>
                    <Switch
                      checked={privacySettings.contactInfo}
                      onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, contactInfo: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Schedule Visibility</Label>
                      <p className="text-sm text-muted-foreground">Show your teaching schedule to students</p>
                    </div>
                    <Switch
                      checked={privacySettings.scheduleVisibility}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, scheduleVisibility: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Privacy")} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Classroom Tab */}
        <TabsContent value="classroom">
          <Card>
            <CardHeader>
              <CardTitle>Classroom Settings</CardTitle>
              <CardDescription>Configure your classroom and teaching preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Assignment Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Grading</Label>
                      <p className="text-sm text-muted-foreground">Automatically grade multiple choice questions</p>
                    </div>
                    <Switch
                      checked={classroomSettings.autoGrading}
                      onCheckedChange={(checked) =>
                        setClassroomSettings({ ...classroomSettings, autoGrading: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Late Submissions</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow students to submit assignments after deadline
                      </p>
                    </div>
                    <Switch
                      checked={classroomSettings.lateSubmissions}
                      onCheckedChange={(checked) =>
                        setClassroomSettings({ ...classroomSettings, lateSubmissions: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Communication Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Student Feedback</Label>
                      <p className="text-sm text-muted-foreground">Allow students to provide feedback on lessons</p>
                    </div>
                    <Switch
                      checked={classroomSettings.studentFeedback}
                      onCheckedChange={(checked) =>
                        setClassroomSettings({ ...classroomSettings, studentFeedback: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Parent Updates</Label>
                      <p className="text-sm text-muted-foreground">Send automatic updates to parents</p>
                    </div>
                    <Switch
                      checked={classroomSettings.parentUpdates}
                      onCheckedChange={(checked) =>
                        setClassroomSettings({ ...classroomSettings, parentUpdates: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Classroom")} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Theme</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Color Theme</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred color theme</p>
                  </div>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings("Appearance")} disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Save, Settings } from "lucide-react"

export default function ClassSettingsModal({ classData, onClose, onSave }) {
  const [settings, setSettings] = useState({
    autoAttendance: true,
    parentNotifications: true,
    assignmentReminders: false,
    gradeVisibility: "immediate",
    attendanceThreshold: "80",
    maxAbsences: "10",
    gradingScale: "cbc",
    reportFrequency: "weekly",
  })

  if (!classData) return null

  const handleSave = () => {
    onSave(settings)
  }

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Class Settings - {classData.name}
            </CardTitle>
            <CardDescription>Configure class-specific settings and preferences</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="grading">Grading</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">General Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxStudents">Maximum Students</Label>
                      <Input id="maxStudents" type="number" defaultValue={classData.capacity} placeholder="35" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="classRoom">Assigned Room</Label>
                      <Input id="classRoom" defaultValue={classData.room} placeholder="Room 101" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="classTeacher">Class Teacher</Label>
                    <Select defaultValue={classData.teacher}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ms. Jane Doe">Ms. Jane Doe</SelectItem>
                        <SelectItem value="Mr. John Smith">Mr. John Smith</SelectItem>
                        <SelectItem value="Ms. Mary Johnson">Ms. Mary Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attendance Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Attendance</Label>
                      <p className="text-sm text-muted-foreground">Enable automatic attendance marking</p>
                    </div>
                    <Switch
                      checked={settings.autoAttendance}
                      onCheckedChange={(checked) => handleSettingChange("autoAttendance", checked)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="attendanceThreshold">Attendance Threshold (%)</Label>
                      <Input
                        id="attendanceThreshold"
                        type="number"
                        value={settings.attendanceThreshold}
                        onChange={(e) => handleSettingChange("attendanceThreshold", e.target.value)}
                        placeholder="80"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxAbsences">Maximum Absences</Label>
                      <Input
                        id="maxAbsences"
                        type="number"
                        value={settings.maxAbsences}
                        onChange={(e) => handleSettingChange("maxAbsences", e.target.value)}
                        placeholder="10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grading" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Grading Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gradingScale">Grading Scale</Label>
                    <Select
                      value={settings.gradingScale}
                      onValueChange={(value) => handleSettingChange("gradingScale", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cbc">CBC (Competency Based)</SelectItem>
                        <SelectItem value="traditional">Traditional (A-F)</SelectItem>
                        <SelectItem value="percentage">Percentage Based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradeVisibility">Grade Visibility</Label>
                    <Select
                      value={settings.gradeVisibility}
                      onValueChange={(value) => handleSettingChange("gradeVisibility", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="after_review">After Review</SelectItem>
                        <SelectItem value="end_of_term">End of Term</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Parent Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications to parents</p>
                    </div>
                    <Switch
                      checked={settings.parentNotifications}
                      onCheckedChange={(checked) => handleSettingChange("parentNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Assignment Reminders</Label>
                      <p className="text-sm text-muted-foreground">Send assignment due date reminders</p>
                    </div>
                    <Switch
                      checked={settings.assignmentReminders}
                      onCheckedChange={(checked) => handleSettingChange("assignmentReminders", checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportFrequency">Report Frequency</Label>
                    <Select
                      value={settings.reportFrequency}
                      onValueChange={(value) => handleSettingChange("reportFrequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="termly">Termly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="transition-all duration-300 hover:scale-105">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Save, Upload, Download, Shield, Bell, Users, Database } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()

  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: "EDUBORA Primary School",
    address: "123 Education Street, Nairobi",
    phone: "+254712345678",
    email: "info@edubora.school",
    website: "www.edubora.school",
    motto: "Excellence in Education",
    establishedYear: "2010",
    registrationNumber: "SCH/REG/2010/001",
  })

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    parentPortal: true,
    studentPortal: true,
    onlinePayments: true,
    attendanceReminders: true,
    feeReminders: true,
  })

  const [academicSettings, setAcademicSettings] = useState({
    currentTerm: "Term 2",
    academicYear: "2024",
    termStartDate: "2024-05-06",
    termEndDate: "2024-08-02",
    gradingSystem: "CBC",
    passMarkPercentage: "50",
    maxClassSize: "35",
    schoolStartTime: "08:00",
    schoolEndTime: "15:00",
  })

  const [securitySettings, setSecuritySettings] = useState({
    passwordExpiry: "90",
    sessionTimeout: "30",
    twoFactorAuth: false,
    loginAttempts: "3",
    dataEncryption: true,
    auditLogging: true,
  })

  const handleSchoolSettingChange = (key, value) => {
    setSchoolSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSystemSettingChange = (key, value) => {
    setSystemSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleAcademicSettingChange = (key, value) => {
    setAcademicSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSecuritySettingChange = (key, value) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = (category) => {
    toast({
      title: "Settings Saved",
      description: `${category} settings have been updated successfully`,
    })
  }

  const handleBackupData = () => {
    toast({
      title: "Backup Started",
      description: "System backup is in progress...",
    })
  }

  const handleRestoreData = () => {
    toast({
      title: "Restore Data",
      description: "Opening data restore wizard...",
    })
  }

  const handleExportSettings = () => {
    toast({
      title: "Export Settings",
      description: "Exporting system configuration...",
    })
  }

  const handleImportSettings = () => {
    toast({
      title: "Import Settings",
      description: "Opening settings import wizard...",
    })
  }

  const handleTestNotifications = () => {
    toast({
      title: "Test Notification",
      description: "Test notification sent successfully",
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure school and system preferences</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={handleExportSettings}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Settings
          </Button>
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={handleImportSettings}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="school" className="space-y-4">
        <TabsList>
          <TabsTrigger value="school">School Info</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="school">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                School Information
              </CardTitle>
              <CardDescription>Basic school information and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSaveSettings("School Information")
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">School Name</Label>
                    <Input
                      id="schoolName"
                      value={schoolSettings.schoolName}
                      onChange={(e) => handleSchoolSettingChange("schoolName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number</Label>
                    <Input
                      id="registrationNumber"
                      value={schoolSettings.registrationNumber}
                      onChange={(e) => handleSchoolSettingChange("registrationNumber", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={schoolSettings.address}
                      onChange={(e) => handleSchoolSettingChange("address", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={schoolSettings.phone}
                      onChange={(e) => handleSchoolSettingChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={schoolSettings.email}
                      onChange={(e) => handleSchoolSettingChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={schoolSettings.website}
                      onChange={(e) => handleSchoolSettingChange("website", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motto">School Motto</Label>
                    <Input
                      id="motto"
                      value={schoolSettings.motto}
                      onChange={(e) => handleSchoolSettingChange("motto", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="establishedYear">Established Year</Label>
                    <Input
                      id="establishedYear"
                      value={schoolSettings.establishedYear}
                      onChange={(e) => handleSchoolSettingChange("establishedYear", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="transition-all duration-300 hover:scale-105">
                    <Save className="mr-2 h-4 w-4" />
                    Save School Information
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Academic Settings
              </CardTitle>
              <CardDescription>Configure academic year, terms, and grading system</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSaveSettings("Academic")
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input
                      id="academicYear"
                      value={academicSettings.academicYear}
                      onChange={(e) => handleAcademicSettingChange("academicYear", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentTerm">Current Term</Label>
                    <Select
                      value={academicSettings.currentTerm}
                      onValueChange={(value) => handleAcademicSettingChange("currentTerm", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Term 1">Term 1</SelectItem>
                        <SelectItem value="Term 2">Term 2</SelectItem>
                        <SelectItem value="Term 3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="termStartDate">Term Start Date</Label>
                    <Input
                      id="termStartDate"
                      type="date"
                      value={academicSettings.termStartDate}
                      onChange={(e) => handleAcademicSettingChange("termStartDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="termEndDate">Term End Date</Label>
                    <Input
                      id="termEndDate"
                      type="date"
                      value={academicSettings.termEndDate}
                      onChange={(e) => handleAcademicSettingChange("termEndDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradingSystem">Grading System</Label>
                    <Select
                      value={academicSettings.gradingSystem}
                      onValueChange={(value) => handleAcademicSettingChange("gradingSystem", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CBC">CBC (Competency Based)</SelectItem>
                        <SelectItem value="Traditional">Traditional Grading</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passMarkPercentage">Pass Mark (%)</Label>
                    <Input
                      id="passMarkPercentage"
                      type="number"
                      value={academicSettings.passMarkPercentage}
                      onChange={(e) => handleAcademicSettingChange("passMarkPercentage", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxClassSize">Maximum Class Size</Label>
                    <Input
                      id="maxClassSize"
                      type="number"
                      value={academicSettings.maxClassSize}
                      onChange={(e) => handleAcademicSettingChange("maxClassSize", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolStartTime">School Start Time</Label>
                    <Input
                      id="schoolStartTime"
                      type="time"
                      value={academicSettings.schoolStartTime}
                      onChange={(e) => handleAcademicSettingChange("schoolStartTime", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schoolEndTime">School End Time</Label>
                    <Input
                      id="schoolEndTime"
                      type="time"
                      value={academicSettings.schoolEndTime}
                      onChange={(e) => handleAcademicSettingChange("schoolEndTime", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="transition-all duration-300 hover:scale-105">
                    <Save className="mr-2 h-4 w-4" />
                    Save Academic Settings
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                System Preferences
              </CardTitle>
              <CardDescription>Configure system behavior and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send notifications via email</p>
                      </div>
                      <Switch
                        checked={systemSettings.emailNotifications}
                        onCheckedChange={(checked) => handleSystemSettingChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                      </div>
                      <Switch
                        checked={systemSettings.smsNotifications}
                        onCheckedChange={(checked) => handleSystemSettingChange("smsNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Attendance Reminders</Label>
                        <p className="text-sm text-muted-foreground">Automatic attendance reminders</p>
                      </div>
                      <Switch
                        checked={systemSettings.attendanceReminders}
                        onCheckedChange={(checked) => handleSystemSettingChange("attendanceReminders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Fee Reminders</Label>
                        <p className="text-sm text-muted-foreground">Automatic fee payment reminders</p>
                      </div>
                      <Switch
                        checked={systemSettings.feeReminders}
                        onCheckedChange={(checked) => handleSystemSettingChange("feeReminders", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Portal Access</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Parent Portal</Label>
                        <p className="text-sm text-muted-foreground">Allow parents to access the portal</p>
                      </div>
                      <Switch
                        checked={systemSettings.parentPortal}
                        onCheckedChange={(checked) => handleSystemSettingChange("parentPortal", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Student Portal</Label>
                        <p className="text-sm text-muted-foreground">Allow students to access the portal</p>
                      </div>
                      <Switch
                        checked={systemSettings.studentPortal}
                        onCheckedChange={(checked) => handleSystemSettingChange("studentPortal", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Online Payments</Label>
                        <p className="text-sm text-muted-foreground">Enable online fee payments</p>
                      </div>
                      <Switch
                        checked={systemSettings.onlinePayments}
                        onCheckedChange={(checked) => handleSystemSettingChange("onlinePayments", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Maintenance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Automatic Backup</Label>
                        <p className="text-sm text-muted-foreground">Enable daily automatic backups</p>
                      </div>
                      <Switch
                        checked={systemSettings.autoBackup}
                        onCheckedChange={(checked) => handleSystemSettingChange("autoBackup", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleTestNotifications}
                    className="transition-all duration-300 hover:scale-105 bg-transparent"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Test Notifications
                  </Button>
                  <Button
                    onClick={() => handleSaveSettings("System")}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save System Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => handleSecuritySettingChange("passwordExpiry", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleSecuritySettingChange("sessionTimeout", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => handleSecuritySettingChange("loginAttempts", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSecuritySettingChange("twoFactorAuth", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">Encrypt sensitive data at rest</p>
                    </div>
                    <Switch
                      checked={securitySettings.dataEncryption}
                      onCheckedChange={(checked) => handleSecuritySettingChange("dataEncryption", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all system activities</p>
                    </div>
                    <Switch
                      checked={securitySettings.auditLogging}
                      onCheckedChange={(checked) => handleSecuritySettingChange("auditLogging", checked)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSaveSettings("Security")}
                    className="transition-all duration-300 hover:scale-105"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup & Restore
              </CardTitle>
              <CardDescription>Manage system backups and data restoration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">System Backup</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Create a complete backup of all system data</p>
                      <div className="space-y-2">
                        <p className="text-sm">Last backup: July 16, 2024 at 2:00 AM</p>
                        <p className="text-sm">Next scheduled: July 17, 2024 at 2:00 AM</p>
                      </div>
                      <Button className="w-full mt-4" onClick={handleBackupData}>
                        <Download className="mr-2 h-4 w-4" />
                        Create Backup Now
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Data Restore</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Restore system data from a previous backup</p>
                      <div className="space-y-2">
                        <p className="text-sm">Available backups: 7 files</p>
                        <p className="text-sm">Storage used: 2.3 GB</p>
                      </div>
                      <Button className="w-full mt-4 bg-transparent" variant="outline" onClick={handleRestoreData}>
                        <Upload className="mr-2 h-4 w-4" />
                        Restore Data
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Backup Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Automatic Daily Backup</Label>
                          <p className="text-sm text-muted-foreground">Backup system data every day at 2:00 AM</p>
                        </div>
                        <Switch
                          checked={systemSettings.autoBackup}
                          onCheckedChange={(checked) => handleSystemSettingChange("autoBackup", checked)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="backupTime">Backup Time</Label>
                          <Input id="backupTime" type="time" defaultValue="02:00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="retentionDays">Retention Period (days)</Label>
                          <Input id="retentionDays" type="number" defaultValue="30" />
                        </div>
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

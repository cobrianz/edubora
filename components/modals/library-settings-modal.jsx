"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Settings, Clock, DollarSign, Bell, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LibrarySettingsModal({ onClose, onSave }) {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // General Settings
    libraryName: "School Library",
    maxBooksPerStudent: 3,
    defaultLoanPeriod: 14,
    renewalPeriod: 7,
    maxRenewals: 2,

    // Fine Settings
    enableFines: true,
    finePerDay: 10,
    maxFineAmount: 500,
    gracePeriod: 1,

    // Notification Settings
    enableReminders: true,
    reminderDaysBefore: 3,
    overdueReminderFrequency: 7,
    enableSMSNotifications: false,
    enableEmailNotifications: true,

    // Access Settings
    allowSelfCheckout: false,
    requireLibrarianApproval: true,
    enableOnlineReservations: true,
    enableRenewalRequests: true,

    // System Settings
    enableBarcodeScan: true,
    autoGenerateISBN: false,
    enableBookReviews: true,
    enableReadingLists: true,

    // Operating Hours
    mondayHours: { open: "08:00", close: "17:00", closed: false },
    tuesdayHours: { open: "08:00", close: "17:00", closed: false },
    wednesdayHours: { open: "08:00", close: "17:00", closed: false },
    thursdayHours: { open: "08:00", close: "17:00", closed: false },
    fridayHours: { open: "08:00", close: "17:00", closed: false },
    saturdayHours: { open: "09:00", close: "13:00", closed: false },
    sundayHours: { open: "09:00", close: "13:00", closed: true },
  })

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleHoursChange = (day, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [`${day}Hours`]: { ...prev[`${day}Hours`], [field]: value },
    }))
  }

  const handleSave = () => {
    onSave(settings)
    toast({
      title: "Settings Saved",
      description: "Library settings have been updated successfully",
    })
  }

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Library Settings
            </CardTitle>
            <CardDescription>Configure library policies and system settings</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="fines">Fines</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="access">Access</TabsTrigger>
              <TabsTrigger value="hours">Hours</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="libraryName">Library Name</Label>
                  <Input
                    id="libraryName"
                    value={settings.libraryName}
                    onChange={(e) => handleSettingChange("libraryName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxBooks">Max Books Per Student</Label>
                  <Input
                    id="maxBooks"
                    type="number"
                    value={settings.maxBooksPerStudent}
                    onChange={(e) => handleSettingChange("maxBooksPerStudent", Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPeriod">Default Loan Period (days)</Label>
                  <Input
                    id="loanPeriod"
                    type="number"
                    value={settings.defaultLoanPeriod}
                    onChange={(e) => handleSettingChange("defaultLoanPeriod", Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="renewalPeriod">Renewal Period (days)</Label>
                  <Input
                    id="renewalPeriod"
                    type="number"
                    value={settings.renewalPeriod}
                    onChange={(e) => handleSettingChange("renewalPeriod", Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxRenewals">Maximum Renewals</Label>
                  <Input
                    id="maxRenewals"
                    type="number"
                    value={settings.maxRenewals}
                    onChange={(e) => handleSettingChange("maxRenewals", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">System Features</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="barcodeScan">Enable Barcode Scanning</Label>
                    <Switch
                      id="barcodeScan"
                      checked={settings.enableBarcodeScan}
                      onCheckedChange={(checked) => handleSettingChange("enableBarcodeScan", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoISBN">Auto-generate ISBN</Label>
                    <Switch
                      id="autoISBN"
                      checked={settings.autoGenerateISBN}
                      on
                      CheckedChange={(checked) => handleSettingChange("autoGenerateISBN", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="bookReviews">Enable Book Reviews</Label>
                    <Switch
                      id="bookReviews"
                      checked={settings.enableBookReviews}
                      onCheckedChange={(checked) => handleSettingChange("enableBookReviews", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="readingLists">Enable Reading Lists</Label>
                    <Switch
                      id="readingLists"
                      checked={settings.enableReadingLists}
                      onCheckedChange={(checked) => handleSettingChange("enableReadingLists", checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fines" className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Enable Late Fines
                  </h4>
                  <p className="text-sm text-muted-foreground">Charge students for overdue books</p>
                </div>
                <Switch
                  checked={settings.enableFines}
                  onCheckedChange={(checked) => handleSettingChange("enableFines", checked)}
                />
              </div>

              {settings.enableFines && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="finePerDay">Fine Per Day (KSh)</Label>
                    <Input
                      id="finePerDay"
                      type="number"
                      value={settings.finePerDay}
                      onChange={(e) => handleSettingChange("finePerDay", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxFine">Maximum Fine Amount (KSh)</Label>
                    <Input
                      id="maxFine"
                      type="number"
                      value={settings.maxFineAmount}
                      onChange={(e) => handleSettingChange("maxFineAmount", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gracePeriod">Grace Period (days)</Label>
                    <Input
                      id="gracePeriod"
                      type="number"
                      value={settings.gracePeriod}
                      onChange={(e) => handleSettingChange("gracePeriod", Number.parseInt(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">Number of days after due date before fines start</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Enable Reminders
                  </h4>
                  <p className="text-sm text-muted-foreground">Send automatic reminders to students</p>
                </div>
                <Switch
                  checked={settings.enableReminders}
                  onCheckedChange={(checked) => handleSettingChange("enableReminders", checked)}
                />
              </div>

              {settings.enableReminders && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="reminderDays">Reminder Days Before Due</Label>
                      <Input
                        id="reminderDays"
                        type="number"
                        value={settings.reminderDaysBefore}
                        onChange={(e) => handleSettingChange("reminderDaysBefore", Number.parseInt(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="overdueFreq">Overdue Reminder Frequency (days)</Label>
                      <Input
                        id="overdueFreq"
                        type="number"
                        value={settings.overdueReminderFrequency}
                        onChange={(e) =>
                          handleSettingChange("overdueReminderFrequency", Number.parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Notification Methods</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emailNotif">Email Notifications</Label>
                        <Switch
                          id="emailNotif"
                          checked={settings.enableEmailNotifications}
                          onCheckedChange={(checked) => handleSettingChange("enableEmailNotifications", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="smsNotif">SMS Notifications</Label>
                        <Switch
                          id="smsNotif"
                          checked={settings.enableSMSNotifications}
                          onCheckedChange={(checked) => handleSettingChange("enableSMSNotifications", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="access" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Access Control
                </h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="selfCheckout">Allow Self-Checkout</Label>
                      <p className="text-xs text-muted-foreground">Students can check out books without librarian</p>
                    </div>
                    <Switch
                      id="selfCheckout"
                      checked={settings.allowSelfCheckout}
                      onCheckedChange={(checked) => handleSettingChange("allowSelfCheckout", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="librarianApproval">Require Librarian Approval</Label>
                      <p className="text-xs text-muted-foreground">All transactions need librarian approval</p>
                    </div>
                    <Switch
                      id="librarianApproval"
                      checked={settings.requireLibrarianApproval}
                      onCheckedChange={(checked) => handleSettingChange("requireLibrarianApproval", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="onlineReservations">Enable Online Reservations</Label>
                      <p className="text-xs text-muted-foreground">Students can reserve books online</p>
                    </div>
                    <Switch
                      id="onlineReservations"
                      checked={settings.enableOnlineReservations}
                      onCheckedChange={(checked) => handleSettingChange("enableOnlineReservations", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="renewalRequests">Enable Renewal Requests</Label>
                      <p className="text-xs text-muted-foreground">Students can request book renewals</p>
                    </div>
                    <Switch
                      id="renewalRequests"
                      checked={settings.enableRenewalRequests}
                      onCheckedChange={(checked) => handleSettingChange("enableRenewalRequests", checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hours" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Operating Hours
                </h4>

                <div className="space-y-3">
                  {days.map((day) => (
                    <div key={day.key} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                      <div className="w-20">
                        <Label className="font-medium">{day.label}</Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Switch
                          checked={!settings[`${day.key}Hours`].closed}
                          onCheckedChange={(checked) => handleHoursChange(day.key, "closed", !checked)}
                        />
                        <Label className="text-sm">Open</Label>
                      </div>

                      {!settings[`${day.key}Hours`].closed && (
                        <>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">From:</Label>
                            <Input
                              type="time"
                              value={settings[`${day.key}Hours`].open}
                              onChange={(e) => handleHoursChange(day.key, "open", e.target.value)}
                              className="w-32"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <Label className="text-sm">To:</Label>
                            <Input
                              type="time"
                              value={settings[`${day.key}Hours`].close}
                              onChange={(e) => handleHoursChange(day.key, "close", e.target.value)}
                              className="w-32"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Settings className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

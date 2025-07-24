"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Share2, Link, Copy, Send, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ShareMaterialModal({ material, onClose, onShare }) {
  const { toast } = useToast()
  const [shareConfig, setShareConfig] = useState({
    recipients: {
      students: [],
      teachers: [],
      parents: [],
      classes: [],
      grades: [],
      custom: [],
    },
    permissions: {
      view: true,
      download: true,
      comment: false,
      share: false,
    },
    delivery: {
      method: "notification",
      schedule: "immediate",
      date: "",
      time: "",
      message: "",
    },
    access: {
      expiry: "",
      passwordProtected: false,
      password: "",
      trackViews: true,
      allowOffline: true,
    },
  })

  const [customEmail, setCustomEmail] = useState("")
  const [shareLink, setShareLink] = useState("")
  const [linkGenerated, setLinkGenerated] = useState(false)

  const availableStudents = [
    { id: 1, name: "Sarah Mwangi", class: "Grade 7A" },
    { id: 2, name: "John Doe", class: "Grade 7A" },
    { id: 3, name: "Mary Johnson", class: "Grade 7B" },
  ]

  const availableTeachers = [
    { id: 1, name: "Ms. Johnson", subject: "Mathematics" },
    { id: 2, name: "Mr. Smith", subject: "English" },
    { id: 3, name: "Mrs. Wilson", subject: "Science" },
  ]

  const availableClasses = ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 7B", "Grade 8A", "Grade 8B"]
  const availableGrades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9"]

  const handleRecipientToggle = (type, recipient) => {
    const currentRecipients = shareConfig.recipients[type]
    const isSelected = currentRecipients.some((r) => r.id === recipient.id || r === recipient)

    if (isSelected) {
      setShareConfig({
        ...shareConfig,
        recipients: {
          ...shareConfig.recipients,
          [type]: currentRecipients.filter((r) => r.id !== recipient.id && r !== recipient),
        },
      })
    } else {
      setShareConfig({
        ...shareConfig,
        recipients: {
          ...shareConfig.recipients,
          [type]: [...currentRecipients, recipient],
        },
      })
    }
  }

  const handlePermissionChange = (permission, value) => {
    setShareConfig({
      ...shareConfig,
      permissions: { ...shareConfig.permissions, [permission]: value },
    })
  }

  const handleDeliveryChange = (field, value) => {
    setShareConfig({
      ...shareConfig,
      delivery: { ...shareConfig.delivery, [field]: value },
    })
  }

  const handleAccessChange = (field, value) => {
    setShareConfig({
      ...shareConfig,
      access: { ...shareConfig.access, [field]: value },
    })
  }

  const addCustomEmail = () => {
    if (customEmail.trim() && !shareConfig.recipients.custom.includes(customEmail.trim())) {
      setShareConfig({
        ...shareConfig,
        recipients: {
          ...shareConfig.recipients,
          custom: [...shareConfig.recipients.custom, customEmail.trim()],
        },
      })
      setCustomEmail("")
    }
  }

  const removeCustomEmail = (email) => {
    setShareConfig({
      ...shareConfig,
      recipients: {
        ...shareConfig.recipients,
        custom: shareConfig.recipients.custom.filter((e) => e !== email),
      },
    })
  }

  const generateShareLink = () => {
    const link = `https://school.example.com/materials/${material?.id || "sample"}?token=${Math.random().toString(36).substr(2, 9)}`
    setShareLink(link)
    setLinkGenerated(true)
    toast({
      title: "Share Link Generated",
      description: "Link has been generated and copied to clipboard",
    })
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
    toast({
      title: "Link Copied",
      description: "Share link has been copied to clipboard",
    })
  }

  const getTotalRecipients = () => {
    return Object.values(shareConfig.recipients).reduce((total, recipients) => total + recipients.length, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (getTotalRecipients() === 0) {
      toast({
        title: "No Recipients Selected",
        description: "Please select at least one recipient to share with",
        variant: "destructive",
      })
      return
    }

    onShare(shareConfig)
    toast({
      title: "Material Shared",
      description: `Successfully shared with ${getTotalRecipients()} recipients`,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share Learning Material
            </CardTitle>
            <CardDescription>
              Share "{material?.title || "Learning Material"}" with students, teachers, and parents
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="recipients" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="recipients">Recipients</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                <TabsTrigger value="link">Share Link</TabsTrigger>
              </TabsList>

              <TabsContent value="recipients" className="space-y-4">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Select Recipients</h4>
                    <Badge variant="outline">{getTotalRecipients()} selected</Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base font-medium">Students</Label>
                      <div className="grid gap-2 md:grid-cols-2 mt-2">
                        {availableStudents.map((student) => (
                          <div key={student.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`student-${student.id}`}
                              checked={shareConfig.recipients.students.some((s) => s.id === student.id)}
                              onCheckedChange={() => handleRecipientToggle("students", student)}
                            />
                            <Label htmlFor={`student-${student.id}`} className="flex-1">
                              {student.name} ({student.class})
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Teachers</Label>
                      <div className="grid gap-2 md:grid-cols-2 mt-2">
                        {availableTeachers.map((teacher) => (
                          <div key={teacher.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`teacher-${teacher.id}`}
                              checked={shareConfig.recipients.teachers.some((t) => t.id === teacher.id)}
                              onCheckedChange={() => handleRecipientToggle("teachers", teacher)}
                            />
                            <Label htmlFor={`teacher-${teacher.id}`} className="flex-1">
                              {teacher.name} ({teacher.subject})
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Classes</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {availableClasses.map((cls) => (
                          <Badge
                            key={cls}
                            variant={shareConfig.recipients.classes.includes(cls) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleRecipientToggle("classes", cls)}
                          >
                            {cls}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Grades</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {availableGrades.map((grade) => (
                          <Badge
                            key={grade}
                            variant={shareConfig.recipients.grades.includes(grade) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleRecipientToggle("grades", grade)}
                          >
                            {grade}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium">Custom Email Addresses</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          type="email"
                          value={customEmail}
                          onChange={(e) => setCustomEmail(e.target.value)}
                          placeholder="Enter email address"
                        />
                        <Button type="button" onClick={addCustomEmail}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {shareConfig.recipients.custom.map((email) => (
                          <Badge key={email} variant="secondary" className="cursor-pointer">
                            {email}
                            <X className="h-3 w-3 ml-1" onClick={() => removeCustomEmail(email)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-4">
                <div className="space-y-6">
                  <h4 className="font-medium">Access Permissions</h4>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="view"
                        checked={shareConfig.permissions.view}
                        onCheckedChange={(checked) => handlePermissionChange("view", checked)}
                      />
                      <Label htmlFor="view" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Material
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="download"
                        checked={shareConfig.permissions.download}
                        onCheckedChange={(checked) => handlePermissionChange("download", checked)}
                      />
                      <Label htmlFor="download">Download Material</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="comment"
                        checked={shareConfig.permissions.comment}
                        onCheckedChange={(checked) => handlePermissionChange("comment", checked)}
                      />
                      <Label htmlFor="comment">Add Comments</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="share"
                        checked={shareConfig.permissions.share}
                        onCheckedChange={(checked) => handlePermissionChange("share", checked)}
                      />
                      <Label htmlFor="share">Share with Others</Label>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-medium">Access Control</h4>

                    <div className="space-y-2">
                      <Label>Access Expiry</Label>
                      <Input
                        type="date"
                        value={shareConfig.access.expiry}
                        onChange={(e) => handleAccessChange("expiry", e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="passwordProtected"
                        checked={shareConfig.access.passwordProtected}
                        onCheckedChange={(checked) => handleAccessChange("passwordProtected", checked)}
                      />
                      <Label htmlFor="passwordProtected">Password Protected</Label>
                    </div>

                    {shareConfig.access.passwordProtected && (
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input
                          type="password"
                          value={shareConfig.access.password}
                          onChange={(e) => handleAccessChange("password", e.target.value)}
                          placeholder="Enter password"
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trackViews"
                        checked={shareConfig.access.trackViews}
                        onCheckedChange={(checked) => handleAccessChange("trackViews", checked)}
                      />
                      <Label htmlFor="trackViews">Track Views</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="allowOffline"
                        checked={shareConfig.access.allowOffline}
                        onCheckedChange={(checked) => handleAccessChange("allowOffline", checked)}
                      />
                      <Label htmlFor="allowOffline">Allow Offline Access</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="delivery" className="space-y-4">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Delivery Method</Label>
                      <Select
                        value={shareConfig.delivery.method}
                        onValueChange={(value) => handleDeliveryChange("method", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="notification">In-App Notification</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Schedule</Label>
                      <Select
                        value={shareConfig.delivery.schedule}
                        onValueChange={(value) => handleDeliveryChange("schedule", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Send Immediately</SelectItem>
                          <SelectItem value="scheduled">Schedule for Later</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {shareConfig.delivery.schedule === "scheduled" && (
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input
                            type="date"
                            value={shareConfig.delivery.date}
                            onChange={(e) => handleDeliveryChange("date", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Time</Label>
                          <Input
                            type="time"
                            value={shareConfig.delivery.time}
                            onChange={(e) => handleDeliveryChange("time", e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Custom Message (Optional)</Label>
                      <Textarea
                        value={shareConfig.delivery.message}
                        onChange={(e) => handleDeliveryChange("message", e.target.value)}
                        placeholder="Add a personal message to recipients..."
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="link" className="space-y-4">
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="font-medium mb-2">Generate Share Link</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create a shareable link that can be sent via any platform
                    </p>

                    {!linkGenerated ? (
                      <Button onClick={generateShareLink}>
                        <Link className="mr-2 h-4 w-4" />
                        Generate Link
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg border">
                          <div className="flex items-center gap-2">
                            <Input value={shareLink} readOnly className="flex-1" />
                            <Button variant="outline" onClick={copyLink}>
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>Link expires: {shareConfig.access.expiry || "Never"}</p>
                          <p>Password protected: {shareConfig.access.passwordProtected ? "Yes" : "No"}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Share Material
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

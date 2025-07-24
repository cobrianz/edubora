"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, AlertTriangle, Users, MapPin, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function ConflictResolutionModal({ onClose, onResolve }) {
  const { toast } = useToast()
  const [selectedConflict, setSelectedConflict] = useState(null)
  const [resolutionMethod, setResolutionMethod] = useState("")

  // Sample conflicts data
  const [conflicts, setConflicts] = useState([
    {
      id: "C001",
      type: "teacher_double_booking",
      severity: "high",
      title: "Teacher Double Booking",
      description: "Mr. John Kamau is scheduled for Grade 7A and Grade 8A at the same time",
      details: {
        teacher: "Mr. John Kamau",
        time: "Monday 8:00-8:40",
        classes: ["Grade 7A", "Grade 8A"],
        rooms: ["Room 201", "Room 202"],
        subject: "Mathematics",
      },
      suggestions: [
        {
          id: "S001",
          method: "reschedule_class",
          description: "Move Grade 8A Mathematics to Monday 9:20-10:00",
          impact: "Low - Only affects one period",
          feasibility: "High",
        },
        {
          id: "S002",
          method: "assign_substitute",
          description: "Assign Ms. Sarah Wanjiku to teach Grade 8A Mathematics",
          impact: "Medium - Requires subject coordination",
          feasibility: "Medium",
        },
      ],
      status: "pending",
      createdAt: "2024-12-07T08:00:00Z",
    },
    {
      id: "C002",
      type: "room_conflict",
      severity: "high",
      title: "Room Double Booking",
      description: "Room 201 is assigned to both Grade 7A and Grade 9B at the same time",
      details: {
        room: "Room 201",
        time: "Tuesday 10:20-11:00",
        classes: ["Grade 7A", "Grade 9B"],
        teachers: ["Mr. John Kamau", "Dr. Mary Njeri"],
        subjects: ["Mathematics", "Science"],
      },
      suggestions: [
        {
          id: "S003",
          method: "move_to_available_room",
          description: "Move Grade 9B Science to Science Lab 1",
          impact: "Low - Better suited for Science class",
          feasibility: "High",
        },
        {
          id: "S004",
          method: "reschedule_period",
          description: "Move Grade 9B Science to Tuesday 11:00-11:40",
          impact: "Medium - Affects subsequent periods",
          feasibility: "Medium",
        },
      ],
      status: "pending",
      createdAt: "2024-12-07T09:15:00Z",
    },
    {
      id: "C003",
      type: "capacity_overflow",
      severity: "medium",
      title: "Room Capacity Exceeded",
      description: "Grade 8A (35 students) assigned to Computer Lab (25 capacity)",
      details: {
        class: "Grade 8A",
        room: "Computer Lab",
        capacity: 25,
        students: 35,
        subject: "Computer Studies",
        teacher: "Mr. Paul Kimani",
        time: "Wednesday 1:00-1:40",
      },
      suggestions: [
        {
          id: "S005",
          method: "split_class",
          description: "Split Grade 8A into two groups for Computer Studies",
          impact: "High - Requires additional period and teacher time",
          feasibility: "Medium",
        },
        {
          id: "S006",
          method: "move_to_larger_room",
          description: "Move Computer Studies to Room 201 with portable computers",
          impact: "Medium - Requires equipment setup",
          feasibility: "Low",
        },
      ],
      status: "pending",
      createdAt: "2024-12-07T10:30:00Z",
    },
    {
      id: "C004",
      type: "subject_teacher_mismatch",
      severity: "low",
      title: "Subject-Teacher Specialization Mismatch",
      description: "Ms. Sarah Wanjiku (English) assigned to teach Science to Grade 6A",
      details: {
        teacher: "Ms. Sarah Wanjiku",
        teacherSubject: "English",
        assignedSubject: "Science",
        class: "Grade 6A",
        time: "Thursday 11:00-11:40",
        room: "Room 101",
      },
      suggestions: [
        {
          id: "S007",
          method: "reassign_teacher",
          description: "Assign Dr. Mary Njeri to teach Science to Grade 6A",
          impact: "Low - Simple teacher swap",
          feasibility: "High",
        },
        {
          id: "S008",
          method: "teacher_training",
          description: "Provide Science teaching support to Ms. Sarah Wanjiku",
          impact: "Low - Long-term solution",
          feasibility: "Medium",
        },
      ],
      status: "pending",
      createdAt: "2024-12-07T11:45:00Z",
    },
  ])

  // Analytics data
  const conflictsByType = [
    { type: "Teacher Conflicts", count: 1, color: "#ef4444" },
    { type: "Room Conflicts", count: 1, color: "#f59e0b" },
    { type: "Capacity Issues", count: 1, color: "#8b5cf6" },
    { type: "Subject Mismatches", count: 1, color: "#06b6d4" },
  ]

  const conflictsBySeverity = [
    { severity: "High", count: 2, color: "#ef4444" },
    { severity: "Medium", count: 1, color: "#f59e0b" },
    { severity: "Low", count: 1, color: "#10b981" },
  ]

  const resolutionTrends = [
    { week: "Week 1", resolved: 8, pending: 3 },
    { week: "Week 2", resolved: 12, pending: 2 },
    { week: "Week 3", resolved: 6, pending: 4 },
    { week: "Week 4", resolved: 9, pending: 4 },
  ]

  const handleResolveConflict = (conflictId, suggestionId) => {
    const conflict = conflicts.find((c) => c.id === conflictId)
    const suggestion = conflict?.suggestions.find((s) => s.id === suggestionId)

    if (!suggestion) return

    // Update conflict status
    setConflicts(
      conflicts.map((c) =>
        c.id === conflictId
          ? {
              ...c,
              status: "resolved",
              resolvedAt: new Date().toISOString(),
              resolution: suggestion,
            }
          : c,
      ),
    )

    toast({
      title: "Conflict Resolved",
      description: `${conflict.title} has been resolved using: ${suggestion.description}`,
    })

    onResolve(conflictId, suggestionId)
  }

  const handleDismissConflict = (conflictId) => {
    setConflicts(conflicts.map((c) => (c.id === conflictId ? { ...c, status: "dismissed" } : c)))

    toast({
      title: "Conflict Dismissed",
      description: "Conflict has been marked as dismissed",
    })
  }

  const handleRunConflictCheck = () => {
    toast({
      title: "Running Conflict Check",
      description: "Scanning timetable for potential conflicts...",
    })

    // Simulate conflict detection
    setTimeout(() => {
      toast({
        title: "Conflict Check Complete",
        description: "No new conflicts detected",
      })
    }, 2000)
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getConflictIcon = (type) => {
    switch (type) {
      case "teacher_double_booking":
        return Users
      case "room_conflict":
        return MapPin
      case "capacity_overflow":
        return Users
      case "subject_teacher_mismatch":
        return Clock
      default:
        return AlertTriangle
    }
  }

  const pendingConflicts = conflicts.filter((c) => c.status === "pending")
  const resolvedConflicts = conflicts.filter((c) => c.status === "resolved")

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Conflict Resolution Center
            </CardTitle>
            <CardDescription>Identify and resolve timetable scheduling conflicts</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRunConflictCheck}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Run Check
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="conflicts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="conflicts">Active Conflicts ({pendingConflicts.length})</TabsTrigger>
              <TabsTrigger value="resolved">Resolved ({resolvedConflicts.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
            </TabsList>

            <TabsContent value="conflicts" className="space-y-4">
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{pendingConflicts.length}</div>
                      <div className="text-sm text-muted-foreground">Active Conflicts</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {pendingConflicts.filter((c) => c.severity === "high").length}
                      </div>
                      <div className="text-sm text-muted-foreground">High Priority</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{resolvedConflicts.length}</div>
                      <div className="text-sm text-muted-foreground">Resolved Today</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round((resolvedConflicts.length / conflicts.length) * 100)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Resolution Rate</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Conflicts List */}
              <div className="space-y-4">
                {pendingConflicts.map((conflict) => {
                  const ConflictIcon = getConflictIcon(conflict.type)
                  return (
                    <Card key={conflict.id} className="border-l-4 border-l-red-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <ConflictIcon className="h-5 w-5 mt-1 text-red-600" />
                            <div>
                              <CardTitle className="text-lg">{conflict.title}</CardTitle>
                              <CardDescription>{conflict.description}</CardDescription>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant={getSeverityColor(conflict.severity)}>
                                  {conflict.severity} priority
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(conflict.createdAt).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDismissConflict(conflict.id)}
                            className="text-muted-foreground"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Conflict Details */}
                          <div className="p-3 bg-muted rounded-lg">
                            <h4 className="font-medium mb-2">Conflict Details</h4>
                            <div className="grid gap-2 text-sm">
                              {Object.entries(conflict.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-muted-foreground capitalize">
                                    {key.replace(/([A-Z])/g, " $1").trim()}:
                                  </span>
                                  <span className="font-medium">{Array.isArray(value) ? value.join(", ") : value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Resolution Suggestions */}
                          <div>
                            <h4 className="font-medium mb-3">Suggested Resolutions</h4>
                            <div className="space-y-3">
                              {conflict.suggestions.map((suggestion) => (
                                <div
                                  key={suggestion.id}
                                  className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-medium">{suggestion.description}</h5>
                                      <div className="grid gap-1 mt-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Impact:</span>
                                          <span>{suggestion.impact}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Feasibility:</span>
                                          <Badge
                                            variant={
                                              suggestion.feasibility === "High"
                                                ? "default"
                                                : suggestion.feasibility === "Medium"
                                                  ? "secondary"
                                                  : "outline"
                                            }
                                          >
                                            {suggestion.feasibility}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() => handleResolveConflict(conflict.id, suggestion.id)}
                                      className="ml-3"
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Apply
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                {pendingConflicts.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Active Conflicts</h3>
                      <p className="text-muted-foreground">All scheduling conflicts have been resolved!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recently Resolved Conflicts</CardTitle>
                </CardHeader>
                <CardContent>
                  {resolvedConflicts.length > 0 ? (
                    <div className="space-y-3">
                      {resolvedConflicts.map((conflict) => (
                        <div key={conflict.id} className="p-3 border rounded-lg bg-green-50 dark:bg-green-950">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{conflict.title}</h4>
                              <p className="text-sm text-muted-foreground">{conflict.description}</p>
                              {conflict.resolution && (
                                <p className="text-sm text-green-600 mt-1">
                                  Resolved: {conflict.resolution.description}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <Badge variant="default" className="bg-green-600">
                                Resolved
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {conflict.resolvedAt && new Date(conflict.resolvedAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">No resolved conflicts yet</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Conflicts by Type */}
                <Card>
                  <CardHeader>
                    <CardTitle>Conflicts by Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={conflictsByType}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ type, count }) => `${type}: ${count}`}
                        >
                          {conflictsByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Conflicts by Severity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Conflicts by Severity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={conflictsBySeverity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="severity" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Resolution Trends */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Resolution Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={resolutionTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                        <Bar dataKey="pending" fill="#ef4444" name="Pending" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="prevention" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conflict Prevention Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Teacher Scheduling</h4>
                      <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                        <li>• Check teacher availability before assignment</li>
                        <li>• Limit consecutive teaching periods to 3</li>
                        <li>• Ensure adequate break time between classes</li>
                        <li>• Match subjects with teacher specializations</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Room Management</h4>
                      <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                        <li>• Verify room capacity vs class size</li>
                        <li>• Check room type suitability for subjects</li>
                        <li>• Allow buffer time for room transitions</li>
                        <li>• Consider equipment requirements</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Time Management</h4>
                      <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                        <li>• Avoid overlapping time slots</li>
                        <li>• Schedule breaks appropriately</li>
                        <li>• Consider peak and off-peak hours</li>
                        <li>• Plan for special events and assemblies</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Best Practices</h4>
                      <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                        <li>• Run conflict checks regularly</li>
                        <li>• Maintain updated teacher and room data</li>
                        <li>• Use automated scheduling tools</li>
                        <li>• Plan for contingencies and substitutions</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Automated Conflict Detection</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      The system automatically checks for conflicts when:
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• New periods are added to the timetable</li>
                      <li>• Existing periods are modified</li>
                      <li>• Teacher or room assignments are changed</li>
                      <li>• Manual conflict checks are triggered</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

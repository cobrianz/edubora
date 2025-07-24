"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CheckCircle, XCircle, AlertCircle, Download, BarChart3 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function StudentAttendancePage() {
  const { toast } = useToast()
  const [selectedMonth, setSelectedMonth] = useState("july")
  const [selectedTerm, setSelectedTerm] = useState("term2")

  const months = [
    { value: "july", label: "July 2024" },
    { value: "june", label: "June 2024" },
    { value: "may", label: "May 2024" },
  ]

  const terms = [
    { value: "term1", label: "Term 1 (Jan-Apr)" },
    { value: "term2", label: "Term 2 (May-Aug)" },
    { value: "term3", label: "Term 3 (Sep-Dec)" },
  ]

  const attendanceData = [
    { date: "2024-07-15", day: "Monday", status: "present", notes: "" },
    { date: "2024-07-16", day: "Tuesday", status: "present", notes: "" },
    { date: "2024-07-17", day: "Wednesday", status: "absent", notes: "Medical appointment" },
    { date: "2024-07-18", day: "Thursday", status: "present", notes: "" },
    { date: "2024-07-19", day: "Friday", status: "late", notes: "Arrived 20 minutes late" },
    { date: "2024-07-22", day: "Monday", status: "present", notes: "" },
    { date: "2024-07-23", day: "Tuesday", status: "present", notes: "" },
    { date: "2024-07-24", day: "Wednesday", status: "present", notes: "" },
    { date: "2024-07-25", day: "Thursday", status: "present", notes: "" },
    { date: "2024-07-26", day: "Friday", status: "present", notes: "" },
  ]

  const handleExportAttendance = () => {
    toast({
      title: "Export Attendance",
      description: "Exporting your attendance record as PDF...",
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "late":
        return <AlertCircle className="h-4 w-4 text-amber-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "present":
        return (
          <Badge variant="default" className="bg-green-600">
            Present
          </Badge>
        )
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      case "late":
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-600">
            Late
          </Badge>
        )
      default:
        return null
    }
  }

  const presentCount = attendanceData.filter((day) => day.status === "present").length
  const absentCount = attendanceData.filter((day) => day.status === "absent").length
  const lateCount = attendanceData.filter((day) => day.status === "late").length
  const totalDays = attendanceData.length
  const attendanceRate = Math.round((presentCount / totalDays) * 100)

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Attendance</h1>
          <p className="text-muted-foreground">View your attendance record and statistics</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((term) => (
                <SelectItem key={term.value} value={term.value}>
                  {term.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={handleExportAttendance}
          >
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">This term</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${attendanceRate}%` }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
            <p className="text-xs text-muted-foreground">Out of {totalDays} days</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
            <p className="text-xs text-muted-foreground">Out of {totalDays} days</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Days</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{lateCount}</div>
            <p className="text-xs text-muted-foreground">Out of {totalDays} days</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Record
          </CardTitle>
          <CardDescription>Your daily attendance for July 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData.map((day, index) => (
                  <TableRow key={index} className="transition-all duration-200 hover:bg-muted/50">
                    <TableCell>{day.date}</TableCell>
                    <TableCell>{day.day}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(day.status)}
                        {getStatusBadge(day.status)}
                      </div>
                    </TableCell>
                    <TableCell>{day.notes || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Attendance Policy</CardTitle>
          <CardDescription>Important information about school attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Minimum Attendance Requirement</h3>
              <p className="text-sm text-muted-foreground">
                Students are required to maintain at least 85% attendance throughout the term to be eligible for
                examinations.
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Reporting Absences</h3>
              <p className="text-sm text-muted-foreground">
                All absences must be reported by a parent or guardian through the school portal or by calling the school
                office before 8:00 AM.
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-medium mb-2">Medical Absences</h3>
              <p className="text-sm text-muted-foreground">
                Medical absences require a doctor's note to be submitted within 3 days of returning to school.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

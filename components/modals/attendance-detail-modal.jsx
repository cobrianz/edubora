"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AttendanceDetailModal({ attendanceRecord, onClose }) {
  if (!attendanceRecord) return null

  // Mock student attendance for a specific record
  const studentsAttendance = [
    { id: 1, name: "Sarah Mwangi", admissionNo: "ADM001", status: "Present" },
    { id: 2, name: "John Doe", admissionNo: "ADM002", status: "Present" },
    { id: 3, name: "Mary Wanjiku", admissionNo: "ADM003", status: "Present" },
    { id: 4, name: "Peter Kamau", admissionNo: "ADM004", status: "Absent" },
    { id: 5, name: "Grace Akinyi", admissionNo: "ADM005", status: "Present" },
    { id: 6, name: "David Ochieng", admissionNo: "ADM006", status: "Present" },
    { id: 7, name: "Emily Davis", admissionNo: "ADM007", status: "Late" },
    { id: 8, name: "Michael Brown", admissionNo: "ADM008", status: "Present" },
  ].filter((student) => (student.status === "Present" ? true : attendanceRecord.absent > 0)) // Simple filter to show some absent if record has absents

  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
            Present
          </Badge>
        )
      case "Absent":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
            Absent
          </Badge>
        )
      case "Late":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Late
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Calendar className="h-5 w-5" />
            Attendance Details for {attendanceRecord.date}
          </DialogTitle>
          <DialogDescription>
            Detailed attendance record for {attendanceRecord.class} on {attendanceRecord.date}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{attendanceRecord.present + attendanceRecord.absent}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Present</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{attendanceRecord.present}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{attendanceRecord.absent}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Student Attendance List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Admission No.</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentsAttendance.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.admissionNo}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

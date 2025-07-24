import StudentAttendancePage from "@/components/pages/student/student-attendance-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function StudentAttendancePageRoute() {
  return (
    <DashboardLayout role="student">
      <StudentAttendancePage />
    </DashboardLayout>
  )
}

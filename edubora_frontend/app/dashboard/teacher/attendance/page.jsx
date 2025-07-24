import DashboardLayout from "@/components/layout/dashboard-layout"
import TeacherAttendancePage from "@/components/pages/teacher/teacher-attendance-page"

export default function TeacherAttendancePageRoute() {
  return (
    <DashboardLayout role="teacher">
      <TeacherAttendancePage />
    </DashboardLayout>
  )
}

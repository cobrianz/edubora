import DashboardLayout from "@/components/layout/dashboard-layout"
import TeacherAssignmentsPage from "@/components/pages/teacher/teacher-assignments-page"

export default function TeacherAssignmentsPageRoute() {
  return (
    <DashboardLayout role="teacher">
      <TeacherAssignmentsPage />
    </DashboardLayout>
  )
}

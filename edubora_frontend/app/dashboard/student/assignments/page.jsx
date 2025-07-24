import DashboardLayout from "@/components/layout/dashboard-layout"
import StudentAssignmentsPage from "@/components/pages/student/student-assignments-page"

export default function StudentAssignmentsPageRoute() {
  return (
    <DashboardLayout role="student">
      <StudentAssignmentsPage />
    </DashboardLayout>
  )
}

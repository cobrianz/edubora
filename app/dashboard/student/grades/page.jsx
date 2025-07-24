import DashboardLayout from "@/components/layout/dashboard-layout"
import StudentGradesPage from "@/components/pages/student/student-grades-page"

export default function StudentGradesPageRoute() {
  return (
    <DashboardLayout role="student">
      <StudentGradesPage />
    </DashboardLayout>
  )
}

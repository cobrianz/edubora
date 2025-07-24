import DashboardLayout from "@/components/layout/dashboard-layout"
import TeacherGradesPage from "@/components/pages/teacher/teacher-grades-page"

export default function TeacherGradesPageRoute() {
  return (
    <DashboardLayout role="teacher">
      <TeacherGradesPage />
    </DashboardLayout>
  )
}

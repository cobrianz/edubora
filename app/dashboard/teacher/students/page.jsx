import DashboardLayout from "@/components/layout/dashboard-layout"
import TeacherStudentsPage from "@/components/pages/teacher/teacher-students-page"

export default function TeacherStudentsPageRoute() {
  return (
    <DashboardLayout role="teacher">
      <TeacherStudentsPage />
    </DashboardLayout>
  )
}

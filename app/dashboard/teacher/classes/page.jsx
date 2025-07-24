import DashboardLayout from "@/components/layout/dashboard-layout"
import TeacherClassesPage from "@/components/pages/teacher/teacher-classes-page"

export default function TeacherClassesPageRoute() {
  return (
    <DashboardLayout role="teacher">
      <TeacherClassesPage />
    </DashboardLayout>
  )
}

import DashboardLayout from "@/components/layout/dashboard-layout"
import TeacherSettingsPage from "@/components/pages/teacher/teacher-settings-page"

export default function TeacherSettingsPageRoute() {
  return (
    <DashboardLayout requiredRole="teacher">
      <TeacherSettingsPage />
    </DashboardLayout>
  )
}

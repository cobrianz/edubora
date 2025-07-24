import TeacherDashboard from "@/components/dashboard/teacher/teacher-dashboard"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function TeacherDashboardPage() {
  return (
    <DashboardLayout role="teacher">
      <TeacherDashboard />
    </DashboardLayout>
  )
}

import StudentDashboard from "@/components/dashboard/student/student-dashboard"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function StudentDashboardPage() {
  return (
    <DashboardLayout role="student">
      <StudentDashboard />
    </DashboardLayout>
  )
}

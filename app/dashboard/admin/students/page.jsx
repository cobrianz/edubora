import StudentsPage from "@/components/pages/admin/students-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AdminStudentsPage() {
  return (
    <DashboardLayout role="admin">
      <StudentsPage />
    </DashboardLayout>
  )
}

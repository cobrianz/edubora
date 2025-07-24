import TeachersPage from "@/components/pages/admin/teachers-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AdminTeachersPage() {
  return (
    <DashboardLayout role="admin">
      <TeachersPage />
    </DashboardLayout>
  )
}

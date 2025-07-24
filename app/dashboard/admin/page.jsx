import AdminDashboard from "@/components/dashboard/admin/admin-dashboard"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout role="admin">
      <AdminDashboard />
    </DashboardLayout>
  )
}

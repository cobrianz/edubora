import DashboardLayout from "@/components/layout/dashboard-layout"
import AdminMessagesPage from "@/components/pages/admin/messages-page"

export default function AdminMessagesPageRoute() {
  return (
    <DashboardLayout requiredRole="admin">
      <AdminMessagesPage />
    </DashboardLayout>
  )
}

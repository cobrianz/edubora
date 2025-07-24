import SettingsPage from "@/components/pages/admin/settings-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AdminSettingsPage() {
  return (
    <DashboardLayout role="admin">
      <SettingsPage />
    </DashboardLayout>
  )
}

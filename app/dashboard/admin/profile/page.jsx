import ProfilePage from "@/components/pages/admin/profile-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AdminProfilePage() {
  return (
    <DashboardLayout role="admin">
      <ProfilePage />
    </DashboardLayout>
  )
}

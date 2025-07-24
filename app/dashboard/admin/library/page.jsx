import LibraryPage from "@/components/pages/admin/library-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AdminLibraryPage() {
  return (
    <DashboardLayout role="admin">
      <LibraryPage />
    </DashboardLayout>
  )
}

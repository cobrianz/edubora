import LibrarianDashboard from "@/components/dashboard/librarian/librarian-dashboard"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function LibrarianDashboardPage() {
  return (
    <DashboardLayout role="librarian">
      <LibrarianDashboard />
    </DashboardLayout>
  )
}

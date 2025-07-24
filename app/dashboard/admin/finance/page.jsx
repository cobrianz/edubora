import FinancePage from "@/components/pages/admin/finance-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AdminFinancePage() {
  return (
    <DashboardLayout role="admin">
      <FinancePage />
    </DashboardLayout>
  )
}

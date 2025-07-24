import AccountantReportsPage from "@/components/pages/accountant/accountant-reports-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AccountantReportsPageRoute() {
  return (
    <DashboardLayout role="accountant">
      <AccountantReportsPage />
    </DashboardLayout>
  )
}

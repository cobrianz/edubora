import AccountantDashboard from "@/components/dashboard/accountant/accountant-dashboard"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AccountantDashboardPage() {
  return (
    <DashboardLayout role="accountant">
      <AccountantDashboard />
    </DashboardLayout>
  )
}

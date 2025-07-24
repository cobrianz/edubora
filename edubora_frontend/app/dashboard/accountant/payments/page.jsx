import DashboardLayout from "@/components/layout/dashboard-layout"
import AccountantPaymentsPage from "@/components/pages/accountant/accountant-payments-page"

export default function AccountantPaymentsPageRoute() {
  return (
    <DashboardLayout role="accountant">
      <AccountantPaymentsPage />
    </DashboardLayout>
  )
}

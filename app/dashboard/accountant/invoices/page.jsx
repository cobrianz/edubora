import AccountantInvoicesPage from "@/components/pages/accountant/accountant-invoices-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AccountantInvoicesPageRoute() {
  return (
    <DashboardLayout role="accountant">
      <AccountantInvoicesPage />
    </DashboardLayout>
  )
}

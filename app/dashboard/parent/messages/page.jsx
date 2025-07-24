import ParentMessagesPage from "@/components/pages/parent/parent-messages-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function ParentMessagesPageRoute() {
  return (
    <DashboardLayout role="parent">
      <ParentMessagesPage />
    </DashboardLayout>
  )
}

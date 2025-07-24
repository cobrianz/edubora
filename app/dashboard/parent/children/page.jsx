import DashboardLayout from "@/components/layout/dashboard-layout"
import ParentChildrenPage from "@/components/pages/parent/parent-children-page"

export default function ParentChildrenPageRoute() {
  return (
    <DashboardLayout role="parent">
      <ParentChildrenPage />
    </DashboardLayout>
  )
}

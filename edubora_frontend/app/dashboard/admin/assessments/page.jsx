import AssessmentsPage from "@/components/pages/admin/assessments-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AdminAssessmentsPage() {
  return (
    <DashboardLayout role="admin">
      <AssessmentsPage />
    </DashboardLayout>
  )
}

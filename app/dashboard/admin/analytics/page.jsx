import DashboardLayout from "@/components/layout/dashboard-layout"
import AnalyticsPage from "@/components/pages/admin/analytics-page"

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout requiredRole="admin">
      <AnalyticsPage />
    </DashboardLayout>
  )
}

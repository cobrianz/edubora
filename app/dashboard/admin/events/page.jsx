import { Suspense } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import EventsPage from "@/components/pages/admin/events-page"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function AdminEventsPage() {
  return (
    <DashboardLayout requiredRole="admin">
      <Suspense fallback={<LoadingSpinner />}>
        <EventsPage />
      </Suspense>
    </DashboardLayout>
  )
}

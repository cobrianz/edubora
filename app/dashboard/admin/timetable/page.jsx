import TimetablePage from "@/components/pages/admin/timetable-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function AdminTimetablePage() {
  return (
    <DashboardLayout role="admin">
      <TimetablePage />
    </DashboardLayout>
  )
}

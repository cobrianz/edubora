import StudentTimetablePage from "@/components/pages/student/student-timetable-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function StudentTimetablePageRoute() {
  return (
    <DashboardLayout role="student">
      <StudentTimetablePage />
    </DashboardLayout>
  )
}

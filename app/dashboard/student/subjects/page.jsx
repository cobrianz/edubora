import DashboardLayout from "@/components/layout/dashboard-layout"
import StudentSubjectsPage from "@/components/pages/student/student-subjects-page"

export default function StudentSubjectsPageRoute() {
  return (
    <DashboardLayout role="student">
      <StudentSubjectsPage />
    </DashboardLayout>
  )
}

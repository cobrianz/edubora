import DashboardLayout from "@/components/layout/dashboard-layout"
import StudentLessonsPage from "@/components/pages/student/student-lessons-page"

export default function StudentLessonsPageRoute() {
  return (
    <DashboardLayout role="student">
      <StudentLessonsPage />
    </DashboardLayout>
  )
}

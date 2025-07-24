import DashboardLayout from "@/components/layout/dashboard-layout"
import TeacherLessonsPage from "@/components/pages/teacher/teacher-lessons-page"

export default function TeacherLessonsPageRoute() {
  return (
    <DashboardLayout role="teacher">
      <TeacherLessonsPage />
    </DashboardLayout>
  )
}

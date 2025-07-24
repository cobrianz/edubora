import DashboardLayout from "@/components/layout/dashboard-layout"
import TeacherAssessmentsPage from "@/components/pages/teacher/teacher-assessments-page"

export default function TeacherAssessmentsPageRoute() {
  return (
    <DashboardLayout role="teacher">
      <TeacherAssessmentsPage />
    </DashboardLayout>
  )
}

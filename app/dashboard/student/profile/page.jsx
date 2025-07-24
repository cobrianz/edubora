import StudentProfilePage from "@/components/pages/student/student-profile-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function StudentProfilePageRoute() {
  return (
    <DashboardLayout role="student">
      <StudentProfilePage />
    </DashboardLayout>
  )
}

import LibrarianIssuePage from "@/components/pages/librarian/librarian-issue-page"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function LibrarianIssuePageRoute() {
  return (
    <DashboardLayout role="librarian">
      <LibrarianIssuePage />
    </DashboardLayout>
  )
}

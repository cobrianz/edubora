import DashboardLayout from "@/components/layout/dashboard-layout"
import LibrarianBooksPage from "@/components/pages/librarian/librarian-books-page"

export default function LibrarianBooksPageRoute() {
  return (
    <DashboardLayout role="librarian">
      <LibrarianBooksPage />
    </DashboardLayout>
  )
}

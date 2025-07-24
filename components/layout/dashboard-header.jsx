"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
  LogOut,
  Calendar,
  FileText,
  BookOpen,
  Bus,
  Award,
  Heart,
  MessageSquare,
  BarChart3,
  CalendarDays,
  Trophy,
  CalendarCheck,
  User,
  Library,
  DollarSign,
  Video,
  BookCheck,
} from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { useToast } from "@/hooks/use-toast"

export default function DashboardHeader({ role }) {
  const { toast } = useToast()

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    // In a real application, you would clear authentication tokens/session here
    // and redirect to the login page.
    // For this example, we'll just simulate it.
    setTimeout(() => {
      window.location.href = "/auth/login"
    }, 500)
  }

  const navItems = {
    admin: [
      { href: "/dashboard/admin", icon: Home, label: "Dashboard" },
      { href: "/dashboard/admin/students", icon: Users2, label: "Students" },
      { href: "/dashboard/admin/teachers", icon: Users2, label: "Teachers" },
      { href: "/dashboard/admin/parents", icon: Users2, label: "Parents" },
      { href: "/dashboard/admin/academic", icon: Package, label: "Academic" },
      { href: "/dashboard/admin/assessments", icon: LineChart, label: "Assessments" },
      { href: "/dashboard/admin/finance", icon: ShoppingCart, label: "Finance" },
      { href: "/dashboard/admin/timetable", icon: Calendar, label: "Timetable" },
      { href: "/dashboard/admin/reports", icon: FileText, label: "Reports" },
      { href: "/dashboard/admin/library", icon: BookOpen, label: "Library" },
      { href: "/dashboard/admin/transport", icon: Bus, label: "Transport" },
      { href: "/dashboard/admin/cocurricular", icon: Award, label: "Co-curricular" },
      { href: "/dashboard/admin/welfare", icon: Heart, label: "Welfare" },
      { href: "/dashboard/admin/messages", icon: MessageSquare, label: "Messages" },
      { href: "/dashboard/admin/analytics", icon: BarChart3, label: "Analytics" },
      { href: "/dashboard/admin/events", icon: CalendarDays, label: "Events" },
      { href: "/dashboard/admin/settings", icon: Settings, label: "Settings" },
    ],
    teacher: [
      { href: "/dashboard/teacher", icon: Home, label: "Dashboard" },
      { href: "/dashboard/teacher/classes", icon: Users2, label: "My Classes" },
      { href: "/dashboard/teacher/students", icon: Users2, label: "My Students" },
      { href: "/dashboard/teacher/lessons", icon: BookOpen, label: "Lessons" },
      { href: "/dashboard/teacher/assignments", icon: FileText, label: "Assignments" },
      { href: "/dashboard/teacher/assessments", icon: LineChart, label: "Assessments" },
      { href: "/dashboard/teacher/grades", icon: Trophy, label: "Grades" },
      { href: "/dashboard/teacher/attendance", icon: CalendarCheck, label: "Attendance" },
      { href: "/dashboard/teacher/timetable", icon: Calendar, label: "Timetable" },
      { href: "/dashboard/teacher/messages", icon: MessageSquare, label: "Messages" },
      { href: "/dashboard/teacher/reports", icon: BarChart3, label: "Reports" },
      { href: "/dashboard/teacher/profile", icon: User, label: "Profile" },
      { href: "/dashboard/teacher/settings", icon: Settings, label: "Settings" },
    ],
    student: [
      { href: "/dashboard/student", icon: Home, label: "Dashboard" },
      { href: "/dashboard/student/subjects", icon: BookOpen, label: "My Subjects" },
      { href: "/dashboard/student/assignments", icon: FileText, label: "Assignments" },
      { href: "/dashboard/student/grades", icon: Trophy, label: "Grades" },
      { href: "/dashboard/student/attendance", icon: CalendarCheck, label: "Attendance" },
      { href: "/dashboard/student/timetable", icon: Calendar, label: "Timetable" },
      { href: "/dashboard/student/library", icon: Library, label: "Library" },
      { href: "/dashboard/student/fees", icon: DollarSign, label: "Fees" },
      { href: "/dashboard/student/messages", icon: MessageSquare, label: "Messages" },
      { href: "/dashboard/student/reports", icon: BarChart3, label: "Reports" },
      { href: "/dashboard/student/profile", icon: User, label: "Profile" },
      { href: "/dashboard/student/lessons", icon: Video, label: "Lessons" }, // Added Lessons
    ],
    parent: [
      { href: "/dashboard/parent", icon: Home, label: "Dashboard" },
      { href: "/dashboard/parent/children", icon: Users2, label: "My Children" },
      { href: "/dashboard/parent/fees", icon: DollarSign, label: "Fees" },
      { href: "/dashboard/parent/messages", icon: MessageSquare, label: "Messages" },
      { href: "/dashboard/parent/reports", icon: BarChart3, label: "Reports" },
      { href: "/dashboard/parent/profile", icon: User, label: "Profile" },
    ],
    librarian: [
      { href: "/dashboard/librarian", icon: Home, label: "Dashboard" },
      { href: "/dashboard/librarian/books", icon: BookOpen, label: "Books" },
      { href: "/dashboard/librarian/issue", icon: BookCheck, label: "Issue/Return" },
      { href: "/dashboard/librarian/reports", icon: BarChart3, label: "Reports" },
      { href: "/dashboard/librarian/settings", icon: Settings, label: "Settings" },
    ],
    accountant: [
      { href: "/dashboard/accountant", icon: Home, label: "Dashboard" },
      { href: "/dashboard/accountant/payments", icon: DollarSign, label: "Payments" },
      { href: "/dashboard/accountant/invoices", icon: FileText, label: "Invoices" },
      { href: "/dashboard/accountant/reports", icon: BarChart3, label: "Reports" },
      { href: "/dashboard/accountant/settings", icon: Settings, label: "Settings" },
    ],
  }

  const currentNavItems = navItems[role] || []

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden bg-transparent">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {currentNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">{/* Search functionality can go here if needed */}</div>
      <ModeToggle />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="transition-all duration-300 hover:scale-105"
      >
        <LogOut className="h-5 w-5" />
        <span className="sr-only">Logout</span>
      </Button>
    </header>
  )
}

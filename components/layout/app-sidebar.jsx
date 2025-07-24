"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  Bus,
  ClipboardList,
  CreditCard,
  GraduationCap,
  Heart,
  Home,
  Library,
  MessageSquare,
  Settings,
  Trophy,
  Users,
  FileText,
  User,
  LogOut,
  DollarSign,
  UserCheck,
  Clock,
  ChevronUp,
  ChevronRight,
  Calendar,
  Receipt,
  TrendingUp,
  BookOpenCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Admin navigation items
const adminNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Students",
    url: "/dashboard/admin/students",
    icon: Users,
  },
  {
    title: "Teachers",
    url: "/dashboard/admin/teachers",
    icon: UserCheck,
  },
  {
    title: "Parents",
    url: "/dashboard/admin/parents",
    icon: Users,
  },
  {
    title: "Academic",
    url: "/dashboard/admin/academic",
    icon: GraduationCap,
  },
  {
    title: "Assessments",
    url: "/dashboard/admin/assessments",
    icon: ClipboardList,
  },
  {
    title: "Finance",
    url: "/dashboard/admin/finance",
    icon: DollarSign,
  },
  {
    title: "Analytics",
    url: "/dashboard/admin/analytics",
    icon: TrendingUp,
  },
  {
    title: "Timetable",
    url: "/dashboard/admin/timetable",
    icon: Calendar,
  },
  {
    title: "Reports",
    url: "/dashboard/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Library",
    url: "/dashboard/admin/library",
    icon: BookOpen,
  },
  {
    title: "Transport",
    url: "/dashboard/admin/transport",
    icon: Bus,
  },
  {
    title: "Co-curricular",
    url: "/dashboard/admin/cocurricular",
    icon: Trophy,
  },
  {
    title: "Welfare",
    url: "/dashboard/admin/welfare",
    icon: Heart,
  },
  {
    title: "Messages",
    url: "/dashboard/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
]

// Teacher navigation items
const teacherNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/teacher",
    icon: Home,
  },
  {
    title: "My Classes",
    url: "/dashboard/teacher/classes",
    icon: Users,
  },
  {
    title: "Students",
    url: "/dashboard/teacher/students",
    icon: GraduationCap,
  },
  {
    title: "Lessons",
    url: "/dashboard/teacher/lessons",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    url: "/dashboard/teacher/assignments",
    icon: ClipboardList,
  },
  {
    title: "Grades",
    url: "/dashboard/teacher/grades",
    icon: BarChart3,
  },
  {
    title: "Assessments",
    url: "/dashboard/teacher/assessments",
    icon: FileText,
  },
  {
    title: "Attendance",
    url: "/dashboard/teacher/attendance",
    icon: Calendar,
  },
  {
    title: "Messages",
    url: "/dashboard/teacher/messages",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    url: "/dashboard/teacher/reports",
    icon: BarChart3,
  },
  {
    title: "Timetable",
    url: "/dashboard/teacher/timetable",
    icon: Clock,
  },
  {
    title: "Profile",
    url: "/dashboard/teacher/profile",
    icon: User,
  },
]

// Student navigation items
const studentNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/student",
    icon: Home,
  },
  {
    title: "Subjects",
    url: "/dashboard/student/subjects",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    url: "/dashboard/student/assignments",
    icon: ClipboardList,
  },
  {
    title: "Grades",
    url: "/dashboard/student/grades",
    icon: BarChart3,
  },
  {
    title: "Attendance",
    url: "/dashboard/student/attendance",
    icon: Calendar,
  },
  {
    title: "Timetable",
    url: "/dashboard/student/timetable",
    icon: Clock,
  },
  {
    title: "Library",
    url: "/dashboard/student/library",
    icon: Library,
  },
  {
    title: "Fees",
    url: "/dashboard/student/fees",
    icon: CreditCard,
  },
  {
    title: "Messages",
    url: "/dashboard/student/messages",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    url: "/dashboard/student/reports",
    icon: FileText,
  },
  {
    title: "Profile",
    url: "/dashboard/student/profile",
    icon: User,
  },
]

// Parent navigation items
const parentNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/parent",
    icon: Home,
  },
  {
    title: "My Children",
    url: "/dashboard/parent/children",
    icon: Users,
  },
  {
    title: "Fees",
    url: "/dashboard/parent/fees",
    icon: CreditCard,
  },
  {
    title: "Messages",
    url: "/dashboard/parent/messages",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    url: "/dashboard/parent/reports",
    icon: FileText,
  },
  {
    title: "Profile",
    url: "/dashboard/parent/profile",
    icon: User,
  },
]

// Librarian navigation items
const librarianNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/librarian",
    icon: Home,
  },
  {
    title: "Books",
    url: "/dashboard/librarian/books",
    icon: BookOpen,
  },
  {
    title: "Issue Books",
    url: "/dashboard/librarian/issue",
    icon: BookOpenCheck,
  },
  {
    title: "Returns",
    url: "/dashboard/librarian/returns",
    icon: Receipt,
  },
  {
    title: "Messages",
    url: "/dashboard/librarian/messages",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    url: "/dashboard/librarian/reports",
    icon: BarChart3,
  },
  {
    title: "Profile",
    url: "/dashboard/librarian/profile",
    icon: User,
  },
]

// Accountant navigation items
const accountantNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/accountant",
    icon: Home,
  },
  {
    title: "Payments",
    url: "/dashboard/accountant/payments",
    icon: CreditCard,
  },
  {
    title: "Invoices",
    url: "/dashboard/accountant/invoices",
    icon: Receipt,
  },
  {
    title: "Messages",
    url: "/dashboard/accountant/messages",
    icon: MessageSquare,
  },
  {
    title: "Reports",
    url: "/dashboard/accountant/reports",
    icon: BarChart3,
  },
  {
    title: "Analytics",
    url: "/dashboard/accountant/analytics",
    icon: TrendingUp,
  },
  {
    title: "Profile",
    url: "/dashboard/accountant/profile",
    icon: User,
  },
]

export function AppSidebar({ role, user }) {
  const pathname = usePathname()
  const router = useRouter()

  // Resolve the user role – prop → localStorage → default.
  const resolvedRole = role ?? (typeof window !== "undefined" ? localStorage.getItem("userRole") || "admin" : "admin")

  // Get navigation items based on user role
  const getNavItems = () => {
    switch (resolvedRole) {
      case "admin":
        return adminNavItems
      case "teacher":
        return teacherNavItems
      case "student":
        return studentNavItems
      case "parent":
        return parentNavItems
      case "librarian":
        return librarianNavItems
      case "accountant":
        return accountantNavItems
      default:
        return adminNavItems
    }
  }

  const navItems = getNavItems()

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/auth/login")
  }

  const getUserInfo = () => {
    if (user) {
      return {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "/placeholder.svg?height=32&width=32",
      }
    }

    switch (resolvedRole) {
      case "admin":
        return {
          name: "Dr. Jane Wanjiku",
          email: "admin@edubora.school",
          role: "School Administrator",
          avatar: "/placeholder.svg?height=32&width=32",
        }
      case "teacher":
        return {
          name: "Mr. John Kamau",
          email: "j.kamau@edubora.school",
          role: "Mathematics Teacher",
          avatar: "/placeholder.svg?height=32&width=32",
        }
      case "student":
        return {
          name: "Sarah Mwangi",
          email: "sarah.mwangi@student.edubora.school",
          role: "Grade 7A Student",
          avatar: "/placeholder.svg?height=32&width=32",
        }
      case "parent":
        return {
          name: "John Mwangi",
          email: "john.mwangi@parent.edubora.school",
          role: "Parent/Guardian",
          avatar: "/placeholder.svg?height=32&width=32",
        }
      case "librarian":
        return {
          name: "Ms. Grace Njeri",
          email: "g.njeri@edubora.school",
          role: "School Librarian",
          avatar: "/placeholder.svg?height=32&width=32",
        }
      case "accountant":
        return {
          name: "Mr. Peter Ochieng",
          email: "p.ochieng@edubora.school",
          role: "School Accountant",
          avatar: "/placeholder.svg?height=32&width=32",
        }
      default:
        return {
          name: "User",
          email: "user@edubora.school",
          role: "User",
          avatar: "/placeholder.svg?height=32&width=32",
        }
    }
  }

  const userInfo = getUserInfo()
  const initials = userInfo?.name
    ? userInfo.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "U"

  return (
    <Sidebar variant="inset" className="p-4">
      <SidebarHeader className="mb-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="py-3">
              <a href={`/dashboard/${resolvedRole}`}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">EDUBORA</span>
                  <span className="truncate text-xs">School Management</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="space-y-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible asChild defaultOpen={pathname.includes(item.url)}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={`py-2 px-3 rounded-md ${pathname === item.url ? "bg-slate-800 text-white" : ""}`}
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild>
                                  <a
                                    href={subItem.url}
                                    className={`py-2 px-3 rounded-md ${
                                      pathname === subItem.url ? "bg-slate-800 text-white" : ""
                                    }`}
                                  >
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={pathname === item.url}
                      asChild
                      className={`py-2 px-3 rounded-md ${pathname === item.url ? "bg-slate-800 text-white" : ""}`}
                    >
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground py-3"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
                    <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userInfo.name}</span>
                    <span className="truncate text-xs">{userInfo.role}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
                      <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userInfo.name}</span>
                      <span className="truncate text-xs">{userInfo.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href={`/dashboard/${resolvedRole}/profile`}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href={`/dashboard/${resolvedRole}/settings`}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function DashboardLayout({ children, requiredRole }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user")
        const userRole = localStorage.getItem("userRole")

        if (!storedUser && !userRole) {
          router.push("/auth/login")
          return
        }

        const userData = storedUser ? JSON.parse(storedUser) : { role: userRole }

        if (requiredRole && userData.role !== requiredRole) {
          router.push(`/dashboard/${userData.role}`)
          return
        }

        setUser(userData)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, requiredRole])

  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    pathSegments.forEach((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/")
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ")

      breadcrumbs.push({
        href,
        label,
        isLast: index === pathSegments.length - 1,
      })
    })

    return breadcrumbs
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <SidebarProvider>
      <AppSidebar role={user?.role} user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <div key={breadcrumb.href} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {breadcrumb.isLast ? (
                      <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

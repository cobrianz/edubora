"use client"

import { redirect } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  GraduationCap,
  Users,
  BookOpen,
  Calculator,
  Bus,
  UserCheck,
  Settings,
  School,
  ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  // Redirect to login page
  redirect("/auth/login")

  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState(null)

  const userRoles = [
    {
      id: "admin",
      title: "Administrator",
      description: "Full system access and management",
      icon: Shield,
      color: "bg-red-500",
      features: ["User Management", "System Settings", "Reports", "Analytics"],
      loginPath: "/auth/login?role=admin",
    },
    {
      id: "teacher",
      title: "Teacher",
      description: "Classroom and student management",
      icon: GraduationCap,
      color: "bg-blue-500",
      features: ["Class Management", "Grades", "Attendance", "Assignments"],
      loginPath: "/auth/login?role=teacher",
    },
    {
      id: "student",
      title: "Student",
      description: "Access to learning materials and grades",
      icon: Users,
      color: "bg-green-500",
      features: ["Assignments", "Grades", "Timetable", "Library"],
      loginPath: "/auth/login?role=student",
    },
    {
      id: "parent",
      title: "Parent/Guardian",
      description: "Monitor child's academic progress",
      icon: UserCheck,
      color: "bg-purple-500",
      features: ["Child Progress", "Fees", "Communication", "Events"],
      loginPath: "/auth/login?role=parent",
    },
    {
      id: "librarian",
      title: "Librarian",
      description: "Library and resource management",
      icon: BookOpen,
      color: "bg-orange-500",
      features: ["Book Management", "Issue/Return", "Inventory", "Reports"],
      loginPath: "/auth/login?role=librarian",
    },
    {
      id: "accountant",
      title: "Accountant",
      description: "Financial management and reporting",
      icon: Calculator,
      color: "bg-teal-500",
      features: ["Fee Management", "Payments", "Financial Reports", "Invoices"],
      loginPath: "/auth/login?role=accountant",
    },
    {
      id: "driver",
      title: "Driver",
      description: "Transport and route management",
      icon: Bus,
      color: "bg-yellow-500",
      features: ["Route Management", "Student Lists", "Attendance", "Reports"],
      loginPath: "/auth/login?role=driver",
    },
    {
      id: "setup",
      title: "System Setup",
      description: "Initial school configuration",
      icon: Settings,
      color: "bg-gray-500",
      features: ["School Setup", "Initial Configuration", "Admin Creation"],
      loginPath: "/setup",
    },
  ]

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    // Redirect to appropriate login page
    router.push(role.loginPath)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <School className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EduBora School Management</h1>
                <p className="text-gray-600">Comprehensive School Management System</p>
              </div>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              v2.0.0
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to EduBora School Management System</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose your role to access the appropriate dashboard and features. Our comprehensive system supports all
            aspects of school management from administration to student learning.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {userRoles.map((role) => {
            const IconComponent = role.icon
            return (
              <Card
                key={role.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-blue-200"
                onClick={() => handleRoleSelect(role)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${role.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    {role.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full group-hover:bg-blue-600 transition-colors bg-transparent" variant="outline">
                    Access Dashboard
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Overview */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">System Features</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">User Management</h4>
              <p className="text-sm text-gray-600">Comprehensive user roles and permissions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Academic Management</h4>
              <p className="text-sm text-gray-600">Classes, subjects, and curriculum management</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <Calculator className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Financial Management</h4>
              <p className="text-sm text-gray-600">Fee collection and financial reporting</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">Resource Management</h4>
              <p className="text-sm text-gray-600">Library, transport, and facility management</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>&copy; 2024 EduBora School Management System. All rights reserved.</p>
          <p className="mt-2">Designed for modern educational institutions</p>
        </div>
      </div>
    </div>
  )
}

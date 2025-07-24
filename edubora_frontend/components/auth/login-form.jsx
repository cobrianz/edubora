"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, User, Lock, UserCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/ui/loading-spinner"

const userRoles = [
  { value: "admin", label: "Administrator", icon: UserCheck },
  { value: "teacher", label: "Teacher", icon: User },
  { value: "student", label: "Student", icon: User },
  { value: "parent", label: "Parent/Guardian", icon: User },
  { value: "librarian", label: "Librarian", icon: User },
  { value: "accountant", label: "Accountant", icon: User },
]

// Demo credentials for different roles
const demoCredentials = {
  admin: { username: "admin", password: "admin123" },
  teacher: { username: "teacher", password: "teacher123" },
  student: { username: "student", password: "student123" },
  parent: { username: "parent", password: "parent123" },
  librarian: { username: "librarian", password: "librarian123" },
  accountant: { username: "accountant", password: "accountant123" },
}

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Demo authentication logic
      const demo = demoCredentials[formData.role]
      if (demo && formData.username === demo.username && formData.password === demo.password) {
        // Store user session (in real app, use proper auth)
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: formData.username,
            role: formData.role,
            loginTime: new Date().toISOString(),
          }),
        )

        toast({
          title: "Login Successful",
          description: `Welcome back, ${formData.role}!`,
        })

        // Redirect based on role
        router.push(`/dashboard/${formData.role}`)
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (role) => {
    const demo = demoCredentials[role]
    setFormData({
      username: demo.username,
      password: demo.password,
      role: role,
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="role">Select Role</Label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your role" />
            </SelectTrigger>
            <SelectContent>
              {userRoles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  <div className="flex items-center gap-2">
                    <role.icon className="h-4 w-4" />
                    {role.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Demo Access</span>
        </div>
      </div>

      <Button type="button" variant="outline" onClick={() => setShowDemo(!showDemo)} className="w-full">
        {showDemo ? "Hide" : "Show"} Demo Credentials
      </Button>

      {showDemo && (
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-2">
              {userRoles.map((role) => (
                <Button
                  key={role.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDemoLogin(role.value)}
                  className="justify-start text-xs"
                >
                  <role.icon className="mr-2 h-3 w-3" />
                  {role.label}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Click any role to auto-fill credentials</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

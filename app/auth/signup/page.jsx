"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

const SchoolSystemSetupForm = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const [formData, setFormData] = useState({
    fullName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
    roleId: "1",
    phoneNumber: "",
    schoolName: "",
    schoolType: "",
    schoolAddress: "",
    schoolCity: "",
    schoolState: "",
    schoolPostalCode: "",
    schoolCountry: "",
    schoolPhone: "",
    schoolEmail: "",
    schoolWebsite: "",
    schoolSlug: "",
    contactPersonName: "",
    contactPersonEmail: "",
    academicYearStartMonth: "",
    timezone: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fillDemoData = () => {
    setFormData({
      fullName: "Jane Elizabeth Doe",
      adminEmail: "jane.doe@school.com",
      password: "SecurePass123!",
      confirmPassword: "SecurePass123!",
      roleId: "1",
      phoneNumber: "+12125550100",
      schoolName: "Global Academy",
      schoolType: "K-12",
      schoolAddress: "456 Education Boulevard",
      schoolCity: "Metropolis",
      schoolState: "New York",
      schoolPostalCode: "10001",
      schoolCountry: "United States",
      schoolPhone: "+12125550101",
      schoolEmail: "info@globalacademy.edu",
      schoolWebsite: "https://www.globalacademy.edu",
      schoolSlug: "global-academy",
      contactPersonName: "John Smith",
      contactPersonEmail: "john.smith@globalacademy.edu",
      academicYearStartMonth: "September",
      timezone: "America/New_York",
    })
    toast({
      title: "Demo Data Filled!",
      description: "All form fields have been pre-filled with sample data for testing the school system.",
      className: "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground",
    })
    setErrors({})
  }

  const validateStep = () => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = "Full name is required"
      else if (formData.fullName.length < 3) newErrors.fullName = "Full name must be at least 3 characters"
      if (!formData.adminEmail) newErrors.adminEmail = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) newErrors.adminEmail = "Invalid email format"
      if (!formData.password) newErrors.password = "Password is required"
      else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
        newErrors.password =
          "Password must be 8+ characters, include uppercase, lowercase, number, and special character"
      }
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
      if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required"
      else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Invalid phone number format"
      if (!formData.roleId) newErrors.roleId = "Role is required"
    } else if (currentStep === 2) {
      if (!formData.schoolName) newErrors.schoolName = "School name is required"
      else if (formData.schoolName.length > 255) newErrors.schoolName = "School name cannot exceed 255 characters"
      if (!formData.schoolType) newErrors.schoolType = "School type is required"
      if (!formData.schoolAddress) newErrors.schoolAddress = "Address is required"
      else if (formData.schoolAddress.length > 255) newErrors.schoolAddress = "Address cannot exceed 255 characters"
      if (!formData.schoolCity) newErrors.schoolCity = "City is required"
      else if (formData.schoolCity.length > 100) newErrors.schoolCity = "City cannot exceed 100 characters"
      if (!formData.schoolState) newErrors.schoolState = "State/Province is required"
      else if (formData.schoolState.length > 100) newErrors.schoolState = "State cannot exceed 100 characters"
      if (!formData.schoolPostalCode) newErrors.schoolPostalCode = "Postal code is required"
      else if (formData.schoolPostalCode.length > 20)
        newErrors.schoolPostalCode = "Postal code cannot exceed 20 characters"
      if (!formData.schoolCountry) newErrors.schoolCountry = "Country is required"
      else if (formData.schoolCountry.length > 100) newErrors.schoolCountry = "Country cannot exceed 100 characters"
      if (!formData.schoolPhone) newErrors.schoolPhone = "Phone number is required"
      else if (!/^\+?[\d\s-]{10,}$/.test(formData.schoolPhone)) newErrors.schoolPhone = "Invalid phone number format"
      if (!formData.schoolEmail) newErrors.schoolEmail = "School email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.schoolEmail)) newErrors.schoolEmail = "Invalid email format"
      if (formData.schoolWebsite && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(formData.schoolWebsite)) {
        newErrors.schoolWebsite = "Invalid URL format (must start with http:// or https://)"
      }
      if (!formData.schoolSlug) newErrors.schoolSlug = "School slug is required"
      else if (!/^[a-z0-9-]{3,}$/.test(formData.schoolSlug)) {
        newErrors.schoolSlug = "Slug must be 3+ characters, lowercase letters, numbers, or hyphens only"
      }
    } else if (currentStep === 3) {
      if (!formData.contactPersonName) newErrors.contactPersonName = "Contact person name is required"
      else if (formData.contactPersonName.length > 255)
        newErrors.contactPersonName = "Name cannot exceed 255 characters"
      if (!formData.contactPersonEmail) newErrors.contactPersonEmail = "Contact person email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactPersonEmail)) {
        newErrors.contactPersonEmail = "Invalid email format"
      }
      if (!formData.academicYearStartMonth) newErrors.academicYearStartMonth = "Academic year start month is required"
      if (!formData.timezone) newErrors.timezone = "Timezone is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    if (id === "schoolName") {
      setFormData((prev) => ({
        ...prev,
        schoolSlug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .slice(0, 255),
      }))
    }

    setErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const handleSelectChange = (value, id) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => ({ ...prev, [id]: "" }))
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1)
    } else {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form to proceed with the setup.",
        variant: "destructive",
        className: "bg-destructive text-destructive-foreground",
      })
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep()) {
      setIsSubmitting(true)
      try {
        const submissionData = {
          school_tenants: {
            name: formData.schoolName,
            slug: formData.schoolSlug,
            type: formData.schoolType,
            address: formData.schoolAddress,
            city: formData.schoolCity,
            state: formData.schoolState,
            postal_code: formData.schoolPostalCode,
            country: formData.schoolCountry,
            phone: formData.schoolPhone,
            email: formData.schoolEmail,
            website: formData.schoolWebsite,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          users: {
            full_name: formData.fullName,
            email: formData.adminEmail,
            password_hash: "hashed_password",
            role_id: Number.parseInt(formData.roleId),
            is_active: true,
            phone_number: formData.phoneNumber,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          academic_years: {
            year_name: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
            start_date: new Date(`${formData.academicYearStartMonth} 1, ${new Date().getFullYear()}`),
            end_date: new Date(`${formData.academicYearStartMonth} 1, ${new Date().getFullYear() + 1}`),
            is_current: true,
          },
          settings: {
            contact_person_name: formData.contactPersonName,
            contact_person_email: formData.contactPersonEmail,
            timezone: formData.timezone,
          },
        }

        console.log("Submitting Form Data to Backend:", submissionData)

        toast({
          title: "School System Setup Successful!",
          description: "Your school has been successfully registered. Redirecting to login...",
          className: "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground",
          duration: 5000,
        })

        setTimeout(() => {
          router.push("/auth/login")
        }, 3000)
      } catch (error) {
        toast({
          title: "Submission Error",
          description: "An error occurred while setting up your school. Please try again or contact support.",
          variant: "destructive",
          className: "bg-destructive text-destructive-foreground",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CardContent className="grid gap-6 p-8">
            <div className="grid gap-2 col-span-full">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Administrator Details</h3>
              <p className="text-sm text-muted-foreground">
                Set up the primary administrator account for managing your school system.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="fullName" className="text-foreground">
                    Full Name
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Enter the full name of the primary administrator.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter full name (e.g., John Doe)"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={
                    errors.fullName
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.fullName}
                  aria-describedby="fullName-error"
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-sm text-destructive">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="adminEmail" className="text-foreground">
                    Email
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>This email will be used for login and notifications.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="adminEmail"
                  type="email"
                  placeholder="admin@school.com"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  className={
                    errors.adminEmail
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.adminEmail}
                  aria-describedby="adminEmail-error"
                />
                {errors.adminEmail && (
                  <p id="adminEmail-error" className="text-sm text-destructive">
                    {errors.adminEmail}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="phoneNumber" className="text-foreground">
                    Phone Number
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Provide a contact number for the administrator.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1234567890"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={
                    errors.phoneNumber
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.phoneNumber}
                  aria-describedby="phoneNumber-error"
                />
                {errors.phoneNumber && (
                  <p id="phoneNumber-error" className="text-sm text-destructive">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Password must be strong and secure.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className={
                    errors.password
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                />
                {errors.password && (
                  <p id="password-error" className="text-sm text-destructive">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirm Password
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Re-enter the password to confirm.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={
                    errors.confirmPassword
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby="confirmPassword-error"
                />
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="roleId" className="text-foreground">
                    Role
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Select the role for this user (default is Admin).</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={formData.roleId} onValueChange={(val) => handleSelectChange(val, "roleId")}>
                  <SelectTrigger
                    id="roleId"
                    className={
                      errors.roleId
                        ? "border-destructive"
                        : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                    }
                    aria-describedby="roleId-error"
                  >
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Administrator</SelectItem>
                  </SelectContent>
                </Select>
                {errors.roleId && (
                  <p id="roleId-error" className="text-sm text-destructive">
                    {errors.roleId}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        )
      case 2:
        return (
          <CardContent className="grid gap-6 p-8">
            <div className="grid gap-2 col-span-full">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">School Details</h3>
              <p className="text-sm text-muted-foreground">
                Provide detailed information about your school for the system.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolName" className="text-foreground">
                    School Name
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Enter the official name of your school.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolName"
                  type="text"
                  placeholder="Enter school name (e.g., Global Academy)"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className={
                    errors.schoolName
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolName}
                  aria-describedby="schoolName-error"
                />
                {errors.schoolName && (
                  <p id="schoolName-error" className="text-sm text-destructive">
                    {errors.schoolName}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolType" className="text-foreground">
                    School Type
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Select the type of educational institution.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={formData.schoolType} onValueChange={(val) => handleSelectChange(val, "schoolType")}>
                  <SelectTrigger
                    id="schoolType"
                    className={
                      errors.schoolType
                        ? "border-destructive"
                        : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                    }
                    aria-describedby="schoolType-error"
                  >
                    <SelectValue placeholder="Select school type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="K-12">K-12 School</SelectItem>
                    <SelectItem value="Primary">Primary School</SelectItem>
                    <SelectItem value="Secondary">Secondary School</SelectItem>
                    <SelectItem value="Higher Education">Higher Education</SelectItem>
                    <SelectItem value="Vocational">Vocational School</SelectItem>
                    <SelectItem value="Special Education">Special Education</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.schoolType && (
                  <p id="schoolType-error" className="text-sm text-destructive">
                    {errors.schoolType}
                  </p>
                )}
              </div>
              <div className="grid gap-2 col-span-full">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolAddress" className="text-foreground">
                    Address
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Enter the physical address of the school.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolAddress"
                  type="text"
                  placeholder="Enter address (e.g., 123 Education Lane)"
                  value={formData.schoolAddress}
                  onChange={handleChange}
                  className={
                    errors.schoolAddress
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolAddress}
                  aria-describedby="schoolAddress-error"
                />
                {errors.schoolAddress && (
                  <p id="schoolAddress-error" className="text-sm text-destructive">
                    {errors.schoolAddress}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolCity" className="text-foreground">
                    City
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Enter the city where the school is located.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolCity"
                  type="text"
                  placeholder="Enter city (e.g., Metropolis)"
                  value={formData.schoolCity}
                  onChange={handleChange}
                  className={
                    errors.schoolCity
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolCity}
                  aria-describedby="schoolCity-error"
                />
                {errors.schoolCity && (
                  <p id="schoolCity-error" className="text-sm text-destructive">
                    {errors.schoolCity}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolState" className="text-foreground">
                    State/Province
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Enter the state or province.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolState"
                  type="text"
                  placeholder="Enter state/province (e.g., New York)"
                  value={formData.schoolState}
                  onChange={handleChange}
                  className={
                    errors.schoolState
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolState}
                  aria-describedby="schoolState-error"
                />
                {errors.schoolState && (
                  <p id="schoolState-error" className="text-sm text-destructive">
                    {errors.schoolState}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolPostalCode" className="text-foreground">
                    Postal Code
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Enter the postal or ZIP code.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolPostalCode"
                  type="text"
                  placeholder="Enter postal code (e.g., 10001)"
                  value={formData.schoolPostalCode}
                  onChange={handleChange}
                  className={
                    errors.schoolPostalCode
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolPostalCode}
                  aria-describedby="schoolPostalCode-error"
                />
                {errors.schoolPostalCode && (
                  <p id="schoolPostalCode-error" className="text-sm text-destructive">
                    {errors.schoolPostalCode}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolCountry" className="text-foreground">
                    Country
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Enter the country of the school.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolCountry"
                  type="text"
                  placeholder="Enter country (e.g., United States)"
                  value={formData.schoolCountry}
                  onChange={handleChange}
                  className={
                    errors.schoolCountry
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolCountry}
                  aria-describedby="schoolCountry-error"
                />
                {errors.schoolCountry && (
                  <p id="schoolCountry-error" className="text-sm text-destructive">
                    {errors.schoolCountry}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolPhone" className="text-foreground">
                    School Phone Number
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Main contact number for the school.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolPhone"
                  type="tel"
                  placeholder="+1234567890"
                  value={formData.schoolPhone}
                  onChange={handleChange}
                  className={
                    errors.schoolPhone
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolPhone}
                  aria-describedby="schoolPhone-error"
                />
                {errors.schoolPhone && (
                  <p id="schoolPhone-error" className="text-sm text-destructive">
                    {errors.schoolPhone}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolEmail" className="text-foreground">
                    School Email
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Official email address for school communications.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolEmail"
                  type="email"
                  placeholder="info@school.com"
                  value={formData.schoolEmail}
                  onChange={handleChange}
                  className={
                    errors.schoolEmail
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolEmail}
                  aria-describedby="schoolEmail-error"
                />
                {errors.schoolEmail && (
                  <p id="schoolEmail-error" className="text-sm text-destructive">
                    {errors.schoolEmail}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolWebsite" className="text-foreground">
                    School Website (Optional)
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Enter the school’s website URL, if available.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolWebsite"
                  type="url"
                  placeholder="https://www.school.com"
                  value={formData.schoolWebsite}
                  onChange={handleChange}
                  className={
                    errors.schoolWebsite
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolWebsite}
                  aria-describedby="schoolWebsite-error"
                />
                {errors.schoolWebsite && (
                  <p id="schoolWebsite-error" className="text-sm text-destructive">
                    {errors.schoolWebsite}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="schoolSlug" className="text-foreground">
                    School Slug
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Unique identifier for your school in URLs (auto-generated from school name).
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="schoolSlug"
                  type="text"
                  placeholder="school-slug"
                  value={formData.schoolSlug}
                  onChange={handleChange}
                  className={
                    errors.schoolSlug
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.schoolSlug}
                  aria-describedby="schoolSlug-error"
                />
                {errors.schoolSlug && (
                  <p id="schoolSlug-error" className="text-sm text-destructive">
                    {errors.schoolSlug}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        )
      case 3:
        return (
          <CardContent className="grid gap-6 p-8">
            <div className="grid gap-2 col-span-full">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Advanced School Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure additional settings for your school in the system.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-full">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="contactPersonName" className="text-foreground">
                    Contact Person Name
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Name of the primary contact person for the school.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="contactPersonName"
                  type="text"
                  placeholder="Enter contact person name (e.g., John Smith)"
                  value={formData.contactPersonName}
                  onChange={handleChange}
                  className={
                    errors.contactPersonName
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.contactPersonName}
                  aria-describedby="contactPersonName-error"
                />
                {errors.contactPersonName && (
                  <p id="contactPersonName-error" className="text-sm text-destructive">
                    {errors.contactPersonName}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="contactPersonEmail" className="text-foreground">
                    Contact Person Email
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Email address of the primary contact person.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  id="contactPersonEmail"
                  type="email"
                  placeholder="contact@school.com"
                  value={formData.contactPersonEmail}
                  onChange={handleChange}
                  className={
                    errors.contactPersonEmail
                      ? "border-destructive focus:ring-destructive"
                      : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                  }
                  aria-invalid={!!errors.contactPersonEmail}
                  aria-describedby="contactPersonEmail-error"
                />
                {errors.contactPersonEmail && (
                  <p id="contactPersonEmail-error" className="text-sm text-destructive">
                    {errors.contactPersonEmail}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="academicYearStartMonth" className="text-foreground">
                    Academic Year Start Month
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Month when the academic year typically begins.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select
                  value={formData.academicYearStartMonth}
                  onValueChange={(val) => handleSelectChange(val, "academicYearStartMonth")}
                >
                  <SelectTrigger
                    id="academicYearStartMonth"
                    className={
                      errors.academicYearStartMonth
                        ? "border-destructive"
                        : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                    }
                    aria-describedby="academicYearStartMonth-error"
                  >
                    <SelectValue placeholder="Select start month" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.academicYearStartMonth && (
                  <p id="academicYearStartMonth-error" className="text-sm text-destructive">
                    {errors.academicYearStartMonth}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="timezone" className="text-foreground">
                    Timezone
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Select the timezone for your school’s operations.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={formData.timezone} onValueChange={(val) => handleSelectChange(val, "timezone")}>
                  <SelectTrigger
                    id="timezone"
                    className={
                      errors.timezone
                        ? "border-destructive"
                        : "border-input focus:ring-slate-600 dark:focus:ring-slate-400"
                    }
                    aria-describedby="timezone-error"
                  >
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "America/New_York",
                      "America/Chicago",
                      "America/Denver",
                      "America/Los_Angeles",
                      "Europe/London",
                      "Europe/Paris",
                      "Asia/Tokyo",
                      "Australia/Sydney",
                      "Africa/Nairobi",
                    ].map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timezone && (
                  <p id="timezone-error" className="text-sm text-destructive">
                    {errors.timezone}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        )
      case 4:
        return (
          <CardContent className="grid gap-6 p-8">
            <div className="grid gap-2 col-span-full">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Review & Confirm</h3>
              <p className="text-sm text-muted-foreground">
                Carefully review all details before finalizing your school setup.
              </p>
            </div>
            <div className="grid gap-6 col-span-full">
              <div className="grid gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <Label className="font-semibold text-lg text-foreground">Administrator Information</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-foreground">
                    <span className="font-medium">Full Name:</span> {formData.fullName}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Email:</span> {formData.adminEmail}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Phone Number:</span> {formData.phoneNumber}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Role:</span> Administrator
                  </p>
                </div>
              </div>
              <div className="grid gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <Label className="font-semibold text-lg text-foreground">School Information</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-foreground">
                    <span className="font-medium">School Name:</span> {formData.schoolName}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">School Type:</span> {formData.schoolType}
                  </p>
                  <p className="text-foreground col-span-2">
                    <span className="font-medium">Address:</span> {formData.schoolAddress}, {formData.schoolCity},{" "}
                    {formData.schoolState} {formData.schoolPostalCode}, {formData.schoolCountry}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Phone:</span> {formData.schoolPhone}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Email:</span> {formData.schoolEmail}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Website:</span> {formData.schoolWebsite || "N/A"}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">School Slug:</span>{" "}
                    <span className="font-mono bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                      {formData.schoolSlug}
                    </span>
                  </p>
                </div>
              </div>
              <div className="grid gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <Label className="font-semibold text-lg text-foreground">Advanced Settings</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-foreground">
                    <span className="font-medium">Contact Person Name:</span> {formData.contactPersonName}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Contact Person Email:</span> {formData.contactPersonEmail}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Academic Year Start:</span> {formData.academicYearStartMonth}
                  </p>
                  <p className="text-foreground">
                    <span className="font-medium">Timezone:</span> {formData.timezone}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 col-span-full">
              By submitting, you agree to create a new school environment in the School Management System. This will
              initialize your school’s database and administrator account.
            </p>
          </CardContent>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700/70 to-slate-800/70 backdrop-blur-sm"></div>
      <Card className="w-full max-w-3xl shadow-2xl rounded-3xl overflow-hidden border-none relative z-10 bg-white/90 dark:bg-gray-950/90">
        <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white p-8">
          <CardTitle className="text-4xl font-bold">School System Setup</CardTitle>
          <CardDescription className="text-slate-100 text-lg">
            Step {currentStep} of {totalSteps}: {currentStep === 1 && "Administrator Details"}
            {currentStep === 2 && "School Details"}
            {currentStep === 3 && "Advanced Settings"}
            {currentStep === 4 && "Review & Confirm"}
          </CardDescription>
          <Progress
            value={(currentStep / totalSteps) * 100}
            className="mt-4 bg-slate-200/50"
            indicatorClassName="bg-white"
          />
        </CardHeader>
        <form onSubmit={handleSubmit}>
          {renderStep()}
          <CardFooter className="flex justify-between items-center p-8 bg-gray-50/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={fillDemoData}
              className="border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white dark:border-slate-400 dark:text-slate-400 dark:hover:bg-slate-400 dark:hover:text-gray-900 transition-colors font-semibold bg-transparent"
              disabled={isSubmitting}
            >
              Fill Demo Data
            </Button>
            <div className="flex gap-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900 transition-colors font-semibold bg-transparent"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}
              {currentStep < totalSteps && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-slate-600 hover:bg-slate-700 text-white dark:bg-slate-400 dark:hover:bg-slate-300 dark:text-gray-900 transition-colors font-semibold"
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              )}
              {currentStep === totalSteps && (
                <Button
                  type="submit"
                  className="bg-slate-600 hover:bg-slate-700 text-white dark:bg-slate-400 dark:hover:bg-slate-300 dark:text-gray-900 transition-colors font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Complete Setup"}
                </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SchoolSystemSetupForm

"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  User,
  Users,
  BookOpen,
  CalendarIcon,
  DollarSign,
  Bus,
  Activity,
  Save,
  GraduationCap,
  Building,
  Car,
  Calculator,
  BookOpenCheck,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function QuickAddModal({ isOpen, onClose, onSave }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("student")
  const [isLoading, setIsLoading] = useState(false)

  // Student form data
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    admissionNumber: "",
    grade: "",
    section: "",
    dateOfBirth: null,
    gender: "",
    bloodGroup: "",
    religion: "",
    nationality: "Kenyan",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    parentOccupation: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalConditions: "",
    allergies: "",
    previousSchool: "",
    transportRequired: false,
    hostelRequired: false,
    photo: null,
  })

  // Teacher form data
  const [teacherData, setTeacherData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    employeeId: "",
    email: "",
    phone: "",
    alternatePhone: "",
    dateOfBirth: null,
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    nationality: "Kenyan",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    qualification: "",
    experience: "",
    specialization: "",
    subjects: [],
    classes: [],
    joiningDate: null,
    salary: "",
    emergencyContact: "",
    emergencyPhone: "",
    bankAccount: "",
    bankName: "",
    panNumber: "",
    aadharNumber: "",
    photo: null,
    resume: null,
  })

  // Parent form data
  const [parentData, setParentData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    occupation: "",
    workAddress: "",
    annualIncome: "",
    relationship: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    children: [],
    emergencyContact: "",
    emergencyPhone: "",
    preferredLanguage: "English",
    communicationMethod: "Email",
    photo: null,
  })

  // Librarian form data
  const [librarianData, setLibrarianData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    employeeId: "",
    email: "",
    phone: "",
    dateOfBirth: null,
    gender: "",
    qualification: "",
    experience: "",
    joiningDate: null,
    salary: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    specialization: "",
    certifications: "",
    photo: null,
  })

  // Driver form data
  const [driverData, setDriverData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    employeeId: "",
    phone: "",
    alternatePhone: "",
    dateOfBirth: null,
    gender: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    licenseNumber: "",
    licenseExpiry: null,
    experience: "",
    joiningDate: null,
    salary: "",
    emergencyContact: "",
    emergencyPhone: "",
    bloodGroup: "",
    medicalCertificate: null,
    policeClearance: null,
    photo: null,
  })

  // Vehicle form data
  const [vehicleData, setVehicleData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    model: "",
    manufacturer: "",
    year: "",
    capacity: "",
    fuelType: "",
    registrationDate: null,
    insuranceNumber: "",
    insuranceExpiry: null,
    fitnessExpiry: null,
    pollutionExpiry: null,
    driverId: "",
    routeId: "",
    status: "Active",
    maintenanceSchedule: "",
    lastService: null,
    nextService: null,
    documents: [],
  })

  // Accountant form data
  const [accountantData, setAccountantData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    employeeId: "",
    email: "",
    phone: "",
    dateOfBirth: null,
    gender: "",
    qualification: "",
    experience: "",
    specialization: "",
    joiningDate: null,
    salary: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    certifications: "",
    bankAccount: "",
    bankName: "",
    photo: null,
  })

  // Subject form data
  const [subjectData, setSubjectData] = useState({
    subjectName: "",
    subjectCode: "",
    description: "",
    grade: "",
    category: "",
    credits: "",
    isOptional: false,
    prerequisites: "",
    syllabus: "",
    books: "",
    teacherId: "",
    maxMarks: "",
    passingMarks: "",
    practicalRequired: false,
  })

  // Class form data
  const [classData, setClassData] = useState({
    className: "",
    grade: "",
    section: "",
    capacity: "",
    classTeacher: "",
    room: "",
    subjects: [],
    students: [],
    timetable: "",
    academicYear: "2024",
    fees: "",
    description: "",
  })

  // Event form data
  const [eventData, setEventData] = useState({
    eventName: "",
    eventType: "",
    date: null,
    time: "",
    venue: "",
    description: "",
    targetAudience: "",
    organizer: "",
  })

  // Fee structure form data
  const [feeData, setFeeData] = useState({
    feeName: "",
    amount: "",
    grade: "",
    term: "",
    dueDate: null,
    description: "",
    category: "",
  })

  // Transport route form data
  const [routeData, setRouteData] = useState({
    routeName: "",
    routeCode: "",
    startPoint: "",
    endPoint: "",
    distance: "",
    estimatedTime: "",
    stops: [],
    vehicleId: "",
    driverId: "",
    fee: "",
    status: "Active",
  })

  // Activity form data
  const [activityData, setActivityData] = useState({
    activityName: "",
    category: "",
    instructor: "",
    schedule: "",
    venue: "",
    maxParticipants: "",
    fee: "",
    description: "",
  })

  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "Kiswahili",
    "Social Studies",
    "CRE",
    "Physical Education",
    "Art & Craft",
    "Music",
    "Computer Studies",
  ]

  const grades = [
    "Pre-Primary 1",
    "Pre-Primary 2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
  ]

  const handleSave = async (type, data) => {
    setIsLoading(true)

    try {
      // Validate required fields
      if (!validateForm(type, data)) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (onSave) {
        onSave({ type, data })
      }

      toast({
        title: "Success",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`,
      })

      // Reset form data
      resetFormData(type)
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add ${type}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validateForm = (type, data) => {
    switch (type) {
      case "student":
        return data.firstName && data.lastName && data.admissionNumber && data.grade
      case "teacher":
        return data.firstName && data.lastName && data.employeeId && data.email
      case "parent":
        return data.firstName && data.lastName && data.email && data.phone
      case "librarian":
        return data.firstName && data.lastName && data.employeeId && data.email
      case "driver":
        return data.firstName && data.lastName && data.phone && data.licenseNumber
      case "vehicle":
        return data.vehicleNumber && data.vehicleType && data.capacity
      case "accountant":
        return data.firstName && data.lastName && data.employeeId && data.email
      case "subject":
        return data.subjectName && data.subjectCode && data.grade
      case "class":
        return data.className && data.grade && data.capacity
      case "event":
        return data.eventName && data.eventType && data.date
      case "fee":
        return data.feeName && data.amount && data.grade
      case "route":
        return data.routeName && data.startPoint && data.endPoint
      case "activity":
        return data.activityName && data.category && data.instructor
      default:
        return false
    }
  }

  const resetFormData = (type) => {
    switch (type) {
      case "student":
        setStudentData({
          firstName: "",
          lastName: "",
          middleName: "",
          admissionNumber: "",
          grade: "",
          section: "",
          dateOfBirth: null,
          gender: "",
          bloodGroup: "",
          religion: "",
          nationality: "Kenyan",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          parentName: "",
          parentPhone: "",
          parentEmail: "",
          parentOccupation: "",
          emergencyContact: "",
          emergencyPhone: "",
          medicalConditions: "",
          allergies: "",
          previousSchool: "",
          transportRequired: false,
          hostelRequired: false,
          photo: null,
        })
        break
      case "teacher":
        setTeacherData({
          firstName: "",
          lastName: "",
          middleName: "",
          employeeId: "",
          email: "",
          phone: "",
          alternatePhone: "",
          dateOfBirth: null,
          gender: "",
          bloodGroup: "",
          maritalStatus: "",
          nationality: "Kenyan",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          qualification: "",
          experience: "",
          specialization: "",
          subjects: [],
          classes: [],
          joiningDate: null,
          salary: "",
          emergencyContact: "",
          emergencyPhone: "",
          bankAccount: "",
          bankName: "",
          panNumber: "",
          aadharNumber: "",
          photo: null,
          resume: null,
        })
        break
      case "parent":
        setParentData({
          firstName: "",
          lastName: "",
          middleName: "",
          email: "",
          phone: "",
          alternatePhone: "",
          occupation: "",
          workAddress: "",
          annualIncome: "",
          relationship: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          children: [],
          emergencyContact: "",
          emergencyPhone: "",
          preferredLanguage: "English",
          communicationMethod: "Email",
          photo: null,
        })
        break
      case "librarian":
        setLibrarianData({
          firstName: "",
          lastName: "",
          middleName: "",
          employeeId: "",
          email: "",
          phone: "",
          dateOfBirth: null,
          gender: "",
          qualification: "",
          experience: "",
          joiningDate: null,
          salary: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          emergencyContact: "",
          emergencyPhone: "",
          specialization: "",
          certifications: "",
          photo: null,
        })
        break
      case "driver":
        setDriverData({
          firstName: "",
          lastName: "",
          middleName: "",
          employeeId: "",
          phone: "",
          alternatePhone: "",
          dateOfBirth: null,
          gender: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          licenseNumber: "",
          licenseExpiry: null,
          experience: "",
          joiningDate: null,
          salary: "",
          emergencyContact: "",
          emergencyPhone: "",
          bloodGroup: "",
          medicalCertificate: null,
          policeClearance: null,
          photo: null,
        })
        break
      case "vehicle":
        setVehicleData({
          vehicleNumber: "",
          vehicleType: "",
          model: "",
          manufacturer: "",
          year: "",
          capacity: "",
          fuelType: "",
          registrationDate: null,
          insuranceNumber: "",
          insuranceExpiry: null,
          fitnessExpiry: null,
          pollutionExpiry: null,
          driverId: "",
          routeId: "",
          status: "Active",
          maintenanceSchedule: "",
          lastService: null,
          nextService: null,
          documents: [],
        })
        break
      case "accountant":
        setAccountantData({
          firstName: "",
          lastName: "",
          middleName: "",
          employeeId: "",
          email: "",
          phone: "",
          dateOfBirth: null,
          gender: "",
          qualification: "",
          experience: "",
          specialization: "",
          joiningDate: null,
          salary: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          emergencyContact: "",
          emergencyPhone: "",
          certifications: "",
          bankAccount: "",
          bankName: "",
          photo: null,
        })
        break
      case "subject":
        setSubjectData({
          subjectName: "",
          subjectCode: "",
          description: "",
          grade: "",
          category: "",
          credits: "",
          isOptional: false,
          prerequisites: "",
          syllabus: "",
          books: "",
          teacherId: "",
          maxMarks: "",
          passingMarks: "",
          practicalRequired: false,
        })
        break
      case "class":
        setClassData({
          className: "",
          grade: "",
          section: "",
          capacity: "",
          classTeacher: "",
          room: "",
          subjects: [],
          students: [],
          timetable: "",
          academicYear: "2024",
          fees: "",
          description: "",
        })
        break
      case "event":
        setEventData({
          eventName: "",
          eventType: "",
          date: null,
          time: "",
          venue: "",
          description: "",
          targetAudience: "",
          organizer: "",
        })
        break
      case "fee":
        setFeeData({
          feeName: "",
          amount: "",
          grade: "",
          term: "",
          dueDate: null,
          description: "",
          category: "",
        })
        break
      case "route":
        setRouteData({
          routeName: "",
          routeCode: "",
          startPoint: "",
          endPoint: "",
          distance: "",
          estimatedTime: "",
          stops: [],
          vehicleId: "",
          driverId: "",
          fee: "",
          status: "Active",
        })
        break
      case "activity":
        setActivityData({
          activityName: "",
          category: "",
          instructor: "",
          schedule: "",
          venue: "",
          maxParticipants: "",
          fee: "",
          description: "",
        })
        break
      default:
        break
    }
  }

  const handleFileUpload = (file, field, dataType) => {
    if (file && file.size <= 5 * 1024 * 1024) {
      // 5MB limit
      switch (dataType) {
        case "student":
          setStudentData((prev) => ({ ...prev, [field]: file }))
          break
        case "teacher":
          setTeacherData((prev) => ({ ...prev, [field]: file }))
          break
        case "parent":
          setParentData((prev) => ({ ...prev, [field]: file }))
          break
        case "librarian":
          setLibrarianData((prev) => ({ ...prev, [field]: file }))
          break
        case "driver":
          setDriverData((prev) => ({ ...prev, [field]: file }))
          break
        case "accountant":
          setAccountantData((prev) => ({ ...prev, [field]: file }))
          break
      }
      toast({
        title: "File Uploaded",
        description: `${file.name} uploaded successfully`,
      })
    } else {
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 5MB",
        variant: "destructive",
      })
    }
  }

  const quickAddOptions = [
    { id: "student", label: "Student", icon: User, description: "Add a new student" },
    { id: "teacher", label: "Teacher", icon: GraduationCap, description: "Add a new teacher" },
    { id: "parent", label: "Parent", icon: Users, description: "Add a new parent/guardian" },
    { id: "class", label: "Class", icon: Building, description: "Create a new class" },
    { id: "subject", label: "Subject", icon: BookOpen, description: "Add a new subject" },
    { id: "event", label: "Event", icon: CalendarIcon, description: "Schedule a new event" },
    { id: "fee", label: "Fee Structure", icon: DollarSign, description: "Create fee structure" },
    { id: "transport", label: "Transport", icon: Bus, description: "Add transport route" },
    { id: "activity", label: "Activity", icon: Activity, description: "Add co-curricular activity" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Quick Add
          </DialogTitle>
          <DialogDescription>Add new records to the system with comprehensive details</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          {/* Student Tab */}
          <TabsContent value="student" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Add New Student
                </CardTitle>
                <CardDescription>Complete student registration with all details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg border-b pb-2">Personal Information</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="studentFirstName">First Name *</Label>
                      <Input
                        id="studentFirstName"
                        value={studentData.firstName}
                        onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentMiddleName">Middle Name</Label>
                      <Input
                        id="studentMiddleName"
                        value={studentData.middleName}
                        onChange={(e) => setStudentData({ ...studentData, middleName: e.target.value })}
                        placeholder="Enter middle name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentLastName">Last Name *</Label>
                      <Input
                        id="studentLastName"
                        value={studentData.lastName}
                        onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })}
                        placeholder="Enter last name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admissionNumber">Admission Number *</Label>
                      <Input
                        id="admissionNumber"
                        value={studentData.admissionNumber}
                        onChange={(e) => setStudentData({ ...studentData, admissionNumber: e.target.value })}
                        placeholder="Enter admission number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentGrade">Grade *</Label>
                      <Select
                        value={studentData.grade}
                        onValueChange={(value) => setStudentData({ ...studentData, grade: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentSection">Section</Label>
                      <Select
                        value={studentData.section}
                        onValueChange={(value) => setStudentData({ ...studentData, section: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                          <SelectItem value="C">Section C</SelectItem>
                          <SelectItem value="D">Section D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !studentData.dateOfBirth && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {studentData.dateOfBirth ? format(studentData.dateOfBirth, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={studentData.dateOfBirth}
                            onSelect={(date) => setStudentData({ ...studentData, dateOfBirth: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentGender">Gender</Label>
                      <Select
                        value={studentData.gender}
                        onValueChange={(value) => setStudentData({ ...studentData, gender: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select
                        value={studentData.bloodGroup}
                        onValueChange={(value) => setStudentData({ ...studentData, bloodGroup: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Parent/Guardian Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg border-b pb-2">Parent/Guardian Information</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Parent/Guardian Name</Label>
                      <Input
                        id="parentName"
                        value={studentData.parentName}
                        onChange={(e) => setStudentData({ ...studentData, parentName: e.target.value })}
                        placeholder="Enter parent/guardian name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">Phone Number</Label>
                      <Input
                        id="parentPhone"
                        value={studentData.parentPhone}
                        onChange={(e) => setStudentData({ ...studentData, parentPhone: e.target.value })}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentEmail">Email Address</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        value={studentData.parentEmail}
                        onChange={(e) => setStudentData({ ...studentData, parentEmail: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentOccupation">Occupation</Label>
                      <Input
                        id="parentOccupation"
                        value={studentData.parentOccupation}
                        onChange={(e) => setStudentData({ ...studentData, parentOccupation: e.target.value })}
                        placeholder="Enter occupation"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg border-b pb-2">Additional Options</h4>
                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="transportRequired"
                        checked={studentData.transportRequired}
                        onCheckedChange={(checked) => setStudentData({ ...studentData, transportRequired: checked })}
                      />
                      <Label htmlFor="transportRequired">Transport Required</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hostelRequired"
                        checked={studentData.hostelRequired}
                        onCheckedChange={(checked) => setStudentData({ ...studentData, hostelRequired: checked })}
                      />
                      <Label htmlFor="hostelRequired">Hostel Required</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleSave("student", studentData)}
                    disabled={!validateForm("student", studentData) || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Adding Student...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Add Student
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff" className="space-y-4">
            <Tabs defaultValue="teacher" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="teacher">Teacher</TabsTrigger>
                <TabsTrigger value="librarian">Librarian</TabsTrigger>
                <TabsTrigger value="accountant">Accountant</TabsTrigger>
                <TabsTrigger value="driver">Driver</TabsTrigger>
              </TabsList>

              {/* Teacher Form */}
              <TabsContent value="teacher">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Add New Teacher
                    </CardTitle>
                    <CardDescription>Complete teacher registration with professional details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-lg border-b pb-2">Personal Information</h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="teacherFirstName">First Name *</Label>
                          <Input
                            id="teacherFirstName"
                            value={teacherData.firstName}
                            onChange={(e) => setTeacherData({ ...teacherData, firstName: e.target.value })}
                            placeholder="Enter first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teacherMiddleName">Middle Name</Label>
                          <Input
                            id="teacherMiddleName"
                            value={teacherData.middleName}
                            onChange={(e) => setTeacherData({ ...teacherData, middleName: e.target.value })}
                            placeholder="Enter middle name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teacherLastName">Last Name *</Label>
                          <Input
                            id="teacherLastName"
                            value={teacherData.lastName}
                            onChange={(e) => setTeacherData({ ...teacherData, lastName: e.target.value })}
                            placeholder="Enter last name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employeeId">Employee ID *</Label>
                          <Input
                            id="employeeId"
                            value={teacherData.employeeId}
                            onChange={(e) => setTeacherData({ ...teacherData, employeeId: e.target.value })}
                            placeholder="Enter employee ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teacherEmail">Email *</Label>
                          <Input
                            id="teacherEmail"
                            type="email"
                            value={teacherData.email}
                            onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teacherPhone">Phone</Label>
                          <Input
                            id="teacherPhone"
                            value={teacherData.phone}
                            onChange={(e) => setTeacherData({ ...teacherData, phone: e.target.value })}
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-lg border-b pb-2">Professional Information</h4>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="qualification">Qualification</Label>
                          <Input
                            id="qualification"
                            value={teacherData.qualification}
                            onChange={(e) => setTeacherData({ ...teacherData, qualification: e.target.value })}
                            placeholder="Enter qualification"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Experience (Years)</Label>
                          <Input
                            id="experience"
                            type="number"
                            value={teacherData.experience}
                            onChange={(e) => setTeacherData({ ...teacherData, experience: e.target.value })}
                            placeholder="Enter years of experience"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialization">Specialization</Label>
                          <Input
                            id="specialization"
                            value={teacherData.specialization}
                            onChange={(e) => setTeacherData({ ...teacherData, specialization: e.target.value })}
                            placeholder="Enter specialization"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="salary">Salary</Label>
                          <Input
                            id="salary"
                            type="number"
                            value={teacherData.salary}
                            onChange={(e) => setTeacherData({ ...teacherData, salary: e.target.value })}
                            placeholder="Enter salary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("teacher", teacherData)}
                        disabled={!validateForm("teacher", teacherData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Adding Teacher...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Add Teacher
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Librarian Form */}
              <TabsContent value="librarian">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpenCheck className="h-5 w-5" />
                      Add New Librarian
                    </CardTitle>
                    <CardDescription>Register new librarian with qualifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-lg border-b pb-2">Personal Information</h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="librarianFirstName">First Name *</Label>
                          <Input
                            id="librarianFirstName"
                            value={librarianData.firstName}
                            onChange={(e) => setLibrarianData({ ...librarianData, firstName: e.target.value })}
                            placeholder="Enter first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="librarianLastName">Last Name *</Label>
                          <Input
                            id="librarianLastName"
                            value={librarianData.lastName}
                            onChange={(e) => setLibrarianData({ ...librarianData, lastName: e.target.value })}
                            placeholder="Enter last name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="librarianEmployeeId">Employee ID *</Label>
                          <Input
                            id="librarianEmployeeId"
                            value={librarianData.employeeId}
                            onChange={(e) => setLibrarianData({ ...librarianData, employeeId: e.target.value })}
                            placeholder="Enter employee ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="librarianEmail">Email *</Label>
                          <Input
                            id="librarianEmail"
                            type="email"
                            value={librarianData.email}
                            onChange={(e) => setLibrarianData({ ...librarianData, email: e.target.value })}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="librarianPhone">Phone</Label>
                          <Input
                            id="librarianPhone"
                            value={librarianData.phone}
                            onChange={(e) => setLibrarianData({ ...librarianData, phone: e.target.value })}
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="librarianQualification">Qualification</Label>
                          <Input
                            id="librarianQualification"
                            value={librarianData.qualification}
                            onChange={(e) => setLibrarianData({ ...librarianData, qualification: e.target.value })}
                            placeholder="Enter qualification"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("librarian", librarianData)}
                        disabled={!validateForm("librarian", librarianData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Adding Librarian...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Add Librarian
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Accountant Form */}
              <TabsContent value="accountant">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Add New Accountant
                    </CardTitle>
                    <CardDescription>Register new accountant with financial expertise</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-lg border-b pb-2">Personal Information</h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="accountantFirstName">First Name *</Label>
                          <Input
                            id="accountantFirstName"
                            value={accountantData.firstName}
                            onChange={(e) => setAccountantData({ ...accountantData, firstName: e.target.value })}
                            placeholder="Enter first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountantLastName">Last Name *</Label>
                          <Input
                            id="accountantLastName"
                            value={accountantData.lastName}
                            onChange={(e) => setAccountantData({ ...accountantData, lastName: e.target.value })}
                            placeholder="Enter last name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountantEmployeeId">Employee ID *</Label>
                          <Input
                            id="accountantEmployeeId"
                            value={accountantData.employeeId}
                            onChange={(e) => setAccountantData({ ...accountantData, employeeId: e.target.value })}
                            placeholder="Enter employee ID"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountantEmail">Email *</Label>
                          <Input
                            id="accountantEmail"
                            type="email"
                            value={accountantData.email}
                            onChange={(e) => setAccountantData({ ...accountantData, email: e.target.value })}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountantPhone">Phone</Label>
                          <Input
                            id="accountantPhone"
                            value={accountantData.phone}
                            onChange={(e) => setAccountantData({ ...accountantData, phone: e.target.value })}
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountantQualification">Qualification</Label>
                          <Input
                            id="accountantQualification"
                            value={accountantData.qualification}
                            onChange={(e) => setAccountantData({ ...accountantData, qualification: e.target.value })}
                            placeholder="Enter qualification"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("accountant", accountantData)}
                        disabled={!validateForm("accountant", accountantData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Adding Accountant...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Add Accountant
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Driver Form */}
              <TabsContent value="driver">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bus className="h-5 w-5" />
                      Add New Driver
                    </CardTitle>
                    <CardDescription>Register new driver with license and experience details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-lg border-b pb-2">Personal Information</h4>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="driverFirstName">First Name *</Label>
                          <Input
                            id="driverFirstName"
                            value={driverData.firstName}
                            onChange={(e) => setDriverData({ ...driverData, firstName: e.target.value })}
                            placeholder="Enter first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverLastName">Last Name *</Label>
                          <Input
                            id="driverLastName"
                            value={driverData.lastName}
                            onChange={(e) => setDriverData({ ...driverData, lastName: e.target.value })}
                            placeholder="Enter last name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverPhone">Phone *</Label>
                          <Input
                            id="driverPhone"
                            value={driverData.phone}
                            onChange={(e) => setDriverData({ ...driverData, phone: e.target.value })}
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="licenseNumber">License Number *</Label>
                          <Input
                            id="licenseNumber"
                            value={driverData.licenseNumber}
                            onChange={(e) => setDriverData({ ...driverData, licenseNumber: e.target.value })}
                            placeholder="Enter license number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>License Expiry</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !driverData.licenseExpiry && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {driverData.licenseExpiry ? format(driverData.licenseExpiry, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={driverData.licenseExpiry}
                                onSelect={(date) => setDriverData({ ...driverData, licenseExpiry: date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driverExperience">Experience (Years)</Label>
                          <Input
                            id="driverExperience"
                            type="number"
                            value={driverData.experience}
                            onChange={(e) => setDriverData({ ...driverData, experience: e.target.value })}
                            placeholder="Enter years of experience"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("driver", driverData)}
                        disabled={!validateForm("driver", driverData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Adding Driver...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Add Driver
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Academic Tab */}
          <TabsContent value="academic" className="space-y-4">
            <Tabs defaultValue="subject" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="subject">Subject</TabsTrigger>
                <TabsTrigger value="class">Class</TabsTrigger>
              </TabsList>

              <TabsContent value="subject">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Add New Subject
                    </CardTitle>
                    <CardDescription>Create new subject with curriculum details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="subjectName">Subject Name *</Label>
                        <Input
                          id="subjectName"
                          value={subjectData.subjectName}
                          onChange={(e) => setSubjectData({ ...subjectData, subjectName: e.target.value })}
                          placeholder="Enter subject name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subjectCode">Subject Code *</Label>
                        <Input
                          id="subjectCode"
                          value={subjectData.subjectCode}
                          onChange={(e) => setSubjectData({ ...subjectData, subjectCode: e.target.value })}
                          placeholder="Enter subject code"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subjectGrade">Grade *</Label>
                        <Select
                          value={subjectData.grade}
                          onValueChange={(value) => setSubjectData({ ...subjectData, grade: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {grades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subjectCategory">Category</Label>
                        <Select
                          value={subjectData.category}
                          onValueChange={(value) => setSubjectData({ ...subjectData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="core">Core Subject</SelectItem>
                            <SelectItem value="elective">Elective</SelectItem>
                            <SelectItem value="practical">Practical</SelectItem>
                            <SelectItem value="co-curricular">Co-curricular</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subjectDescription">Description</Label>
                      <Textarea
                        id="subjectDescription"
                        value={subjectData.description}
                        onChange={(e) => setSubjectData({ ...subjectData, description: e.target.value })}
                        placeholder="Enter subject description"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("subject", subjectData)}
                        disabled={!validateForm("subject", subjectData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Adding Subject...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Add Subject
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="class">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Create New Class
                    </CardTitle>
                    <CardDescription>Set up a new class with basic information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="className">Class Name *</Label>
                        <Input
                          id="className"
                          value={classData.className}
                          onChange={(e) => setClassData({ ...classData, className: e.target.value })}
                          placeholder="Enter class name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="classGrade">Grade *</Label>
                        <Select
                          value={classData.grade}
                          onValueChange={(value) => setClassData({ ...classData, grade: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {grades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="section">Section</Label>
                        <Input
                          id="section"
                          value={classData.section}
                          onChange={(e) => setClassData({ ...classData, section: e.target.value })}
                          placeholder="Enter section (A, B, C, etc.)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity *</Label>
                        <Input
                          id="capacity"
                          type="number"
                          value={classData.capacity}
                          onChange={(e) => setClassData({ ...classData, capacity: e.target.value })}
                          placeholder="Enter maximum capacity"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("class", classData)}
                        disabled={!validateForm("class", classData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Creating Class...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Create Class
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Transport Tab */}
          <TabsContent value="transport" className="space-y-4">
            <Tabs defaultValue="vehicle" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
                <TabsTrigger value="route">Route</TabsTrigger>
              </TabsList>

              <TabsContent value="vehicle">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      Add New Vehicle
                    </CardTitle>
                    <CardDescription>Register new vehicle with complete details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
                        <Input
                          id="vehicleNumber"
                          value={vehicleData.vehicleNumber}
                          onChange={(e) => setVehicleData({ ...vehicleData, vehicleNumber: e.target.value })}
                          placeholder="Enter vehicle number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleType">Vehicle Type *</Label>
                        <Select
                          value={vehicleData.vehicleType}
                          onValueChange={(value) => setVehicleData({ ...vehicleData, vehicleType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bus">Bus</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="truck">Truck</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleCapacity">Capacity *</Label>
                        <Input
                          id="vehicleCapacity"
                          type="number"
                          value={vehicleData.capacity}
                          onChange={(e) => setVehicleData({ ...vehicleData, capacity: e.target.value })}
                          placeholder="Enter seating capacity"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleModel">Model</Label>
                        <Input
                          id="vehicleModel"
                          value={vehicleData.model}
                          onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                          placeholder="Enter vehicle model"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("vehicle", vehicleData)}
                        disabled={!validateForm("vehicle", vehicleData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Adding Vehicle...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Add Vehicle
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="route">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bus className="h-5 w-5" />
                      Add New Route
                    </CardTitle>
                    <CardDescription>Create new transport route</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="routeName">Route Name *</Label>
                        <Input
                          id="routeName"
                          value={routeData.routeName}
                          onChange={(e) => setRouteData({ ...routeData, routeName: e.target.value })}
                          placeholder="Enter route name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startPoint">Start Point *</Label>
                        <Input
                          id="startPoint"
                          value={routeData.startPoint}
                          onChange={(e) => setRouteData({ ...routeData, startPoint: e.target.value })}
                          placeholder="Enter start point"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endPoint">End Point *</Label>
                        <Input
                          id="endPoint"
                          value={routeData.endPoint}
                          onChange={(e) => setRouteData({ ...routeData, endPoint: e.target.value })}
                          placeholder="Enter end point"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="routeFee">Route Fee</Label>
                        <Input
                          id="routeFee"
                          type="number"
                          value={routeData.fee}
                          onChange={(e) => setRouteData({ ...routeData, fee: e.target.value })}
                          placeholder="Enter route fee"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("route", routeData)}
                        disabled={!validateForm("route", routeData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Adding Route...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Add Route
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Other Tab */}
          <TabsContent value="other" className="space-y-4">
            <Tabs defaultValue="event" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="event">Event</TabsTrigger>
                <TabsTrigger value="fee">Fee Structure</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="event">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Schedule New Event
                    </CardTitle>
                    <CardDescription>Create and schedule school events</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="eventName">Event Name *</Label>
                        <Input
                          id="eventName"
                          value={eventData.eventName}
                          onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
                          placeholder="Enter event name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select
                          value={eventData.eventType}
                          onValueChange={(value) => setEventData({ ...eventData, eventType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="meeting">Meeting</SelectItem>
                            <SelectItem value="celebration">Celebration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Event Date *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !eventData.date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {eventData.date ? format(eventData.date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={eventData.date}
                              onSelect={(date) => setEventData({ ...eventData, date: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventTime">Time</Label>
                        <Input
                          id="eventTime"
                          type="time"
                          value={eventData.time}
                          onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventDescription">Description</Label>
                      <Textarea
                        id="eventDescription"
                        value={eventData.description}
                        onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                        placeholder="Enter event description"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("event", eventData)}
                        disabled={!validateForm("event", eventData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Scheduling Event...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Schedule Event
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fee">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Create Fee Structure
                    </CardTitle>
                    <CardDescription>Set up fee structure for different grades</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="feeName">Fee Name *</Label>
                        <Input
                          id="feeName"
                          value={feeData.feeName}
                          onChange={(e) => setFeeData({ ...feeData, feeName: e.target.value })}
                          placeholder="Enter fee name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feeAmount">Amount *</Label>
                        <Input
                          id="feeAmount"
                          type="number"
                          value={feeData.amount}
                          onChange={(e) => setFeeData({ ...feeData, amount: e.target.value })}
                          placeholder="Enter fee amount"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feeGrade">Grade *</Label>
                        <Select
                          value={feeData.grade}
                          onValueChange={(value) => setFeeData({ ...feeData, grade: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {grades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feeTerm">Term</Label>
                        <Select value={feeData.term} onValueChange={(value) => setFeeData({ ...feeData, term: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="term-1">Term 1</SelectItem>
                            <SelectItem value="term-2">Term 2</SelectItem>
                            <SelectItem value="term-3">Term 3</SelectItem>
                            <SelectItem value="annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feeDescription">Description</Label>
                      <Textarea
                        id="feeDescription"
                        value={feeData.description}
                        onChange={(e) => setFeeData({ ...feeData, description: e.target.value })}
                        placeholder="Enter fee description"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("fee", feeData)}
                        disabled={!validateForm("fee", feeData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Creating Fee Structure...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Create Fee Structure
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Add Co-curricular Activity
                    </CardTitle>
                    <CardDescription>Create new co-curricular activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="activityName">Activity Name *</Label>
                        <Input
                          id="activityName"
                          value={activityData.activityName}
                          onChange={(e) => setActivityData({ ...activityData, activityName: e.target.value })}
                          placeholder="Enter activity name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="activityCategory">Category *</Label>
                        <Select
                          value={activityData.category}
                          onValueChange={(value) => setActivityData({ ...activityData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="arts">Arts</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="drama">Drama</SelectItem>
                            <SelectItem value="clubs">Clubs</SelectItem>
                            <SelectItem value="community">Community Service</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="activityInstructor">Instructor *</Label>
                        <Input
                          id="activityInstructor"
                          value={activityData.instructor}
                          onChange={(e) => setActivityData({ ...activityData, instructor: e.target.value })}
                          placeholder="Enter instructor name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="activityVenue">Venue</Label>
                        <Input
                          id="activityVenue"
                          value={activityData.venue}
                          onChange={(e) => setActivityData({ ...activityData, venue: e.target.value })}
                          placeholder="Enter venue"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="activityDescription">Description</Label>
                      <Textarea
                        id="activityDescription"
                        value={activityData.description}
                        onChange={(e) => setActivityData({ ...activityData, description: e.target.value })}
                        placeholder="Enter activity description"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => handleSave("activity", activityData)}
                        disabled={!validateForm("activity", activityData) || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Adding Activity...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Add Activity
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

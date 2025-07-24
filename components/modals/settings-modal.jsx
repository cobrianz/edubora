"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Settings,
  School,
  Shield,
  Database,
  Mail,
  Phone,
  DollarSign,
  BookOpen,
  Save,
  Upload,
  Download,
  Eye,
  EyeOff,
  Monitor,
  Server,
  HardDrive,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsModal({ isOpen, onClose, onSave }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("school")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // School Settings
  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: "Greenfield Primary School",
    schoolCode: "GPS001",
    schoolType: "primary",
    establishedYear: "2010",
    registrationNumber: "REG/2010/001",
    affiliationNumber: "AFF/2010/001",
    boardAffiliation: "KICD",
    address: "123 Education Street, Nairobi, Kenya",
    city: "Nairobi",
    state: "Nairobi County",
    postalCode: "00100",
    country: "Kenya",
    phone: "+254 712 345 678",
    alternatePhone: "+254 723 456 789",
    email: "info@greenfieldprimary.ac.ke",
    website: "www.greenfieldprimary.ac.ke",
    fax: "+254 712 345 679",
    motto: "Excellence in Education",
    vision:
      "To be a leading institution in providing quality education that nurtures holistic development of learners.",
    mission:
      "To provide quality education through innovative teaching methods, character development, and community engagement.",
    coreValues: ["Excellence", "Integrity", "Innovation", "Respect", "Responsibility"],
    logo: null,
    principalName: "Dr. Mary Wanjiku",
    principalEmail: "principal@greenfieldprimary.ac.ke",
    principalPhone: "+254 723 456 789",
    vicePrincipalName: "Mr. John Kamau",
    vicePrincipalEmail: "vp@greenfieldprimary.ac.ke",
    timezone: "Africa/Nairobi",
    language: "english",
    currency: "KES",
    currencySymbol: "KSh",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24",
    weekStartDay: "monday",
  })

  // Academic Settings
  const [academicSettings, setAcademicSettings] = useState({
    currentAcademicYear: "2024",
    academicYearStart: new Date("2024-01-15"),
    academicYearEnd: new Date("2024-12-15"),
    currentTerm: "term-2",
    totalTerms: "3",
    termStartDate: new Date("2024-05-06"),
    termEndDate: new Date("2024-08-16"),
    gradingSystem: "percentage",
    passingGrade: "50",
    maxGrade: "100",
    gradeScale: [
      { grade: "A", min: 80, max: 100, description: "Excellent" },
      { grade: "B", min: 70, max: 79, description: "Very Good" },
      { grade: "C", min: 60, max: 69, description: "Good" },
      { grade: "D", min: 50, max: 59, description: "Satisfactory" },
      { grade: "E", min: 0, max: 49, description: "Needs Improvement" },
    ],
    attendanceRequired: "80",
    classSize: "40",
    periodsPerDay: "8",
    periodDuration: "40",
    breakDuration: "20",
    lunchDuration: "60",
    schoolStartTime: "08:00",
    schoolEndTime: "15:30",
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    examTypes: ["CAT", "Mid-Term", "End-Term"],
    reportCardTemplate: "standard",
    promotionCriteria: "automatic",
    subjectCategories: ["Core", "Elective", "Co-curricular"],
    assessmentMethods: ["Written", "Practical", "Oral", "Project"],
    homeworkPolicy: "Daily homework assignments with weekend projects",
    disciplinaryPolicy: "Progressive discipline with counseling support",
  })

  // Communication Settings
  const [communicationSettings, setCommunicationSettings] = useState({
    emailProvider: "gmail",
    emailHost: "smtp.gmail.com",
    emailPort: "587",
    emailUsername: "noreply@greenfieldprimary.ac.ke",
    emailPassword: "",
    emailFromName: "Greenfield Primary School",
    emailFromAddress: "noreply@greenfieldprimary.ac.ke",
    emailEncryption: "tls",
    emailTimeout: "30",
    smsProvider: "safaricom",
    smsApiKey: "",
    smsApiSecret: "",
    smsSenderId: "GREENFIELD",
    smsGatewayUrl: "",
    enableEmailNotifications: true,
    enableSmsNotifications: true,
    enablePushNotifications: true,
    enableInAppNotifications: true,
    enableParentPortal: true,
    enableTeacherPortal: true,
    enableStudentPortal: false,
    autoSendReports: true,
    autoSendFeeReminders: true,
    autoSendAttendanceAlerts: true,
    autoSendExamSchedules: true,
    autoSendEventNotifications: true,
    communicationLanguages: ["english", "kiswahili"],
    defaultLanguage: "english",
    notificationFrequency: "immediate",
    digestFrequency: "daily",
    quietHoursStart: "22:00",
    quietHoursEnd: "06:00",
    enableQuietHours: true,
    emailTemplates: {
      welcome: "Welcome to Greenfield Primary School",
      feeReminder: "Fee Payment Reminder",
      reportCard: "Report Card Available",
      event: "School Event Notification",
    },
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactor: false,
    twoFactorMethod: "email",
    passwordMinLength: "8",
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: false,
    passwordExpiry: "90",
    passwordHistory: "5",
    sessionTimeout: "30",
    maxConcurrentSessions: "3",
    rememberMeDuration: "30",
    maxLoginAttempts: "5",
    lockoutDuration: "15",
    enableCaptcha: true,
    captchaAttempts: "3",
    enableAuditLog: true,
    auditLogRetention: "365",
    enableDataEncryption: true,
    encryptionAlgorithm: "AES-256",
    enableBackupEncryption: true,
    enableAutoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    backupRetention: "30",
    backupLocation: "local",
    enableCloudBackup: false,
    cloudProvider: "aws",
    enableFirewall: true,
    allowedIpRanges: "",
    blockedIpRanges: "",
    enableSslOnly: true,
    sslCertificate: "",
    enableRateLimiting: true,
    rateLimit: "100",
    dataRetentionPeriod: "7",
    enableGdprCompliance: true,
    enableDataAnonymization: true,
    cookieConsent: true,
    privacyPolicyUrl: "",
    termsOfServiceUrl: "",
  })

  // Financial Settings
  const [financialSettings, setFinancialSettings] = useState({
    currency: "KES",
    currencySymbol: "KSh",
    currencyPosition: "before",
    decimalPlaces: "2",
    thousandSeparator: ",",
    decimalSeparator: ".",
    taxRate: "16",
    taxName: "VAT",
    enableTax: true,
    taxNumber: "P051234567M",
    paymentMethods: ["cash", "mpesa", "bank", "cheque", "card"],
    defaultPaymentMethod: "mpesa",
    enableOnlinePayments: true,
    enableInstallments: true,
    maxInstallments: "12",
    mpesaConsumerKey: "",
    mpesaConsumerSecret: "",
    mpesaPasskey: "",
    mpesaShortcode: "",
    mpesaPaybill: "123456",
    mpesaAccountNumber: "SCHOOL001",
    mpesaCallbackUrl: "",
    bankName: "Kenya Commercial Bank",
    bankAccount: "1234567890",
    bankBranch: "Nairobi Branch",
    bankCode: "01",
    swiftCode: "KCBLKENX",
    enableLateFees: true,
    latePaymentFee: "500",
    latePaymentGracePeriod: "7",
    enableAutoReminders: true,
    reminderFrequency: "weekly",
    reminderDays: ["7", "3", "1"],
    enableDiscounts: true,
    discountTypes: ["sibling", "early_payment", "merit", "need_based"],
    enableScholarships: true,
    scholarshipCriteria: ["academic", "sports", "arts", "need_based"],
    financialYearStart: new Date("2024-01-01"),
    financialYearEnd: new Date("2024-12-31"),
    enableFinancialReports: true,
    reportingCurrency: "KES",
    budgetCategories: ["Salaries", "Infrastructure", "Learning Materials", "Transport", "Utilities"],
    invoicePrefix: "INV",
    invoiceNumbering: "sequential",
    invoiceTemplate: "standard",
    receiptPrefix: "RCP",
    enableExpenseTracking: true,
    expenseCategories: ["Salaries", "Utilities", "Maintenance", "Supplies", "Transport"],
    expenseApprovalRequired: true,
    expenseApprovalLimit: "10000",
  })

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    systemName: "EduBora School Management System",
    systemVersion: "2.0.0",
    systemMode: "production",
    maintenanceMode: false,
    debugMode: false,
    enableCaching: true,
    cacheExpiry: "24",
    cacheDriver: "redis",
    enableCompression: true,
    compressionLevel: "6",
    maxFileSize: "10",
    allowedFileTypes: ["pdf", "doc", "docx", "jpg", "jpeg", "png", "gif", "xlsx", "pptx"],
    uploadPath: "/uploads",
    enableVirusScanning: true,
    databaseType: "mysql",
    databaseHost: "localhost",
    databasePort: "3306",
    databaseName: "school_db",
    databaseBackupSchedule: "daily",
    enableQueryLogging: false,
    enableApiAccess: false,
    apiVersion: "v1",
    apiRateLimit: "1000",
    apiTimeout: "30",
    enableApiLogging: true,
    enableWebhooks: false,
    webhookUrl: "",
    webhookSecret: "",
    enableThirdPartyIntegrations: true,
    enableAnalytics: true,
    analyticsProvider: "google",
    analyticsId: "",
    enableErrorReporting: true,
    errorReportingService: "sentry",
    enablePerformanceMonitoring: true,
    logLevel: "info",
    logRetention: "30",
    enableAccessLogs: true,
    enableErrorLogs: true,
    enableAuditLogs: true,
    enableAutoUpdates: false,
    updateChannel: "stable",
    updateCheckFrequency: "weekly",
    defaultLocale: "en_KE",
    supportedLocales: ["en_KE", "sw_KE"],
    timezone: "Africa/Nairobi",
    defaultTheme: "light",
    allowThemeChange: true,
    customCss: "",
    enableCustomBranding: true,
  })

  const handleSave = async (settingsType, data) => {
    setIsLoading(true)

    try {
      // Validate settings
      if (!validateSettings(settingsType, data)) {
        toast({
          title: "Validation Error",
          description: "Please check all required fields",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (onSave) {
        onSave({ type: settingsType, data })
      }

      toast({
        title: "Settings Saved",
        description: `${settingsType.charAt(0).toUpperCase() + settingsType.slice(1)} settings have been updated successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to save ${settingsType} settings. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validateSettings = (type, data) => {
    switch (type) {
      case "school":
        return data.schoolName && data.schoolCode && data.email
      case "academic":
        return data.currentAcademicYear && data.currentTerm
      case "communication":
        return data.emailFromAddress && data.emailFromName
      case "security":
        return data.passwordMinLength && data.sessionTimeout
      case "financial":
        return data.currency && data.currencySymbol
      case "system":
        return data.systemName && data.systemVersion
      default:
        return true
    }
  }

  const handleTestConnection = async (type) => {
    toast({
      title: "Testing Connection",
      description: `Testing ${type} connection...`,
    })

    // Simulate connection test
    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% success rate
      toast({
        title: success ? "Connection Successful" : "Connection Failed",
        description: success
          ? `${type} connection test completed successfully`
          : `${type} connection test failed. Please check your settings.`,
        variant: success ? "default" : "destructive",
      })
    }, 2000)
  }

  const handleBackup = async () => {
    setIsLoading(true)
    toast({
      title: "Backup Started",
      description: "System backup has been initiated...",
    })

    // Simulate backup process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Backup Complete",
        description: "System backup completed successfully. Download will start automatically.",
      })
    }, 5000)
  }

  const handleRestore = async () => {
    toast({
      title: "Restore Started",
      description: "System restore has been initiated...",
    })

    // Simulate restore process
    setTimeout(() => {
      toast({
        title: "Restore Complete",
        description: "System restore completed successfully. Please restart the application.",
      })
    }, 3000)
  }

  const systemStatus = {
    database: { status: "connected", uptime: "99.9%", lastCheck: "2 minutes ago" },
    email: { status: "active", sent: "1,234", failed: "12" },
    sms: { status: "limited", sent: "456", failed: "23" },
    backup: { status: "up_to_date", lastBackup: "2 hours ago", size: "2.3 GB" },
    storage: { used: "45%", available: "55%", total: "100 GB" },
    memory: { used: "68%", available: "32%", total: "16 GB" },
    cpu: { usage: "23%", cores: "8", load: "Low" },
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Settings & Configuration
          </DialogTitle>
          <DialogDescription>Configure all aspects of your school management system</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="school">School</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* School Settings Tab */}
          <TabsContent value="school" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  School Information
                </CardTitle>
                <CardDescription>Basic school information and administrative details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg border-b pb-2">Basic Information</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School Name *</Label>
                      <Input
                        id="schoolName"
                        value={schoolSettings.schoolName}
                        onChange={(e) => setSchoolSettings({ ...schoolSettings, schoolName: e.target.value })}
                        placeholder="Enter school name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schoolCode">School Code *</Label>
                      <Input
                        id="schoolCode"
                        value={schoolSettings.schoolCode}
                        onChange={(e) => setSchoolSettings({ ...schoolSettings, schoolCode: e.target.value })}
                        placeholder="Enter school code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schoolType">School Type</Label>
                      <Select
                        value={schoolSettings.schoolType}
                        onValueChange={(value) => setSchoolSettings({ ...schoolSettings, schoolType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary School</SelectItem>
                          <SelectItem value="secondary">Secondary School</SelectItem>
                          <SelectItem value="mixed">Mixed School</SelectItem>
                          <SelectItem value="international">International School</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="establishedYear">Established Year</Label>
                      <Input
                        id="establishedYear"
                        value={schoolSettings.establishedYear}
                        onChange={(e) => setSchoolSettings({ ...schoolSettings, establishedYear: e.target.value })}
                        placeholder="Enter established year"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={schoolSettings.phone}
                        onChange={(e) => setSchoolSettings({ ...schoolSettings, phone: e.target.value })}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={schoolSettings.email}
                        onChange={(e) => setSchoolSettings({ ...schoolSettings, email: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Mission & Vision */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg border-b pb-2">Mission & Vision</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="motto">School Motto</Label>
                      <Input
                        id="motto"
                        value={schoolSettings.motto}
                        onChange={(e) => setSchoolSettings({ ...schoolSettings, motto: e.target.value })}
                        placeholder="Enter school motto"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vision">Vision Statement</Label>
                      <Textarea
                        id="vision"
                        value={schoolSettings.vision}
                        onChange={(e) => setSchoolSettings({ ...schoolSettings, vision: e.target.value })}
                        placeholder="Enter vision statement"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mission">Mission Statement</Label>
                      <Textarea
                        id="mission"
                        value={schoolSettings.mission}
                        onChange={(e) => setSchoolSettings({ ...schoolSettings, mission: e.target.value })}
                        placeholder="Enter mission statement"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("school", schoolSettings)} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save School Settings
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Academic Settings Tab */}
          <TabsContent value="academic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Academic Configuration
                </CardTitle>
                <CardDescription>Configure academic year, terms, and grading system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentAcademicYear">Current Academic Year</Label>
                    <Input
                      id="currentAcademicYear"
                      value={academicSettings.currentAcademicYear}
                      onChange={(e) =>
                        setAcademicSettings({ ...academicSettings, currentAcademicYear: e.target.value })
                      }
                      placeholder="Enter academic year"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentTerm">Current Term</Label>
                    <Select
                      value={academicSettings.currentTerm}
                      onValueChange={(value) => setAcademicSettings({ ...academicSettings, currentTerm: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="term-1">Term 1</SelectItem>
                        <SelectItem value="term-2">Term 2</SelectItem>
                        <SelectItem value="term-3">Term 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gradingSystem">Grading System</Label>
                    <Select
                      value={academicSettings.gradingSystem}
                      onValueChange={(value) => setAcademicSettings({ ...academicSettings, gradingSystem: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                        <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                        <SelectItem value="points">Points (1-10)</SelectItem>
                        <SelectItem value="gpa">GPA (0.0-4.0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passingGrade">Passing Grade</Label>
                    <Input
                      id="passingGrade"
                      value={academicSettings.passingGrade}
                      onChange={(e) => setAcademicSettings({ ...academicSettings, passingGrade: e.target.value })}
                      placeholder="Enter passing grade"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("academic", academicSettings)} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Academic Settings
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Settings Tab */}
          <TabsContent value="communication" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Configuration
                  </CardTitle>
                  <CardDescription>Configure email settings for notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailProvider">Email Provider</Label>
                    <Select
                      value={communicationSettings.emailProvider}
                      onValueChange={(value) =>
                        setCommunicationSettings({ ...communicationSettings, emailProvider: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gmail">Gmail</SelectItem>
                        <SelectItem value="outlook">Outlook</SelectItem>
                        <SelectItem value="yahoo">Yahoo</SelectItem>
                        <SelectItem value="custom">Custom SMTP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailHost">SMTP Host</Label>
                    <Input
                      id="emailHost"
                      value={communicationSettings.emailHost}
                      onChange={(e) =>
                        setCommunicationSettings({ ...communicationSettings, emailHost: e.target.value })
                      }
                      placeholder="Enter SMTP host"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emailFromName">From Name</Label>
                    <Input
                      id="emailFromName"
                      value={communicationSettings.emailFromName}
                      onChange={(e) =>
                        setCommunicationSettings({ ...communicationSettings, emailFromName: e.target.value })
                      }
                      placeholder="Enter sender name"
                    />
                  </div>
                  <Button variant="outline" onClick={() => handleTestConnection("Email")} className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Test Email Connection
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    SMS Configuration
                  </CardTitle>
                  <CardDescription>Configure SMS settings for notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smsProvider">SMS Provider</Label>
                    <Select
                      value={communicationSettings.smsProvider}
                      onValueChange={(value) =>
                        setCommunicationSettings({ ...communicationSettings, smsProvider: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safaricom">Safaricom</SelectItem>
                        <SelectItem value="airtel">Airtel</SelectItem>
                        <SelectItem value="telkom">Telkom</SelectItem>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="custom">Custom API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smsApiKey">SMS API Key</Label>
                    <div className="relative">
                      <Input
                        id="smsApiKey"
                        type={showPassword ? "text" : "password"}
                        value={communicationSettings.smsApiKey}
                        onChange={(e) =>
                          setCommunicationSettings({ ...communicationSettings, smsApiKey: e.target.value })
                        }
                        placeholder="Enter SMS API key"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => handleTestConnection("SMS")} className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Test SMS Connection
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("communication", communicationSettings)} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Communication Settings
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Policies
                  </CardTitle>
                  <CardDescription>Configure security and access policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableTwoFactor">Two-Factor Authentication</Label>
                    <Switch
                      id="enableTwoFactor"
                      checked={securitySettings.enableTwoFactor}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, enableTwoFactor: checked })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: e.target.value })}
                      placeholder="Enter minimum password length"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                      placeholder="Enter session timeout"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Data & Backup
                  </CardTitle>
                  <CardDescription>Configure data protection and backup settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableAuditLog">Audit Logging</Label>
                    <Switch
                      id="enableAuditLog"
                      checked={securitySettings.enableAuditLog}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, enableAuditLog: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableAutoBackup">Auto Backup</Label>
                    <Switch
                      id="enableAutoBackup"
                      checked={securitySettings.enableAutoBackup}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({ ...securitySettings, enableAutoBackup: checked })
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleBackup}
                      className="flex-1 bg-transparent"
                      disabled={isLoading}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {isLoading ? "Backing up..." : "Backup Now"}
                    </Button>
                    <Button variant="outline" onClick={handleRestore} className="flex-1 bg-transparent">
                      <Upload className="mr-2 h-4 w-4" />
                      Restore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("security", securitySettings)} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Financial Settings Tab */}
          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Configuration
                </CardTitle>
                <CardDescription>Configure payment methods and financial settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="financialCurrency">Currency</Label>
                    <Select
                      value={financialSettings.currency}
                      onValueChange={(value) => setFinancialSettings({ ...financialSettings, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KES">Kenyan Shilling (KES)</SelectItem>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currencySymbol">Currency Symbol</Label>
                    <Input
                      id="currencySymbol"
                      value={financialSettings.currencySymbol}
                      onChange={(e) => setFinancialSettings({ ...financialSettings, currencySymbol: e.target.value })}
                      placeholder="Enter currency symbol"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={financialSettings.taxRate}
                      onChange={(e) => setFinancialSettings({ ...financialSettings, taxRate: e.target.value })}
                      placeholder="Enter tax rate"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableTax">Enable Tax</Label>
                    <Switch
                      id="enableTax"
                      checked={financialSettings.enableTax}
                      onCheckedChange={(checked) => setFinancialSettings({ ...financialSettings, enableTax: checked })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSave("financial", financialSettings)} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Financial Settings
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    System Status
                  </CardTitle>
                  <CardDescription>Current system status and health monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span className="font-medium">Database</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={systemStatus.database.status === "connected" ? "default" : "destructive"}>
                          {systemStatus.database.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{systemStatus.database.uptime}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium">Email Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={systemStatus.email.status === "active" ? "default" : "secondary"}>
                          {systemStatus.email.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {systemStatus.email.sent} sent, {systemStatus.email.failed} failed
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4" />
                        <span className="font-medium">Storage</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={45} className="w-20" />
                        <span className="text-sm text-muted-foreground">{systemStatus.storage.used} used</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    System Configuration
                  </CardTitle>
                  <CardDescription>Core system settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">System Name</Label>
                    <Input
                      id="systemName"
                      value={systemSettings.systemName}
                      onChange={(e) => setSystemSettings({ ...systemSettings, systemName: e.target.value })}
                      placeholder="Enter system name"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <Switch
                      id="maintenanceMode"
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, maintenanceMode: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableCaching">Enable Caching</Label>
                    <Switch
                      id="enableCaching"
                      checked={systemSettings.enableCaching}
                      onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableCaching: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => handleSave("system", systemSettings)} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save System Settings
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

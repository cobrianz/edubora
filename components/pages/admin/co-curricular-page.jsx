"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trophy,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Users,
  Calendar,
  Award,
  Clock,
  BarChart3,
  PieChart,
  TrendingUp,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"

// Import modals
import ActivityModal from "@/components/modals/activity-modal"
import CompetitionModal from "@/components/modals/competition-modal"
import AchievementModal from "@/components/modals/achievement-modal"
import ScheduleSessionModal from "@/components/modals/schedule-session-modal"
import FullScheduleModal from "@/components/modals/full-schedule-modal"
import ParticipantManagementModal from "@/components/modals/participant-management-modal"

export default function CoCurricularPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Modal states
  const [activityModal, setActivityModal] = useState({ isOpen: false, mode: "add", data: null })
  const [competitionModal, setCompetitionModal] = useState({ isOpen: false, mode: "add", data: null })
  const [achievementModal, setAchievementModal] = useState({ isOpen: false, mode: "add", data: null })
  const [sessionModal, setSessionModal] = useState({ isOpen: false, mode: "add", data: null })

  const [activities, setActivities] = useState([
    {
      id: "ACT001",
      name: "Football Club",
      category: "Sports",
      teacher: "Mr. James Kiprop",
      students: 25,
      maxCapacity: 30,
      schedule: "Monday & Wednesday 4:00 PM",
      status: "Active",
      achievements: ["Inter-school Champions 2023"],
      venue: "Sports Field",
      description: "Competitive football training and matches",
    },
    {
      id: "ACT002",
      name: "Drama Club",
      category: "Arts",
      teacher: "Ms. Faith Wanjiru",
      students: 18,
      maxCapacity: 25,
      schedule: "Tuesday & Thursday 3:30 PM",
      status: "Active",
      achievements: ["Best Performance Award 2024"],
      venue: "Main Hall",
      description: "Theater arts and performance training",
    },
    {
      id: "ACT003",
      name: "Science Club",
      category: "Academic",
      teacher: "Dr. Mary Njeri",
      students: 20,
      maxCapacity: 20,
      schedule: "Friday 3:00 PM",
      status: "Full",
      achievements: ["Science Fair Winners 2024"],
      venue: "Science Lab",
      description: "Scientific research and experimentation",
    },
    {
      id: "ACT004",
      name: "Chess Club",
      category: "Games",
      teacher: "Mr. Paul Kimani",
      students: 15,
      maxCapacity: 20,
      schedule: "Wednesday 3:30 PM",
      status: "Active",
      achievements: [],
      venue: "Library",
      description: "Strategic chess training and tournaments",
    },
  ])

  const [competitions, setCompetitions] = useState([
    {
      id: "COMP001",
      name: "Inter-School Football Tournament",
      category: "Sports",
      date: "2024-08-15",
      venue: "Nyayo Stadium",
      participants: 8,
      status: "Upcoming",
      registrationDeadline: "2024-08-01",
      level: "Regional",
      organizer: "Kenya Secondary Schools Sports Association",
    },
    {
      id: "COMP002",
      name: "Regional Science Fair",
      category: "Academic",
      date: "2024-09-10",
      venue: "University of Nairobi",
      participants: 5,
      status: "Registered",
      registrationDeadline: "2024-08-20",
      level: "Regional",
      organizer: "Ministry of Education",
    },
    {
      id: "COMP003",
      name: "Drama Festival",
      category: "Arts",
      date: "2024-07-20",
      venue: "Kenya National Theatre",
      participants: 12,
      status: "Completed",
      registrationDeadline: "2024-07-01",
      level: "National",
      organizer: "Kenya Schools Drama Festival",
    },
  ])

  const [achievements, setAchievements] = useState([
    {
      id: "ACH001",
      title: "Inter-school Football Champions",
      activity: "Football Club",
      date: "2024-06-15",
      level: "Regional",
      position: "1st Place",
      participants: ["John Doe", "Peter Smith", "Mary Johnson"],
      category: "Sports",
    },
    {
      id: "ACH002",
      title: "Best Drama Performance",
      activity: "Drama Club",
      date: "2024-05-20",
      level: "County",
      position: "1st Place",
      participants: ["Sarah Wilson", "David Brown", "Grace Lee"],
      category: "Arts",
    },
    {
      id: "ACH003",
      title: "Science Fair Innovation Award",
      activity: "Science Club",
      date: "2024-04-10",
      level: "National",
      position: "2nd Place",
      participants: ["Alice Cooper", "Bob Martin"],
      category: "Academic",
    },
  ])

  const [scheduleSessions, setScheduleSessions] = useState([
    {
      id: "SCH001",
      title: "Football Training",
      activity: "Football Club",
      type: "Training",
      date: "2024-07-15",
      startTime: "16:00",
      endTime: "18:00",
      venue: "Sports Field",
      instructor: "Mr. James Kiprop",
      registered: 22,
      maxParticipants: 30,
      status: "Scheduled",
    },
    {
      id: "SCH002",
      title: "Drama Rehearsal",
      activity: "Drama Club",
      type: "Rehearsal",
      date: "2024-07-16",
      startTime: "15:30",
      endTime: "17:30",
      venue: "Main Hall",
      instructor: "Ms. Faith Wanjiru",
      registered: 15,
      maxParticipants: 25,
      status: "Ongoing",
    },
    {
      id: "SCH003",
      title: "Science Fair Preparation",
      activity: "Science Club",
      type: "Workshop",
      date: "2024-07-17",
      startTime: "15:00",
      endTime: "17:00",
      venue: "Science Lab",
      instructor: "Dr. Mary Njeri",
      registered: 18,
      maxParticipants: 20,
      status: "Scheduled",
    },
  ])

  const [participantModal, setParticipantModal] = useState({ isOpen: false, activity: null })
  const [fullScheduleModal, setFullScheduleModal] = useState(false)

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "sports", label: "Sports" },
    { value: "arts", label: "Arts" },
    { value: "academic", label: "Academic" },
    { value: "games", label: "Games" },
  ]

  // Chart data
  const categoryData = [
    { name: "Sports", value: 35, color: "#3b82f6" },
    { name: "Arts", value: 25, color: "#ef4444" },
    { name: "Academic", value: 20, color: "#10b981" },
    { name: "Games", value: 15, color: "#f59e0b" },
    { name: "Music", value: 5, color: "#8b5cf6" },
  ]

  const monthlyData = [
    { month: "Jan", activities: 12, participants: 180 },
    { month: "Feb", activities: 15, participants: 220 },
    { month: "Mar", activities: 18, participants: 280 },
    { month: "Apr", activities: 22, participants: 320 },
    { month: "May", activities: 25, participants: 380 },
    { month: "Jun", activities: 28, participants: 420 },
  ]

  const achievementData = [
    { level: "School", count: 15 },
    { level: "District", count: 8 },
    { level: "County", count: 5 },
    { level: "Regional", count: 3 },
    { level: "National", count: 2 },
  ]

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || activity.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalStudents = activities.reduce((sum, activity) => sum + activity.students, 0)
  const activeActivities = activities.filter((activity) => activity.status === "Active").length

  // Modal handlers
  const handleActivityModal = (mode, data = null) => {
    setActivityModal({ isOpen: true, mode, data })
  }

  const handleCompetitionModal = (mode, data = null) => {
    setCompetitionModal({ isOpen: true, mode, data })
  }

  const handleAchievementModal = (mode, data = null) => {
    setAchievementModal({ isOpen: true, mode, data })
  }

  const handleSessionModal = (mode, data = null) => {
    setSessionModal({ isOpen: true, mode, data })
  }

  const handleViewFullSchedule = () => {
    setFullScheduleModal(true)
  }

  const handleManageParticipants = (activity) => {
    setParticipantModal({ isOpen: true, activity })
  }

  const handleExportReport = () => {
    toast({
      title: "Export Report",
      description: "Generating co-curricular activities report...",
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Co-Curricular Activities</h1>
          <p className="text-muted-foreground">Manage clubs, sports, competitions, and student achievements</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 bg-transparent"
            onClick={handleExportReport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={() => handleActivityModal("add")} className="transition-all duration-300 hover:scale-105">
            <Plus className="mr-2 h-4 w-4" />
            Add Activity
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Trophy className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activities.length}</div>
            <p className="text-xs text-muted-foreground">{activeActivities} active</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participating Students</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all activities</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitions</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{competitions.length}</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{achievements.length}</div>
            <p className="text-xs text-muted-foreground">Awards won</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Activities by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Activities",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <RechartsPieChart data={categoryData} cx="50%" cy="50%" outerRadius={80}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                participants: {
                  label: "Participants",
                  color: "#3b82f6",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="participants" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Achievements by Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "#10b981",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={achievementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="level" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Co-Curricular Activities
              </CardTitle>
              <CardDescription>Manage clubs, sports, and extracurricular activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Teacher In-Charge</TableHead>
                      <TableHead>Enrollment</TableHead>
                      <TableHead>Schedule</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActivities.map((activity) => (
                      <TableRow key={activity.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{activity.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{activity.category}</Badge>
                        </TableCell>
                        <TableCell>{activity.teacher}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className={activity.students >= activity.maxCapacity ? "text-red-600" : "text-green-600"}
                            >
                              {activity.students}/{activity.maxCapacity}
                            </span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(activity.students / activity.maxCapacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{activity.schedule}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              activity.status === "Active"
                                ? "default"
                                : activity.status === "Full"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleActivityModal("view", activity)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleActivityModal("edit", activity)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-blue-600 transition-all duration-300 hover:scale-105"
                              onClick={() => handleSessionModal("add", { activity: activity.name })}
                            >
                              Schedule
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-green-600 transition-all duration-300 hover:scale-105"
                              onClick={() => handleManageParticipants(activity)}
                            >
                              Manage
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitions">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Competitions & Events
              </CardTitle>
              <CardDescription>Track competitions and inter-school events</CardDescription>
              <Button
                onClick={() => handleCompetitionModal("add")}
                className="w-fit transition-all duration-300 hover:scale-105"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Competition
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Competition Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitions.map((competition) => (
                      <TableRow key={competition.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{competition.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{competition.category}</Badge>
                        </TableCell>
                        <TableCell>{competition.date}</TableCell>
                        <TableCell>{competition.venue}</TableCell>
                        <TableCell>{competition.participants} students</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              competition.status === "Completed"
                                ? "default"
                                : competition.status === "Registered"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {competition.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleCompetitionModal("view", competition)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleCompetitionModal("edit", competition)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Student Achievements
              </CardTitle>
              <CardDescription>Record and celebrate student accomplishments</CardDescription>
              <Button
                onClick={() => handleAchievementModal("add")}
                className="w-fit transition-all duration-300 hover:scale-105"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Achievement
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {achievements.map((achievement) => (
                      <TableRow key={achievement.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{achievement.title}</TableCell>
                        <TableCell>{achievement.activity}</TableCell>
                        <TableCell>{achievement.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              achievement.level === "National"
                                ? "default"
                                : achievement.level === "Regional"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {achievement.level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{achievement.position}</Badge>
                        </TableCell>
                        <TableCell>{achievement.participants.length} students</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleAchievementModal("view", achievement)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleAchievementModal("edit", achievement)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Activity Schedule
              </CardTitle>
              <CardDescription>Weekly schedule of all co-curricular activities</CardDescription>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSessionModal("add")}
                  className="w-fit transition-all duration-300 hover:scale-105"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
                <Button
                  variant="outline"
                  onClick={handleViewFullSchedule}
                  className="w-fit transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  View Full Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Participants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduleSessions.map((session) => (
                      <TableRow key={session.id} className="transition-all duration-200 hover:bg-muted/50">
                        <TableCell className="font-medium">{session.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{session.activity}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{session.date}</div>
                            <div className="text-muted-foreground">
                              {session.startTime} - {session.endTime}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{session.venue}</TableCell>
                        <TableCell>{session.instructor}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span
                              className={
                                session.registered >= session.maxParticipants ? "text-red-600" : "text-green-600"
                              }
                            >
                              {session.registered}/{session.maxParticipants}
                            </span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(session.registered / session.maxParticipants) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              session.status === "Scheduled"
                                ? "outline"
                                : session.status === "Ongoing"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {session.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleSessionModal("view", session)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 transition-all duration-300 hover:scale-110"
                              onClick={() => handleSessionModal("edit", session)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Activity Participation Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      activities: {
                        label: "Activities",
                        color: "#3b82f6",
                      },
                      participants: {
                        label: "Participants",
                        color: "#10b981",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="activities" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="participants" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Participation Rate</span>
                      <span className="text-2xl font-bold text-green-600">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Achievement Rate</span>
                      <span className="text-2xl font-bold text-blue-600">72%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Competition Success</span>
                      <span className="text-2xl font-bold text-purple-600">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
                <CardDescription>Overview of all co-curricular activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{activities.length}</div>
                    <div className="text-sm text-muted-foreground">Total Activities</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{totalStudents}</div>
                    <div className="text-sm text-muted-foreground">Active Participants</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{competitions.length}</div>
                    <div className="text-sm text-muted-foreground">Competitions</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{achievements.length}</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <ActivityModal
        isOpen={activityModal.isOpen}
        onClose={() => setActivityModal({ isOpen: false, mode: "add", data: null })}
        activity={activityModal.data}
        mode={activityModal.mode}
      />

      <CompetitionModal
        isOpen={competitionModal.isOpen}
        onClose={() => setCompetitionModal({ isOpen: false, mode: "add", data: null })}
        competition={competitionModal.data}
        mode={competitionModal.mode}
      />

      <AchievementModal
        isOpen={achievementModal.isOpen}
        onClose={() => setAchievementModal({ isOpen: false, mode: "add", data: null })}
        achievement={achievementModal.data}
        mode={achievementModal.mode}
      />

      <ScheduleSessionModal
        isOpen={sessionModal.isOpen}
        onClose={() => setSessionModal({ isOpen: false, mode: "add", data: null })}
        session={sessionModal.data}
        mode={sessionModal.mode}
      />

      <FullScheduleModal
        isOpen={fullScheduleModal}
        onClose={() => setFullScheduleModal(false)}
        sessions={scheduleSessions}
      />

      <ParticipantManagementModal
        isOpen={participantModal.isOpen}
        onClose={() => setParticipantModal({ isOpen: false, activity: null })}
        activity={participantModal.activity}
      />
    </div>
  )
}

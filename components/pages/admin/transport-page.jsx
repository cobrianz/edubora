"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bus,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Users,
  DollarSign,
  AlertTriangle,
  Download,
  Navigation,
  X,
  Bell,
  UserPlus,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import BusModal from "@/components/modals/bus-modal"
import RouteModal from "@/components/modals/route-modal"
import StudentTransportModal from "@/components/modals/student-transport-modal"
import NotifyParentModal from "@/components/modals/notify-parent-modal"
import AssignStudentTransportModal from "@/components/modals/assign-student-transport-modal"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function TransportPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showBusModal, setShowBusModal] = useState(false)
  const [showRouteModal, setShowRouteModal] = useState(false)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedBus, setSelectedBus] = useState(null)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [modalMode, setModalMode] = useState("add")
  const [showLiveMap, setShowLiveMap] = useState(false)

  const [buses, setBuses] = useState([
    {
      id: "BUS001",
      plateNumber: "KCA 123A",
      model: "Toyota Hiace",
      capacity: 25,
      driver: "John Mwangi",
      route: "Route A - CBD",
      status: "Active",
      location: { lat: -1.2921, lng: 36.8219 },
      students: 22,
      condition: "Good",
    },
    {
      id: "BUS002",
      plateNumber: "KCB 456B",
      model: "Nissan Matatu",
      capacity: 30,
      driver: "Mary Wanjiku",
      route: "Route B - Westlands",
      status: "In Transit",
      location: { lat: -1.2634, lng: 36.8078 },
      students: 28,
      condition: "Excellent",
    },
    {
      id: "BUS003",
      plateNumber: "KCC 789C",
      model: "Isuzu NPR",
      capacity: 35,
      driver: "Peter Kiprotich",
      route: "Route C - Eastlands",
      status: "Maintenance",
      location: { lat: -1.3167, lng: 36.8833 },
      students: 0,
      condition: "Needs Repair",
    },
  ])

  const [routes, setRoutes] = useState([
    {
      id: "RT001",
      name: "Route A - CBD",
      distance: "15.2 km",
      duration: "45 min",
      stops: ["CBD Stage", "Kencom", "Railways", "School"],
      students: 22,
      fare: 150,
      status: "Active",
    },
    {
      id: "RT002",
      name: "Route B - Westlands",
      distance: "12.8 km",
      duration: "35 min",
      stops: ["Westlands Mall", "ABC Place", "Sarit Centre", "School"],
      students: 28,
      fare: 120,
      status: "Active",
    },
    {
      id: "RT003",
      name: "Route C - Eastlands",
      distance: "18.5 km",
      duration: "55 min",
      stops: ["Eastleigh", "Pangani", "Mathare", "School"],
      students: 0,
      fare: 180,
      status: "Inactive",
    },
  ])

  const [transportStudents, setTransportStudents] = useState([
    {
      id: "TS001",
      name: "Sarah Mwangi",
      grade: "Grade 7A",
      route: "Route A - CBD",
      pickupPoint: "CBD Stage",
      feeStatus: "Paid",
      parentContact: "+254712345678",
      parentName: "James Mwangi",
    },
    {
      id: "TS002",
      name: "John Kiprotich",
      grade: "Grade 6B",
      route: "Route B - Westlands",
      pickupPoint: "Westlands Mall",
      feeStatus: "Overdue",
      parentContact: "+254723456789",
      parentName: "Grace Kiprotich",
    },
  ])

  // Available students (not assigned to transport)
  const [availableStudents] = useState([
    {
      id: "ST001",
      name: "Alice Johnson",
      admissionNo: "ADM2024001",
      grade: "Grade 8A",
      parentName: "Robert Johnson",
      parentPhone: "+254701234567",
      parentEmail: "robert.johnson@email.com",
      transportAssigned: false,
    },
    {
      id: "ST002",
      name: "David Wilson",
      admissionNo: "ADM2024002",
      grade: "Grade 7B",
      parentName: "Mary Wilson",
      parentPhone: "+254712345678",
      parentEmail: "mary.wilson@email.com",
      transportAssigned: false,
    },
    {
      id: "ST003",
      name: "Emma Davis",
      admissionNo: "ADM2024003",
      grade: "Grade 6C",
      parentName: "Peter Davis",
      parentPhone: "+254723456789",
      parentEmail: "peter.davis@email.com",
      transportAssigned: false,
    },
  ])

  // Chart data
  const routePerformanceData = [
    { name: "Route A", capacity: 25, enrolled: 22 },
    { name: "Route B", capacity: 30, enrolled: 28 },
    { name: "Route C", capacity: 35, enrolled: 0 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 32000 },
    { month: "Feb", revenue: 48000, expenses: 34000 },
    { month: "Mar", revenue: 52000, expenses: 36000 },
    { month: "Apr", revenue: 49000, expenses: 35000 },
    { month: "May", revenue: 55000, expenses: 38000 },
    { month: "Jun", revenue: 58000, expenses: 40000 },
  ]

  const feeStatusData = [
    { name: "Paid", value: 65, color: "#10b981" },
    { name: "Overdue", value: 25, color: "#ef4444" },
    { name: "Pending", value: 10, color: "#f59e0b" },
  ]

  const handleAddBus = () => {
    setModalMode("add")
    setSelectedBus(null)
    setShowBusModal(true)
  }

  const handleViewBus = (bus) => {
    setModalMode("view")
    setSelectedBus(bus)
    setShowBusModal(true)
  }

  const handleEditBus = (bus) => {
    setModalMode("edit")
    setSelectedBus(bus)
    setShowBusModal(true)
  }

  const handleDeleteBus = (bus) => {
    setBuses(buses.filter((b) => b.id !== bus.id))
    toast({
      title: "Bus Deleted",
      description: `${bus.plateNumber} has been removed from the system`,
    })
  }

  const handleTrackBus = (bus) => {
    setModalMode("track")
    setSelectedBus(bus)
    setShowBusModal(true)
  }

  const handleAddRoute = () => {
    setModalMode("add")
    setSelectedRoute(null)
    setShowRouteModal(true)
  }

  const handleViewRoute = (route) => {
    setModalMode("view")
    setSelectedRoute(route)
    setShowRouteModal(true)
  }

  const handleEditRoute = (route) => {
    setModalMode("edit")
    setSelectedRoute(route)
    setShowRouteModal(true)
  }

  const handleViewStudent = (student) => {
    setModalMode("view")
    setSelectedStudent(student)
    setShowStudentModal(true)
  }

  const handleNotifyParents = () => {
    setShowNotifyModal(true)
  }

  const handleAssignStudent = () => {
    setShowAssignModal(true)
  }

  const handleSendNotification = (notificationData) => {
    setShowNotifyModal(false)
    // In a real app, this would send actual notifications
  }

  const handleAssignTransport = (assignmentData) => {
    setTransportStudents([...transportStudents, assignmentData])
    setShowAssignModal(false)
  }

  const handleExportReport = () => {
    toast({
      title: "Export Started",
      description: "Transport report is being generated...",
    })
  }

  const toggleLiveMap = () => {
    setShowLiveMap(!showLiveMap)
  }

  const closeLiveMap = () => {
    setShowLiveMap(false)
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transport Management</h1>
          <p className="text-muted-foreground">Manage school buses, routes, and student transport</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={toggleLiveMap} variant={showLiveMap ? "destructive" : "default"}>
            <MapPin className="mr-2 h-4 w-4" />
            {showLiveMap ? "Close Live Map" : "Open Live Map"}
          </Button>
        </div>
      </div>

      {/* Live Map Section */}
      {showLiveMap && (
        <Card className="relative">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Live Bus Tracking
              </CardTitle>
              <CardDescription>Real-time location of all active buses</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={closeLiveMap}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800 flex items-center justify-center relative overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-300 dark:border-gray-600"></div>
                  ))}
                </div>
              </div>

              {/* Bus Markers */}
              {buses
                .filter((bus) => bus.status === "Active" || bus.status === "In Transit")
                .map((bus, index) => (
                  <div
                    key={bus.id}
                    className="absolute animate-pulse"
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                        <Bus className="h-4 w-4" />
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
                        {bus.plateNumber}
                      </div>
                    </div>
                  </div>
                ))}

              <div className="text-center z-10">
                <MapPin className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live GPS Tracking</h3>
                <p className="text-muted-foreground mb-4">
                  Tracking {buses.filter((bus) => bus.status === "Active" || bus.status === "In Transit").length} active
                  buses
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span>Active Buses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span>On Route</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span>Maintenance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Status Updates */}
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              {buses
                .filter((bus) => bus.status === "Active" || bus.status === "In Transit")
                .map((bus) => (
                  <div key={bus.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{bus.plateNumber}</p>
                      <p className="text-sm text-muted-foreground">{bus.route}</p>
                    </div>
                    <Badge variant={bus.status === "Active" ? "default" : "secondary"}>{bus.status}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buses</CardTitle>
            <Bus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">{buses.length}</div>
            <p className="text-xs text-muted-foreground">{buses.filter((b) => b.status === "Active").length} active</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Transported</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {buses.reduce((sum, bus) => sum + bus.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Daily average</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">KSh 58,000</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">
              {buses.filter((b) => b.status === "Maintenance").length}
            </div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Route Performance</CardTitle>
            <CardDescription>Capacity vs Enrollment by Route</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={routePerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="capacity" fill="#e5e7eb" name="Capacity" />
                <Bar dataKey="enrolled" fill="#3b82f6" name="Enrolled" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Fee Status Distribution</CardTitle>
            <CardDescription>Payment status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={feeStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {feeStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Route Efficiency</CardTitle>
            <CardDescription>Distance and utilization metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routes.map((route) => (
                <div key={route.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{route.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {route.distance} • {route.duration} • {route.stops.length} stops
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{route.students} students</p>
                    <p className="text-sm text-muted-foreground">KSh {route.fare}/month</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="buses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="buses">Buses</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="buses">
          <Card>
            <CardHeader>
              <CardTitle>Bus Fleet Management</CardTitle>
              <CardDescription>Manage school buses and drivers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search buses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Buses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddBus}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Bus
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plate Number</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buses.map((bus) => (
                      <TableRow key={bus.id}>
                        <TableCell className="font-medium">{bus.plateNumber}</TableCell>
                        <TableCell>{bus.model}</TableCell>
                        <TableCell>{bus.driver}</TableCell>
                        <TableCell>{bus.route}</TableCell>
                        <TableCell>{bus.capacity}</TableCell>
                        <TableCell>{bus.students}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              bus.status === "Active"
                                ? "default"
                                : bus.status === "In Transit"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {bus.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleViewBus(bus)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditBus(bus)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleTrackBus(bus)}>
                              <MapPin className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600"
                              onClick={() => handleDeleteBus(bus)}
                            >
                              <Trash2 className="h-4 w-4" />
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

        <TabsContent value="routes">
          <Card>
            <CardHeader>
              <CardTitle>Route Management</CardTitle>
              <CardDescription>Manage transport routes and schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search routes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button onClick={handleAddRoute}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Route
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route Name</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Stops</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Fare</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell className="font-medium">{route.name}</TableCell>
                        <TableCell>{route.distance}</TableCell>
                        <TableCell>{route.duration}</TableCell>
                        <TableCell>{route.stops.length}</TableCell>
                        <TableCell>{route.students}</TableCell>
                        <TableCell>KSh {route.fare}</TableCell>
                        <TableCell>
                          <Badge variant={route.status === "Active" ? "default" : "secondary"}>{route.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleViewRoute(route)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditRoute(route)}>
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

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Transport</CardTitle>
              <CardDescription>Manage student transport assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleNotifyParents}>
                    <Bell className="mr-2 h-4 w-4" />
                    Notify Parents
                  </Button>
                  <Button onClick={handleAssignStudent}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Assign Student
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Pickup Point</TableHead>
                      <TableHead>Fee Status</TableHead>
                      <TableHead>Parent Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transportStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                        <TableCell>{student.route}</TableCell>
                        <TableCell>{student.pickupPoint}</TableCell>
                        <TableCell>
                          <Badge variant={student.feeStatus === "Paid" ? "default" : "destructive"}>
                            {student.feeStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{student.parentContact}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => handleViewStudent(student)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Transport Reports</CardTitle>
              <CardDescription>Generate comprehensive transport reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fleet Utilization Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Detailed analysis of bus utilization and efficiency</p>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Revenue, expenses, and profitability analysis</p>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Student Transport Report</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Student enrollment and fee collection status</p>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Maintenance Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Bus maintenance history and upcoming schedules</p>
                    <Button className="w-full">Generate Report</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showBusModal && (
        <BusModal
          mode={modalMode}
          bus={selectedBus}
          onClose={() => setShowBusModal(false)}
          onSave={(busData) => {
            if (modalMode === "add") {
              setBuses([...buses, { ...busData, id: `BUS${buses.length + 1}`.padStart(6, "0") }])
            } else if (modalMode === "edit") {
              setBuses(buses.map((b) => (b.id === selectedBus.id ? { ...b, ...busData } : b)))
            }
            setShowBusModal(false)
          }}
        />
      )}

      {showRouteModal && (
        <RouteModal
          mode={modalMode}
          route={selectedRoute}
          onClose={() => setShowRouteModal(false)}
          onSave={(routeData) => {
            if (modalMode === "add") {
              setRoutes([...routes, { ...routeData, id: `RT${routes.length + 1}`.padStart(3, "0") }])
            } else if (modalMode === "edit") {
              setRoutes(routes.map((r) => (r.id === selectedRoute.id ? { ...r, ...routeData } : r)))
            }
            setShowRouteModal(false)
          }}
        />
      )}

      {showStudentModal && (
        <StudentTransportModal
          mode={modalMode}
          student={selectedStudent}
          routes={routes}
          onClose={() => setShowStudentModal(false)}
          onSave={(studentData) => {
            setShowStudentModal(false)
          }}
        />
      )}

      {showNotifyModal && (
        <NotifyParentModal
          students={transportStudents}
          onClose={() => setShowNotifyModal(false)}
          onSendNotification={handleSendNotification}
        />
      )}

      {showAssignModal && (
        <AssignStudentTransportModal
          routes={routes}
          students={availableStudents}
          onClose={() => setShowAssignModal(false)}
          onAssign={handleAssignTransport}
        />
      )}
    </div>
  )
}

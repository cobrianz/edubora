"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { X, MapPin, Users, BarChart3, Plus, Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function RoomAllocationModal({ onClose, onSave }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "",
    capacity: "",
    floor: "",
    building: "",
    facilities: [],
    status: "active",
  })

  // Sample rooms data
  const [rooms, setRooms] = useState([
    {
      id: "R001",
      name: "Room 201",
      type: "classroom",
      capacity: 35,
      floor: "2nd Floor",
      building: "Main Block",
      facilities: ["Projector", "Whiteboard", "AC"],
      status: "active",
      utilization: 85,
      currentClass: "Grade 7A",
      schedule: [
        { time: "8:00-8:40", subject: "Mathematics", teacher: "Mr. John Kamau", class: "Grade 7A" },
        { time: "8:40-9:20", subject: "English", teacher: "Ms. Sarah Wanjiku", class: "Grade 7A" },
        { time: "9:20-10:00", subject: "Science", teacher: "Dr. Mary Njeri", class: "Grade 7A" },
        { time: "10:20-11:00", subject: "Social Studies", teacher: "Ms. Grace Achieng", class: "Grade 7A" },
        { time: "11:00-11:40", subject: "Kiswahili", teacher: "Mr. Peter Mwangi", class: "Grade 7A" },
        { time: "11:40-12:20", subject: "Art & Craft", teacher: "Mr. David Ochieng", class: "Grade 7A" },
        { time: "1:00-1:40", subject: "Physical Education", teacher: "Mr. James Kiprop", class: "Grade 7A" },
        { time: "1:40-2:20", subject: "Music", teacher: "Ms. Faith Wanjiru", class: "Grade 7A" },
      ],
    },
    {
      id: "R002",
      name: "Room 202",
      type: "classroom",
      capacity: 35,
      floor: "2nd Floor",
      building: "Main Block",
      facilities: ["Projector", "Whiteboard"],
      status: "active",
      utilization: 80,
      currentClass: "Grade 7B",
      schedule: [],
    },
    {
      id: "R003",
      name: "Science Lab 1",
      type: "laboratory",
      capacity: 30,
      floor: "1st Floor",
      building: "Science Block",
      facilities: ["Lab Equipment", "Fume Hood", "Emergency Shower", "Gas Supply"],
      status: "active",
      utilization: 70,
      currentClass: "Science Classes",
      schedule: [],
    },
    {
      id: "R004",
      name: "Computer Lab",
      type: "computer",
      capacity: 25,
      floor: "1st Floor",
      building: "ICT Block",
      facilities: ["30 Computers", "Projector", "AC", "Internet"],
      status: "active",
      utilization: 60,
      currentClass: "Computer Studies",
      schedule: [],
    },
    {
      id: "R005",
      name: "Library",
      type: "library",
      capacity: 50,
      floor: "Ground Floor",
      building: "Main Block",
      facilities: ["Books", "Reading Tables", "AC", "WiFi"],
      status: "active",
      utilization: 45,
      currentClass: "Study Sessions",
      schedule: [],
    },
    {
      id: "R006",
      name: "Assembly Hall",
      type: "hall",
      capacity: 500,
      floor: "Ground Floor",
      building: "Main Block",
      facilities: ["Sound System", "Stage", "AC", "Projector"],
      status: "active",
      utilization: 25,
      currentClass: "Assemblies",
      schedule: [],
    },
  ])

  const roomTypes = [
    { value: "classroom", label: "Classroom", color: "#3b82f6" },
    { value: "laboratory", label: "Laboratory", color: "#10b981" },
    { value: "computer", label: "Computer Lab", color: "#f59e0b" },
    { value: "library", label: "Library", color: "#8b5cf6" },
    { value: "hall", label: "Assembly Hall", color: "#ef4444" },
    { value: "special", label: "Special Room", color: "#06b6d4" },
  ]

  const facilities = [
    "Projector",
    "Whiteboard",
    "Blackboard",
    "AC",
    "Fan",
    "WiFi",
    "Sound System",
    "Lab Equipment",
    "Computers",
    "Internet",
    "Stage",
    "Emergency Equipment",
  ]

  // Analytics data
  const utilizationData = rooms.map((room) => ({
    name: room.name,
    utilization: room.utilization,
    capacity: room.capacity,
    type: room.type,
  }))

  const typeDistribution = roomTypes.map((type) => ({
    type: type.label,
    count: rooms.filter((room) => room.type === type.value).length,
    color: type.color,
  }))

  const capacityAnalysis = [
    { range: "1-20", count: rooms.filter((r) => r.capacity <= 20).length },
    { range: "21-35", count: rooms.filter((r) => r.capacity > 20 && r.capacity <= 35).length },
    { range: "36-50", count: rooms.filter((r) => r.capacity > 35 && r.capacity <= 50).length },
    { range: "50+", count: rooms.filter((r) => r.capacity > 50).length },
  ]

  const weeklyUsage = [
    { day: "Mon", usage: 82 },
    { day: "Tue", usage: 85 },
    { day: "Wed", usage: 78 },
    { day: "Thu", usage: 80 },
    { day: "Fri", usage: 75 },
  ]

  const handleAddRoom = () => {
    if (!newRoom.name || !newRoom.type || !newRoom.capacity) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const room = {
      id: `R${String(rooms.length + 1).padStart(3, "0")}`,
      ...newRoom,
      capacity: Number.parseInt(newRoom.capacity),
      utilization: 0,
      currentClass: "",
      schedule: [],
    }

    setRooms([...rooms, room])
    setNewRoom({
      name: "",
      type: "",
      capacity: "",
      floor: "",
      building: "",
      facilities: [],
      status: "active",
    })

    toast({
      title: "Room Added",
      description: `${room.name} has been added successfully`,
    })
  }

  const handleEditRoom = (room) => {
    setSelectedRoom(room)
    setNewRoom(room)
    setIsEditing(true)
  }

  const handleUpdateRoom = () => {
    const updatedRooms = rooms.map((room) => (room.id === selectedRoom.id ? { ...newRoom } : room))
    setRooms(updatedRooms)
    setIsEditing(false)
    setSelectedRoom(null)
    setNewRoom({
      name: "",
      type: "",
      capacity: "",
      floor: "",
      building: "",
      facilities: [],
      status: "active",
    })

    toast({
      title: "Room Updated",
      description: `${newRoom.name} has been updated successfully`,
    })
  }

  const handleDeleteRoom = (roomId) => {
    setRooms(rooms.filter((room) => room.id !== roomId))
    toast({
      title: "Room Deleted",
      description: "Room has been removed from the system",
    })
  }

  const handleFacilityToggle = (facility) => {
    const updatedFacilities = newRoom.facilities.includes(facility)
      ? newRoom.facilities.filter((f) => f !== facility)
      : [...newRoom.facilities, facility]

    setNewRoom({ ...newRoom, facilities: updatedFacilities })
  }

  const getRoomTypeColor = (type) => {
    const roomType = roomTypes.find((rt) => rt.value === type)
    return roomType ? roomType.color : "#6b7280"
  }

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return "destructive"
    if (utilization >= 70) return "secondary"
    return "default"
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-7xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Room Allocation Management
            </CardTitle>
            <CardDescription>Manage classroom assignments and facility utilization</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Room Overview</TabsTrigger>
              <TabsTrigger value="manage">Manage Rooms</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="schedule">Room Schedules</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{rooms.length}</div>
                      <div className="text-sm text-muted-foreground">Total Rooms</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(rooms.reduce((acc, room) => acc + room.utilization, 0) / rooms.length)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Utilization</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {rooms.reduce((acc, room) => acc + room.capacity, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Capacity</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {rooms.filter((room) => room.status === "active").length}
                      </div>
                      <div className="text-sm text-muted-foreground">Active Rooms</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Rooms Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Room Directory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Room Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Utilization</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rooms.map((room) => (
                          <TableRow key={room.id}>
                            <TableCell className="font-medium">{room.name}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                style={{
                                  backgroundColor: `${getRoomTypeColor(room.type)}20`,
                                  color: getRoomTypeColor(room.type),
                                }}
                              >
                                {roomTypes.find((rt) => rt.value === room.type)?.label}
                              </Badge>
                            </TableCell>
                            <TableCell>{room.capacity} students</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{room.building}</div>
                                <div className="text-muted-foreground">{room.floor}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      room.utilization > 80
                                        ? "bg-red-600"
                                        : room.utilization > 60
                                          ? "bg-yellow-600"
                                          : "bg-green-600"
                                    }`}
                                    style={{ width: `${room.utilization}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{room.utilization}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={room.status === "active" ? "default" : "secondary"}>{room.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleEditRoom(room)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-600"
                                  onClick={() => handleDeleteRoom(room.id)}
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

            <TabsContent value="manage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {isEditing ? "Edit Room" : "Add New Room"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="roomName">Room Name *</Label>
                      <Input
                        id="roomName"
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                        placeholder="e.g., Room 301"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="roomType">Room Type *</Label>
                      <Select value={newRoom.type} onValueChange={(value) => setNewRoom({ ...newRoom, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room type" />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity *</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                        placeholder="Number of students"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="floor">Floor</Label>
                      <Input
                        id="floor"
                        value={newRoom.floor}
                        onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
                        placeholder="e.g., 3rd Floor"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="building">Building</Label>
                      <Input
                        id="building"
                        value={newRoom.building}
                        onChange={(e) => setNewRoom({ ...newRoom, building: e.target.value })}
                        placeholder="e.g., Main Block"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={newRoom.status}
                        onValueChange={(value) => setNewRoom({ ...newRoom, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="maintenance">Under Maintenance</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Facilities</Label>
                    <div className="grid gap-2 md:grid-cols-3">
                      {facilities.map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                          <Switch
                            id={`facility-${facility}`}
                            checked={newRoom.facilities.includes(facility)}
                            onCheckedChange={() => handleFacilityToggle(facility)}
                          />
                          <Label htmlFor={`facility-${facility}`} className="text-sm">
                            {facility}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    {isEditing && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false)
                          setSelectedRoom(null)
                          setNewRoom({
                            name: "",
                            type: "",
                            capacity: "",
                            floor: "",
                            building: "",
                            facilities: [],
                            status: "active",
                          })
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                    <Button onClick={isEditing ? handleUpdateRoom : handleAddRoom}>
                      {isEditing ? "Update Room" : "Add Room"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {/* Room Utilization Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Room Utilization
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={utilizationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="utilization" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Room Type Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Room Type Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={typeDistribution}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ type, count }) => `${type}: ${count}`}
                        >
                          {typeDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Capacity Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Capacity Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={capacityAnalysis}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Weekly Usage Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Usage Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={weeklyUsage}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="usage" stroke="#8b5cf6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">High Utilization Rooms</h4>
                      <div className="space-y-1">
                        {rooms
                          .filter((room) => room.utilization > 80)
                          .map((room) => (
                            <div key={room.id} className="text-sm">
                              {room.name} ({room.utilization}%)
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Underutilized Rooms</h4>
                      <div className="space-y-1">
                        {rooms
                          .filter((room) => room.utilization < 50)
                          .map((room) => (
                            <div key={room.id} className="text-sm">
                              {room.name} ({room.utilization}%)
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-yellow-800 mb-2">Recommendations</h4>
                      <div className="space-y-1 text-sm">
                        <div>• Consider redistributing classes from high-usage rooms</div>
                        <div>• Optimize scheduling for better utilization</div>
                        <div>• Review capacity vs actual usage</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Room Schedules</CardTitle>
                  <div className="flex gap-2">
                    <Select
                      value={selectedRoom?.id || ""}
                      onValueChange={(value) => setSelectedRoom(rooms.find((r) => r.id === value))}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room.id} value={room.id}>
                            {room.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedRoom ? (
                    <div className="space-y-4">
                      {/* Room Info */}
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="grid gap-2 md:grid-cols-4">
                          <div>
                            <span className="text-muted-foreground">Room:</span>
                            <p className="font-medium">{selectedRoom.name}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Type:</span>
                            <p className="font-medium">
                              {roomTypes.find((rt) => rt.value === selectedRoom.type)?.label}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Capacity:</span>
                            <p className="font-medium">{selectedRoom.capacity} students</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Utilization:</span>
                            <p className="font-medium">{selectedRoom.utilization}%</p>
                          </div>
                        </div>
                      </div>

                      {/* Schedule Table */}
                      {selectedRoom.schedule.length > 0 ? (
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Time</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Teacher</TableHead>
                                <TableHead>Class</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {selectedRoom.schedule.map((period, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{period.time}</TableCell>
                                  <TableCell>{period.subject}</TableCell>
                                  <TableCell>{period.teacher}</TableCell>
                                  <TableCell>{period.class}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          No schedule data available for this room
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">Select a room to view its schedule</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onSave(rooms)}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Search, MapPin, Clock, Users, Edit, Trash2, Eye, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function EventsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      description: "Annual parent-teacher conference to discuss student progress",
      date: "2024-07-20",
      time: "09:00 AM",
      location: "Main Hall",
      type: "Meeting",
      status: "Upcoming",
      attendees: 45,
      organizer: "Dr. Mary Wanjiku",
      capacity: 100,
      registrations: 45,
    },
    {
      id: 2,
      title: "Sports Day",
      description: "Annual sports day with various athletic competitions",
      date: "2024-07-25",
      time: "08:00 AM",
      location: "Sports Ground",
      type: "Sports",
      status: "Upcoming",
      attendees: 120,
      organizer: "Mr. John Kamau",
      capacity: 200,
      registrations: 120,
    },
    {
      id: 3,
      title: "Science Fair",
      description: "Student science project exhibition and competition",
      date: "2024-07-30",
      time: "10:00 AM",
      location: "Science Laboratory",
      type: "Academic",
      status: "Upcoming",
      attendees: 80,
      organizer: "Ms. Sarah Johnson",
      capacity: 150,
      registrations: 80,
    },
    {
      id: 4,
      title: "Staff Development Workshop",
      description: "Professional development workshop for teaching staff",
      date: "2024-08-01",
      time: "02:00 PM",
      location: "Conference Room",
      type: "Training",
      status: "Upcoming",
      attendees: 78,
      organizer: "Dr. Peter Mwangi",
      capacity: 80,
      registrations: 78,
    },
    {
      id: 5,
      title: "Cultural Day",
      description: "Celebration of diverse cultures within our school community",
      date: "2024-06-15",
      time: "09:00 AM",
      location: "School Compound",
      type: "Cultural",
      status: "Completed",
      attendees: 200,
      organizer: "Ms. Grace Akinyi",
      capacity: 250,
      registrations: 200,
    },
    {
      id: 6,
      title: "Mathematics Olympiad",
      description: "Inter-school mathematics competition",
      date: "2024-06-10",
      time: "10:00 AM",
      location: "Classroom Block A",
      type: "Competition",
      status: "Completed",
      attendees: 60,
      organizer: "Mr. David Ochieng",
      capacity: 80,
      registrations: 60,
    },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || event.type.toLowerCase() === selectedFilter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const upcomingEvents = filteredEvents.filter((event) => event.status === "Upcoming")
  const completedEvents = filteredEvents.filter((event) => event.status === "Completed")

  const handleCreateEvent = () => {
    setSelectedEvent(null)
    setShowEventModal(true)
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  const handleDeleteEvent = (eventId) => {
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully.",
    })
  }

  const handleViewEvent = (event) => {
    toast({
      title: "Event Details",
      description: `Viewing details for ${event.title}`,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Upcoming":
        return <Badge variant="default">Upcoming</Badge>
      case "Completed":
        return <Badge variant="secondary">Completed</Badge>
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeBadge = (type) => {
    const colors = {
      Meeting: "bg-blue-100 text-blue-800",
      Sports: "bg-green-100 text-green-800",
      Academic: "bg-purple-100 text-purple-800",
      Training: "bg-orange-100 text-orange-800",
      Cultural: "bg-pink-100 text-pink-800",
      Competition: "bg-yellow-100 text-yellow-800",
    }

    return (
      <Badge variant="outline" className={colors[type] || "bg-gray-100 text-gray-800"}>
        {type}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">Manage school events, meetings, and activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={handleCreateEvent}>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "meeting" ? "default" : "outline"}
                onClick={() => setSelectedFilter("meeting")}
                size="sm"
              >
                Meetings
              </Button>
              <Button
                variant={selectedFilter === "academic" ? "default" : "outline"}
                onClick={() => setSelectedFilter("academic")}
                size="sm"
              >
                Academic
              </Button>
              <Button
                variant={selectedFilter === "sports" ? "default" : "outline"}
                onClick={() => setSelectedFilter("sports")}
                size="sm"
              >
                Sports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Events ({upcomingEvents.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed Events ({completedEvents.length})</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        {/* Upcoming Events */}
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        {getTypeBadge(event.type)}
                        {getStatusBadge(event.status)}
                      </div>
                      <p className="text-muted-foreground mb-3">{event.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {event.registrations}/{event.capacity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {event.organizer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">Organized by {event.organizer}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewEvent(event)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Completed Events */}
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow opacity-75">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        {getTypeBadge(event.type)}
                        {getStatusBadge(event.status)}
                      </div>
                      <p className="text-muted-foreground mb-3">{event.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.attendees} attended</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {event.organizer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">Organized by {event.organizer}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewEvent(event)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Calendar View */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>View events in calendar format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Calendar View Coming Soon</h3>
                <p className="text-muted-foreground">Interactive calendar view will be available in the next update.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

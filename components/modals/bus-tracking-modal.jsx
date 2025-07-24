"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Navigation, Clock, Users, Phone } from "lucide-react"

export default function BusTrackingModal({ bus, onClose }) {
  const [location, setLocation] = useState({
    lat: -1.2921,
    lng: 36.8219,
    speed: 0,
    heading: 0,
    lastUpdate: new Date(),
  })

  const [students, setStudents] = useState([
    { name: "John Doe", status: "Picked Up", time: "07:30 AM" },
    { name: "Jane Smith", status: "Waiting", time: "07:45 AM" },
    { name: "Mike Johnson", status: "Picked Up", time: "07:35 AM" },
  ])

  useEffect(() => {
    // Simulate real-time location updates
    const interval = setInterval(() => {
      setLocation((prev) => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        speed: Math.floor(Math.random() * 60),
        heading: Math.floor(Math.random() * 360),
        lastUpdate: new Date(),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case "Picked Up":
        return "default"
      case "Waiting":
        return "secondary"
      case "Dropped Off":
        return "outline"
      default:
        return "destructive"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Live Bus Tracking - {bus?.plateNumber}
            </CardTitle>
            <CardDescription>Real-time location and student status</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Bus Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-xs text-muted-foreground">
                      {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Navigation className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Speed</p>
                    <p className="text-xs text-muted-foreground">{location.speed} km/h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Last Update</p>
                    <p className="text-xs text-muted-foreground">{location.lastUpdate.toLocaleTimeString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Students</p>
                    <p className="text-xs text-muted-foreground">{students.length} assigned</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Live Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive map would be displayed here</p>
                  <p className="text-sm text-muted-foreground">
                    Current location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Student Status */}
          <Card>
            <CardHeader>
              <CardTitle>Student Status</CardTitle>
              <CardDescription>Real-time pickup and drop-off status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {students.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">Expected: {student.time}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(student.status)}>{student.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Driver Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Driver Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{bus?.driver || "Driver Name"}</p>
                    <p className="text-sm text-muted-foreground">{bus?.driverPhone || "+254712345678"}</p>
                  </div>
                </div>
                <Button size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Driver
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

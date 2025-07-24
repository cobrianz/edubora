"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Plus, X, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RouteModal({ isOpen, onClose, route = null, mode = "add" }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stops: [],
    distance: "",
    duration: "",
    fare: "",
    status: "Active",
    driver: "",
    bus: "",
    startTime: "",
    endTime: "",
    operatingDays: [],
    maxStudents: "",
    notes: "",
  })

  const [newStop, setNewStop] = useState("")

  useEffect(() => {
    if (route && (mode === "edit" || mode === "view")) {
      setFormData({
        name: route.name || "",
        description: route.description || "",
        stops: route.stops || [],
        distance: route.distance || "",
        duration: route.duration || "",
        fare: route.fare?.toString() || "",
        status: route.status || "Active",
        driver: route.driver || "",
        bus: route.bus || "",
        startTime: route.startTime || "",
        endTime: route.endTime || "",
        operatingDays: route.operatingDays || [],
        maxStudents: route.maxStudents?.toString() || "",
        notes: route.notes || "",
      })
    } else {
      setFormData({
        name: "",
        description: "",
        stops: [],
        distance: "",
        duration: "",
        fare: "",
        status: "Active",
        driver: "",
        bus: "",
        startTime: "",
        endTime: "",
        operatingDays: [],
        maxStudents: "",
        notes: "",
      })
    }
  }, [route, mode])

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const drivers = ["John Mwangi", "Mary Wanjiku", "Peter Ochieng", "Grace Akinyi", "David Kimani", "Sarah Njeri"]

  const buses = [
    "KCA 123A - Bus 001",
    "KCB 456B - Bus 002",
    "KCC 789C - Bus 003",
    "KCD 012D - Bus 004",
    "KCE 345E - Bus 005",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addStop = () => {
    if (newStop.trim()) {
      setFormData((prev) => ({
        ...prev,
        stops: [...prev.stops, newStop.trim()],
      }))
      setNewStop("")
    }
  }

  const removeStop = (index) => {
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
    }))
  }

  const toggleOperatingDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      operatingDays: prev.operatingDays.includes(day)
        ? prev.operatingDays.filter((d) => d !== day)
        : [...prev.operatingDays, day],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.stops.length) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const action = mode === "add" ? "created" : "updated"
    toast({
      title: "Success",
      description: `Route ${action} successfully!`,
    })

    onClose()
  }

  const isReadOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {mode === "add" && "Add New Route"}
            {mode === "edit" && "Edit Route"}
            {mode === "view" && "Route Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add" && "Create a new transport route"}
            {mode === "edit" && "Update route information"}
            {mode === "view" && "View route details and information"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Route Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Route A - Westlands"
                disabled={isReadOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Maintenance">Under Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the route..."
              rows={2}
              disabled={isReadOnly}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Route Stops *
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newStop}
                  onChange={(e) => setNewStop(e.target.value)}
                  placeholder="Add stop location..."
                  disabled={isReadOnly}
                />
                <Button type="button" onClick={addStop} disabled={isReadOnly}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.stops.map((stop, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{index + 1}.</span>
                      <span>{stop}</span>
                    </div>
                    {!isReadOnly && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeStop(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distance">Distance</Label>
              <Input
                id="distance"
                value={formData.distance}
                onChange={(e) => handleInputChange("distance", e.target.value)}
                placeholder="e.g., 15 km"
                disabled={isReadOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 45 minutes"
                disabled={isReadOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fare">Monthly Fare (KES)</Label>
              <Input
                id="fare"
                type="number"
                value={formData.fare}
                onChange={(e) => handleInputChange("fare", e.target.value)}
                placeholder="e.g., 3000"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driver">Assigned Driver</Label>
              <Select
                value={formData.driver}
                onValueChange={(value) => handleInputChange("driver", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver} value={driver}>
                      {driver}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bus">Assigned Bus</Label>
              <Select
                value={formData.bus}
                onValueChange={(value) => handleInputChange("bus", value)}
                disabled={isReadOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bus" />
                </SelectTrigger>
                <SelectContent>
                  {buses.map((bus) => (
                    <SelectItem key={bus} value={bus}>
                      {bus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                disabled={isReadOnly}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxStudents">Max Students</Label>
              <Input
                id="maxStudents"
                type="number"
                value={formData.maxStudents}
                onChange={(e) => handleInputChange("maxStudents", e.target.value)}
                placeholder="e.g., 45"
                disabled={isReadOnly}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Operating Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {weekDays.map((day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={formData.operatingDays.includes(day) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleOperatingDay(day)}
                    disabled={isReadOnly}
                    className="justify-start"
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any additional information about the route..."
              rows={3}
              disabled={isReadOnly}
            />
          </div>

          {mode === "view" && route && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Route Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{route.students || 0}</div>
                    <div className="text-sm text-muted-foreground">Current Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">KES {route.fare?.toLocaleString() || 0}</div>
                    <div className="text-sm text-muted-foreground">Monthly Fare</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{route.stops?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Total Stops</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!isReadOnly && (
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{mode === "add" ? "Create Route" : "Update Route"}</Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

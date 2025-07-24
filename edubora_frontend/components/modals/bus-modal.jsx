"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Save, Bus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BusModal({ bus, onClose, onSave }) {
  const [formData, setFormData] = useState({
    plateNumber: "",
    capacity: "",
    driver: "",
    driverPhone: "",
    route: "",
    status: "Active",
    fuelType: "",
    insuranceExpiry: "",
    lastMaintenance: "",
    nextMaintenance: "",
    gpsTracker: "",
    notes: "",
  })

  useEffect(() => {
    if (bus) {
      setFormData({
        plateNumber: bus.plateNumber || "",
        capacity: bus.capacity?.toString() || "",
        driver: bus.driver || "",
        driverPhone: bus.driverPhone || "",
        route: bus.route || "",
        status: bus.status || "Active",
        fuelType: bus.fuelType || "",
        insuranceExpiry: bus.insuranceExpiry || "",
        lastMaintenance: bus.lastMaintenance || "",
        nextMaintenance: bus.nextMaintenance || "",
        gpsTracker: bus.gpsTracker || "",
        notes: bus.notes || "",
      })
    }
  }, [bus])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: bus?.id || Date.now(),
      capacity: Number.parseInt(formData.capacity),
    })
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-5 w-5" />
              {bus ? "Edit Bus" : "Add New Bus"}
            </CardTitle>
            <CardDescription>{bus ? "Update bus information" : "Register a new school bus"}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="driver">Driver Details</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="tracking">GPS & Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plateNumber">Plate Number *</Label>
                    <Input
                      id="plateNumber"
                      value={formData.plateNumber}
                      onChange={(e) => handleChange("plateNumber", e.target.value)}
                      placeholder="e.g., KCA 123A"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Seating Capacity *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleChange("capacity", e.target.value)}
                      placeholder="e.g., 45"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="route">Assigned Route</Label>
                    <Select value={formData.route} onValueChange={(value) => handleChange("route", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select route" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Route A - Westlands">Route A - Westlands</SelectItem>
                        <SelectItem value="Route B - Eastlands">Route B - Eastlands</SelectItem>
                        <SelectItem value="Route C - South B">Route C - South B</SelectItem>
                        <SelectItem value="Route D - Karen">Route D - Karen</SelectItem>
                        <SelectItem value="Route E - Kasarani">Route E - Kasarani</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Maintenance">Under Maintenance</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select value={formData.fuelType} onValueChange={(value) => handleChange("fuelType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
                    <Input
                      id="insuranceExpiry"
                      type="date"
                      value={formData.insuranceExpiry}
                      onChange={(e) => handleChange("insuranceExpiry", e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="driver" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver">Driver Name *</Label>
                    <Input
                      id="driver"
                      value={formData.driver}
                      onChange={(e) => handleChange("driver", e.target.value)}
                      placeholder="Enter driver's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driverPhone">Driver Phone *</Label>
                    <Input
                      id="driverPhone"
                      value={formData.driverPhone}
                      onChange={(e) => handleChange("driverPhone", e.target.value)}
                      placeholder="+254712345678"
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastMaintenance">Last Maintenance</Label>
                    <Input
                      id="lastMaintenance"
                      type="date"
                      value={formData.lastMaintenance}
                      onChange={(e) => handleChange("lastMaintenance", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextMaintenance">Next Maintenance</Label>
                    <Input
                      id="nextMaintenance"
                      type="date"
                      value={formData.nextMaintenance}
                      onChange={(e) => handleChange("nextMaintenance", e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tracking" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="gpsTracker">GPS Tracker ID</Label>
                    <Input
                      id="gpsTracker"
                      value={formData.gpsTracker}
                      onChange={(e) => handleChange("gpsTracker", e.target.value)}
                      placeholder="Enter GPS device ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      placeholder="Any additional information about the bus"
                      rows={4}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="transition-all duration-300 hover:scale-105">
                <Save className="mr-2 h-4 w-4" />
                {bus ? "Update Bus" : "Add Bus"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

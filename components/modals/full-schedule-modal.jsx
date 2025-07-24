"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addDays, startOfWeek, isSameDay } from "date-fns"

export default function FullScheduleModal({ isOpen, onClose, sessions = [] }) {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }) // Monday start

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const getSessionsForDay = (date) => {
    return sessions.filter((session) => isSameDay(new Date(session.date), date))
  }

  const navigateWeek = (direction) => {
    setCurrentWeek((prev) => addDays(prev, direction * 7))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Ongoing":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Full Activity Schedule
          </DialogTitle>
          <DialogDescription>Weekly view of all co-curricular activity sessions</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Week Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigateWeek(-1)}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous Week
            </Button>
            <h3 className="text-lg font-semibold">
              {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}
            </h3>
            <Button variant="outline" onClick={() => navigateWeek(1)}>
              Next Week
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Weekly Calendar Grid */}
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day, index) => {
              const daySessions = getSessionsForDay(day)
              const isToday = isSameDay(day, new Date())

              return (
                <Card
                  key={index}
                  className={`min-h-[300px] transition-all duration-300 hover:shadow-lg ${
                    isToday ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-center">
                      <div className="font-medium">{format(day, "EEE")}</div>
                      <div className={`text-lg ${isToday ? "text-blue-600 font-bold" : "text-muted-foreground"}`}>
                        {format(day, "d")}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {daySessions.length === 0 ? (
                      <div className="text-center text-muted-foreground text-sm py-4">No sessions</div>
                    ) : (
                      daySessions.map((session) => (
                        <div
                          key={session.id}
                          className={`p-2 rounded-lg border-l-4 border-blue-500 ${getStatusColor(session.status)} transition-all duration-200 hover:shadow-sm cursor-pointer`}
                        >
                          <div className="font-medium text-sm truncate">{session.title}</div>
                          <div className="flex items-center gap-1 text-xs mt-1">
                            <Clock className="h-3 w-3" />
                            {session.startTime} - {session.endTime}
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <MapPin className="h-3 w-3" />
                            {session.venue}
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Users className="h-3 w-3" />
                            {session.registered}/{session.maxParticipants}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {session.activity}
                          </Badge>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Status Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-100 border-l-4 border-blue-500"></div>
                  <span className="text-sm">Scheduled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-100 border-l-4 border-green-500"></div>
                  <span className="text-sm">Ongoing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-100 border-l-4 border-gray-500"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100 border-l-4 border-red-500"></div>
                  <span className="text-sm">Cancelled</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

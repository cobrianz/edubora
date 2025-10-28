"use client"

import { Search, Trash2, Archive } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MessagesHeader({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterStatusChange,
  filterType,
  onFilterTypeChange,
  filterPriority,
  onFilterPriorityChange,
  selectedCount,
  onBulkDelete,
  onBulkArchive,
}) {
  return (
    <div className="border-b bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage all school communications</p>
        </div>
        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">{selectedCount} selected</span>
            <Button variant="outline" size="sm" onClick={onBulkArchive} className="gap-2 bg-transparent">
              <Archive className="w-4 h-4" />
              Archive
            </Button>
            <Button variant="destructive" size="sm" onClick={onBulkDelete} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search messages by subject, sender, or content..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          <Select value={filterStatus} onValueChange={onFilterStatusChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={onFilterTypeChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="notification">In-App Notification</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterPriority} onValueChange={onFilterPriorityChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

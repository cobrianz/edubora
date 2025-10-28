"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { AlertCircle } from "lucide-react"

export default function MessagesList({
  messages,
  selectedMessages,
  onSelectMessage,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  isLoading,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "read":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "scheduled":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "archived":
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 dark:text-red-400"
      case "high":
        return "text-orange-600 dark:text-orange-400"
      case "normal":
        return "text-blue-600 dark:text-blue-400"
      case "low":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-gray-600"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "email":
        return "✉️"
      case "sms":
        return "💬"
      case "notification":
        return "🔔"
      default:
        return "📧"
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading messages...</p>
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium text-foreground">No messages found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  const allSelected = messages.length > 0 && selectedMessages.length === messages.length

  return (
    <div className="space-y-2">
      {/* Select All Header */}
      <div className="flex items-center gap-3 px-4 py-2 border-b">
        <Checkbox
          checked={allSelected}
          onCheckedChange={(checked) => {
            if (checked) {
              onSelectAll()
            } else {
              onDeselectAll()
            }
          }}
        />
        <span className="text-xs text-muted-foreground">
          {selectedMessages.length} of {messages.length} selected
        </span>
      </div>

      {/* Messages List */}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
            selectedMessages.includes(message.id) ? "bg-accent/50 border-primary" : "hover:bg-muted/50 border-border"
          } ${message.status === "unread" ? "bg-blue-50 dark:bg-blue-950/20" : ""}`}
          onClick={() => onSelectMessage(message)}
        >
          <Checkbox
            checked={selectedMessages.includes(message.id)}
            onCheckedChange={() => onToggleSelect(message.id)}
            onClick={(e) => e.stopPropagation()}
          />

          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={message.from.avatar || "/placeholder.svg"} alt={message.from.name} />
            <AvatarFallback>{message.from.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-medium text-foreground truncate">{message.from.name}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{message.from.role}</span>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
              </span>
            </div>

            <p className="text-sm text-foreground font-medium truncate mb-2">{message.subject}</p>

            <p className="text-sm text-muted-foreground truncate mb-2">{message.message.substring(0, 100)}...</p>

            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-lg ${getPriorityColor(message.priority)}`}>
                {message.priority === "urgent" && "🔴"}
                {message.priority === "high" && "🟠"}
                {message.priority === "normal" && "🔵"}
                {message.priority === "low" && "🟢"}
              </span>
              <Badge variant="secondary" className={getStatusColor(message.status)}>
                {message.status}
              </Badge>
              <span className="text-sm">{getTypeIcon(message.type)}</span>
              {message.attachments.length > 0 && (
                <span className="text-xs text-muted-foreground">📎 {message.attachments.length}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

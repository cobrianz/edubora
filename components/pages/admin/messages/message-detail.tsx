"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { MoreVertical, Trash2, Archive, Reply, Download } from "lucide-react"

export default function MessageDetail({ message, onDelete, onArchive, onReply }) {
  const [isExpanded, setIsExpanded] = useState(true)

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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "normal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{message.subject}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onArchive}>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={getPriorityColor(message.priority)}>
              {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)} Priority
            </Badge>
            <Badge variant="secondary" className={getStatusColor(message.status)}>
              {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
            </Badge>
            <Badge variant="outline">
              {message.type === "email" && "📧 Email"}
              {message.type === "sms" && "💬 SMS"}
              {message.type === "notification" && "🔔 Notification"}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* From/To */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">From</p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={message.from.avatar || "/placeholder.svg"} alt={message.from.name} />
                <AvatarFallback>{message.from.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{message.from.name}</p>
                <p className="text-sm text-muted-foreground">{message.from.email}</p>
                <p className="text-xs text-muted-foreground">{message.from.role}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">To</p>
            <div className="space-y-2">
              {message.to.map((recipient, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{recipient.name}</p>
                    <p className="text-xs text-muted-foreground">{recipient.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Message Content */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">Message</p>
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-foreground whitespace-pre-wrap">
            {message.message}
          </div>
        </div>

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                Attachments ({message.attachments.length})
              </p>
              <div className="space-y-2">
                {message.attachments.map((attachment, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📎</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{attachment.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Scheduled Date */}
        {message.scheduledDate && (
          <>
            <Separator />
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Scheduled For</p>
              <p className="text-sm text-foreground">{new Date(message.scheduledDate).toLocaleString()}</p>
            </div>
          </>
        )}

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={onReply} className="flex-1 gap-2">
            <Reply className="w-4 h-4" />
            Reply
          </Button>
          <Button variant="outline" onClick={onArchive} className="gap-2 bg-transparent">
            <Archive className="w-4 h-4" />
            Archive
          </Button>
          <Button variant="destructive" onClick={onDelete} className="gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}

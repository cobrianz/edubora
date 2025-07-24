"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Trash2, X } from "lucide-react"

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, description, type = "default" }) {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case "delete":
        return <Trash2 className="h-6 w-6 text-red-600" />
      default:
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />
    }
  }

  const getButtonVariant = () => {
    switch (type) {
      case "delete":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-md animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={getButtonVariant()}
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="transition-all duration-300 hover:scale-105"
            >
              {type === "delete" ? "Delete" : "Confirm"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
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
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, AlertTriangle, FileText } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function WelfareCaseModal({ isOpen, onClose, mode = "add", caseData = null }) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    studentName: caseData?.studentName || "",
    admissionNo: caseData?.admissionNo || "",
    class: caseData?.class || "",
    category: caseData?.category || "",
    issue: caseData?.issue || "",
    priority: caseData?.priority || "Medium",
    assignedTo: caseData?.assignedTo || "",
    description: caseData?.description || "",
    reportedDate: caseData?.reportedDate ? new Date(caseData.reportedDate) : new Date(),
    status: caseData?.status || "Active",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (mode === "add") {
      toast({
        title: "Case Added",
        description: `Welfare case for ${formData.studentName} has been created successfully.`,
      })
    } else if (mode === "edit") {
      toast({
        title: "Case Updated",
        description: `Welfare case for ${formData.studentName} has been updated successfully.`,
      })
    }

    onClose()
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "view" ? <FileText className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            {mode === "add" ? "Add New Welfare Case" : mode === "edit" ? "Edit Welfare Case" : "Case Details"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Create a new welfare case for student support and tracking."
              : mode === "edit"
                ? "Update the welfare case information."
                : "View detailed information about this welfare case."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name *</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => handleInputChange("studentName", e.target.value)}
                placeholder="Enter student name"
                disabled={mode === "view"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admissionNo">Admission Number *</Label>
              <Input
                id="admissionNo"
                value={formData.admissionNo}
                onChange={(e) => handleInputChange("admissionNo", e.target.value)}
                placeholder="Enter admission number"
                disabled={mode === "view"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select
                value={formData.class}
                onValueChange={(value) => handleInputChange("class", value)}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 1A">Grade 1A</SelectItem>
                  <SelectItem value="Grade 1B">Grade 1B</SelectItem>
                  <SelectItem value="Grade 2A">Grade 2A</SelectItem>
                  <SelectItem value="Grade 2B">Grade 2B</SelectItem>
                  <SelectItem value="Grade 3A">Grade 3A</SelectItem>
                  <SelectItem value="Grade 3B">Grade 3B</SelectItem>
                  <SelectItem value="Grade 4A">Grade 4A</SelectItem>
                  <SelectItem value="Grade 4B">Grade 4B</SelectItem>
                  <SelectItem value="Grade 5A">Grade 5A</SelectItem>
                  <SelectItem value="Grade 5B">Grade 5B</SelectItem>
                  <SelectItem value="Grade 6A">Grade 6A</SelectItem>
                  <SelectItem value="Grade 6B">Grade 6B</SelectItem>
                  <SelectItem value="Grade 7A">Grade 7A</SelectItem>
                  <SelectItem value="Grade 7B">Grade 7B</SelectItem>
                  <SelectItem value="Grade 8A">Grade 8A</SelectItem>
                  <SelectItem value="Grade 8B">Grade 8B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Counseling">Counseling</SelectItem>
                  <SelectItem value="Social">Social</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Behavioral">Behavioral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange("priority", value)}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To *</Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(value) => handleInputChange("assignedTo", value)}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="School Nurse">School Nurse</SelectItem>
                  <SelectItem value="School Counselor">School Counselor</SelectItem>
                  <SelectItem value="Deputy Head">Deputy Head</SelectItem>
                  <SelectItem value="Welfare Officer">Welfare Officer</SelectItem>
                  <SelectItem value="Class Teacher">Class Teacher</SelectItem>
                  <SelectItem value="Social Worker">Social Worker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportedDate">Reported Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.reportedDate && "text-muted-foreground",
                    )}
                    disabled={mode === "view"}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.reportedDate ? format(formData.reportedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.reportedDate}
                    onSelect={(date) => handleInputChange("reportedDate", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
                disabled={mode === "view"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue">Issue Summary *</Label>
            <Input
              id="issue"
              value={formData.issue}
              onChange={(e) => handleInputChange("issue", e.target.value)}
              placeholder="Brief description of the issue"
              disabled={mode === "view"}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Provide detailed information about the case..."
              rows={4}
              disabled={mode === "view"}
            />
          </div>

          {mode === "view" && (
            <div className="flex gap-2 pt-4">
              <Badge
                variant={
                  formData.priority === "Critical" || formData.priority === "High"
                    ? "destructive"
                    : formData.priority === "Medium"
                      ? "secondary"
                      : "outline"
                }
              >
                {formData.priority} Priority
              </Badge>
              <Badge variant={formData.status === "Resolved" || formData.status === "Closed" ? "default" : "secondary"}>
                {formData.status}
              </Badge>
              <Badge variant="outline">{formData.category}</Badge>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === "view" ? "Close" : "Cancel"}
            </Button>
            {mode !== "view" && <Button type="submit">{mode === "add" ? "Create Case" : "Update Case"}</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

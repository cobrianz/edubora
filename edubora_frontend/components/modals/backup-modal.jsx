"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { X, Download, Upload, Database, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function BackupModal({ onClose }) {
  const { toast } = useToast()
  const [backupProgress, setBackupProgress] = useState(0)
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [isRestoring, setIsRestoring] = useState(false)

  const backupHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "02:00 AM",
      size: "2.4 GB",
      type: "Automatic",
      status: "Success",
    },
    {
      id: 2,
      date: "2024-01-14",
      time: "02:00 AM",
      size: "2.3 GB",
      type: "Automatic",
      status: "Success",
    },
    {
      id: 3,
      date: "2024-01-13",
      time: "10:30 AM",
      size: "2.3 GB",
      type: "Manual",
      status: "Success",
    },
    {
      id: 4,
      date: "2024-01-12",
      time: "02:00 AM",
      size: "2.2 GB",
      type: "Automatic",
      status: "Failed",
    },
  ]

  const handleBackup = async () => {
    setIsBackingUp(true)
    setBackupProgress(0)

    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsBackingUp(false)
          toast({
            title: "Backup Complete",
            description: "System backup has been created successfully",
          })
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handleRestore = async (backupId) => {
    setIsRestoring(true)

    // Simulate restore process
    setTimeout(() => {
      setIsRestoring(false)
      toast({
        title: "Restore Complete",
        description: "System has been restored from backup",
      })
    }, 3000)
  }

  const handleDownload = (backupId) => {
    toast({
      title: "Download Started",
      description: "Backup file download has started",
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "Success":
        return "default"
      case "Failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in-50 duration-300">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Backup & Restore
            </CardTitle>
            <CardDescription>Manage system backups and data restoration</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Backup Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create Backup</CardTitle>
                <CardDescription>Generate a complete system backup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isBackingUp ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Backup Progress</span>
                      <span>{backupProgress}%</span>
                    </div>
                    <Progress value={backupProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Creating backup... This may take several minutes.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Last backup:</strong> January 15, 2024 at 2:00 AM
                      </p>
                      <p>
                        <strong>Backup size:</strong> ~2.4 GB
                      </p>
                      <p>
                        <strong>Estimated time:</strong> 5-10 minutes
                      </p>
                    </div>
                    <Button onClick={handleBackup} className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Create Backup Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Backup</CardTitle>
                <CardDescription>Restore from an external backup file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drop backup file here or click to browse</p>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Supported formats: .sql, .zip, .tar.gz (Max size: 5GB)</p>
              </CardContent>
            </Card>
          </div>

          {/* Backup History */}
          <Card>
            <CardHeader>
              <CardTitle>Backup History</CardTitle>
              <CardDescription>Previous backups and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {backupHistory.map((backup) => (
                  <div
                    key={backup.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(backup.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">
                            {backup.date} at {backup.time}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {backup.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Size: {backup.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusVariant(backup.status)}>{backup.status}</Badge>
                      {backup.status === "Success" && (
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" onClick={() => handleDownload(backup.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRestore(backup.id)}
                            disabled={isRestoring}
                          >
                            {isRestoring ? <Clock className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Backup Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Backup Settings</CardTitle>
              <CardDescription>Configure automatic backup preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Backup Frequency</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="daily">Daily at 2:00 AM</option>
                    <option value="weekly">Weekly on Sunday</option>
                    <option value="monthly">Monthly on 1st</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Retention Period</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="7">Keep for 7 days</option>
                    <option value="30">Keep for 30 days</option>
                    <option value="90">Keep for 90 days</option>
                    <option value="365">Keep for 1 year</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Backup Location</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="local">Local Storage</option>
                    <option value="cloud">Cloud Storage</option>
                    <option value="both">Both Local & Cloud</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Compression</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="gzip">GZIP Compression</option>
                    <option value="zip">ZIP Compression</option>
                    <option value="none">No Compression</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button>
                  <Database className="mr-2 h-4 w-4" />
                  Save Backup Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}

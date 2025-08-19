"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  CheckSquare,
  X,
  Download,
  Upload,
  Users,
  School,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface BulkOperationsProps {
  userRole: "global-admin" | "country-admin" | "state-admin"
  onClose?: () => void
}

interface BulkItem {
  id: string
  type: "school" | "user" | "application"
  name: string
  location?: string
  status: string
  selected: boolean
}

export function BulkOperations({ userRole, onClose }: BulkOperationsProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [bulkAction, setBulkAction] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [bulkMessage, setBulkMessage] = useState("")
  const [newStatus, setNewStatus] = useState("")

  // Mock data for bulk operations
  const [items, setItems] = useState<BulkItem[]>([
    {
      id: "1",
      type: "school",
      name: "Madrasa Al-Barakah",
      location: "Lagos, Nigeria",
      status: "pending",
      selected: false,
    },
    {
      id: "2",
      type: "school",
      name: "Dar Al-Uloom Cairo",
      location: "Cairo, Egypt",
      status: "pending",
      selected: false,
    },
    {
      id: "3",
      type: "user",
      name: "Dr. Ahmed Hassan",
      location: "Abuja, Nigeria",
      status: "active",
      selected: false,
    },
    {
      id: "4",
      type: "application",
      name: "Al-Noor Institute Application",
      location: "Gombe, Nigeria",
      status: "under-review",
      selected: false,
    },
    {
      id: "5",
      type: "school",
      name: "Islamic Center Kano",
      location: "Kano, Nigeria",
      status: "pending",
      selected: false,
    },
  ])

  const handleSelectItem = (itemId: string, checked: boolean) => {
    setItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, selected: checked } : item)))

    if (checked) {
      setSelectedItems((prev) => [...prev, itemId])
    } else {
      setSelectedItems((prev) => prev.filter((id) => id !== itemId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: checked })))
    setSelectedItems(checked ? items.map((item) => item.id) : [])
  }

  const executeBulkAction = async () => {
    if (!bulkAction || selectedItems.length === 0) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate bulk operation progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setProgress(i)
    }

    // TODO: Implement actual bulk operations
    console.log("[v0] Executing bulk action:", {
      action: bulkAction,
      items: selectedItems,
      message: bulkMessage,
      newStatus,
    })

    // Update items based on action
    if (bulkAction === "approve" || bulkAction === "reject" || bulkAction === "suspend") {
      setItems((prev) =>
        prev.map((item) =>
          selectedItems.includes(item.id)
            ? {
                ...item,
                status: bulkAction === "approve" ? "approved" : bulkAction === "reject" ? "rejected" : "suspended",
              }
            : item,
        ),
      )
    }

    setIsProcessing(false)
    setSelectedItems([])
    setBulkAction("")
    setBulkMessage("")
    setNewStatus("")

    alert(`Bulk operation completed successfully for ${selectedItems.length} items!`)
  }

  const bulkActions = [
    { value: "approve", label: "Approve Selected", icon: CheckCircle, color: "text-green-600" },
    { value: "reject", label: "Reject Selected", icon: X, color: "text-red-600" },
    { value: "suspend", label: "Suspend Selected", icon: AlertTriangle, color: "text-yellow-600" },
    { value: "message", label: "Send Message", icon: MessageSquare, color: "text-blue-600" },
    { value: "export", label: "Export Data", icon: Download, color: "text-purple-600" },
    { value: "delete", label: "Delete Selected", icon: X, color: "text-red-600" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "suspended":
        return "bg-orange-100 text-orange-700"
      case "active":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const selectedCount = selectedItems.length
  const totalCount = items.length

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Bulk Operations
              </CardTitle>
              <CardDescription>
                Manage multiple items at once - {selectedCount} of {totalCount} selected
              </CardDescription>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="operations" className="w-full">
            <div className="px-6 pb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="operations">Bulk Operations</TabsTrigger>
                <TabsTrigger value="import">Import Data</TabsTrigger>
                <TabsTrigger value="export">Export Data</TabsTrigger>
              </TabsList>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              <TabsContent value="operations" className="px-6 pb-6">
                <div className="space-y-6">
                  {/* Selection Controls */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={selectedCount === totalCount && totalCount > 0}
                        onCheckedChange={handleSelectAll}
                      />
                      <span className="font-medium">
                        Select All ({selectedCount}/{totalCount})
                      </span>
                    </div>

                    {selectedCount > 0 && (
                      <div className="flex items-center gap-2">
                        <Select value={bulkAction} onValueChange={setBulkAction}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Choose action..." />
                          </SelectTrigger>
                          <SelectContent>
                            {bulkActions.map((action) => (
                              <SelectItem key={action.value} value={action.value}>
                                <div className="flex items-center gap-2">
                                  <action.icon className={`h-4 w-4 ${action.color}`} />
                                  {action.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Button
                          onClick={executeBulkAction}
                          disabled={!bulkAction || isProcessing}
                          variant={bulkAction === "delete" || bulkAction === "reject" ? "destructive" : "default"}
                        >
                          {isProcessing ? "Processing..." : "Execute"}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Additional Options for Specific Actions */}
                  {bulkAction === "message" && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Compose Message</CardTitle>
                        <CardDescription>Send a message to all selected items</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bulkMessage">Message Content</Label>
                          <Textarea
                            id="bulkMessage"
                            value={bulkMessage}
                            onChange={(e) => setBulkMessage(e.target.value)}
                            placeholder="Enter your message here..."
                            rows={4}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Progress Bar */}
                  {isProcessing && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Processing bulk operation...</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Items List */}
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-4 p-4 border rounded-lg transition-colors ${
                          item.selected ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                        }`}
                      >
                        <Checkbox
                          checked={item.selected}
                          onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                        />

                        <div className="p-2 bg-primary/10 rounded-full">
                          {item.type === "school" && <School className="h-4 w-4 text-primary" />}
                          {item.type === "user" && <Users className="h-4 w-4 text-primary" />}
                          {item.type === "application" && <CheckSquare className="h-4 w-4 text-primary" />}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          {item.location && <p className="text-sm text-gray-600">{item.location}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getStatusColor(item.status)}`}>{item.status}</Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="import" className="px-6 pb-6">
                <div className="space-y-6">
                  <Alert>
                    <Upload className="h-4 w-4" />
                    <AlertDescription>
                      Import data from CSV or Excel files. Make sure your file follows the required format.
                    </AlertDescription>
                  </Alert>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Import Schools</CardTitle>
                      <CardDescription>Upload a CSV file with school information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">Drop CSV file here</p>
                        <p className="text-gray-600 mb-4">or</p>
                        <Button variant="outline">Browse Files</Button>
                        <p className="text-xs text-gray-500 mt-4">
                          Supported: CSV, Excel • Max 10MB • Required columns: name, location, contact
                        </p>
                      </div>
                      <Button className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Schools
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Import Users</CardTitle>
                      <CardDescription>Upload a CSV file with user information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Users
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="export" className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Export Schools</CardTitle>
                        <CardDescription>Download all school data</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Export Format</Label>
                          <Select defaultValue="csv">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="json">JSON</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Export Schools
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Export Users</CardTitle>
                        <CardDescription>Download all user data</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Export Format</Label>
                          <Select defaultValue="csv">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="csv">CSV</SelectItem>
                              <SelectItem value="excel">Excel</SelectItem>
                              <SelectItem value="json">JSON</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Export Users
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Export Donations</CardTitle>
                        <CardDescription>Download donation records</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Export Donations
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Export Events</CardTitle>
                        <CardDescription>Download event data</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Export Events
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

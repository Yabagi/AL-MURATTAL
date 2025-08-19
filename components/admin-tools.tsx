"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, School, MessageSquare, Download, Upload, Activity } from "lucide-react"

interface AdminToolsProps {
  userRole: "global-admin" | "country-admin" | "state-admin" | "lga-admin"
  onClose?: () => void
}

export function AdminTools({ userRole, onClose }: AdminToolsProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [bulkAction, setBulkAction] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [messageRecipients, setMessageRecipients] = useState("")

  // Mock data for different entities
  const mockSchools = [
    { id: "1", name: "Madrasa Al-Barakah", location: "Lagos, Nigeria", status: "pending", students: 150 },
    { id: "2", name: "Dar Al-Uloom Cairo", location: "Cairo, Egypt", status: "approved", students: 320 },
    { id: "3", name: "Islamic Academy Karachi", location: "Karachi, Pakistan", status: "pending", students: 280 },
  ]

  const mockUsers = [
    { id: "1", name: "Ibrahim Musa", role: "School Admin", email: "ibrahim@school.edu", status: "active" },
    { id: "2", name: "Ahmed Hassan", role: "Teacher", email: "ahmed@school.edu", status: "active" },
    { id: "3", name: "Fatima Ali", role: "Parent", email: "fatima@email.com", status: "inactive" },
  ]

  const mockAuditLogs = [
    {
      id: "1",
      action: "School Approved",
      user: "Country Admin",
      timestamp: "2024-03-15 10:30",
      details: "Approved Madrasa Al-Barakah",
    },
    {
      id: "2",
      action: "User Created",
      user: "State Admin",
      timestamp: "2024-03-15 09:15",
      details: "Created new teacher account",
    },
    {
      id: "3",
      action: "Donation Received",
      user: "System",
      timestamp: "2024-03-15 08:45",
      details: "$500 donation from anonymous donor",
    },
  ]

  const handleItemSelect = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleBulkAction = () => {
    if (!bulkAction || selectedItems.length === 0) return

    // Simulate bulk action
    console.log(`Performing ${bulkAction} on items:`, selectedItems)
    setSelectedItems([])
    setBulkAction("")
  }

  const handleSendMessage = () => {
    if (!messageContent || !messageRecipients) return

    // Simulate sending message
    console.log(`Sending message to ${messageRecipients}:`, messageContent)
    setMessageContent("")
    setMessageRecipients("")
  }

  const renderBulkOperations = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Bulk Operations</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select multiple items and perform bulk actions to manage your network efficiently.
        </p>
      </div>

      <Tabs defaultValue="schools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="schools">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                School Management
              </CardTitle>
              <CardDescription>Manage multiple schools at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Select value={bulkAction} onValueChange={setBulkAction}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approve">Approve Selected</SelectItem>
                      <SelectItem value="reject">Reject Selected</SelectItem>
                      <SelectItem value="suspend">Suspend Selected</SelectItem>
                      <SelectItem value="export">Export Data</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleBulkAction} disabled={!bulkAction || selectedItems.length === 0}>
                    Apply to {selectedItems.length} items
                  </Button>
                </div>

                <div className="space-y-2">
                  {mockSchools.map((school) => (
                    <div key={school.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedItems.includes(school.id)}
                          onCheckedChange={() => handleItemSelect(school.id)}
                        />
                        <div>
                          <p className="font-medium">{school.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {school.location} • {school.students} students
                          </p>
                        </div>
                      </div>
                      <Badge variant={school.status === "approved" ? "default" : "secondary"}>{school.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Manage multiple users at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Select value={bulkAction} onValueChange={setBulkAction}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activate">Activate Selected</SelectItem>
                      <SelectItem value="deactivate">Deactivate Selected</SelectItem>
                      <SelectItem value="reset-password">Reset Passwords</SelectItem>
                      <SelectItem value="send-notification">Send Notification</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleBulkAction} disabled={!bulkAction || selectedItems.length === 0}>
                    Apply to {selectedItems.length} items
                  </Button>
                </div>

                <div className="space-y-2">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedItems.includes(user.id)}
                          onCheckedChange={() => handleItemSelect(user.id)}
                        />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.role} • {user.email}
                          </p>
                        </div>
                      </div>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderDataManagement = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Data Management</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Import and export data, generate reports, and manage system data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export Data
            </CardTitle>
            <CardDescription>Download data in various formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schools">Schools Data</SelectItem>
                  <SelectItem value="users">Users Data</SelectItem>
                  <SelectItem value="donations">Donations Data</SelectItem>
                  <SelectItem value="events">Events Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Import Data
            </CardTitle>
            <CardDescription>Upload data from external sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schools">Schools Data</SelectItem>
                  <SelectItem value="users">Users Data</SelectItem>
                  <SelectItem value="students">Students Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drag and drop your file here, or click to browse</p>
            </div>
            <Button className="w-full bg-transparent" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAuditLogs = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Audit Logs</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Track all system activities and user actions for compliance and security.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Activity
          </CardTitle>
          <CardDescription>Recent system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Search logs..." className="flex-1" />
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="approvals">Approvals</SelectItem>
                  <SelectItem value="users">User Actions</SelectItem>
                  <SelectItem value="donations">Donations</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              {mockAuditLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-primary rounded-full" />
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{log.user}</p>
                    <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMessaging = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Bulk Messaging</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Send announcements and messages to multiple users or groups.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Send Announcement
          </CardTitle>
          <CardDescription>Broadcast messages to your network</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Recipients</Label>
            <Select value={messageRecipients} onValueChange={setMessageRecipients}>
              <SelectTrigger>
                <SelectValue placeholder="Select recipients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-schools">All Schools</SelectItem>
                <SelectItem value="pending-schools">Pending Schools</SelectItem>
                <SelectItem value="all-admins">All Administrators</SelectItem>
                <SelectItem value="teachers">All Teachers</SelectItem>
                <SelectItem value="parents">All Parents</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Enter your message here..."
              rows={4}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSendMessage} disabled={!messageContent || !messageRecipients}>
              Send Message
            </Button>
            <Button variant="outline">Save Draft</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Administrative Tools</h2>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      <Tabs defaultValue="bulk-operations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bulk-operations">Bulk Operations</TabsTrigger>
          <TabsTrigger value="data-management">Data Management</TabsTrigger>
          <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
        </TabsList>

        <TabsContent value="bulk-operations">{renderBulkOperations()}</TabsContent>

        <TabsContent value="data-management">{renderDataManagement()}</TabsContent>

        <TabsContent value="audit-logs">{renderAuditLogs()}</TabsContent>

        <TabsContent value="messaging">{renderMessaging()}</TabsContent>
      </Tabs>
    </div>
  )
}

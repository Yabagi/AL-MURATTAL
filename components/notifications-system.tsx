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
import { Switch } from "@/components/ui/switch"
import { Send, Globe, MapPin, School, AlertTriangle, CheckCircle, Info, MessageSquare } from "lucide-react"

interface NotificationsSystemProps {
  userRole: "global-admin" | "country-admin" | "state-admin" | "school-admin"
  onClose?: () => void
}

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "announcement"
  scope: "global" | "country" | "state" | "school"
  target?: string
  sender: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
}

export function NotificationsSystem({ userRole, onClose }: NotificationsSystemProps) {
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info" as const,
    scope: "global" as const,
    target: "",
    priority: "medium" as const,
    pushNotification: true,
    emailNotification: false,
  })

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: "1",
      title: "New School Verification Required",
      message: "Madrasa Al-Barakah in Lagos has submitted KYS application for review.",
      type: "info",
      scope: "country",
      target: "Nigeria",
      sender: "System",
      timestamp: "2024-03-15T10:30:00Z",
      read: false,
      priority: "medium",
    },
    {
      id: "2",
      title: "Donation Milestone Reached",
      message: "Global donations have reached $2.4M this quarter. Thank you to all contributors!",
      type: "success",
      scope: "global",
      sender: "Global Admin",
      timestamp: "2024-03-14T15:45:00Z",
      read: true,
      priority: "low",
    },
    {
      id: "3",
      title: "Urgent: Funding Gap Alert",
      message: "12 schools are below 40% funding target. Immediate attention required.",
      type: "warning",
      scope: "global",
      sender: "AI System",
      timestamp: "2024-03-14T09:15:00Z",
      read: false,
      priority: "high",
    },
    {
      id: "4",
      title: "National Quran Competition",
      message: "Registration is now open for the National Quran Competition in Abuja on April 15, 2024.",
      type: "announcement",
      scope: "country",
      target: "Nigeria",
      sender: "Nigeria Admin",
      timestamp: "2024-03-13T14:20:00Z",
      read: true,
      priority: "medium",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return AlertTriangle
      case "success":
        return CheckCircle
      case "announcement":
        return MessageSquare
      default:
        return Info
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 border-yellow-200 text-yellow-800"
      case "success":
        return "bg-green-100 border-green-200 text-green-800"
      case "announcement":
        return "bg-blue-100 border-blue-200 text-blue-800"
      default:
        return "bg-gray-100 border-gray-200 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-secondary text-secondary-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleSendNotification = () => {
    console.log("Sending notification:", newNotification)
    alert("Notification sent successfully!")
    setNewNotification({
      title: "",
      message: "",
      type: "info",
      scope: "global",
      target: "",
      priority: "medium",
      pushNotification: true,
      emailNotification: false,
    })
  }

  const renderCreateNotification = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Create Notification
          </CardTitle>
          <CardDescription>Send announcements and alerts to the network</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newNotification.title}
                onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                placeholder="Enter notification title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={newNotification.type}
                onValueChange={(value) => setNewNotification({ ...newNotification, type: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Information</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
              placeholder="Enter your message..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scope">Scope</Label>
              <Select
                value={newNotification.scope}
                onValueChange={(value) => setNewNotification({ ...newNotification, scope: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="global">Global (All)</SelectItem>
                  <SelectItem value="country">Country Level</SelectItem>
                  <SelectItem value="state">State Level</SelectItem>
                  <SelectItem value="school">Specific School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newNotification.scope !== "global" && (
              <div className="space-y-2">
                <Label htmlFor="target">Target</Label>
                <Input
                  id="target"
                  value={newNotification.target}
                  onChange={(e) => setNewNotification({ ...newNotification, target: e.target.value })}
                  placeholder={`Enter ${newNotification.scope} name`}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={newNotification.priority}
                onValueChange={(value) => setNewNotification({ ...newNotification, priority: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="pushNotification"
                checked={newNotification.pushNotification}
                onCheckedChange={(checked) => setNewNotification({ ...newNotification, pushNotification: checked })}
              />
              <Label htmlFor="pushNotification">Send push notification</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="emailNotification"
                checked={newNotification.emailNotification}
                onCheckedChange={(checked) => setNewNotification({ ...newNotification, emailNotification: checked })}
              />
              <Label htmlFor="emailNotification">Send email notification</Label>
            </div>
          </div>

          <Button
            onClick={handleSendNotification}
            className="w-full"
            disabled={!newNotification.title || !newNotification.message}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Notifications</h3>
        <Badge variant="secondary">{notifications.filter((n) => !n.read).length} unread</Badge>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const IconComponent = getNotificationIcon(notification.type)
          return (
            <Card key={notification.id} className={`${!notification.read ? "border-primary" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                    <Badge variant="outline">
                      {notification.scope === "global" ? (
                        <Globe className="h-3 w-3 mr-1" />
                      ) : notification.scope === "country" ? (
                        <MapPin className="h-3 w-3 mr-1" />
                      ) : (
                        <School className="h-3 w-3 mr-1" />
                      )}
                      {notification.scope}
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  From {notification.sender} • {new Date(notification.timestamp).toLocaleDateString()}
                  {notification.target && ` • ${notification.target}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{notification.message}</p>
                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="outline">
                    {notification.read ? "Mark as Unread" : "Mark as Read"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Notification Settings</h3>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive instant notifications on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Choose which types of notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">School Approvals</Label>
                <p className="text-sm text-muted-foreground">KYS verification and approval updates</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Donation Updates</Label>
                <p className="text-sm text-muted-foreground">New donations and funding milestones</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Event Announcements</Label>
                <p className="text-sm text-muted-foreground">Upcoming events and competitions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">System Alerts</Label>
                <p className="text-sm text-muted-foreground">Important system updates and alerts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">AI Insights</Label>
                <p className="text-sm text-muted-foreground">AI-generated recommendations and insights</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notifications & Announcements</h2>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {(userRole === "global-admin" || userRole === "country-admin" || userRole === "state-admin") && (
            <TabsTrigger value="create">Create</TabsTrigger>
          )}
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">{renderNotificationsList()}</TabsContent>

        {(userRole === "global-admin" || userRole === "country-admin" || userRole === "state-admin") && (
          <TabsContent value="create">{renderCreateNotification()}</TabsContent>
        )}

        <TabsContent value="settings">{renderNotificationSettings()}</TabsContent>
      </Tabs>
    </div>
  )
}

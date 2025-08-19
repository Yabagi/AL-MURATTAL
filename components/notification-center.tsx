"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell, X, Check, CheckCheck, Settings, Heart, Users, Calendar } from "lucide-react"

interface Notification {
  id: string
  type: "donation" | "approval" | "event" | "system" | "message"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

interface NotificationCenterProps {
  onClose?: () => void
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [notificationSettings, setNotificationSettings] = useState({
    browserNotifications: true,
    emailNotifications: true,
    donations: true,
    approvals: true,
    events: true,
    system: true,
  })

  // Mock notifications data
  const mockNotifications: Notification[] = [
    {
      id: "1",
      type: "donation",
      title: "New Donation Received",
      message: "Anonymous donor contributed $500 to Madrasa Al-Barakah",
      timestamp: "2 minutes ago",
      read: false,
      priority: "medium",
    },
    {
      id: "2",
      type: "approval",
      title: "School Verification Approved",
      message: "Dar Al-Uloom Cairo has been successfully verified and added to the network",
      timestamp: "1 hour ago",
      read: false,
      priority: "high",
    },
    {
      id: "3",
      type: "event",
      title: "Upcoming Event Reminder",
      message: "Quran Competition 2024 registration closes in 3 days",
      timestamp: "3 hours ago",
      read: true,
      priority: "medium",
    },
    {
      id: "4",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2-4 AM UTC",
      timestamp: "6 hours ago",
      read: true,
      priority: "low",
    },
    {
      id: "5",
      type: "message",
      title: "New Message from Admin",
      message: "Welcome to the Al-Murattal network! Please complete your profile setup.",
      timestamp: "1 day ago",
      read: false,
      priority: "medium",
    },
  ]

  useEffect(() => {
    setNotifications(mockNotifications)

    // Request browser notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission()
    }
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const sendTestNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Test Notification", {
        body: "This is a test notification from Al-Murattal",
        icon: "/placeholder.svg?height=64&width=64",
      })
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "donation":
        return Heart
      case "approval":
        return CheckCheck
      case "event":
        return Calendar
      case "system":
        return Settings
      case "message":
        return Users
      default:
        return Bell
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notif.read
    return notif.type === activeTab
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-20">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
                {unreadCount > 0 && <Badge className="bg-red-500 text-white text-xs">{unreadCount}</Badge>}
              </CardTitle>
              <CardDescription>Stay updated with the latest activities</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark All Read
                </Button>
              )}
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-6 pb-4">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="donation">Donations</TabsTrigger>
                <TabsTrigger value="approval">Approvals</TabsTrigger>
                <TabsTrigger value="event">Events</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 px-6">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications found</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {activeTab === "unread" ? "All caught up!" : "Check back later for updates"}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredNotifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type)

                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                          notification.read ? "border-l-transparent bg-white" : "border-l-primary bg-blue-50/30"
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className={`p-2 rounded-full ${notification.read ? "bg-gray-100" : "bg-primary/10"}`}>
                          <Icon className={`h-4 w-4 ${notification.read ? "text-gray-500" : "text-primary"}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3
                              className={`font-medium truncate ${
                                notification.read ? "text-gray-700" : "text-gray-900"
                              }`}
                            >
                              {notification.title}
                            </h3>
                            <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className={`text-sm truncate ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                        </div>

                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Notification Settings */}
            <div className="border-t p-6">
              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Notification Settings
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="browser-notifications">Browser Notifications</Label>
                  <Switch
                    id="browser-notifications"
                    checked={notificationSettings.browserNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, browserNotifications: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>
                <Button variant="outline" size="sm" onClick={sendTestNotification}>
                  Send Test Notification
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Users, Globe, Bell, Plus } from "lucide-react"

interface Message {
  id: string
  title: string
  content: string
  sender: string
  senderRole: string
  recipients: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "draft" | "sent" | "delivered" | "read"
  timestamp: string
  readCount: number
  totalRecipients: number
}

interface Announcement {
  id: string
  title: string
  content: string
  scope: "global" | "country" | "state" | "school"
  targetAudience: string
  publishDate: string
  expiryDate: string
  isActive: boolean
  views: number
}

export default function MessagingSystem() {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      title: "Monthly Performance Report Due",
      content: "Please submit your monthly performance reports by the end of this week.",
      sender: "Ahmad Ibrahim",
      senderRole: "Global Admin",
      recipients: "All School Administrators",
      priority: "high",
      status: "sent",
      timestamp: "2024-08-15T10:30:00Z",
      readCount: 89,
      totalRecipients: 156,
    },
    {
      id: "2",
      title: "New Teaching Guidelines Available",
      content: "Updated teaching guidelines for Islamic studies are now available in the resource center.",
      sender: "Fatima Hassan",
      senderRole: "Country Admin",
      recipients: "All Teachers in Nigeria",
      priority: "medium",
      status: "delivered",
      timestamp: "2024-08-14T14:15:00Z",
      readCount: 234,
      totalRecipients: 456,
    },
  ])

  const [announcements] = useState<Announcement[]>([
    {
      id: "1",
      title: "International Quran Competition 2024",
      content:
        "Registration is now open for the annual International Quran Competition. The event will be held in Gombe, Nigeria from September 15-20, 2024.",
      scope: "global",
      targetAudience: "All Students and Teachers",
      publishDate: "2024-08-01",
      expiryDate: "2024-09-01",
      isActive: true,
      views: 2450,
    },
    {
      id: "2",
      title: "New Scholarship Program",
      content:
        "We are pleased to announce a new scholarship program for outstanding students. Applications are now being accepted.",
      scope: "country",
      targetAudience: "Students in Nigeria",
      publishDate: "2024-08-10",
      expiryDate: "2024-10-10",
      isActive: true,
      views: 1230,
    },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "read":
        return "bg-purple-100 text-purple-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case "global":
        return "bg-primary text-primary-foreground"
      case "country":
        return "bg-secondary text-secondary-foreground"
      case "state":
        return "bg-accent text-accent-foreground"
      case "school":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Messaging & Announcements</h2>
          <p className="text-muted-foreground">Communicate with schools and manage announcements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Message
          </Button>
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            New Announcement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Announcements</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">87%</div>
            <p className="text-xs text-muted-foreground">Average read rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Reach</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground">Countries reached</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{message.title}</CardTitle>
                      <CardDescription>
                        From: {message.sender} ({message.senderRole}) • To: {message.recipients}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getPriorityColor(message.priority)}>{message.priority.toUpperCase()}</Badge>
                      <Badge className={getStatusColor(message.status)}>{message.status.toUpperCase()}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{message.content}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                      <span>{new Date(message.timestamp).toLocaleString()}</span>
                      <span className="text-muted-foreground">
                        Read by {message.readCount} of {message.totalRecipients} recipients
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Send className="h-3 w-3 mr-1" />
                        Forward
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      <CardDescription>
                        Target: {announcement.targetAudience} • Views: {announcement.views}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getScopeColor(announcement.scope)}>{announcement.scope.toUpperCase()}</Badge>
                      <Badge variant={announcement.isActive ? "default" : "secondary"}>
                        {announcement.isActive ? "ACTIVE" : "INACTIVE"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{announcement.content}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                      <span>Published: {new Date(announcement.publishDate).toLocaleDateString()}</span>
                      <span>Expires: {new Date(announcement.expiryDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        {announcement.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Monthly Report Request", category: "Administrative", usage: 45 },
              { name: "Event Invitation", category: "Events", usage: 32 },
              { name: "Policy Update", category: "Announcements", usage: 28 },
              { name: "Performance Review", category: "Academic", usage: 19 },
              { name: "Emergency Alert", category: "Urgent", usage: 8 },
              { name: "Welcome Message", category: "Onboarding", usage: 15 },
            ].map((template, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription>{template.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Used {template.usage} times</span>
                    <Button size="sm" variant="outline">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Engagement</CardTitle>
                <CardDescription>Read rates by message type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Urgent Messages", rate: 95, count: 23 },
                    { type: "Administrative", rate: 87, count: 156 },
                    { type: "Event Notifications", rate: 92, count: 89 },
                    { type: "Policy Updates", rate: 78, count: 45 },
                  ].map((item) => (
                    <div key={item.type}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{item.type}</span>
                        <span className="font-medium">
                          {item.rate}% ({item.count} messages)
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${item.rate}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Trends</CardTitle>
                <CardDescription>Monthly messaging activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { month: "August 2024", messages: 1247, announcements: 12, engagement: 87 },
                    { month: "July 2024", messages: 1156, announcements: 15, engagement: 84 },
                    { month: "June 2024", messages: 1089, announcements: 18, engagement: 89 },
                    { month: "May 2024", messages: 967, announcements: 14, engagement: 82 },
                  ].map((month) => (
                    <div key={month.month} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{month.month}</p>
                        <p className="text-sm text-muted-foreground">
                          {month.messages} messages, {month.announcements} announcements
                        </p>
                      </div>
                      <Badge variant="outline">{month.engagement}% engagement</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, Plus } from "lucide-react"

interface Event {
  id: string
  title: string
  type: "musabaqah" | "walimah" | "training" | "conference"
  date: string
  location: string
  attendees: number
  status: "upcoming" | "ongoing" | "completed"
  description: string
}

export default function EventManagement() {
  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "International Quran Competition",
      type: "musabaqah",
      date: "2024-09-15",
      location: "Gombe, Nigeria",
      attendees: 500,
      status: "upcoming",
      description: "Annual international Quran recitation competition",
    },
    {
      id: "2",
      title: "Teacher Training Workshop",
      type: "training",
      date: "2024-08-20",
      location: "Lagos, Nigeria",
      attendees: 150,
      status: "ongoing",
      description: "Advanced teaching methodologies for Islamic education",
    },
    {
      id: "3",
      title: "Graduation Ceremony",
      type: "walimah",
      date: "2024-07-30",
      location: "Cairo, Egypt",
      attendees: 300,
      status: "completed",
      description: "Celebrating our graduates' achievements",
    },
  ])

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "musabaqah":
        return "bg-primary text-primary-foreground"
      case "walimah":
        return "bg-secondary text-secondary-foreground"
      case "training":
        return "bg-accent text-accent-foreground"
      case "conference":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Event Management</h2>
          <p className="text-muted-foreground">Manage Musabaqah, Walimah, and training events</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8</div>
            <p className="text-xs text-muted-foreground">Next 3 months</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12,450</div>
            <p className="text-xs text-muted-foreground">All events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">15</div>
            <p className="text-xs text-muted-foreground">Event locations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="musabaqah">Musabaqah</TabsTrigger>
          <TabsTrigger value="walimah">Walimah</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, School, Calendar, Globe, CheckCircle, Clock } from "lucide-react"

interface GlobalMapProps {
  onClose?: () => void
}

interface MapLocation {
  id: string
  name: string
  type: "school" | "country-hq" | "state-hq" | "event"
  country: string
  state: string
  city: string
  coordinates: [number, number] // [lat, lng]
  students?: number
  teachers?: number
  verified?: boolean
  status?: "active" | "pending" | "inactive"
  eventDate?: string
  eventType?: string
}

export function GlobalMap({ onClose }: GlobalMapProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterCountry, setFilterCountry] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)

  // Mock data for map locations
  const locations: MapLocation[] = [
    {
      id: "1",
      name: "Al-Murattal Global HQ",
      type: "country-hq",
      country: "Nigeria",
      state: "Gombe",
      city: "Gombe",
      coordinates: [10.2897, 11.1711],
      status: "active",
    },
    {
      id: "2",
      name: "Madrasa Al-Barakah",
      type: "school",
      country: "Nigeria",
      state: "Lagos",
      city: "Lagos",
      coordinates: [6.5244, 3.3792],
      students: 150,
      teachers: 12,
      verified: true,
      status: "active",
    },
    {
      id: "3",
      name: "Dar Al-Uloom Cairo",
      type: "school",
      country: "Egypt",
      state: "Cairo",
      city: "Cairo",
      coordinates: [30.0444, 31.2357],
      students: 320,
      teachers: 25,
      verified: true,
      status: "active",
    },
    {
      id: "4",
      name: "Al-Azhar University",
      type: "school",
      country: "Egypt",
      state: "Cairo",
      city: "Cairo",
      coordinates: [30.0465, 31.2639],
      students: 450,
      teachers: 35,
      verified: true,
      status: "active",
    },
    {
      id: "5",
      name: "Islamic University Medina",
      type: "school",
      country: "Saudi Arabia",
      state: "Medina",
      city: "Medina",
      coordinates: [24.4539, 39.5955],
      students: 280,
      teachers: 22,
      verified: true,
      status: "active",
    },
    {
      id: "6",
      name: "National Quran Competition",
      type: "event",
      country: "Nigeria",
      state: "Abuja",
      city: "Abuja",
      coordinates: [9.0579, 7.4951],
      eventDate: "2024-04-15",
      eventType: "Competition",
      status: "active",
    },
    {
      id: "7",
      name: "Ghana Regional HQ",
      type: "country-hq",
      country: "Ghana",
      state: "Greater Accra",
      city: "Accra",
      coordinates: [5.6037, -0.187],
      status: "pending",
    },
    {
      id: "8",
      name: "Madrasa Al-Furqan",
      type: "school",
      country: "Pakistan",
      state: "Punjab",
      city: "Lahore",
      coordinates: [31.5497, 74.3436],
      students: 200,
      teachers: 18,
      verified: false,
      status: "pending",
    },
  ]

  const countries = [...new Set(locations.map((loc) => loc.country))].sort()

  const filteredLocations = locations.filter((location) => {
    const matchesSearch =
      searchQuery === "" ||
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.country.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || location.type === filterType
    const matchesCountry = filterCountry === "all" || location.country === filterCountry
    const matchesStatus = filterStatus === "all" || location.status === filterStatus

    return matchesSearch && matchesType && matchesCountry && matchesStatus
  })

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "school":
        return School
      case "country-hq":
      case "state-hq":
        return Globe
      case "event":
        return Calendar
      default:
        return MapPin
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground"
      case "pending":
        return "bg-secondary text-secondary-foreground"
      case "inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const renderMapView = () => (
    <div className="space-y-4">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Input
                placeholder="Search schools, cities, countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="school">Schools</SelectItem>
                  <SelectItem value="country-hq">Country HQ</SelectItem>
                  <SelectItem value="state-hq">State HQ</SelectItem>
                  <SelectItem value="event">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive World Map</CardTitle>
          <CardDescription>
            Showing {filteredLocations.length} locations across {countries.length} countries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-8 text-center min-h-96 flex items-center justify-center">
            <div className="space-y-4">
              <Globe className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">Interactive Map View</h3>
                <p className="text-muted-foreground">
                  In a real implementation, this would show an interactive world map with markers for all schools,
                  headquarters, and events.
                </p>
              </div>
              <div className="flex justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>Schools ({locations.filter((l) => l.type === "school").length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span>Headquarters ({locations.filter((l) => l.type.includes("hq")).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>Events ({locations.filter((l) => l.type === "event").length})</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderLocationsList = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((location) => {
          const IconComponent = getLocationIcon(location.type)
          return (
            <Card
              key={location.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedLocation(location)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">{location.name}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(location.status!)}>{location.status}</Badge>
                </div>
                <CardDescription>
                  {location.city}, {location.state}, {location.country}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {location.type === "school" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Students:</span>
                        <span className="font-medium">{location.students}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Teachers:</span>
                        <span className="font-medium">{location.teachers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Verified:</span>
                        <span className="flex items-center gap-1">
                          {location.verified ? (
                            <CheckCircle className="h-3 w-3 text-primary" />
                          ) : (
                            <Clock className="h-3 w-3 text-secondary" />
                          )}
                          {location.verified ? "Yes" : "Pending"}
                        </span>
                      </div>
                    </>
                  )}
                  {location.type === "event" && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span>Event Type:</span>
                        <span className="font-medium">{location.eventType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Date:</span>
                        <span className="font-medium">{location.eventDate}</span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredLocations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No locations found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderStatistics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{locations.length}</div>
            <p className="text-xs text-muted-foreground">Across {countries.length} countries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Schools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {locations.filter((l) => l.type === "school" && l.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Verified institutions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {locations
                .filter((l) => l.students)
                .reduce((sum, l) => sum + (l.students || 0), 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled globally</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{locations.filter((l) => l.type === "event").length}</div>
            <p className="text-xs text-muted-foreground">Scheduled activities</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Schools by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countries.map((country) => {
                const countrySchools = locations.filter((l) => l.country === country && l.type === "school")
                const totalStudents = countrySchools.reduce((sum, school) => sum + (school.students || 0), 0)
                return (
                  <div key={country} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{country}</span>
                      <p className="text-sm text-muted-foreground">
                        {countrySchools.length} schools • {totalStudents.toLocaleString()} students
                      </p>
                    </div>
                    <Badge variant="secondary">{countrySchools.length}</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest network updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm">New school registered in Lahore, Pakistan</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                <div>
                  <p className="text-sm">Ghana Regional HQ application submitted</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <p className="text-sm">National Quran Competition scheduled in Abuja</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Global Network Map</h2>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="map">{renderMapView()}</TabsContent>

        <TabsContent value="list">{renderLocationsList()}</TabsContent>

        <TabsContent value="stats">{renderStatistics()}</TabsContent>
      </Tabs>

      {/* Location Details Modal */}
      {selectedLocation && (
        <Card className="fixed inset-4 z-50 bg-background border shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedLocation.name}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedLocation(null)}>
                Close
              </Button>
            </div>
            <CardDescription>
              {selectedLocation.city}, {selectedLocation.state}, {selectedLocation.country}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Type</Label>
                  <p className="text-sm">
                    {selectedLocation.type.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={getStatusColor(selectedLocation.status!)}>{selectedLocation.status}</Badge>
                </div>
              </div>
              {selectedLocation.students && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Students</Label>
                    <p className="text-sm">{selectedLocation.students}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Teachers</Label>
                    <p className="text-sm">{selectedLocation.teachers}</p>
                  </div>
                </div>
              )}
              <div>
                <Label className="text-sm font-medium">Coordinates</Label>
                <p className="text-sm">
                  {selectedLocation.coordinates[0]}, {selectedLocation.coordinates[1]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

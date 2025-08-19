"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Users, Calendar, BookOpen, Filter, X } from "lucide-react"

interface SearchResult {
  id: string
  type: "school" | "user" | "event" | "document"
  title: string
  description: string
  location?: string
  status?: string
  date?: string
  avatar?: string
  verified?: boolean
}

interface GlobalSearchProps {
  onClose?: () => void
}

export function GlobalSearch({ onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  // Mock search data
  const mockResults: SearchResult[] = [
    {
      id: "1",
      type: "school",
      title: "AL-MURATTAL INSTITUTE",
      description: "Global headquarters in Gombe, Nigeria",
      location: "Gombe, Nigeria",
      status: "verified",
      verified: true,
    },
    {
      id: "2",
      type: "school",
      title: "Madrasa Al-Barakah",
      description: "Islamic school in Lagos with 150 students",
      location: "Lagos, Nigeria",
      status: "verified",
      verified: true,
    },
    {
      id: "3",
      type: "user",
      title: "Dr. Ahmed Hassan",
      description: "Country Admin for Nigeria",
      location: "Abuja, Nigeria",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      type: "event",
      title: "Quran Competition 2024",
      description: "Annual international Quran recitation competition",
      location: "Cairo, Egypt",
      date: "2024-04-15",
      status: "upcoming",
    },
    {
      id: "5",
      type: "document",
      title: "KYS Verification Guidelines",
      description: "Complete guide for school verification process",
      status: "published",
    },
    {
      id: "6",
      type: "school",
      title: "Dar Al-Uloom Cairo",
      description: "Prestigious Islamic university in Egypt",
      location: "Cairo, Egypt",
      status: "verified",
      verified: true,
    },
  ]

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const filteredResults = mockResults.filter((result) => {
      const matchesQuery =
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.location?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter = activeFilter === "all" || result.type === activeFilter

      return matchesQuery && matchesFilter
    })

    setResults(filteredResults)
    setIsLoading(false)
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, activeFilter])

  const getResultIcon = (type: string) => {
    switch (type) {
      case "school":
        return BookOpen
      case "user":
        return Users
      case "event":
        return Calendar
      case "document":
        return BookOpen
      default:
        return Search
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700"
      case "active":
        return "bg-blue-100 text-blue-700"
      case "upcoming":
        return "bg-yellow-100 text-yellow-700"
      case "published":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filters = [
    { id: "all", name: "All Results", count: results.length },
    { id: "school", name: "Schools", count: results.filter((r) => r.type === "school").length },
    { id: "user", name: "Users", count: results.filter((r) => r.type === "user").length },
    { id: "event", name: "Events", count: results.filter((r) => r.type === "event").length },
    { id: "document", name: "Documents", count: results.filter((r) => r.type === "document").length },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-20">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Global Search
              </CardTitle>
              <CardDescription>Search across schools, users, events, and documents</CardDescription>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for schools, users, events..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
            <div className="px-6 pb-4">
              <TabsList className="grid w-full grid-cols-5">
                {filters.map((filter) => (
                  <TabsTrigger key={filter.id} value={filter.id} className="text-xs">
                    {filter.name} ({filter.count})
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="max-h-96 overflow-y-auto px-6 pb-6">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-gray-500 mt-2">Searching...</p>
                </div>
              ) : results.length === 0 && query ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No results found for "{query}"</p>
                  <p className="text-sm text-gray-400 mt-1">Try different keywords or check spelling</p>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Start typing to search</p>
                  <p className="text-sm text-gray-400 mt-1">Search across schools, users, events, and documents</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((result) => {
                    const Icon = getResultIcon(result.type)

                    return (
                      <div
                        key={result.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        {result.type === "user" && result.avatar ? (
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={result.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {result.title
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium truncate">{result.title}</h3>
                            {result.verified && (
                              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{result.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            {result.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {result.location}
                              </div>
                            )}
                            {result.date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {result.date}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {result.status && (
                            <Badge className={`text-xs ${getStatusColor(result.status)}`}>{result.status}</Badge>
                          )}
                          <Badge variant="outline" className="text-xs capitalize">
                            {result.type}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

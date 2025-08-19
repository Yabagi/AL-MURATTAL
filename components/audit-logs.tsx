"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  Shield,
  X,
  Search,
  CalendarIcon,
  User,
  Settings,
  CreditCard,
  School,
  FileText,
  AlertTriangle,
} from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  user: {
    id: string
    name: string
    email: string
    role: string
    avatar?: string
  }
  action: string
  resource: string
  resourceId: string
  details: string
  ipAddress: string
  userAgent: string
  severity: "low" | "medium" | "high" | "critical"
  category: "auth" | "admin" | "payment" | "data" | "system"
}

interface AuditLogsProps {
  onClose?: () => void
}

export function AuditLogs({ onClose }: AuditLogsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  // Mock audit logs data
  const auditLogs: AuditLog[] = [
    {
      id: "1",
      timestamp: "2024-03-15T14:30:00Z",
      user: {
        id: "admin1",
        name: "Dr. Ahmed Hassan",
        email: "ahmed@almurattal.com.ng",
        role: "Global Admin",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "SCHOOL_APPROVED",
      resource: "School",
      resourceId: "school_123",
      details: "Approved Madrasa Al-Barakah for network inclusion",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium",
      category: "admin",
    },
    {
      id: "2",
      timestamp: "2024-03-15T13:45:00Z",
      user: {
        id: "user1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "Donor",
      },
      action: "DONATION_CREATED",
      resource: "Donation",
      resourceId: "donation_456",
      details: "Created donation of $500 to General Fund",
      ipAddress: "203.0.113.45",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "low",
      category: "payment",
    },
    {
      id: "3",
      timestamp: "2024-03-15T12:20:00Z",
      user: {
        id: "admin2",
        name: "Ibrahim Musa",
        email: "ibrahim@almurattal.com.ng",
        role: "Country Admin",
      },
      action: "USER_SUSPENDED",
      resource: "User",
      resourceId: "user_789",
      details: "Suspended user account due to policy violation",
      ipAddress: "41.203.64.12",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      severity: "high",
      category: "admin",
    },
    {
      id: "4",
      timestamp: "2024-03-15T11:15:00Z",
      user: {
        id: "system",
        name: "System",
        email: "system@almurattal.com.ng",
        role: "System",
      },
      action: "BACKUP_COMPLETED",
      resource: "Database",
      resourceId: "backup_001",
      details: "Daily database backup completed successfully",
      ipAddress: "127.0.0.1",
      userAgent: "System/1.0",
      severity: "low",
      category: "system",
    },
    {
      id: "5",
      timestamp: "2024-03-15T10:30:00Z",
      user: {
        id: "user2",
        name: "Anonymous",
        email: "anonymous@system.local",
        role: "Guest",
      },
      action: "LOGIN_FAILED",
      resource: "Authentication",
      resourceId: "auth_attempt_123",
      details: "Failed login attempt with invalid credentials",
      ipAddress: "198.51.100.42",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "medium",
      category: "auth",
    },
  ]

  const getActionIcon = (action: string) => {
    if (action.includes("LOGIN") || action.includes("AUTH")) return User
    if (action.includes("DONATION") || action.includes("PAYMENT")) return CreditCard
    if (action.includes("SCHOOL") || action.includes("APPROVED")) return School
    if (action.includes("SUSPENDED") || action.includes("FAILED")) return AlertTriangle
    if (action.includes("BACKUP") || action.includes("SYSTEM")) return Settings
    return FileText
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "auth":
        return "bg-blue-100 text-blue-700"
      case "admin":
        return "bg-purple-100 text-purple-700"
      case "payment":
        return "bg-green-100 text-green-700"
      case "data":
        return "bg-orange-100 text-orange-700"
      case "system":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || log.category === selectedCategory
    const matchesSeverity = selectedSeverity === "all" || log.severity === selectedSeverity

    return matchesSearch && matchesCategory && matchesSeverity
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Audit Logs
              </CardTitle>
              <CardDescription>Track all system activities and user actions</CardDescription>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="auth">Authentication</SelectItem>
                <SelectItem value="admin">Administration</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="data">Data</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-40 bg-transparent">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-[60vh] overflow-y-auto">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 px-6">
                <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No audit logs found</p>
                <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredLogs.map((log) => {
                  const ActionIcon = getActionIcon(log.action)

                  return (
                    <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={log.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {log.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="p-1 bg-primary/10 rounded">
                          <ActionIcon className="h-3 w-3 text-primary" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{log.action.replace(/_/g, " ")}</span>
                          <Badge className={`text-xs ${getSeverityColor(log.severity)}`}>{log.severity}</Badge>
                          <Badge className={`text-xs ${getCategoryColor(log.category)}`}>{log.category}</Badge>
                        </div>

                        <p className="text-sm text-gray-700 mb-1">{log.details}</p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>
                            <strong>User:</strong> {log.user.name} ({log.user.role})
                          </span>
                          <span>
                            <strong>IP:</strong> {log.ipAddress}
                          </span>
                          <span>
                            <strong>Resource:</strong> {log.resource}#{log.resourceId}
                          </span>
                        </div>
                      </div>

                      <div className="text-right text-xs text-gray-500">
                        <div>{format(new Date(log.timestamp), "MMM dd, yyyy")}</div>
                        <div>{format(new Date(log.timestamp), "HH:mm:ss")}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className="border-t p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{filteredLogs.length}</div>
                <div className="text-xs text-gray-500">Total Logs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {filteredLogs.filter((l) => l.severity === "critical" || l.severity === "high").length}
                </div>
                <div className="text-xs text-gray-500">High Priority</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {filteredLogs.filter((l) => l.category === "auth").length}
                </div>
                <div className="text-xs text-gray-500">Auth Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {filteredLogs.filter((l) => l.category === "payment").length}
                </div>
                <div className="text-xs text-gray-500">Payments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {filteredLogs.filter((l) => l.category === "admin").length}
                </div>
                <div className="text-xs text-gray-500">Admin Actions</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

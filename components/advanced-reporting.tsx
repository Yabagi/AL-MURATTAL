"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart3,
  X,
  Download,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  Users,
  School,
  DollarSign,
  Activity,
} from "lucide-react"

interface AdvancedReportingProps {
  onClose?: () => void
}

export function AdvancedReporting({ onClose }: AdvancedReportingProps) {
  const [selectedReport, setSelectedReport] = useState("overview")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock reporting data
  const reportData = {
    overview: {
      totalSchools: 247,
      totalStudents: 45678,
      totalDonations: 2400000,
      activeUsers: 1247,
      growthRate: 12.5,
      verificationRate: 89.2,
    },
    regional: [
      { region: "Nigeria", schools: 89, students: 18450, donations: 890000, growth: 15.2 },
      { region: "Egypt", schools: 45, students: 12300, donations: 650000, growth: 8.7 },
      { region: "Saudi Arabia", schools: 32, students: 8900, donations: 520000, growth: 22.1 },
      { region: "UAE", schools: 28, students: 6028, donations: 340000, growth: 18.5 },
    ],
    monthly: [
      { month: "Jan", schools: 15, donations: 180000, users: 89 },
      { month: "Feb", schools: 22, donations: 220000, users: 134 },
      { month: "Mar", schools: 31, donations: 290000, users: 187 },
      { month: "Apr", schools: 28, donations: 310000, users: 203 },
      { month: "May", schools: 35, donations: 380000, users: 245 },
      { month: "Jun", schools: 42, donations: 420000, users: 289 },
    ],
  }

  const generateReport = async () => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGenerating(false)

    // TODO: Implement actual report generation and download
    console.log("[v0] Generating report:", { selectedReport, dateRange, selectedRegion })
    alert("Report generated successfully! Download will start shortly.")
  }

  const reportTypes = [
    { value: "overview", label: "Platform Overview", icon: Activity },
    { value: "schools", label: "Schools Report", icon: School },
    { value: "donations", label: "Donations Report", icon: DollarSign },
    { value: "users", label: "Users Report", icon: Users },
    { value: "regional", label: "Regional Analysis", icon: BarChart3 },
    { value: "growth", label: "Growth Metrics", icon: TrendingUp },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Advanced Reporting
              </CardTitle>
              <CardDescription>Generate comprehensive reports and analytics</CardDescription>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Report Configuration */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="nigeria">Nigeria</SelectItem>
                <SelectItem value="egypt">Egypt</SelectItem>
                <SelectItem value="saudi">Saudi Arabia</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
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

            <Button onClick={generateReport} disabled={isGenerating}>
              <Download className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-[60vh] overflow-y-auto">
            <Tabs defaultValue="preview" className="w-full">
              <div className="px-6 pb-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview">Report Preview</TabsTrigger>
                  <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                  <TabsTrigger value="trends">Trends Analysis</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="preview" className="px-6 pb-6">
                <div className="space-y-6">
                  {isGenerating && (
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                          <p className="text-gray-600">Generating report...</p>
                          <Progress value={65} className="mt-4" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Overview Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <School className="h-8 w-8 text-primary" />
                          <div>
                            <div className="text-2xl font-bold">{reportData.overview.totalSchools}</div>
                            <div className="text-xs text-gray-500">Total Schools</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="h-8 w-8 text-blue-600" />
                          <div>
                            <div className="text-2xl font-bold">
                              {reportData.overview.totalStudents.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">Total Students</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-8 w-8 text-green-600" />
                          <div>
                            <div className="text-2xl font-bold">
                              ${(reportData.overview.totalDonations / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xs text-gray-500">Total Donations</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-8 w-8 text-purple-600" />
                          <div>
                            <div className="text-2xl font-bold">{reportData.overview.growthRate}%</div>
                            <div className="text-xs text-gray-500">Growth Rate</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Regional Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Regional Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {reportData.regional.map((region) => (
                          <div key={region.region} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div>
                                <h3 className="font-medium">{region.region}</h3>
                                <p className="text-sm text-gray-600">
                                  {region.schools} schools • {region.students.toLocaleString()} students
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${(region.donations / 1000).toFixed(0)}K</div>
                              <div className="flex items-center gap-1 text-sm">
                                {region.growth > 0 ? (
                                  <TrendingUp className="h-3 w-3 text-green-600" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 text-red-600" />
                                )}
                                <span className={region.growth > 0 ? "text-green-600" : "text-red-600"}>
                                  {region.growth}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Verification Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Verification Rate</span>
                        <Badge className="bg-green-100 text-green-700">89.2%</Badge>
                      </div>
                      <Progress value={89.2} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span>Pending Reviews</span>
                        <Badge className="bg-yellow-100 text-yellow-700">23</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Average Review Time</span>
                        <Badge className="bg-blue-100 text-blue-700">5.2 days</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Donation Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Average Donation</span>
                        <Badge className="bg-green-100 text-green-700">$247</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Recurring Donors</span>
                        <Badge className="bg-purple-100 text-purple-700">34%</Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Crypto Donations</span>
                        <Badge className="bg-orange-100 text-orange-700">14%</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="px-6 pb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Growth Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reportData.monthly.map((month) => (
                        <div key={month.month} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="font-medium">{month.month} 2024</div>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                              <div className="font-medium">{month.schools}</div>
                              <div className="text-gray-500">Schools</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">${(month.donations / 1000).toFixed(0)}K</div>
                              <div className="text-gray-500">Donations</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">{month.users}</div>
                              <div className="text-gray-500">New Users</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

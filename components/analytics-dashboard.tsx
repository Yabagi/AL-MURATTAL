"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Brain, AlertTriangle, CheckCircle, Users, BookOpen, DollarSign, Calendar } from "lucide-react"

interface AnalyticsDashboardProps {
  userRole: "global-admin" | "country-admin" | "state-admin" | "school-admin"
  onClose?: () => void
}

export function AnalyticsDashboard({ userRole, onClose }: AnalyticsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("students")

  // Mock analytics data
  const performanceData = [
    { month: "Jan", students: 42000, schools: 1100, donations: 180000, events: 45 },
    { month: "Feb", students: 43200, schools: 1120, donations: 195000, events: 52 },
    { month: "Mar", students: 44800, schools: 1150, donations: 210000, events: 48 },
    { month: "Apr", students: 45200, schools: 1180, donations: 225000, events: 55 },
    { month: "May", students: 45600, schools: 1210, donations: 235000, events: 62 },
    { month: "Jun", students: 45892, schools: 1247, donations: 240000, events: 58 },
  ]

  const regionalData = [
    { region: "West Africa", value: 35, color: "#059669" },
    { region: "Middle East", value: 25, color: "#D4AF37" },
    { region: "South Asia", value: 20, color: "#0EA5E9" },
    { region: "Southeast Asia", value: 12, color: "#8B5CF6" },
    { region: "Others", value: 8, color: "#6B7280" },
  ]

  const aiInsights = [
    {
      type: "improvement",
      title: "Increase Student Retention",
      description: "Schools in Lagos region show 15% higher dropout rates. Recommend implementing mentorship programs.",
      impact: "High",
      schools: 23,
    },
    {
      type: "opportunity",
      title: "Expand Digital Learning",
      description: "Schools with computer labs show 25% better performance. Consider technology grants for 45 schools.",
      impact: "Medium",
      schools: 45,
    },
    {
      type: "alert",
      title: "Funding Gap Alert",
      description: "12 schools are below 40% funding target. Prioritize donation campaigns for these institutions.",
      impact: "High",
      schools: 12,
    },
    {
      type: "success",
      title: "Teacher Training Success",
      description: "Schools with trained teachers show 30% improvement in student outcomes. Expand program.",
      impact: "Medium",
      schools: 67,
    },
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "improvement":
        return TrendingUp
      case "opportunity":
        return Brain
      case "alert":
        return AlertTriangle
      case "success":
        return CheckCircle
      default:
        return Brain
    }
  }

  const getInsightColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-destructive text-destructive-foreground"
      case "Medium":
        return "bg-secondary text-secondary-foreground"
      case "Low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const renderPerformanceCharts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Performance Analytics</h3>
        <div className="flex gap-2">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="students">Students</SelectItem>
              <SelectItem value="schools">Schools</SelectItem>
              <SelectItem value="donations">Donations</SelectItem>
              <SelectItem value="events">Events</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Monthly performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: "#059669" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
            <CardDescription>Network coverage by region</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionalData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ region, value }) => `${region}: ${value}%`}
                >
                  {regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Comparison</CardTitle>
          <CardDescription>All metrics comparison over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#059669" name="Students" />
              <Bar dataKey="schools" fill="#D4AF37" name="Schools" />
              <Bar dataKey="events" fill="#0EA5E9" name="Events" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  const renderAIInsights = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">AI-Powered Insights</h3>
        </div>
        <Badge variant="secondary">4 New Recommendations</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiInsights.map((insight, index) => {
          const IconComponent = getInsightIcon(insight.type)
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">{insight.title}</CardTitle>
                  </div>
                  <Badge className={getInsightColor(insight.impact)}>{insight.impact}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{insight.schools} schools affected</span>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Predictions</CardTitle>
          <CardDescription>AI-generated forecasts for next quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">48,500</div>
              <p className="text-sm text-muted-foreground">Predicted Students</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">+5.7%</span>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">1,320</div>
              <p className="text-sm text-muted-foreground">Predicted Schools</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">+5.9%</span>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">$2.8M</div>
              <p className="text-sm text-muted-foreground">Predicted Donations</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">+16.7%</span>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">185</div>
              <p className="text-sm text-muted-foreground">Predicted Events</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">+12.2%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDetailedReports = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Detailed Reports</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Schools</CardTitle>
            <CardDescription>Based on student outcomes and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Dar Al-Uloom Cairo", score: 95, students: 320, improvement: "+5%" },
                { name: "Islamic University Medina", score: 92, students: 280, improvement: "+3%" },
                { name: "Madrasa Al-Barakah", score: 88, students: 150, improvement: "+8%" },
                { name: "Al-Azhar Academy", score: 85, students: 200, improvement: "+2%" },
              ].map((school, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{school.name}</p>
                    <p className="text-sm text-muted-foreground">{school.students} students</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{school.score}%</span>
                      <span className="text-xs text-green-500">{school.improvement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schools Needing Support</CardTitle>
            <CardDescription>Schools requiring additional resources or attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Madrasa Al-Furqan", issue: "Low funding", priority: "High", students: 120 },
                { name: "Dar Al-Hikmah", issue: "Teacher shortage", priority: "Medium", students: 85 },
                { name: "Al-Noor Institute", issue: "Infrastructure", priority: "Medium", students: 95 },
                { name: "Baitul Hikmah", issue: "Low enrollment", priority: "Low", students: 45 },
              ].map((school, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{school.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {school.issue} • {school.students} students
                    </p>
                  </div>
                  <Badge className={getInsightColor(school.priority)}>{school.priority}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Utilization</CardTitle>
          <CardDescription>How resources are being used across the network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Educational Materials Distribution</span>
                <span>85% utilized</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Technology Grants Usage</span>
                <span>72% utilized</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Teacher Training Programs</span>
                <span>91% completion rate</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Infrastructure Projects</span>
                <span>68% completed</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Advanced Analytics</h2>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="reports">Detailed Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">{renderPerformanceCharts()}</TabsContent>

        <TabsContent value="insights">{renderAIInsights()}</TabsContent>

        <TabsContent value="reports">{renderDetailedReports()}</TabsContent>
      </Tabs>
    </div>
  )
}

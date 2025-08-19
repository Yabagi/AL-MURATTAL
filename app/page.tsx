"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Globe,
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  Shield,
  Settings,
  Search,
  BookOpen,
  Award,
  DollarSign,
} from "lucide-react"

import { KYSWorkflow } from "@/components/kys-workflow"
import { DonationSystem } from "@/components/donation-system"
import { GlobalMap } from "@/components/global-map"
import { GlobalSearch } from "@/components/global-search"
import EventManagement from "@/components/event-management"
import MediaGallery from "@/components/media-gallery"
import { UserProfile } from "@/components/user-profile"
import MessagingSystem from "@/components/messaging-system"
import { AdminTools } from "@/components/admin-tools"
import PWAInstallPrompt from "@/components/pwa-install-prompt"

type UserRole =
  | "global-admin"
  | "country-admin"
  | "state-admin"
  | "lga-admin"
  | "school-admin"
  | "teacher"
  | "parent"
  | "student"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  country?: string
  state?: string
  lga?: string
  school?: string
}

export default function AlMurattalApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loginForm, setLoginForm] = useState({ email: "", password: "", role: "" as UserRole | "" })
  const [showSignIn, setShowSignIn] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const mockUser: User = {
      id: "1",
      name: "Ahmad Ibrahim",
      email: loginForm.email,
      role: loginForm.role as UserRole,
      country: loginForm.role === "global-admin" ? undefined : "Nigeria",
      state:
        loginForm.role === "state-admin" || loginForm.role === "school-admin" || loginForm.role === "lga-admin"
          ? "Gombe"
          : undefined,
      lga: loginForm.role === "lga-admin" ? "Billiri" : undefined,
      school: loginForm.role === "school-admin" ? "Al-Murattal Institute" : undefined,
    }
    setCurrentUser(mockUser)
    setIsAuthenticated(true)
    setShowSignIn(false)
  }

  const renderLandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <PWAInstallPrompt />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AM</span>
              </div>
              <div className="text-2xl font-bold text-emerald-700">AL-MURATTAL</div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setShowSignIn(true)}>
                Sign In
              </Button>
              <Button onClick={() => setShowSignIn(true)}>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-emerald-800 mb-6 leading-tight">
            Global Directory of Qur'an Schools
          </h1>
          <p className="text-xl text-emerald-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover, connect, and support Islamic educational institutions worldwide. Building a unified platform for
            Qur'an schools across the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={() => setShowSignIn(true)}>
              Join Our Network
            </Button>
            <Button size="lg" variant="outline" onClick={() => setActiveModal("donations")} className="bg-transparent">
              Preview Donations
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Shield,
              title: "School Verification",
              description: "Comprehensive KYS (Know Your School) process ensuring quality and authenticity",
              action: () => setActiveModal("kys"),
              buttonText: "Preview KYS",
            },
            {
              icon: Heart,
              title: "Donation Management",
              description: "Secure donation processing with fiat and cryptocurrency support",
              action: () => setActiveModal("donations"),
              buttonText: "Preview Donations",
            },
            {
              icon: Globe,
              title: "Global Network",
              description: "Connect with Islamic schools and institutions worldwide",
              action: () => setActiveModal("map"),
              buttonText: "View Global Map",
            },
            {
              icon: Calendar,
              title: "Event Coordination",
              description: "Organize Musabaqah, Walimah, and educational events",
              action: () => setActiveModal("events"),
              buttonText: "Preview Events",
            },
            {
              icon: BarChart3,
              title: "Analytics & Insights",
              description: "AI-powered analytics for institutional growth and improvement",
              action: () => setActiveModal("analytics"),
              buttonText: "View Analytics",
            },
            {
              icon: Users,
              title: "Community Building",
              description: "Foster connections between educators, students, and supporters",
              action: () => setActiveModal("community"),
              buttonText: "Preview Community",
            },
          ].map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Button variant="outline" className="bg-transparent" onClick={feature.action}>
                  {feature.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About AL-MURATTAL INSTITUTE */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">About AL-MURATTAL INSTITUTE</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Founded as the global headquarters and sponsor of this platform, AL-MURATTAL INSTITUTE leads the mission
              to connect and support Islamic educational institutions worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To create a unified global network of Islamic educational institutions, fostering excellence in Qur'anic
                education while preserving authentic Islamic values and promoting educational accessibility worldwide.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  <span>M07 Western Transformer Line, Bomala Quarters Gombe Nigeria</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  <span>+2348034585973, +2348022743886</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-emerald-600" />
                  <span>ceo@almurattal.com.ng</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">Global Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">250+</div>
                  <div className="text-sm text-gray-600">Schools Connected</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">45K+</div>
                  <div className="text-sm text-gray-600">Students Served</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">15</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">$2.4M</div>
                  <div className="text-sm text-gray-600">Donations</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center py-8 border-t border-emerald-200">
          <p className="text-gray-600">© 2024 AL-MURATTAL INSTITUTE. All rights reserved.</p>
        </footer>
      </main>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Sign In to Al-Murattal</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-md"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={loginForm.role}
                  onChange={(e) => setLoginForm({ ...loginForm, role: e.target.value as UserRole })}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="global-admin">Global Admin</option>
                  <option value="country-admin">Country Admin</option>
                  <option value="state-admin">State Admin</option>
                  <option value="lga-admin">LGA Admin</option>
                  <option value="school-admin">School Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="parent">Parent</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Sign In
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowSignIn(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feature Preview Modals */}
      {activeModal === "kys" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <KYSWorkflow userRole="school-admin" onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "donations" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <DonationSystem userRole="donor" onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "map" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <GlobalMap onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "events" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Event Management Preview</h2>
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Close
              </Button>
            </div>
            <EventManagement />
          </div>
        </div>
      )}

      {activeModal === "analytics" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <AdminTools userRole="global-admin" onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "community" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Community Platform Preview</h2>
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Close
              </Button>
            </div>
            <MessagingSystem />
          </div>
        </div>
      )}
    </div>
  )

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AM</span>
              </div>
              <div className="text-2xl font-bold text-emerald-700">AL-MURATTAL</div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setActiveModal("map")}>
                <Globe className="h-4 w-4 mr-2" />
                Global Map
              </Button>
              <Button variant="ghost" onClick={() => setActiveModal("donations")}>
                <Heart className="h-4 w-4 mr-2" />
                Donate
              </Button>
              <Button variant="ghost" onClick={() => setShowSearch(true)}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="ghost" onClick={() => setActiveModal("analytics")}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" onClick={() => setShowUserProfile(true)}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button onClick={() => setIsAuthenticated(false)}>Sign Out</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800">Welcome, {currentUser?.name}</h1>
            <Badge className="mt-2">{currentUser?.role}</Badge>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setActiveModal("kys")}>
              <Shield className="h-4 w-4 mr-2" />
              KYS Workflow
            </Button>
            <Button variant="outline" onClick={() => setActiveModal("events")}>
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </Button>
            <Button variant="outline" onClick={() => setActiveModal("community")}>
              <Users className="h-4 w-4 mr-2" />
              Messages
            </Button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                School Verification
              </CardTitle>
              <CardDescription>Manage KYS workflow and approvals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">12</div>
              <div className="text-sm text-gray-600">Pending Approvals</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Donations
              </CardTitle>
              <CardDescription>Track donation activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">$24,580</div>
              <div className="text-sm text-gray-600">This Month</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Schools
              </CardTitle>
              <CardDescription>Connected institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                {currentUser?.role === "global-admin"
                  ? "250"
                  : currentUser?.role === "country-admin"
                    ? "45"
                    : currentUser?.role === "state-admin"
                      ? "12"
                      : currentUser?.role === "lga-admin"
                        ? "3"
                        : "1"}
              </div>
              <div className="text-sm text-gray-600">Active Schools</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Students
              </CardTitle>
              <CardDescription>Total enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                {currentUser?.role === "global-admin"
                  ? "45,230"
                  : currentUser?.role === "country-admin"
                    ? "8,450"
                    : currentUser?.role === "state-admin"
                      ? "2,340"
                      : currentUser?.role === "lga-admin"
                        ? "680"
                        : "245"}
              </div>
              <div className="text-sm text-gray-600">Active Students</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Events
              </CardTitle>
              <CardDescription>Upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">8</div>
              <div className="text-sm text-gray-600">This Month</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>Recent accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">15</div>
              <div className="text-sm text-gray-600">New Certifications</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <div>
                    <div className="font-medium">New school verification submitted</div>
                    <div className="text-sm text-gray-600">Madrasa Al-Noor from Lagos, Nigeria</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">Donation received</div>
                    <div className="text-sm text-gray-600">$500 from anonymous donor</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-medium">Event scheduled</div>
                    <div className="text-sm text-gray-600">Qur'an competition in Kano</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comprehensive Modal System for All Features */}
      {activeModal === "kys" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <KYSWorkflow userRole={currentUser?.role || "school-admin"} onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "donations" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <DonationSystem userRole={currentUser?.role || "donor"} onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "map" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <GlobalMap onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "events" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Event Management</h2>
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Close
              </Button>
            </div>
            <EventManagement />
          </div>
        </div>
      )}

      {activeModal === "media" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Media Gallery</h2>
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Close
              </Button>
            </div>
            <MediaGallery />
          </div>
        </div>
      )}

      {activeModal === "analytics" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <AdminTools userRole={currentUser?.role || "global-admin"} onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {activeModal === "community" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Messaging & Community</h2>
              <Button variant="outline" onClick={() => setActiveModal(null)}>
                Close
              </Button>
            </div>
            <MessagingSystem />
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {showSearch && <GlobalSearch onClose={() => setShowSearch(false)} />}

      {/* User Profile Modal */}
      {showUserProfile && currentUser && (
        <UserProfile
          user={{
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role,
            joinDate: "2024-01-15",
            verified: true,
            organization: currentUser.school || currentUser.country || "Al-Murattal Network",
          }}
          onClose={() => setShowUserProfile(false)}
        />
      )}
    </div>
  )

  return <div className="min-h-screen">{isAuthenticated ? renderDashboard() : renderLandingPage()}</div>
}

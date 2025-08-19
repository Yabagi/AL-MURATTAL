"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Bell, Shield, Palette, Database, Mail, Smartphone } from "lucide-react"

interface SettingsPanelProps {
  onClose: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      events: true,
      donations: true,
      approvals: true,
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      allowMessages: true,
    },
    preferences: {
      language: "en",
      timezone: "Africa/Lagos",
      theme: "light",
      currency: "NGN",
    },
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: value },
    }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [key]: value },
    }))
  }

  const handlePreferenceChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }))
  }

  const handleSave = () => {
    // TODO: Save settings to database
    console.log("[v0] Saving settings:", settings)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your account preferences and privacy settings</CardDescription>
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-6">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">Notification Settings</h3>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Delivery Methods</CardTitle>
                    <CardDescription>Choose how you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings.notifications.email}
                        onCheckedChange={(value) => handleNotificationChange("email", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={settings.notifications.push}
                        onCheckedChange={(value) => handleNotificationChange("push", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={settings.notifications.sms}
                        onCheckedChange={(value) => handleNotificationChange("sms", value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Notification Types</CardTitle>
                    <CardDescription>Choose what types of notifications you want to receive</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="events-notifications">Event Updates</Label>
                      <Switch
                        id="events-notifications"
                        checked={settings.notifications.events}
                        onCheckedChange={(value) => handleNotificationChange("events", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="donations-notifications">Donation Confirmations</Label>
                      <Switch
                        id="donations-notifications"
                        checked={settings.notifications.donations}
                        onCheckedChange={(value) => handleNotificationChange("donations", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="approvals-notifications">Approval Updates</Label>
                      <Switch
                        id="approvals-notifications"
                        checked={settings.notifications.approvals}
                        onCheckedChange={(value) => handleNotificationChange("approvals", value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">Privacy Settings</h3>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Profile Visibility</CardTitle>
                  <CardDescription>Control who can see your profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="profile-visible">Make profile visible to other users</Label>
                    <Switch
                      id="profile-visible"
                      checked={settings.privacy.profileVisible}
                      onCheckedChange={(value) => handlePrivacyChange("profileVisible", value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-email">Show email address on profile</Label>
                    <Switch
                      id="show-email"
                      checked={settings.privacy.showEmail}
                      onCheckedChange={(value) => handlePrivacyChange("showEmail", value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-phone">Show phone number on profile</Label>
                    <Switch
                      id="show-phone"
                      checked={settings.privacy.showPhone}
                      onCheckedChange={(value) => handlePrivacyChange("showPhone", value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="allow-messages">Allow messages from other users</Label>
                    <Switch
                      id="allow-messages"
                      checked={settings.privacy.allowMessages}
                      onCheckedChange={(value) => handlePrivacyChange("allowMessages", value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">Preferences</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Language & Region</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={settings.preferences.language}
                        onValueChange={(value) => handlePreferenceChange("language", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ar">العربية (Arabic)</SelectItem>
                          <SelectItem value="ha">Hausa</SelectItem>
                          <SelectItem value="yo">Yoruba</SelectItem>
                          <SelectItem value="ig">Igbo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={settings.preferences.timezone}
                        onValueChange={(value) => handlePreferenceChange("timezone", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Lagos">West Africa Time (WAT)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="Europe/London">Greenwich Mean Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Display & Currency</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={settings.preferences.theme}
                        onValueChange={(value) => handlePreferenceChange("theme", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select
                        value={settings.preferences.currency}
                        onValueChange={(value) => handlePreferenceChange("currency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                          <SelectItem value="USD">US Dollar ($)</SelectItem>
                          <SelectItem value="EUR">Euro (€)</SelectItem>
                          <SelectItem value="GBP">British Pound (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-semibold">Data Management</h3>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Export Data</CardTitle>
                    <CardDescription>Download a copy of your data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">Export My Data</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Delete Account</CardTitle>
                    <CardDescription>Permanently delete your account and all associated data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive">Delete Account</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, AlertCircle, FileText, Users, GraduationCap, Upload, Eye } from "lucide-react"

interface SchoolApplication {
  id: string
  schoolName: string
  location: string
  country: string
  state: string
  principalName: string
  email: string
  phone: string
  establishedYear: string
  studentCount: number
  teacherCount: number
  curriculum: string
  facilities: string[]
  documents: string[]
  status: "draft" | "submitted" | "country-review" | "state-review" | "local-verification" | "approved" | "rejected"
  countryApproval?: {
    status: "pending" | "approved" | "rejected"
    reviewedBy?: string
    reviewDate?: string
    comments?: string
  }
  stateApproval?: {
    status: "pending" | "approved" | "rejected"
    reviewedBy?: string
    reviewDate?: string
    comments?: string
  }
  localVerification?: {
    status: "pending" | "approved" | "rejected"
    verifiedBy?: string
    verificationDate?: string
    comments?: string
  }
  submittedDate?: string
}

interface KYSWorkflowProps {
  userRole: "global-admin" | "country-admin" | "state-admin" | "school-admin"
  onClose?: () => void
}

export function KYSWorkflow({ userRole, onClose }: KYSWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [applicationData, setApplicationData] = useState<Partial<SchoolApplication>>({
    facilities: [],
    documents: [],
  })

  // Mock applications for different admin views
  const mockApplications: SchoolApplication[] = [
    {
      id: "1",
      schoolName: "Madrasa Al-Barakah",
      location: "Lagos",
      country: "Nigeria",
      state: "Lagos",
      principalName: "Ustaz Ibrahim Musa",
      email: "ibrahim@albarakah.edu.ng",
      phone: "+234-801-234-5678",
      establishedYear: "2018",
      studentCount: 150,
      teacherCount: 12,
      curriculum: "Islamic Studies with Modern Subjects",
      facilities: ["Library", "Computer Lab", "Prayer Hall", "Playground"],
      documents: ["Registration Certificate", "Tax Clearance", "Principal's CV"],
      status: "country-review",
      submittedDate: "2024-03-10",
      countryApproval: { status: "pending" },
    },
    {
      id: "2",
      schoolName: "Dar Al-Uloom Cairo",
      location: "Cairo",
      country: "Egypt",
      state: "Cairo",
      principalName: "Dr. Ahmed Hassan",
      email: "ahmed@daruloom.edu.eg",
      phone: "+20-10-1234-5678",
      establishedYear: "2015",
      studentCount: 320,
      teacherCount: 25,
      curriculum: "Traditional Islamic Education",
      facilities: ["Library", "Mosque", "Dormitory", "Dining Hall"],
      documents: ["Ministry Approval", "Building Permit", "Staff Certificates"],
      status: "state-review",
      submittedDate: "2024-03-08",
      countryApproval: { status: "approved", reviewedBy: "Country Admin", reviewDate: "2024-03-12" },
      stateApproval: { status: "pending" },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-primary text-primary-foreground"
      case "pending":
        return "bg-secondary text-secondary-foreground"
      case "rejected":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getVerificationProgress = (application: SchoolApplication) => {
    let progress = 0
    if (application.countryApproval?.status === "approved") progress += 33
    if (application.stateApproval?.status === "approved") progress += 33
    if (application.localVerification?.status === "approved") progress += 34
    return progress
  }

  const handleInputChange = (field: string, value: any) => {
    setApplicationData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFacilityToggle = (facility: string) => {
    setApplicationData((prev) => ({
      ...prev,
      facilities: prev.facilities?.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...(prev.facilities || []), facility],
    }))
  }

  const renderApplicationForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">School Registration Application</h3>
          <p className="text-sm text-muted-foreground">Complete all steps to submit your KYS application</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
          <Progress value={(currentStep / 4) * 100} className="w-20" />
        </div>
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Provide basic details about your school</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schoolName">School Name *</Label>
                <Input
                  id="schoolName"
                  value={applicationData.schoolName || ""}
                  onChange={(e) => handleInputChange("schoolName", e.target.value)}
                  placeholder="Enter school name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="establishedYear">Established Year *</Label>
                <Input
                  id="establishedYear"
                  value={applicationData.establishedYear || ""}
                  onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                  placeholder="e.g., 2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={applicationData.country || ""}
                  onValueChange={(value) => handleInputChange("country", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nigeria">Nigeria</SelectItem>
                    <SelectItem value="egypt">Egypt</SelectItem>
                    <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
                    <SelectItem value="pakistan">Pakistan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  value={applicationData.state || ""}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="Enter state or province"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">City/Location *</Label>
                <Input
                  id="location"
                  value={applicationData.location || ""}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter city or location"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Contact & Leadership
            </CardTitle>
            <CardDescription>Principal and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="principalName">Principal Name *</Label>
                <Input
                  id="principalName"
                  value={applicationData.principalName || ""}
                  onChange={(e) => handleInputChange("principalName", e.target.value)}
                  placeholder="Enter principal's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={applicationData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="principal@school.edu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={applicationData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1-234-567-8900"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentCount">Number of Students *</Label>
                <Input
                  id="studentCount"
                  type="number"
                  value={applicationData.studentCount || ""}
                  onChange={(e) => handleInputChange("studentCount", Number.parseInt(e.target.value))}
                  placeholder="e.g., 150"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacherCount">Number of Teachers *</Label>
                <Input
                  id="teacherCount"
                  type="number"
                  value={applicationData.teacherCount || ""}
                  onChange={(e) => handleInputChange("teacherCount", Number.parseInt(e.target.value))}
                  placeholder="e.g., 12"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Academic Information
            </CardTitle>
            <CardDescription>Curriculum and facilities details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="curriculum">Curriculum Description *</Label>
              <Textarea
                id="curriculum"
                value={applicationData.curriculum || ""}
                onChange={(e) => handleInputChange("curriculum", e.target.value)}
                placeholder="Describe your school's curriculum and educational approach"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>School Facilities</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {[
                  "Library",
                  "Computer Lab",
                  "Prayer Hall",
                  "Playground",
                  "Cafeteria",
                  "Dormitory",
                  "Mosque",
                  "Sports Field",
                ].map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={facility}
                      checked={applicationData.facilities?.includes(facility) || false}
                      onChange={() => handleFacilityToggle(facility)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor={facility} className="text-sm">
                      {facility}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Document Upload
            </CardTitle>
            <CardDescription>Upload required documents for verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {[
                "School Registration Certificate",
                "Principal's CV and Certificates",
                "Tax Clearance Certificate",
                "Building/Facility Photos",
                "Curriculum Documentation",
              ].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm font-medium">{doc}</span>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              ))}
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Application Summary</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>School:</strong> {applicationData.schoolName || "Not provided"}
                </p>
                <p>
                  <strong>Location:</strong> {applicationData.location || "Not provided"},{" "}
                  {applicationData.state || "Not provided"}
                </p>
                <p>
                  <strong>Principal:</strong> {applicationData.principalName || "Not provided"}
                </p>
                <p>
                  <strong>Students:</strong> {applicationData.studentCount || "Not provided"}
                </p>
                <p>
                  <strong>Teachers:</strong> {applicationData.teacherCount || "Not provided"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          {currentStep < 4 ? (
            <Button onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}>Next</Button>
          ) : (
            <Button>Submit Application</Button>
          )}
        </div>
      </div>
    </div>
  )

  const renderAdminReview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">School Applications Review</h3>
        <Badge variant="secondary">{mockApplications.length} pending</Badge>
      </div>

      <div className="space-y-4">
        {mockApplications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{application.schoolName}</CardTitle>
                  <CardDescription>
                    {application.location}, {application.state} • Submitted {application.submittedDate}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(application.status)}>{application.status.replace("-", " ")}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Principal:</span> {application.principalName}
                  </div>
                  <div>
                    <span className="font-medium">Students:</span> {application.studentCount}
                  </div>
                  <div>
                    <span className="font-medium">Teachers:</span> {application.teacherCount}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Verification Progress</span>
                    <span className="text-sm text-muted-foreground">{getVerificationProgress(application)}%</span>
                  </div>
                  <Progress value={getVerificationProgress(application)} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    {application.countryApproval?.status === "approved" ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : application.countryApproval?.status === "pending" ? (
                      <Clock className="h-4 w-4 text-secondary" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm">Country HQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {application.stateApproval?.status === "approved" ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : application.stateApproval?.status === "pending" ? (
                      <Clock className="h-4 w-4 text-secondary" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm">State HQ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {application.localVerification?.status === "approved" ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : application.localVerification?.status === "pending" ? (
                      <Clock className="h-4 w-4 text-secondary" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm">Local Verification</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  {((userRole === "country-admin" && application.countryApproval?.status === "pending") ||
                    (userRole === "state-admin" && application.stateApproval?.status === "pending")) && (
                    <>
                      <Button size="sm" variant="outline">
                        Reject
                      </Button>
                      <Button size="sm">Approve</Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  if (userRole === "school-admin") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">School Verification (KYS)</h2>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
        {renderApplicationForm()}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">KYS Verification System</h2>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      <Tabs defaultValue="review" className="space-y-4">
        <TabsList>
          <TabsTrigger value="review">Review Applications</TabsTrigger>
          <TabsTrigger value="approved">Approved Schools</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="review">{renderAdminReview()}</TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Schools</CardTitle>
              <CardDescription>Schools that have completed the KYS verification process</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">List of approved schools will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">247</div>
                <p className="text-xs text-muted-foreground">+12 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Approved Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">189</div>
                <p className="text-xs text-muted-foreground">76% approval rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">23</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Heart, CreditCard, Wallet, Bitcoin, Banknote } from "lucide-react"
import { PaymentProcessor } from "./payment-processor"

interface DonationSystemProps {
  userRole: "global-admin" | "country-admin" | "state-admin" | "school-admin" | "donor"
  onClose?: () => void
}

interface DonationRecord {
  id: string
  amount: number
  currency: string
  donor: string
  recipient: string
  type: "fiat" | "crypto"
  method: string
  date: string
  status: "completed" | "pending" | "failed"
}

export function DonationSystem({ userRole, onClose }: DonationSystemProps) {
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [selectedSchool, setSelectedSchool] = useState("")
  const [donorName, setDonorName] = useState("")
  const [donorEmail, setDonorEmail] = useState("")
  const [donationMessage, setDonationMessage] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [splitWithHQ, setSplitWithHQ] = useState(true)
  const [showPaymentProcessor, setShowPaymentProcessor] = useState(false)
  const [paymentData, setPaymentData] = useState<any>(null)

  // Mock data
  const schoolsData = [
    {
      id: "1",
      name: "Madrasa Al-Barakah",
      location: "Lagos, Nigeria",
      country: "Nigeria",
      state: "Lagos",
      students: 150,
      verified: true,
      donationGoal: 50000,
      donationReceived: 32000,
    },
    {
      id: "2",
      name: "Dar Al-Uloom Cairo",
      location: "Cairo, Egypt",
      country: "Egypt",
      state: "Cairo",
      students: 320,
      verified: true,
      donationGoal: 75000,
      donationReceived: 45000,
    },
    {
      id: "3",
      name: "Al-Noor Institute",
      location: "Gombe, Nigeria",
      country: "Nigeria",
      state: "Gombe",
      students: 95,
      verified: true,
      donationGoal: 30000,
      donationReceived: 18000,
    },
  ]

  const recentDonations: DonationRecord[] = [
    {
      id: "1",
      amount: 5000,
      currency: "USD",
      donor: "Anonymous",
      recipient: "Madrasa Al-Barakah",
      type: "fiat",
      method: "Credit Card",
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: "2",
      amount: 0.1,
      currency: "BTC",
      donor: "Ahmed Foundation",
      recipient: "Global Fund",
      type: "crypto",
      method: "Bitcoin",
      date: "2024-03-14",
      status: "completed",
    },
    {
      id: "3",
      amount: 2500,
      currency: "EUR",
      donor: "Community Fund",
      recipient: "Dar Al-Uloom Cairo",
      type: "fiat",
      method: "Bank Transfer",
      date: "2024-03-13",
      status: "pending",
    },
  ]

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
    { code: "EGP", name: "Egyptian Pound", symbol: "£E" },
    { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
    { code: "BTC", name: "Bitcoin", symbol: "₿" },
    { code: "ETH", name: "Ethereum", symbol: "Ξ" },
  ]

  const handleDonation = () => {
    if (!donationAmount || (!isAnonymous && (!donorName || !donorEmail))) {
      alert("Please fill in all required fields")
      return
    }

    setPaymentData({
      amount: donationAmount,
      currency: selectedCurrency,
      method: paymentMethod,
      donorInfo: {
        name: donorName,
        email: donorEmail,
        isAnonymous,
      },
      school: selectedSchool,
      message: donationMessage,
      splitWithHQ,
    })
    setShowPaymentProcessor(true)
  }

  const handlePaymentSuccess = (transactionId: string) => {
    console.log("[v0] Payment successful:", transactionId)
    setShowPaymentProcessor(false)
    alert(`Donation successful! Transaction ID: ${transactionId}`)

    // Reset form
    setDonationAmount("")
    setSelectedSchool("")
    setDonorName("")
    setDonorEmail("")
    setDonationMessage("")
    setIsAnonymous(false)
  }

  const handlePaymentError = (error: string) => {
    console.log("[v0] Payment error:", error)
    // Keep payment processor open to allow retry
  }

  const handlePaymentCancel = () => {
    setShowPaymentProcessor(false)
    setPaymentData(null)
  }

  const getProgressPercentage = (received: number, goal: number) => {
    return Math.min((received / goal) * 100, 100)
  }

  const renderDonationForm = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Make a Donation
          </CardTitle>
          <CardDescription>Support Islamic education worldwide</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount *</Label>
              <div className="flex">
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="flex-1 ml-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">Recipient School</Label>
              <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                <SelectTrigger>
                  <SelectValue placeholder="Select school or general fund" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Fund (All Schools)</SelectItem>
                  {schoolsData.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name} - {school.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
            <Label htmlFor="anonymous">Make this donation anonymous</Label>
          </div>

          {!isAnonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="donorName">Full Name *</Label>
                <Input
                  id="donorName"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donorEmail">Email Address *</Label>
                <Input
                  id="donorEmail"
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={donationMessage}
              onChange={(e) => setDonationMessage(e.target.value)}
              placeholder="Leave a message of support..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: "card", name: "Credit Card", icon: CreditCard },
                { id: "bank", name: "Bank Transfer", icon: Banknote },
                { id: "bitcoin", name: "Bitcoin", icon: Bitcoin },
                { id: "ethereum", name: "Ethereum", icon: Wallet },
              ].map((method) => (
                <Button
                  key={method.id}
                  variant={paymentMethod === method.id ? "default" : "outline"}
                  onClick={() => setPaymentMethod(method.id)}
                  className="flex flex-col items-center gap-2 h-16"
                >
                  <method.icon className="h-4 w-4" />
                  <span className="text-xs">{method.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {selectedSchool && selectedSchool !== "general" && (
            <div className="flex items-center space-x-2">
              <Switch id="splitHQ" checked={splitWithHQ} onCheckedChange={setSplitWithHQ} />
              <Label htmlFor="splitHQ">Share 10% with Al-Murattal HQ for operations</Label>
            </div>
          )}

          <Button
            onClick={handleDonation}
            className="w-full"
            size="lg"
            disabled={!donationAmount || (!isAnonymous && (!donorName || !donorEmail))}
          >
            <Heart className="h-4 w-4 mr-2" />
            Donate{" "}
            {donationAmount && selectedCurrency
              ? `${currencies.find((c) => c.code === selectedCurrency)?.symbol}${donationAmount}`
              : ""}
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderSchoolFunding = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schoolsData.map((school) => (
          <Card key={school.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{school.name}</CardTitle>
                {school.verified && <Badge className="bg-primary text-primary-foreground">Verified</Badge>}
              </div>
              <CardDescription>
                {school.location} • {school.students} students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Funding Progress</span>
                  <span>
                    ${school.donationReceived.toLocaleString()} / ${school.donationGoal.toLocaleString()}
                  </span>
                </div>
                <Progress value={getProgressPercentage(school.donationReceived, school.donationGoal)} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {getProgressPercentage(school.donationReceived, school.donationGoal).toFixed(1)}% funded
                </p>
              </div>
              <Button onClick={() => setSelectedSchool(school.id)} className="w-full" variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Support This School
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderDonationHistory = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$2.4M</div>
            <p className="text-xs text-muted-foreground">+$45K this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Donors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-xs text-muted-foreground">+89 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Crypto Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$340K</div>
            <p className="text-xs text-muted-foreground">14% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Schools Funded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">189</div>
            <p className="text-xs text-muted-foreground">76% of network</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Donations</CardTitle>
          <CardDescription>Latest contributions to the network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDonations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    {donation.type === "crypto" ? (
                      <Bitcoin className="h-4 w-4 text-primary" />
                    ) : (
                      <CreditCard className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {donation.currency === "BTC" || donation.currency === "ETH"
                        ? `${donation.amount} ${donation.currency}`
                        : `${currencies.find((c) => c.code === donation.currency)?.symbol}${donation.amount.toLocaleString()}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {donation.donor} → {donation.recipient}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      donation.status === "completed"
                        ? "default"
                        : donation.status === "pending"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {donation.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{donation.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Donation System</h2>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      <Tabs defaultValue="donate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="donate">Make Donation</TabsTrigger>
          <TabsTrigger value="schools">School Funding</TabsTrigger>
          <TabsTrigger value="history">Donation History</TabsTrigger>
        </TabsList>

        <TabsContent value="donate">{renderDonationForm()}</TabsContent>

        <TabsContent value="schools">{renderSchoolFunding()}</TabsContent>

        <TabsContent value="history">{renderDonationHistory()}</TabsContent>
      </Tabs>

      {showPaymentProcessor && paymentData && (
        <PaymentProcessor
          amount={paymentData.amount}
          currency={paymentData.currency}
          method={paymentData.method}
          donorInfo={paymentData.donorInfo}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  )
}

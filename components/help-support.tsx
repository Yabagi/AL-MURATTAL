"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  X,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Book,
  Video,
  FileText,
  ExternalLink,
  Send,
} from "lucide-react"

interface HelpSupportProps {
  onClose?: () => void
}

export function HelpSupport({ onClose }: HelpSupportProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  })

  const faqData = [
    {
      id: "1",
      category: "Getting Started",
      question: "How do I register my school with Al-Murattal?",
      answer:
        "To register your school, click on 'Get Started' and complete the KYS (Know Your School) verification process. You'll need to provide school registration documents, principal's credentials, and facility photos. The process takes 7-12 days for complete verification.",
    },
    {
      id: "2",
      category: "Donations",
      question: "What payment methods are accepted for donations?",
      answer:
        "We accept credit cards, bank transfers, Bitcoin, and Ethereum. All payments are processed securely through encrypted channels. You can make one-time or recurring donations to specific schools or the general fund.",
    },
    {
      id: "3",
      category: "Verification",
      question: "What documents are required for school verification?",
      answer:
        "Required documents include: School Registration Certificate, Principal's CV and Certificates, Tax Clearance Certificate, Building/Facility Photos, and Curriculum Documentation. All documents must be clear and up-to-date.",
    },
    {
      id: "4",
      category: "Account Management",
      question: "How do I reset my password?",
      answer:
        "Click on 'Sign In' then 'Forgot Password'. Enter your email address and we'll send you a 6-digit reset code. Follow the instructions to create a new password.",
    },
    {
      id: "5",
      category: "Technical Support",
      question: "The app is not working properly on my device. What should I do?",
      answer:
        "First, try refreshing the page or clearing your browser cache. If the issue persists, check if you're using a supported browser (Chrome, Firefox, Safari, Edge). For mobile devices, ensure you have the latest version installed.",
    },
    {
      id: "6",
      category: "Events",
      question: "How do I register for events like Quran competitions?",
      answer:
        "Navigate to the Events section in your dashboard. Find the event you want to participate in and click 'Register'. Complete the registration form and submit any required documents. You'll receive confirmation via email.",
    },
  ]

  const resources = [
    {
      title: "User Guide",
      description: "Complete guide to using the Al-Murattal platform",
      type: "PDF",
      icon: FileText,
      url: "#",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      type: "Video",
      icon: Video,
      url: "#",
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      type: "Web",
      icon: Book,
      url: "#",
    },
  ]

  const contactMethods = [
    {
      method: "Email",
      value: "support@almurattal.com.ng",
      icon: Mail,
      description: "Get help via email (24-48 hour response)",
    },
    {
      method: "Phone",
      value: "+234 803 458 5973",
      icon: Phone,
      description: "Call us during business hours (9 AM - 5 PM WAT)",
    },
    {
      method: "Live Chat",
      value: "Available 24/7",
      icon: MessageCircle,
      description: "Instant support through live chat",
    },
  ]

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleContactSubmit = () => {
    // TODO: Implement contact form submission
    console.log("[v0] Contact form submitted:", contactForm)
    alert("Your message has been sent! We'll get back to you within 24-48 hours.")

    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "medium",
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Help & Support
              </CardTitle>
              <CardDescription>Find answers to common questions or get in touch with our team</CardDescription>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="faq" className="w-full">
            <div className="px-6 pb-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="status">System Status</TabsTrigger>
              </TabsList>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              <TabsContent value="faq" className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search frequently asked questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {faq.category}
                            </Badge>
                            <span>{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {filteredFAQs.length === 0 && (
                    <div className="text-center py-8">
                      <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No FAQs found for "{searchQuery}"</p>
                      <p className="text-sm text-gray-400 mt-1">Try different keywords or contact support</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="contact" className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {contactMethods.map((contact) => (
                      <Card key={contact.method}>
                        <CardContent className="p-4 text-center">
                          <contact.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                          <h3 className="font-medium mb-1">{contact.method}</h3>
                          <p className="text-sm font-mono text-primary mb-2">{contact.value}</p>
                          <p className="text-xs text-gray-500">{contact.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Send us a message</CardTitle>
                      <CardDescription>We'll get back to you within 24-48 hours</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Brief description of your issue"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Describe your issue or question in detail..."
                          rows={4}
                        />
                      </div>

                      <Button
                        onClick={handleContactSubmit}
                        className="w-full"
                        disabled={
                          !contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message
                        }
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="px-6 pb-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resources.map((resource) => (
                      <Card key={resource.title} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <resource.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">{resource.title}</h3>
                              <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                  {resource.type}
                                </Badge>
                                <Button variant="outline" size="sm" asChild>
                                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Open
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start bg-transparent">
                          <Book className="h-4 w-4 mr-2" />
                          School Registration Guide
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <Video className="h-4 w-4 mr-2" />
                          Donation Tutorial
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          KYS Documentation
                        </Button>
                        <Button variant="outline" className="justify-start bg-transparent">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Community Forum
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="status" className="px-6 pb-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                        All Systems Operational
                      </CardTitle>
                      <CardDescription>Last updated: 2 minutes ago</CardDescription>
                    </CardHeader>
                  </Card>

                  <div className="space-y-3">
                    {[
                      { service: "Web Application", status: "operational" },
                      { service: "Payment Processing", status: "operational" },
                      { service: "File Upload System", status: "operational" },
                      { service: "Email Notifications", status: "operational" },
                      { service: "Database", status: "operational" },
                    ].map((service) => (
                      <div key={service.service} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="font-medium">{service.service}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600 capitalize">{service.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

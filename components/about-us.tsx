"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Heart, Users, Globe, BookOpen, Award, Target } from "lucide-react"

interface AboutUsProps {
  onClose?: () => void
}

export function AboutUs({ onClose }: AboutUsProps) {
  const teamMembers = [
    {
      name: "Dr. Ahmed Hassan",
      role: "Founder & Global Director",
      description: "Islamic scholar with 20+ years in educational leadership",
      location: "Gombe, Nigeria",
    },
    {
      name: "Fatima Al-Zahra",
      role: "Head of Operations",
      description: "Expert in international educational program management",
      location: "Cairo, Egypt",
    },
    {
      name: "Ibrahim Musa",
      role: "Technology Director",
      description: "Software engineer specializing in educational platforms",
      location: "Abuja, Nigeria",
    },
    {
      name: "Aisha Rahman",
      role: "Community Relations",
      description: "Building bridges between schools and communities worldwide",
      location: "Dubai, UAE",
    },
  ]

  const milestones = [
    { year: "2020", event: "Al-Murattal Institute founded in Gombe, Nigeria" },
    { year: "2021", event: "First 10 schools joined the network" },
    { year: "2022", event: "Expanded to Egypt and Saudi Arabia" },
    { year: "2023", event: "Launched digital platform and KYS verification" },
    { year: "2024", event: "Reached 250+ schools across 15 countries" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                About Al-Murattal Institute
              </CardTitle>
              <CardDescription>Building a unified platform for Qur'an schools across the globe</CardDescription>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="h-[70vh] px-6 pb-6">
            <div className="space-y-8">
              {/* Mission & Vision */}
              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Target className="h-5 w-5 text-primary" />
                        Our Mission
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        To create a unified global network of Islamic educational institutions, fostering excellence in
                        Qur'anic education while preserving authentic Islamic values and promoting educational
                        accessibility worldwide.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Globe className="h-5 w-5 text-primary" />
                        Our Vision
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        A world where every Muslim child has access to quality Islamic education, supported by a
                        connected global community of educators, donors, and institutions working together for the
                        betterment of Islamic learning.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Our Story */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Our Story
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Al-Murattal Institute was born from a simple yet profound vision: to connect and support Islamic
                    educational institutions across the globe. Founded in 2020 in Gombe, Nigeria, our journey began when
                    Dr. Ahmed Hassan recognized the need for a unified platform that could bridge the gap between
                    traditional Islamic education and modern technological capabilities.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    What started as a local initiative to support Qur'an schools in Northern Nigeria has evolved into a
                    comprehensive global platform serving hundreds of institutions across multiple continents. Our
                    commitment to authenticity, quality, and accessibility has made us a trusted partner for Islamic
                    educational institutions worldwide.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Today, Al-Murattal stands as a testament to the power of community, technology, and shared values in
                    advancing Islamic education for future generations.
                  </p>
                </div>
              </section>

              {/* Core Values */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Our Core Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Authenticity",
                      description: "Preserving traditional Islamic educational values while embracing modern tools",
                      icon: BookOpen,
                    },
                    {
                      title: "Excellence",
                      description: "Striving for the highest standards in education and service delivery",
                      icon: Award,
                    },
                    {
                      title: "Unity",
                      description: "Building bridges between communities and institutions worldwide",
                      icon: Users,
                    },
                    {
                      title: "Accessibility",
                      description: "Making quality Islamic education available to all, regardless of location",
                      icon: Globe,
                    },
                    {
                      title: "Transparency",
                      description: "Maintaining open and honest communication in all our operations",
                      icon: Heart,
                    },
                    {
                      title: "Innovation",
                      description: "Leveraging technology to enhance traditional educational methods",
                      icon: Target,
                    },
                  ].map((value) => (
                    <Card key={value.title}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <value.icon className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">{value.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{value.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Timeline */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Our Journey</h2>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border-l-4 border-primary bg-gray-50">
                      <Badge className="bg-primary text-white font-bold px-3 py-1">{milestone.year}</Badge>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Team */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Our Leadership Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teamMembers.map((member) => (
                    <Card key={member.name}>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                        <Badge className="bg-primary/10 text-primary mb-3">{member.role}</Badge>
                        <p className="text-gray-700 text-sm mb-2">{member.description}</p>
                        <p className="text-xs text-gray-500">{member.location}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Impact Stats */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">250+</div>
                      <div className="text-sm text-gray-600">Schools Connected</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">45K+</div>
                      <div className="text-sm text-gray-600">Students Served</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">15</div>
                      <div className="text-sm text-gray-600">Countries Reached</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">$2.4M</div>
                      <div className="text-sm text-gray-600">Donations Facilitated</div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-2">Global Headquarters</h3>
                        <p className="text-gray-700 text-sm">
                          M07 Western Transformer Line
                          <br />
                          Bomala Quarters, Gombe
                          <br />
                          Nigeria
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <p className="text-gray-700 text-sm">
                          Email: ceo@almurattal.com.ng
                          <br />
                          Phone: +234 803 458 5973
                          <br />
                          Phone: +234 802 274 3886
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

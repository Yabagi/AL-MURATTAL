"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Shield } from "lucide-react"

interface PrivacyPolicyProps {
  onClose?: () => void
}

export function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Policy
              </CardTitle>
              <CardDescription>Last updated: March 15, 2024</CardDescription>
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
            <div className="space-y-6 text-sm leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold mb-3">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect information you provide directly to us, such as when you create an account, make a
                  donation, or contact us for support.
                </p>

                <h3 className="font-medium mb-2">Personal Information:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-4">
                  <li>Name, email address, and phone number</li>
                  <li>School or organization affiliation</li>
                  <li>Payment information (processed securely by third parties)</li>
                  <li>Profile information and preferences</li>
                </ul>

                <h3 className="font-medium mb-2">Automatically Collected Information:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Usage patterns and interaction data</li>
                  <li>Location information (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process donations and financial transactions</li>
                  <li>Verify school credentials and maintain platform integrity</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Generate analytics and insights to improve our platform</li>
                  <li>Comply with legal obligations and protect against fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">3. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except as
                  described in this policy:
                </p>

                <h3 className="font-medium mb-2">With Your Consent:</h3>
                <p className="text-gray-700 mb-4 ml-4">
                  We may share your information when you give us explicit consent to do so.
                </p>

                <h3 className="font-medium mb-2">Service Providers:</h3>
                <p className="text-gray-700 mb-4 ml-4">
                  We work with third-party service providers who perform services on our behalf, such as payment
                  processing, data analysis, and customer support.
                </p>

                <h3 className="font-medium mb-2">Legal Requirements:</h3>
                <p className="text-gray-700 mb-4 ml-4">
                  We may disclose your information if required to do so by law or in response to valid requests by
                  public authorities.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">4. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">5. Your Rights and Choices</h2>
                <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request access to your personal information
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information
                  </li>
                  <li>
                    <strong>Portability:</strong> Request a copy of your data in a portable format
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing communications
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">6. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to collect and use personal information about you.
                  For further information about the types of cookies we use, why, and how you can control cookies,
                  please see our Cookie Policy.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">7. International Data Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Your information may be transferred to and maintained on computers located outside of your state,
                  province, country, or other governmental jurisdiction where data protection laws may differ from those
                  in your jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">8. Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If you are a parent or guardian and believe your child has
                  provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">9. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">10. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Al-Murattal Institute - Privacy Officer</p>
                  <p>M07 Western Transformer Line, Bomala Quarters</p>
                  <p>Gombe, Nigeria</p>
                  <p>Email: privacy@almurattal.com.ng</p>
                  <p>Phone: +234 803 458 5973</p>
                </div>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

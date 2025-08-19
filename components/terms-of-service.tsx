"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, FileText } from "lucide-react"

interface TermsOfServiceProps {
  onClose?: () => void
}

export function TermsOfService({ onClose }: TermsOfServiceProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-10">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Terms of Service
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
                <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using the Al-Murattal platform ("Service"), you accept and agree to be bound by the
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not use
                  this service.
                </p>
                <p className="text-gray-700">
                  Al-Murattal Institute reserves the right to update and change the Terms of Service from time to time
                  without notice. Any new features that augment or enhance the current Service shall be subject to the
                  Terms of Service.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  Al-Murattal is a global platform connecting Islamic educational institutions (Qur'an schools)
                  worldwide. Our services include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>School verification and registration through our KYS (Know Your School) process</li>
                  <li>Donation management and processing for educational institutions</li>
                  <li>Event coordination and management for Islamic educational activities</li>
                  <li>Communication tools for administrators, teachers, parents, and students</li>
                  <li>Analytics and reporting for institutional management</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">3. User Accounts and Registration</h2>
                <p className="text-gray-700 mb-4">
                  To access certain features of the Service, you must register for an account. When you register for an
                  account, you may be required to provide us with some information about yourself, such as your name,
                  email address, or other contact information.
                </p>
                <p className="text-gray-700 mb-4">
                  You agree that the information you provide to us is accurate and that you will keep it accurate and
                  up-to-date at all times. You are solely responsible for maintaining the confidentiality of your
                  account and password.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">4. School Verification Process</h2>
                <p className="text-gray-700 mb-4">
                  Schools seeking to join the Al-Murattal network must complete our KYS verification process, which
                  includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Submission of valid registration and licensing documents</li>
                  <li>Verification of educational credentials and curriculum</li>
                  <li>Physical facility inspection and documentation</li>
                  <li>Compliance with local educational regulations</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Al-Murattal reserves the right to reject any application that does not meet our standards or
                  requirements.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">5. Donations and Financial Transactions</h2>
                <p className="text-gray-700 mb-4">
                  All donations made through the platform are processed securely through third-party payment processors.
                  Al-Murattal does not store payment card information and is not responsible for the security of payment
                  transactions beyond our platform.
                </p>
                <p className="text-gray-700 mb-4">
                  Donors acknowledge that donations are voluntary contributions and may not be refundable except as
                  required by law or in cases of technical error.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">6. User Conduct</h2>
                <p className="text-gray-700 mb-4">You agree not to use the Service to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>Upload, post, or transmit any content that is unlawful, harmful, or offensive</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Interfere with or disrupt the Service or servers connected to the Service</li>
                  <li>Attempt to gain unauthorized access to any portion of the Service</li>
                  <li>Use the Service for any commercial purpose without our express written consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">7. Privacy and Data Protection</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                  Service, to understand our practices regarding the collection and use of your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">8. Intellectual Property</h2>
                <p className="text-gray-700 mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive
                  property of Al-Murattal Institute and its licensors. The Service is protected by copyright, trademark,
                  and other laws.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">9. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  In no event shall Al-Murattal Institute be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including without limitation, loss of profits, data, use,
                  goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">10. Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These Terms shall be interpreted and governed by the laws of the Federal Republic of Nigeria, without
                  regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">11. Contact Information</h2>
                <p className="text-gray-700">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">Al-Murattal Institute</p>
                  <p>M07 Western Transformer Line, Bomala Quarters</p>
                  <p>Gombe, Nigeria</p>
                  <p>Email: legal@almurattal.com.ng</p>
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

interface PasswordResetProps {
  onClose: () => void
  onBack?: () => void
}

export function PasswordReset({ onClose, onBack }: PasswordResetProps) {
  const [step, setStep] = useState<"email" | "sent" | "reset">("email")
  const [email, setEmail] = useState("")
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSendReset = async () => {
    if (!email) {
      setError("Please enter your email address")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // TODO: Implement actual password reset email sending
      console.log("[v0] Sending password reset email to:", email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep("sent")
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!resetCode) {
      setError("Please enter the reset code")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // TODO: Implement code verification
      console.log("[v0] Verifying reset code:", resetCode)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStep("reset")
    } catch (err) {
      setError("Invalid reset code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // TODO: Implement password reset
      console.log("[v0] Resetting password for:", email)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success - close modal or redirect
      onClose()
    } catch (err) {
      setError("Failed to reset password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            {(step === "sent" || step === "reset") && (
              <Button variant="ghost" size="sm" onClick={() => setStep("email")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex-1">
              <CardTitle>
                {step === "email" && "Reset Password"}
                {step === "sent" && "Check Your Email"}
                {step === "reset" && "Set New Password"}
              </CardTitle>
              <CardDescription>
                {step === "email" && "Enter your email address to receive a reset code"}
                {step === "sent" && "We sent a reset code to your email address"}
                {step === "reset" && "Enter your new password"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {step === "email" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleSendReset} disabled={isLoading} className="w-full">
                {isLoading ? "Sending..." : "Send Reset Code"}
              </Button>
            </>
          )}

          {step === "sent" && (
            <>
              <div className="text-center py-4">
                <Mail className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <p className="text-sm text-gray-600">
                  We sent a 6-digit code to <strong>{email}</strong>
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="resetCode">Reset Code</Label>
                <Input
                  id="resetCode"
                  placeholder="Enter 6-digit code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  maxLength={6}
                />
              </div>
              <Button onClick={handleVerifyCode} disabled={isLoading} className="w-full">
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
              <Button variant="outline" onClick={handleSendReset} className="w-full bg-transparent">
                Resend Code
              </Button>
            </>
          )}

          {step === "reset" && (
            <>
              <div className="text-center py-2">
                <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Code verified successfully</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button onClick={handleResetPassword} disabled={isLoading} className="w-full">
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </>
          )}

          {onBack && (
            <Button variant="outline" onClick={onBack} className="w-full bg-transparent">
              Back to Sign In
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

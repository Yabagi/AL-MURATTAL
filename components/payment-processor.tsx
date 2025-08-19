"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface PaymentProcessorProps {
  amount: string
  currency: string
  method: string
  donorInfo: {
    name: string
    email: string
    isAnonymous: boolean
  }
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
  onCancel: () => void
}

export function PaymentProcessor({
  amount,
  currency,
  method,
  donorInfo,
  onSuccess,
  onError,
  onCancel,
}: PaymentProcessorProps) {
  const [step, setStep] = useState<"details" | "processing" | "success" | "error">("details")
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    routingNumber: "",
    accountName: "",
  })
  const [cryptoAddress, setCryptoAddress] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [error, setError] = useState("")

  const processPayment = async () => {
    setIsProcessing(true)
    setStep("processing")
    setError("")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock payment processing logic
      if (method === "card") {
        if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
          throw new Error("Please fill in all card details")
        }
        // TODO: Integrate with Stripe or other payment processor
        console.log("[v0] Processing card payment:", { amount, currency, cardDetails })
      } else if (method === "bank") {
        if (!bankDetails.accountNumber || !bankDetails.routingNumber) {
          throw new Error("Please fill in all bank details")
        }
        // TODO: Integrate with bank transfer API
        console.log("[v0] Processing bank transfer:", { amount, currency, bankDetails })
      } else if (method === "bitcoin" || method === "ethereum") {
        if (!cryptoAddress) {
          throw new Error("Please provide wallet address")
        }
        // TODO: Integrate with crypto payment processor
        console.log("[v0] Processing crypto payment:", { amount, currency, method, cryptoAddress })
      }

      // Generate mock transaction ID
      const mockTransactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setTransactionId(mockTransactionId)
      setStep("success")
      onSuccess(mockTransactionId)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment processing failed"
      setError(errorMessage)
      setStep("error")
      onError(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const renderCardForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={cardDetails.number}
          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
          maxLength={19}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            maxLength={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            maxLength={4}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cardName">Cardholder Name</Label>
        <Input
          id="cardName"
          placeholder="John Doe"
          value={cardDetails.name}
          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
        />
      </div>
    </div>
  )

  const renderBankForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          placeholder="1234567890"
          value={bankDetails.accountNumber}
          onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="routingNumber">Routing Number</Label>
        <Input
          id="routingNumber"
          placeholder="123456789"
          value={bankDetails.routingNumber}
          onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="accountName">Account Holder Name</Label>
        <Input
          id="accountName"
          placeholder="John Doe"
          value={bankDetails.accountName}
          onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
        />
      </div>
    </div>
  )

  const renderCryptoForm = () => (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Send exactly {amount} {currency} to the address below. Payment will be confirmed automatically.
        </AlertDescription>
      </Alert>
      <div className="space-y-2">
        <Label>{method === "bitcoin" ? "Bitcoin" : "Ethereum"} Wallet Address</Label>
        <div className="p-3 bg-gray-100 rounded-lg font-mono text-sm break-all">
          {method === "bitcoin"
            ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
            : "0x742d35Cc6634C0532925a3b8D4C9db7C4E2b1234"}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cryptoAddress">Your Wallet Address (for refunds)</Label>
        <Input
          id="cryptoAddress"
          placeholder="Enter your wallet address"
          value={cryptoAddress}
          onChange={(e) => setCryptoAddress(e.target.value)}
        />
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Secure Payment
              </CardTitle>
              <CardDescription>
                {amount} {currency} donation
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === "details" && (
            <>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Amount:</span>
                <span className="text-lg font-bold">
                  {amount} {currency}
                </span>
              </div>

              {method === "card" && renderCardForm()}
              {method === "bank" && renderBankForm()}
              {(method === "bitcoin" || method === "ethereum") && renderCryptoForm()}

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Lock className="h-4 w-4" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              <Button onClick={processPayment} className="w-full" size="lg">
                <CreditCard className="h-4 w-4 mr-2" />
                Complete Payment
              </Button>
            </>
          )}

          {step === "processing" && (
            <div className="text-center py-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we process your donation...</p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">Thank you for your generous donation to support Islamic education.</p>
              <div className="p-3 bg-green-50 rounded-lg mb-4">
                <p className="text-sm">
                  <strong>Transaction ID:</strong> {transactionId}
                </p>
              </div>
              <Button onClick={onCancel} className="w-full">
                Close
              </Button>
            </div>
          )}

          {step === "error" && (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Payment Failed</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep("details")} className="flex-1">
                  Try Again
                </Button>
                <Button variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

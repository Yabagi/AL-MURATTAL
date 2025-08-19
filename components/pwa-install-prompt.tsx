"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Download } from "lucide-react"

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("[v0] User accepted the install prompt")
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white border border-emerald-200 rounded-lg shadow-lg p-4 z-50 max-w-sm mx-auto">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-emerald-900 mb-1">Install Al-Murattal</h3>
          <p className="text-sm text-emerald-700 mb-3">Install our app for quick access and offline features</p>
          <div className="flex gap-2">
            <Button onClick={handleInstall} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="h-4 w-4 mr-1" />
              Install
            </Button>
            <Button onClick={handleDismiss} variant="outline" size="sm">
              Later
            </Button>
          </div>
        </div>
        <Button onClick={handleDismiss} variant="ghost" size="sm" className="p-1 h-auto">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default PWAInstallPrompt

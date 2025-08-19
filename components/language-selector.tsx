"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ha", name: "Hausa", nativeName: "Hausa", flag: "🇳🇬" },
  { code: "yo", name: "Yoruba", nativeName: "Yorùbá", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", nativeName: "Igbo", flag: "🇳🇬" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "ms", name: "Malay", nativeName: "Bahasa Melayu", flag: "🇲🇾" },
]

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    // In a real app, this would trigger language change
    console.log("Language changed to:", languageCode)
  }

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-40">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.nativeName}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

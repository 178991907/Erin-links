"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface Settings {
  id?: number
  siteName: string
  siteDescription: string
  logo: string
  welcomeMessage: string
  welcomeMessageChinese: string
  copyright: string
}

interface SettingsFormProps {
  settings?: Settings | null
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Settings>({
    siteName: "Link Hub",
    siteDescription: "A collection of useful links",
    logo: "",
    welcomeMessage: "Welcome to All-Subject English Enlightenment",
    welcomeMessageChinese: "欢迎来到全科英语启蒙",
    copyright: "© 2025 All-Subject English Enlightenment. All rights reserved.",
  })

  // Load settings on component mount
  useEffect(() => {
    if (settings) {
      setFormData({
        siteName: settings.siteName || "Link Hub",
        siteDescription: settings.siteDescription || "A collection of useful links",
        logo: settings.logo || "",
        welcomeMessage: settings.welcomeMessage || "Welcome to All-Subject English Enlightenment",
        welcomeMessageChinese: settings.welcomeMessageChinese || "欢迎来到全科英语启蒙",
        copyright: settings.copyright || "© 2025 All-Subject English Enlightenment. All rights reserved.",
      })
    }
  }, [settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Submitting form data:", formData)

      const url = settings?.id ? `/api/settings/${settings.id}` : "/api/settings"
      const method = settings?.id ? "PATCH" : "POST"

      console.log("Making request to:", url, "with method:", method)

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const responseData = await response.json()
      console.log("Response:", responseData)

      if (!response.ok) {
        throw new Error(responseData.details || responseData.error || "Failed to save settings")
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      })

      // Force a hard refresh to update all components
      window.location.reload()
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof Settings, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
          <CardDescription>Configure your site's basic information and branding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={formData.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              placeholder="Enter site name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={formData.siteDescription}
              onChange={(e) => handleChange("siteDescription", e.target.value)}
              placeholder="Enter site description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              value={formData.logo}
              onChange={(e) => handleChange("logo", e.target.value)}
              placeholder="Enter logo URL"
              type="url"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Welcome Messages</CardTitle>
          <CardDescription>Configure the welcome messages displayed on your homepage.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="welcomeMessage">Welcome Message (English)</Label>
            <Textarea
              id="welcomeMessage"
              value={formData.welcomeMessage}
              onChange={(e) => handleChange("welcomeMessage", e.target.value)}
              placeholder="Enter welcome message in English"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="welcomeMessageChinese">Welcome Message (Chinese)</Label>
            <Textarea
              id="welcomeMessageChinese"
              value={formData.welcomeMessageChinese}
              onChange={(e) => handleChange("welcomeMessageChinese", e.target.value)}
              placeholder="Enter welcome message in Chinese"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Footer Settings</CardTitle>
          <CardDescription>Configure the footer content displayed at the bottom of your site.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="copyright">Copyright Notice</Label>
            <Textarea
              id="copyright"
              value={formData.copyright}
              onChange={(e) => handleChange("copyright", e.target.value)}
              placeholder="Enter copyright notice"
              rows={2}
            />
            <p className="text-sm text-muted-foreground">This text will be displayed in the site footer.</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  )
}

"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Smartphone, Save, ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" className="mr-4" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your personal details and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatars/01.png" alt="Rahul Dravid" />
                  <AvatarFallback>RD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Change Picture
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 3MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Rahul" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Dravid" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="rahul@zinnimoney.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background"
                    defaultValue="Experienced financial advisor with over 15 years in the industry. Specializing in mutual funds, retirement planning, and wealth management."
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <>
                    <span className="animate-spin mr-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Email Notifications</h3>
                {[
                  { id: "email-alerts", label: "Client Alerts", description: "Get notified when clients are at risk" },
                  {
                    id: "email-portfolio",
                    label: "Portfolio Updates",
                    description: "Receive updates on portfolio performance",
                  },
                  {
                    id: "email-commission",
                    label: "Commission Reports",
                    description: "Get monthly commission reports",
                  },
                  {
                    id: "email-marketing",
                    label: "Marketing & Offers",
                    description: "Receive updates on new products and offers",
                  },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch id={item.id} defaultChecked={item.id !== "email-marketing"} />
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Push Notifications</h3>
                {[
                  { id: "push-alerts", label: "Client Alerts", description: "Get notified when clients are at risk" },
                  {
                    id: "push-portfolio",
                    label: "Portfolio Updates",
                    description: "Receive updates on portfolio performance",
                  },
                  { id: "push-commission", label: "Commission Reports", description: "Get monthly commission reports" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={item.id}>{item.label}</Label>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch id={item.id} defaultChecked={item.id === "push-alerts"} />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Password & Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button variant="outline">Update Password</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="2fa" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Session Management</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Current Session</div>
                      <div className="text-xs text-muted-foreground">Mumbai, India • Chrome on Windows</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">Mobile App</div>
                      <div className="text-xs text-muted-foreground">Mumbai, India • Zinnimoney App on iPhone</div>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <X className="h-3 w-3 mr-1" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connected Devices</CardTitle>
              <CardDescription>Manage your connected devices and applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    device: "Windows PC",
                    browser: "Chrome",
                    location: "Mumbai, India",
                    lastActive: "Active now",
                    icon: <Smartphone className="h-8 w-8 text-[#0496ff]" />,
                  },
                  {
                    device: "iPhone 13",
                    browser: "Zinnimoney App",
                    location: "Mumbai, India",
                    lastActive: "2 hours ago",
                    icon: <Smartphone className="h-8 w-8 text-[#0496ff]" />,
                  },
                  {
                    device: "iPad Pro",
                    browser: "Safari",
                    location: "Mumbai, India",
                    lastActive: "Yesterday",
                    icon: <Smartphone className="h-8 w-8 text-[#0496ff]" />,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4 rounded-lg border">
                    <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-4">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{item.device}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.browser} • {item.location}
                          </div>
                        </div>
                        <div className="text-xs text-right">
                          <div className={index === 0 ? "text-green-600" : "text-muted-foreground"}>
                            {item.lastActive}
                          </div>
                          {index !== 0 && (
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 mt-1 h-7 px-2">
                              Logout
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Connected Applications</h3>
                {[
                  { app: "Microsoft Excel", purpose: "Data Export", connected: "Jan 15, 2023" },
                  { app: "Google Calendar", purpose: "Meeting Scheduling", connected: "Mar 22, 2023" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                    <div>
                      <div className="font-medium">{item.app}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.purpose} • Connected on {item.connected}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

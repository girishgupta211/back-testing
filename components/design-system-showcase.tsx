import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Check, Plus } from "lucide-react"

export function DesignSystemShowcase() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Dark Theme Design System</h2>
        <p className="text-muted-foreground">Components using the primary color #0496FF in dark mode</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Typography</h3>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <h2 className="text-3xl font-bold">Heading 2</h2>
          <h3 className="text-2xl font-bold">Heading 3</h3>
          <h4 className="text-xl font-bold">Heading 4</h4>
          <h5 className="text-lg font-bold">Heading 5</h5>
          <h6 className="text-base font-bold">Heading 6</h6>
          <p className="text-base">Regular paragraph text</p>
          <p className="text-sm">Small text</p>
          <p className="text-xs">Extra small text</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="h-12 w-full rounded-md bg-primary"></div>
            <p className="text-xs font-medium">Primary</p>
            <p className="text-xs text-muted-foreground">#0496FF</p>
          </div>
          <div className="space-y-2">
            <div className="h-12 w-full rounded-md bg-zinc-900"></div>
            <p className="text-xs font-medium">Background</p>
            <p className="text-xs text-muted-foreground">Zinc 900</p>
          </div>
          <div className="space-y-2">
            <div className="h-12 w-full rounded-md bg-zinc-800"></div>
            <p className="text-xs font-medium">Card</p>
            <p className="text-xs text-muted-foreground">Zinc 800</p>
          </div>
          <div className="space-y-2">
            <div className="h-12 w-full rounded-md bg-zinc-700"></div>
            <p className="text-xs font-medium">Border</p>
            <p className="text-xs text-muted-foreground">Zinc 700</p>
          </div>
          <div className="space-y-2">
            <div className="h-12 w-full rounded-md bg-primary/20"></div>
            <p className="text-xs font-medium">Primary Muted</p>
            <p className="text-xs text-muted-foreground">Primary 20%</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> With Icon
          </Button>
          <Button variant="outline" size="sm">
            Small Button
          </Button>
          <Button variant="outline" size="lg">
            Large Button
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Action</Button>
            </CardFooter>
          </Card>

          <Card className="border border-zinc-700 bg-zinc-800/50">
            <CardHeader className="bg-zinc-800 rounded-t-lg">
              <CardTitle>Featured Card</CardTitle>
              <CardDescription>With primary accent</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <p>This card has a dark theme accent</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                Action <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-dashed border-zinc-700">
            <CardHeader>
              <CardTitle>Dashed Card</CardTitle>
              <CardDescription>With dashed border</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has a dashed border</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Action
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30">Custom Primary</Badge>
          <Badge className="bg-green-950/50 text-green-400 hover:bg-green-900/50 border-green-800">Success</Badge>
          <Badge className="bg-amber-950/50 text-amber-400 hover:bg-amber-900/50 border-amber-800">Warning</Badge>
          <Badge className="bg-blue-950/50 text-blue-400 hover:bg-blue-900/50 border-blue-800">Info</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Form Elements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter your password" type="password" />
            </div>

            <Button className="w-full">Submit</Button>
          </div>

          <div>
            <Tabs defaultValue="account">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="p-4 border border-zinc-800 rounded-b-md mt-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Account Settings</h4>
                  <p className="text-sm text-muted-foreground">Manage your account settings</p>
                </div>
              </TabsContent>
              <TabsContent value="password" className="p-4 border border-zinc-800 rounded-b-md mt-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Password Settings</h4>
                  <p className="text-sm text-muted-foreground">Change your password</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Feature Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-all border border-zinc-800 hover:border-zinc-700 dark-bg-hover">
            <CardContent className="p-6">
              <div className="flex flex-col h-full space-y-2">
                <div className="rounded-full w-10 h-10 bg-primary/20 flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Feature One</h3>
                <p className="text-sm text-muted-foreground flex-grow">Description of the first feature</p>
                <div className="flex items-center text-primary text-sm font-medium mt-2">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all border border-zinc-800 hover:border-zinc-700 dark-bg-hover">
            <CardContent className="p-6">
              <div className="flex flex-col h-full space-y-2">
                <div className="rounded-full w-10 h-10 bg-primary/20 flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Feature Two</h3>
                <p className="text-sm text-muted-foreground flex-grow">Description of the second feature</p>
                <div className="flex items-center text-primary text-sm font-medium mt-2">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all border border-zinc-800 hover:border-zinc-700 dark-bg-hover">
            <CardContent className="p-6">
              <div className="flex flex-col h-full space-y-2">
                <div className="rounded-full w-10 h-10 bg-primary/20 flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Feature Three</h3>
                <p className="text-sm text-muted-foreground flex-grow">Description of the third feature</p>
                <div className="flex items-center text-primary text-sm font-medium mt-2">
                  <span>Learn more</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

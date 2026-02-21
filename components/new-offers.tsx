import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, User, DollarSign, BarChart3, AlertTriangle, Briefcase } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function NewOffers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Fund Offers</CardTitle>
        <CardDescription>Latest NFOs available for subscription</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div>
              <h3 className="text-sm font-medium">Kotak Emerging Opportunities Fund</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-[#0496ff]/10 text-[#0496ff] hover:bg-[#0496ff]/20">NFO</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> Closes in 5 days
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              A multi-cap fund focusing on emerging sectors with high growth potential
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="py-2 text-xs font-medium text-[#0496ff]">
                  View Fund Details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2 text-xs py-2">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Category:</span>
                    </div>
                    <div>Multi Cap</div>

                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Min Investment:</span>
                    </div>
                    <div>₹5,000</div>

                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Risk Level:</span>
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200"
                      >
                        Moderate to High
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Fund Manager:</span>
                    </div>
                    <div>Harsha Upadhyaya</div>

                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Expense Ratio:</span>
                    </div>
                    <div>2.25% (Regular)</div>
                  </div>
                  <div className="mt-2 text-xs">
                    <p className="font-medium mb-1">Investment Strategy:</p>
                    <p className="text-muted-foreground">
                      Focuses on identifying emerging sectors and businesses with scalable models. Aims for long-term
                      capital appreciation through a diversified portfolio.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex items-center justify-between text-xs mt-2">
              <Badge variant="outline">1.8% Commission</Badge>
              <Button size="sm" variant="outline">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <h3 className="text-sm font-medium">Aditya Birla Sun Life ESG Fund</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-[#0496ff]/10 text-[#0496ff] hover:bg-[#0496ff]/20">NFO</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> Closes in 12 days
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Focused on companies with strong environmental, social, and governance practices
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="py-2 text-xs font-medium text-[#0496ff]">
                  View Fund Details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2 text-xs py-2">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Category:</span>
                    </div>
                    <div>Thematic - ESG</div>

                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Min Investment:</span>
                    </div>
                    <div>₹1,000</div>

                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Risk Level:</span>
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200"
                      >
                        Moderate
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Fund Manager:</span>
                    </div>
                    <div>Satyabrata Mohanty</div>

                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Expense Ratio:</span>
                    </div>
                    <div>2.10% (Regular)</div>
                  </div>
                  <div className="mt-2 text-xs">
                    <p className="font-medium mb-1">Investment Strategy:</p>
                    <p className="text-muted-foreground">
                      Invests in companies demonstrating strong ESG practices. Portfolio includes businesses with
                      sustainable models and positive environmental impact.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex items-center justify-between text-xs mt-2">
              <Badge variant="outline">1.5% Commission</Badge>
              <Button size="sm" variant="outline">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <h3 className="text-sm font-medium">DSP Healthcare Innovation Fund</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-[#0496ff]/10 text-[#0496ff] hover:bg-[#0496ff]/20">NFO</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> Closes in 18 days
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Invests in companies driving innovation in healthcare and medical technology
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="py-2 text-xs font-medium text-[#0496ff]">
                  View Fund Details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-2 text-xs py-2">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Category:</span>
                    </div>
                    <div>Sectoral - Healthcare</div>

                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Min Investment:</span>
                    </div>
                    <div>₹5,000</div>

                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Risk Level:</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
                        High
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Fund Manager:</span>
                    </div>
                    <div>Vinit Sambre</div>

                    <div className="flex items-center gap-1">
                      <BarChart3 className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Expense Ratio:</span>
                    </div>
                    <div>2.35% (Regular)</div>
                  </div>
                  <div className="mt-2 text-xs">
                    <p className="font-medium mb-1">Investment Strategy:</p>
                    <p className="text-muted-foreground">
                      Targets companies at the forefront of healthcare innovation, including pharmaceuticals, biotech,
                      medical devices, and digital health solutions. Global allocation with India focus.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex items-center justify-between text-xs mt-2">
              <Badge variant="outline">1.6% Commission</Badge>
              <Button size="sm" variant="outline">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

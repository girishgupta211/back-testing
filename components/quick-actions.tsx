"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, BarChart3, FileText, Layers, Plus, Users, UserPlus, X, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type CardType = {
  id: string
  title: string
  description: string
  href: string
  icon: React.ReactNode
  badge?: string
  actionText: string
}

export function QuickActions() {
  const allCards: CardType[] = [
    {
      id: "onboard",
      title: "Onboard Client",
      description: "Quickly onboard new clients to your portfolio",
      href: "/dashboard/onboard",
      icon: <UserPlus className="h-5 w-5 text-primary" />,
      actionText: "Get started",
    },
    {
      id: "explore-funds",
      title: "Explore Funds",
      description: "Discover and compare mutual funds",
      href: "/dashboard/explore-funds",
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
      badge: "New",
      actionText: "Browse funds",
    },
    {
      id: "portfolio-xray",
      title: "Portfolio X-ray",
      description: "Deep analysis of client portfolios",
      href: "/dashboard/planner", // Updated to link to the planner page
      icon: <Layers className="h-5 w-5 text-primary" />,
      actionText: "Analyze now",
    },
    {
      id: "commission",
      title: "Commission Optimizer",
      description: "Maximize your earnings with AI recommendations",
      href: "/dashboard/commission-optimization",
      icon: (
        <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 6V18M18 12H6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      actionText: "Optimize earnings",
    },
    {
      id: "lead-generation",
      title: "Lead Generation",
      description: "Create campaigns and manage leads",
      href: "/dashboard/leadgen",
      icon: <Users className="h-5 w-5 text-primary" />,
      actionText: "Generate leads",
    },
    {
      id: "portfolio-updates",
      title: "Portfolio Updates",
      description: "Send portfolio updates to clients",
      href: "/dashboard/clients/portfolio-updates",
      icon: <FileText className="h-5 w-5 text-primary" />,
      actionText: "View updates",
    },
  ]

  // Default visible cards
  const [visibleCardIds, setVisibleCardIds] = useState(["onboard", "explore-funds", "portfolio-xray", "commission"])

  const visibleCards = allCards.filter((card) => visibleCardIds.includes(card.id))
  const hiddenCards = allCards.filter((card) => !visibleCardIds.includes(card.id))

  const toggleCard = (cardId: string) => {
    if (visibleCardIds.includes(cardId)) {
      // Remove card if it's already visible
      setVisibleCardIds(visibleCardIds.filter((id) => id !== cardId))
    } else {
      // Add card if it's not visible
      setVisibleCardIds([...visibleCardIds, cardId])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Quick Actions</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
              <Plus className="mr-1 h-3 w-3" />
              Customize
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Manage Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Visible Cards</DropdownMenuLabel>
              {visibleCards.map((card) => (
                <DropdownMenuItem key={card.id} onClick={() => toggleCard(card.id)}>
                  <X className="mr-2 h-4 w-4" />
                  <span>Remove {card.title}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {hiddenCards.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">Add Cards</DropdownMenuLabel>
                  {hiddenCards.map((card) => (
                    <DropdownMenuItem key={card.id} onClick={() => toggleCard(card.id)}>
                      <Check className="mr-2 h-4 w-4" />
                      <span>Add {card.title}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {visibleCards.map((card) => (
          <Link href={card.href} key={card.id}>
            <Card className="h-full hover:shadow-md transition-all border border-zinc-800 hover:border-zinc-700 dark-bg-hover">
              <CardContent className="p-6">
                <div className="flex flex-col h-full space-y-2">
                  <div className="rounded-full w-10 h-10 bg-primary/20 flex items-center justify-center mb-2">
                    {card.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{card.title}</h3>
                    {card.badge && (
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 text-xs">{card.badge}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground flex-grow">{card.description}</p>
                  <div className="flex items-center text-primary text-sm font-medium mt-2">
                    <span>{card.actionText}</span>
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

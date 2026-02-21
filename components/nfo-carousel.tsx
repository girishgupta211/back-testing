"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, User, CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"

// Sample NFO data
export const nfoData = [
  {
    id: "nfo1",
    name: "Kotak Emerging Opportunities Fund",
    manager: "Harsha Upadhyaya",
    category: "Multi Cap",
    amc: "Kotak Mutual Fund",
    commission: 1.8,
    closingDate: "2023-12-15",
    description: "A multi-cap fund focusing on emerging sectors with high growth potential",
    minInvestment: 5000,
    sipMinimum: 1000,
    riskRating: "Moderate to High",
    benchmark: "Nifty 500 TRI",
    investmentStrategy:
      "Focuses on identifying emerging sectors and businesses with scalable models. Aims for long-term capital appreciation through a diversified portfolio.",
    exitLoad: "1% if redeemed within 1 year",
    expense: 2.25,
  },
  {
    id: "nfo2",
    name: "Aditya Birla Sun Life ESG Fund",
    manager: "Satyabrata Mohanty",
    category: "Thematic - ESG",
    amc: "Aditya Birla Sun Life Mutual Fund",
    commission: 1.5,
    closingDate: "2023-12-22",
    description: "Focused on companies with strong environmental, social, and governance practices",
    minInvestment: 1000,
    sipMinimum: 500,
    riskRating: "Moderate",
    benchmark: "Nifty 100 ESG TRI",
    investmentStrategy:
      "Invests in companies demonstrating strong ESG practices. Portfolio includes businesses with sustainable models and positive environmental impact.",
    exitLoad: "1% if redeemed within 1 year",
    expense: 2.1,
  },
  {
    id: "nfo3",
    name: "DSP Healthcare Innovation Fund",
    manager: "Vinit Sambre",
    category: "Sectoral - Healthcare",
    amc: "DSP Mutual Fund",
    commission: 1.6,
    closingDate: "2023-12-28",
    description: "Invests in companies driving innovation in healthcare and medical technology",
    minInvestment: 5000,
    sipMinimum: 500,
    riskRating: "High",
    benchmark: "Nifty Healthcare TRI",
    investmentStrategy:
      "Targets companies at the forefront of healthcare innovation, including pharmaceuticals, biotech, medical devices, and digital health solutions. Global allocation with India focus.",
    exitLoad: "1% if redeemed within 1 year",
    expense: 2.35,
  },
  {
    id: "nfo4",
    name: "ICICI Prudential Technology Fund",
    manager: "Sankaran Naren",
    category: "Sectoral - Technology",
    amc: "ICICI Prudential Mutual Fund",
    commission: 1.7,
    closingDate: "2024-01-05",
    description: "Focuses on technology companies with innovative products and services",
    minInvestment: 5000,
    sipMinimum: 1000,
    riskRating: "High",
    benchmark: "Nifty IT TRI",
    investmentStrategy:
      "Invests in companies across the technology spectrum including software, hardware, IT services, and emerging tech like AI, cloud computing, and cybersecurity.",
    exitLoad: "1% if redeemed within 1 year",
    expense: 2.2,
  },
  {
    id: "nfo5",
    name: "SBI Consumption Opportunities Fund",
    manager: "R. Srinivasan",
    category: "Thematic - Consumption",
    amc: "SBI Mutual Fund",
    commission: 1.4,
    closingDate: "2024-01-12",
    description: "Targets companies benefiting from India's growing consumption story",
    minInvestment: 5000,
    sipMinimum: 500,
    riskRating: "Moderate to High",
    benchmark: "Nifty India Consumption TRI",
    investmentStrategy:
      "Focuses on companies across consumer discretionary, consumer staples, retail, entertainment, and related sectors that benefit from India's consumption growth.",
    exitLoad: "1% if redeemed within 1 year",
    expense: 2.15,
  },
]

export function NFOCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const router = useRouter()

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }
    }

    updateVisibleCards()
    window.addEventListener("resize", updateVisibleCards)
    return () => window.removeEventListener("resize", updateVisibleCards)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (nfoData.length - visibleCards + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1))
  }

  const handleCardClick = (nfoId: string) => {
    router.push(`/dashboard/explore-funds/nfo/${nfoId}`)
  }

  // Calculate days remaining until closing date
  const getDaysRemaining = (closingDate: string) => {
    const today = new Date()
    const closing = new Date(closingDate)
    const diffTime = closing.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">New Fund Offers</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={nextSlide}
            disabled={currentIndex >= nfoData.length - visibleCards}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            width: `${(nfoData.length / visibleCards) * 100}%`,
          }}
        >
          {nfoData.map((nfo) => (
            <Card
              key={nfo.id}
              className="flex-1 min-w-0 cursor-pointer hover:shadow-md transition-shadow border border-muted"
              onClick={() => handleCardClick(nfo.id)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col h-full justify-between space-y-3">
                  <div>
                    <h4 className="font-medium text-sm line-clamp-2 h-10">{nfo.name}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <Badge className="bg-[#0496ff]/10 text-[#0496ff] hover:bg-[#0496ff]/20 text-xs">NFO</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {getDaysRemaining(nfo.closingDate)} days left
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <User className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{nfo.manager}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <Badge variant="outline" className="text-xs font-medium">
                      {nfo.commission}% Commission
                    </Badge>
                    <span className="text-xs text-muted-foreground truncate ml-2">{nfo.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

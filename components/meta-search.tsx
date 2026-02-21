"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type SearchResult = {
  id: string
  type: "client" | "fund" | "stock" | "bond"
  name: string
  description: string
  path?: string
}

const searchResults: SearchResult[] = [
  // Clients
  {
    id: "c1",
    type: "client",
    name: "Rahul Sharma",
    description: "AUM: ₹25L | Age: 42 | Risk: Moderate",
    path: "/dashboard/clients/c1",
  },
  {
    id: "c2",
    type: "client",
    name: "Priya Patel",
    description: "AUM: ₹18L | Age: 35 | Risk: Aggressive",
    path: "/dashboard/clients/c2",
  },
  {
    id: "c3",
    type: "client",
    name: "Amit Singh",
    description: "AUM: ₹32L | Age: 48 | Risk: Conservative",
    path: "/dashboard/clients/c3",
  },
  {
    id: "c4",
    type: "client",
    name: "Neha Gupta",
    description: "AUM: ₹15L | Age: 29 | Risk: Moderate",
    path: "/dashboard/clients/c4",
  },

  // Mutual Funds
  {
    id: "2",
    type: "fund",
    name: "HDFC Mid-Cap Opportunities",
    description: "Mid Cap | 1Y: 22.3% | AUM: ₹30,500 Cr",
    path: "/dashboard/explore-funds/2",
  },
  {
    id: "3",
    type: "fund",
    name: "SBI Small Cap Fund",
    description: "Small Cap | 1Y: 25.7% | AUM: ₹15,200 Cr",
    path: "/dashboard/explore-funds/3",
  },
  {
    id: "4",
    type: "fund",
    name: "ICICI Pru Value Discovery",
    description: "Value | 1Y: 16.8% | AUM: ₹22,800 Cr",
    path: "/dashboard/explore-funds/4",
  },
  {
    id: "5",
    type: "fund",
    name: "Kotak Emerging Equity",
    description: "Mid Cap | 1Y: 21.5% | AUM: ₹18,700 Cr",
    path: "/dashboard/explore-funds/5",
  },

  // Stocks
  {
    id: "s1",
    type: "stock",
    name: "Reliance Industries",
    description: "Energy | CMP: ₹2,450 | P/E: 22.5",
    path: "/dashboard/explore-stocks?stock=s1",
  },
  {
    id: "s2",
    type: "stock",
    name: "HDFC Bank",
    description: "Banking | CMP: ₹1,650 | P/E: 18.2",
    path: "/dashboard/explore-stocks?stock=s2",
  },
  {
    id: "s3",
    type: "stock",
    name: "Infosys",
    description: "IT | CMP: ₹1,450 | P/E: 24.8",
    path: "/dashboard/explore-stocks?stock=s3",
  },
  {
    id: "s4",
    type: "stock",
    name: "TCS",
    description: "IT | CMP: ₹3,250 | P/E: 26.3",
    path: "/dashboard/explore-stocks?stock=s4",
  },

  // Bonds
  {
    id: "b1",
    type: "bond",
    name: "SBI 7.72% 2025",
    description: "AAA | YTM: 7.2% | Maturity: 2025",
    path: "/dashboard/explore-bonds?bond=b1",
  },
  {
    id: "b2",
    type: "bond",
    name: "HDFC 8.1% 2026",
    description: "AAA | YTM: 7.8% | Maturity: 2026",
    path: "/dashboard/explore-bonds?bond=b2",
  },
  {
    id: "b3",
    type: "bond",
    name: "REC 7.55% 2024",
    description: "AAA | YTM: 6.9% | Maturity: 2024",
    path: "/dashboard/explore-bonds?bond=b3",
  },
  {
    id: "b4",
    type: "bond",
    name: "NHAI 8.3% 2027",
    description: "AAA | YTM: 8.1% | Maturity: 2027",
    path: "/dashboard/explore-bonds?bond=b4",
  },
]

export function MetaSearch() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Filter results based on search query
  const filteredResults =
    query === ""
      ? searchResults
      : searchResults.filter(
          (result) =>
            result.name.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase()),
        )

  const handleSelect = (result: SearchResult) => {
    setOpen(false)
    if (result.path) {
      router.push(result.path)
    }
  }

  const handleFocus = () => {
    setExpanded(true)
  }

  const handleBlur = () => {
    if (!open) {
      setExpanded(false)
    }
  }

  // Close expanded state when dialog closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setExpanded(false)
      }, 200)
    }
  }, [open])

  return (
    <>
      <div
        className={`transition-all duration-300 ease-in-out ${
          expanded ? "w-[400px] md:w-[450px] lg:w-[500px]" : "w-[280px] md:w-[320px] lg:w-[380px]"
        }`}
      >
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search MFs, clients, stocks, bonds..."
            className="w-full bg-background pl-8 pr-10 focus:ring-2 focus:ring-[#0496ff]/30"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={() => setOpen(true)}
            readOnly
          />
          <div className="absolute right-2.5 top-2 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            ⌘K
          </div>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search MFs, clients, stocks, bonds..." value={query} onValueChange={setQuery} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Clients">
            {filteredResults
              .filter((r) => r.type === "client")
              .map((result) => (
                <CommandItem
                  key={result.id}
                  className="flex items-center justify-between cursor-pointer"
                  onSelect={() => handleSelect(result)}
                >
                  <div>
                    <span>{result.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{result.description}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    View
                  </Button>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Mutual Funds">
            {filteredResults
              .filter((r) => r.type === "fund")
              .map((result) => (
                <CommandItem
                  key={result.id}
                  className="flex items-center justify-between cursor-pointer"
                  onSelect={() => handleSelect(result)}
                >
                  <div>
                    <span>{result.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{result.description}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    View
                  </Button>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Stocks">
            {filteredResults
              .filter((r) => r.type === "stock")
              .map((result) => (
                <CommandItem
                  key={result.id}
                  className="flex items-center justify-between cursor-pointer"
                  onSelect={() => handleSelect(result)}
                >
                  <div>
                    <span>{result.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{result.description}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    View
                  </Button>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Bonds">
            {filteredResults
              .filter((r) => r.type === "bond")
              .map((result) => (
                <CommandItem
                  key={result.id}
                  className="flex items-center justify-between cursor-pointer"
                  onSelect={() => handleSelect(result)}
                >
                  <div>
                    <span>{result.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{result.description}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    View
                  </Button>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

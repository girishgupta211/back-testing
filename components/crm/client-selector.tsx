"use client"

import { useState, useEffect } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClientSelectorProps {
  value: string
  onChange: (value: string) => void
}

// Sample client data
const clients = [
  { id: "c1", name: "Vikram Mehta", category: "HNI" },
  { id: "c2", name: "Priya Singh", category: "Affluent" },
  { id: "c3", name: "Amit Patel", category: "HNI" },
  { id: "c4", name: "Neha Gupta", category: "Corporate" },
  { id: "c5", name: "Rajesh Kumar", category: "Retail" },
  { id: "c6", name: "Ananya Sharma", category: "Affluent" },
  { id: "c7", name: "Suresh Menon", category: "HNI" },
  { id: "c8", name: "Kavita Reddy", category: "Corporate" },
]

export function ClientSelector({ value, onChange }: ClientSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  useEffect(() => {
    if (value) {
      const client = clients.find((c) => c.id === value || c.name === value)
      if (client) {
        setSelectedClient(client.name)
      }
    }
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedClient ? selectedClient : "Select client..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search clients..." />
          <CommandList>
            <CommandEmpty>No client found.</CommandEmpty>
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.name}
                  onSelect={(currentValue) => {
                    setSelectedClient(currentValue)
                    onChange(client.id)
                    setOpen(false)
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>{client.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">({client.category})</span>
                  <Check
                    className={cn("ml-auto h-4 w-4", selectedClient === client.name ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

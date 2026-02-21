import { MobileBusinessCard } from "@/components/mobile-business-card"

export default function DigitalCardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8">Your Digital Business Card</h1>
        <p className="text-muted-foreground mb-8 max-w-md text-center">
          Share your contact information instantly with anyone. Save to phone or share via messaging apps.
        </p>
        <MobileBusinessCard />
      </div>
    </div>
  )
}

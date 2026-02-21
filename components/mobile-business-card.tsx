"use client"
import { Phone, Mail, MapPin } from "lucide-react"

export function MobileBusinessCard() {
  const profileData = {
    name: "Vikram Mehta",
    title: "Financial Advisor",
    company: "Zinnimoney Financial Services",
    phone: "+91 98765 43210",
    email: "vikram.mehta@zinnimoney.com",
    address: "42, Prestige Tower, Koramangala, Bangalore - 560034",
    metrics: {
      aum: "₹187.5 Cr",
      clients: "142",
      returns: "16.8%",
      experience: "12+ Yrs",
    },
  }

  // Define the indigo color
  const indigoColor = "#4B0082"

  return (
    <div className="max-w-sm mx-auto">
      {/* Phone Frame */}
      <div className="relative border-8 border-black rounded-[40px] p-3 pb-5 bg-white shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl"></div>

        {/* Content */}
        <div className="pt-8 pb-2 px-4">
          {/* Profile Photo with Name */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 mb-3">
              <img src="/placeholder.svg?height=128&width=128" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h1
              className="text-[#0496ff] text-2xl font-extrabold tracking-tight uppercase"
              style={{
                letterSpacing: "0.02em",
                textShadow: "0 1px 1px rgba(0,0,0,0.05)",
              }}
            >
              {profileData.name}
            </h1>
          </div>

          {/* Title and Company */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-xs tracking-tight">{profileData.title}</p>
            <p className="text-gray-600 text-xs tracking-tight">{profileData.company}</p>
          </div>

          {/* Metrics Cards */}
          <div className="space-y-2 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-3 shadow-sm flex justify-between items-center">
              <div className="text-sm font-semibold uppercase tracking-tight" style={{ color: indigoColor }}>
                AUM
              </div>
              <div className="text-lg font-bold" style={{ color: indigoColor }}>
                {profileData.metrics.aum}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-3 shadow-sm flex justify-between items-center">
              <div className="text-sm font-semibold uppercase tracking-tight" style={{ color: indigoColor }}>
                Clients
              </div>
              <div className="text-lg font-bold" style={{ color: indigoColor }}>
                {profileData.metrics.clients}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-3 shadow-sm flex justify-between items-center">
              <div className="text-sm font-semibold uppercase tracking-tight" style={{ color: indigoColor }}>
                XIRR
              </div>
              <div className="text-lg font-bold" style={{ color: indigoColor }}>
                {profileData.metrics.returns}
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg p-3 shadow-sm flex justify-between items-center">
              <div className="text-sm font-semibold uppercase tracking-tight" style={{ color: indigoColor }}>
                Experience
              </div>
              <div className="text-lg font-bold" style={{ color: indigoColor }}>
                {profileData.metrics.experience}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-100">
              <Phone className="h-5 w-5 text-gray-700 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500 mb-0.5">Phone</div>
                <div className="text-gray-800 font-medium tracking-tight">{profileData.phone}</div>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-md border border-gray-100">
              <Mail className="h-5 w-5 text-gray-700 mr-4 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500 mb-0.5">Email</div>
                <div className="text-gray-800 font-medium tracking-tight">{profileData.email}</div>
              </div>
            </div>

            <div className="flex items-start p-3 bg-gray-50 rounded-md border border-gray-100">
              <MapPin className="h-5 w-5 text-gray-700 mr-4 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="text-xs uppercase font-semibold tracking-wider text-gray-500 mb-0.5">Address</div>
                <div className="text-gray-800 font-medium tracking-tight">{profileData.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}

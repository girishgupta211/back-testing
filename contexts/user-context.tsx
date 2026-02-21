"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Role = "admin" | "associate" | "client"

interface UserContextType {
  role: Role
  setRole: (role: Role) => void
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
}

const defaultContext: UserContextType = {
  role: "admin", // Default role
  setRole: () => {},
  name: "Rahul Sharma",
  setName: () => {},
  email: "rahul.sharma@example.com",
  setEmail: () => {},
}

const UserContext = createContext<UserContextType>(defaultContext)

export const useUser = () => useContext(UserContext)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("admin")
  const [name, setName] = useState("Rahul Sharma")
  const [email, setEmail] = useState("rahul.sharma@example.com")

  // Load user data from localStorage on client side
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole")
    const savedName = localStorage.getItem("userName")
    const savedEmail = localStorage.getItem("userEmail")

    if (savedRole) {
      setRole(savedRole as Role)
    }
    if (savedName) {
      setName(savedName)
    }
    if (savedEmail) {
      setEmail(savedEmail)
    }
  }, [])

  // Save user data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", name)
    localStorage.setItem("userEmail", email)
  }, [role, name, email])

  return (
    <UserContext.Provider value={{ role, setRole, name, setName, email, setEmail }}>{children}</UserContext.Provider>
  )
}

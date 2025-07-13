"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Clock, MessageCircle, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/history", icon: Clock, label: "History" },
  { href: "/send", icon: MessageCircle, label: "Contact" },
  { href: "/settings", icon: Settings, label: "Settings" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-700/50 px-4 py-3 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-200",
                isActive
                  ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50",
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

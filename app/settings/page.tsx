"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Star, MessageSquare, Info, Shield, FileText, Lightbulb, ExternalLink, Sparkles, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const settingsItems = [
  {
    icon: MessageSquare,
    title: "Report Content",
    description: "Report inappropriate or harmful content",
    action: "report",
    gradient: "from-red-400 to-pink-400",
    bgGradient: "from-red-500/10 to-pink-500/10",
  },
  {
    icon: Star,
    title: "Rate Us",
    description: "Rate our app on the Play Store",
    action: "rate",
    external: true,
    gradient: "from-yellow-400 to-orange-400",
    bgGradient: "from-yellow-500/10 to-orange-500/10",
  },
  {
    icon: Info,
    title: "About Us",
    description: "Learn more about Lettrics",
    action: "about",
    gradient: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: Shield,
    title: "Privacy Policy",
    description: "Read our privacy policy",
    action: "privacy",
    gradient: "from-green-400 to-emerald-400",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
  {
    icon: FileText,
    title: "Terms & Conditions",
    description: "View terms and conditions",
    action: "terms",
    gradient: "from-purple-400 to-violet-400",
    bgGradient: "from-purple-500/10 to-violet-500/10",
  },
  {
    icon: Lightbulb,
    title: "Suggest Ideas",
    description: "Share your feature ideas with us",
    action: "suggest",
    gradient: "from-amber-400 to-yellow-400",
    bgGradient: "from-amber-500/10 to-yellow-500/10",
  },
]

export default function SettingsPage() {
  const handleItemClick = (action: string) => {
    switch (action) {
      case "rate":
        window.open("https://play.google.com/store", "_blank")
        break
       case "privacy":
          window.location.href = "/privacy"
          break
       case "about":
          window.location.href = "/about"
          break
          case "terms":
          window.location.href = "/terms"
          break
      case "report":
      case "suggest":
        window.location.href = "/send"
        break
      default:
        console.log(`Action: ${action}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center gap-4 p-6 pt-12">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 p-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-sm text-gray-400">Manage your preferences</p>
        </div>
      </header>

      <div className="relative z-10 px-6 pb-24">
        {/* App Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="p-8 mb-8 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-3xl text-center">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/25">
                <span className="text-3xl font-bold text-white">L</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
              Lettrics
            </h2>
            <p className="text-gray-400 text-lg mb-2">AI Writing Assistant</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-full border border-gray-600/50">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Version 1.0.0</span>
            </div>
          </Card>
        </motion.div>

        {/* Settings Items */}
        <div className="space-y-4">
          {settingsItems.map((item, index) => (
            <motion.div
              key={item.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card
                className="group relative overflow-hidden bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 shadow-lg hover:shadow-2xl rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                onClick={() => handleItemClick(item.action)}
              >
                {/* Gradient Background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${item.bgGradient.replace("from-", "rgba(").replace("to-", ", rgba(").replace("/10", ", 0.05)")})`,
                  }}
                />

                <div className="relative z-10 p-6 flex items-center gap-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-700/50 border border-gray-600/50">
                      {(() => {
                        const Icon = item.icon
                        return (
                          <Icon className={`w-7 h-7 text-white`} />
                        )
                      })()}
                    </div>

                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.external && (
                      <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    )}

                    <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-300">
                      <span className="text-gray-400 group-hover:text-white text-xl">→</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/30 backdrop-blur-sm rounded-full border border-gray-700/50">
            <span className="text-gray-400 text-sm">Made with</span>
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-red-800 to-red-600 animate-pulse">
              <Heart className="w-3.5 h-3.5 text-white" />
            </div>

            <span className="text-gray-400 text-sm">for writers everywhere</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

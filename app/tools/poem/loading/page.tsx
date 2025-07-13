"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

const loadingMessages = {
  short: [
    "Lettrics is composing your poem...",
    "Finding the perfect words...",
    "Crafting stanzas and rhymes...",
    "Almost ready...",
  ],
  medium: [
    "Lettrics is composing your poem...",
    "Weaving thoughts and emotions...",
    "Polishing rhythmic lines...",
    "Adding poetic expressions...",
    "Almost ready...",
  ],
  long: [
    "Lettrics is composing your heartfelt poem...",
    "Analyzing your theme and mood...",
    "Searching for vivid metaphors...",
    "Creating poetic structure...",
    "Enhancing flow and rhythm...",
    "Polishing each stanza...",
    "Adding final touches...",
    "Almost ready...",
  ],
}

export default function PoemLoadingPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [formData, setFormData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("lettrics-form-data")
    if (!savedFormData) {
      router.push("/tools/poem")
      return
    }

    const data = JSON.parse(savedFormData)
    setFormData(data)

    const lengthKey = data.length === "Short" ? "short" : data.length === "Long" ? "long" : "medium"
    const messages = loadingMessages[lengthKey]

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1
        }
        clearInterval(messageInterval)
        return prev
      })
    }, 1500)

    const generateContent = async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (result.success) {
          sessionStorage.setItem(
            "lettrics-result",
            JSON.stringify({
              content: result.content,
              topic: data.topic,
              type: data.tool,
              timestamp: new Date().toISOString(),
            })
          )

          const historyItem = {
            id: Date.now(),
            type: data.tool,
            topic: data.topic,
            content: result.content,
            timestamp: new Date().toISOString(),
          }
          const history = JSON.parse(localStorage.getItem("lettrics-history") || "[]")
          history.unshift(historyItem)
          localStorage.setItem("lettrics-history", JSON.stringify(history.slice(0, 50)))

          setTimeout(() => {
            clearInterval(messageInterval)
            router.push("/tools/poem/result")
          }, 2000)
        } else {
          throw new Error(result.error || "Failed to generate content")
        }
      } catch (error) {
        clearInterval(messageInterval)
        router.push("/tools/poem?error=generation_failed")
      }
    }

    generateContent()

    return () => clearInterval(messageInterval)
  }, [router])

  if (!formData) return null

  const lengthKey = formData.length === "Short" ? "short" : formData.length === "Long" ? "long" : "medium"
  const messages = loadingMessages[lengthKey]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-rose-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/25 mx-auto"
            >
              <Heart className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            {messages[currentMessageIndex]}
          </h1>

          <div className="w-64 h-2 mx-auto bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentMessageIndex + 1) / messages.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <p className="text-gray-400 text-lg">
            Creating your {formData.style?.toLowerCase() || "free verse"} poem...
          </p>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
